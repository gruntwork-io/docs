---
date: "2019-04-24"
title: "Deploying a Dockerized app on GCP/GKE"
tags: ["gcp", "gke", "docker"]
author: "robmorgan"
---

Welcome

This guide walks you through deploying a dockerized app to a GKE cluster running on Google Cloud Platform.

# Launching a GKE Cluster

Here we want to show users how to deploy a production-grade GKE cluster.

# Creating a basic Dockerized App

First, configure Docker command-line tool to authenticate to Container Registry (you need to run this only once):

```bash
$ gcloud auth configure-docker
```

# Deploying a Dockerized App

# Hooking up a Load Balancer

# Hooking up a DNS entry

# The underlying VPC stuff

# Hooking up a DB

The easiest way to install Hashicorp [Terraform](https://www.terraform.io) and [Packer](https://www.packer.io/) on your Mac
is by using [Homebrew](https://brew.sh/). Simply run:

    $ brew install packer terraform awscli jq awslogs git

To install them and a few other useful tools for AWS cloud development.

You can verify your installation using the `-v` parameter:

    $ terraform -v
    Terraform v0.11.7
    $ packer -v
    1.2.3
