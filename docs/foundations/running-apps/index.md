# About Running Apps

The Running Apps component is focused on enabling your organization's developers to run their apps and workloads.

## Included

Running Apps includes first-class support for running containerized workloads on EKS and ECS, and for running individual Lambda functions. You may use just one approach or all three, though we recommend limiting your management surface area as much as possible.

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

## Out of the box setup

A Gruntwork subject matter expert in EKS, ECS, or Lambda will help you design a strategy for deploying apps using your preferred methodology, and provide support while you configure the Gruntwork modules to implement your strategy.

If you are looking to add functionality not yet supported by Gruntwork, you can either add this on your own, or we will consider those requests for our roadmap or as part of a separate, paid engagement.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "17e7c1b75e4150463ae4d6a4640b9a2b"
}
##DOCS-SOURCER-END -->
