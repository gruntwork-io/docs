# What is Gruntwork Pipelines?

:::info Recent Upgrade
This documentation relates to the latest version of Gruntwork Pipelines that most customers have not yet adopted.

If you are using the older version of Gruntwork Pipelines that includes the `infrastructure-pipelines` repository, click [here](../../infrastructure-pipelines/overview/deprecation.md) to learn more about the deprecation of that version.
:::

**Gruntwork Pipelines is a framework for securely and responsibly rolling out infrastructure changes to your AWS environments using GitOps workflows.** We often refer to Gruntwork Pipelines as simply "Pipelines."

Gruntwork Pipelines features first-class support for Terragrunt, runs on top of GitHub Actions, and uses a pull request-centric workflow. This means that all information about a proposed infrastructure change is added as comments to the applicable pull request, and that you apply the infrastructure change by merging the pull request.

Gruntwork Pipelines runs as a combination of a [binary](https://github.com/gruntwork-io/pipelines-cli) and a [GitHub Workflow](https://github.com/gruntwork-io/pipelines-workflows) composed of [GitHub Actions](https://github.com/search?q=topic%3Aaction+topic%3Apipelines+org%3Agruntwork-io&type=repositories), determining what _actions_ need to be taken, in which _environments_, based on the [_infrastructure changes_](#infrastructure-change) that occurred.

## Common Terms

Gruntwork Pipelines uses specific terminology to describe code changes and operations that occur as a result of changes. This section will familiarize you with the terminology used throughout the Gruntwork Pipelines documentation.

### Infrastructure change

When you edit any Infrastructure As Code (IAC) that needs to be "applied" to your cloud account (e.g. AWS or GCP), you are making an _infrastructure change_. We sometime call these an "infra-change" for short.

Infra-changes can involve updates to OpenTofu/Terraform or Terragrunt code, or any other type of file that represents a desired state of your infrastructure and that needs to be somehow applied. A classic example is changing some variables on an instance of an OpenTofu module. Gruntwork Pipelines assumes that infra-changes are committed via git, usually by first opening a pull request. When you open a pull request, you are essentially "proposing" an infra-change.

### Infrastructure change set

Sometimes users create a pull request that changes more than one file at a time. And sometimes a change to a single file affects how multiple other files will be "applied" to your live cloud account. For example, many users of Terragrunt use a pattern known as "envcommon" as a way to specify a default set of values for modules.

When more than one infra-change is made at a time, we call this an _infrastructure-change set._

### Pipelines actions

When a user proposes to make an infra-change by opening a pull request, we want to take some kind of "action" in response to that proposed-change. For example, we may want to run a `terragrunt plan` and estimate the cost of applying this Terragrunt plan. We call these _pipelines actions._

Gruntwork is responsible for adding support for a growing library of Pipelines Actions and we will continue to add more over time.
