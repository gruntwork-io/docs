# Gruntwork Account Factory

Gruntwork Account Factory allows you to vend new AWS accounts with best practice account baselines.

For enterprise customers new accounts can be created with their own delegated infrastructure repositories. This allows developer teams to self-service deploy their own infrastructure within the bounds of IAM roles controlled in your central repository.

Account Factory is built into Gruntwork Pipelines. New account requests are tracked in git as IaC, triggering Terragrunt plans and applies to provision and baseline the new account.
