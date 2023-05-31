# Composing your own Service

We offer a collection of [services](../overview/services.md#what-is-a-service) that piece together individual [modules](../overview/modules.md#what-is-a-module) for specific use cases such as EKS clusters and VPCs with public and private subnets. While we strive to make our service catalog as a complete as possible, you may need to create your own service to suit a specific use case or need for your company.

In this guide, you will learn how to create a service that uses the [AWS Lambda Function](../../reference/modules/terraform-aws-lambda/lambda/) and [AWS Application Load Balancer (ALB)](../../reference/modules/terraform-aws-load-balancer/alb/) modules from the Gruntwork Infrastructure as Code (IaC) Library.

## Prerequisites

- An AWS account with permissions to create the necessary resources
- An [AWS Identity and Access Management](https://aws.amazon.com/iam/) (IAM) user or role with permissions to create AWS IAM roles, Lambda functions, and ALBs
- [AWS Command Line Interface](https://aws.amazon.com/cli/) (AWS CLI) installed on your local machine
- [Terraform](https://www.terraform.io) installed on your local machine

## Creating the service

### Create the basic file structure

Create the basic file structure...

```bash
mkdir -p gw_service_guide/serverless-api/
touch gw_service_guide/serverless-api/main.tf
touch gw_service_guide/serverless-api/variables.tf
touch gw_service_guide/serverless-api/output.tf
```

### Defining the service

Define the service...

## Using the service

### Create the basic file structure

Create the basic file structure...

```bash
touch gw_service_guide/main.tf
```

### Define the reference

Reference the service...

## Plan and apply the service

Now that you have created a service and a reference to the service, you can run `plan` to see the infrastructure resources that will be provisioned by the module and `apply` to create the resources.


### Plan

Terraform will generate an execution plan using the `plan` action. The plan shows what resources Terraform determines need to be created or modified.

In your plan output, you should expect to see...
```bash
terraform plan
```

### Apply

After running a `plan` and confirming that all expected resources show that they will be provisioned in the plan, run an `apply` to create the resources.


Terraform will create resources when using the `apply` action. Like with the `plan` action, Terraform will determine which resources need to be created or modified. You should expect to see the same resources to be created when running `apply` that are shown when running `plan`.

```bash
terraform apply
```
