# Gruntwork Account Factory

Gruntwork Account Factory allows you to vend new AWS accounts with best practice account baselines.

For enterprise customers, new accounts can be created with their own delegated Infrastructure as Code repositories automatically when vending accounts. This allows a central platform team to automate the process by which new AWS accounts are created, and delegation of select infrastructure management to particular teams.

This allows developer teams to self-service deploy their own infrastructure within the bounds of IAM roles controlled in a dedicated access control repository, allowing for a combination of least privilege access to AWS resources and self-service infrastructure deployment.

Gruntwork Account Factory is built on top of Gruntwork Pipelines. New account requests are tracked in git as IaC, triggering Terragrunt plans and applies to provision and baseline the new account. This allows the provisioning of new AWS accounts to be proposed and reviewed in the same way as any other infrastructure change, via pull requests.

## Account baselines

When provisioning new accounts, Gruntwork Account Factory doesn't just provision new AWS accounts, but also provisions a set of customizable baseline resources within those AWS accounts that make them ready to use for production workloads immediately.

These baselines include things like:

1. Best practice security settings for services like [GuardDuty](https://aws.amazon.com/guardduty/), [SecurityHub](https://aws.amazon.com/security-hub/) and [Macie](https://aws.amazon.com/macie/).
2. Best practice networking configurations for [AWS VPCs](https://aws.amazon.com/vpc/).
3. Best practice IAM roles for least privilege access to manage AWS resources in CI/CD via [GitHub OIDC](https://docs.github.com/en/actions/security-for-github-actions/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services).

## White glove support

Enterprise customers can expect white glove support in customizing their account baselines and vending process to meet their specific requirements. This includes:

1. Customizing the security configurations of the account baseline, and support in validating CIS compliance on day one.
2. Customizing the networking configurations of the account baseline, and support for [AWS Transit Gateway](https://aws.amazon.com/transit-gateway/) configurations, including setup of network inspection appliances, like [AWS Network Firewall](https://aws.amazon.com/network-firewall/).
3. Customizing the access control for delegated infrastructure management repositories, automatically granting particular teams access to manage their Infrastructure as Code for newly vended accounts.

