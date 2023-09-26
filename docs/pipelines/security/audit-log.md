# Audit logs


## Log Data for Pipelines

Gruntwork Pipelines provides an audit log of which user performed what action in which account. To accomplish this, Pipelines sets the AWS STS session name using a combination of the initiating GitHub user, the name of pipelines itself, and the pull request or branch from which the action was triggered. All log data for Gruntwork Pipelines is done using [AWS CloudTrail](https://aws.amazon.com/cloudtrail/). Session names are used in the `User Name` field in CloudTrail, allowing those searching the data to clearly identify which user performed an action. For more information on querying the logs seeing [where you can find logs](#where-you-can-find-logs) and [querying data](#querying-data) for more information on

### Who gets logged

Pipelines uses a naming scheme that combines the GitHub user who triggered the action and the pull request or branch from which the action was initiated. There are two scenarios in which Pipelines runs - when a pull request is opened, synchronized, or re-opened, and when a pull request is merged to the deploy branch (e.g., `main`).

When Pipelines is run in response to a pull request event, the user that created the most recent commit on the branch will be used in the log, in addition to the pull request number assigned by GitHub. For example, if the user `SomeUserInYourOrg123` created a pull request that was given the number `123` by GitHub, the resulting session name would be `SomeUserInYourOrg123-via-GWPipelines@PR-123`.

When Pipelines is run in response to a pull request being merged, the user that performed the merge (e.g., the user who clicked the `merge` button on the pull request) will be used in the log in addition the to deploy branch (e.g., `main`). For example, if the user `SomeUserInYourOrg123` merged a pull request to your deploy branch named `main` the session name would be `SomeUserInYourOrg123-via-GWPipelines@main`

### What gets logged

Logs are available for all operations performed in every AWS account by Gruntwork Pipelines. Gruntwork Pipelines takes advantage of AWS STS session names to clearly label all sessions with the GitHub user who requested the change and the pull request or branch that triggered the change.

The `userIdentity` field in each CloudTrail event associated with API calls performed by Pipelines [actions](../overview/actions.md) will contain the session name. For example, if the GitHub user `SomeUserInYourOrg123` made a pull request that was the 123rd pull request in your repository, an associated CloudTrail event would have the following data for `userIdentity`.

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

Combined with a [query service](#querying-data), you can perform analytics on usage of Gruntwork Pipelines in your AWS accounts.

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


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "5442445b96618b62e8b3aedc8f89a04f"
}
##DOCS-SOURCER-END -->
