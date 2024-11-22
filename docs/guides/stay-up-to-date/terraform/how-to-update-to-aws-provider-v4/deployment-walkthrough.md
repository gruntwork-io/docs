# Deployment walkthrough

## Updating references to Gruntwork Infrastructure as Code Library

In order to take advantage of the Terraform AWS provider version 4, you need to update your references to the Gruntwork
Infrastructure as Code Library to use a compatible version. We (Gruntwork) have gone through all our modules in the
library to test and update the code to be compatible with AWS provider version 4. As a customer, you need to update to
the proper versions of the Gruntwork IaC Library to pick up the fixes/changes that were made to be compatible. Be sure to
read the release notes to know what changes need to be made to update to that version.

Refer to our guide on ["Updating to new versions"](/library/stay-up-to-date/updating)
for instructions on how to update the versions in your code.

The following table lists the versions of relevant Gruntwork AWS IaC library modules and Service Catalogs which are
compatible with AWS provider version 4. Since the AWS provider version 3 upgrade, we have sunsetted some of our module
repos. They have not been updated and are not listed below. Please visit the repo READMEs to see our recommendations
for alternatives to those modules.

:::caution

Gruntwork follows [semantic versioning](/library/stay-up-to-date/versioning).
For pre-1.0 modules, version updates to the _minor_ version are considered backward incompatible releases. Make sure to
read the release notes for the relevant modules anytime you are updating minor versions! For example, if you are going
from `v0.5.x` to `v0.9.x`, read the notes for `v0.6.0`, `v0.7.0`, `v0.8.0`, and `v0.9.0` to get the migration steps for
all backward incompatible updates in your upgrade path.

:::

## Version Compatibility table

<table>
<colgroup>
<col />
<col />
</colgroup>
<tbody>
<tr className="odd">
<td><p><strong>Gruntwork Repo</strong></p></td>
<td><p><strong>Minimum version with AWS Provider v4 support</strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-utilities</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.9.0">v0.9.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-vpc</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.22.0">v0.22.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-asg</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.19.0">v0.19.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-server</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.15.0">v0.15.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-lambda</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.20.0">v0.20.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-security</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.65.0">v0.65.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-load-balancer</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.0">v0.29.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-data-storage</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.24.0">v0.24.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-cache</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.18.0">v0.18.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-messaging</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.9.0">v0.9.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-static-assets</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.15.0">v0.15.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-monitoring</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.34.1">v0.34.1</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-openvpn</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.24.0">v0.24.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-ecs</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.34.0">v0.34.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-ci</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.48.0">v0.48.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-eks</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.53.0">v0.53.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-service-catalog</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.96.1">v0.96.1</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-cis-service-catalog</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.41.0">v0.41.0</a></strong></p></td>
</tr>
</tbody>
</table>

## Update the Gruntwork Reference Architecture to AWS Provider v4

If you purchased the Gruntwork Reference Architecture, update the relevant code in `infrastructure-live` to use a
compatible version of the Gruntwork Infrastructure as Code Library, as per
[the compatibility table](#version-compatibility-table) above.

To update your Reference Architecture:

1. Update the underlying module source versions being referenced.
    - We recommend using tools like `ripgrep`, `xargs`, and `sed` to accomplish this.
    - E.g.: `rg v0.95.0 --files-with-matches | xargs sed -i '' "s|v0.95.0|v0.96.1|g"`. This command finds and replaces
      all instances of `v0.95.0` with `v0.96.1` in your repo. Double-check all your changes before committing them to
      version control.
    - If you are several minors behind, please follow the migration guide for each minor version bump. Use the
      find-and-replace command to bump one minor version at a time.
    - Update the underlying Service Catalog versions, and also any one-off library module versions as well. You
      can accomplish this by grepping for each of the repos in the table above.
1. Run `terraform init -upgrade` to allow Terraform to pull in the latest provider version. Without the `-upgrade` flag
   the `3.75.X` version of the provider will be used instead. The `-upgrade` flag allows unlocking the provider
   restriction enforced in `terraform.lock.hcl`, in the module folder.
1. Follow up with `terraform plan`. NOTE: The provider update creates and updates resources. You will see changes in
   the `plan`. These should be safe to `apply`, but always double-check anything slated for destruction.
1. Then run `terraform apply` to bring Terraform state in sync with the provider changes.

If you have any questions, we'd love to hear them. Please reach out to <a href="mailto:support@gruntwork.io">Gruntwork Support</a>.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "0f681c581a4bff11d9dcdf60239d9dad"
}
##DOCS-SOURCER-END -->
