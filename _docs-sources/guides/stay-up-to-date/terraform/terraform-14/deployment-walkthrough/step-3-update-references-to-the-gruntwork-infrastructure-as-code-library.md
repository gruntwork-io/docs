---
sidebar_label: Update Gruntwork IaC module references
---

# Step 3: update references to the Gruntwork Infrastructure as Code Library

In order to take advantage of the Terraform 0.14, you need to update your references to the Gruntwork
Infrastructure as Code Library to use a compatible version. We (Gruntwork) have gone through all our modules in the
library to test and update the code to be compatible with Terraform 0.14. As a customer, you need to update to
the proper versions of the Gruntwork library to pick up the fixes/changes that we made to be compatible. Refer to our ["Updating to new versions"](/docs/guides/stay-up-to-date/versioning#updating-to-new-versions) guide for instructions on how to update the
versions in your code.

For the vast majority of the repos, the only change that will be necessary is a version number bump, but several repos
require more extensive code changes and state migrations. To upgrade without downtime and data loss, **you MUST follow
the migration instructions in the release notes in each repo to know what changes need to be made to update to the new
version.**

:::caution

Gruntwork follows [semantic
versioning](/docs/guides/stay-up-to-date/versioning#semantic-versioning).
For any pre-1.0 modules, this means that version updates to the minor version
are considered backwards incompatible releases for any version updates prior to
1.0.0 release. Make sure to read the release notes for the relevant modules any
time you are updating minor versions! Note that you will want to read the
release notes for each minor version that is updated (e.g., if you are going
from `v0.5.x` to `v0.9.x`, you will want to read the notes for `v0.6.0`,
`v0.7.0`, `v0.8.0`, and `v0.9.0` to get the full list of backwards incompatible
updates).

:::

The following table provides a summary of all the relevant Gruntwork AWS modules and the respective versions that are
compatible with Terraform 0.14:

## Version Compatibility Table

<table>
<colgroup>
<col />
<col />
</colgroup>
<tbody>
<tr className="odd">
<td><p><strong>Gruntwork Repo</strong></p></td>
<td><p><strong>Minimum version with Terraform 0.14 support</strong></p></td>
</tr>
<tr className="even">
<td><p>Terratest</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terratest/releases/tag/v0.31.1">v0.31.1</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>Terragrunt</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terragrunt/releases/tag/v0.27.0">v0.27.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-utilities</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.4.0">v0.4.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-vpc</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.14.0">v0.14.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-asg</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.12.0">v0.12.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-server</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.11.0">v0.11.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-lambda</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.10.0">v0.10.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-security</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.46.0">v0.46.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-load-balancer</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.22.0">v0.22.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-data-storage</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.18.0">v0.18.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-cache</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.13.0">v0.13.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-messaging</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.5.0">v0.5.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-static-assets</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.8.0">v0.8.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-monitoring</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.25.0">v0.25.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-openvpn</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.14.0">v0.14.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-ecs</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.28.0">v0.28.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-ci</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.32.0">v0.32.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-eks</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.36.0">v0.36.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-zookeeper</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/releases/tag/v0.9.0">v0.9.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-kafka</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-kafka/releases/tag/v0.8.0">v0.8.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-elk</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.8.0">v0.8.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-kubernetes-namespace</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-kubernetes-namespace/releases/tag/v0.2.0">v0.2.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-cis-service-catalog</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.16.0">v0.16.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-sam</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.4.0">v0.4.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-couchbase</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-couchbase/releases/tag/v0.5.0">v0.5.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-vault</p></td>
<td><p><strong><a href="https://github.com/hashicorp/terraform-aws-vault/releases/tag/v0.15.0">v0.15.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-consul</p></td>
<td><p><strong><a href="https://github.com/hashicorp/terraform-aws-consul/releases/tag/v0.9.0">v0.9.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-nomad</p></td>
<td><p><strong><a href="https://github.com/hashicorp/terraform-aws-nomad/releases/tag/v0.8.0">v0.8.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-architecture-catalog</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.5">v0.0.5</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-service-catalog</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.34.1">v0.34.1</a></strong></p></td>
</tr>
</tbody>
</table>
