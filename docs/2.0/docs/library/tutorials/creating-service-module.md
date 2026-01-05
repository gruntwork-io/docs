# Creating your own Service Module 

We offer a collection of [service modules](/2.0/docs/library/concepts/service-modules) that combine individual [modules](/2.0/docs/library/concepts/modules) to address specific use cases, such as provisioning EKS clusters or VPCs with public and private subnets. While we strive to make the service catalog as comprehensive as possible, you may need to create a custom service to meet a unique requirement for your company. 

In this guide, you will learn how to create a service that provisions a simple API using the [AWS Lambda Function](/reference/modules/terraform-aws-lambda/lambda/) and [API Gateway](/reference/modules/terraform-aws-lambda/lambda-http-api-gateway/) modules from the Gruntwork Infrastructure as Code (IaC) Library. 

## Prerequisites 

- An AWS account with permissions to create the necessary resources 
- An [AWS Identity and Access Management](https://aws.amazon.com/iam/) (IAM) user or role with permissions to create AWS IAM roles, Lambda functions, and API Gateways 
- [AWS Command Line Interface](https://aws.amazon.com/cli/) (AWS CLI) installed on your local machine 
- [Terraform](https://www.terraform.io) installed on your local machine 

## Create the service 

In this section, we will define a service that provisions an AWS Lambda Function and an HTTP API Gateway. The API Gateway will include a single proxy route that forwards requests to the Lambda function. This service will expose a simple set of inputs for configuring the Lambda function’s code and naming the provisioned resources. 

### Create the basic file structure 

Start by creating the basic file structure to contain the service definition. You will need three files: 

- `main.tf`: Contains the resource definitions. 
- `variables.tf`: Specifies the possible inputs to the module. 
- `outputs.tf`: Defines the outputs, which allow you to reference attributes from the resources created by the module. 

```bash
mkdir -p gw_service_guide/serverless-api/
touch gw_service_guide/serverless-api/main.tf
touch gw_service_guide/serverless-api/variables.tf
touch gw_service_guide/serverless-api/outputs.tf
```

### Define the service

Next, define the module blocks for the AWS Lambda function and HTTP API Gateway. Use the [Lambda function module](/reference/modules/terraform-aws-lambda/lambda/) for the Lambda function, and the [HTTP API Gateway module](/reference/modules/terraform-aws-lambda/lambda-http-api-gateway/) for the HTTP API Gateway. 

To simplify the configuration for this guide, we define a single route — `ANY /{proxy+}`. This configuration directs the API Gateway to forward all requests matching the path `/*` to the Lambda function. This approach is particularly effective when using an API framework within the Lambda function code to handle request routing. 

We will also configure some sensible defaults for the Lambda function, including: 
- Not running in a VPC 
- A maximum execution time of 30 seconds 
- 128MB of memory allocation 

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

Now that you’ve defined the resources to create, define the variables that users can pass into the module. These variables enable flexible configuration of the module. You can reference these values within the module using the `var` syntax, as shown in `gw_service_guide/serverless-api/main.tf`.

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

Next, define the outputs for the module. Outputs provide a convenient way to pass values between modules when building a service composed of multiple modules. For this guide, we will define a single output — the URL for the provisioned API. When developing a module for your company or team, you may need to include additional outputs. Refer to the Library Reference for the [Lambda function module](/reference/modules/terraform-aws-lambda/lambda/#reference) and the [HTTP API Gateway module](/reference/modules/terraform-aws-lambda/lambda-http-api-gateway/#reference) for a complete list of available outputs.

```hcl title=gw_service_guide/serverless-api/outputs.tf
output "api_endpoint" {
  description = "The URI of the API."
  value       = module.api.api_endpoint
}
```

## Use the service

Now that you have defined the service, you can reference it to provision the resources in AWS.

### Create the basic file structure

Start by creating the files needed to reference the service. In a typical setup, the module would reside in one repository, while the reference would exist in a separate repository. For this tutorial, we will simplify the structure by creating the reference in the top-level directory.

Create the following:

- A `main.tf` file to reference the module.
- A `/src` directory to store the Lambda function's source code.
- A `main.py` file inside the `/src` directory that contains the Lambda function code.

```bash
touch gw_service_guide/main.tf

mkdir -p gw_service_guide/src
touch gw_service_guide/src/main.py
```

### Define the reference

In `gw_service_guide/main.tf`, define a module block that references the relative path of the `serverless-api` service definition for the `source` attribute. In this example, the Lambda function is configured to use Python 3.9, with the source path pointing to the `/src` directory and the handler function set to `lambda_handler` in `gw_service_guide/src/main.py`.

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

Next, write a Python function that returns a status code of 200 and a response body stating "Hello from Gruntwork!". The response must adhere to the required format for API Gateway to successfully process and return the response. To learn more, refer to the [Lambda function response format documentation](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html#http-api-develop-integrations-lambda.response).

```python title=gw_service_guide/src/main.py
import json

def lambda_handler(event, context):
    body = {"message": "Hello from Gruntwork!"}
    return {"statusCode": 200, "body": json.dumps(body)}
```

## Plan and apply the service

Now that you have created a service and a reference to it, you can run `plan` to preview the infrastructure resources that will be provisioned by the module, and `apply` to create those resources.

### Init

Before running a `plan` or `apply`, you need to execute `terraform init`. This command performs a series of initialization steps to prepare the working directory for use with terraform.

```bash
terraform init
```

### Plan

Terraform generates an execution plan using the `plan` action. The plan displays the resources that terraform determines need to be created or modified.

```bash
terraform plan
```

In your plan output, you should expect to see 11 resources created, including an AWS Lambda function and its permissions, AWS API Gateway, AWS IAM role and policy, and AWS CloudWatch Log group.

### Apply

After running a `plan` and confirming that all expected resources will be provisioned, run an `apply` to create the resources.

Terraform creates resources when using the `apply` action. Similar to the `plan` action, terraform determines which resources need to be created or modified. You should expect the same resources to be created during `apply` as shown in the `plan` output.


```bash
terraform apply
```

You should see `Apply complete! Resources: 11 added, 0 changed, 0 destroyed.` when the `apply` process completes successfully.

## Curl the endpoint

Finally, use `curl` to confirm that the AWS API Gateway and Lambda function were created successfully. Use the `terraform output` command to retrieve the URL for the API that was provisioned, then curl the endpoint.

```bash
export API_ENDPOINT=$(terraform output -raw api_endpoint)
curl $API_ENDPOINT
```

You should receive `{"message": "Hello from Gruntwork!"}` as a response.

## What’s next

Now that you've defined your own service, consider how you would make this module available to others in your organization. At Gruntwork, we share services using a GitHub repository called `terraform-aws-service-catalog`. For more information, refer to the [Library Reference](/library/reference). Next, try adding tests to this service using [Terratest](https://terratest.gruntwork.io) to ensure resources are created successfully as changes are made to the service. Finally, think about what additional resources you might include in this module. For example, you could add authentication via AWS Cognito to the HTTP API Gateway or a DynamoDB table to store data.

