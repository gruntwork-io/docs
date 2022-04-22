# Configure CI Server

Once we have our pipeline defined as code in our repository, we can hook it up to our CI server to start building.
Configure CircleCI to start building the `infrastructure-live` repo by adding the project to your org.

To add the `infrastructure-live` repo:

- Login to CircleCI as **the machine user**. If you don’t have an account for the machine user, sign up using the GitHub
  account of the machine user.

- Go to the projects page for your org and click the **Add Projects** button.

- Look for the `infrastructure-live` repo in the list, and click the **Set Up Project** button next to the repo.

- Click the **Start Building** button to trigger the first build. Note that this build is expected to fail since we
  haven’t configured the required environment variables.

Next, we need to configure the environment variables for the build:

- Click the gear icon in the top right for the job to configure the job.

- Add a **User Key** in the **Checkout SSH keys** settings for the build.

- Click **Environment Variables** and add the following variables to the build:

- `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`: The AWS access key pair for the machine user to access your AWS
  account. This should be a user in the security account with the ability to assume the auto deploy role in each of
  the environments that you wish to configure CI/CD for.

- `GITHUB_OAUTH_TOKEN`: A personal access token for the machine user with access to Gruntwork Infrastructure as Code
  Library.

- `SLACK_WEBHOOK`: A webhook for posting messages to your Slack org. You can refer to
  [the official Slack documentation](https://api.slack.com/messaging/webhooks) for instructions on how to configure a
  webhook for your Slack org.

Once you have these configurations set, you should be able to start deploying your infrastructure in reaction to git
events!


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "80db423fbd3342a56695e95ad0398426"
}
##DOCS-SOURCER-END -->
