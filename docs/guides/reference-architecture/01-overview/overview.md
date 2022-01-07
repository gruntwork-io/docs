---
pagination_label: Reference Architecture
---

# Architecture Overview

This documentation contains an overview of a deployed and managed architecture.

First, the short version:

- This is an end-to-end tech stack for [Amazon Web Services (AWS)](https://aws.amazon.com/) that includes all the
  basic infrastructure a company needs, including the network topology, orchestration tools (e.g., Kubernetes or ECS), databases, caches, load balancers, CI / CD pipeline, monitoring, alerting, log aggregation, etc.- It's built on top of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog).
- It's all defined and managed as code using tools such as [Terraform](https://www.terraform.io/), [Packer](https://www.packer.io/), and [Docker](https://www.docker.com/).

Here's a diagram that shows a rough overview of what the Reference Architecture looks like:

![Architecture Diagram](/img/guides/reference-architecture/landing-zone-ref-arch.png)

Now, the long version:

## Infrastructure as code

All of the infrastructure in this repo is managed as **code** using [Terragrunt](https://terragrunt.gruntwork.io/), a thin wrapper around [Terraform](https://www.terraform.io). That is, instead of clicking around a web UI or SSHing to a server and manually executing commands, the idea behind infrastructure as code (IAC) is that you write code to define your infrastructure and you let an automated tool (e.g., Terraform) apply the code changes to your infrastructure. This has a number of benefits:

- You can automate your entire provisioning and deployment process, which makes it much faster and more reliable than
  any manual process.

- You can represent the state of your infrastructure in source files that anyone can read, rather than having that knowledge trapped inside a sysadmin's head.

- You can store those source files in version control, which means the entire history of your infrastructure is
  captured in the commit log, which you can use to debug problems, and if necessary, roll back to older versions.

- You can validate each infrastructure change through code reviews and automated tests.

- You can package your infrastructure as reusable, documented, battle-tested modules that make it easier to scale and
  evolve your infrastructure. In fact, most of the infrastructure code in this architecture is deployed from the service modules in the
  [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/).

For more info on Infrastructure as Code and Terraform, check out [A Comprehensive Guide to
Terraform](https://blog.gruntwork.io/a-comprehensive-guide-to-terraform-b3d32832baca) and our our [Introduction to Gruntwork](/docs/intro/overview/intro-to-gruntwork) section.

## AWS accounts

The infrastructure is deployed across multiple AWS accounts. For example, the staging environment is in one account,
the production environment in another account, shared tooling is in yet another account, and so on. This gives you
better isolation between environments so that if you break something in one environment (e.g., staging)—or worse yet, a
hacker breaks into that environment—it should have no effect on your other environments (e.g., prod). It also gives you
better control over what resources each employee can access, helps you to keep track of costs, and gives you an easy way to test out new features and services in isolation.

The list of accounts includes:

- **dev**: Sandbox environment.
- **stage**: Pre-production environment.
- **prod**: Production environment.
- **security**: All IAM users and permissions are defined in this account.
- **shared-services**: DevOps tooling.
- **logs**: An account for centralizing logs from all of the accounts.

Check out the [Authentication docs](../02-authenticate/01-intro.md) for more info on how to authenticate to these accounts and
switch between them.

## VPCs and subnets

Each environment lives in a separate [Virtual Private Cloud (VPC)](https://aws.amazon.com/vpc/), which is a logically
isolated section within an AWS account. Each VPC defines a virtual network, with its own IP address space and rules for
what can go in and out of that network. The IP addresses within each VPC are further divided into multiple
[subnets](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_Subnets.html), where each subnet controls the
routing for its IP address.

- _Public subnets_ are directly accessible from the public Internet.
- _Private subnets_ are only accessible from within the VPC.

Just about everything in this infrastructure is deployed in private subnets to reduce the surface area to attackers.
The only exceptions are load balancers and the [OpenVPN server](#openvpn-server), both of which are described below.

Each VPC is also configured with [VPC flow logs](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html), which
can be useful for monitoring and auditing network traffic across the VPC. Each VPC publishes its flow logs to CloudWatch
Logs, under the log group `VPC_NAME-vpc-flow-logs`, where the `VPC_NAME` is an input variable to the `vpc` module.

To learn more about VPCs and subnets, check out the Gruntwork [`vpc service`](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/networking/vpc).

## Load balancers

Traffic from the public Internet (e.g., requests from your users) initially goes to a public load balancer, which proxies the traffic to your apps. Traffic between services that are within your network (e.g. east-west traffic) uses a private load balancer, which is not exposed to the Internet. This topology allows you to run multiple copies of your application for scalability and high availability, while limiting exposure of your services. The Application Load Balancer (ALB) is an AWS-managed load balancer service that is designed for routing HTTP and HTTPS traffic. The advantage of using a managed service is that AWS takes care of fault tolerance, security, and scaling the load balancer for you automatically.

## Docker clusters

Application code is packaged into Docker containers and deployed across an Amazon Elastic Container Service (ECS) cluster. The advantage of Docker is that it allows you to package your code so that it runs exactly the same way in all environments (dev, stage, prod). The advantage of a Docker Cluster is that it makes it easy to deploy your Docker containers across a cluster of servers, making efficient use of wherever resources are available. Moreover, ECS can automatically scale your app up and down in response to load and redeploy containers that crashed.

For a quick intro to Docker, see Running microservices on AWS using Docker, Terraform, and ECS. For more info on using ECS, see terraform-aws-ecs.

## Data stores

The infrastructure includes the following data stores:

1. **Amazon RDS Aurora**: [Aurora](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html) is Amazon's MySQL- and PostgreSQL-compatible managed relational database engine. Aurora offers advanced features like automatic storage resizing, clustering, and high performance.
1. **Amazon Elasticache for Redis**: [Elasticache for Redis](https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/WhatIs.html) is a managed service for hosting [Redis](https://redis.io/), the in-memory database and cache. Elasticache offers a web interface for managing Redis, with high performance, scalability, and automatic failure detection and recovery.

## OpenVPN server

To reduce surface area to attackers, just about all of the resources in this infrastructure run in private subnets,
which are not accessible from the public Internet at all. To allow company employees to access these private resources,
we expose a single server publicly: an [OpenVPN server](https://openvpn.net/). Once you connect to the server using a
VPN client, you are "in the network", and will be able to access the private resources (e.g., you will be able to SSH
to your EC2 Instances).

For more info, see the [`openvpn` service](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/mgmt/openvpn-server) and the VPN
section of the [Authentication docs](../02-authenticate/06-authenticate-to-the-vpn-server.md).

## GitHub

We have set up [GitHub](https://github.com) as a Continuous Integration (CI) server. After every commit, a GitHub
job runs your build, tests, packaging, and automated deployment steps.

For more info, see the [Gruntwork Pipelines docs](../04-configure-gw-pipelines/01-intro.md).

## Monitoring, log aggregation, alerting

You can find metrics, log files from all your servers, and subscribe to alert notifications using [Amazon
CloudWatch](https://aws.amazon.com/cloudwatch/).

For more info, see the [Monitoring, Alerting, and Logging docs](../05-monitoring-alerting-logging/01-intro.md).

## DNS and TLS

We are using [Amazon Route 53](https://aws.amazon.com/route53/) to configure DNS entries for all services. We
have configured SSL/TLS certificates for your domain names using [Amazon's Certificate Manager
(ACM)](https://aws.amazon.com/certificate-manager/), which issues certificates that are free and renew automatically.

For more info, see the [route53 service](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/networking/route53).

## Security

We have configured security best practices in every aspect of this infrastructure:

- **Network security**: see [VPCs and subnets](#vpcs-and-subnets).

- **Server access**: see SSH and VPN sections of the [Authentication docs](../02-authenticate/01-intro.md).

- **Application secrets**: see secrets management section of the [Deploy your Apps docs](../03-deploy-apps/01-intro.md).

- **User accounts**: see the [Authentication docs](../authenticate/setting-up-initial-access).

- **Auditing**: see the [CloudTrail](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/cloudtrail) and
  [AWS Config](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/aws-config) modules.

- **Intrusion detection**: see the [`fail2ban`](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/fail2ban)
  and [GuardDuty](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/guardduty-multi-region) modules.

- **Security updates**: see the [`auto-update` module](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/auto-update).

Check out [Gruntwork Security Best
Practices](https://docs.google.com/document/d/e/2PACX-1vTikva7hXPd2h1SSglJWhlW8W6qhMlZUxl0qQ9rUJ0OX22CQNeM-91w4lStRk9u2zQIn6lPejUbe-dl/pub)
for more info.

## Next steps

Next up, let's have a look at [how to authenticate](../authenticate/intro).


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"a6edc43b09a3c63807f96816f1954e26"}
##DOCS-SOURCER-END -->
