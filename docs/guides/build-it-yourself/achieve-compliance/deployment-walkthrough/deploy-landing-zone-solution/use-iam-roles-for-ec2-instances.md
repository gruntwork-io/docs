# Use IAM roles for EC2 instances

All Gruntwork modules that require AWS API access use roles rather than an IAM user with static API credentials for
authentication. For example:

- [`terraform-aws-server`](https://github.com/gruntwork-io/terraform-aws-server/blob/master/modules/single-server/main.tf)
  is used to manage a single EC2 instance with an IAM role attached.

- [`terraform-aws-asg`](https://github.com/gruntwork-io/terraform-aws-asg) applies IAM roles to instances in auto-scaling
  group.

- [`terraform-aws-eks`](https://github.com/gruntwork-io/terraform-aws-eks/blob/master/modules/eks-cluster-workers/main.tf)
  uses IAM roles for EKS cluster workers.

- [`ecs-cluster`](https://github.com/gruntwork-io/terraform-aws-ecs/tree/master/modules/ecs-cluster) creates IAM
  roles for ECS instances

- [`lambda`](https://github.com/gruntwork-io/terraform-aws-lambda/tree/master/modules/lambda) creates IAM
  roles for Lambda functions

Use these modules whenever possible. You should always use IAM roles in your own modules any time you need to provide
access to the AWS API. Using static API credentials should be avoided whenever possible.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"af99b295cc0bfa675cbfdf671eb033a7"}
##DOCS-SOURCER-END -->
