## Recommendation sections

### Identity and Access Management

_Number of recommendations: 21_

The recommendations in this section involve the use of identity, accounts, authentication, and authorization.
On AWS, most identity and access control related concerns are managed using the
[eponymous IAM service](https://aws.amazon.com/iam/). Hence, most (but not all) of the recommendations in
this section discuss particular IAM configurations, such as the configuration of the password policy, the use
of various groups and roles, and the configuration of multi-factor authentication (MFA) devices.

### Storage

_Number of recommendations: 7_

This section was added originally in the previous CIS version (1.3.0), and now in 1.4.0 the recommendations are enhancements and updates to the use of AWS’s storage capabilities. The relevant services for this section are [S3](https://aws.amazon.com/s3/), [EC2](https://aws.amazon.com/ec2/) and [RDS](https://aws.amazon.com/rds/). The recommendations in this section pertain to in-transit and at-rest encryption, access control to the resources, and handling sensitive data.

### Logging

_Number of recommendations: 11_

AWS has a variety of logging, monitoring, and auditing features, and the Benchmark has recommendations for
several of them:

- [AWS CloudTrail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html) tracks user activity and API usage

- [AWS Config](https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html) records and evaluates resource configurations

- [VPC Flow Logs](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html) capture network traffic information
  in VPCs

- [AWS KMS](https://docs.aws.amazon.com/kms/latest/developerguide/overview.html) lets you handle keys to encrypt and decrypt your data

AWS has several other logging related features that are not covered directly by the Benchmark. For example,
the primary log ingestion and query service, [Amazon CloudWatch
Logs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html), is integrated with many other AWS services. The Benchmark recommends that CloudTrail is integratd with CloudWatch Logs. Within the Gruntwork modules we’ve setup CloudWatch with all the integrated services such as AWS Config, CloudTrail and S3.

### Monitoring

_Number of recommendations: 15_

Monitoring is an overloaded term in the industry. In the context of the AWS Foundations Benchmark, the
monitoring section is exclusively about monitoring for specific API calls using the CloudTrail service paired
with [CloudWatch Logs
filter metrics](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/MonitoringLogData.html). Each recommendation in this section spells out a specific filter and an associated alarm.

Metric filter-related recommendations in this section are dependent on the "Ensure CloudTrail is enabled in all regions"
and "Ensure CloudTrail trails are integrated with CloudWatch Logs" recommendation in the "Logging" section.

### Networking

_Number of recommendations: 4_

The Benchmark is uncomfortably light on networking, considering its central role in the security of any
distributed system. The recommendations merely limit traffic from the zero network (`0.0.0.0/0`) and
suggest limiting routing for VPC peering connections based on [the principle of least-privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege).



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"8e54ef3c84261cbedfa0014930420051"}
##DOCS-SOURCER-END -->
