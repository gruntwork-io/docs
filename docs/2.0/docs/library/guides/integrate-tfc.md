# Integrating with Terraform Cloud and Enterprise

## Introduction

This section will cover how to use Gruntwork in conjunction with two popular HashiCorp products: [Terraform Cloud (TFC)](https://www.terraform.io/docs/cloud/index.html) and [Terraform Enterprise (TFE)](https://www.terraform.io/docs/enterprise/index.html). Although the open source edition of Terraform is quite powerful and flexible as a standalone project, many organizations turn to TFC/TFE for the CLI/UI integration, approval-based workflow capabilities, Sentinel policy framework, and more. At its core, Terraform Enterprise is basically Terraform Cloud repackaged for a self-hosted environment. We’ll use "TFC" as short hand for both Terraform Cloud and Enterprise throughout this guide.


In our guide on [Customizing Modules](/2.0/docs/library/tutorials/customizing-modules) we describe how to use Gruntwork with two VCS repositories: `infrastructure-modules`, containing your OpenTofu/Terraform code that wraps the modules from Gruntwork IaC Library, and `infrastructure-live`, containing Terragrunt configurations that enable you to manage Terraform easily across multiple accounts and environments. When using Gruntwork with TFC, you have two choices regarding these repositories:

<div className="dlist">

#### Use TFC without Terragrunt

Using this approach, Terraform modules are still defined in an `infrastructure-catalog` repository as discussed above.
Each module has a dedicated [TFC workspace](https://www.terraform.io/docs/state/workspaces.html). You create the
workspace in advance, and then you can run the Terraform modules either from the `terraform` CLI or from the TFC UI.
In essence, TFC replaces Terragrunt and `infrastructure-live`. You’ll be able to use the full TFC feature set, but you
won’t be able to take advantage of the benefits provided by Terragrunt, such as keeping your code and variables, CLI
args, etc DRY, and adding support for applying changes across multiple modules / environments.

#### Use TFC with Terragrunt

Alternatively, you can use both `infrastructure-catalog` and `infrastructure-live` repositories as described above,
storing the wrapper modules in `infrastructure-catalog`, and using `infrastructure-live` and Terragrunt for
deployments. In this approach, TFC is used as a [remote backend](https://www.terraform.io/docs/backends/types/remote.html)
for Terraform. You use Terragrunt to run deployments from the CLI, which in turn invokes Terraform on the TFC backend.
The TFC UI is used for audit and tracking capabilities, but not for executing Terraform runs.

</div>

We cover each approach below, but first, you’ll need to complete a few one time set up steps.

## One time set up

:::caution

If you’re using TFE, you’ll need to follow [HashiCorp’s Enterprise installation instructions](https://www.terraform.io/docs/enterprise/before-installing/index.html) first. Most of the details below still apply to TFE, but you should adjust any URLs, such as `app.terraform.io`, to use your TFE installation instead.

:::

### Create an account

The first step is to establish an account. Visit [the Terraform Cloud sign up page](https://app.terraform.io/signup/account) to create a free account.

![Sign up for a Terraform Cloud account](/img/guides/working-with-code/tfc/tfc-sign-up.png)

### Create an organization

Once the account is established, you’ll verify your email address. It’s safe to skip the initial set up instructions.
After doing so, you’ll be presented with the option to create a new organization. We suggest using lowercase
organization names, optionally with `-` or `_` characters, but without whitespace.

![Create an organization in TFC](/img/guides/working-with-code/tfc/tfc-create-organization.png)

### Set up an SSH key

When you’re using Gruntwork modules, you use the source attribute on a module block to read a module from a Gruntwork
code repository. As a simple example, if you wanted to create an SQS queue using the SQS module from [`package-messaging`](https://github.com/gruntwork-io/package-messaging), you might create something like the following:

```hcl
provider "aws" {
 region = "us-east-1"
}

module "sns" {
  source = "git::git@github.com:gruntwork-io/package-messaging.git//modules/sqs?ref=v0.3.2"
  name   = "my-queue"
}
```

The `git::git@github.com:gruntwork-io` portion of the `source` attribute indicates that this module is accessed over SSH. Thus, TFC will need access to the Gruntwork code repositories via SSH.

To set up this access, take the following steps:

1.  First, if you don’t have one already, you’ll need a machine user that has access to Gruntwork. A machine user is an
    account that is only used for automation, and is not used by humans. In this case, the "machine" in question is the TFC
    executor. Create a new Github user, and send the machine user’s username and email address to [support@gruntwork.io](mailto:support@gruntwork.io). We’ll make sure the user has access to our repositories.

2.  Next, generate an SSH key pair, and add the public key to the new GitHub machine user. GitHub has [easy-to-follow instructions](https://help.github.com/en/enterprise/2.19/user/github/authenticating-to-github/connecting-to-github-with-ssh).

3.  Now, add the private SSH key to TFC. You’ll find the option under SSH Keys in the TFC organization settings. We called ours _Gruntwork access_. TFC will use this key to clone Gruntwork code repositories.

![Configuring an SSH key for the TFC organization](/img/guides/working-with-code/tfc/tfc_ssh_key.png)

With the SSH key in place, the one time set up is complete.

## Using TFC without Terragrunt

This section will demonstrate how to use TFC to deploy your infrastructure, leveraging Gruntwork’s Terraform modules to do the heavy lifting. With this method, you can run Terraform from your local CLI or from the TFC UI.

[Workspaces](https://www.terraform.io/docs/state/workspaces.html) store the state
associated with the infrastructure that is managed by Terraform. The state is
stored in TFC. You can use the
[`remote_state`
data source](https://www.terraform.io/docs/providers/terraform/d/remote_state.html) to use the outputs of one workspace as the variable inputs for
another workspace. In this manner, you can link multiple workspaces together to
build an end-to-end infrastructure.

In our guide on [using Gruntwork modules](/2.0/docs/library/tutorials/customizing-modules), we discuss the wrapper module
pattern in which multiple Terraform modules are contained in a hierarchy of directories located under
`infrastructure-catalog/modules`. Using such a hierarchy, each workspace will use the same `infrastructure-catalog` repository, but pointed at different subdirectories within the repository.

:::note

**You must host Gruntwork modules _in your own repo_ (by wrapping our modules or copying them) in order to use them with the Terraform registry.** This is because TFC needs to create an webhook in that repo which requires admin access, and we cannot grant customers admin access to Gruntwork’s repos. We’re in touch with HashiCorp regarding this limitation, and have requested that they remove the admin requirement.

Enterprise customers may inquire about our `repo-copier` tool, which can provide a complete clone of the Gruntwork IaC library in your own VCS system without the need to create wrapper modules.

:::

We’ll demonstrate how to set up a workspace for a simple SQS module. To get started, create a new workspace and connect in to your VCS provider.

### Connect to a version control provider

Connect the workspace to the version control system of your choice. For example, GitHub, GitLab, or Bitbucket. This allows TFC to access your `infrastructure-catalog` repository. Once your VCS is connected, select your `infrastructure-catalog` repository from the list of repositories presented.

![Connect a workspace to a VCS](/img/guides/working-with-code/tfc/tfc-create-workspace.png)

### Configure the workspace settings

In this step, you’ll choose a name and configure additional settings relating to the workspace. Be sure to
[follow the workspace naming guidelines](https://www.terraform.io/docs/cloud/workspaces/naming.html) to ensure a
consistent yet flexible naming convention. For this example, we’ll choose `sqs-example-dev-us-east-1`.

We also need to inform TFC where to find the correct module. Under the
_Advanced options_, locate the _Terraform Working Directory_ field, and enter
the path to the module. TFC will automatically enter the same value for
_Automatic Run Triggering_ to ensure that Terraform runs for this workspace
only occur when changes are detected to the module path. For our SQS example,
we enter the value `/modules/networking/sqs`.

![Configure workspace settings](/img/guides/working-with-code/tfc/tfc-workspace-settings.png)

### Use the SSH key

In the one time set up steps described above, you created an SSH key. You’ll now need to choose this SSH key in the workspace settings.

![Choose the private SSH key](/img/guides/working-with-code/tfc/tfc-workspace-ssh.png)

### Configure credentials and variables

The Terraform AWS provider used by the SQS module will need credentials to communicate with the AWS API. You can set this up using the standard `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` environment variables in the workspace. When setting the variables, be sure to mark the _Sensitive_ checkbox so that the variables are write only.

![Configure AWS API credentials as environment variables in the workspace](/img/guides/working-with-code/tfc/tfc-env-vars.png)

You can also enter values for any Terraform variables for the module. For our simple SQS module we don’t define any variables.

### Queue and apply the configuration

With all the configuration complete, it’s time to kick off the plan and apply. You can trigger the run by making a
commit to a file in the working directory that you set up when configuring workspace settings (in our case, in
`/modules/networking/sqs`), or by manually triggering the run using the _Queue plan_ button in the TFC UI. The run will:

- Clone your `infrastructure-catalog` repository using the VCS connection
- Download the AWS provider and set credentials using the environment variables
- Download the Gruntwork SQS module using the SSH key
- Run a `terraform plan`
- Wait for confirmation
- Once confirmed, run a `terraform apply`

![TFC run results](/img/guides/working-with-code/tfc/tfc-run.png)

### Final thoughts on integrating TFC with the Gruntwork IaC Library

It’s easy to use TFC with the Gruntwork IaC Library. When using the `infrastructure-modules` approach outlined in this

guide, all of your Terraform wrapper modules will be in one place. You can configure one workspace per module, and you
can link modules together with the [`remote_state`
data source](https://www.terraform.io/docs/providers/terraform/d/remote_state.html). Note that you’ll need to set up the AWS credentials and SSH key within each workspace.

You can use this pattern for any of Gruntwork’s Terraform modules. This even works for modules like
[`terraform-aws-eks`](https://github.com/gruntwork-io/terraform-aws-eks) which need to download external dependencies (like
[`kubergrunt`](https://github.com/gruntwork-io/kubergrunt)). Those modules use the special
[`executable-dependency`](https://github.com/gruntwork-io/package-terraform-utilities/tree/master/modules/executable-dependency)
module to install the external dependency within the executor (the TFC node, in this case) at run time. In the future,
Gruntwork may offer modules through a private Terraform registry to remove the SSH key requirement, further simplifying
the process.

Once the workspace is set up, you can trigger runs through the UI or from the `terraform` CLI. To use the CLI, follow [the CLI-driven Run Workflow](https://www.terraform.io/docs/cloud/run/cli.html) instructions.

## Using TFC with Terragrunt

The TFC UI runs only Terraform commands. Terragrunt expects you to run it, and it, in turn, will run Terraform.
Therefore, it currently is not possible to use the TFC UI to trigger Terragrunt. However, you can set up Terraform to run
remote operations such as plan and apply. That is, you use Terragrunt to organize your code and keep it DRY, and you can
configure it so that when you run `terragrunt apply` on your computer (or on a CI server), it runs `terraform apply` in
TFC rather than on your local system.

You’ll still need workspaces, as described in the sections above on using TFC without Terragrunt. You can create the
workspace automatically or re-use a workspace that already exists, including variables and env vars already set in it,
such as your AWS access keys, so you don’t need to have those locally. You’ll also be able to see the apply output in
the web UI (but not trigger it from the web UI) and see the history of all apply calls in the web UI.

The steps involved to set all this up include:

- Obtain an API token to permit Terraform to use TFC
- Generate a `backend.tf` file to configure Terraform to point at TFC as a remote backend
- Set up workspaces for each module managed by Terragrunt
- Set input variables

Before digging in, we’ll review an example Terragrunt configuration.

### Setting up

For this example, we’ll once again deploy an SQS queue from [Gruntwork `package-messaging` repository](https://github.com/gruntwork-io/package-messaging:).

Consider the following directory structure for an `infrastructure-live` repository:

    .
    ├── dev
    │   ├── account.hcl
    │   └── us-east-1
    │       ├── region.hcl
    │       └── sqs
    │           └── terragrunt.hcl
    ├── common.hcl
    └── terragrunt.hcl

For simplicity, the example shows a single environment, `dev`, the `sqs` module, but this pattern could be expanded to more environments and regions as needed.

### Obtain an API token

Terraform needs an API token to communicate with TFC as a backend. To obtain a token, open the user settings, and click
on _Tokens_. If you’re running Terragrunt on a CI system, this token should be associated with a machine user rather
than an individual user account.

![Creating a TFC API token](/img/guides/working-with-code/tfc/tfc-token.png)

Now you’ll add the token to your [`~/.terraformrc` file](https://www.terraform.io/docs/commands/cli-config.html) in a `credentials` block.

<!-- spell-checker: disable -->
```hcl
 For TFE, substitute the custom hostname for your TFE host
credentials "app.terraform.io" {
  token = "xxxxxxyyyyyyyyyzzzzzzzzzzzz"
}
```
<!-- spell-checker: enable -->

### Generating the backend

For Terragrunt to use TFC as a remote executor, you’ll need a `backend` block. The backend is what determines where
Terraform reads state and how execution is handled. The Terragrunt
[`generate` block](https://terragrunt.gruntwork.io/docs/reference/config-blocks-and-attributes/#generate:) can generate
the backend block dynamically so you don’t need to include one in each module.

Terraform [workspaces](https://www.terraform.io/docs/state/workspaces.html) store the state associated with a given
backend. In the Terragrunt configuration hierarchy defined above, each module (just `sqs` in this case) uses a separate workspace and must have its own name in the `backend` block. Therefore, we’ll need to gather all the component parts of our chosen workspace naming convention to use when setting up the backend.

Following [the advice from HashiCorp](https://www.terraform.io/docs/cloud/workspaces/naming.html), we’ll need:

- The name of the component, such as _sqs_
- The name of the environment, such as _dev_
- The region, such as _us-east-1_

The snippet below shows one technique for gathering the requisite information and generating the backend:

**infrastructure-live/terragrunt.hcl**

```hcl
locals {
  tfc_hostname     = "app.terraform.io" # For TFE, substitute the custom hostname for your TFE host
  tfc_organization = "gruntwork-io"
  workspace        = reverse(split("/", get_terragrunt_dir()))[0] # This will find the name of the module, such as "sqs"
  account_vars     = read_terragrunt_config(find_in_parent_folders("account.hcl"))
  region_vars      = read_terragrunt_config(find_in_parent_folders("region.hcl"))
}

generate "remote_state" {
  path      = "backend.tf"
  if_exists = "overwrite_terragrunt"
  contents = <<EOF
terraform {
  backend "remote" {
    hostname = "${local.tfc_hostname}"
    organization = "${local.tfc_organization}"
    workspaces {
      name = "${local.workspace}-${local.account_vars.locals.account}-${local.region_vars.locals.region}"
    }
  }
}
EOF
}
```

This code shows off a few features of Terragrunt:

- The `generate` block creates a file called `backend.tf` that will be created alongside the other `*.tf` files for the module that Terragrunt is operating on. This effectively adds a dynamically generated `backend` configuration to the module.

- Terragrunt has a set of [built-in functions](https://terragrunt.gruntwork.io/docs/reference/built-in-functions/), like `find_in_parent_folders()`, `read_terragrunt_config()`, and `get_terragrunt_dir()`. These functions are used to obtain values need to configure the backend.

- Terragrunt can also use all of the [native Terraform functions](https://www.terraform.io/docs/configuration/functions.html). In the configuration above, we’re using [`split()`](https://www.terraform.io/docs/configuration/functions/split.html) and [`reverse()`](https://www.terraform.io/docs/configuration/functions/reverse.html) to obtain the leaf directory name (such as `sqs`) that is used as the workspace suffix.

This configuration is at the root of the Terragrunt configuration tree so that it can be reused across each module, reducing code duplication. Note the use of `get_terragrunt_dir()` to obtain the workspace name. This function retrieves the current Terragrunt directory. If you run `terragrunt apply` from the `sqs` module, the value returned by `get_terragrunt_dir()` will be the fully qualified filesystem path to the sqs subdirectory. Although the function is in the root `terragrunt.hcl`, it runs in the context of the directory where `terragrunt` is invoked.

### Creating a workspace and setting provider credentials

By default, if you configure the remote backend for a workspace that doesn’t yet exist, TFC will automatically create one when you run `terraform init`. This is known as [implicit workspace creation](https://www.terraform.io/docs/cloud/run/cli.html#implicit-workspace-creation). Once the workspace exists, your Terraform code will need API credentials to interface with the cloud provider.

There are a few ways to set these credentials:

1.  Create all the workspaces manually in advance, and set the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` in each workspace, as described in [Configure credentials and variables](#configure-credentials-and-variables).

2.  Create all the workspaces manually by running `terragrunt init`, and still set up the environment variables as previously mentioned.

3.  To set this up programmatically, you can use the [`tfe_workspace`](https://www.terraform.io/docs/providers/tfe/r/workspace.html) and [`tfe_variable`](https://www.terraform.io/docs/providers/tfe/r/variable.html) resources to configure the workspaces with Terraform.

In all cases, you’ll need to ensure that your workspaces stay in sync with your Terragrunt configuration. Each time you add a new module in Terragrunt, you’ll need a corresponding workspace. Furthermore, if you rotate your AWS API keys, you’ll need to update them within each workspace. For that reason, the final option above is recommended.

### Setting variables

In typical Terragrunt usage, variables are passed to Terraform using the [`inputs`](https://terragrunt.gruntwork.io/docs/reference/config-blocks-and-attributes/#inputs) attribute. Anything defined in the inputs will be passed to Terraform using [the environment variable mechanism](https://www.terraform.io/docs/configuration/variables.html#environment-variables:). However, this mechanism is not supported by TFC. Instead, you can generate a `*.auto.tfvars` file containing the inputs.

:::caution

The generated `terragrunt.auto.tfvars` file will be present on local disk. Depending upon your configuration, this file may contain sensitive data. Do not commit this file to version control. We recommend adding the `*.auto.tfvars` to `.gitignore`.

:::

The following code shows how to generate a `terragrunt.auto.tfvars` file.

**infrastructure-live/dev/us-east-1/sqs/terragrunt.hcl**

```hcl
terraform {
  source = "git::ssh://git@github.com/gruntwork-io/package-messaging//modules/sqs?ref=v0.3.2"
}

include {
  path = find_in_parent_folders()
}

locals {
  common_vars = read_terragrunt_config(find_in_parent_folders("common.hcl"))
}

generate "tfvars" {
  path      = "terragrunt.auto.tfvars"
  if_exists = "overwrite"
  disable_signature = true
  contents = <<-EOF
name = "${local.common_vars.locals.name}"
EOF
}
```

The configuration has a few sections:

1.  The `terraform` block at the top uses the Gruntwork `sqs` module from [`package-messaging`](https://github.com/gruntwork-io/package-messaging/).

2.  The `include` block includes the configuration from the parent directories. This is how the remote `backend` block from the root `terragrunt.hcl` is included.

3.  The `locals` block reads the values from `common.hcl` in the root of the hierarchy, making them available for local reference.

4.  Finally, the `generate` block creates a file called `terragrunt.auto.tfvars`. Like the `backend.tf` file, this file will be generated alongside the rest of the `*.tf` files that Terragrunt downloads from the `sqs` module, making those inputs available for TFC to read when running `terraform` commands in the remote executor.

Any of the inputs needed by the module must be included in the generated `tfvars` file. In the configuration above, only
the `name` variable is specified. Most modules will need more configuration.

### Running Terragrunt

With all the pieces in place, you can run `terragrunt init` to initialize the workspace, if it isn’t already there, and then `terragrunt apply`, and watch as Terragrunt invokes Terraform, which executes the `plan` and `apply` stages on TFC, pausing in between to allow confirmation. Note that when running a `terragrunt apply-all`, Terragrunt adds the `-auto-approve` flag to Terraform to skip interactive approval. This means that with `apply-all`, there will be no confirmation step.

First, we run `terragrunt init`. Terragrunt generates the backend configuration, the `tfvars` file, and connects to the remote. Irrelevant details have been omitted from the output.
<!-- spell-checker: disable -->
```bash
$ terragrunt init
[terragrunt] 2020/05/15 14:36:54 Reading Terragrunt config file at <redacted>/infrastructure-live/dev/us-east-1/sqs/terragrunt.hcl
... [snip] ...
[terragrunt] 2020/05/15 14:36:55 Generated file <redacted>/infrastructure-live/dev/us-east-1/sqs/.terragrunt-cache/m6q2Wdn6A9TxoqahZZQpvrPqzAU/owCGC2BufzNDW7KyzOE-oDrwatg/modules/sqs/backend.tf.
[terragrunt] 2020/05/15 14:36:55 Generated file <redacted>/infrastructure-live/us-east-1/sqs/.terragrunt-cache/m6q2Wdn6A9TxoqahZZQpvrPqzAU/owCGC2BufzNDW7KyzOE-oDrwatg/modules/sqs/terragrunt.auto.tfvars.
[terragrunt] 2020/05/15 14:36:55 Running command: terraform init

Initializing the backend...
Backend configuration changed!

Terraform has detected that the configuration specified for the backend
has changed. Terraform will now check for existing state in the backends.

Successfully configured the backend "remote"! Terraform will automatically
use this backend unless the backend configuration changes.
```

Next, we run `terragrunt apply`:

```bash
$ terragrunt apply
Running apply in the remote backend. Output will stream here. Pressing Ctrl-C
will cancel the remote apply if it's still pending. If the apply started it
will stop streaming the logs, but will not stop the apply running remotely.

Preparing the remote apply...

To view this run in a browser, visit:
https://app.terraform.io/app/gruntwork-io/sqs-dev-us-east-1/runs/run-esQKC9ATKPnDywN1

Waiting for the plan to start...

Terraform v0.12.24
Configuring remote state backend...
Initializing Terraform configuration...
2020/05/15 21:41:31 [DEBUG] Using modified User-Agent: Terraform/0.12.24 TFC/ba6190e398
Refreshing Terraform state in-memory prior to plan...
The refreshed state will be used to calculate this plan, but will not be
persisted to local or remote state storage.

!------------------------------------------------------------------------
Terraform will perform the following actions:

  # aws_sqs_queue.queue will be created
  + resource "aws_sqs_queue" "queue" {
      + arn                               = (known after apply)
      + content_based_deduplication       = false
      + delay_seconds                     = 0
      + fifo_queue                        = false
      + id                                = (known after apply)
      + kms_data_key_reuse_period_seconds = 300
      + max_message_size                  = 262144
      + message_retention_seconds         = 345600
      + name                              = "example-name"
      + policy                            = (known after apply)
      + receive_wait_time_seconds         = 0
      + visibility_timeout_seconds        = 30
    }

Plan: 1 to add, 0 to change, 0 to destroy.
Do you want to perform these actions in workspace "sqs-dev-us-east-1"?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.

  Enter a value: <enter yes>

aws_sqs_queue.queue: Creating...
aws_sqs_queue.queue: Creation complete after 0s [id=https://sqs.us-east-1.amazonaws.com/0123456789012/example-name]
data.aws_iam_policy_document.limit_queue_access_by_ip_address: Refreshing state...

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.

Outputs:

queue_arn = arn:aws:sqs:us-east-1:0123456789012:example-name
queue_name = example-name
queue_url = https://sqs.us-east-1.amazonaws.com/0123456789012/example-name
```
<!-- spell-checker: enable -->
TFC runs a plan first, waits for confirmation, and then runs apply. The confirmation can be entered either on the command line or in the UI. Once complete, the results are visible in the TFC UI:

![Viewing the Terragrunt command results in the TFC UI](/img/guides/working-with-code/tfc/tfc-terragrunt-results.png)

Other commands, such as `destroy`, work in the same way.

### Summarizing Terragrunt and TFC/TFE compatibility

Using the combination of features above, you can effectively use Terragrunt with TFC or TFE as a remote backend.
Terragrunt can generate backend blocks and `tfvars` files. Commands like `terragrunt apply-all` will operate in the same
way as they do without TFC/TFE, calling each module dependency in order, and allowing for passing outputs between
modules. Workspaces must be created in advance so that you can set up credentials for access to the cloud.
