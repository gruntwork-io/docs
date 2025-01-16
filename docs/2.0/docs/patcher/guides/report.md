# Patcher Report

Patcher `report` generates a list of module dependencies in JSON format. 

## Non-interactive mode
Example usage:
```
patcher report prod
```

The `report` command outputs the list of module dependencies in JSON format to `stdout`. For example: 
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
