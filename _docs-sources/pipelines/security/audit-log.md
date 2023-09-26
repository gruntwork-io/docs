# Audit log


## Log Data for Pipelines

Gruntwork Pipelines provides an audit log of which user performed what action in which account. To accomplish this, Pipelines sets the AWS STS session name using a combination of the initiating GitHub user, the name of pipelines itself, and the pull request or branch from which the action was triggered. All log data for Gruntwork Pipelines is done using [AWS CloudTrail](https://aws.amazon.com/cloudtrail/). See [where you can find logs](#where-you-can-find-logs) for more information.

### What gets logged
- All AWS API calls performed by terragrunt for plan/apply

### Who gets logged in the audit log
- Naming scheme for AWS Role sessions

## Where you can find logs

Gruntwork Pipelines leverages AWS CloudTrail to log all actions taken by Pipelines in your AWS account. By default, CloudTrail maintains your data for 90 days and is queryable using CloudTrail UI.

Gruntwork recommends setting up CloudTrail to output all events to an S3 bucket in a centralized AWS account that has been designated for the purpose of logging. If you are a Gruntwork Landing Zone customer, CloudTrail is automatically set up to log to a centralized `log` account and sync all logs to an S3 bucket. Once logs are in S3, you may set up an additional tool for querying the logs, such as [Amazon Athena](https://aws.amazon.com/athena/).

### CloudTrail
- 90 days in UI

### S3
- Synced roughly every 5 minutes

##  Data access

Granting access to the audit logs requires security configurations in both the originating account (e.g., the account in which the events are occurring) and the `logs` account. The originating account contains the CloudTrail trail itself, which should only be viewable by account administrators. The `logs` account contains the AWS S3 bucket that contains synchronized CloudTrail logs from all logs.

### CloudTrail access

### Logs bucket access
- Located in logs account
- General cloudtrail permissions
    - https://docs.aws.amazon.com/awscloudtrail/latest/userguide/control-user-permissions-for-cloudtrail.html

### Object access
- KMS key
    - located in mgmt account

##  Querying data

You can query CloudTrail data for Gruntwork Pipelines in two ways - in the originating account or from the `logs` account. Querying in the originating account is done using the CloudTrail UI and is useful for quick checks that do not require in-depth analysis of usage and trends. If you require support for perform analytics to observe usage and trends, Gruntwork recommends querying the data in the S3 bucket in the `logs` account using a query service like Amazon Athena.

### CloudTrail
- Basic querying

### S3
- Downloading files and viewing (permissions)
- Set up Athena (link to docs)
