# CloudTrail

_[AWS CloudTrail](https://aws.amazon.com/cloudtrail/)_ is a service you can use to log most of the activity within your
AWS account. CloudTrail automatically maintains an audit log of all API calls for
[supported services](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-aws-service-specific-topics.html)
in your AWS account, writing these logs to an S3 bucket, and optionally encrypting the data using
[KMS](https://aws.amazon.com/kms/). It can be a good idea to enable CloudTrail in every AWS account, with the
multi-region feature enabled, as the API call data is useful useful for troubleshooting, investigating security
incidents, and maintaining audit logs for compliance.



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"698e37f1f6939aa0500262a535388a76"}
##DOCS-SOURCER-END -->
