# Configure logging, metrics, and alarms for the worker nodes

In order for the CloudWatch Logs Agent to be able to write to CloudWatch Logs, you need to give it the worker nodes the
proper IAM permissions. You can do that by using the
[cloudwatch-log-aggregation-iam-policy module](https://github.com/gruntwork-io/module-aws-monitoring/tree/master/modules/logs/cloudwatch-log-aggregation-iam-policy)
from `module-aws-monitoring`:

**infrastructure-modules/services/eks-cluster/main.tf**

```hcl
module "cloudwatch_log_aggregation" {
  # Make sure to replace <VERSION> in this URL with the latest module-aws-monitoring release
  source = "git::git@github.com:gruntwork-io/module-aws-monitoring.git//modules/logs/cloudwatch-log-aggregation-iam-policy?ref=<VERSION>"

  name_prefix = var.cluster_name
}

resource "aws_iam_policy_attachment" "attach_cloudwatch_log_aggregation_policy" {
  name       = "attach-cloudwatch-log-aggregation-policy"
  roles      = [module.eks_workers.eks_worker_iam_role_name]
  policy_arn = module.cloudwatch_log_aggregation.cloudwatch_log_aggregation_policy_arn
}
```

Similarly, to be able to send disk and memory metrics to CloudWatch, you need to add more IAM permissions, this time
using the
[cloudwatch-custom-metrics-iam-policy module](https://github.com/gruntwork-io/module-aws-monitoring/tree/master/modules/metrics/cloudwatch-custom-metrics-iam-policy):

**infrastructure-modules/services/eks-cluster/main.tf**

```hcl
module "cloudwatch_metrics" {
  # Make sure to replace <VERSION> in this URL with the latest module-aws-monitoring release
  source = "git::git@github.com:gruntwork-io/module-aws-monitoring.git//modules/metrics/cloudwatch-custom-metrics-iam-policy?ref=<VERSION>"

  name_prefix = var.cluster_name
}

resource "aws_iam_policy_attachment" "attach_cloudwatch_metrics_policy" {
  name       = "attach-cloudwatch-metrics-policy"
  roles      = [module.eks_workers.eks_worker_iam_role_name]
  policy_arn = module.cloudwatch_metrics.cloudwatch_metrics_policy_arn
}
```

Finally, you may want to configure some CloudWatch alerts to go off if the CPU usage, memory usage, or disk space
utilization gets too high on the worker nodes. You can do this using several of the
[alarms modules](https://github.com/gruntwork-io/module-aws-monitoring/tree/master/modules/alarms) from
`module-aws-monitoring`:

**infrastructure-modules/services/eks-cluster/main.tf**

```hcl
module "high_cpu_usage_alarms" {
  # Make sure to replace <VERSION> in this URL with the latest module-aws-monitoring release
  source = "git::git@github.com:gruntwork-io/module-aws-monitoring.git//modules/alarms/asg-cpu-alarms?ref=<VERSION>"

  asg_names            = [module.eks_workers.eks_worker_asg_id]
  num_asg_names        = 1
  alarm_sns_topic_arns = [data.terraform_remote_state.sns_region.outputs.arn]
}

module "high_memory_usage_alarms" {
  # Make sure to replace <VERSION> in this URL with the latest module-aws-monitoring release
  source = "git::git@github.com:gruntwork-io/module-aws-monitoring.git//modules/alarms/asg-memory-alarms?ref=<VERSION>"

  asg_names            = [module.eks_workers.eks_worker_asg_id]
  num_asg_names        = 1
  alarm_sns_topic_arns = [data.terraform_remote_state.sns_region.outputs.arn]
}

module "high_disk_usage_alarms" {
  # Make sure to replace <VERSION> in this URL with the latest module-aws-monitoring release
  source = "git::git@github.com:gruntwork-io/module-aws-monitoring.git//modules/alarms/asg-disk-alarms?ref=<VERSION>"

  asg_names            = [module.eks_workers.eks_worker_asg_id]
  num_asg_names        = 1
  file_system          = "/dev/xvda1"
  mount_path           = "/"
  alarm_sns_topic_arns = [data.terraform_remote_state.sns_region.outputs.arn]
}
```

Note that the code above assumes you’ve created an SNS topic to notify about these alerts in another module and pulls
in the ARN of that SNS topic using a `terraform_remote_state` data source:

**infrastructure-modules/services/eks-cluster/dependencies.tf**

```hcl
data "terraform_remote_state" "sns_region" {
  backend = "s3"
  config = {
    region = var.terraform_state_aws_region
    bucket = var.terraform_state_s3_bucket
    key    = "${var.aws_region}/_global/sns-topics/terraform.tfstate"
  }
}
```



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"5c76a38e3fe3541b37acddd179c4df92"}
##DOCS-SOURCER-END -->
