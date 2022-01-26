# Deploy new infrastructure

## How to deploy Terraform code from the Service Catalog

There are three ways to use Terraform code from the Service Catalog:

1. [Using vanilla Terraform with the Service Catalog](#using-vanilla-terraform-with-the-service-catalog)
1. [Using Terragrunt with the Service Catalog](#using-terragrunt-with-the-service-catalog)
1. [Using Terraform Cloud or Terraform Enterprise with the Service Catalog](#using-terraform-cloud-or-terraform-enterprise-with-the-service-catalog)

### Using vanilla Terraform with the Service Catalog

Below are the instructions for using the vanilla `terraform` binary—that is, with no wrappers, extensions, or UI—to
deploy Terraform code from the Service Catalog. See
[examples/for-learning-and-testing](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-learning-and-testing) for working sample code.

1. **Find a service**. Browse the `modules` folder to find a service you wish to deploy. For this tutorial, we'll use
   the `vpc` service in [modules/networking/vpc](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/networking/vpc) as an example.

1. **Create a Terraform configuration**. Create a Terraform configuration file, such as `main.tf`.

1. **Configure the provider**. Inside of `main.tf`, configure the Terraform
   [providers](https://www.terraform.io/docs/providers/index.html) for your chosen service. For `vpc`, and for
   most of the services in this Service Catalog, you'll need to configure the [AWS
   provider](https://www.terraform.io/docs/providers/aws/index.html):

   ```hcl
   provider "aws" {
     # The AWS region in which all resources will be created
     region = "eu-west-1"

     # Only these AWS Account IDs may be operated on by this template
     allowed_account_ids = ["111122223333"]
   }
   ```

1. **Configure the backend**. You'll also want to configure the
   [backend](https://www.terraform.io/docs/backends/index.html) to use to store Terraform state:

   ```hcl
   terraform {
     # Configure S3 as a backend for storing Terraform state
     backend "s3" {
       bucket         = "<YOUR S3 BUCKET>"
       region         = "eu-west-1"
       key            = "<YOUR PATH>/terraform.tfstate"
       encrypt        = true
       dynamodb_table = "<YOUR DYNAMODB TABLE>"
     }
   }
   ```

1. **Use the service**. Now you can add the service to your code:

   ```hcl
   module "vpc" {
     # Make sure to replace <VERSION> in this URL with the latest terraform-aws-service-catalog release from
     # https://github.com/gruntwork-io/terraform-aws-service-catalog/releases
     source = "git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/networking/vpc?ref=<VERSION>"

     # Fill in the arguments for this service
     aws_region       = "eu-west-1"
     vpc_name         = "example-vpc"
     cidr_block       = "10.0.0.0/16"
     num_nat_gateways = 1
     create_flow_logs = false
   }
   ```

   Let's walk through the code above:

   1. **Module**. We pull in the code for the service using Terraform's native `module` keyword. For background info,
      see [How to create reusable infrastructure with Terraform
      modules](https://blog.gruntwork.io/how-to-create-reusable-infrastructure-with-terraform-modules-25526d65f73d).

   1. **Git / SSH URL**. We recommend setting the `source` URL to a Git URL with SSH authentication (see [module
      sources](https://www.terraform.io/docs/modules/sources.html) for other types of source URLs you can use). This
      will allow you to access the code in the Gruntwork Service Catalog using an SSH key for authentication, without
      having to hard-code credentials anywhere.

   1. **Versioned URL**. Note the `?ref=<VERSION>` at the end of the `source` URL. This parameter allows you to pull
      in a specific version of each service so that you don’t accidentally pull in potentially backwards incompatible
      code in the future. You should replace `<VERSION>` with the latest version from the [releases
      page](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases).

   1. **Arguments**. Below the `source` URL, you’ll need to pass in the arguments specific to that service. You can
      find all the required and optional variables defined in `variables.tf` of the service (e.g., check out
      the [`variables.tf` for `vpc`](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/networking/vpc/variables.tf)).

1. **Add outputs**. You may wish to add some output variables, perhaps in an `outputs.tf` file, that forward along
   some of the output variables from the service. You can find all the outputs defined in `outputs.tf` for the service
   (e.g., check out [`outputs.tf` for `vpc`](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/networking/vpc/outputs.tf)).

   ```hcl
   output "vpc_name" {
     description = "The VPC name"
     value       = module.vpc.vpc_name
   }

   output "vpc_id" {
     description = "The VPC ID"
     value       = module.vpc.vpc_id
   }

   output "vpc_cidr_block" {
     description = "The VPC CIDR block"
     value       = module.vpc.vpc_cidr_block
   }

   # ... Etc (see the service's outputs.tf for all available outputs) ...
   ```

1. **Authenticate**. You will need to authenticate to both AWS and GitHub:

   1. **AWS Authentication**: See [A Comprehensive Guide to Authenticating to AWS on the Command
      Line](https://blog.gruntwork.io/a-comprehensive-guide-to-authenticating-to-aws-on-the-command-line-63656a686799) for
      instructions.

   1. **GitHub Authentication**: All of Gruntwork's code lives in GitHub, and as most of the repos are private, you must
      authenticate to GitHub to be able to access the code. For Terraform, we recommend using Git / SSH URLs and using
      SSH keys for authentication. See [Link Your GitHub ID](/docs/intro/dev-portal/link-github-id)
      for instructions on linking your GitHub ID and gaining access.

1. **Deploy**. You can now deploy the service as follows:

   ```bash
   terraform init
   terraform apply
   ```

### Using Terragrunt with the Service Catalog

[Terragrunt](https://terragrunt.gruntwork.io/) is a thin, open source wrapper for Terraform that helps you keep your
code [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). Below are the instructions for using the `terragrunt`
binary to deploy Terraform code from the Service Catalog. See [examples/for-production](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-production) for working
sample code.

First, we need to do some one time setup. One of the ways Terragrunt helps you keep your code DRY is by allowing you to
define common configurations once in a root `terragrunt.hcl` file and to `include` those configurations in all child
`terragrunt.hcl` files. The folder structure might look something like this:

```
terragrunt.hcl              # root terragrunt.hcl
dev/
stage/
prod/
 └ eu-west-1/
    └ prod/
       └ vpc/
         └ terragrunt.hcl   # child terragrunt.hcl
```

Here's how you configure the root `terragrunt.hcl`:

1. **Configure the provider**. Inside of `terragrunt.hcl`, configure the Terraform
   [providers](https://www.terraform.io/docs/providers/index.html) for your chosen service. For `vpc`, and for
   most of the services in this Service Catalog, you'll need to configure the [AWS
   provider](https://www.terraform.io/docs/providers/aws/index.html). We'll do this using a
   [`generate`](https://terragrunt.gruntwork.io/docs/reference/config-blocks-and-attributes/#generate) block:

   ```hcl
   generate "provider" {
     path      = "provider.tf"
     if_exists = "overwrite_terragrunt"
     contents  = <<EOF
   provider "aws" {
     # The AWS region in which all resources will be created
     region = "eu-west-1"

     # Only these AWS Account IDs may be operated on by this template
     allowed_account_ids = ["111122223333"]
   }
   EOF
   }
   ```

1. **Configure the backend**. You'll also want to configure the
   [backend](https://www.terraform.io/docs/backends/index.html) to use to store Terraform state. We'll do this using
   a [`remote_state`](https://terragrunt.gruntwork.io/docs/reference/config-blocks-and-attributes/#remote_state) block:

   ```hcl
   remote_state {
     backend = "s3"
     config = {
       bucket         = "<YOUR S3 BUCKET>"
       region         = "eu-west-1"
       key            = "${path_relative_to_include()}/terraform.tfstate"
       encrypt        = true
       dynamodb_table = "<YOUR DYNAMODB TABLE>"
     }
     generate = {
       path      = "backend.tf"
       if_exists = "overwrite_terragrunt"
     }
   }
   ```

Now you can create child `terragrunt.hcl` files to deploy services as follows:

1. **Find a service**. Browse the `modules` folder to find a service you wish to deploy. For this tutorial, we'll use
   the `vpc` service in [modules/networking/vpc](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/networking/vpc) as an example.

1. **Create a child Terragrunt configuration**. Create a child Terragrunt configuration file called `terragrunt.hcl`.

1. **Include the root Terragrunt configuration**. Pull in all the settings from the root `terragrunt.hcl` by using an
   [`include`](https://terragrunt.gruntwork.io/docs/reference/config-blocks-and-attributes/#include) block:

   ```hcl
   include {
     path = find_in_parent_folders()
   }
   ```

1. **Use the service**. Now you can add the service to your child `terragrunt.hcl`:

   ```hcl
   terraform {
     # Make sure to replace <VERSION> in this URL with the latest terraform-aws-service-catalog release from
     # https://github.com/gruntwork-io/terraform-aws-service-catalog/releases
     source = "git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/networking/vpc?ref=<VERSION>"
   }

   # Fill in the arguments for this service
   inputs = {
     aws_region       = "eu-west-1"
     vpc_name         = "example-vpc"
     cidr_block       = "10.0.0.0/16"
     num_nat_gateways = 1
     create_flow_logs = false
   }
   ```

   Let's walk through the code above:

   1. **Module**. We pull in the code for the service using Terragrunt's support for [remote Terraform
      configurations](https://terragrunt.gruntwork.io/docs/features/keep-your-terraform-code-dry/).

   1. **Git / SSH URL**. We recommend setting the `source` URL to a Git URL with SSH authentication (see [module
      sources](https://www.terraform.io/docs/modules/sources.html) for other types of source URLs you can use). This
      will allow you to access the code in the Gruntwork Service Catalog using an SSH key for authentication, without
      having to hard-code credentials anywhere.

   1. **Versioned URL**. Note the `?ref=<VERSION>` at the end of the `source` URL. This parameter allows you to pull
      in a specific version of each service so that you don’t accidentally pull in potentially backwards incompatible
      code in the future. You should replace `<VERSION>` with the latest version from the [releases
      page](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases).

   1. **Arguments**. In the `inputs` block, you’ll need to pass in the arguments specific to that service. You can
      find all the required and optional variables defined in `variables.tf` of the service (e.g., check out
      the [`variables.tf` for `vpc`](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/networking/vpc/variables.tf)).

1. **Authenticate**. You will need to authenticate to both AWS and GitHub:

   1. **AWS Authentication**: See [A Comprehensive Guide to Authenticating to AWS on the Command
      Line](https://blog.gruntwork.io/a-comprehensive-guide-to-authenticating-to-aws-on-the-command-line-63656a686799) for
      instructions.

   1. **GitHub Authentication**: All of Gruntwork's code lives in GitHub, and as most of the repos are private, you must
      authenticate to GitHub to be able to access the code. For Terraform, we recommend using Git / SSH URLs and using
      SSH keys for authentication. See [How to get access to the Gruntwork Infrastructure as Code
      Library](/docs/intro/dev-portal/create-account)
      for instructions on setting up your SSH key.

1. **Deploy**. You can now deploy the service as follows:

   ```bash
   terragrunt apply
   ```

### Using Terraform Cloud or Terraform Enterprise with the Service Catalog

_(Documentation coming soon. If you need help with this ASAP, please contact [support@gruntwork.io](mailto:support@gruntwork.io).)_

## How to build machine images using Packer templates from the Service Catalog

Some of the services in the Gruntwork Service Catalog require you to build an [Amazon Machine Image
(AMI)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html) to install and configure the software that will
run on EC2 instances. These services define and manage the AMI as code using [Packer](https://www.packer.io/) templates.

For example, the [`eks-cluster`](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/eks-cluster) service defines an
[`eks-node-al2.pkr.hcl`](https://github.com/gruntwork-io/terraform-aws-service-catalog/blob/master/modules/services/eks-workers/eks-node-al2.pkr.hcl) Packer template that can be used to create an AMI
for the Kubernetes worker nodes. This Packer template uses the [EKS optimized
AMI](https://docs.aws.amazon.com/eks/latest/userguide/eks-optimized-ami.html) as its base, which already has Docker,
kubelet, and the AWS IAM Authenticator installed, and on top of that, it installs the other common software you'll
want on an EC2 instance in production, such as tools for gathering metrics, log aggregation, intrusion prevention,
and so on.

Below are instructions on how to build an AMI using these Packer templates. We'll be using the
[`eks-node-al2.pkr.hcl`](https://github.com/gruntwork-io/terraform-aws-service-catalog/blob/master/modules/services/eks-workers/eks-node-al2.pkr.hcl) Packer template as an example.

1. **Check out the code**. Run `git clone git@github.com:gruntwork-io/terraform-aws-service-catalog.git` to check out the code
   onto your own computer.

1. **(Optional) Make changes to the Packer template**. If you need to install custom software into your AMI—e.g., extra
   tools for monitoring or other server hardening tools required by your company—copy the Packer template into one of
   your own Git repos, update it accordingly, and make sure to commit the changes. Note that the Packer templates in
   the Gruntwork Service Catalog are designed to capture all the install steps in a single `shell` provisioner that
   uses the [Gruntwork Installer](https://github.com/gruntwork-io/gruntwork-installer) to install and configure the
   software in just a few lines of code. We intentionally designed the templates this way so you can easily copy the
   Packer template, add all the custom logic you need for your use cases, and only have a few lines of versioned
   Gruntwork code to maintain to pull in all the Service Catalog logic.

1. **Authenticate**. You will need to authenticate to both AWS and GitHub:

   1. **AWS Authentication**: See [A Comprehensive Guide to Authenticating to AWS on the Command
      Line](https://blog.gruntwork.io/a-comprehensive-guide-to-authenticating-to-aws-on-the-command-line-63656a686799) for
      instructions.

   1. **GitHub Authentication**: All of Gruntwork's code lives in GitHub, and as most of the repos are private, you must
      authenticate to GitHub to be able to access the code. For Packer, you must use a GitHub personal access
      token set as the environment variable `GITHUB_OAUTH_TOKEN` for authentication:

      ```bash
      export GITHUB_OAUTH_TOKEN=xxx
      ```

      See [How to get access to the Gruntwork Infrastructure as Code
      Library](/docs/intro/dev-portal/create-account)
      for instructions on setting up GitHub personal access token.

1. **Set variables**. Each Packer template defines variables you can set in a `variables` block at the top, such as
   what AWS region to use, what VPC to use for the build, what AWS accounts to share the AMI with, etc. We recommend
   setting these variables in a [JSON vars file](https://www.packer.io/docs/templates/user-variables/#from-a-file) and
   checking that file into version control so that you have a versioned history of exactly what settings you used when
   building each AMI. For example, here's what `eks-vars.json` might look like:

   ```json
   {
     "service_catalog_ref": "<VERSION>",
     "version_tag": "<TAG>"
   }
   ```

   This file defines two variables that are required by almost every Packer template in the Gruntwork Service Catalog:

   1. **Service Catalog Version**. You must replace `<VERSION>` with the version of the Service Catalog (from the
      [releases page](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases)) you wish to use for this build.
      Specifying a specific version allows you to know exactly what code you're using and ensures you don’t
      accidentally pull in potentially backwards incompatible code in future builds.

   1. **AMI Version**. You must replace `<TAG>` with the version number to use for this AMI. The Packer build will add
      a `version` tag to the AMI with this value, which provides a more human-friendly and readable version number
      than an AMI ID that you could use to find and sort your AMIs. You'll want to use a different `<TAG>` every time
      you run a Packer build.

1. **Build**. Now you can build an AMI as follows:

   ```bash
   packer build -var-file=eks-vars.json eks-node-al2.json
   ```

1. **Deploy**. At the end of the build, Packer will output the ID of your new AMI. Typically, you deploy this AMI by
   plugging the AMI ID into some Terraform code and using Terraform to deploy it: e.g., plugging in the EKS worker node
   AMI ID into the `cluster_instance_ami` input variable of the [`eks-cluster` Terraform
   module](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/eks-cluster).


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"39b464de3bd02d164cfc1f65c8087dcb"}
##DOCS-SOURCER-END -->
