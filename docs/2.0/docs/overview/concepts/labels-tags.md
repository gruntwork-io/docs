---
# Display h2 to h5 headings
toc_min_heading_level: 2
toc_max_heading_level: 4
---

# Labels and Tags

Labels and tags are mechanisms to add metadata to the resources you provision in AWS. This data can be used by operators, developers, and finance teams in their daily activities to identify and locate workload-specific AWS resources. While a "label" is a functional name describing the name of a resource, [Tags](https://docs.aws.amazon.com/tag-editor/latest/userguide/tagging.html) are a first-class construct within AWS.

## Labels

A label is a consistent way to name resources in your AWS accounts. Consistent naming helps you to quickly identify resources for a specific application, the environment (e.g., `dev`, `stage`, `prod`) in which it is running, and specific portions of a workload (for example, if you have several services that operate together as a part of a large application).

### Label recommendations

Gruntwork recommends using a labeling scheme that includes the name of your organization, the environment in which a resource is running, the name of the associated application, a workload specific identifier (e.g., db, compute, etc.), and the region in which the resource is running, delineated by hyphens. For example, `${organization}-${environment}-${application}-${identifier}-${region}`.

Gruntwork recommends using shorthand where possible to avoid exceeding limits for resource names as they may very across AWS services. For example, the `gruntwork` organization name can be shortened to `gw`, the `production` environment can be shortened to `prd`, and the `us-west-2` AWS region can be shortened to `uw2`.


| Descriptor | Example | Rationale |
| ---------- | ------- | -------- |
| organization | `acme` | Assists with making globally unique resource names (e.g., S3 buckets) |
| environment | `prd` | The environment (dev, stage, prod, etc) in which the service is running |
| application | `coolapp` | Identify which application the resource belongs to |
| identifier | `compute` | Identify specific workloads within an application |
| region | `uw2` | The AWS region in which the service is running |

As an example, if Acme Co was running an application named `coolapp` on AWS EC2 in a production environment in us-west-2, we would label all EC2 instances `acme-prd-coolapp-compute-uw2`. Similarly if we were using AWS RDS as the database layer for the same application, we would label the associated RDS instance `acme-prd-coolapp-db-uw2`.

### Adding labels

The simplest way to create a label is using a `locals` block and combining the recommended attributes into a single attribute. For example, if you were creating an AWS S3 bucket using a Gruntwork module you could set up the following locals block. If you are using the [module defaults pattern](../../library/concepts/module-defaults.md), placing the name logic in the default module will ensure that all consumers of the module will use the same naming scheme automatically by default.

```hcl
terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/data-stores/s3-bucket?ref=v0.104.15"
}

include "root" {
  path = find_in_parent_folders()
}

locals {
    org = "gw"
    env = "prd"
    app = "coolapp"
    identifier = "s3"
    region = "uw2"

    name = "${local.org}-${local.env}-${local.app}-${local.identifier}-${local.region}"
}

inputs = {
  primary_bucket = local.name
}
```

All Gruntwork modules expose the ability to name a resource, for which you can reference the attribute created in the `locals` block. If you are developing your own modules, you will need to ensure that you are exposing the ability to pass a name into the module.

## Tags

Tags are key value pairs that act as metadata for organizing your AWS resources. Tags are often used by operators and developers to identify workload owners (e.g., a specific team), the application that a resource belongs to, the environment in which an application is running, and more. Finance teams often make use of tags to map cost and usage to specific Cost Centers or Business Units. For more information on tags, see the [official documentation](https://docs.aws.amazon.com/tag-editor/latest/userguide/tagging.html).

### Tag key recommendations

Gruntwork recommends prefixing all custom tag keys with the name of your organization. For example — the company acme co might start all of their tag keys with `acmeco`. This allows you to distinguish tags specific to your organization from tags that may be automatically applied by AWS.

### Recommended tags

The table below contains recommend tag keys and the description for the value you should give to the key. These keys are beneficial for both locating and filtering resources as an operator or developer, as well for [cost allocation tags](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html) which assist finance teams in associating costs with specific business units or applications.


| Key Name   | Example Key | Value Description |
| ---------- | ----------- | ----------- |
| Department | `acmeco:Department` | The organizational department to which the owning team belongs. Useful for rolling up costs per department in the organization. |
| Team | `acmeco:Team` | The team that owns the resource. Useful for tracking resources and cost per team. Useful when combined with department tags to see how much each team in a department is spending. |
| Environment | `acmeco:Environment` | The environment in which the resource is running. Useful for tracking spend per environment at the team, business unit, and organization levels. |
| Application | `acmeco:Application` | Track spend per application. Can be used in conjunction with environment tags to see the cost of running an application per environment. |
| CostCenter | `acmeco:CostCenter` | Monitor costs by cost center |
| BusinessUnit | `acmeco:BusinessUnit` | Monitor costs by business unit |
| Workload Type | `acmeco:WorkloadType` | Course grained type of service, e.g., compute, data storage, databases, etc. |

### Cost Allocation Tags

If you are using custom tags for your resources for the purposes of tracking cost and usage, you will need to activate the tags in the Billing and Cost Management console in AWS. For more information see [User-defined cost allocation tags](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/custom-tags.html) and [Activating user-defined cost allocation tags](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/activating-tags.html).

### Adding Tags

Tags are specified as code and deployed with your resources. In this section, you will learn how apply global and environment/resource-specific tags to your AWS resources.

#### Global tags

Tags can be enforced globally by specifying them in the provider block. When specifying tags in the provider, the tags are automatically added to all resources created using that provider. Note that tags set at the provider level can be overridden, which is covered in [overriding tags](#overriding-tags), allowing you to specify all required tags in the provider with default values, then consumers of the provider to override the values as needed.

#### AWS provider

The AWS Provider supports the [`default_tags`](https://registry.terraform.io/providers/hashicorp/aws/latest/docs#default_tags) parameter. This works with all AWS resources except `aws_autoscaling_group`. Here's an example:

```hcl
provider "aws" {
  default_tags {
    tags = {
      Environment = "test"
      Name        = "example"
    }
  }
}
```

#### Terragrunt provider

Terragrunt supports a [`generate`](https://terragrunt.gruntwork.io/docs/reference/config-blocks-and-attributes/#generate) block. Instead of hard-coding the `provider` block in every single module, you can ensure that every repo that uses Terragrunt has a single, central `generate` block used by everything in that repo. That `generate` block can include the `default_tags` you want. For example:

```hcl
generate "provider" {
  path      = "provider.tf"
  if_exists = "overwrite"
  contents = <<EOF
provider "aws" {
  default_tags {
    tags = {
      Environment = "test"
      Name        = "example"
    }
  }
}
EOF
}
```

### Overriding Tags

Tags set at the provider level are a great way to ensure that all resources are created with the same tags. However in some scenarios you may need to add specific tags to resources by either adding new tags (in addition to the default tags), or overriding the default tag values. In this section we will walk through options available for overriding tag values.

#### Per module

In some modules, you want to override these tags in a specific resource. You can do so by specifying the tags in the `provider` block as well as using the `tags` attribute on that resource. For example, here is how you can override the default tags in the `aws_vpc` resource:


```hcl
provider "aws" {
  default_tags {
    tags = {
      Environment = "test"
      Name        = "example"
    }
  }
}

resource "aws_vpc" "example" {
  # ..other configuration...
  tags = {
    Name = "example-vpc"
  }
}
```

Any tags within a resource override tags in `default_tags`. If you run `apply` on this code, then the VPC will end up with two tags, one from `default_tags`, and one overridden by the `aws_vpc` resource:

1. **Environment**: test
1. **Name**: example-vpc


#### Per environment

In some scenarios, you may need to override tags in different live environments. For example, let’s again assume you have `default_tags` defined as follows:

```hcl
provider "aws" {
  default_tags {
    tags = {
      Environment = "test"
      Name        = "example"
    }
  }
}
```

In your VPC module, instead of hard-coded a `tags` attribute to override these tags, you can take in tags as an input variable:
```hcl
variable "tags" {
  description = "Custom tags to set on the VPC"
  type        = map(string)
  default     = {}
}

resource "aws_vpc" "example" {
  # ..other configuration...
  tags = var.tags
}
```

Now you can optionally override the tags with different values in different environments. E.g., In stage, you might set:
```hcl
tags = {
  Name = "example-vpc-stage"
}
```

And in prod, you might set:

```hcl
tags = {
  Name = "example-vpc-prod"
}
```

#### Global overrides

Finally, you can use Terragrunt to override the tags on all resources globally. This way, you don't have to add a `tags` input variable to every single module and every single resource within that module.

```hcl
locals {
  # The default tags to apply in all environments
  default_tags = {
    Environment = "test"
    Name        = "example"
  }

  # Load a tags.yml file in any Terragrunt folder, or fallback to {} if none is found
  override_tags     = try(yamldecode(file("${get_terragrunt_dir()}/tags.yml")), {})

  # The final tags to apply to all resources are a merge between the default tags and override tags
  tags = merge(local.default_tags, local.override_tags)
}

generate "provider" {
  path      = "provider.tf"
  if_exists = "overwrite"
  contents = <<EOF
provider "aws" {
  default_tags {
    tags = ${jsonencode(local.tags)}
  }
}
EOF
}
```

This structure defines some default tags to apply to all modules, but it also allows each module to optionally define a `tags.yml` file with tags to override.

For example, in `stage/networking/vpc`, you might have a `terragrunt.hcl` that looks like this:

```hcl
# Include the root terragrunt.hcl config
include "root" {
  path = find_in_parent_folders()
}
```

And also in `stage/networking/vpc`, you might have an overrides file called `tags.yml` that looks like this:

```yaml
Name: vpc-stage
```

In `prod/networking/vpc/terragrunt.hcl`, you'd have the exact same contents as the stage one, but in `prod/networking/vpc/tags.yml`, you'd have:
```yaml
Name: vpc-prod
```

In other words, any of your Terragrunt modules can now include a `tags.yml` file to override the "default" config from the root `terragrunt.hcl`.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "bf987f7ab80f1edc8727b3054d8b9f6c"
}
##DOCS-SOURCER-END -->
