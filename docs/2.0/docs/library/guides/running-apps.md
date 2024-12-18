# About Running Apps

The Running Apps component focuses on:
- Enabling developers in your organization to deploy and run containerized applications.
- Supporting developers to run individual Lambda functions.
- Providing patterns for managing multiple clusters across teams.

## What's included
- **Strategy.** For EKS, Gruntwork employs an opinionated GitOps workflow called "GruntOps."
- **IaC Modules.** Running Apps provides access to multiple IaC modules for EKS, ECS, and individual Lambda functions.
- **Tooling.** It leverages Kubernetes tools like Karpenter and Argo alongside Gruntwork's tools to enhance the ECS and Lambda user experience.
- **Setup.** Detailed documentation is included for configuring EKS or ECS clusters.
- **Updates.** Gruntwork regularly publishes updates to EKS, ECS, and Lambda modules. You can use [Patcher](/2.0/docs/patcher/concepts/) to automate updates to the latest versions of these modules.

## Available approaches
Running Apps supports workloads on EKS, ECS, and individual Lambda functions. You can adopt one or more of these approaches; however, we recommend minimizing your operational surface area where possible.

### EKS
The standard EKS setup uses IaC to provide:
- A [best-practices EKS cluster configuration](https://docs.gruntwork.io/reference/services/app-orchestration/amazon-eks).
- Support for [self-managed or managed worker nodes](https://docs.gruntwork.io/reference/services/app-orchestration/amazon-eks-workers).
- [Out-of-the-box configurations](https://docs.gruntwork.io/reference/services/app-orchestration/amazon-eks-core-services) for logging, ALBs, external DNS, and more.
- [IAM role to RBAC mappings](https://docs.gruntwork.io/reference/modules/terraform-aws-eks/eks-aws-auth-merger/).
- Cluster autoscaling, including support for [Karpenter](https://docs.gruntwork.io/reference/modules/terraform-aws-eks/eks-k8s-karpenter/).
- An opinionated GitOps workflow ("GruntOps") leveraging ArgoCD.

### ECS
The standard ECS setup uses IaC to deliver:
- A [best-practices ECS cluster configuration](https://docs.gruntwork.io/reference/services/app-orchestration/amazon-ecs-cluster).
- Optional support for [ECS Fargate](https://docs.gruntwork.io/reference/services/app-orchestration/amazon-ecs-fargate-cluster).
- Deployment of [ECS services](https://docs.gruntwork.io/reference/services/app-orchestration/amazon-ecs-service).
- ECS service discovery, load balancer integration, canary deployments, and additional features.

### Lambda
Gruntwork supports deploying and invoking Lambda functions for various use cases, including:
- [General-purpose Lambda functions](https://docs.gruntwork.io/reference/modules/terraform-aws-lambda/lambda/).
- [Lambda functions behind an API Gateway](https://docs.gruntwork.io/reference/modules/terraform-aws-lambda/lambda-http-api-gateway/).
- [Lambda@Edge functions](https://docs.gruntwork.io/reference/modules/terraform-aws-lambda/lambda-edge/).
- [Scheduled Lambda jobs](https://docs.gruntwork.io/reference/modules/terraform-aws-lambda/scheduled-lambda-job/).

To manage complex serverless applications, we recommend using the [Serverless Framework](https://www.serverless.com/), available separately through Serverless, Inc.

### Missing functionality
If the functionality you need is not currently supported, you have the following options:
- [Submit a pull request](http://localhost:3000/library/usage/contributing) to contribute the functionality.
- Extend the functionality on your own.
- Collaborate with Gruntwork through a paid engagement.
- Request that Gruntwork add the functionality to its roadmap.

