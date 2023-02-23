---
title: "Request AWS Quota Increase"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem} from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-utilities/tree/main/modules%2Frequest-quota-increase" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# Request AWS Quota Increase

This module can be used to request a quota increase for an AWS Resource.

## Features

*   Request a quota increase for Network ACL Rules and NAT Gateway.

## Learn

### Core Concepts

*   [AWS Service Quotas Documentation](https://docs.aws.amazon.com/servicequotas/?id=docs_gateway)

### Example code

See the [request-quota-increase example](https://github.com/gruntwork-io/terraform-aws-utilities/tree/main/examples/request-quota-increase) for working sample code.

## Usage

Use the module in your Terraform code, replacing `<VERSION>` with the latest version from the [releases
page](https://github.com/gruntwork-io/terraform-aws-utilities/releases):

```hcl
module "path" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-utilities.git//modules/quota-increase?ref=<VERSION>"

    request_quota_increase = {
      nat_gateway = 40,
      nacl_rules = 25
    }
}
```

The argument to pass is:

*   `request_quota_increase`: A map with the desired resource and the new quota. The current supported resources are `nat_gateway` and `nacl_rules`. Feel free to contribute to this module to add support for more `quota_code` and `service_code` options in [main.tf](https://github.com/gruntwork-io/terraform-aws-utilities/tree/main/main.tf)!

When you run `apply`, the `new_quotas` output variable will confirm to you that a quota request has been made!

```hcl
new_quotas = {
  "nat_gateway" = {
    "adjustable" = true
    "arn" = "arn:aws:servicequotas:us-east-1:<account-id>:vpc/L-FE5A380F"
    "default_value" = 5
    "id" = "vpc/L-FE5A380F"
    "quota_code" = "L-FE5A380F"
    "quota_name" = "NAT gateways per Availability Zone"
    "request_id" = "<request_id>"
    "request_status" = "PENDING"
    "service_code" = "vpc"
    "service_name" = "Amazon Virtual Private Cloud (Amazon VPC)"
    "value" = 30
  }
}
```

## Manage

You can see a full history of quota request changes using the [AWS
Console](https://console.aws.amazon.com/servicequotas/home#!/requests) or the AWS CLI:

```
aws service-quotas list-requested-service-quota-change-history --region <REGION>
```

### Finding out the Service Code and Quota Code

When you need to add a new resource, you can check the available services with

```
aws service-quotas list-services --region <REGION> --output table
```

And use the `ServiceCode` from the output to get the code for the resources

```
aws service-quotas list-service-quotas --service-code <SERVICE_CODE>
```

### Request a new quota smaller than the current one

If the new value that you request is smaller than the current one, *nothing* will happen. The
`terraform apply` output will contain the current quota. For example, if the NAT Gateway current
quota is 30 and you ask for a new quota of 25, this is the output:

```hcl
new_quotas = {
  "nat_gateway" = {
    "adjustable" = true
      "arn" = "arn:aws:servicequotas:us-east-1:<account-id>:vpc/L-FE5A380F"
      "default_value" = 5
      "id" = "vpc/L-FE5A380F"
      "quota_code" = "L-FE5A380F"
      "quota_name" = "NAT gateways per Availability Zone"
      "service_code" = "vpc"
      "service_name" = "Amazon Virtual Private Cloud (Amazon VPC)"
      "value" = 30   <------ Returned the current quota, not the requested one.
  }
}
```

### What happens when you run `destroy`

When you run `terraform destroy` on this module, it does not affect your current quotas or your
existing quota requests. In other words, you don't have to worry about quotas being reset to old
values; once they have been increased, they stay that way!




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="resources_to_increase" requirement="required" type="map(number)">
<HclListItemDescription>

A map where the key is the resource and the value is the desired quota. The only resources supported at the moment are 'nacl_rules' and 'nat_gateway'. You can also use the `aws_servicequotas_service_quota` resource directly, there are instructions on how to find the Service Code and Quota Code on the README!

</HclListItemDescription>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl

   Example:
   {
     nacl_rules  = 39,
     nat_gateway = 20,
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="new_quotas">
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-utilities/tree/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-utilities/tree/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-utilities/tree/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "effb992fe1215060d8b1122e8851de97"
}
##DOCS-SOURCER-END -->
