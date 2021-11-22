---
sidebar_position: 1
title: Zero To Hero
---

# Zero To Hero

## Overview

This course is designed to incrementally take you from the terraforming you do today to the Gruntwork way of managing infrastructure. We'll start with a simple web application in Docker, and deploy it with Terraform. We'll then show you how to deploy it with our Gruntwork modules and our Service Catalog.

We recommend you start with the first section and work your way through the course. However, if you read a section and know that you already comprehend all of the concepts explained in it, feel free to skip the section and move forward. We'll note any pre-requisites at the top of each section.

## Table of Contents

1. [Setup for the Course](01_setup)

   Make sure you're set up with the tools needed to go through the rest of the hands-on examples.

1. [Create a Web App via Docker](02_web_app_via_docker)

   We craft a simple web application backed by an API and a persistent database. Later on, we deploy these services in the cloud in a few different ways.

1. [Create an ECR Repository with Terraform](03_ECR_repo)

   We create a simple Terraform module to provision an [Elastic Container Registry](https://aws.amazon.com/ecr/) for your Docker image, and push your image to that repository.

1. [Launch Web App to ECS Fargate](04_web_app_to_ecs_fargate)

   We write a more complex Terraform module that deploys your Docker image using [ECS on Fargate](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html).

1. [Make a Web App Production Ready](05_web_app_production_ready)

   We discuss features necessary to properly productionize your code and show a production-ready checklist.

1. [Use Gruntwork Modules to Launch your Web App](06_gruntwork_modules_web_app)

   We deploy the simple web application using a [Gruntwork module](https://gruntwork.io/infrastructure-as-code-library/).

1. [Use Service Catalog to Launch your Web App](07_service_catalog_web_app)

   We deploy the simple web application using the [Gruntwork Service Catalog](https://blog.gruntwork.io/introducing-the-gruntwork-module-service-and-architecture-catalogs-eb3a21b99f70#122a)

1. [Add a Data Store to your Web App](08_data_store)

   We add a persistent data store via the [Amazon Relational Database Service (RDS)](https://aws.amazon.com/rds/) to the web application.

1. [Deploy a Web App Production Ready the Gruntwork Way](09_web_app_gruntwork_way)

   We discuss how to leverage Gruntwork to complete other production requirements.

1. [Upgrade a module](10_upgrade_a_module_version)

   We discuss how to upgrade a Gruntwork module to stay current with features and security.
