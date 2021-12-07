# Launch a GKE Cluster

Now you’ve successfully pushed the Docker image to the private Container Registry, you need to launch a
[Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine/) cluster. You can quickly spin up a
production-grade GKE cluster using the [terraform-google-gke modules](https://github.com/gruntwork-io/terraform-google-gke)
from the Gruntwork Infrastructure as Code Library.

First, create a `terraform` directory:

```bash
mkdir -p terraform
cd terraform
```

Then create a `main.tf` file with the following code:

**terraform/main.tf**

```hcl
terraform {
  # The modules used in this guide require Terraform 0.12, additionally we depend on a bug fixed in version 0.12.7.
  required_version = ">= 0.12.7"
}

provider "google" {
  version = "~> 2.9.0"
  project = var.project
  region  = var.region
}

provider "google-beta" {
  version = "~> 2.9.0"
  project = var.project
  region  = var.region
}

# ---------------------------------------------------------------------------------------------------------------------
# DEPLOY A PRIVATE CLUSTER IN GOOGLE CLOUD PLATFORM
# ---------------------------------------------------------------------------------------------------------------------

module "gke_cluster" {
  # Use a version of the gke-cluster module that supports Terraform 0.12
  source = "git::git@github.com:gruntwork-io/terraform-google-gke.git//modules/gke-cluster?ref=v0.3.8"

  name = var.cluster_name

  project  = var.project
  location = var.location
  network  = module.vpc_network.network

  # We're deploying the cluster in the 'public' subnetwork to allow outbound internet access
  # See the network access tier table for full details:
  # https://github.com/gruntwork-io/terraform-google-network/tree/master/modules/vpc-network#access-tier
  subnetwork = module.vpc_network.public_subnetwork

  # When creating a private cluster, the 'master_ipv4_cidr_block' has to be defined and the size must be /28
  master_ipv4_cidr_block = var.master_ipv4_cidr_block

  # This setting will make the cluster private
  enable_private_nodes = "true"

  # To make testing easier, we keep the public endpoint available. In production, we highly recommend restricting access to only within the network boundary, requiring your users to use a bastion host or VPN.
  disable_public_endpoint = "false"

  # With a private cluster, it is highly recommended to restrict access to the cluster master
  # However, for testing purposes we will allow all inbound traffic.
  master_authorized_networks_config = [
    {
      cidr_blocks = [
        {
          cidr_block   = "0.0.0.0/0"
          display_name = "all-for-testing"
        },
      ]
    },
  ]

  cluster_secondary_range_name = module.vpc_network.public_subnetwork_secondary_range_name
}

# ---------------------------------------------------------------------------------------------------------------------
# CREATE A NODE POOL
# ---------------------------------------------------------------------------------------------------------------------

resource "google_container_node_pool" "node_pool" {
  provider = google-beta

  name     = "private-pool"
  project  = var.project
  location = var.location
  cluster  = module.gke_cluster.name

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
    machine_type = "n1-standard-1"

    labels = {
      private-pools-example = "true"
    }

    # Add a private tag to the instances. See the network access tier table for full details:
    # https://github.com/gruntwork-io/terraform-google-network/tree/master/modules/vpc-network#access-tier
    tags = [
      module.vpc_network.private,
      "private-pool-example",
    ]

    disk_size_gb = "30"
    disk_type    = "pd-standard"
    preemptible  = false

    service_account = module.gke_service_account.email

    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform",
    ]
  }

  lifecycle {
    ignore_changes = [initial_node_count]
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
  source = "git::git@github.com:gruntwork-io/terraform-google-gke.git//modules/gke-service-account?ref=v0.3.8"

  name        = var.cluster_service_account_name
  project     = var.project
  description = var.cluster_service_account_description
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
# CREATE A NETWORK TO DEPLOY THE CLUSTER TO
# ---------------------------------------------------------------------------------------------------------------------

module "vpc_network" {
  source = "github.com/gruntwork-io/terraform-google-network.git//modules/vpc-network?ref=v0.2.1"

  name_prefix = "${var.cluster_name}-network-${random_string.suffix.result}"
  project     = var.project
  region      = var.region

  cidr_block           = var.vpc_cidr_block
  secondary_cidr_block = var.vpc_secondary_cidr_block
}

# Use a random suffix to prevent overlap in network names
resource "random_string" "suffix" {
  length  = 4
  special = false
  upper   = false
}
```

The `main.tf` file is responsible for creating all of the GCP resources. After that, create a `variables.tf` file with
input variables:

**terraform/variables.tf**

```hcl
# ---------------------------------------------------------------------------------------------------------------------
# REQUIRED PARAMETERS
# These variables are expected to be passed in by the operator.
# ---------------------------------------------------------------------------------------------------------------------

variable "project" {
  description = "The project ID where all resources will be launched."
  type        = string
}

variable "location" {
  description = "The location (region or zone) of the GKE cluster."
  type        = string
}

variable "region" {
  description = "The region for the network. If the cluster is regional, this must be the same region. Otherwise, it should be the region of the zone."
  type        = string
}

# ---------------------------------------------------------------------------------------------------------------------
# OPTIONAL PARAMETERS
# These parameters have reasonable defaults.
# ---------------------------------------------------------------------------------------------------------------------

variable "cluster_name" {
  description = "The name of the Kubernetes cluster."
  type        = string
  default     = "example-private-cluster"
}

variable "cluster_service_account_name" {
  description = "The name of the custom service account used for the GKE cluster. This parameter is limited to a maximum of 28 characters."
  type        = string
  default     = "example-private-cluster-sa"
}

variable "cluster_service_account_description" {
  description = "A description of the custom service account used for the GKE cluster."
  type        = string
  default     = "Example GKE Cluster Service Account managed by Terraform"
}

variable "master_ipv4_cidr_block" {
  description = "The IP range in CIDR notation (size must be /28) to use for the hosted master network. This range will be used for assigning internal IP addresses to the master or set of masters, as well as the ILB VIP. This range must not overlap with any other ranges in use within the cluster's network."
  type        = string
  default     = "10.5.0.0/28"
}

# For the example, we recommend a /16 network for the VPC. Note that when changing the size of the network,
# you will have to adjust the 'cidr_subnetwork_width_delta' in the 'vpc_network' -module accordingly.
variable "vpc_cidr_block" {
  description = "The IP address range of the VPC in CIDR notation. A prefix of /16 is recommended. Do not use a prefix higher than /27."
  type        = string
  default     = "10.3.0.0/16"
}

# For the example, we recommend a /16 network for the secondary range. Note that when changing the size of the network,
# you will have to adjust the 'cidr_subnetwork_width_delta' in the 'vpc_network' -module accordingly.
variable "vpc_secondary_cidr_block" {
  description = "The IP address range of the VPC's secondary address range in CIDR notation. A prefix of /16 is recommended. Do not use a prefix higher than /27."
  type        = string
  default     = "10.4.0.0/16"
}
```

And an `outputs.tf` file with output variables:

**terraform/outputs.tf**

```hcl
output "cluster_endpoint" {
  description = "The IP address of the cluster master."
  sensitive   = true
  value       = module.gke_cluster.endpoint
}

output "client_certificate" {
  description = "Public certificate used by clients to authenticate to the cluster endpoint."
  value       = module.gke_cluster.client_certificate
}

output "client_key" {
  description = "Private key used by clients to authenticate to the cluster endpoint."
  sensitive   = true
  value       = module.gke_cluster.client_key
}

output "cluster_ca_certificate" {
  description = "The public certificate that is the root of trust for the cluster."
  sensitive   = true
  value       = module.gke_cluster.cluster_ca_certificate
}
```

Now you can use Terraform to create the resources:

1.  Fill in a `default` value for any variable in `variables.tf` that doesn’t already have one.

2.  Run `terraform init`.

3.  Run `terraform plan`.

4.  If the plan looks good, run `terraform apply`.

Terraform will begin to create the GCP resources. This process can take several minutes, so be patient.



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"0ca9de40db18b67186ccbc08b8e1578a"}
##DOCS-SOURCER-END -->
