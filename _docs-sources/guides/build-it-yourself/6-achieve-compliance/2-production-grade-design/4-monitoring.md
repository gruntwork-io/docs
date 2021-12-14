# Monitoring

The Monitoring section has 15 recommendations for creating specific
[CloudWatch Logs metric
filters](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/MonitoringPolicyExamples.html) that send alarms to an SNS topic when a particular condition is met.

The easiest way to achieve this recommendation is to create a Terraform module that creates CloudWatch Logs metrics
filters and CloudWatch Alarms, and then invoke the module once for each recommendation. You’ll need the
[`aws_cloudwatch_log_metric_filter`](https://www.terraform.io/docs/providers/aws/r/cloudwatch_log_metric_filter.html)
and [`aws_cloudwatch_metric_alarm`](https://www.terraform.io/docs/providers/aws/r/cloudwatch_metric_alarm.html)
Terraform resources.
