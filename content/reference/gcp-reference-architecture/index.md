---
title: "GCP Reference Architecture"
date: 2019-08-30
---

We are building out an end-to-end, production-grade, secure, and developer-friendly Reference Architecture for GCP. Just as with our [AWS
Reference Architecture](https://www.gruntwork.io/reference-architecture/), the GCP Reference Architecture includes just about everything a
typical company needs: VPCs, Kubernetes (GKE), load balancers, databases, caches, static content, CI / CD, monitoring, alerting, user and
permissions management, VPN, SSH, and so on. We deploy the Reference Architecture into your GCP account and give you 100% of the code,
allowing your team to immediately start building on top of a battle-tested, best-practices, fully-automated infrastructure.

## Features

Our initial release targets Terraform 0.12.x, and includes support for:

- **Multiple Environments:** We support multiple environments including prod and stage.
- **GKE Cluster:** With Helm (Tiller) securely installed to run your applications.
- **VPC Network:** To securely contain all of the resources.
- **HA Cloud SQL Database:** To store your relational data. We support either MySQL or Postgres.
- **Sample Applications:** Gruntwork provides sample frontend and backend applications that demonstrate how to run an app on the GKE cluster.
- **Cloud Load Balancer:** To proxy requests to the GKE cluster. This includes DNS and TLS configuration for the load balancer.
- **Stackdriver Integration:** To collect metrics from the GKE cluster including log aggregation from supported applications.
- **Google Cloud Build:** For the purposes of continuous integration. Gruntwork integrates a CI / CD pipeline for the sample apps on top of Google Cloud Build.
- **Google Container Registry:** For storing the artifacts produced by Google Cloud Build.
- **Secrets Management:** _[Coming Soon]_ Gruntwork will propose and integrate a suitable solution for secrets management based on Cloud KMS.
