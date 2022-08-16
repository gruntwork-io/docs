# Core Concepts

Version [v4.0.0](https://github.com/terraform-providers/terraform-provider-aws/releases/tag/v4.0.0)
of the Terraform AWS provider was released on February 10th 2022 with backward incompatible updates. Following the 
provider release cycle, future releases from this point onward would only be compatible with 4.X. This means that if 
you wish to use any new resources or data sources that are released from this point onwards, you will need to be 
compatible with version 4 of the AWS provider to be able to pull those changes in.

Originally v4 was a backward incompatible update, but since v4.9.0, released April 7th 2022, it has become backward
compatible. When bumping your versions, HashiCorp recommends using a version v4.9.0 or newer. For your own code, 
you can follow [the official guide](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/guides/version-4-upgrade)
on updating to AWS provider version 4. The rest of this guide will focus on updating references to Gruntwork 
modules and the Gruntwork Reference Architecture to be compatible with AWS provider version 4.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "3f08159b93c4188b5accd6a4c66f4345"
}
##DOCS-SOURCER-END -->
