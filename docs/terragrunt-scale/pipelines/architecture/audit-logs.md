# Audit Logs

For certain cloud environments (for now, only AWS), Gruntwork Pipelines provides an audit log that records which user performed specific operations in your AWS accounts as a result of a [Pipelines Action](/docs/terragrunt-scale/pipelines/architecture/actions.md). Pipelines does this via integration with native tooling for the cloud provider.

## AWS

Accessing AWS environments from a CI/CD system often involves assuming temporary credentials using OpenID Connect (OIDC). For platform-specific documentation, see:

- [GitHub OIDC Configuration](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services)
- [GitLab OIDC Configuration](https://docs.gitlab.com/ee/ci/cloud_services/aws/)

Shared credentials can complicate tracking who performed specific actions in AWS accounts. Gruntwork Pipelines addresses this challenge by using [AWS CloudTrail](https://aws.amazon.com/cloudtrail/) with a naming convention that includes context from the triggering Pipelines Action. This approach associates every API operation performed by Pipelines with a username and a specific pull request or branch, enabling your security team to efficiently investigate access-related issues and analyze individual user actions.

## How it works

Gruntwork Pipelines creates an audit log that tracks which user performed what action in which AWS account. It does this by setting the [AWS STS](https://docs.aws.amazon.com/STS/latest/APIReference/welcome.html) session name to include the initiating username, the Pipelines name, and the merge/pull request or branch that triggered the action. Logging is handled through [AWS CloudTrail](https://aws.amazon.com/cloudtrail/), where session names appear in the `User name` field, making it easy to identify which user performed an action. For information on locating logs, see [where you can find logs](#where-you-can-find-logs) and [querying data](#querying-data).

### What gets logged

Logs are generated for all operations performed by Gruntwork Pipelines in AWS across every AWS account. These logs leverage [AWS STS](https://docs.aws.amazon.com/STS/latest/APIReference/welcome.html) session names to clearly label sessions with the username that requested the change and the associated merge/pull request or branch.

Each CloudTrail event linked to API calls from Pipelines [Actions](/docs/terragrunt-scale/pipelines/architecture/actions.md) includes the session name in the `userIdentity` field. For example, if the user `SomeUserInYourOrg` initiated the 123rd request in your repository, the `userIdentity` field in a corresponding CloudTrail event would provide details such as the following.

```json
{
    "eventVersion": "1.09",
    "userIdentity": {
        "type": "AssumedRole",
        "principalId": "xxxxxxxxxxxxxxxxxxxxx:SomeUserInYourOrg-via-GWPipelines@PR-123",
        "arn": "arn:aws:sts::123456789012:assumed-role/<platform>/SomeUserInYourOrg-via-GWPipelines@PR-123",
        "accountId": "123456789012",
        "accessKeyId": "xxxxxxxxxxxx",
        "sessionContext": {
            "sessionIssuer": {
                "type": "Role",
                "principalId": "xxxxxxxxxxxxxxxxxxxxx",
                "arn": "arn:aws:iam::123456789012:role/<role-name>",
                "accountId": "123456789012",
                "userName": "<platform>"
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

Due to the 64-character limit for STS session names, the originating repository is not included in the session name. To identify the originating repository, you can search through repositories for commits matching the user and request number combination or contact the user directly.

By combining this data with a [query service](#querying-data), you can analyze the usage patterns of Gruntwork Pipelines in your AWS accounts using CloudTrail logs.

### Who gets logged

Pipelines employs a naming scheme that integrates the user who triggered the Pipelines [Action](/docs/terragrunt-scale/pipelines/architecture/actions.md) along with the request or branch that initiated the action. The AWS STS session name is formatted as follows:
`<UserName>-via-GWPipelines@(PR-<RequestNumber>|<branch name>)`.

#### For merge/pull request events

When Pipelines runs in response to a request event (opened, updated, or reopened), the session name includes the user who made the most recent commit on the branch and the request number. For instance:

- If the user `SomeUserInYourOrg` created request number `123`, the session name would be:
  `SomeUserInYourOrg-via-GWPipelines@PR-123`.

#### For merged requests

When Pipelines runs after a request is merged, the session name reflects the user who performed the merge and the deploy branch name (e.g., `main`). For example:

- If the user `SomeUserInYourOrg` merged a request to the branch `main`, the session name would be:
  `SomeUserInYourOrg-via-GWPipelines@main`.

## Where you can find logs

Gruntwork Pipelines uses AWS CloudTrail to log all actions performed in your AWS accounts. Thanks to the naming scheme, actions initiated by Gruntwork Pipelines are clearly identified in CloudTrail.

Accessing and querying CloudTrail data depends on your organization's specific policies and configurations. If you are a Gruntwork Account Factory customer, refer to the documentation on [logging](/docs/aws-accelerator/account-factory/architecture/logging) for details on accessing and querying CloudTrail data.

## Querying data

CloudTrail can be configured to automatically store events in an S3 bucket of your choice. When stored in S3 with proper configuration, access can be restricted to authorized users only. You can query stored data using services such as [Amazon Athena](https://aws.amazon.com/athena/) or forward the data to other logging systems for further analysis.
