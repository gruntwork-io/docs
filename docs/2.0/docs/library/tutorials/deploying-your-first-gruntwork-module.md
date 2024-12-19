import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Deploying your first Gruntwork Module

The Terraform modules in the Gruntwork Infrastructure as Code (IaC) Library allow you to customize the provider and backend settings to fit your requirements. This flexibility enables you to use Gruntwork modules alongside existing modules with minimal configuration duplication.

In this guide, you will learn how to create an AWS Lambda function using a module from the Gruntwork IaC Library. You’ll also learn how to structure your IaC code to support multiple deployments. The same steps apply when using a service, as you can reference both modules and services in module blocks.

## Prerequisites

- An AWS account with permissions to create required resources
- An [AWS Identity and Access Management](https://aws.amazon.com/iam/) (IAM)  user or role with permissions to create AWS IAM roles, Lambda functions, and CloudWatch Log Groups
- [AWS Command Line Interface](https://aws.amazon.com/cli/) (AWS CLI) installed on your local machine
- [Terraform](https://www.terraform.io) installed on your local machine
- (Optional) [Terragrunt](https://terragrunt.gruntwork.io) installed on your local machine
- (Optional — required only for testing) [Go](https://go.dev) installed on your local machine

## Create a module

In this section, you will create a module to provision an AWS Lambda function using the [`terraform-aws-lambda`](/reference/modules/terraform-aws-lambda/lambda/) Gruntwork module. This module automatically creates the AWS IAM role and CloudWatch Log Group for the Lambda function. For more details about configuring the module, refer to the [Library Reference](/reference/modules/terraform-aws-lambda/lambda/#reference).

### Create the basic file structure

Start by setting up the basic file structure to include the module reference. In this guide, you’ll create a module named `serverless-api` that references the `terraform-aws-lambda` module. This setup allows you to define the module once and reuse it across multiple environments and regions.

In this guide, we will use `example` as the name of the environment. In a real-world environment, this might be `dev`, `staging`, `production`, or any other name. 

<Tabs groupId="tool-choice">
<TabItem value="Terraform" label="Terraform" default>

For Terraform, create two paths — one to reference the terraform-aws-lambda module and another to reference the local module (also known as the "wrapper module").

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

For Terragrunt, we recommend storing all reusable infrastructure modules in a directory called  `_envcommon`. Create two paths — one to reference the `terraform-aws-lambda` module and another to reference the local module.

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

Next, we'll create a reference to the Gruntwork module. Referencing modules in this way allows you to set default values for your organization. For example, the `terraform-aws-lambda` module exposes many variables, but in the module block below, we hardcode the value `run_in_vpc` to false. This ensures that anyone consuming this module will only create AWS Lambda functions that are not deployed in a VPC. For a complete list of configuration options for this module, see the [Library Reference](/reference/modules/terraform-aws-lambda/lambda/#reference).

<Tabs groupId="tool-choice">
<TabItem value="Terraform" label="Terraform" default>

Define a module block in `gw_module_guide/serverless-api/lambda/main.tf` using the [git url](https://developer.hashicorp.com/terraform/language/modules/sources#github) of the `terraform-aws-lambda` module for the `source` attribute.

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

Next, create a reference to the local module you just created. We recommend maintaining separate references for each environment and region. For example, if you are deploying this module to your development environment in the us-west-2 AWS region, create one reference. For deployment to the us-east-1 region, a separate reference ensures clarity and control. Maintaining these distinctions lets you roll out changes granularly across different environments and regions.

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

Next, copy the following Python code, which will serve as the entry point for the AWS Lambda function.

```python title=gw_module_guide/example/<YOUR_REGION>/src/main.py
def lambda_handler(event, context):
    return "Hello from Gruntwork!"
```

</TabItem>
<TabItem value="Terragrunt" label="Terragrunt" default>

Create a module block that uses the path to the local module as the source attribute and provides values for the required attributes of the module.

One benefit of this approach is the ability to increment the module version for specific environments and regions in a controlled manner. For example, if version v0.22.0 of the `terraform-aws-lambda` is released, you can update only the example environment in the us-west-2 AWS region to verify the upgrade works as expected before rolling it out to other environments or regions.

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

Copy the following Python code to use as the entry point for the AWS Lambda function.

```python title=gw_module_guide/example/<YOUR_REGION>/example/serverless-api/src/main.py
def lambda_handler(event, context):
    return "Hello from Gruntwork!"
```

</TabItem>
</Tabs>

## Plan and apply the module

Next, run a plan to preview the resources that will be created, followed by an apply to provision the resources in AWS.

:::note

For this guide, we’ll run `terraform plan` and `terraform apply`locally. When collaborating on infrastructure as code within a team or organization, we recommend running `terraform plan` and `terraform apply`  in your CI system in response to pull request creation, synchronization, and merge events. We purpose-built [Pipelines](/2.0/docs/pipelines/concepts/overview) to support this workflow. Refer to the Pipelines documentation to learn more.

### Init

Before running a `plan` or `apply`, you must run `init`. This command performs a series of initialization steps to prepare the working directory for use with Terraform.

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

Now that you have created a module and a reference specific to a single environment and AWS region, you can run a `plan` to preview the infrastructure resources that the module will provision.

<Tabs groupId="tool-choice">
<TabItem value="Terraform" label="Terraform" default>

Terraform will generate an execution plan using the `plan` command. The plan output will display the resources that Terraform determines need to be created or modified.

In the plan output, you should expect to see an AWS Lambda function, IAM role, and CloudWatch Log Group.
```bash
terraform plan
```

</TabItem>
<TabItem value="Terragrunt" label="Terragrunt" default>

Terragrunt will generate an execution plan using the `plan` command. The plan output will display the resources that Terragrunt determines need to be created or modified.

In the plan output, you should expect to see an AWS Lambda function, IAM role, IAM policy, IAM role policy attachment, and CloudWatch Log Group.
```bash
terragrunt plan
```

</TabItem>
</Tabs>

### Apply

After running a `plan` and confirming that all expected resources are listed in the plan, run an `apply` to create the resources. Terraform will provision resources using the `apply` command. Like the `plan` command, Terraform will determine which resources must be created or modified. You should expect to see the same resources created when running apply as those displayed during plan.

<Tabs groupId="tool-choice">
<TabItem value="Terraform" label="Terraform" default>

```bash
terraform apply
```

</TabItem>
</Tabs>

## Testing (Terraform only)

Now that you have a module defined, you can write a test to programmatically confirm that it creates the desired resources. This is particularly useful during module development to ensure changes do not break existing functionality.

To simplify testing for infrastructure as code, Gruntwork developed [Terratest](https://terratest.gruntwork.io). Terratest allows you to write tests in [Go](https://go.dev) with built-in functionality to deploy, validate, and undeploy infrastructure. All Gruntwork modules are tested using `Terratest` as part of the software development lifecycle (SDLC).

### Create the basic file structure

First, create the basic file structure required to write tests. We recommend organizing all tests in a `test` directory within your repository.

```bash
mkdir -p gw_module_guide/test
touch gw_module_guide/test/lambda_test.go

mkdir -p gw_module_guide/test/src
touch gw_module_guide/test/src/main.py
```

Copy the following Python function, which will be the entry point for the Lambda function created during the test.

```python title=gw_module_guide/test/src/main.py
def lambda_handler(event, context):
    return "Hello from Gruntwork!"
```

### Install dependencies

Next, initialize the Go module and install Terratest as a dependency.
<!-- spell-checker: disable -->
```bash
cd gw_module_guide/test
go mod init github.com/<YOUR GITHUB USERNAME>/gw_module_guide
go get github.com/gruntwork-io/terratest
go get github.com/stretchr/testify/assert
go get github.com/aws/aws-sdk-go/aws
go mod tidy
```
<!-- spell-checker: enable -->
### Write the test

Next, write the test. Define a single test called `TestLambdaCreated` that provisions an AWS Lambda function, verifies its creation, and then destroys the Lambda function. We’ll use built-in functionality in `Terratest` to generate random values and set variables that will be passed into Terraform.
<!-- spell-checker: disable -->
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
<!-- spell-checker: enable -->

In this test, we first generate data to ensure that the test run creates resources with unique names. Next, we define the Terraform `options`, specifying the folder where the Terraform module resides and setting the values for the input variables. Then, we configure a `terraform destroy` operation, which will always run, regardless of the test status. We proceed by running `terraform init` and `terraform apply` to create the resources. Finally, we validate that the name of the AWS Lambda function created matches the expected name.

### Run the test

Finally, run the test you wrote. From the test directory, execute the following command:
```bash
go test -v
```

You should expect to see `--- PASS: TestLambdaCreated` in the final log lines of the output from the test.

## What’s next

Now that you’ve used a Gruntwork module to provision resources, consider expanding this usage to make the Lambda function accessible via a URL using an [AWS API Gateway HTTP API](/reference/modules/terraform-aws-lambda/api-gateway-proxy/). Combining multiple modules into a single deliverable module is referred to as a [service](/2.0/docs/library/concepts/service-modules).

Finally, think about additional ways to test your module. Are there other success or failure scenarios you would want to include? To learn more about testing with Terratest, refer to the [official document](https://terratest.gruntwork.io/docs/getting-started/quick-start/).
