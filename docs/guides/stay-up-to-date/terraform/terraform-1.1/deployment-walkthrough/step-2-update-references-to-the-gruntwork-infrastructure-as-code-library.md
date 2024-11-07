---
sidebar_label: Update Gruntwork IaC Module References
---

# Step 2: update references to the Gruntwork Infrastructure as Code Library

In order to take advantage of the Terraform 1.1, you need to update your
references to the Gruntwork Infrastructure as Code Library to use a compatible
version. We (Gruntwork) have gone through all our modules in the library to test
and update the code to be compatible with Terraform 1.1. As a customer, you need
to update to the proper versions of the Gruntwork library to pick up the
fixes/changes that we made to be compatible. Refer to [Updating Modules](/2.0/docs/library/guides/updating-modules)
for instructions on how to update the versions in your code.

The releases of the modules from the Gruntwork Infrastructure as Code Library that correspond with the
Terraform 1.1 upgrade don't include any backwards incompatible changes.
Therefore, the only changes that you will need to do are version number bumps.

:::caution

Gruntwork follows [semantic
versioning](/library/stay-up-to-date/versioning).
For any pre-1.0 modules, this means that version updates to the minor version
are considered backwards incompatible releases for any version updates prior to
1.0.0 release. Make sure to read the release notes for the relevant modules any
time you are updating minor versions! Note that you will want to read the
release notes for each minor version that is updated (e.g., if you are going
from `v0.5.x` to `v0.9.x`, you will want to read the notes for `v0.6.0`,
`v0.7.0`, `v0.8.0`, and `v0.9.0` to get the full list of backwards incompatible
updates).

:::

The following table provides a summary of all the relevant Gruntwork AWS modules
and the respective versions that are compatible with Terraform 1.1:

## Version Compatibility Table

<table>
<colgroup>
<col />
<col />
</colgroup>
<tbody>
<tr className="odd">
<td><p><strong>Gruntwork Repo</strong></p></td>
<td><p><strong>Minimum version with Terraform 1.1 support</strong></p></td>
</tr>
<tr className="even">
<td><p>Terratest</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/Terratest/releases/tag/v0.40.0">v0.40.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>Terragrunt</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/Terragrunt/releases/tag/v0.36.0">v0.36.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-utilities</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.7.0">v0.7.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-vpc</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.20.0">v0.20.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-asg</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.17.0">v0.17.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-server</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.14.0">v0.14.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-lambda</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.17.0">v0.17.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-security</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.62.0">v0.62.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-load-balancer</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.28.0">v0.27.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-data-storage</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.23.0">v0.23.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-cache</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.17.0">v0.17.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-messaging</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.8.0">v0.8.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-static-assets</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.13.0">v0.13.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-monitoring</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.31.0">v0.31.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-openvpn</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.21.0">v0.21.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-ecs</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.32.0">v0.32.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-ci</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.44.0">v0.44.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-eks</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.49.0">v0.49.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-kubernetes-namespace</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-kubernetes-namespace/releases/tag/v0.5.0">v0.5.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-cis-service-catalog</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.31.0">v0.31.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-architecture-catalog</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.27">v0.0.27</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-service-catalog</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.77.0">v0.77.0</a></strong></p></td>
</tr>
</tbody>
</table>


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "217df2842415cae7425ba67ad9e8ddae"
}
##DOCS-SOURCER-END -->
