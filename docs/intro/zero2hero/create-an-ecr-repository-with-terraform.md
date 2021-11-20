# Create an ECR Repository with Terraform

## Prerequisites

- [Setup for the Course](../01_setup)
- [Create a Web App via Docker](../02_web_app_via_docker)

This is using basic [Terraform](https://terraform.io) skills, so you'll either need Terraform installed locally or use the container provided in [Setup for the Course](../01_setup). Make sure you are properly set up for AWS authentication.

## Create the terrafom code

tag::start-tag-name

### [main.tf](main.tf)

This file is basic setup. We require a minimum version of terraform, pull in the Terraform [AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs), and then set up a data block so that we can retrieve the AWS Account ID later on.

```bash
terraform {
  required_version = ">= 1.0.0"
}

provider "aws" {
  region = var.aws_region
}

data "aws_caller_identity" "current" {}
```

tag::end-tag-name

### [variables.tf](variables.tf)

We'll define just a few variables in this file, so that our code can be changed to suit our needs. We might want to launch resources in a different region or rename our application. Both variables have initial default values.

```bash
variable "aws_region" {
  description = "The AWS region in which to deploy the resources."
  type        = string
  default     = "us-west-2"
}

variable "app_name" {
  description = "The name of the application"
  type        = string
  default     = "zero2hero"
}
```

### [ecr.tf](ecr.tf)

Here is where the AWS ECR repositories are actually created. We'll create one for each of our three applications (`web`, `api`, and `db`) from the [previous section](../02_web_app_via_docker).

```bash
# AWS ECR Repository Terraform documentation: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecr_repository

resource "aws_ecr_repository" "web" {
  name = "${var.app_name}_web"
}

resource "aws_ecr_repository" "api" {
  name = "${var.app_name}_api"
}

resource "aws_ecr_repository" "db" {
  name = "${var.app_name}_db"
}
```

### [outputs.tf](outputs.tf)

Finally, we specify some outputs for convenience. We'll output the AWS Account ID, and then URLs for the three repositories and URLs for ease of accessing the AWS ECR console for each of the three repositories.

```bash
output "aws_account_id" {
  description = "AWS Account ID"
  value       = data.aws_caller_identity.current.account_id
}

output "api_repo_url" {
  description = "The repository URL for the api container"
  value       = aws_ecr_repository.api.repository_url
}

output "api_aws_ecr_console_url" {
  description = "A URL for the api AWS ECR Console"
  value       = format("https://console.aws.amazon.com/ecr/repositories/private/%s/%s_api?region=%s", data.aws_caller_identity.current.account_id, var.app_name, var.aws_region)
}

output "db_repo_url" {
  description = "The repository URL for the db container"
  value       = aws_ecr_repository.db.repository_url
}

output "db_aws_ecr_console_url" {
  description = "A URL for the db AWS ECR Console"
  value       = format("https://console.aws.amazon.com/ecr/repositories/private/%s/%s_db?region=%s", data.aws_caller_identity.current.account_id, var.app_name, var.aws_region)
}


output "web_repo_url" {
  description = "The repository URL for the web container"
  value       = aws_ecr_repository.web.repository_url
}

output "web_aws_ecr_console_url" {
  description = "A URL for the web AWS ECR Console"
  value       = format("https://console.aws.amazon.com/ecr/repositories/private/%s/%s_web?region=%s", data.aws_caller_identity.current.account_id, var.app_name, var.aws_region)
}
```

## Initialize terraform

```bash
terraform init
```

The output will look similar to this:

```
Initializing the backend...

Initializing provider plugins...
- Finding latest version of hashicorp/aws...
- Installing hashicorp/aws v3.56.0...
- Installed hashicorp/aws v3.56.0 (signed by HashiCorp)

Terraform has created a lock file .terraform.lock.hcl to record the provider
selections it made above. Include this file in your version control repository
so that Terraform can guarantee to make the same selections by default when
you run "terraform init" in the future.

Terraform has been successfully initialized!

You may now begin working with Terraform. Try running "terraform plan" to see
any changes that are required for your infrastructure. All Terraform commands
should now work.

If you ever set or change modules or backend configuration for Terraform,
rerun this command to reinitialize your working directory. If you forget, other
commands will detect it and remind you to do so if necessary.
```

## Run the terraform plan

```bash
terraform plan -out current.plan
```

The output will look similar to this:

````bash
Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # aws_ecr_repository.api will be created
  + resource "aws_ecr_repository" "api" {
      + arn                  = (known after apply)
      + id                   = (known after apply)
      + image_tag_mutability = "MUTABLE"
      + name                 = "zero2hero_api"
      + registry_id          = (known after apply)
      + repository_url       = (known after apply)
      + tags_all             = (known after apply)
    }

  # aws_ecr_repository.db will be created
  + resource "aws_ecr_repository" "db" {
      + arn                  = (known after apply)
      + id                   = (known after apply)
      + image_tag_mutability = "MUTABLE"
      + name                 = "zero2hero_db"
      + registry_id          = (known after apply)
      + repository_url       = (known after apply)
      + tags_all             = (known after apply)
    }

  # aws_ecr_repository.web will be created
  + resource "aws_ecr_repository" "web" {
      + arn                  = (known after apply)
      + id                   = (known after apply)
      + image_tag_mutability = "MUTABLE"
      + name                 = "zero2hero_web"
      + registry_id          = (known after apply)
      + repository_url       = (known after apply)
      + tags_all             = (known after apply)
    }

Plan: 3 to add, 0 to change, 0 to destroy.

Changes to Outputs:
  + api_aws_ecr_console_url = "https://console.aws.amazon.com/ecr/repositories/private/012345678910/zero2hero_api?region=us-west-2"
  + api_repo_url            = (known after apply)
  + aws_account_id          = "012345678910"
  + db_aws_ecr_console_url  = "https://console.aws.amazon.com/ecr/repositories/private/012345678910/zero2hero_db?region=us-west-2"
  + db_repo_url             = (known after apply)
  + web_aws_ecr_console_url = "https://console.aws.amazon.com/ecr/repositories/private/012345678910/zero2hero_web?region=us-west-2"
  + web_repo_url            = (known after apply)```
````

## Apply the plan

```bash
terraform apply current.plan
```

Output will look similar to this:

```bash
aws_ecr_repository.db: Creating...
aws_ecr_repository.web: Creating...
aws_ecr_repository.api: Creating...
aws_ecr_repository.web: Creation complete after 1s [id=zero2hero_web]
aws_ecr_repository.db: Creation complete after 1s [id=zero2hero_db]
aws_ecr_repository.api: Creation complete after 1s [id=zero2hero_api]

Apply complete! Resources: 3 added, 0 changed, 0 destroyed.

Outputs:

api_aws_ecr_console_url = "https://console.aws.amazon.com/ecr/repositories/private/012345678910/zero2hero_api?region=us-west-2"
api_repo_url = "012345678910.dkr.ecr.us-west-2.amazonaws.com/zero2hero_api"
aws_account_id = "012345678910"
db_aws_ecr_console_url = "https://console.aws.amazon.com/ecr/repositories/private/012345678910/zero2hero_db?region=us-west-2"
db_repo_url = "012345678910.dkr.ecr.us-west-2.amazonaws.com/zero2hero_db"
web_aws_ecr_console_url = "https://console.aws.amazon.com/ecr/repositories/private/012345678910/zero2hero_web?region=us-west-2"
web_repo_url = "012345678910.dkr.ecr.us-west-2.amazonaws.com/zero2hero_web"
```

## Push your code to the repositories

You can visit the AWS ECR Console by going to the `aws_ecr_console_url` URL as shown above (Your URL will be different). The instructions are duplicated below.

Let's first export your AWS Account ID listed above (`aws_account_id`) in the outputs:

```bash
export AWS_ACCOUNT_ID=<aws_account_id from terraform output>
```

Use the AWS CLI to log in to ECR with docker:

```bash
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.us-west-2.amazonaws.com
```

Build the Docker image (note this is referencing the directory in the [previous section](../02_web_app_via_docker)):

```bash
docker build -t zero2hero_web ../02_web_app_via_docker/src/web
```

After the build completes, tag your image so you can push the image to this repository:

```bash
docker tag zero2hero_web:latest ${AWS_ACCOUNT_ID}.dkr.ecr.us-west-2.amazonaws.com/zero2hero_web:latest
```

Run the following command to push this image to your newly created AWS repository:

```bash
docker push ${AWS_ACCOUNT_ID}.dkr.ecr.us-west-2.amazonaws.com/zero2hero_web:latest
```

Repeat the process for the API and the DB containers (you don't need to log in again):

```bash
# API

docker build -t zero2hero_api ../02_web_app_via_docker/src/api
docker tag zero2hero_api:latest ${AWS_ACCOUNT_ID}.dkr.ecr.us-west-2.amazonaws.com/zero2hero_api:latest
docker push ${AWS_ACCOUNT_ID}.dkr.ecr.us-west-2.amazonaws.com/zero2hero_:latest

# DB

docker build -t zero2hero_db ../02_db_app_via_docker/src/db
docker tag zero2hero_db:latest ${AWS_ACCOUNT_ID}.dkr.ecr.us-west-2.amazonaws.com/zero2hero_db:latest
docker push ${AWS_ACCOUNT_ID}.dkr.ecr.us-west-2.amazonaws.com/zero2hero_db:latest
```

---

[Table of Contents](../README.md)

Next Section: [Launch Web App to ECS Fargate](../04_web_app_to_ecs_fargate)
