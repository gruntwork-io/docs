# Make changes to your infrastructure

Now that your infrastructure is deployed, let's discuss how to make changes to it.

## Making changes to Terraform code

1. [Making changes to vanilla Terraform code](#making-changes-to-vanilla-terraform-code)
1. [Making changes to Terragrunt code](#making-changes-to-terragrunt-code)
1. [Making changes with Terraform Cloud or Terraform Enterprise](#making-changes-with-terraform-cloud-or-terraform-enterprise)

### Making changes to vanilla Terraform code

1. **(Optional) Update your configuration**: One type of change you could do in your Terraform code (in the `.tf`
   files) is to update the arguments you're passing to the service. For example, perhaps you update from one NAT
   Gateway:

   ```hcl
   module "vpc" {
     source = "git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/networking/vpc?ref=v0.0.1"

     # ... (other args ommitted for readability) ...
     num_nat_gateways = 1
   }
   ```

   To 3 NAT Gateways for high availability:

   ```hcl
   module "vpc" {
     source = "git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/networking/vpc?ref=v0.0.1"

     # ... (other args ommitted for readability) ...
     num_nat_gateways = 3
   }
   ```

1. **(Optional) Update the Service Catalog version**: Another type of change you might make is to update the version
   of the Service Catalog you're using. For example, perhaps you update from version `v0.0.1`:

   ```hcl
   module "vpc" {
     source = "git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/networking/vpc?ref=v0.0.1"

     # ... (other args omitted for readability) ...
   }
   ```

   To version `v0.0.2`:

   ```hcl
   module "vpc" {
     source = "git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/networking/vpc?ref=v0.0.2"

     # ... (other args omitted for readability) ...
   }
   ```

:::note

Whenever changing version numbers, make sure to read the [release
notes](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases), especially if it's a backwards
incompatible release (e.g., `v0.0.1` -> `v0.1.0`), to avoid errors and outages (see [maintenance and
versioning](/docs/reference/services/intro/overview/#maintenance-and-versioning) for details)!

:::

1. **Deploy**. Once you've made your changes, you can re-run `terraform apply` to deploy them:

   ```bash
   terraform apply
   ```

   Since Terraform [maintains state](https://blog.gruntwork.io/how-to-manage-terraform-state-28f5697e68fa), it will
   now update your infrastructure rather than deploying something new. As part of running `apply`, Terraform will show
   you the plan output, which will show you what's about to change before changing it. Make sure to scan the plan
   output carefully to catch potential issues, such as something important being deleted that shouldn't be (e.g., a
   database!).

### Making changes to Terragrunt code

1. **(Optional) Update your configuration**: One type of change you could do in your Terragrunt code (in the
   `terragrunt.hcl` files) is to update the arguments you're passing to the service. For example, perhaps you update
   from one NAT Gateway:

   ```hcl
   terraform {
     source = "git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/networking/vpc?ref=v0.0.1"
   }

   inputs = {
     # ... (other args omitted for readability) ...
     num_nat_gateways = 1
   }
   ```

   To 3 NAT Gateways for high availability:

   ```hcl
   terraform {
     source = "git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/networking/vpc?ref=v0.0.1"
   }

   inputs = {
     # ... (other args omitted for readability) ...
     num_nat_gateways = 3
   }
   ```

1. **(Optional) Update the Service Catalog version**: Another type of change you might make is to update the version
   of the Service Catalog you're using. For example, perhaps you update from version `v0.0.1`:

   ```hcl
   terraform {
     source = "git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/networking/vpc?ref=v0.0.1"
   }
   ```

   To version `v0.0.2`:

   ```hcl
   terraform {
     source = "git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/networking/vpc?ref=v0.0.2"
   }
   ```

:::note

Whenever changing version numbers, make sure to read the [release
notes](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases), especially if it's a backwards
incompatible release (e.g., `v0.0.1` -> `v0.1.0`), to avoid errors and outages (see [maintenance and
versioning](/docs/reference/services/intro/overview/#maintenance-and-versioning) for details)!

:::

1. **Deploy**. Once you've made your changes, you can re-run `terragrunt apply` to deploy them:

   ```bash
   terragrunt apply
   ```

   Since Terraform [maintains state](https://blog.gruntwork.io/how-to-manage-terraform-state-28f5697e68fa), it will
   now update your infrastructure rather than deploying something new. As part of running `apply`, Terraform will show
   you the plan output, which will show you what's about to change before changing it. Make sure to scan the plan
   output carefully to catch potential issues, such as something important being deleted that shouldn't be (e.g., a
   database!).

### Making changes with Terraform Cloud or Terraform Enterprise

_(Documentation coming soon. If you need help with this ASAP, please contact [support@gruntwork.io](mailto:support@gruntwork.io).)_

## Making changes to Packer templates

1. **(Optional) Update variables**: One type of change you might make is to update the variables you set in your vars
   file. In particular, you may wish to use a newer version of the Service Catalog for the build. For example, perhaps
   you update from version `v0.0.1`:

   ```json
   {
     "service_catalog_ref": "v0.0.1"
   }
   ```

   To version `v0.0.2`:

   ```json
   {
     "service_catalog_ref": "v0.0.2"
   }
   ```

   :::note

   Whenever changing version numbers, make sure to read the [release
   notes](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases), especially if it's a backwards incompatible
   release (e.g., `v0.0.1` -> `v0.1.0`), to avoid errors and outages (see [maintenance and
   versioning](/docs/reference/services/intro/overview/#maintenance-and-versioning) for details)!

   :::

1. **(Optional) Update your custom Packer template**: If you made a copy of one of of the Packer templates, you can
   of course also make updates to your own template.

1. **Build**. Once you've made your changes, you can re-run `packer build` to build a new AMI:

   ```bash
   packer build -var-file=eks-vars.json eks-node-al2.json
   ```

1. **Deploy**. Once you've built a new AMI, you'll need to [make changes to your Terraform code and deploy
   it](#making-changes-to-terraform-code).


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"bbf58d35c7af9d23efff17b3f3383068"}
##DOCS-SOURCER-END -->
