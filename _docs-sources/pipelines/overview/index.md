# What is Gruntwork Pipelines?

Gruntwork Pipelines is a framework for securely deploying infrastructure as code to your AWS environments using GitOps workflows. Gruntwork Pipelines runs as a binary and series of steps in your CI system, determining what _actions_ need to be taken, in which _environments_, based on the [_infrastructure changes_](#infrastructure-change) that occurred.

## Common Terms

Gruntwork Pipelines uses specific terminology to describe code changes and operations that occur as a result of to changes. This section will familiarize you with the terminology used throughout the Gruntwork Pipelines documentation.

### Infrastructure change

When you edit any infrastructure-as-code that needs to be "applied" to your cloud account (e.g. AWS or GCP), you are making an _infrastructure change_. We sometime call these an "infra-change" for short.

Infra-changes can involve updates to OpenTF, Terraform, or Terragrunt code, or any other type of file that represents a desired state of your infrastructure and that needs to be somehow applied. A classic example is changing some variables on an instance of a Terraform module. By changing these variables you are essentially requesting that some API calls eventually be made to AWS to update your infrastructure in some way (in this case, by running `terraform apply` at some point).

Gruntwork Pipelines assumes that infra-changes are committed via git, usually by first opening a Pull Request. When you open a Pull Request, you are essentially "proposing" an infra-change.

### Infrastructure change set

Sometimes users create a Pull Request that changes more than one file at a time. And sometimes a change to a single file affects how multiple other files will be "applied" to your live cloud account. For example, many users of Terragrunt use a pattern known as "envcommon" as a way to specify a default set of values for modules.

When more than one infra-change is made at a time, we call this an _infrastructure-change set._ We sometimes call this an "infra-change set" for short.

### Pipelines actions

When a user proposes to make an infra-change by opening a Pull Request, we want to take some kind of "action" in response to that proposed-change. For example, we may want to run a `terragrunt plan` and estimate the cost of applying this Terragrunt plan. We call these _pipelines actions._

Gruntwork is responsible for adding support for a growing library of Pipelines Actions and we will continue to add more over time.
