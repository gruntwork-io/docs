# Pipelines integration

CI/CD is a crucial tool for ensuring the smooth iteration and consistent delivery of Infrastructure as Code (IaC) to production environments. By adopting CI/CD practices, teams can automate the process of integrating and testing changes made to IaC code, allowing for frequent and reliable updates. With CI/CD, each change to the IaC codebase triggers an automated build process, ensuring that any new additions or modifications are properly incorporated. This enables developers to catch errors and conflicts early, facilitating collaboration and reducing the likelihood of issues surfacing during deployment.

Gruntwork Pipelines is a framework that enables you to use your preferred CI tool to securely run an end-to-end pipeline for infrastructure code (Terraform) and app code (Docker or Packer). Rather than replace your existing CI/CD provider, Gruntwork Pipelines is designed to enhance the security of your existing tool. For more information please see the [full pipelines documentation](/pipelines/what-is-it/).

In the guide below, we walk through how to configure Gruntwork Pipelines in your CI/CD

## Set up machine user credentials

### Get the machine user credentials from AWS

1. Log into the Security account in the AWS Console.
1. Go into IAM and find the ci-machine-user under Users.
1. Go to Security Credentials > Access Keys > Create Access Key.
1. Save these values as the `AWS_ACCESS_KEY_ID` and the `AWS_SECRET_ACCESS_KEY` Environment Variables in CircleCI.

   | Env var name          | Value                                                                                                                                   |
   | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
   | AWS_ACCESS_KEY_ID     | The Access Key generated for the machine user in the Security account.                                                                  |
   | AWS_SECRET_ACCESS_KEY | The Secret Key generated for the machine user in the Security account.                                                                  |
   | GITHUB_OAUTH_TOKEN    | Enter the MachineUserGitHubPAT here. You can find this in `reference-architecture-form.yml` or in the shared account's Secrets Manager. |

## Verify: Testing an infrastructure change end to end

You can verify the pipeline by making a change to one of the modules. For example, follow the steps below to extend the
number of replicas in the sample app:

1. Create a new branch in the `infrastructure-live` repo.
   `git checkout -B add-replica-to-sample-app`.
1. Open the file `dev/us-west-2/dev/services/sample-app-frontend` in your editor.
1. Change the input variable `desired_number_of_tasks` to `2`.
1. Commit the change.
   `git commit -a`.
1. Push the branch to GitHub and open a PR.
   `git push add-replica-to-sample-app`
1. Login to CircleCI. Navigate to your infrastructure-live project.
1. Click on the new pipeline job for the branch `add-replica-to-sample-app` to see the build log.
1. Verify the `plan`. Make sure that the change corresponds to adding a new replica to the ECS service.
1. When satisfied with the plan, merge the PR into `main`.
1. Go back to the project and verify that a new build is started on the `main` branch.
1. Wait for the `plan` to finish. The build should hold for approval.
1. Approve the deployment by clicking `Approve`.
1. Wait for the `apply` to finish.
1. Login to the AWS console and verify the ECS service now has 2 replicas.

## (Optional) Configure Slack notifications

### Create a Slack App

1. Visit [your apps](https://api.slack.com/apps) on the Slack API website, and click `Create New App`.
1. Name your application (e.g., `CircleCI` or `CircleCI-Pipeline`).
1. Then select the Slack workspace in which to install this app.

### Set Permissions

On the next page select the "Permissions" area, and add these 3 "scopes".

- `chat:write`
- `chat:write.public`
- `files:write`

<p>
<img alt="Slack App Scopes" className="img_node_modules-@docusaurus-theme-classic-lib-theme-MDXComponents-Img-styles-module medium-zoom-image" style={{border: '1px solid black'}} src="/img/refarch/slack_app_scopes.png" />
<em>Slack App Scopes</em>
</p>

### Install and Receive Token

Install the application into the Slack workspace and save your OAuth Access Token. This will be used in
a CircleCI environment variable.

<p>
<img alt="Slack OAuth Tokens" className="img_node_modules-@docusaurus-theme-classic-lib-theme-MDXComponents-Img-styles-module medium-zoom-image" style={{border: '1px solid black'}} src="/img/refarch/slack_oauth_tokens.png" />
<em>Slack OAuth Tokens</em>
</p>

<p>
<img alt="Slack OAuth Access Token" className="img_node_modules-@docusaurus-theme-classic-lib-theme-MDXComponents-Img-styles-module medium-zoom-image" style={{border: '1px solid black'}} src="/img/refarch/slack_auth_token_key.png" />
<em>Slack OAuth Access Token</em>
</p>

### Choose a Slack channel to notify

1. Choose or create a Slack channel in your workspace to notify with pipeline updates.
1. Right-click the channel name. You'll see a context menu.
1. Select `Copy link`.
1. Extract the Channel ID from the URL copied. E.g., `https://<org>.slack.com/archives/<CHANNEL_ID>`

### Create env vars on CircleCI

1. Login to CircleCI. Navigate to Project Settings -> Environment Variables.
1. Configure the following environment variables:

   | Env var name          | Value                                                             |
   | --------------------- | ----------------------------------------------------------------- |
   | SLACK_ACCESS_TOKEN    | The OAuth token acquired through the previous step.               |
   | SLACK_DEFAULT_CHANNEL | If no channel ID is specified, the app will attempt to post here. |


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "aabfb57a0a3f3b80f85cf85976c5f682"
}
##DOCS-SOURCER-END -->
