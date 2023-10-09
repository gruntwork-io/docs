# Labels and Tags

Intro paragraph on what a label is and what a tag is.

## Labels

A label is a consistent way to name resources in your AWS accounts. Consistent naming helps you to quickly identify resources for a specific application, the environment (e.g., `dev`, `stage`, `prod`) in which it is running, and specific portions of a workload (for example, if you have several services that operate together as a part of a large application).

### Label recommendations

Gruntwork recommends using a labeling scheme that includes the name of your organization, the environment in which a resource is running, the name of the associated application, a workload specific identifier (), and the region in which the resource is running, delineated by hyphens. For example, `${organization}-${environment}-${application}-${identifier}-${region}`.

Gruntwork recommends using shorthand where possible to avoid exceeding limits for resource names as they may very across AWS services. For example, the `gruntwork` organization name can be shortened to `gw`, the `production` environment can be shortened to `prd`, and the `us-west-2` AWS region can be shortened to `uw2`.


| Descriptor | Example | Rationale | Required |
| ---------- | ------- | -------- | -------- |
| organization | `acme` | Assists with making globally unique resource names (e.g., S3 buckets) | Yes |
| environment | `prd` | The environment (dev, stage, prod, etc) in which the service is running | Yes |
| application | `coolapp` | Identify which application the resource belongs to | Yes |
| identifier | `compute` | Identify specific workloads within an application | Yes |
| region | `uw2` | The AWS region in which the service is running | Yes |

As an example, if Acme Co was running an application named `coolapp` on AWS EC2 in a production environment in us-west-2, we would label all EC2 instances `acme-prd-coolapp-compute-uw2`. Similarly if we were using AWS RDS as the database layer for the same application, we would label the associated RDS instance `acme-prd-coolapp-db-uw2`.

### Adding labels

The simplest way to create a label is using a `locals` block and combining the recommended attributes into a single attribute. For example, if you were creating an AWS S3 bucket using a Gruntwork module you could set up the following locals block.

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

Tags are key value pairs that act as metadata for organizing your AWS resources. Tags are often used by operators and developers to identify workload owners (e.g., a specific team), the application that a resource belongs to, the environment in which an application is running, and more. Finance teams often make use of teams to map cost and usage to specific Cost Centers or Business Units. For more information on tags, see the [official documentation](https://docs.aws.amazon.com/tag-editor/latest/userguide/tagging.html).

### Tag key recommendations

Gruntwork recommends prefixing all custom tag keys with the name of your organization. For example - the company acme co would start all of their tag keys with `acmeco`. This will allow you to distinguish tags specific to your organization from tags that may be automatically applied to your by AWS.

### Recommended tags

The table below contains recommend tag keys and the description for the value you should give to the key. These keys are beneficial for both locating and filtering for resources as an operator or developer as well as being used as [cost allocation tags](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html) to assist finance teams with associating costs to specific business units or applications.


| Key Name   | Example Key | Value Description |
| ---------- | ----------- | ----------- |
| Department | `acmeco:Department` | The organizational department to which the owning team belongs. Useful for rolling up costs per department in the organization |
| Team | `acmeco:Team` | The team that owns the resource. Useful for tracking resources and cost per team. Useful when combined with department tags to see how much each team in a department is spending |
| Environment | `acmeco:Environment` | The environment in which the resource is running. Useful for tracking spend per environment at the team, business unit, and organization levels |
| Application | `acmeco:Application` | Track spend per application. Can be used in conjunction with environment tags to see cost of running an application per environment |
| CostCenter | `acmeco:CostCenter` | Monitor costs by cost center |
| BusinessUnit | `acmeco:BusinessUnit` | Monitor costs by business unit |
| Workload Type | `acmeco:WorkloadType` | Course grained type of service, e.g., compute, data storage, databases, etc |

### Adding Tags

some information about adding tags here...

### Cost Allocation Tags

If you are using custom tags for your resources for the purposes of tracking cost and usage, you will need to activate the tags in the Billing and Cost Management console in AWS. For more information see [User-defined cost allocation tags](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/custom-tags.html) and [Activating user-defined cost allocation tags](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/activating-tags.html).
