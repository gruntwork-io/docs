---
# Display h2 to h5 headings
toc_min_heading_level: 2
toc_max_heading_level: 4
---

# Labels and Tags

Labels and tags provide a way to add metadata to AWS resources, enabling operators, developers, and finance teams to identify and manage workload-specific resources efficiently. While labels function as descriptive names for resources, [tags](https://docs.aws.amazon.com/tag-editor/latest/userguide/tagging.html) are a native AWS feature used for resource metadata.

## Labels

Labels are used to consistently name resources across your AWS accounts. A standardized naming convention allows for quick identification of resources by application, environment (e.g., `dev`, `stage`, `prod`), and workload-specific attributes (e.g., databases, compute instances).

### Label recommendations

Gruntwork advises adopting a labeling scheme that includes key attributes such as the organization name, environment, application name, workload-specific identifier, and AWS region. These attributes should be separated by hyphens for clarity. For example, `${organization}-${environment}-${application}-${identifier}-${region}`.

To avoid exceeding AWS resource name length limits, use shorthand where appropriate and easily understood. For instance, `gruntwork` can be abbreviated to `gw`, `production` to `prd`, and `us-west-2` to `uw2`.

| Descriptor | Example | Rationale |
| ---------- | ------- | -------- |
| organization | `acme` | Helps create globally unique resource names (e.g., for S3 buckets) |
| environment | `prd` | Identifies the environment in which the service is running (e.g., `dev`) |
| application | `coolapp` | Indicates which application the resource is associated with  |
| identifier | `compute` | Distinguishes specific workloads within an application |
| region | `uw2` | Specifies the AWS region where the service is deployed |

For example, if Acme Co runs an application named `coolapp` on AWS EC2 in a production environment in `us-west-2`, all EC2 instances would be labeled as `acme-prd-coolapp-compute-uw2`. Similarly, if AWS RDS is used for the application's database layer, the RDS instance would be labeled `acme-prd-coolapp-db-uw2`.


### Adding labels

The most straightforward way to create a label is by using a `locals` block to combine the recommended attributes into a single attribute. For example, when creating an AWS S3 bucket with a Gruntwork module, you can define the following `locals` block. If the [module defaults pattern](/2.0/docs/library/concepts/module-defaults) is used, placing the naming logic in the default module ensures consistent naming across all consumers of the module by default.


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

All Gruntwork modules allow resources to be named, referencing the attribute created in the `locals` block. If you are developing your own modules, ensure that the module exposes the ability to pass a name as an input.

## Tags

Tags are key-value pairs that serve as metadata for organizing AWS resources. They are commonly used by operators and developers to identify workload owners (e.g., specific teams), the associated application, and the environment in which an application is running. Finance teams frequently leverage tags to map costs and usage to specific cost centers or business units. For additional information on tags, refer to the [official AWS documentation](https://docs.aws.amazon.com/tag-editor/latest/userguide/tagging.html).


### Tag key recommendations

Gruntwork advises prefixing all custom tag keys with your organization’s name. For instance, the company Acme Co might prefix all their tag keys with `acmeco`, enabling clear distinction between organizational tags and AWS-generated tags.

### Recommended tags

The following table outlines recommended tag keys along with descriptions of their intended values. These tags assist in locating and filtering resources for operational or developmental purposes and support [cost allocation tags](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html), which help finance teams attribute costs to specific business units or applications.


| Key Name        | Example Key          | Value Description                                                                                      |
|------------------|----------------------|--------------------------------------------------------------------------------------------------------|
| Department       | `acmeco:Department` | The organizational department owning the resource. Useful for aggregating costs by department.         |
| Team             | `acmeco:Team`       | The team responsible for the resource. Helps track resource costs per team and within departments.     |
| Environment      | `acmeco:Environment`| The environment where the resource is deployed. Useful for tracking spend across environments.         |
| Application      | `acmeco:Application`| Identifies the application associated with the resource. Assists in cost tracking per application.     |
| CostCenter       | `acmeco:CostCenter` | Monitors costs by cost center.                                                                         |
| BusinessUnit     | `acmeco:BusinessUnit`| Tracks costs by business unit.                                                                        |
| Workload Type    | `acmeco:WorkloadType`| Coarse-grained service type (e.g., compute, storage, databases).                                      |

### Cost allocation tags

When using custom tags for cost and usage tracking, you must activate them in the AWS Billing and Cost Management console. For more details, refer to [User-defined cost allocation tags](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/custom-tags.html) and [Activating user-defined cost allocation tags](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/activating-tags.html).

### Adding tags

Tags are defined in your code and deployed alongside your AWS resources. Below are the approaches for applying global and environment/resource-specific tags.

#### Global tags

Global tags can be enforced by specifying them in the provider block. These tags are automatically applied to all resources created using the provider. Tags set at the provider level can be overridden, enabling you to define required tags with default values while allowing resource-specific customization as needed. For more information, see [overriding tags](#overriding-tags).

#### AWS provider

The AWS provider supports the [`default_tags`](https://registry.terraform.io/providers/hashicorp/aws/latest/docs#default_tags) parameter, which applies tags to most AWS resources, excluding `aws_autoscaling_group`. Below is an example:

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

Terragrunt supports the use of a [`generate`](https://terragrunt.gruntwork.io/docs/reference/config-blocks-and-attributes/#generate) block. Instead of hard-coding the `provider` block in every module, you can centralize the `generate` block to ensure consistency across all repositories using Terragrunt. This single, centralized `generate` block can include the `default_tags` to be applied universally. Here’s an example:


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

### Overriding tags

Setting tags at the provider level is an effective way to apply consistent tags to all resources. However, there are scenarios where additional tags or overrides to default tag values may be required for specific resources. This section outlines the options for overriding tag values.

#### Per module

In some cases, you may need to override tags for a specific resource within a module. This can be achieved by defining the tags in the `provider` block and using the `tags` attribute directly on the resource. For instance, here’s an example of overriding the default tags for an `aws_vpc` resource:


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

Any tags specified within a resource will override tags defined in `default_tags`. When you run `apply` on this configuration, the VPC will have two tags—one inherited from `default_tags` and another overridden by the `aws_vpc` resource:

1. **Environment**: test  
1. **Name**: example-vpc  

#### Per environment

In certain situations, tags may need to be overridden for different live environments. For instance, consider the following `default_tags` configuration:


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

Terragrunt also allows you to override tags globally across all resources. This approach eliminates the need to add a `tags` input variable to every module and each resource within those modules.

```hcl
locals {
  # The default tags to apply in all environments
  default_tags = {
    Environment = "test"
    Name        = "example"
  }

  # Load a tags.yml file from any Terragrunt folder, or use an empty map `{}` if no file is found
  override_tags = try(yamldecode(file("${get_terragrunt_dir()}/tags.yml")), {})
  
  # Merge the default tags with the override tags to create the final set of tags applied to all resources
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

This setup establishes default tags that apply to all modules while allowing each module to optionally include a `tags.yml` file to define tags for overriding the defaults.

For example, in `stage/networking/vpc`, you could have a `terragrunt.hcl` file configured as follows:

```hcl
# Include the root terragrunt.hcl config
include "root" {
  path = find_in_parent_folders()
}
```

Additionally, in `stage/networking/vpc`, you might include an overrides file named `tags.yml` with the following content:

```yaml
Name: vpc-stage
```

In `prod/networking/vpc/terragrunt.hcl`, the configuration would remain identical to the stage version. However, in `prod/networking/vpc/tags.yml`, you would specify:

```yaml
Name: vpc-prod
```

In summary, any of your Terragrunt modules can include a `tags.yml` file to override the "default" configuration inherited from the root `terragrunt.hcl`.
