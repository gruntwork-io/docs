# Metrics

You can find all the metrics for your AWS account on the [CloudWatch Metrics
Page](https://console.aws.amazon.com/cloudwatch/home?#metricsV2:).

- Most AWS services emit metrics by default, which you'll find under the "AWS Namespaces" (e.g. EC2, ECS, RDS).

- Custom metrics show up under "Custom Namespaces." In particular, the [`cloudwatch-memory-disk-metrics-scripts`
  module](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/metrics/) is installed on every
  server to emit metrics not available from AWS by default, including memory and disk usage. You'll find these under
  the "Linux System" Namespace.

You may want to create a [Dashboard](https://console.aws.amazon.com/cloudwatch/home?#dashboards:)
with the most useful metrics for your services and have that open on a big screen at all times.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"5f2fa1a102144ef3da979c801ded2487"}
##DOCS-SOURCER-END -->
