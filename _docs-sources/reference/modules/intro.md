---
# We don't want to show this in the auto-generated "API MODULES SECTION".
# Fortunately, this property only seems to affect # auto-generated sidebar items.
# So we still _do_ display this page in the sidebar, but use a manual entry.
sidebar_class_name: dont_show
pagination_next: null
---

import SearchArea from "/src/components/SearchArea"

# Gruntwork Module Catalog

At Gruntwork, we've taken the thousands of hours we spent building infrastructure on AWS and condensed all that experience and code into pre-built packages or modules. Each module is a battle-tested, best-practices definition of a piece of infrastructure, such as a VPC, ECS cluster, or an Auto Scaling Group. Modules are versioned using Semantic Versioning to allow Gruntwork clients to keep up to date with the latest infrastructure best practices in a systematic way.

## Why do we have Modules and Services

The Gruntwork IaC Library is a collection of reusable code that enables you to deploy and manage infrastructure quickly and reliably. The library consists of two types of code: Modules and [Services](/reference/services/intro/overview/). Here's how they differ.

**Modules:** Reusable code to deploy and manage one piece of infrastructure. Modules are fairly generic building blocks, so you don't typically deploy a single module directly, but rather, you write code that combines the modules you need for a specific use case. For example, one module might deploy the control plane for Kubernetes and a separate module could deploy worker nodes; you may need to combine both modules together to deploy a Kubernetes cluster. The Gruntwork Infrastructure as Code (IaC) Library contains hundreds of battle-tested, commercially supported and maintained modules that you can use and combine in many different ways.

**Services:** Reusable code that combines multiple modules to configure a service for a specific use case. Services are designed for specific use cases and meant to be deployed directly. For example, the eks-cluster service combines all the modules you need to run an EKS (Kubernetes) cluster in a typical production environment, including modules for the control plane, worker nodes, secrets management, log aggregation, alerting, and so on. [The Gruntwork Service Catalog](/reference/services/intro/overview/) is a collection of battle-tested, commercially supported and maintained services that you can use to deploy production-grade infrastructure in minutes.

<SearchArea />
