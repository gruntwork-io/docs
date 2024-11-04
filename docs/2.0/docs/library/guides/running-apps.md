# About Running Apps

The Running Apps component is focused on:

- Enabling your organization's developers to run their containerized apps
- Enabling your organization's developers to run individual Lambda functions
- Adopting patterns for managing multiple clusters across many teams

## What's included
- **Strategy.** For EKS, Gruntwork has an opinionated GitOps workflow we call "GruntOps."
- **IaC Modules.** Running Apps includes access to several IaC modules relating to EKS, ECS, and individual Lambda functions.
- **Tooling.** We make use of Kubernetes ecosystem tooling like Karpenter and Argo, in addition to our own tooling to improve the UX for ECS and Lambda.
- **Setup.** Our modules include documentation on how to configure an EKS or ECS cluster.
- **Updates.** Gruntwork publishes regular updates to EKS, ECS, and Lambda modules, and you can use [Patcher](/pipelines/overview/) to automatically update to the latest version of these modules.

## Available approaches

Running Apps includes first-class support for running workloads on EKS, ECS, and individual Lambda functions. You may use just one approach or all three, though we recommend limiting your management surface area as much as possible.

### EKS

Our standard EKS setup leverages IaC to give you:

- A best-practices [EKS cluster configuration](https://docs.gruntwork.io/reference/services/app-orchestration/amazon-eks)
- Support for either [self-managed or managed worker nodes](https://docs.gruntwork.io/reference/services/app-orchestration/amazon-eks-workers)
- [Out-of-the-box support](https://docs.gruntwork.io/reference/services/app-orchestration/amazon-eks-core-services) for log configurations, ALBs, external DNS and more
- [IAM role to RBAC mappings](https://docs.gruntwork.io/reference/modules/terraform-aws-eks/eks-aws-auth-merger/)
- Support for cluster autoscaling, including with [Karpenter](https://docs.gruntwork.io/reference/modules/terraform-aws-eks/eks-k8s-karpenter/)
- An opinionated GitOps workflow ("GruntOps") that includes ArgoCD

### ECS

Our standard ECS setup leverages IaC to give you:

- A best-practices [ECS cluster configuration](https://docs.gruntwork.io/reference/services/app-orchestration/amazon-ecs-cluster)
- The option to use [ECS Fargate](https://docs.gruntwork.io/reference/services/app-orchestration/amazon-ecs-fargate-cluster) if desired
- A way to deploy [ECS services](https://docs.gruntwork.io/reference/services/app-orchestration/amazon-ecs-service)
- ECS service discovery, load balancer support, canary deployments, and more

### Lambda

We support invoking Lambda functions across a range of scenarios:

- [General-purpose Lambda function](https://docs.gruntwork.io/reference/modules/terraform-aws-lambda/lambda/)
- [Lambda behind an API Gateway](https://docs.gruntwork.io/reference/modules/terraform-aws-lambda/lambda-http-api-gateway/)
- [Lambda@Edge](https://docs.gruntwork.io/reference/modules/terraform-aws-lambda/lambda-edge/)
- [Scheduled Lambda jobs](https://docs.gruntwork.io/reference/modules/terraform-aws-lambda/scheduled-lambda-job/)

For running complex Serverless applications, we recommend the [Serverless Framework](https://www.serverless.com/), which is available separately via Serverless, Inc.

### Missing functionality

If you are looking to add functionality not yet supported by Gruntwork, you can either [contribute a pull request](http://localhost:3000/library/usage/contributing), add the functionality on your own, work with Gruntwork as part of paid engagement, or request we add it to our roadmap.
