# Patcher Report

Patcher supports **non-interactive mode** for `patcher report`.

In non-interactive mode, Patcher outputs a list of module dependencies in JSON format.

## Non-Interactive Mode
Example usage:
```
patcher report --non-interactive prod
```

The report command outpust a list of module dependencies in JSON format to `stdout`, for example:
```json
[
   "gruntwork-io/terraform-aws-monitoring/logs/load-balancer-access-logs",
   "gruntwork-io/terraform-aws-service-catalog/services/k8s-service",
   "gruntwork-io/terraform-aws-messaging/sqs",
   "gruntwork-io/terraform-aws-service-catalog/services/k8s-namespace",
   "gruntwork-io/terraform-aws-cis-service-catalog/networking/vpc",
   "gruntwork-io/terraform-aws-security/custom-iam-entity",
   "gruntwork-io/terraform-aws-utilities/request-quota-increase",
   "gruntwork-io/terraform-aws-service-catalog/networking/sns-topics",
   "gruntwork-io/terraform-aws-cis-service-catalog/landingzone/account-baseline-app",
   "gruntwork-io/terraform-aws-service-catalog/networking/route53"
]
```
