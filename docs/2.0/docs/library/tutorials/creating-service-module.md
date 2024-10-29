# Creating your own Service Module

We offer a collection of [service modules](/2.0/docs/library/concepts/service-modules) that piece together individual [modules](/2.0/docs/library/concepts/modules) for specific use cases such as EKS clusters and VPCs with public and private subnets. While we strive to make our service catalog as a complete as possible, you may need to create your own service to suit a specific use case or need for your company.

In this guide, you will learn how to create a service that provisions a simple API using the [AWS Lambda Function](/reference/modules/terraform-aws-lambda/lambda/) and [API Gateway](/reference/modules/terraform-aws-lambda/lambda-http-api-gateway/) modules from the Gruntwork Infrastructure as Code (IaC) Library.

## Prerequisites

- An AWS account with permissions to create the necessary resources
- An [AWS Identity and Access Management](https://aws.amazon.com/iam/) (IAM) user or role with permissions to create AWS IAM roles, Lambda functions, and API Gateways
- [AWS Command Line Interface](https://aws.amazon.com/cli/) (AWS CLI) installed on your local machine
- [Terraform](https://www.terraform.io) installed on your local machine

## Create the service

In this section we’ll define a service that provisions an AWS Lambda Function and HTTP API Gateway, with a single proxy route on the API Gateway pointing to the Lambda. This service exposes a simple set of inputs for configuring the Lambda code configuration and name of the provisioned resources.

### Create the basic file structure

First, create the basic file structure that will contain the service definition. We’ll create three files — `main.tf` which will contain the resource definitions, `variables.tf`, which specifies the possible inputs to the module, and `outputs.tf`, which specifies the values that can be used to pass references to attributes from the resources in the module.

```bash
mkdir -p gw_service_guide/serverless-api/
touch gw_service_guide/serverless-api/main.tf
touch gw_service_guide/serverless-api/variables.tf
touch gw_service_guide/serverless-api/outputs.tf
```

### Define the service

Next, define the module blocks for the AWS Lambda function and HTTP API Gateway. For the Lambda, we will use the [Lambda function module](../../../../reference/modules/terraform-aws-lambda/lambda/), for the HTTP API Gateway we will use the [HTTP API Gateway module](../../../../reference/modules/terraform-aws-lambda/lambda-http-api-gateway/).

To keep the configuration simple for this guide, we define a single route — `ANY /{proxy+}`. This tells the API Gateway to send any requests matching the path `/*` to the Lambda. This is an effective approach if you are using an API framework in the Lambda function code that can handle request routing. We will also set some defaults for the Lambda to not run in a VPC, have a maximum run time of 30 seconds, and 128MB of memory.

```hcl title=gw_service_guide/serverless-api/main.tf
module "lambda" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-lambda.git//modules/lambda?ref=v0.21.9"
  name        = "${var.name}-name"
  runtime     = var.lambda_runtime
  source_path = var.lambda_source_path
  handler     = var.lambda_handler
  run_in_vpc  = false
  timeout     = 30
  memory_size = 128
}

module "api" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-lambda.git//modules/lambda-http-api-gateway?ref=v0.21.9"

  name = "${var.name}-api-gw"
  route_config = {
    "ANY /{proxy+}": {
        lambda_function_arn = module.lambda.function_arn
    }
  }
}
```

### Specify the variables

Now that you’ve defined the resources you want to create, you need to define the variables that you want to allow users to pass into the module. You can reference these values in the module using the var syntax, as visible in `gw_service_guide/serverless-api/main.tf`.

```hcl title=gw_service_guide/serverless-api/variables.tf
variable "name" {
  description = "The name used to namespace all the resources, including the API Gateway and Lambda functions."
  type        = string
}

variable "lambda_runtime" {
  type        = string
  description = "The runtime of the Lambda. Options include go, python, ruby, etc."
}

variable "lambda_source_path" {
  type        = string
  description = "The path to the directory containing the source to be deployed to lambda"
}

variable "lambda_handler" {
  type        = string
  description = "The name of the handler function that will be called as the entrypoint of the lambda"
}
```

### Specify the outputs

Next, define the outputs from the module. Outputs are convenient ways to pass values between modules when composing a service comprised of many modules. For this guide, we only want a single output — the URL for the API we are provisioning. You may want to define more outputs when developing a module for your company or team. Refer to the Library Reference for the [Lambda function module](/reference/modules/terraform-aws-lambda/lambda/#reference) and [HTTP API Gateway module](/reference/modules/terraform-aws-lambda/lambda-http-api-gateway/#reference) for a full list of outputs available.

```hcl title=gw_service_guide/serverless-api/outputs.tf
output "api_endpoint" {
  description = "The URI of the API."
  value       = module.api.api_endpoint
}
```

## Use the service

Now that you have defined the service, you can reference the service to create the resources in AWS.

### Create the basic file structure

First, create the files that will contain the reference to the service. Typically, you would create a module in one repository, then reference it in a different repository. For this tutorial, we’ll just create the reference in the top level directory for the sake of simplicity.

Create a file called `main.tf`, which will contain a reference to the module, a directory called `/src`, which will contain all source code for the Lambda function, and a file called `main.py`, which will contain the Lambda function code.

```bash
touch gw_service_guide/main.tf

mkdir -p gw_service_guide/src
touch gw_service_guide/src/main.py
```

### Define the reference

Define a module block in `gw_service_guide/main.tf` that references the relative location of the `serverless-api` service definition for the `source` attribute. In this guide, we are defining a Lambda function running Python 3.9, with the source path pointing to our `/src` directory, and the handler function `lambda_handler` defined in `gw_service_guide/src/main.py`.

```hcl title=gw_service_guide/main.tf
module "serverless_api" {
  source = "./serverless-api/"

  name               = "gw-guide-serverless-api"
  lambda_runtime     = "python3.9"
  lambda_source_path = "${path.module}/src"
  lambda_handler     = "main.lambda_handler"
}

output "api_endpoint" {
  value = module.serverless_api.api_endpoint
}
```

Next, write a Python function that returns a status code of 200 and a response body stating "Hello from Gruntwork!". The response format is required for API Gateway to successfully return the response, to learn more refer to the [Lambda function response format documentation](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html#http-api-develop-integrations-lambda.response).

```python title=gw_service_guide/src/main.py
import json

def lambda_handler(event, context):
    body = {"message": "Hello from Gruntwork!"}
    return {"statusCode": 200, "body": json.dumps(body)}
```

## Plan and apply the service

Now that you have created a service and a reference to the service, you can run `plan` to see the infrastructure resources that will be provisioned by the module and `apply` to create the resources.

### Init

Before you can run a `plan` or `apply`, you need to run `terraform init`, which performs a series of initialization steps to prepare the working directory for use with Terraform.

```bash
terraform init
```

### Plan

Terraform will generate an execution plan using the `plan` action. The plan shows what resources Terraform determines need to be created or modified.

```bash
terraform plan
```

In your plan output, you should expect to see 11 resources created, including an AWS Lambda function and permissions, AWS API Gateway, AWS IAM role and policy, and AWS Cloudwatch Log group.

### Apply

After running a `plan` and confirming that all expected resources show that they will be provisioned in the plan, run an `apply` to create the resources.


Terraform will create resources when using the `apply` action. Like with the `plan` action, Terraform will determine which resources need to be created or modified. You should expect to see the same resources to be created when running `apply` that are shown when running `plan`.


```bash
terraform apply
```

You should see `Apply complete! Resources: 11 added, 0 changed, 0 destroyed.` when the `apply` has completed successfully.

## Curl the endpoint

Finally, curl the endpoint to confirm the AWS API Gateway and Lambda function were created successfully. Use `terraform output` to get the URL for the API that was provisioned, then curl the endpoint.

```bash
export API_ENDPOINT=$(terraform output -raw api_endpoint)
curl $API_ENDPOINT
```

You should receive `{"message": "Hello from Gruntwork!"}` as a response.

## What’s next

Now that you've defined your own service, consider how you would make this module available to others in your organization. At Gruntwork, we share services using a Github repository called `terraform-aws-service-catalog`, for more information refer to the [Library Reference](/2.0/reference/library/). Further, try adding tests to this service using [Terratest](https://terratest.gruntwork.io) to ensure that resources are created successfully as changes are made to the service. Finally, consider what other resources you might add to this module. For example, adding authentication via AWS Cognito to the HTTP API Gateway or a DynamoDB table to store data.
