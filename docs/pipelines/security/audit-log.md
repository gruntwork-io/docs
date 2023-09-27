# Audit logs

Gruntwork Pipelines provides an audit log of which user performed what action in which account. To accomplish this, Pipelines sets the [AWS STS](https://docs.aws.amazon.com/STS/latest/APIReference/welcome.html) session name using a combination of the initiating GitHub user, the name of pipelines itself, and the pull request or branch from which the action was triggered. All log data for Gruntwork Pipelines is done using [AWS CloudTrail](https://aws.amazon.com/cloudtrail/). Session names are used in the `User name` field in CloudTrail, allowing those searching the data to clearly identify which user performed an action. For more information on querying the logs see [where you can find logs](#where-you-can-find-logs) and [querying data](#querying-data).

### What gets logged

Logs are available for all operations performed in every AWS account by Gruntwork Pipelines. Gruntwork Pipelines takes advantage of [AWS STS](https://docs.aws.amazon.com/STS/latest/APIReference/welcome.html) session names to clearly label all sessions with the GitHub user who requested the change and the pull request or branch that triggered the change.

The `userIdentity` field in each CloudTrail event associated with API calls performed by Pipelines [Actions](../overview/actions.md) will contain the session name. For example, if the GitHub user `SomeUserInYourOrg123` made a pull request that was the 123rd pull request in your repository, an associated CloudTrail event would have the following data for `userIdentity`.

```
{
    "eventVersion": "1.09",
    "userIdentity": {
        "type": "AssumedRole",
        "principalId": "xxxxxxxxxxxxxxxxxxxxx:SomeUserInYourOrg123-via-GWPipelines@PR-123",
        "arn": "arn:aws:sts::123456789012:assumed-role/github/SomeUserInYourOrg123-via-GWPipelines@PR-123",
        "accountId": "123456789012",
        "accessKeyId": "xxxxxxxxxxxx",
        "sessionContext": {
            "sessionIssuer": {
                "type": "Role",
                "principalId": "xxxxxxxxxxxxxxxxxxxxx",
                "arn": "arn:aws:iam::123456789012:role/github",
                "accountId": "123456789012",
                "userName": "github"
            },
            "webIdFederationData": {
                "federatedProvider": "arn:aws:iam::123456789012:oidc-provider/token.actions.githubusercontent.com",
                "attributes": {}
            },
            "attributes": {
                "creationDate": "2023-09-25T13:24:17Z",
                "mfaAuthenticated": "false"
            }
        }
    },
    ... rest of the CloudTrail event here ...
}
```

Due to the 64 character limit for STS session names, we do not include the originating repository. To determine the originating repo, you can search repositories for commits containing the user and branch/PR-number combination, or reach out to the GitHub user directly.

Combined with a [query service](#querying-data), you can use data from CloudTrail to perform analytics on usage of Gruntwork Pipelines in your AWS accounts.

### Who gets logged

Pipelines uses a naming scheme that combines the GitHub user who triggered the Pipelines [Action](../overview/actions.md) and the pull request or branch from which the action was initiated. Pipelines will set the AWS STS session name according to the following format: `<GitHubUserName>-via-GWPipelines@(PR-<PullRequestNumber>|<branch name>)`.

Pipelines runs Pipelines Actions when a pull request is opened, updated, re-opened, or merged to the deploy branch (e.g., main). The naming scheme will use different values for pull request events and pushes to the deploy branch (e.g., merged PRs).

When Pipelines is run in response to a pull request event, the user that created the most recent commit on the branch will be used in the log, in addition to the pull request number assigned by GitHub. For example, if the user `SomeUserInYourOrg123` created a pull request that was given the number `123` by GitHub, the resulting session name would be `SomeUserInYourOrg123-via-GWPipelines@PR-123`.

When Pipelines is run in response to a pull request being merged, the user that performed the merge (e.g., the user who clicked the `merge` button on the pull request) will be used in the log in addition the to deploy branch (e.g., `main`). For example, if the user `SomeUserInYourOrg123` merged a pull request to your deploy branch named `main` the session name would be `SomeUserInYourOrg123-via-GWPipelines@main`

## Where you can find logs

Gruntwork Pipelines leverages AWS CloudTrail to log all actions taken by Pipelines in your AWS account. By default, CloudTrail maintains your data for 90 days and is queryable using CloudTrail UI.

Gruntwork recommends setting up CloudTrail to output all events to an S3 bucket in a centralized AWS account that has been designated for the purpose of logging. If you are a Gruntwork Landing Zone customer, CloudTrail is automatically set up to log to a centralized `log` account and sync all logs to an S3 bucket with a default rule to expire after 1 year. Once logs are in S3, you may set up an additional tool for [querying the logs](#querying-data).

### CloudTrail

Gruntwork Pipelines audit logs can be viewed in the CloudTrail UI in each of your AWS accounts. To access the CloudTrial UI, navigate to the AWS Console, search `CloudTrail` in the search bar, select CloudTrail from the search results, then select **Event History** from the left side panel. All events originating from Gruntwork Pipelines will have a `User name` field containing `GWPipelines`, as outlined in [who gets logged](#what-gets-logged). To learn more about querying data using the CloudTrail UI, see [querying in CloudTrail](#querying-in-cloudtrail).

### S3

When CloudTrail is configured to deliver logs to an AWS S3 bucket, logs are delivered approximately every 5 minutes. If you are using an S3 bucket that was created by AWS Control Tower, the bucket will be named `aws-controltower-logs-<logs account id>-<primary Control Tower region>`. At the top level of the bucket is a single prefix with a random id, which contains additional prefixes to distinguish between logs for CloudTrail and AWS Config. CloudTrail logs for each account can be found in the prefix `<random id>/AWSLogs/<random id>/`.

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

Further, the configuration of CloudTrail trails should be performed as code, with all changes reviewed in a pull request before being applied automatically by Pipelines.

See [Identity-based policy examples for AWS CloudTrail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/security_iam_id-based-policy-examples.html) to learn more about granting access to CloudTrail.

### Logs bucket access

Access to the logs bucket requires the user to have access to the centralized `log` account by assuming an AWS IAM role (preferred) or by having an IAM user in the account. In addition, the role or use must have S3 permissions for the S3 bucket containing the CloudTrail events.

Access to the objects containing CloudTrail events in S3 is controlled by IAM policies assigned to IAM users or roles. Further, to download the object, any IAM role or user needs permission to perform `kms:Decrypt` on the KMS key that was configured for object encryption when setting up the CloudTrail trail.

:::tip
Gruntwork recommends that only a select group of trusted individuals on your security team have direct access to objects in the S3 bucket. Whenever possible, the data should be accessed by [querying](#querying-data) it using the CloudTrail UI or a query service such as Amazon Athena.
:::

##  Querying data

You can query CloudTrail data for Gruntwork Pipelines in two ways - in the originating account or from the `logs` account. Querying in the originating account is done using the CloudTrail UI and is useful for quick checks that do not require in-depth analysis of usage and trends. If you require support for performing analytics to observe usage and trends, Gruntwork recommends querying the data in the S3 bucket in the `logs` account using a query service like Amazon Athena.

### Querying in CloudTrail

CloudTrail supports simple queries based on a pre-set lookup attributes, including the event source, event name, user name, and resource type. A full list of filters can be found in [filtering CloudTrail events](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/view-cloudtrail-events-console.html#filtering-cloudtrail-events). The filters in the CloudTrail allow you to perform coarse grained queries over a single attribute filter and time range and view details on individual events. Using the CloudTrail UI can be a quick way to retrieve a lot of information, such as all the users that have performed a certain API call (e.g., ListBuckets), however it is ineffective when trying analyze data to understand usage patterns across multiple attributes, such as the usage of Gruntwork Pipelines by all users in your GitHub organization.

You can also [download events](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/view-cloudtrail-events-console.html#downloading-events) from CloudTrail in CSV or JSON format and perform more in-depth analysis of events in another system such as a query service or using a script on your local machine.

### Querying in S3

If CloudTrail is configured to output all logs to an S3 bucket, there are two approaches that can be taken to perform queries on the data - downloading the data directly (not recommended) and setting up a query service like [Amazon Athena](https://aws.amazon.com/athena/) to allow for more in-depth analysis of your data (recommended).

Amazon Athena is a popular choice for a query service because it is directly integrated in the AWS Console. Further, because CloudTrail logs have a known structure and prefix scheme in S3, you can set up [AWS Athena with partition projection](https://docs.aws.amazon.com/athena/latest/ug/cloudtrail-logs.html#create-cloudtrail-table-partition-projection), which will automatically create new partitions in Athena, reducing the work required to ensure the data is partitioned for optimal query support. While Athena is recommended because of it's convenience, you may use any query service of your choosing to analyze the data, so long as the tool can pull data out of S3. See [example queries](https://docs.aws.amazon.com/athena/latest/ug/cloudtrail-logs.html#query-examples-cloudtrail-logs) and [tips for querying CloudTrail logs](https://docs.aws.amazon.com/athena/latest/ug/cloudtrail-logs.html#tips-for-querying-cloudtrail-logs) for more information on analyzing CloudTrail data using Athena.

:::warning
Downloading CloudTrail event data from S3, while possible, is generally not recommended. Finding data requires downloading potentially many objects and writing scripts to parse an analyze them. Once the data is outside of S3, it is not possible to know what analysis is being performed. Query services like AWS Athena or similar allow you to see the history of queries performed and who performed the query.
:::


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "70d489f03b6b24c68dac6bff481872f3"
}
##DOCS-SOURCER-END -->
