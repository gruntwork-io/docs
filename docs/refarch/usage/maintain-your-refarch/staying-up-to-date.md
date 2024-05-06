# Staying up to date

Keeping you Reference Architecture up to date is important for several reasons. AWS regularly releases updates and introduces changes to its services and features. By maintaining an up-to-date IaC codebase, you can adapt to these updates seamlessly. This ensures that your architecture remains aligned with the latest best practices and takes advantage of new functionalities, security enhancements, and performance optimizations offered by AWS.

Neglecting to keep your IaC code up to date can lead to significant challenges. When you finally reach a point where an update becomes necessary, the process can become much more cumbersome and time-consuming. Outdated code may rely on deprecated or obsolete AWS resources, configurations, or APIs, making it difficult to migrate to newer versions smoothly. In such cases, the effort required to update the codebase can be substantially higher, potentially resulting in additional costs, delays, and increased risk of errors or production outages.

## Upgrading Terraform across your modules

It is important to regularly update your version of Terraform to ensure you have access to the latest features, bug fixes, security patches, and performance improvements necessary for smooth infrastructure provisioning and management.

Neglecting regular updates may lead to increased complexity and difficulty when attempting to upgrade from multiple versions behind. This was particularly true during the pre-1.0 era of Terraform where significant changes and breaking modifications were more frequent.

The test pipeline's workhorse, the ECS Deploy Runner, includes a Terraform version manager,
[`mise`](https://github.com/jdx/mise), so that you can run multiple versions of Terraform with your
`infrastructure-live` repo. This is especially useful when you want to upgrade Terraform versions.

1. You'll first need to add a `.terraform-version` file to the module directory of the module you're upgrading.
1. In that file, specify the Terraform version as a string, e.g. `1.0.8`. Then push your changes to a branch.
1. The test pipeline will detect the change to the module and run `plan` on that module. When it does this, it will
   use the Terraform version you specified in the `.terraform-version` file.
1. If the `plan` output looks good and there are no issues, you can approve and merge to your default protected branch. Once the code is merged, the changes will be `apply`ed
   using the newly specified Terraform version.

   :::info

   The `.tfstate` state file will be written in the version specified by the `.terraform-version` file. You can verify this by viewing the state file in the S3
   bucket containing all your Reference Architecture's state files.

   :::


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "c4fbcba8e2d7fb60bde477269de7d9da"
}
##DOCS-SOURCER-END -->
