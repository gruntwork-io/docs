# What is Gruntwork Pipelines?

Gruntwork Pipelines is a framework for securely deploying infrastructure as code to your AWS environments using GitOps workflows. Gruntwork Pipelines runs as a binary and series of steps in your CI system, determining what _actions_ need to be taken, in which _environments_, based on the _infrastructure changes_ that occurred.

## Isolating IaC definitions and deployment

Due to the necessity of having administrative permissions in your CI system to deploy infrastructure, Gruntwork Pipelines separates where changes occur from where they are applied. Infrastructure is _defined_ in one GitHub repository (commonly named `infrastructure-live`) and the code that _deploys_ your infrastructure is stored in a different GitHub repository (commonly named `infrastructure-pipelines`). This is done to allow you to use the principle of least privilege to each repository. For more information on pipelines’ security model see [access control](../access-control/index.md).

This allows your team to have many collaborators for your IaC in your `infrastructure-live` repository, while permitting a subset of administrators access to the workflows in `infrastructure-pipelines` that can access your AWS environments.

Workflows running in the `infrastructure-live` repository trigger workflows to run in `infrastructure-pipelines`, which runs the appropriate terragrunt command on the changed code to perform changes to your infrastructure. Pipelines uses OIDC to assume a role in your AWS account with a policy that limits access exclusively to the `main` branch of your `infrastructure-pipelines` repository. No other repository or branch can leverage this role to gain access to your AWS accounts.

![Gruntwork Pipelines Architecture](/img/pipelines/how-it-works/pipelines_architecture.png)

:::info Previous Version Available
You are reading documentation for Gruntwork Pipelines. The previous version of Gruntwork Pipelines is known as [ECS Deploy Runner](../../ecs-deploy-runner/overview/).
:::
