# FAQ

## How can a user change their GitHub account(unlink/link)?

1. Go to [https://app.gruntwork.io/settings/profile](https://app.gruntwork.io/settings/profile)
1. Click the **Unlink** link in the &ldquo;GitHub Account&rdquo; section as shown below
    ![Unlink GitHubId on Profile page](/img/faq/developer-portal/unlink-github.png)
1. [Follow these steps](./link-github-id.md) to link a new GitHub account *using a private/incognito browser window*.
    :::tip

    A private/incognito browser window guarantees you’ll have the opportunity to specify the new Github account you wish to link.

    :::

## How can a user change the email associated with an account?

**Emails cannot be changed.**

Emails serve as the primary authentication & identification mechanisms — essentially functioning as a username. For both of these reasons, changing them is currently unsupported.

If a you need to use a different email (for instance, if you were using a personal email before, or your company domain changed), then:

1. You or an admin on your team will need to send invitations to the new email(s).
1. Accept the invitation for the new email to create a new user and sign in.
1. Link your GitHub account to the new user profile when prompted after sign in.
    :::tip

    If you link the same GitHub account you had on the older user account to the new user account prior to the old account being revoked from the team, your access to our GitHub Organization will be unaffected.

    :::
1. Remove the old user account from your Organization in the Developer Portal to prevent duplicate license usage

## User has a linked GitHub Account but does not have access to our code

If you have linked a GitHub account to your user account in the Developer Portal but do not have access to our private repositories it is likely due to not accepting the GitHub invitation that was sent to you. Check your GitHub account's email for the invitation.

:::note

The GitHub invitation typically expires after 7 days.

To get a new invitation, simply sign in to the Developer Portal and you will be automatically re-invited. After sign in, check your GitHub account's email inbox for the new invitation.

:::

If you are still unable to find the GitHub invitation contact your Organization's GitHub Administrator to verify if your Organization uses GitHub Enterprise. In cases like these, there are policies / settings that your GitHub Enterprise administrator may have configured, which block your ability to view and accept our invitations. When this happens, Gruntwork is unable to assist you further until your GitHub Enterprise administrator has relaxed the constraints on your account.


## User did not receive their invitation to the Developer Portal?

If you haven't received your invitation to the Developer Portal, follow these steps in order:

1. Check your spam folder for emails from `grunty@gruntwork.io`.
1. If you don't find the email, try signing into the [Developer Portal](https://app.gruntwork.io) using the email address you were invited with. The Portal will automatically resend the email invitation.
1. If you still haven't received your email invitation, contact <support@gruntwork.io>.


## User is unable sign into the Developer Portal

There are some tools like Defender for Office 365 that [automatically visit](https://learn.microsoft.com/en-us/microsoft-365/security/office-365-security/safe-links-about?view=o365-worldwide) all the links in your email to see if they're malicious. Unfortunately, this breaks our Portal's sign-in model of &ldquo;you can only click this button once before the link expires.&rdquo; That's why we include the separate link you can copy and paste, which tools like Defender often don't automatically visit.

To remedy this:

1. Request a new login token
1. When you get the email, don't click on the &ldquo;Sign In&rdquo; link (this would invalidate the token prematurely).
1. Copy the URL below the &ldquo;Trouble Signing In?&rdquo; header in the email, and paste it into your browser. This should sign you in.
