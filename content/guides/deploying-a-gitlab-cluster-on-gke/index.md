---
title: "Deploying a GitLab Cluster on GCP/GKE"
date: 2019-05-28
tags: ["gcp", "gke", "gitlab", "ci"]
---

This guide explains how to deploy a production-grade GitLab cluster running on GKE using our GCP open-source modules.

You could also use the marketplace: https://console.cloud.google.com/marketplace/details/gitlab-public/gitlab?filter=solution-type:k8s.
however we recommend our solution for higher availability.

You use Helm as the mechanism to install and configure the GitLab application components in GKE.

We follow the recommendation by using Helm to install GitLab in the recommended.

We install GitLab by following the recommended way using a Helm chart. The chart contains all of the required components
to run GitLab and can easily scale to large deployments.

More information about the chart is explained on the GitLab cloud native Helm chart page. [GitLab cloud native Helm Chart | GitLab](https://docs.gitlab.com/charts/)

In order to follow this guide you will need:

1. A GCP account with billing enabled. There is a [free tier](https://cloud.google.com/free/) that includes \$300 of free credit over a 12 month period.
2. [Terraform](https://learn.hashicorp.com/terraform/getting-started/install.html) v0.10.3 or later installed locally.
3. A recent version of the [gcloud](https://cloud.google.com/sdk/gcloud/) command-line tool.
4. [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl) v1.10.11 or higher
5. [Helm](https://docs.helm.sh/using_helm/#installing-helm) v2.11.0
6. [`kubergrunt`](https://github.com/gruntwork-io/kubergrunt#installation) (Minimum version: v0.3.8)

Make sure the binaries are discoverable in your `PATH` variable. See [this Stack Overflow
post](https://stackoverflow.com/questions/14637979/how-to-permanently-set-path-on-linux-unix) for instructions on
setting up your `PATH` on Unix, and [this post](https://stackoverflow.com/questions/1618280/where-can-i-set-path-to-make-exe-on-windows)
for instructions on Windows.

Enable Redis: https://console.developers.google.com/apis/api/redis.googleapis.com/overview?project=400198790674
Enable the Google Cloud Memorystore for Redis API.

## Architecture

In addition we use a Cloud SQL database for better durability and availability.

Our deployment will include:

- The core GitLab components

We use Kubergrunt to securely install Helm on our GKE cluster.

We deploy a Cloud SQL for PostgreSQL instance with a private IP.

**Note:** You cannot connect to the private Cloud SQL instance from outside Google Cloud Platform.

## Deploying a GKE Cluster

Before we can install GitLab, we need to first deploy a [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine/)
cluster. By using our open-source [GKE module](https://github.com/gruntwork-io/terraform-google-gke) we can easily
deploy a production-grade GKE cluster.

First, let’s create a new directory to work in:

```bash
$ mkdir -p google-ci-gitlab
$ cd google-ci-gitlab
```

Then create a `main.tf` file and copy the following code:

```hcl
provider "google" {
  version = "~> 2.7.0"
  project = "${var.project}"
  region  = "${var.region}"

  scopes = [
    # Default scopes
    "https://www.googleapis.com/auth/compute",

    "https://www.googleapis.com/auth/cloud-platform",
    "https://www.googleapis.com/auth/ndev.clouddns.readwrite",
    "https://www.googleapis.com/auth/devstorage.full_control",

    # Required for google_client_openid_userinfo
    "https://www.googleapis.com/auth/userinfo.email",
  ]
}

provider "google-beta" {
  version = "~> 2.7.0"
  project = "${var.project}"
  region  = "${var.region}"

  scopes = [
    # Default scopes
    "https://www.googleapis.com/auth/compute",

    "https://www.googleapis.com/auth/cloud-platform",
    "https://www.googleapis.com/auth/ndev.clouddns.readwrite",
    "https://www.googleapis.com/auth/devstorage.full_control",

    # Required for google_client_openid_userinfo
    "https://www.googleapis.com/auth/userinfo.email",
  ]
}

# We use this data provider to expose an access token for communicating with the GKE cluster.
data "google_client_config" "client" {}

# Use this datasource to access the Terraform account's email for Kubernetes permissions.
data "google_client_openid_userinfo" "terraform_user" {}

provider "kubernetes" {
  version = "~> 1.5.2"

  load_config_file       = false
  host                   = "${data.template_file.gke_host_endpoint.rendered}"
  token                  = "${data.template_file.access_token.rendered}"
  cluster_ca_certificate = "${data.template_file.cluster_ca_certificate.rendered}"
}

provider "helm" {
  # We don't install Tiller automatically, but instead use Kubergrunt as it sets up the TLS certificates much easier.
  install_tiller = false

  # Enable TLS so Helm can communicate with Tiller securely.
  enable_tls = true

  # We install Tiller into it's own namespace for better isolation.
  namespace = "${var.tiller_namespace}"

  kubernetes {
    host                   = "${data.template_file.gke_host_endpoint.rendered}"
    token                  = "${data.template_file.access_token.rendered}"
    cluster_ca_certificate = "${data.template_file.cluster_ca_certificate.rendered}"
  }
}

# ---------------------------------------------------------------------------------------------------------------------
# DEPLOY A PRIVATE GKE CLUSTER IN GOOGLE CLOUD PLATFORM
# ---------------------------------------------------------------------------------------------------------------------

module "gke_cluster" {
  # Use a recent version of the gke-cluster module
  source = "github.com/gruntwork-io/terraform-google-gke.git//modules/gke-cluster?ref=v0.2.0"

  name = "${var.cluster_name}"

  project  = "${var.project}"
  location = "${var.location}"
  network  = "${module.vpc_network.network}"

  # We're deploying the cluster in the 'public' subnetwork to allow outbound internet access
  # See the network access tier table for full details:
  # https://github.com/gruntwork-io/terraform-google-network/tree/master/modules/vpc-network#access-tier
  subnetwork = "${module.vpc_network.public_subnetwork}"

  # When creating a private cluster, the 'master_ipv4_cidr_block' has to be defined and the size must be /28
  master_ipv4_cidr_block = "${var.master_ipv4_cidr_block}"

  # This setting will make the cluster private
  enable_private_nodes = "true"

  # To make testing easier, we keep the public endpoint variable available. In production, we highly recommend restricting access to only within the network boundary, requiring your users to use a bastion host or VPN.
  disable_public_endpoint = "false"

  # With a private cluster, it is highly recommended to restrict access to the cluster master
  # However, for example purposes we will allow all inbound traffic.
  master_authorized_networks_config = [{
    cidr_blocks = [{
      cidr_block   = "0.0.0.0/0"
      display_name = "all-for-testing"
    }]
  }]

  cluster_secondary_range_name = "${module.vpc_network.public_subnetwork_secondary_range_name}"
}

# ---------------------------------------------------------------------------------------------------------------------
# CREATE A NODE POOL
# ---------------------------------------------------------------------------------------------------------------------

resource "google_container_node_pool" "node_pool" {
  provider = "google-beta"

  name     = "private-pool"
  project  = "${var.project}"
  location = "${var.location}"
  cluster  = "${module.gke_cluster.name}"

  initial_node_count = "1"

  autoscaling {
    min_node_count = "1"
    max_node_count = "5"
  }

  management {
    auto_repair  = "true"
    auto_upgrade = "true"
  }

  node_config {
    image_type   = "COS"
    machine_type = "${var.node_machine_type}"

    labels = {
      private-pools-example = "true"
    }

    # Add a private tag to the instances. See the network access tier table for full details:
    # https://github.com/gruntwork-io/terraform-google-network/tree/master/modules/vpc-network#access-tier
    tags = [
      "${module.vpc_network.private}",
      "private-pool-example",
    ]

    disk_size_gb = "30"
    disk_type    = "pd-standard"
    preemptible  = false

    service_account = "${module.gke_service_account.email}"

    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform",
    ]
  }

  lifecycle {
    ignore_changes = ["initial_node_count"]
  }

  timeouts {
    create = "30m"
    update = "30m"
    delete = "30m"
  }
}

# ---------------------------------------------------------------------------------------------------------------------
# CREATE A CUSTOM SERVICE ACCOUNT TO USE WITH THE GKE CLUSTER
# ---------------------------------------------------------------------------------------------------------------------

module "gke_service_account" {
  # Use a recent version of the gke-service-account module
  source = "github.com/gruntwork-io/terraform-google-gke.git//modules/gke-service-account?ref=v0.2.0"

  name        = "${var.cluster_service_account_name}"
  project     = "${var.project}"
  description = "${var.cluster_service_account_description}"
}

# ---------------------------------------------------------------------------------------------------------------------
# ALLOW THE CUSTOM SERVICE ACCOUNT TO PULL IMAGES FROM THE GCR REPO
# ---------------------------------------------------------------------------------------------------------------------

resource "google_storage_bucket_iam_member" "member" {
  bucket = "artifacts.${var.project}.appspot.com"
  role   = "roles/storage.objectViewer"
  member = "serviceAccount:${module.gke_service_account.email}"
}

# ---------------------------------------------------------------------------------------------------------------------
# CREATE A CUSTOM SERVICE ACCOUNT TO USE WITH THE CLOUD STORAGE BUCKETS
# ---------------------------------------------------------------------------------------------------------------------

resource "google_service_account" "gcs_service_account" {
  project      = "${var.project}"
  account_id   = "${var.gcs_service_account_name}"
  display_name = "${var.gcs_service_account_description}"
}

resource "google_service_account_key" "gcs_service_account_key" {
  service_account_id = "${google_service_account.gcs_service_account.name}"
}

resource "google_project_iam_member" "gcs_service_account-admin" {
  project = "${var.project}"
  role    = "roles/storage.admin"
  member  = "serviceAccount:${google_service_account.gcs_service_account.email}"
}

# ---------------------------------------------------------------------------------------------------------------------
# CREATE CLOUD SQL DATABASE INSTANCE WITH PRIVATE IP
# ---------------------------------------------------------------------------------------------------------------------

module "postgres" {
  # Use a recent version of the cloud-sql module
  source = "github.com/gruntwork-io/terraform-google-sql.git//modules/cloud-sql?ref=v0.1.1"

  project = "${var.project}"
  region  = "${var.region}"
  name    = "${local.db_instance_name}"
  db_name = "${var.db_name}"

  engine       = "${var.postgres_version}"
  machine_type = "${var.db_machine_type}"

  # Indicate that we want to create a failover replica for high availability
  enable_failover_replica = true

  # These together will construct the master_user privileges, i.e.
  # 'master_user_name'@'master_user_host' IDENTIFIED BY 'master_user_password'.
  # These should typically be set as the environment variable TF_VAR_db_master_user_password, etc.
  # so you don't check these into source control."
  master_user_password = "${var.db_master_user_password}"

  master_user_name = "${var.db_master_user_name}"
  master_user_host = "%"

  # Pass the private network link to the module
  private_network = "${module.vpc_network.network}"

  # Wait for the vpc connection to complete
  dependencies = ["${google_service_networking_connection.private_vpc_connection.network}"]

  custom_labels = {
    test-id = "postgres-private-ip-example"
  }
}

# ---------------------------------------------------------------------------------------------------------------------
# CREATE A REDIS INSTANCE
# ---------------------------------------------------------------------------------------------------------------------

resource "google_redis_instance" "redis" {
  name           = "${var.redis_name}"
  tier           = "STANDARD_HA"
  memory_size_gb = 5
  region         = "${var.region}"

  # Pass the private network link to the resource
  authorized_network = "${module.vpc_network.network}"

  location_id             = "${var.region}-a"
  alternative_location_id = "${var.region}-c"
  display_name            = "GitLab Redis"
}

# ---------------------------------------------------------------------------------------------------------------------
# CREATE THE VARIOUS CLOUD STORAGE BUCKETS
# ---------------------------------------------------------------------------------------------------------------------

resource "google_storage_bucket" "gitlab_uploads" {
  name     = "${var.gcs_gitlab_uploads}-${random_string.suffix.result}"
  location = "${var.region}"
}

resource "google_storage_bucket" "gitlab_artifacts" {
  name     = "${var.gcs_gitlab_artifacts}-${random_string.suffix.result}"
  location = "${var.region}"
}

resource "google_storage_bucket" "gitlab_lfs" {
  name     = "${var.gcs_gitlab_lfs}-${random_string.suffix.result}"
  location = "${var.region}"
}

resource "google_storage_bucket" "gitlab_packages" {
  name     = "${var.gcs_gitlab_packages}-${random_string.suffix.result}"
  location = "${var.region}"
}

resource "google_storage_bucket" "gitlab_registry" {
  name     = "${var.gcs_gitlab_registry}-${random_string.suffix.result}"
  location = "${var.region}"
}

# ---------------------------------------------------------------------------------------------------------------------
# CREATE THE VARIOUS KUBERNETES SECRETS
# ---------------------------------------------------------------------------------------------------------------------

resource "kubernetes_secret" "gitlab_pg" {
  metadata {
    name = "gitlab-pg"
  }

  data {
    password = "${var.db_master_user_password}"
  }
}

resource "kubernetes_secret" "gitlab_rails_storage" {
  metadata {
    name = "gitlab-rails-storage"
  }

  data {
    connection = <<EOT
provider: Google
google_project: ${var.project}
google_client_email: ${google_service_account.gcs_service_account.email}
google_json_key_string: '${base64decode(google_service_account_key.gcs_service_account_key.private_key)}'
EOT
  }
}

resource "kubernetes_secret" "gitlab_gcs_credentials" {
  metadata {
    name = "google-application-credentials"
  }

  data {
    gcs-application-credentials-file = "${base64decode(google_service_account_key.gcs_service_account_key.private_key)}"
  }
}

# ---------------------------------------------------------------------------------------------------------------------
# INSTALL GITLAB USING HELM
# ---------------------------------------------------------------------------------------------------------------------

data "helm_repository" "gitlab" {
  name = "gitlab"
  url  = "https://charts.gitlab.io"
}

data "template_file" "helm_values" {
  template = "${file("${path.module}/values.yaml.tpl")}"

  vars = {
    INGRESS_IP         = "${google_compute_address.gitlab.address}"
    DB_PRIVATE_IP      = "${module.postgres.master_private_ip_address}"
    REDIS_PRIVATE_IP   = "${google_redis_instance.redis.host}"
    PROJECT_ID         = "${var.project}"
    CERT_MANAGER_EMAIL = "${var.certmanager_email}"
  }
}

resource "helm_release" "gitlab" {
  name       = "gitlab"
  repository = "${data.helm_repository.gitlab.0.name}"
  chart      = "gitlab"
  version    = "1.9.0"
  timeout    = 600

  # TODO - should apps run in yet another namespace?
  namespace = "${var.tiller_namespace}"

  values = ["${data.template_file.helm_values.rendered}"]

  depends_on = [
    "google_redis_instance.redis",
    "null_resource.grant_and_configure_helm",
  ]
}

# ---------------------------------------------------------------------------------------------------------------------
# CREATE A NETWORK TO DEPLOY THE GKE CLUSTER TO
# ---------------------------------------------------------------------------------------------------------------------

module "vpc_network" {
  source = "github.com/gruntwork-io/terraform-google-network.git//modules/vpc-network?ref=firewall-create-before-destroy"

  name_prefix = "${var.cluster_name}-network-${random_string.suffix.result}"
  project     = "${var.project}"
  region      = "${var.region}"

  cidr_block           = "${var.vpc_cidr_block}"
  secondary_cidr_block = "${var.vpc_secondary_cidr_block}"
}

# Reserve global internal address range for the peering
resource "google_compute_global_address" "private_ip_address" {
  provider      = "google-beta"
  name          = "${local.private_ip_name}"
  purpose       = "VPC_PEERING"
  address_type  = "INTERNAL"
  prefix_length = 16
  network       = "${module.vpc_network.network}"
}

# Establish VPC network peering connection using the reserved address range
resource "google_service_networking_connection" "private_vpc_connection" {
  provider                = "google-beta"
  network                 = "${module.vpc_network.network}"
  service                 = "servicenetworking.googleapis.com"
  reserved_peering_ranges = ["${google_compute_global_address.private_ip_address.name}"]
}

# Expose an external IP address
resource "google_compute_address" "gitlab" {
  name         = "gitlab"
  region       = "${var.region}"
  address_type = "EXTERNAL"
  description  = "Gitlab Ingress IP"
}

# ---------------------------------------------------------------------------------------------------------------------
# CONFIGURE KUBECTL AND RBAC ROLE PERMISSIONS
# ---------------------------------------------------------------------------------------------------------------------

# configure kubectl with the credentials of the GKE cluster
resource "null_resource" "configure_kubectl" {
  provisioner "local-exec" {
    command = "gcloud beta container clusters get-credentials ${module.gke_cluster.name} --region ${var.region} --project ${var.project}"

    # Use environment variables to allow custom kubectl config paths
    environment = {
      KUBECONFIG = "${var.kubectl_config_path != "" ? "${var.kubectl_config_path}" : ""}"
    }
  }

  depends_on = ["google_container_node_pool.node_pool"]
}

# Create a Namespace for Tiller
resource "kubernetes_namespace" "tiller" {
  metadata {
    name = "${var.tiller_namespace}"
  }
}

# Create a ServiceAccount for Tiller
resource "kubernetes_service_account" "tiller" {
  metadata {
    name      = "tiller"
    namespace = "${var.tiller_namespace}"
  }

  automount_service_account_token = true

  depends_on = ["kubernetes_namespace.tiller"]
}

# Define a Role that allows Tiller to manage all resources in tiller-world
# See: https://helm.sh/docs/using_helm/#example-deploy-tiller-in-a-namespace-restricted-to-deploying-resources-only-in-that-namespace
# for more information.
resource "kubernetes_role" "tiller" {
  metadata {
    name      = "${var.tiller_role}"
    namespace = "${var.tiller_namespace}"
  }

  rule {
    api_groups = ["", "batch", "extensions", "apps"]
    resources  = ["*"]
    verbs      = ["*"]
  }
}

# Ensure the User running Terraform has full access to modify the cluster.
resource "kubernetes_cluster_role_binding" "user" {
  metadata {
    name = "admin-user"
  }

  role_ref {
    kind      = "ClusterRole"
    name      = "cluster-admin"
    api_group = "rbac.authorization.k8s.io"
  }

  subject {
    kind      = "User"
    name      = "${data.google_client_openid_userinfo.terraform_user.email}"
    api_group = "rbac.authorization.k8s.io"
  }

  subject {
    kind      = "Group"
    name      = "system:masters"
    api_group = "rbac.authorization.k8s.io"
  }
}

# Specify a RoleBinding to limit Tiller's scope to a particular namespace.
resource "kubernetes_role_binding" "tiller" {
  metadata {
    name      = "tiller-binding"
    namespace = "${var.tiller_namespace}"
  }

  role_ref {
    kind      = "Role"
    name      = "${var.tiller_role}"
    api_group = "rbac.authorization.k8s.io"
  }

  subject {
    kind      = "ServiceAccount"
    name      = "${kubernetes_service_account.tiller.metadata.0.name}"
    namespace = "${var.tiller_namespace}"
  }

  #subject {
  #  kind      = "Group"
  #  name      = "system:masters"
  #  api_group = "rbac.authorization.k8s.io"
  #}
}

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# GENERATE TLS CERTIFICATES FOR USE WITH TILLER
# This will use kubergrunt to generate TLS certificates, and upload them as Kubernetes Secrets that can then be used by
# Tiller.
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

resource "null_resource" "tiller_tls_certs" {
  provisioner "local-exec" {
    command = <<-EOF
    # Generate CA TLS certs
    kubergrunt tls gen --ca --namespace kube-system --secret-name ${local.tls_ca_secret_name} --secret-label gruntwork.io/tiller-namespace=${var.tiller_namespace} --secret-label gruntwork.io/tiller-credentials=true --secret-label gruntwork.io/tiller-credentials-type=ca --tls-subject-json '${jsonencode(var.tls_subject)}' ${local.tls_algorithm_config} ${local.kubectl_auth_config}

    # Then use that CA to generate server TLS certs
    kubergrunt tls gen --namespace ${var.tiller_namespace} --ca-secret-name ${local.tls_ca_secret_name} --ca-namespace kube-system --secret-name ${local.tls_secret_name} --secret-label gruntwork.io/tiller-namespace=${var.tiller_namespace} --secret-label gruntwork.io/tiller-credentials=true --secret-label gruntwork.io/tiller-credentials-type=server --tls-subject-json '${jsonencode(var.tls_subject)}' ${local.tls_algorithm_config} ${local.kubectl_auth_config}
    EOF

    # Use environment variables for Kubernetes credentials to avoid leaking into the logs
    environment = {
      KUBECTL_SERVER_ENDPOINT = "${data.template_file.gke_host_endpoint.rendered}"
      KUBECTL_CA_DATA         = "${base64encode(data.template_file.cluster_ca_certificate.rendered)}"
      KUBECTL_TOKEN           = "${data.template_file.access_token.rendered}"
    }
  }
}

# ---------------------------------------------------------------------------------------------------------------------
# DEPLOY TILLER TO THE GKE CLUSTER
# ---------------------------------------------------------------------------------------------------------------------

module "tiller" {
  source = "git::git@github.com:gruntwork-io/terraform-kubernetes-helm.git//modules/k8s-tiller?ref=v0.3.0"

  tiller_service_account_name              = "${kubernetes_service_account.tiller.metadata.0.name}"
  tiller_service_account_token_secret_name = "${kubernetes_service_account.tiller.default_secret_name}"
  tiller_tls_secret_name                   = "${local.tls_secret_name}"
  namespace                                = "${var.tiller_namespace}"
  tiller_image_version                     = "${local.tiller_version}"

  # Kubergrunt will store the private key under the key "tls.pem" in the corresponding Secret resource, which will be
  # accessed as a file when mounted into the container.
  tiller_tls_key_file_name = "tls.pem"

  dependencies = ["${null_resource.tiller_tls_certs.id}", "${kubernetes_cluster_role_binding.user.id}", "${kubernetes_role_binding.tiller.id}"]
}

# The Deployment resources created in the module call to `k8s-tiller` will be complete creation before the rollout is
# complete. We use kubergrunt here to wait for the deployment to complete, so that when this resource is done creating,
# any resources that depend on this can assume Tiller is successfully deployed and up at that point.
resource "null_resource" "wait_for_tiller" {
  provisioner "local-exec" {
    command = "kubergrunt helm wait-for-tiller --tiller-namespace ${var.tiller_namespace} --tiller-deployment-name ${module.tiller.deployment_name} --expected-tiller-version ${local.tiller_version} ${local.kubectl_auth_config}"

    # Use environment variables for Kubernetes credentials to avoid leaking into the logs
    environment = {
      KUBECTL_SERVER_ENDPOINT = "${data.template_file.gke_host_endpoint.rendered}"
      KUBECTL_CA_DATA         = "${base64encode(data.template_file.cluster_ca_certificate.rendered)}"
      KUBECTL_TOKEN           = "${data.template_file.access_token.rendered}"
    }
  }
}

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# CONFIGURE OPERATOR HELM CLIENT
# To allow usage of the helm client immediately, we grant access to the admin RBAC user and configure the local helm
# client.
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

resource "null_resource" "grant_and_configure_helm" {
  provisioner "local-exec" {
    command = <<-EOF
    kubergrunt helm grant --tiller-namespace ${var.tiller_namespace} --tls-subject-json '${jsonencode(var.client_tls_subject)}' --rbac-user ${data.google_client_openid_userinfo.terraform_user.email} ${local.kubectl_auth_config}

    kubergrunt helm configure --helm-home ${pathexpand("~/.helm")} --tiller-namespace ${var.tiller_namespace} --resource-namespace ${local.resource_namespace} --rbac-user ${data.google_client_openid_userinfo.terraform_user.email} ${local.kubectl_auth_config}
    EOF

    # Use environment variables for Kubernetes credentials to avoid leaking into the logs
    environment = {
      KUBECTL_SERVER_ENDPOINT = "${data.template_file.gke_host_endpoint.rendered}"
      KUBECTL_CA_DATA         = "${base64encode(data.template_file.cluster_ca_certificate.rendered)}"
      KUBECTL_TOKEN           = "${data.template_file.access_token.rendered}"
    }
  }

  depends_on = ["null_resource.wait_for_tiller"]
}

# ---------------------------------------------------------------------------------------------------------------------
# COMPUTATIONS
# These locals set constants and compute various useful information used throughout this Terraform module.
# ---------------------------------------------------------------------------------------------------------------------

locals {
  # For this example, we setup Tiller to manage the default Namespace.
  # TODO - specify tiller thing
  resource_namespace = "default"

  # We install an older version of Tiller to match the Helm library version used in the Terraform helm provider.
  tiller_version = "v2.11.0"

  # We store the CA Secret in the kube-system Namespace, given that only cluster admins should access these.
  tls_ca_secret_namespace = "kube-system"

  # We name the TLS Secrets to be compatible with the `kubergrunt helm grant` command
  tls_ca_secret_name   = "${var.tiller_namespace}-namespace-tiller-ca-certs"
  tls_secret_name      = "tiller-certs"
  tls_algorithm_config = "--tls-private-key-algorithm ${var.private_key_algorithm} ${var.private_key_algorithm == "ECDSA" ? "--tls-private-key-ecdsa-curve ${var.private_key_ecdsa_curve}" : "--tls-private-key-rsa-bits ${var.private_key_rsa_bits}"}"

  # These will be filled in by the shell environment
  kubectl_auth_config = "--kubectl-server-endpoint \"$KUBECTL_SERVER_ENDPOINT\" --kubectl-certificate-authority \"$KUBECTL_CA_DATA\" --kubectl-token \"$KUBECTL_TOKEN\""

  db_instance_name = "${format("%s-%s", var.db_name_prefix, random_string.suffix.result)}"
  private_ip_name  = "private-ip-${random_string.suffix.result}"
}

# ---------------------------------------------------------------------------------------------------------------------
# WORKAROUNDS
# ---------------------------------------------------------------------------------------------------------------------

# This is a workaround for the Kubernetes and Helm providers as Terraform doesn't currently support passing in module
# outputs to providers directly.

data "template_file" "gke_host_endpoint" {
  template = "${module.gke_cluster.endpoint}"
}

data "template_file" "access_token" {
  template = "${data.google_client_config.client.access_token}"
}

data "template_file" "cluster_ca_certificate" {
  template = "${module.gke_cluster.cluster_ca_certificate}"
}

# Use a random suffix to prevent overlap in network names
resource "random_string" "suffix" {
  length  = 4
  special = false
  upper   = false
}
```

The `main.tf` file is responsible for creating all of the GCP resources. After that let's create both the `outputs.tf`
and `variables.tf` files:

**outputs.tf**

```hcl
output "cluster_endpoint" {
  description = "The IP address of the cluster master."
  sensitive   = true
  value       = "${module.gke_cluster.endpoint}"
}

output "client_certificate" {
  description = "Public certificate used by clients to authenticate to the cluster endpoint."
  value       = "${module.gke_cluster.client_certificate}"
}

output "client_key" {
  description = "Private key used by clients to authenticate to the cluster endpoint."
  sensitive   = true
  value       = "${module.gke_cluster.client_key}"
}

output "cluster_ca_certificate" {
  description = "The public certificate that is the root of trust for the cluster."
  sensitive   = true
  value       = "${module.gke_cluster.cluster_ca_certificate}"
}

output "db_master_instance_name" {
  description = "The name of the database instance"
  value       = "${module.postgres.master_instance_name}"
}

output "db_master_ip_addresses" {
  description = "All IP addresses of the instance as list of maps, see https://www.terraform.io/docs/providers/google/r/sql_database_instance.html#ip_address-0-ip_address"
  value       = "${module.postgres.master_ip_addresses}"
}

output "db_master_private_ip" {
  description = "The private IPv4 address of the master instance"
  value       = "${module.postgres.master_private_ip_address}"
}

output "db_master_instance" {
  description = "Self link to the master instance"
  value       = "${module.postgres.master_instance}"
}

output "db_master_proxy_connection" {
  description = "Instance path for connecting with Cloud SQL Proxy. Read more at https://cloud.google.com/sql/docs/mysql/sql-proxy"
  value       = "${module.postgres.master_proxy_connection}"
}

output "db_name" {
  description = "Name of the default database"
  value       = "${module.postgres.db_name}"
}

output "db" {
  description = "Self link to the default database"
  value       = "${module.postgres.db}"
}

```

**variables.tf**

```hcl
# ---------------------------------------------------------------------------------------------------------------------
# REQUIRED PARAMETERS
# These variables are expected to be passed in by the operator.
# ---------------------------------------------------------------------------------------------------------------------

variable "project" {
  description = "The project ID where all resources will be launched."
}

variable "location" {
  description = "The location (region or zone) of the GKE cluster."
}

variable "region" {
  description = "The region for the network. If the cluster is regional, this must be the same region. Otherwise, it should be the region of the zone."
}

# Note, after a db instance name is used, it cannot be reused for up to one week.
variable "db_name_prefix" {
  description = "The name prefix for the database instance. Will be appended with a random string. Use lowercase letters, numbers, and hyphens. Start with a letter."
}

variable "db_master_user_name" {
  description = "The username part for the default user credentials, i.e. 'master_user_name'@'master_user_host' IDENTIFIED BY 'master_user_password'. This should typically be set as the environment variable TF_VAR_master_user_name so you don't check it into source control."
}

variable "db_master_user_password" {
  description = "The password part for the default user credentials, i.e. 'master_user_name'@'master_user_host' IDENTIFIED BY 'master_user_password'. This should typically be set as the environment variable TF_VAR_master_user_password so you don't check it into source control."
}

variable "certmanager_email" {
  description = "Email used to retrieve SSL certificates from Let's Encrypt"
}

# ---------------------------------------------------------------------------------------------------------------------
# OPTIONAL PARAMETERS
# These parameters have reasonable defaults.
# ---------------------------------------------------------------------------------------------------------------------

variable "cluster_name" {
  description = "The name of the Kubernetes cluster."
  default     = "gitlab-example-cluster"
}

variable "cluster_service_account_name" {
  description = "The name of the custom service account used for the GKE cluster. This parameter is limited to a maximum of 28 characters."
  default     = "gitlab-example-cluster-sa"
}

variable "cluster_service_account_description" {
  description = "A description of the custom service account used for the GKE cluster."
  default     = "Example GKE Cluster Service Account managed by Terraform"
}

variable "node_machine_type" {
  description = "The machine type to use for GKE cluster nodes, see https://cloud.google.com/kubernetes-engine/pricing for more details"
  default     = "n1-standard-1"
}

variable "postgres_version" {
  description = "The engine version of the database, e.g. `POSTGRES_9_6`. See https://cloud.google.com/sql/docs/db-versions for supported versions."
  default     = "POSTGRES_9_6"
}

variable "db_machine_type" {
  description = "The machine type to use, see https://cloud.google.com/sql/pricing for more details"

  # See https://cloud.google.com/sql/docs/postgres/create-instance#machine-types
  default = "db-custom-1-3840"
}

variable "db_name" {
  description = "Name for the db"
  default     = "gitlab"
}

variable "redis_name" {
  description = "Name for the Redis db"
  default     = "gitlab"
}

# Cloud Storage Buckets

variable "gcs_service_account_name" {
  description = "The name of the custom service account used for the GCS buckets. This parameter is limited to a maximum of 28 characters."
  default     = "gitlab-example-gcs-sa"
}

variable "gcs_service_account_description" {
  description = "A description of the custom service account used for the GCS buckets."
  default     = "Example GCS Service Account managed by Terraform"
}

variable "gcs_gitlab_uploads" {
  description = "Name for the GitLab upload bucket"
  default     = "gitlab-uploads"
}

variable "gcs_gitlab_artifacts" {
  description = "Name for the GitLab artifacts bucket"
  default     = "gitlab-artifacts"
}

variable "gcs_gitlab_lfs" {
  description = "Name for the GitLab LFS bucket"
  default     = "gitlab-lfs"
}

variable "gcs_gitlab_packages" {
  description = "Name for the GitLab packages bucket"
  default     = "gitlab-packages"
}

variable "gcs_gitlab_registry" {
  description = "Name for the GitLab registry bucket"
  default     = "gitlab-registry"
}

# Kubectl options

variable "kubectl_config_path" {
  description = "Path to the kubectl config file. Defaults to $HOME/.kube/config"
  default     = ""
}

# Tiller options

# For the example we install Tiller into a separate K8s namespace for better security.
variable "tiller_namespace" {
  description = "The name of the Kubernetes namespace where we should install Tiller. Note: We don't use 'kube-system' for better security."
  default     = "tiller-world"
}

variable "tiller_role" {
  description = "Define a Role that allows Tiller to manage all resources in ${var.tiller_namespace}."
  default     = "tiller-manager"
}

variable "force_undeploy" {
  description = "If true, will remove the Tiller server resources even if there are releases deployed."
  default     = false
}

variable "undeploy_releases" {
  description = "If true, will delete deployed releases from the Tiller instance before undeploying Tiller."
  default     = false
}

# Tiller TLS settings

variable "tls_subject" {
  description = "The issuer information that contains the identifying information for the Tiller server. Used to generate the TLS certificate keypairs."
  type        = "map"

  default = {
    common_name = "tiller"
    org         = "Gruntwork"
  }

  # Expects the following keys
  # - common_name (required)
  # - org (required)
  # - org_unit
  # - city
  # - state
  # - country
}

variable "client_tls_subject" {
  description = "The issuer information that contains the identifying information for the helm client of the operator. Used to generate the TLS certificate keypairs."
  type        = "map"

  default = {
    common_name = "admin"
    org         = "Gruntwork"
  }

  # Expects the following keys
  # - common_name (required)
  # - org (required)
  # - org_unit
  # - city
  # - state
  # - country
}

# TLS algorithm configuration

variable "private_key_algorithm" {
  description = "The name of the algorithm to use for private keys. Must be one of: RSA or ECDSA."
  default     = "ECDSA"
}

variable "private_key_ecdsa_curve" {
  description = "The name of the elliptic curve to use. Should only be used if var.private_key_algorithm is ECDSA. Must be one of P224, P256, P384 or P521."
  default     = "P256"
}

variable "private_key_rsa_bits" {
  description = "The size of the generated RSA key in bits. Should only be used if var.private_key_algorithm is RSA."
  default     = "2048"
}

variable "master_ipv4_cidr_block" {
  description = "The IP range in CIDR notation (size must be /28) to use for the hosted master network. This range will be used for assigning internal IP addresses to the master or set of masters, as well as the ILB VIP. This range must not overlap with any other ranges in use within the cluster's network."
  default     = "10.5.0.0/28"
}

# For the example, we recommend a /16 network for the VPC. Note that when changing the size of the network,
# you will have to adjust the 'cidr_subnetwork_width_delta' in the 'vpc_network' -module accordingly.
variable "vpc_cidr_block" {
  description = "The IP address range of the VPC in CIDR notation. A prefix of /16 is recommended. Do not use a prefix higher than /27."
  default     = "10.3.0.0/16"
}

# For the example, we recommend a /16 network for the secondary range. Note that when changing the size of the network,
# you will have to adjust the 'cidr_subnetwork_width_delta' in the 'vpc_network' -module accordingly.
variable "vpc_secondary_cidr_block" {
  description = "The IP address range of the VPC's secondary address range in CIDR notation. A prefix of /16 is recommended. Do not use a prefix higher than /27."
  default     = "10.4.0.0/16"
}
```

**values.yaml.tpl**

```yaml
# Values for gitlab/gitlab chart on GKE
global:
  edition: ce
  hosts:
    domain: ${INGRESS_IP}.xip.io
    https: true
    externalIP: ${INGRESS_IP}
    ssh: ~

  ## doc/charts/globals.md#configure-ingress-settings
  ingress:
    configureCertmanager: true
    enabled: true
    tls:
      enabled: true

  ## doc/charts/globals.md#configure-postgresql-settings
  psql:
    password:
      secret: gitlab-pg
      key: password
    host: ${DB_PRIVATE_IP}
    port: 5432
    username: gitlab
    database: gitlab

  redis:
    password:
      enabled: false
    host: ${REDIS_PRIVATE_IP}

  ## doc/charts/globals.md#configure-minio-settings
  minio:
    enabled: false

  ## doc/charts/globals.md#configure-appconfig-settings
  ## Rails based portions of this chart share many settings
  appConfig:
    ## doc/charts/globals.md#general-application-settings
    enableUsagePing: false

    ## doc/charts/globals.md#lfs-artifacts-uploads-packages
    backups:
      bucket: ${PROJECT_ID}-gitlab-backups
    lfs:
      bucket: ${PROJECT_ID}-git-lfs
      connection:
        secret: gitlab-rails-storage
        key: connection
    artifacts:
      bucket: ${PROJECT_ID}-gitlab-artifacts
      connection:
        secret: gitlab-rails-storage
        key: connection
    uploads:
      bucket: ${PROJECT_ID}-gitlab-uploads
      connection:
        secret: gitlab-rails-storage
        key: connection
    packages:
      bucket: ${PROJECT_ID}-gitlab-packages
      connection:
        secret: gitlab-rails-storage
        key: connection

    ## doc/charts/globals.md#pseudonymizer-settings
    pseudonymizer:
      bucket: ${PROJECT_ID}-gitlab-pseudo
      connection:
        secret: gitlab-rails-storage
        key: connection

certmanager-issuer:
  email: ${CERT_MANAGER_EMAIL}

prometheus:
  install: false

redis:
  enabled: false

gitlab:
  gitaly:
    persistence:
      size: 200Gi
      storageClass: "pd-ssd"
  task-runner:
    backups:
      objectStorage:
        backend: gcs
        config:
          secret: google-application-credentials
          key: gcs-application-credentials-file

postgresql:
  install: false

gitlab-runner:
  install: true
  rbac:
    create: true
  runners:
    locked: false
    cache:
      cacheType: gcs
      gcsBucketname: ${PROJECT_ID}-runner-cache
      secretName: google-application-credentials
      cacheShared: true
```

**Note:** Be sure to fill in any required variables that don't have a default value.

Now we can use Terraform to create the resources:

1. Run `terraform init`.
2. Run `terraform plan`.
3. If the plan looks good, run `terraform apply`.

Terraform will begin to create the GCP resources. This process can take up to XX minutes.

## Verifying the Helm/Tiller deployment

Before we can use `helm` to install GitLab, we need to first verify the installation was successful:

```bash
$ helm --tls --tls-verify --tiller-namespace tiller-world version
```

**Note:** Be sure to replace 'tiller-world' if you installed Tiller in a different namespace.

It can be cumbersome to pass those arguments every time you wish to use `helm` so fortunately `kubergrunt` installs an
environment file into your helm home directory that you can dot source to use those options:

```bash
$ . ~/.helm/env
$ helm version
```

## Installing GitLab

Now its time to install GitLab.

**Note:** Some GitLab features are currently not available when using the Helm chart:

- GitLab Pages
- GitLab Geo
- No in-cluster HA database
- Smartcard authentication

We can check the latest versions using the following command:

```bash
$ helm search -l gitlab/gitlab | head -n4
NAME                    CHART VERSION   APP VERSION     DESCRIPTION
gitlab/gitlab           1.9.0           11.11.0         Web-based Git-repository manager with wiki and issue-trac...
gitlab/gitlab           1.8.4           11.10.4         Web-based Git-repository manager with wiki and issue-trac...
gitlab/gitlab           1.8.3           11.10.3         Web-based Git-repository manager with wiki and issue-trac...
```

**Note**: The GitLab chart doesn't have the same version number as GitLab itself. For more information please refer to the [GitLab version mappings](https://docs.gitlab.com/charts/installation/version_mappings.html) document.

Please read the GitLab [Helm Deployment Guide](https://docs.gitlab.com/charts/installation/deployment.html) for more information on customizing
the GitLab installation.

## Deploying the Dockerized App

To deploy our Dockerized App on the GKE cluster, we can use the `kubectl` CLI tool to create a
[Kubernetes Pod](https://kubernetes.io/docs/concepts/workloads/pods/pod-overview/). A Pod is the smallest deployable
object in the Kubernetes object model and will contain only our `simple-web-app` Docker image.

First, we must configure `kubectl` to use the newly created cluster:

```
$ gcloud container clusters get-credentials example-private-cluster
```

**Note**: Be sure to substitute `example-private-cluster` with the name of your GKE cluster.

Use the `kubectl run` command to create a [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
named `simple-web-app-deploy` on your cluster:

```bash
$ kubectl run simple-web-app-deploy --image=gcr.io/${PROJECT_ID}/simple-web-app:v1 --port 8080
```

To see the Pod created by the last command, you can run:

```bash
$ kubectl get pods
```

The output should look similar to the following:

```bash
NAME                                     READY     STATUS             RESTARTS   AGE
simple-web-app-deploy-7fb787c449-vgtf6   0/1       ContainerCreating  0          7s
```

Now we need to expose the app to the public internet.

## Attaching a Load Balancer

So far we have deployed the dockerized app, but it is not currently accessible from the public internet. This is because
we have not assigned an external IP address or load balancer to the Pod. We can easily achieve this, by running the
following command:

```bash
$ kubectl expose deployment simple-web-app-deploy --type=LoadBalancer --port 80 --target-port 8080
```

**Note:** GKE assigns the external IP address to the Service resource, not the Deployment.

## Cleaning Up

In order to save costs, we recommend you destroy any infrastructure you've created by following this guide.

First, delete the Kubernetes Service:

```bash
$ kubectl delete service simple-web-app-deploy
```

This will destroy the Load Balancer created during the previous step.

Then remove GitLab using the Helm chart:

```bash
$ helm delete gitlab
```

Next, to destroy the GKE cluster, you can simply invoke the `terraform destroy` command:

```bash
$ terraform destroy
```

**Note**: This is a destructive command that will forcibly terminate and destroy your GKE cluster!
