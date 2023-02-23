# What your Landing Zone should include

Your Landing Zone should include *at least* the following items:

## Basic account structure

You will need to figure out how you'll create and manage cloud accounts, which are the basic units of isolation / compartmentalization in the cloud. Will you have one account for the entire company? One for each organization? One for each team? One for each app? One for each environment? How will you handle billing? Tagging?

## Account baselines

You will need to create *baselines* that define, as code, all the foundational elements to set up in each cloud account.
This includes:

1. **Authentication and Authorization.** You'll want to think through how users will login to the cloud (e.g., IAM or SSO) and how you'll manage permissions for users once they are logged in (e.g., groups and roles in IAM or your IdP). Note that we *strongly* recommend that you lock down production so no users have write access (except perhaps a few admins for use in emergencies only); only your CI / CD pipeline should have write access to prod, as we'll discuss in the next section.
2. **Monitoring**. You'll want to ensure that every one of your accounts has adequate monitoring set up out-of-the-box. This should include at a bare minimum audit logging, so you have an audit trial of everything that happens in every account. You may also want to set up other basic tools for gathering metrics, aggregating logs, and configuring alerts.
3. **Networking**. You may configure the basic networking for your cloud as part of your account-baselines. This may include setting up Virtual Private Clouds (VPCs), subnets, route tables, NAT, Virtual Private Networks (VPN), and so on.
4. **Account hardening**. Depending on your company's security requirements, you may wish to run various security tools to harden your account, such as tools for network hardening (e.g., web application firewall, Network Intrusion Prevention System), a proxy for outbound communication (e.g., Squid Proxy), and various types of tools for detecting vulnerabilities and intruders (e.g., in AWS, GuardDuty and Macie).
5. **Guard Rails.** Your account baselines should put *guard rails* in place to prevent both accidental and malicious security issues. For example, you may choose to disable certain regions or services that your company or particular organizations or teams shouldn't be using.
6. **Compliance**. Your account baselines should enforce your compliance requirements out-of-the-box. For example, if you're using AWS, you may wish to create account baselines that meet all the requirements of the CIS AWS Foundations Benchmark out-of-the-box.
7. **Tagging and billing**. Your account baselines should configure whatever tagging, billing, and other information is necessary to ensure that your accounts are properly tracked and paid for.

## Example

For a concrete example of a Landing Zone for AWS, see [Configure Your AWS Accounts with Landing
Zone](https://docs.gruntwork.io/docs/guides/build-it-yourself/landing-zone/).


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"48f58cc321f48e30db0584fad30d84ed"}
##DOCS-SOURCER-END -->
