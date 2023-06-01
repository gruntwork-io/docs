# Composing your own Service

We offer a collection of [services](../overview/services.md#what-is-a-service) that piece together individual [modules](../overview/modules.md#what-is-a-module) for specific use cases such as EKS clusters and VPCs with public and private subnets. While we strive to make our service catalog as a complete as possible, you may need to create your own service to suit a specific use case or need for your company.

In this guide, you will learn how to create a service that uses the [AWS Lambda Function](../../reference/modules/terraform-aws-lambda/lambda/) and [API Gateway](../../reference/modules/terraform-aws-lambda/lambda-http-api-gateway/) modules from the Gruntwork Infrastructure as Code (IaC) Library.

## Prerequisites

- An AWS account with permissions to create the necessary resources
- An [AWS Identity and Access Management](https://aws.amazon.com/iam/) (IAM) user or role with permissions to create AWS IAM roles, Lambda functions, and API Gateways
- [AWS Command Line Interface](https://aws.amazon.com/cli/) (AWS CLI) installed on your local machine
- [Terraform](https://www.terraform.io) installed on your local machine

## Creating the service

### Create the basic file structure

Create the basic file structure...

```bash
mkdir -p gw_service_guide/serverless-api/
touch gw_service_guide/serverless-api/main.tf
touch gw_service_guide/serverless-api/variables.tf
touch gw_service_guide/serverless-api/outputs.tf
```

### Defining the service

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

```hcl title=gw_service_guide/serverless-api/outputs.tf
output "api_endpoint" {
  description = "The URI of the API. The domain_name input, if create_route53_entry is set, will route to this endpoint."
  value       = module.api.api_endpoint
}
```

## Using the service

### Create the basic file structure

Create the basic file structure...

```bash
touch gw_service_guide/main.tf

mkdir -p gw_service_guide/src
touch gw_service_guide/src/main.py
```

### Define the reference

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

```python title=gw_service_guide/src/main.py
import json

def lambda_handler(event, context):
    body = {"message": "Hello from Gruntwork!"}
    return {"statusCode": 200, "body": json.dumps(body)}
```

## Plan and apply the service

Now that you have created a service and a reference to the service, you can run `plan` to see the infrastructure resources that will be provisioned by the module and `apply` to create the resources.


### Plan

Terraform will generate an execution plan using the `plan` action. The plan shows what resources Terraform determines need to be created or modified.

In your plan output, you should expect to see 11 resources created -
```bash
terraform plan
```

### Apply

After running a `plan` and confirming that all expected resources show that they will be provisioned in the plan, run an `apply` to create the resources.


Terraform will create resources when using the `apply` action. Like with the `plan` action, Terraform will determine which resources need to be created or modified. You should expect to see the same resources to be created when running `apply` that are shown when running `plan`.


```bash
terraform apply
```
### Curl the endpoint

Finally, curl the endpoint to confirm the AWS API Gateway and Lambda function were created successfully.

```bash
export API_ENDPOINT=$(terraform output -raw api_endpoint)
curl $API_ENDPOINT
```

You should receive `{"message": "Hello from Gruntwork!"}` as a response.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "cf916ea6e68e9c19e2b3730a0a1c3037"
}
##DOCS-SOURCER-END -->
