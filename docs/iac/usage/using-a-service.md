import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# Using a Service


## Prerequisites

- An AWS account with permissions to create the necessary resources
- An [AWS Identity and Access Management](https://aws.amazon.com/iam/) (IAM) user or role with permissions to create AWS IAM roles, Lambda functions, and Cloudwatch Log Groups
- [AWS Command Line Interface](https://aws.amazon.com/cli/) (AWS CLI) installed on your local machine
- [Terraform](https://www.terraform.io) installed on your local machine


## Create a service

Some words here...

### Create the basic file structure

Some words here...

<Tabs groupId="tool-choice">
<TabItem value="Terraform" label="Terraform" default>

For Terraform, create two paths — one which will contain the reference to the `terraform-aws-lambda` module and one which will contain a reference to the local module.

```bash
mkdir -p gw_module_guide/serverless-api/lambda
touch gw_module_guide/serverless-api/lambda/main.tf
touch gw_module_guide/serverless-api/lambda/variables.tf

mkdir -p gw_module_guide/example/<YOUR_REGION>
mkdir -p gw_module_guide/example/<YOUR_REGION>/main.tf
```

</TabItem>
<TabItem value="Terragrunt" label="Terragrunt" default>

For Terragrunt, we recommend that all re-usable infrastructure modules live in a directory called `_envcommon`. Create two paths — one which will contain the reference to the `terraform-aws-lambda` and one which will contain a reference to the local module.

```bash
mkdir -p _envcommon/serverless-api
touch _envcommon/serverless-api/lambda.hcl

mkdir -p gw_module_guide/example/<YOUR REGION>/example/serverless-api
touch gw_module_guide/example/<YOUR REGION>/example/serverless-api/terragrunt.hcl
```

</TabItem>
</Tabs>

### Create the reference to the Gruntwork service

Next, create the reference to the `lambbda` module in the Service Catalog...

<Tabs groupId="tool-choice">
<TabItem value="Terraform" label="Terraform" default>

Some text about Terraform about using a service...

```hcl title=gw_module_guide/serverless-api/lambda/main.tf
module "lambda" {
  source = "git::git@github.com/gruntwork-io/terraform-aws-service-catalog.git//modules/lambda?ref=v0.104.7"

  name        = var.name
  runtime     = var.runtime
  source_path = var.source_path
  run_in_vpc  = var.run_in_vpc
  handler     = var.handler
}
```

</TabItem>
<TabItem value="Terragrunt" label="Terragrunt" default>

Some text about Terragrunt about using a service...

```hcl title=_envcommon/serverless-api/lambda.hcl
terraform {
  source = "${local.source_base_url}?ref=v0.104.7"
}

locals {
  source_base_url = "git::git@github.com/gruntwork-io/terraform-aws-service-catalog.git//modules/lambda"
}
```

</TabItem>
</Tabs>

## Reference the service

Next, create the reference to the local module you just created...

<Tabs groupId="tool-choice">
<TabItem value="Terraform" label="Terraform" default>

```hcl title=gw_module_guide/example/<YOUR_REGION>/main.tf
module "my_lambda" {
  source = "../../serverless-api/lambda"

  name        = "gruntwork-lambda-module-guide"
  runtime     = "python3.9"
  source_path = "${path.module}/main.py"
  run_in_vpc  = false
  handler     = "main.lambda_handler"
}
```

</TabItem>
<TabItem value="Terragrunt" label="Terragrunt" default>

```hcl title=gw_module_guide/example/<YOUR_REGION>/example/serverless-api/terragrunt.hcl
terraform {
  source = "${local.source_base_url}?ref=v0.104.7"
}

include "root" {
  path = find_in_parent_folders()
}

include "envcommon" {
  path = "${dirname(find_in_parent_folders())}/_envcommon/serverless-api/lambda.hcl"
  merge_strategy = "deep"
  expose = true
}

inputs {
  name        = "gruntwork-lambda-module-guide"
  runtime     = "python3.9"
  source_path = "${path.module}/main.py"
  run_in_vpc  = false
  handler     = "main.lambda_handler"
}
```
</TabItem>
</Tabs>

## Plan and apply the service

Now that you have created a service...

### Plan

<Tabs groupId="tool-choice">
<TabItem value="Terraform" label="Terraform" default>

Run terraform plan...

```bash
terraform plan
```

</TabItem>
<TabItem value="Terragrunt" label="Terragrunt" default>

Run terragrunt plan...

```bash
terragrunt plan
```

</TabItem>
</Tabs>

### Apply

After running a `plan` and confirming that all expected resources show that they will be provisioned in the plan, you can run an `apply` to create the resources.

<Tabs groupId="tool-choice">
<TabItem value="Terraform" label="Terraform" default>

Run terraform apply

```bash
terraform apply
```

</TabItem>
<TabItem value="Terragrunt" label="Terragrunt" default>

Run terragrunt apply

```bash
terragrunt apply
```

</TabItem>
</Tabs>

## Testing

Use [Terratest](https://terratest.gruntwork.io)


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "e6c75064ffad2e29a5302fd0363e3939"
}
##DOCS-SOURCER-END -->
