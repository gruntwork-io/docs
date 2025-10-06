---
title: "ACM TLS Certificate"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Load Balancer Modules" version="1.0.3" lastModifiedVersion="0.29.20"/>

# ACM TLS Certificate

<a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/tree/v1.0.3/modules/acm-tls-certificate" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.20" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module can be used to issue and validate free, auto-renewing TLS certificates using [AWS Certificate
Manager (ACM)](https://aws.amazon.com/certificate-manager/). It supports issuing and validating multiple ACM certificates.

The module will create the TLS certificates, as well as
the DNS records to validate them, and output the certificates' ARNs so you can use them with other resources, such as ALBs, CloudFront, and API Gateway.

## Understanding how ACM certificates are programmatically requested and verified

This module supports ordering and programmatically validating, via DNS records that are written to a public Route53 zone, ACM certificates.

To understand the Route53 certificate ordering and DNS validation process in more detail, consult [the AWS documentation](https://docs.aws.amazon.com/acm/latest/userguide/dns-validation.html).
The DNS validation scheme is preferred over the alternative email validation scheme, because the DNS scheme can be orchestrated end to end via Terraform, which this module does for you.

At a high level, the process involves:

1.  Requesting a certificate for a given domain name such as example.com.
2.  Receiving the challenge records provided by AWS, which ask you to prove ownership of the domain by writing a programmatically generated CNAME record to the Route53 public hosted zone associated with example.com. The provided challenge CNAME record will consist of the CNAME record name and a record value.
3.  The Route53 public hosted zone must be created if it does not already exist, so that any records written to it will resolve via external DNS queries.
4.  Upon writing the challenge record and its value to the public Route53 hosted zone, programmatically initiate the validation process, whereby AWS will query your Route53 zone for the challenge record, ensure it resolves, and that its value is the exact value supplied in the original challenge. Note that these queries must resolve over public DNS, so you can test them yourself:
    `dig _a79865eb4cd1a6ab990a45779b4e0b96.example.com. cname`
5.  Once AWS is able to verify that the records resolve correctly and with the expected values, it will convert your certificate from a `pending` status to an `issued` status.

This module is capable of handling these steps for you, so that you need only supply the correct input map of desired certificates via `var.acm_tls_certificates`.

## How to request wildcard certificates

To provision a wildcard certificate for example.com, you would create the following `acm_tls_certificates` input, using the `subject_alternative_names`
field to specify the domain prefixed with `*.`, e.g., `*.example.com`:

```hcl
# Example of a simple wildcard certificate that protects BOTH example.com and the first level of subdomains
# such as test.example.com, mail.example.com, etc
acm_tls_certificates = {
    "example.com" = {
      subject_alternative_names = ["*.example.com"]
      tags = {
        Environment       = "stage"
        run_destroy_check = true
      }
      create_verification_record = true
      verify_certificate         = true
    }
 }
```

Here's an example of requesting a wildcard certificate for the next level down of subdomains:

```hcl

# Example of provisioning a wildcard certificate that protects BOTH test.example.com and mail.test.example.com,
# db.test.example.com, etc
acm_tls_certificates = {
    "test.example.com" = {
      subject_alternative_names = ["*.test.example.com"]
      tags = {
        Environment       = "stage"
        run_destroy_check = true
      }
      create_verification_record = true
      verify_certificate         = true
    }
 }
```

## Requesting a certificate for a domain that doesn't match its hosted zone name

If you are requesting a a certificate for domain X, but you're attaching it to a hosted zone that is NOT named X you must specify the `hosted_zone_id` of the target hosted zone in the `var.acm_tls_certificates` input.

For example, if you are requesting a certificate for `test-29283.example.com`, but you are attaching it to the public zone named `example.com`, then you MUST provide the `hosted_zone_id` for the example.com public zone in your `var.acm_tls_certificates` input map.

Recall that, because of how the programmatic DNS validation scheme works [outlined above](#understanding-how-acm-certificates-are-programmatically-requested-and-verified), you need the DNS validation challenge records that will be generated for your requessted `test-29283.example.com` to resolve via public DNS queries, and therefore you need to write their records to the `example.com` hosted zone. Therefore you would provide the `hosted_zone_id` of `example.com` in your input map as in the following example:

```
acm_tls_certificates = {
    "test-29283.example.com" = {
      subject_alternative_names = ["*.test.example.com"]
      tags = {
        Environment       = "stage"
        run_destroy_check = true
      }
      create_verification_record = true
      verify_certificate         = true
      # This is the ID of the public zone example.com
      hosted_zone_id = "Z04542822CKAS2ZFBUGT"
    }
 }
```

## Requesting a certificate for a subdomain with a subject alternative name that uses a unique hosted zone

If you are requesting a a certificate for a subdomain with a subject alternative name where both use a unique (and different) hosted zone that differes from the zone used by the parent/root domain, then you will need to specify a domain:zone mapping using the var `domain_hosted_zone_ids`.

Assume that you want a wildcard certificate created for '*.foo.acm-test.test-domain.in' with a subject alternative name of '*.bar.acm-test.test-domain.in.' In this example, the subdomain 'acm-test.test-domain.in' uses zone ID Z11111, the subdomain 'foo.acm-test.test-domain.in' uses zone ID Z12345 and the subdomain 'bar.acm-test.test-domain.in' uses zone ID Z67890. In order for certificate validation records to be created in the correct zone, a domain:zone mapping can be specified similar to the following example:

```
  acm_tls_certificates = {
    "*.foo.acm-test.test-domain.in" = {
      subject_alternative_names = ["*.bar.acm-test.test-domain.in"]
      tags = {
        test-tag-1 = true
      }
      create_verification_record = true
      verify_certificate         = true
    }
  }
  domain_hosted_zone_ids = {
    "*.foo.acm-test.test-domain.in" = "Z12345"
    "*.bar.acm-test.test-domain.in" = "Z67890"
  }
```

This will allow the validation records for 'foo.acm-test.test-domain.in' to be created in zone Z12345, and the validation records for 'bar.acm-test.test-domain.in' to be created in zone Z67890.

Make sure the domain string passed to the `domain_hosted_zone_ids` exactly matches the domain string(s) set in `acm_tls_certificates`.

## Certificate Renewal and Expiration

If you use this module to create a new certificate, it should automatically renew so long as the following criteria are met at least 60 days prior to expiration:

*   The certificate is currently in use by an AWS service.
*   All required ACM-provided DNS records are present and accessible via public DNS (this module configures this automatically).

If a certificate expires because the above criteria is not met and you now need to use that certificate, the best course of action would be to delete the expired certificate and allow this module to recreate it.

## Special handling for use with API Gateway

If you are using this module to create a TLS certificate that will be used with API Gateway, along with a custom
domain name, then you need to set a tag named exactly `run_destroy_check` with a value of `true`. Do this for every certificate you configure that will be used in this way:

```hcl
module "cert" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-load-balancer.git//modules/acm-tls-certificate?ref=v0.13.2"
  
  # ... other params ommitted ...
  
  acm_tls_certificates = {
    "mail.example.com" = {
      subject_alternative_names = ["mailme.example.com"]
      tags = {
        Environment       = "stage"
        run_destroy_check = true
      }
      create_verification_record = true
      verify_certificate         = true
    }
    "admin.example.com" = {
      subject_alternative_names = ["restricted.example.com"]
      tags = {
        Something       = "else"
        run_destroy_check = true
      }
      create_verification_record = true
      verify_certificate         = true
    }
  }
  
  # ... other params ommitted ...
}
```

Without this, `terraform destroy` will fail. This is because you can't delete an ACM cert while it's in use,
deleting a custom domain name mapping for API Gateway takes 10 - 30 minutes, and Terraform only waits a max of 10
minutes to delete the cert, so it times out and exits with an error every time. The `run_destroy_check` tells this
module to run a script that waits until the cert is no longer in use.

Two notes about this script:

1.  You must install the [AWS CLI](https://aws.amazon.com/cli/) to use it.
2.  The script is written in Bash, so it will not work on Windows versions earlier than Windows 10, which supports a Linux Bash shell.

## A note on the dependency_getter pattern implementing module_depends

This module uses a [null_resource](https://github.com/gruntwork-io/terraform-aws-load-balancer/blob/main/modules/acm-tls-certificate/main.tf#L15) named `dependency_getter` to effectively implement `depends_on` at the module level. This is a temporary workaround as Terraform does not yet natively support `depends_on` at the module level. You can also see [this Terraform issue on GitHub](https://github.com/hashicorp/terraform/issues/1178) for more discussion.

Here's how this works. First, we create [this optional dependencies variable](https://github.com/gruntwork-io/terraform-aws-load-balancer/blob/main/modules/acm-tls-certificate/vars.tf#L124) for the current module, which accepts a list of strings, but defaults to an empty list. The `null_resource` linked above does a simple join on the dependencies list, if present. Every resource within this module also `depends_on` this `null_resource.dependency_getter`(even though it's creating no resources).

This has the desirable effect of causing the dependency graph that Terraform builds to look as you'd expect if there were in fact native support for `depends_on` at the module level. Let's say you had a separate Terraform module that needed to consume this current module in order to generate certificates, but you wanted this certificates module to wait to do any of its work until some of the outputs from the resources in your parent module were ready. In that case, you could pass those outputs into this module's `dependencies` variable, like so:

```
# ---------------------------------------------------------------------------------------------------------------------
# CREATE PUBLIC HOSTED ZONE(S)
# ---------------------------------------------------------------------------------------------------------------------

module "acm-tls-certificates" {
  # When using these modules in your own repos, you will need to use a Git URL with a ref attribute that pins you
  # to a specific version of the modules, such as the following example:
  # source = "git::git@github.com:gruntwork-io/terraform-aws-load-balancer.git//modules/acm-tls-certificate?ref=v0.19.0"

  source               = "git::git@github.com:gruntwork-io/terraform-aws-load-balancer.git//modules/acm-tls-certificate?ref=v0.20.0"
  acm_tls_certificates = local.acm_tls_certificates

  # Workaround Terraform limitation where there is no module depends_on.
  # See https://github.com/hashicorp/terraform/issues/1178 for more details.
  # This effectively draws an explicit dependency between the public 
  # and private zones managed here and the ACM certificates that will be optionally 
  # provisioned for them 
  dependencies = flatten([values(aws_route53_zone.public_zones).*.name_servers])
}
```

In this example, the `acm-tls-certificates` module will "wait" until your `aws_route53_zone.public_zones` resources have been successfully provisioned.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ACM-TLS-CERTIFICATE MODULE
# ------------------------------------------------------------------------------------------------------

module "acm_tls_certificate" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-load-balancer.git//modules/acm-tls-certificate?ref=v1.0.3"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  acm_tls_certificates = <any>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Whether or not to create a Route 53 DNS record for use in validating the
  # issued certificate. Can be overridden on a per-certificate basis in the
  # acm_tls_certificates input. You may want to set this to false if you are not
  # using Route 53 as your DNS provider.
  default_create_verification_record = true

  # Whether or not to attempt to verify the issued certificate via DNS entries
  # automatically created via Route 53 records. You may want to set this to
  # false on your certificate inputs if you are not using Route 53 as your DNS
  # provider.
  default_verify_certificate = true

  # Create a dependency between the resources in this module to the interpolated
  # values in this list (and thus the source resources). In other words, the
  # resources in this module will now depend on the resources backing the values
  # in this list such that those resources need to be created before the
  # resources in this module, and the resources in this module need to be
  # destroyed before the resources in the list.
  dependencies = []

  # Map of domains to hosted zone IDs that can be used in place of looking up
  # with a data source. This is useful to avoid limitations of Terraform that
  # prevent you from passing in dynamic Hosted Zone IDs in the
  # acm_tls_certificates map due to for_each and count.
  domain_hosted_zone_ids = {}

  # Global tags to apply to all ACM certificates issued via this module. These
  # global tags will be merged with individual tags specified on each
  # certificate input.
  global_tags = {}

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ACM-TLS-CERTIFICATE MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-load-balancer.git//modules/acm-tls-certificate?ref=v1.0.3"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  acm_tls_certificates = <any>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Whether or not to create a Route 53 DNS record for use in validating the
  # issued certificate. Can be overridden on a per-certificate basis in the
  # acm_tls_certificates input. You may want to set this to false if you are not
  # using Route 53 as your DNS provider.
  default_create_verification_record = true

  # Whether or not to attempt to verify the issued certificate via DNS entries
  # automatically created via Route 53 records. You may want to set this to
  # false on your certificate inputs if you are not using Route 53 as your DNS
  # provider.
  default_verify_certificate = true

  # Create a dependency between the resources in this module to the interpolated
  # values in this list (and thus the source resources). In other words, the
  # resources in this module will now depend on the resources backing the values
  # in this list such that those resources need to be created before the
  # resources in this module, and the resources in this module need to be
  # destroyed before the resources in the list.
  dependencies = []

  # Map of domains to hosted zone IDs that can be used in place of looking up
  # with a data source. This is useful to avoid limitations of Terraform that
  # prevent you from passing in dynamic Hosted Zone IDs in the
  # acm_tls_certificates map due to for_each and count.
  domain_hosted_zone_ids = {}

  # Global tags to apply to all ACM certificates issued via this module. These
  # global tags will be merged with individual tags specified on each
  # certificate input.
  global_tags = {}

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="acm_tls_certificates" requirement="required" type="any">
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Each key for each entry in the map is the fully qualified domain name (FQDN) of the certificate you want to issue
   e.g: example.com 
   
   Each entry in the map supports the following attributes: 
  
   OPTIONAL (defaults to value of corresponding module input): 
   - subject_alternative_names              [list(string)] : A list of subject alternative names to include  
                                                             in the certificate, e.g: ["mail.example.com", "smtp.example.com"]
   - tags                                   [map(string)]  : A map of tags to apply to the ACM certificate to be created. In this map
                                                             variable, the key is the tag name and the value is the tag value. Note
                                                             that this map is merged with var.global_tags, and can be used to override
                                                             tags specified in that variable.
   
                                                             N.B: there is a special tag called run_destroy_check. Its usage is demonstrated in the 
                                                             acm_tls_certificates example input below. If you set this tag to true, a destroy provisioner will run a bash script 
                                                             called wait-until-tls-cert-not-in-use.sh that polls and ensures a given certificate is no longer in use 
                                                             by any other AWS resources so that it can be cleanly destroyed by Terraform without error. 
  
                                                             Certain AWS resources such as application load balancers 
                                                             and API Gateways can take a long time to be destroyed, and will prevent any certificates attached
                                                             to them from being destroyed. If you are unsure of what to do and are not concerned about possibly longer destroy 
                                                             times, then set this tag to true on all of your certificates, which will reduce your likelihood of 
                                                             encountering errors at destroy time
  
   - create_verification_record             [bool]         : When set to true, one Route 53 DNS CNAME record will be created for each of 
                                                             the union of the certificate domain name AND any subject alternative names you've added
                                                             e.g: if your certificate is issued for example.com and your SANs are mail.example.com
                                                             and admin.example.com, then 3 CNAME records will be created. You usually want to set this 
                                                             to true if you want your certificate to be automatically verified for you and you don't have 
                                                             any restrictions that prevent you from using Route 53 as your DNS provider for this purpose. 
   - verify_certificate                     [bool]         : When set to true, a certificate verification action will be initiated against any records created 
                                                             in Route 53. If you want your certificate verified automatically, set BOTH create_verification_record
                                                             and verify_certificate to true in your given certificate entry in the acm_tls_certificates map
  
   - hosted_zone_id                         [string]       : The ID of the Route53 public hosted zone that the certificate's validation DNS records should be written to. If not 
                                                             supplied, the module will attempt to look up the ID of the zone by name at runtime  
  
  
   - key_algorithm                          [string]       : (Optional) Specifies the algorithm of the public and private key pair that your Amazon issued certificate uses to encrypt data
                                                              See ACM Certificate characteristics for more details (https://docs.aws.amazon.com/acm/latest/userguide/acm-certificate.htmlalgorithms)
                                                              If not specified, defaults to RSA 2048
  

```
</details>

<details>


```hcl


   Example: 
    acm_tls_certificates = {
      "mail.example.com" = {
        subject_alternative_names = ["mailme.example.com"]
        tags = {
          Environment       = "stage"
          run_destroy_check = true
        }
        create_verification_record = true
        verify_certificate         = true
        hosted_zone_id = 12345536646
      }
      "smtp.example.com" = {
        subject_alternative_names = ["smtps.example.com"]
        tags = {
          Environment       = "stage"
          run_destroy_check = true
        }
        create_verification_record = false
        verify_certificate         = true
       }
      "spare.example.com" = {
        subject_alternative_names = ["placeholder.example.com"]
        tags = {
          Environment       = "stage"
          run_destroy_check = true
        }
        create_verification_record = true
        verify_certificate         = true
       }
    } 

```
</details>

</HclGeneralListItem>
</HclListItem>

### Optional

<HclListItem name="default_create_verification_record" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to create a Route 53 DNS record for use in validating the issued certificate. Can be overridden on a per-certificate basis in the acm_tls_certificates input. You may want to set this to false if you are not using Route 53 as your DNS provider.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="default_verify_certificate" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to attempt to verify the issued certificate via DNS entries automatically created via Route 53 records. You may want to set this to false on your certificate inputs if you are not using Route 53 as your DNS provider.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="dependencies" requirement="optional" type="list(string)">
<HclListItemDescription>

Create a dependency between the resources in this module to the interpolated values in this list (and thus the source resources). In other words, the resources in this module will now depend on the resources backing the values in this list such that those resources need to be created before the resources in this module, and the resources in this module need to be destroyed before the resources in the list.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="domain_hosted_zone_ids" requirement="optional" type="map(string)">
<HclListItemDescription>

Map of domains to hosted zone IDs that can be used in place of looking up with a data source. This is useful to avoid limitations of Terraform that prevent you from passing in dynamic Hosted Zone IDs in the acm_tls_certificates map due to for_each and count.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Example var usage:
     domain_hosted_zone_ids = {
       "*.foo.acm-test.test-domain.in" = "Z12345"
       "*.bar.acm-test.test-domain.in" = "Z67890"
     }
  

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="global_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Global tags to apply to all ACM certificates issued via this module. These global tags will be merged with individual tags specified on each certificate input.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="certificate_arns">
</HclListItem>

<HclListItem name="certificate_domain_names">
</HclListItem>

<HclListItem name="certificate_domain_validation_options">
</HclListItem>

<HclListItem name="certificate_ids">
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-load-balancer/tree/v1.0.3/modules/acm-tls-certificate/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-load-balancer/tree/v1.0.3/modules/acm-tls-certificate/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-load-balancer/tree/v1.0.3/modules/acm-tls-certificate/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "c0f516f8ac4fff3040ecf7255aca664e"
}
##DOCS-SOURCER-END -->
