# Logging

Gruntwork Landing Zone sets up [AWS CloudTrail](https://aws.amazon.com/cloudtrail/) for all accounts in your [AWS Organization](https://aws.amazon.com/organizations/). CloudTrail allows you to answer the question of _who_ did _what_ and _when_ in each of your AWS accounts.

## Where you can find logs

AWS CloudTrail is automatically configured to log all operations in your AWS accounts when you use Gruntwork Landing Zone. By default, CloudTrail maintains your data for 90 days and is queryable using CloudTrail UI.

Landing Zone sets up CloudTrail to output all events from all of your AWS accounts to an S3 bucket in your `logs` AWS account with a default rule to expire objects after 1 year. Once logs are in S3, you may set up an additional tool for [querying the logs](#querying-data).

### CloudTrail

Logs can be viewed in the CloudTrail UI in each of your AWS accounts. To access the CloudTrail UI, navigate to the AWS Console, search `CloudTrail` in the search bar, select CloudTrail from the search results, then select **Event History** from the left side panel.

### S3

CloudTrail logs are delivered to S3 approximately every 5 minutes. If you are using an S3 bucket that was created by AWS Control Tower, the bucket will be named `aws-controltower-logs-<logs account id>-<primary Control Tower region>`. At the top level of the bucket is a single prefix with a random id, which contains additional prefixes to distinguish between logs for CloudTrail and AWS Config. CloudTrail logs for each account can be found in the prefix `<random id>/AWSLogs/<random id>/`.

For each account, CloudTrail delivers logs to region, year, month, and day specific prefixes in the bucket. For example, logs for an account with the id `123456789012` on September 26th, 2023 in the `us-west-2` region, would be in a prefix named `123456789012/us-west-2/2023/09/26`.

If you configured your logs bucket while setting up AWS Control Tower, you will need access to the KMS key you created to encrypt the objects to download any objects. See [Logs bucket access](#logs-bucket-access) for more information.

For more information about querying data in S3, see [querying in S3](#querying-in-s3).

##  Data access

Granting access to the audit logs requires security configurations in both the originating account (e.g., the account in which the events are occurring) and the `logs` account. The originating account contains the CloudTrail trail itself, which should only be viewable by account administrators. The `logs` account contains the AWS S3 bucket that contains synchronized CloudTrail logs from all logs.

### CloudTrail access

Access to CloudTrail is controlled by AWS IAM policies that are assigned to individual IAM users (not recommended) or IAM roles than can be assumed by users (recommended) in AWS accounts.

:::tip
Gruntwork recommends that only those with administrative access to an AWS account have access to view CloudTrail logs, as they contain a record of every single API operation that was performed in the account, which may expose the name or configuration of resources an individual user may otherwise not have access to.
:::

Further, the configuration of CloudTrail trails should be defined as code, with all changes reviewed in a pull request before being applied automatically by [Gruntwork Pipelines](../../pipelines/overview/index.md).

See [Identity-based policy examples for AWS CloudTrail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/security_iam_id-based-policy-examples.html) to learn more about granting access to CloudTrail.

### Logs bucket access

Access to the logs bucket requires the user to have access to the centralized `log` account by assuming an AWS IAM role (preferred) or by having an IAM user in the account. In addition, the role or user must have S3 permissions for the S3 bucket containing the CloudTrail events.

Access to the objects containing CloudTrail events in S3 is controlled by IAM policies assigned to IAM users or roles. Further, to download the object, any IAM role or user needs permission to perform `kms:Decrypt` on the KMS key that was configured for object encryption when setting up the CloudTrail trail.

:::tip
Gruntwork recommends that only a select group of trusted individuals on your security team have direct access to objects in the S3 bucket. Whenever possible, the data should be accessed by [querying](#querying-data) it using the CloudTrail UI or a query service such as [Amazon Athena](https://aws.amazon.com/athena/).
:::

##  Querying data

You can query CloudTrail data in two ways - in the originating account or from the `logs` account. Querying in the originating account is done using the CloudTrail UI and is useful for quick checks that do not require in-depth analysis of usage and trends. If you require support for performing analytics to observe usage and trends, Gruntwork recommends querying the data in the S3 bucket in the `logs` account using a query service like [Amazon Athena](https://docs.aws.amazon.com/athena/latest/ug/what-is.html).

### Querying in CloudTrail

CloudTrail supports simple queries based on a pre-set lookup attributes, including the event source, event name, user name, and resource type. A full list of filters can be found in [filtering CloudTrail events](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/view-cloudtrail-events-console.html#filtering-cloudtrail-events). The filters in the CloudTrail allow you to perform coarse grained queries over a single attribute filter and time range and view details on individual events. Using the CloudTrail UI can be a quick way to retrieve a lot of information, such as all the users that have performed a certain API call (e.g., ListBuckets), however it is ineffective when trying analyze data to understand usage patterns across multiple attributes, such as the usage of Gruntwork Pipelines by all users in your GitHub organization.

You can also [download events](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/view-cloudtrail-events-console.html#downloading-events) from CloudTrail in CSV or JSON format and perform more in-depth analysis of events in another system such as a query service or using a script on your local machine.

### Querying in S3

If CloudTrail is configured to output all logs to an S3 bucket, there are two approaches that can be taken to perform queries on the data - downloading the data directly (not recommended) and setting up a query service like [Amazon Athena](https://aws.amazon.com/athena/) to allow for more in-depth analysis of your data (recommended).

Amazon Athena is a popular choice for a query service because it is directly integrated in the AWS Console. Further, because CloudTrail logs have a known structure and prefix scheme in S3, you can set up [Athena with partition projection](https://docs.aws.amazon.com/athena/latest/ug/cloudtrail-logs.html#create-cloudtrail-table-partition-projection), which will automatically create new partitions in Athena, reducing the work required to ensure the data is partitioned for optimal query support. While Athena is recommended because of its convenience, you may use any query service of your choosing to analyze the data, so long as the tool can pull data out of S3. See [example queries](https://docs.aws.amazon.com/athena/latest/ug/cloudtrail-logs.html#query-examples-cloudtrail-logs) and [tips for querying CloudTrail logs](https://docs.aws.amazon.com/athena/latest/ug/cloudtrail-logs.html#tips-for-querying-cloudtrail-logs) for more information on analyzing CloudTrail data using Athena.

:::warning
Downloading CloudTrail event data from S3, while possible, is generally not recommended. Finding data requires downloading potentially many objects and writing scripts to parse an analyze them. Once the data is outside of S3, it is not possible to know what analysis is being performed. Query services like AWS Athena or similar allow you to see the history of queries performed and who performed the query.
:::