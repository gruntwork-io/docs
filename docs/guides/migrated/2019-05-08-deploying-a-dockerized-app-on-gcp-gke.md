---
title: Deploying a Dockerized app on GCP and GKE
categories: Kubernetes
image: /assets/img/guides/gke.jpg
excerpt: Learn how to deploy a Dockerized app to a Kubernetes (GKE) cluster running on Google Cloud Platform (GCP).
redirect_from: /static/guides/kubernetes/deploying-a-dockerized-app-on-gcp-gke/
---

# Intro

This guide walks you through the process of deploying a Dockerized app to a Kubernetes (GKE) cluster running on Google
Cloud Platform (GCP).

## What is Kubernetes?

[Kubernetes (K8S)](https://kubernetes.io/) is an open-source system for managing containerized applications, including:

Scheduling  
Deploy containers across a cluster of servers, using the available resources (data centers, servers, CPU, memory,
ports, etc.) as efficiently as possible.

Deployments  
Roll out updates to containers using a variety of deployment strategies, such as rolling deployment, blue-green
deployment, and canary deployment, and automatically roll back if there’s an error.

Auto healing  
Monitor the health of your containers and servers and automatically replace unhealthy ones.

Auto scaling  
Scale the number of containers and servers up or down in response to load.

Load balancing  
Make your containers accessible to the outside world and distribute traffic across your containers.

Service discovery  
Allow containers to find and communicate with each other over the network, automatically routing requests to the
proper destination.

Configuration and secrets  
Provide containers with environment-specific configuration data and secrets.

## What you’ll learn in this guide

This guide consists of three main sections:

[Core concepts](#core_concepts)  
An overview of the core concepts you need to understand to use Kubernetes, including why you may want to use
Kubernetes, Kubernetes architecture, the control plane, worker nodes, different ways to run Kubernetes, services,
deployments, auto scaling, auto healing, RBAC, and more.

[Deployment walkthrough](#deployment_walkthrough)  
A step-by-step guide to deploying a Dockerized app on GKE using code from the Gruntwork Infrastructure as Code Library.

[Next steps](#next_steps)  
What to do once you’ve got your app deployed.

Feel free to read the guide from start to finish or skip around to whatever part interests you!

# Core concepts

The core concepts for Kubernetes are largely the same on every cloud, so check out the core concepts from
[How to deploy a production-grade Kubernetes cluster on AWS](/guides/kubernetes/how-to-deploy-production-grade-kubernetes-cluster-aws#core_concepts)
to learn about Kubernetes architecture, the control plane, worker nodes, different ways to run Kubernetes, services,
deployments, auto scaling, auto healing, RBAC, and more.

# Deployment walkthrough

Let’s now walk through how to deploy a production-grade Kubernetes cluster in AWS, fully defined and managed as code,
using the Gruntwork Infrastructure as Code Library.

## Pre-requisites

This walkthrough has the following pre-requisites:

Terraform  
This guide uses [Terraform](https://www.terraform.io/) to define and manage all the infrastructure as code. If you’re
not familiar with Terraform, check out [A
Comprehensive Guide to Terraform](https://blog.gruntwork.io/a-comprehensive-guide-to-terraform-b3d32832baca), [A Crash Course on Terraform](https://training.gruntwork.io/p/terraform), and
[How to Use the Gruntwork Infrastructure as Code Library](/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library).

Python and Kubergrunt  
Some of the Terraform modules used in this guide call out to Python code and/or
[Kubergrunt](https://github.com/gruntwork-io/kubergrunt) to fill in missing features in Terraform. Make sure you have
Python and Kubergrunt installed on any computer where you will be running Terraform.

Docker and Packer  
This guide assumes you are deploying a Kubernetes cluster for use with [Docker](https://www.docker.com). The guide also
uses [Packer](https://www.packer.io) to build VM images. If you’re not familiar with Docker or Packer, check out
[A Crash Course on Docker and Packer](https://training.gruntwork.io/p/a-crash-course-on-docker-packer) and
[How to Use the Gruntwork Infrastructure as Code Library](/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library).

GCP  
You will need a GCP account with billing enabled. There is a [free tier](https://cloud.google.com/free/) that
includes $300 of free credit overs a 12 month period. You will also need to install the
[gcloud](https://cloud.google.com/sdk/gcloud/) command-line tool

## Create a Basic App

For the purposes of this guide we will create a basic [Node.js](https://nodejs.org) app that responds to requests on
port `8080`.

Create a file called `server.js` and paste in the following source code:

**server.js**

```javascript
const express = require("express")

// Constants
const PORT = 8080
const HOST = "0.0.0.0"

// App
const app = express()
app.get("/", (req, res) => res.send("Hello World!"))

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)
```

Next, create a `package.json` that defines your dependencies:

**package.json**

```json
{
  "name": "docker_web_app",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.16.4"
  }
}
```

## Dockerize the App

Before you can deploy the app to GKE, you need to Dockerize it. You can do this by creating a `Dockerfile` in the same
folder as your `server.js` and `package.json`:

**Dockerfile**

```Dockerfile
FROM node:12

# Create app directory
WORKDIR /usr/app

COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]
```

The folder structure of the sample app should now look like this:

    ├── server.js
    ├── Dockerfile
    └── package.json

Real-world applications will be a lot more complicated than this, but the main point to take from here is that
you need to ensure your Docker image is configured to `EXPOSE` the port that your app is going to need for external
communication. See the [Docker examples](https://docs.docker.com/samples/) for more information on Dockerizing popular
app formats.

To build this Docker image from the `Dockerfile`, run:

```bash
docker build -t simple-web-app:latest .
```

Now you can test you container to see if it is working:

```bash
docker run --rm -p 8080:8080 simple-web-app:latest
```

This starts the newly built container and links port 8080 on your machine to the container’s port 8080. You should see
the following output when you run the above command:

    > docker_web_app@1.0.0 start /usr/app
    > node server.js

    Running on http://0.0.0.0:8080

Next, open the app in your browser:

```bash
open http://localhost:8080
```

You should be able to see the "Hello World!" message from the server.

## Dockerfile Tips

Some things to note when writing up your `Dockerfile` and building your app:

- Ensure your `Dockerfile` starts your app in the foreground so the container doesn’t shutdown after app startup.

- Your app should log to `stdout`/`stderr` to aid in debugging it after deployment to GKE.

## Push the Docker image

So far you’ve successfully built a Docker image on your local computer. Now it’s time to push the image to your private
[Google Container Registry](https://cloud.google.com/container-registry/), so it can be deployed from other locations,
such as GKE.

First, configure your local Docker client to be able to authenticate to Container Registry (note: you’ll only need to
do this step once):

```bash
export PROJECT_ID="$(gcloud config get-value project -q)"
gcloud auth configure-docker
```

Next, tag the local Docker image for uploading:

```bash
docker tag simple-web-app:latest "gcr.io/${PROJECT_ID}/simple-web-app:v1"
```

Finally, push the Docker image to your private Container Registry:

```bash
docker push "gcr.io/${PROJECT_ID}/simple-web-app:v1"
```

## Launch a GKE Cluster

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

## Deploy the Dockerized App

To deploy our Dockerized App on the GKE cluster, you can use the `kubectl` CLI tool to create a
[Kubernetes Pod](https://kubernetes.io/docs/concepts/workloads/pods/pod-overview/). A pod is the smallest deployable
object in the Kubernetes object model and will contain only your `simple-web-app` Docker image.

First, configure `kubectl` to use the newly created cluster:

```bash
gcloud container clusters get-credentials <YOUR_CLUSTER_NAME> --region europe-west3
```

Be sure to substitute `<YOUR_CLUSTER_NAME>` with the name of your GKE cluster and use either `--region` or
`--zone` to specify the location.

Use the `kubectl create` command to create a
[Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) named `simple-web-app-deploy` on your
cluster:

```bash
kubectl create deployment simple-web-app-deploy --image=gcr.io/${PROJECT_ID}/simple-web-app:v1
```

To see the Pod created by the last command, you can run:

```bash
kubectl get pods
```

The output should look similar to the following:

    NAME                                     READY     STATUS             RESTARTS   AGE
    simple-web-app-deploy-7fb787c449-vgtf6   0/1       ContainerCreating  0          7s

Now you need to expose the app to the public Internet.

## Attach a Load Balancer

So far you’ve deployed the Dockerized app, but it is not currently accessible from the public Internet. This is because
you have not assigned an external IP address or load balancer to the Pod. To fix this, run the following command:

```bash
kubectl expose deployment simple-web-app-deploy --type=LoadBalancer --port 80 --target-port 8080
```

This will take approximately 1 minute to assign an external IP address to the service. You can follow the progress by
running:

```bash
kubectl get services -w
```

Once this is done, you can open the external IP address in your web browser:

```bash
open http://<EXTERNAL_IP_ADDRESS>
```

If the service has been exposed correctly and the DNS has propagated you should see _Hello World!_. Congratulations!

## Cleaning Up

Once you’re done testing, you may want to clean up all the infrastructure you’ve deployed so GCP doesn’t charge you
money for it.

First, delete the Kubernetes Service:

```bash
kubectl delete service simple-web-app-deploy
```

This will destroy the Load Balancer created during the previous step.

Next, to destroy the GKE cluster, run the `terraform destroy` command:

```bash
terraform destroy
```

This is a destructive command that will forcibly terminate and destroy your GKE cluster!

# Next steps

Now that you have your application deployed, you can start deploying other parts of your infrastructure by using the
following guides:

1.  `How to deploy a production grade database on GCP` _(coming soon!)_

2.  `How to deploy a production grade distributed cache on GCP` _(coming soon!)_


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"c87a7230f4d301385913acfdeb63942b"}
##DOCS-SOURCER-END -->
