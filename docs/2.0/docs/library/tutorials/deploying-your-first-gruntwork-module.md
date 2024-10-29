import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Deploying your first Gruntwork Module

The Terraform modules in the Gruntwork Infrastructure as Code Library allow you to configure the `provider` and `backend` settings to suit your needs. This makes it possible to use Gruntwork modules alongside any existing modules you may have already developed, with minimal duplication of configuration.

In this guide, you will learn how to use a [module](/reference/library/concepts/modules) from the Gruntwork Infrastructure as Code (IaC) Library to create an AWS Lambda function. You will also learn how to organize your IaC code to be able to support many deployments. The same steps can be followed when using a [service](2.0/reference/library/concepts/services-modules), since both modules and services can be referenced in `module` blocks.

## Prerequisites

- An AWS account with permissions to create the necessary resources
- An [AWS Identity and Access Management](https://aws.amazon.com/iam/) (IAM) user or role with permissions to create AWS IAM roles, Lambda functions, and Cloudwatch Log Groups
- [AWS Command Line Interface](https://aws.amazon.com/cli/) (AWS CLI) installed on your local machine
- [Terraform](https://www.terraform.io) installed on your local machine
- (Optional) [Terragrunt](https://terragrunt.gruntwork.io) installed on your local machine
- (Optional — only required for testing) [Go](https://go.dev) installed on your local machine

## Create a module

In this section you’ll create a module that provisions an AWS Lambda Function using the [`terraform-aws-lambda`](/reference/library/modules/terraform-aws-lambda/lambda/) Gruntwork module. This module automatically creates the AWS IAM role and Cloudwatch Log Group for the Lambda function. For more information about the configuration of the module, refer to the [Library Reference](/reference/library/modules/terraform-aws-lambda/lambda/#reference).

### Create the basic file structure

First, create the basic file structure that will contain the module reference. In this guide, you will create a module named `serverless-api` which contains the reference to the `terraform-aws-lambda` module. This enables you to define the module once and utilize it in many environments and regions.

In this guide, we will use `example` as the name of the environment. In a real-world environment, this might be `dev`, `staging`, `production`, or any other name.

<Tabs groupId="tool-choice">
<TabItem value="Terraform" label="Terraform" default>

For Terraform, create two paths — one which will contain the reference to the `terraform-aws-lambda` module and one which will contain a reference to the local module (aka "wrapper module").

```bash
mkdir -p gw_module_guide/serverless-api/lambda
touch gw_module_guide/serverless-api/lambda/main.tf
touch gw_module_guide/serverless-api/lambda/variables.tf

mkdir -p gw_module_guide/example/<YOUR_REGION>
touch gw_module_guide/example/<YOUR_REGION>/main.tf

mkdir -p gw_module_guide/example/<YOUR_REGION>/src
touch gw_module_guide/example/<YOUR_REGION>/src/main.py
```

</TabItem>
<TabItem value="Terragrunt" label="Terragrunt" default>

For Terragrunt, we recommend that all re-usable infrastructure modules live in a directory called `_envcommon`. Create two paths — one which will contain the reference to the `terraform-aws-lambda` module and one which will contain a reference to the local module.

```bash
mkdir -p gw_module_guide/_envcommon/serverless-api
touch gw_module_guide/terragrunt.hcl
touch gw_module_guide/_envcommon/serverless-api/lambda.hcl

mkdir -p gw_module_guide/example/<YOUR REGION>/example/serverless-api
touch gw_module_guide/example/<YOUR REGION>/example/serverless-api/terragrunt.hcl

mkdir -p gw_module_guide/example/<YOUR REGION>/example/serverless-api/src
touch gw_module_guide/example/<YOUR REGION>/example/serverless-api/src/main.py
```

</TabItem>
</Tabs>

### Create the reference to the Gruntwork module

Next, we'll create a reference to the Gruntwork module. One of the benefits of referencing modules this way is the ability to set defaults for your organization. As an example — the `terraform-aws-lambda` exposes many variables but in the module block below, we are hard coding the value `run_in_vpc` to be `false`. This will ensure that anyone consuming this module will only create AWS Lambda functions that are not in a VPC. For a full list of configuration options for this module, refer to the [Library Reference](/reference/library/modules/terraform-aws-lambda/lambda/#reference).

<Tabs groupId="tool-choice">
<TabItem value="Terraform" label="Terraform" default>

Define a module block in `gw_module_guide/serverless-api/lambda/main.tf` using the [git url](https://developer.hashicorp.com/terraform/language/modules/sources#github) of the `terraform-aws-lambda` module for the `source` attribute.

```hcl title=gw_module_guide/serverless-api/lambda/main.tf
module "lambda" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-lambda.git//modules/lambda?ref=v0.21.9"

  name        = var.name
  runtime     = var.runtime
  source_path = var.source_path
  handler     = var.handler
  run_in_vpc  = false
  timeout     = 30
  memory_size = 128
}
```

Next, add the variables to the `variables.tf` file.

```hcl title=gw_module_guide/serverless-api/lambda/variables.tf
variable "name" {
  type        = string
  description = "Name that will be used for the AWS Lambda function"
}

variable "runtime" {
  type        = string
  description = "The runtime of the Lambda. Options include go, python, ruby, etc."
}

variable "source_path" {
  type        = string
  description = "The path to the directory containing the source to be deployed to lambda"
}

variable "handler" {
  type        = string
  description = "The name of the handler function that will be called as the entrypoint of the lambda"
}

```

</TabItem>
<TabItem value="Terragrunt" label="Terragrunt" default>

Define a module in `_envcommon/serverless-api/lambda.hcl` referencing the [git url](https://developer.hashicorp.com/terraform/language/modules/sources#github) of the `terraform-aws-lambda` module. For `terragrunt`, the source is defined in the `source` attribute of the `terraform` block.

```hcl title=gw_module_guide/_envcommon/serverless-api/lambda.hcl
terraform {
  source = "${local.source_base_url}?ref=v0.21.9"
}

locals {
  source_base_url = "git::git@github.com:gruntwork-io/terraform-aws-lambda.git//modules/lambda"
}

inputs = {
  run_in_vpc  = false
  timeout     = 30
  memory_size = 128
}
```

</TabItem>
</Tabs>

## Reference the module

Next, create the reference to the local module you just created. We recommend that you have separate references per environment and region. For example, if you were deploying this module to your development environment in the us-west-2 AWS region, you would create one reference. If you wanted to deploy to your development environment in the us-east-1 AWS region, you would create a separate reference. This allows you to granularly roll out changes across your environments and regions.

<Tabs groupId="tool-choice">
<TabItem value="Terraform" label="Terraform" default>

Create a module block that uses the path to the local module as the source attribute, supplying values for the required attributes of the module.

```hcl title=gw_module_guide/example/<YOUR_REGION>/main.tf
module "my_lambda" {
  source = "../../serverless-api/lambda"

  name        = "gruntwork-lambda-module-guide"
  runtime     = "python3.9"
  source_path = "${path.module}/src"
  handler     = "main.lambda_handler"
}
```

Next, copy the following python code which will be used as the entrypoint of the AWS Lambda function.

```python title=gw_module_guide/example/<YOUR_REGION>/src/main.py
def lambda_handler(event, context):
    return "Hello from Gruntwork!"
```

</TabItem>
<TabItem value="Terragrunt" label="Terragrunt" default>

Create a module block that uses the path to the local module as the source attribute, supplying values for the required attributes of the module.

One of the benefits of this approach is that you can increment the version of a module for a specific environment and region in a granular fashion. For example, if we were to ship a version v0.22.0 of the `terraform-aws-lambda` module, you could update just the `example` environment in the us-west-2 AWS region to ensure the upgrade goes as expected, then roll out to other environments or regions.

```hcl title=gw_module_guide/example/<YOUR_REGION>/example/serverless-api/terragrunt.hcl
terraform {
  source = "${include.envcommon.locals.source_base_url}?ref=v0.21.9"
}

generate "provider" {
  path = "provider.tf"
  if_exists = "overwrite_terragrunt"
  contents = <<EOF
provider "aws" {
  region = "us-west-2"
}
EOF
}

include "root" {
  path = find_in_parent_folders()
}

include "envcommon" {
  path = "${dirname(find_in_parent_folders())}/_envcommon/serverless-api/lambda.hcl"
  merge_strategy = "deep"
  expose = true
}

inputs = {
  name        = "gruntwork-lambda-module-guide"
  runtime     = "python3.9"
  source_path = "./src"
  handler     = "main.lambda_handler"
}
```

Next, copy the following python code which will be used as the entrypoint of the AWS Lambda function.

```python title=gw_module_guide/example/<YOUR_REGION>/example/serverless-api/src/main.py
def lambda_handler(event, context):
    return "Hello from Gruntwork!"
```

</TabItem>
</Tabs>

## Plan and apply the module

Next, we’ll run a plan to see the resources that will be created, then an apply to create the resources in AWS.

:::note

For this guide, we’ll run `terraform plan` and `terraform apply` locally. We recommend running `terraform plan` and `terraform apply` in your CI system in response to PR created, PR sync, and merge events when collaborating on infrastructure as code with a team or organization. We purpose built [Pipelines](/2.0/docs/pipelines/concepts/overview) with this workflow in mind, refer to the Pipelines documentation to learn more.

:::

### Init

Before you can run a `plan` or `apply`, you need to run an `init`, which performs a series of initialization steps to prepare the working directory for use with Terraform.

<Tabs groupId="tool-choice">
<TabItem value="Terraform" label="Terraform" default>

```bash
terraform init
```

</TabItem>
<TabItem value="Terragrunt" label="Terragrunt" default>

```bash
terragrunt init
```

</TabItem>
</Tabs>

### Plan

Now that you have created a module and a reference that is specific to a single environment and AWS region, you can run a `plan` to see the infrastructure resources that will be provisioned by the module.

<Tabs groupId="tool-choice">
<TabItem value="Terraform" label="Terraform" default>

Terraform will generate an execution plan using the `plan` action. The plan will show what resources Terraform determines need to be created or modified.

In your plan output, you should expect to see an AWS Lambda function, IAM role, and Cloudwatch Log group.
```bash
terraform plan
```

</TabItem>
<TabItem value="Terragrunt" label="Terragrunt" default>

Terragrunt will generate an execution plan using the `plan` action. The plan will show what resources Terragrunt determines need to be created or modified.

In your plan output, you should expect to see an AWS Lambda function, IAM role, IAM policy, IAM Role Policy Attachment, and Cloudwatch Log group.
```bash
terragrunt plan
```

</TabItem>
</Tabs>

### Apply

After running a `plan` and confirming that all expected resources show that they will be provisioned in the plan, run an `apply` to create the resources.

<Tabs groupId="tool-choice">
<TabItem value="Terraform" label="Terraform" default>

Terraform will create resources when using the `apply` action. Like with the `plan` action, Terraform will determine which resources need to be created or modified. You should expect to see the same resources to be created when running `apply` that are shown when running `plan`.

```bash
terraform apply
```

</TabItem>
<TabItem value="Terragrunt" label="Terragrunt" default>

Terragrunt will create resources when using the `apply` action. Like with the `plan` action, Terragrunt will determine which resources need to be created or modified. You should expect to see the same resources to be created when running `apply` that are shown when running `plan`.

```bash
terragrunt apply
```

</TabItem>
</Tabs>

## Testing (Terraform only)

Now that you have a module defined, you can write a test to programmatically confirm that it creates the desired resources. This is particularly helpful when developing modules to ensure that your changes will not break existing functionality.

To simplify writing tests for infrastructure as code, Gruntwork developed [Terratest](https://terratest.gruntwork.io). Terratest allows you to write tests in [Go](https://go.dev) with built-in functionality to deploy, validate, and undeploy infrastructure. All Gruntwork modules are tested using `Terratest` as part of the software development lifecycle (SDLC).

### Create the basic file structure

First, create the basic file structure required to write tests. We recommend putting all tests in the `test` directory in your repository.

```bash
mkdir -p gw_module_guide/test
touch gw_module_guide/test/lambda_test.go

mkdir -p gw_module_guide/test/src
touch gw_module_guide/test/src/main.py
```

Copy the following Python function, which will be used as the entrypoint for the Lambda function created during the test.

```python title=gw_module_guide/test/src/main.py
def lambda_handler(event, context):
    return "Hello from Gruntwork!"
```

### Install dependencies

Next, initialize the go module and install terratest as a dependency.

```bash
cd gw_module_guide/test
go mod init github.com/<YOUR GITHUB USERNAME>/gw_module_guide
go get github.com/gruntwork-io/terratest
go get github.com/stretchr/testify/assert
go get github.com/aws/aws-sdk-go/aws
go mod tidy
```

### Write the test

Next, we’ll write the test. Specify a single test called `TestLambdaCreated` that provisions an AWS Lambda function, confirms it is created, then destroys the Lambda function. We’ll use some of the built-in functionality in `Terratest` to generate random values and set variables that will be passed into Terraform.

```go title=gw_module_guide/test/lambda_test.go
package test

import (
    "os"
    "testing"

    "fmt"

    awsSDK "github.com/aws/aws-sdk-go/aws"
    "github.com/aws/aws-sdk-go/service/lambda"
    "github.com/gruntwork-io/terratest/modules/aws"
    "github.com/gruntwork-io/terratest/modules/random"
    "github.com/gruntwork-io/terratest/modules/terraform"
    "github.com/stretchr/testify/assert"
)

func TestLambdaCreated(t *testing.T) {
    // Run this test in parallel with all the others
    t.Parallel()

    // Unique ID to namespace resources
    uniqueId := random.UniqueId()
    // Generate a unique name for each Lambda so any tests running in parallel don't clash
    lambdaName := fmt.Sprintf("test-lambda-%s", uniqueId)

    // Get the cwd so we can point to the lambda handler
    path, err := os.Getwd()

    if err != nil {
        t.Errorf("Unable to retrieve working directory, received error %s", err)
    }

    srcPath := path + "/src"

    terraformOptions := &terraform.Options{
        // Where the Terraform code is located
        TerraformDir: "../serverless-api/lambda/",

        // Variables to pass to the Terraform code
        Vars: map[string]interface{}{
            "name":        lambdaName,
            "runtime":     "python3.9",
            "handler":     "main.lambda_handler",
            "source_path": srcPath,
        },
    }

    // Run 'terraform destroy' at the end of the test to clean up
    defer terraform.Destroy(t, terraformOptions)

    // Run 'terraform init' and 'terraform apply' to deploy the module
    terraform.InitAndApply(t, terraformOptions)

    // Create a lambda client so we can retrieve the function
    lambdaClient := aws.NewLambdaClient(t, "us-west-2")
    function, _ := lambdaClient.GetFunction(&lambda.GetFunctionInput{
        FunctionName: &lambdaName,
    })

    // Assert the function name is equal to what we set
    assert.Equal(t, lambdaName, awsSDK.StringValue(function.Configuration.FunctionName))
}
```

In this test, we first generate data so that the test run creates resources with unique names. Next, we create the Terraform `options`, which indicate the folder in which the Terraform module we want to test is located and sets the values that will be passed in for variables. Then, we set up a `terraform destroy` operation, which will always run regardless of the test status. Then, we run `terraform init` and `terraform apply` to create the resources. Finally, we validate that the name of the AWS Lambda function that was created matches the expected name.

### Run the test

Finally, run the test you wrote. From the `test` directory, run the following command:
```bash
go test -v
```

You should expect to see `--- PASS: TestLambdaCreated` in the final log lines of the output from the test.

## What’s next

Now that you’ve used a Gruntwork module to provision resources, consider how you would need to expand this usage to make the Lambda function available via a URL using an [AWS API Gateway HTTP API](/reference/library/modules/terraform-aws-lambda/api-gateway-proxy/). We refer to combining multiple modules into a single deliverable module as a [service](/2.0/docs/library/concepts/service-modules).

Finally, consider how else you might test your module. Are there additional success or failure cases you would want to add? To learn more about testing using Terratest, refer to the [official document](https://terratest.gruntwork.io/docs/getting-started/quick-start/).
