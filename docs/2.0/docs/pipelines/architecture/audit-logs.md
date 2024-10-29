# Audit logs

Gruntwork Pipelines provides an audit log of which GitHub user performed _what_ operation in your AWS accounts as a result of a [Pipelines Action](./actions.md).

Accessing AWS environments from a CI/CD system is commonly done by assuming temporary credentials using [OpenID Connect (OIDC)](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services). Usage of shared credentials complicates the task of maintaining an accurate log of who did what in your AWS accounts. Gruntwork Pipelines solves this issue by leveraging [AWS CloudTrail](https://aws.amazon.com/cloudtrail/) and a naming scheme based on context from the triggering Pipelines Action in GitHub. This setup associates every single API operation performed by Gruntwork Pipelines with a GitHub username and a pull request or branch. This allows your security team to quickly triage access related issues and perform analytics on usage patterns of individual users from your version control system in your AWS accounts.

## How it works

Gruntwork Pipelines provides an audit log of which user performed what action in which account. To accomplish this, Pipelines sets the [AWS STS](https://docs.aws.amazon.com/STS/latest/APIReference/welcome.html) session name using a combination of the initiating GitHub user, the name of Pipelines itself, and the pull request or branch from which the action was triggered. All logging for Gruntwork Pipelines AWS access is uses [AWS CloudTrail](https://aws.amazon.com/cloudtrail/). Session names are set in the `User name` field in CloudTrail, allowing those searching the data to clearly identify which user performed an action. For more information on querying the logs see [where you can find logs](#where-you-can-find-logs) and [querying data](#querying-data).

### What gets logged

Logs are available for all operations performed in every AWS account by Gruntwork Pipelines. Gruntwork Pipelines takes advantage of [AWS STS](https://docs.aws.amazon.com/STS/latest/APIReference/welcome.html) session names to clearly label all sessions with the GitHub user who requested the change and the pull request or branch that triggered the change.

The `userIdentity` field in each CloudTrail event associated with API calls performed by Pipelines [Actions](./actions.md) will contain the session name. For example, if the GitHub user `SomeUserInYourOrg` made a pull request that was the 123rd pull request in your repository, an associated CloudTrail event would have information that looked like the following in the `userIdentity` field.

```json
{
    "eventVersion": "1.09",
    "userIdentity": {
        "type": "AssumedRole",
        "principalId": "xxxxxxxxxxxxxxxxxxxxx:SomeUserInYourOrg-via-GWPipelines@PR-123",
        "arn": "arn:aws:sts::123456789012:assumed-role/github/SomeUserInYourOrg-via-GWPipelines@PR-123",
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

Pipelines uses a naming scheme that combines the GitHub user who triggered the Pipelines [Action](./actions.md) and the pull request or branch from which the action was initiated. Pipelines will set the AWS STS session name according to the following format: `<GitHubUserName>-via-GWPipelines@(PR-<PullRequestNumber>|<branch name>)`.

Pipelines runs Pipelines Actions when a pull request is opened, updated, re-opened, or merged to the deploy branch (e.g., main). The naming scheme will use different values for pull request events and pushes to the deploy branch (e.g. merged PRs).

When Pipelines is run in response to a pull request event, the user that created the most recent commit on the branch will be used in the log, in addition to the pull request number assigned by GitHub. For example, if the user `SomeUserInYourOrg` created a pull request that was given the number `123` by GitHub, the resulting session name would be `SomeUserInYourOrg-via-GWPipelines@PR-123`.

When Pipelines is run in response to a pull request being merged, the user that performed the merge (e.g., the user who clicked the `merge` button on the pull request) will be used in the log in addition the to deploy branch (e.g., `main`). For example, if the user `SomeUserInYourOrg` merged a pull request to your deploy branch named `main` the session name would be `SomeUserInYourOrg-via-GWPipelines@main`

## Where you can find logs

Gruntwork Pipelines leverages AWS CloudTrail to log all actions taken by Pipelines in your AWS account. Due to our naming scheme, identifying operations performed in your AWS account by Gruntwork Pipelines are clearly identified.

Accessing CloudTrail and querying data is dependent on your organization's policies and settings. If you are a Gruntwork Account Factory customer, see the documentation on [logging](/2.0/docs/accountfactory/architecture/loggingd) for information on how to access and query your CloudTrail data.

## Querying data

CloudTrail can be configured to automatically store events in an S3 bucket of your choosing. Storing data in S3, when correctly configured, allows you to limit access to only the users that need it. Data in stored in S3 can be searched directly using a query service like [Amazon Athena](https://aws.amazon.com/athena/) or forwarded to other logging systems.
