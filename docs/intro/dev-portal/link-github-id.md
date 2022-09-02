# Link Your GitHub ID

Gruntwork provides all code included in your subscription through GitHub. You’ll need to link a GitHub ID to your account in order to access the IaC Library on GitHub. Follow the steps below to link your GitHub ID.

## Linking your GitHub account

1. First, sign in to the [Gruntwork Developer Portal](https://app.gruntwork.io).
2. Click the **Link my GitHub Account** button in the notice at the top of the home page, or the corresponding button located in your [Profile Settings](https://app.gruntwork.io/settings/profile).
3. Sign in to your GitHub account, then click the **Authorize** button to confirm the connection.
4. After being redirected back to the Gruntwork Developer Portal, click the **Accept My Invite** button. This will take you to GitHub again, where you can accept an invitation to join the Gruntwork organization. (You can ignore the corresponding invite email you receive from GitHub.)
5. Click **Join Gruntwork** to accept the invitation and access the IaC Library.

Once you’ve linked your account, the notice on the home page will disappear and you’ll find your GitHub ID recorded in your [Profile Settings](https://app.gruntwork.io/settings/profile). Going forward, you’ll have access to all private repositories included in your subscription. If you haven’t yet done so, we strongly recommend [adding an SSH key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) to your GitHub account. An SSH key is required to access the Gruntwork IaC library without adding a password in your Terraform code.

## Linking a new GitHub account

To link a new GitHub ID, you’ll first have to unlink the current one. Although uncommon, note that any private forks of Gruntwork repos will be deleted when you unlink your account.

1. Sign in to the Gruntwork Developer Portal and navigate to your [Profile Settings](https://app.gruntwork.io/settings/profile).
2. Click **Unlink** in the description under the **GitHub Account** section.
3. Click **Yes, Unlink My Account** in the confirmation dialog that appears.
4. Proceed with the [steps above](#linking-your-github-account) to link a new GitHub account.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "d64721bb5ec4d76fd33e70913243146a"
}
##DOCS-SOURCER-END -->
