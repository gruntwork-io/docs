# Deploying your first module

[Modules](../overview/modules.md) allow you to define an interface to create one or many resources in the cloud or on-premise, similar to how in object oriented programming you can define a class that may have different attribute values across many instances.

This tutorial will teach you how to develop a Terraform module that deploys an AWS Lambda function. We will create the required file structure, define an AWS Lambda function and AWS IAM role as code, then plan and apply the resource in an AWS account. Then, we’ll verify the deployment by invoking the Lambda using the AWS CLI. Finally, we'll clean up the resources we create to avoid unexpected costs.

## Prerequisites
- An AWS account with permissions to create the necessary resources
- An [AWS Identity and Access Management](https://aws.amazon.com/iam/) (IAM) user or role with permissions to create AWS IAM roles and Lambda functions
- [AWS Command Line Interface](https://aws.amazon.com/cli/) (AWS CLI) installed on your local machine
- [Terraform](https://www.terraform.io) installed on your local machine

## Create the module

In this section you’ll create a Terraform module that can create an AWS Lambda function and IAM role. This module will include three files — `main.tf` which will contain the resource definitions, `variables.tf`, which specifies the possible inputs to the module, and `outputs.tf`, which specifies the values that can be used to pass references to attributes from the resources in the module.

This module could be referenced many times to create any number of AWS Lambda functions and IAM roles.


### Create a basic file structure
First, create the directories and files that will contain the Terraform configuration.

```bash
mkdir -p terraform-aws-gw-lambda-tutorial/modules/lambda
touch terraform-aws-gw-lambda-tutorial/modules/lambda/main.tf
touch terraform-aws-gw-lambda-tutorial/modules/lambda/variables.tf
touch terraform-aws-gw-lambda-tutorial/modules/lambda/outputs.tf
```

### Define the module resources

First, define the resources that should be created by the module. This is where you define resource level blocks provided by Terraform. For this module, we need an AWS Lambda function and an IAM role that will be used by the Lambda function.

Paste the following snippet in `terraform-aws-gw-lambda/modules/lambda/main.tf`.
```hcl title="terraform-aws-gw-lambda/modules/lambda/main.tf"
resource "aws_iam_role" "lambda_role" {
  name = "${var.lambda_name}-role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

data "archive_file" "zip" {
  type = "zip"

  source_file = var.source_file
  output_path = "${path.module}/${var.lambda_name}.zip"
}

resource "aws_lambda_function" "lambda" {
  function_name = var.lambda_name
  handler       = var.handler
  filename      = data.archive_file.zip.output_path
  runtime       = var.runtime
  memory_size   = var.memory_size
  timeout       = var.timeout

  role = aws_iam_role.lambda_role.arn
}
```

### Specify the variables for the module

Now that you’ve defined the resources you want to create, you need to list out all of the variables that you want to allow users to pass into the module. You can reference these values in the module using the `var` syntax, as visible in `terraform-aws-gw-lambda/modules/lambda/main.tf`.

Copy the following snippet into `terraform-aws-gw-lambda-tutorial/modules/lambda/variables.tf`.

```hcl title="terraform-aws-gw-lambda-tutorial/modules/lambda/variables.tf"
variable "lambda_name" {
  type        = string
  description = "Name that will be used for the AWS Lambda function"
}

variable "handler" {
  type        = string
  description = "The name of the handler function that will be called as the entrypoint of the lambda"
}

variable "source_file" {
  type        = string
  description = "The path to the source file to be deployed to lambda"
}

variable "runtime" {
  type        = string
  description = "The runtime of the Lambda. Options include go, python, ruby, etc."
}

variable "memory_size" {
  type        = number
  description = "The amount of memory, in MB, to give to the Lambda. Defaults to 128."
  default     = 128
}

variable "timeout" {
  type        = number
  description = "The amount of time, in seconds, that a lambda can execute before timing out. Defaults to 30."
  default     = 30
}
```

### Specify the outputs

Terraform allows you to specify values that the module will output. Outputs are convenient ways to pass values between modules when composing a service comprised of many modules.

Copy the following snippet into `terraform-aws-gw-lambda-tutorial/modules/lambda/outputs.tf`.
```hcl title="terraform-aws-gw-lambda-tutorial/modules/lambda/outputs.tf"
output "function_name" {
  value = aws_lambda_function.lambda.function_name
}
```

## Reference the module

Now that you have defined a module that creates an AWS Lambda function and IAM role, you can use the module to create the resources in AWS.

### Create the basic file structure

Now that you have the module defined, you need to create files which will reference the module. Typically, you would create a module in one repository, then reference it in a different repository. For this tutorial, we’ll just create the reference in the top level directory for the sake of simplicity.

Create a file called `main.tf`, which will contain a reference to the module, and a file called `main.py`, which will contain the Lambda function code.
```bash
touch terraform-aws-gw-lambda-tutorial/main.tf
touch terraform-aws-gw-lambda-tutorial/main.py
```

### Write the function code

Next, we’ll write a simple Python function that returns a string that will be used as the entrypoint of the AWS Lambda function. Terraform will create a zip file containing this file that will be uploaded to the Lambda function.

Copy the following to `terraform-aws-gw-lambda-tutorial/main.py`.

```py title="terraform-aws-gw-lambda-tutorial/main.py"
import json
from urllib.request import urlopen, Request

def lambda_handler(event, context):
    # Your GitHub username
    github_username = "%unknown%" 
    # The URL of our tutorial service, which returns a message and tracks your tutorial completion status
    endpoint_url = "%endpoint_url%"

    httprequest = Request(url, headers={'Accept': 'application/json'})

    response_object = {}

    with urlopen(httprequest) as response:
        response_object["statusCode"] = response.status
        response_object["headers"] = {}
        response_object["headers"]["Content-Type"] = "application/json"
        response_object["body"] = json.dumps(response.read().decode())

        return response_object
```

### Reference the module

Next, create a reference to the module you just created in `/modules/lambda/main.tf`. This code uses the `module` block from Terraform, which references the `/modules/lambda` directory using the `source` attribute. You can then specify values for the required variables specified in `/modules/lambdas/variables.tf`. Finally, we specify an output using the value of the `module.lambda.function_name` output created in `/modules/lambdas/outputs.tf`

```hcl title="terraform-aws-gw-lambda-tutorial/main.tf"
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 4.0.0"
    }
  }
}

module "lambda" {
  source = "./modules/lambda"

  lambda_name      = "gruntwork-lambda-tutorial"
  handler          = "main.lambda_handler"
  source_file      = "${path.module}/main.py"
  runtime          = "python3.9"
}


output "function_name" {
  value = module.lambda.function_name
}
```

## Plan and apply the module

### Run Terraform plan

Terraform will generate an execution plan using the `plan` action. The plan will show what resources Terraform determines need to be created or modified.

Running `terraform plan` is helpful when developing modules, to confirm that the Terraform code you are writing are using the correct syntax, and to confirm what resources will be created or modified when applying the module in your AWS account.


From the `terraform-aws-gw-lambda-tutorial` directory, run a plan to see what resources will be created.
```bash
terraform plan
```

Review the output of `terraform plan`, it should contain two resources — an AWS Lambda function and an AWS IAM role.


### Run Terraform apply

Terraform creates resources when using the `apply` action in a directory containing Terraform configuration files. Like with the `plan` command, Terraform will determine which resources need to be created or modified. You should expect the same resources to be created when running `apply` that are shown when running `plan`.

From the `terraform-aws-gw-lambda-tutorial` directory, run `terraform apply`. Terraform will pause to show you the resources it will create and prompt you to confirm resource creation.

```bash
terraform apply
```

Review the output to confirm it will only create an AWS Lambda function and IAM role. Then, enter `yes` to confirm resource creation. Terraform will create the resources in your AWS account. Once complete, you can invoke the AWS Lambda function following the steps in the next section.

## Invoke the created resource

Next, invoke the AWS Lambda function to verify it was created and is successfully executing the application code.

Use `terraform output` to retrieve the name of the AWS Lambda function you provisioned. This uses the outputs we added to the module in [create a module](./deploying-a-module.md#create-a-module) to retrieve the name of the Lambda function. Then, invoke the Lambda function directly using the AWS CLI, writing the response of the Lambda to a file called `lambda_output`.
```bash
#!/bin/bash
export FUNCTION_NAME=$(terraform output -raw function_name)
aws lambda invoke --function-name $FUNCTION_NAME --output json lambda_output
```

The lambda `invoke` command should return a JSON blob in response with the StatusCode of 200 and the ExecutedVersion of `$LATEST`.
```json
{
    "StatusCode": 200,
    "ExecutedVersion": "$LATEST"
}
```

Inspect the contents of the `lambda_output` file, you should see a string stating `Hello from Gruntwork!`.

## Clean up

When you’ve completed the tutorial, clean up the resources you created to avoid incurring unexpected costs.

First, execute the `terraform plan -destroy` command to show the AWS resources that will be destroyed.
```bash
terraform plan -destroy
```

Review the output, it should show two resources to be destroyed — an AWS Lambda function and IAM role.

Next, execute the `destroy` command.

```bash
terraform destroy
```

Finally, when prompted, enter `yes` to confirm the resource deletion. Terraform will begin destroying the resources created as part of this tutorial.


## What’s next

Now that you’ve developed and deployed your first Terraform module, try creating another module that leverages the module you just created. For example, make your Lambda function available via a URL using an [AWS API Gateway HTTP API](../../reference/modules/terraform-aws-lambda/api-gateway-proxy/) with an AWS Lambda integration. Then, write a test using [Terratest](https://terratest.gruntwork.io/) that confirms your module creates resources as you’d expect.

Finally, consider what other resources you would create to make your modules ready to use in production. For example, you would likely need to add [metrics](../../reference/modules/terraform-aws-monitoring/metrics/metrics.md) and [alerting](../../reference/modules/terraform-aws-monitoring/alarms/alarms.md).


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "076163b467b526b54185dc775d89f435"
}
##DOCS-SOURCER-END -->
