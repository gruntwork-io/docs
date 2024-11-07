---
sidebar_label: Deploy new modules
---

# Step 3: Deploy new modules

## 1. Deploy the Cleanup Expired Certs module (recommendation 1.19)

The new CIS AWS v1.3 recommendations require that all expired SSL/TLS certificates stored in AWS IAM are automatically removed. Removing expired SSL/TLS certificates eliminates the risk that an invalid certificate will be deployed
accidentally to a resource such as AWS Elastic Load Balancer (ELB), which can damage the credibility of the application/website behind the ELB. As a best practice, it is recommended to delete expired certificates. To help you
achieve this recommendation, check out the [example](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/tree/v0.10.0/examples/cleanup-expired-certs/terraform) of the ready-made `cleanup-expired-certs` module.

For the code examples of deploying this module, see the
[relevant section](../../../../build-it-yourself/achieve-compliance/production-grade-design/identity-and-access-management.md#cleanup-expired-ssltls-certificates)
of our "How to achieve compliance with the CIS AWS Foundations Benchmark" guide.

## 2. Deploy IAM Access Analyzer module (recommendation 1.21)

The updated recommendations also require that the AWS IAM Access Analyzer service is enabled across all active regions in a given AWS account or organization.

Once enabled and active, this service will examine the trust policies and access to the following resources:

- Amazon Simple Storage Service buckets;
- AWS Identity and Access Management roles;
- AWS Key Management Service keys;
- AWS Lambda functions and layers;
- Amazon Simple Queue Service queues.

The IAM Access Analyzer will scan only within the AWS Account or Organization boundaries it has been enabled for. The results from this scan will be visible and accessible through the AWS CLI and the AWS Web console. For more information and details on what the AWS IAM Access Analyzer can achieve for your AWS Account and Organization, please refer to the official [AWS docs](https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html).

To help you achieve CIS AWS v1.3 compliance, you can find examples of how to use the ready-made module as part of the `landingzone` module in the `terraform-aws-service-catalog` repository [v0.15.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.15.4), and specifically the `account-baseline-root` and `account-baseline-security` [examples](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.15.4/examples/for-learning-and-testing/landingzone).

For the code examples of deploying this module, see the
[relevant section](../../../../build-it-yourself/achieve-compliance/production-grade-design/identity-and-access-management.md#iam-access-analyzer)
of our "How to achieve compliance with the CIS AWS Foundations Benchmark" guide.

## 3. Deploy the ebs-encryption-multi-region module (recommendation 2.2.1)

EC2 supports encryption at rest when using the Elastic Block Store (EBS) service. While disabled by default, forcing encryption when creating EBS volumes is supported. Encrypting data at rest reduces the likelihood that it is
unintentionally exposed and can nullify the impact of disclosure if the encryption remains unbroken. Recommendation 2.2.1 specifies a manual process to encrypt EBS volumes using the AWS Console; however, Gruntwork has developed
a module that configures volume encryption by default in all enabled regions. Check out the [ebs-encryption-multi-region](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/ebs-encryption-multi-region) to
configure AWS EBS encryption in all allowed regions of an AWS Account.

For the code examples of deploying this module, see the
[relevant section](../../../../build-it-yourself/achieve-compliance/production-grade-design/storage.md#configure-ebs-encryption)
of our "Achieve Compliance With the CIS AWS Foundations Benchmark" guide.

## 4. Deploy the vpc-app-network-acl and vpc-mgmt-network-acl modules (recommendation 5.1)

To help us achieve CIS 1.3 compliance, we’ve also created the `vpc-app-network-acl` module in our [dedicated CIS service catalog](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/tree/v0.10.0/modules/vpc-app-network-acls). This module is designed to follow CIS 1.3 recommendations - restrict access by default, but only allow explicitly listed SSH and RDP connections and hosts. To be compliant, you’ll need to deploy the new module. For more details, please refer to the [dedicated module README](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/blob/v0.10.0/modules/vpc-app-network-acls/README.md) and [the relevant example](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/tree/v0.10.0/examples/vpc-network-acls).

If you are already using the `vpc-app-network-acl` or `vpc-mgmt-network-acl` modules, you need to update the
source URL from the [`terraform-aws-vpc` module](https://github.com/gruntwork-io/terraform-aws-vpc) (previously known
as `module-vpc`). To make sure you won’t delete your existing Network ACL rules, you need to follow our [migration guide](https://github.com/gruntwork-io/cis-infrastructure-modules-acme/blob/master/networking/vpc-app/migration-guides/migrating_to_cis_v13.md) that uses `terragrunt state mv` to update the state.

The new required arguments are `allow_administrative_remote_access_cidrs`, for your office CIDRs, `allow_administrative_remote_access_cidrs_private_app_subnets` and `allow_administrative_remote_access_cidrs_private_persistence_subnets`, for the private subnets, with the CIDRs of the VPC or specific subnets within that VPC.

```hcl
module "vpc_app_network_acls" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-cis-service-catalog.git//modules/vpc-app-network-acls?ref=v0.10.0"

  # ... the existing variables weren't affected!

  allow_administrative_remote_access_cidrs_public_subnets = {
    berlin_office = "1.2.3.4/32"
    ny_office     = "6.7.8.9/32"
  }

  allow_administrative_remote_access_cidrs_private_app_subnets         = { app_vpc_cidrs = module.app_vpc.vpc_cidr_block }
  allow_administrative_remote_access_cidrs_private_persistence_subnets = { app_vpc_cidrs = module.app_vpc.vpc_cidr_block }
}
```

For the code examples of deploying this module, see the
[relevant section](../../../../build-it-yourself/achieve-compliance/production-grade-design/networking.md)
of our "How to achieve compliance with the CIS AWS Foundations Benchmark" guide.

### 4.1 Network ACL Rules Quota limit

The new Network ACL Rules exceed the default AWS Quota for NACL Rules. To solve this issue, we created a Terraform module
([`request-quota-increase`](https://github.com/gruntwork-io/terraform-aws-utilities/tree/master/modules/request-quota-increase))
to request a quota increase! You can see a terragrunt example in the [cis-infrastructure-live-acme repository](https://github.com/gruntwork-io/cis-infrastructure-live-acme/tree/master/prod/_global/request-quota-increase).

After increase to the AWS maximum quota, when you use two remote administration ports (the defaults for both modules
are 22 (SSH) and 3389 (Remote Desktop)), you can add up to 10 CIDRs. Check out
[our
docs](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/tree/v0.10.0/modules/vpc-app-network-acls#calculating-nacl-rules-limits) to see how to calculate the maximum number of CIDRs that you can add.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "6270eb0777685afb4bf98586be2e994f"
}
##DOCS-SOURCER-END -->
