# Step 3: update references to the Gruntwork Infrastructure as Code Library

In order to take advantage of the Terraform 0.13, you need to update your references to the Gruntwork
Infrastructure as Code Library to use a compatible version. We (Gruntwork) have gone through all our modules in the
library to test and update the code to be compatible with Terraform 0.13. As a customer, you need to update to
the proper versions of the Gruntwork library to pick up the fixes/changes that were made to be compatible. Refer to
[the
"Updating" section of "How to use the Gruntwork Infrastructure as Code Library"](https://gruntwork.io/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library/#updating) for instructions on how to update the
versions in your code.

For the vast majority of the repos, the only change that will be necessary is a version number bump, but several repos
require more extensive code changes and state migrations. To upgrade without downtime and data loss, **you MUST follow
the migration instructions in the release notes in each repo to know what changes need to be made to update to the new
version.** The repo most affected by the 0.13 backward incompatibilities was `terraform-aws-eks`, so if you are an EKS
user, pay special attention to the release notes!

:::caution

Gruntwork follows
[semantic
versioning](https://gruntwork.io/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library/#versioning). For any pre-1.0 modules, this means that version updates to the minor version are considered backwards
incompatible releases for any version updates prior to 1.0.0 release. Make sure to read the release notes for the
relevant modules any time you are updating minor versions! Note that you will want to read the release notes for each
minor version that is updated (e.g., if you are going from `v0.5.x` to `v0.9.x`, you will want to read the notes for `v0.6.0`, `v0.7.0`, `v0.8.0`, and `v0.9.0` to get the full list of backwards incompatible updates).

:::

The following table provides a summary of all the relevant Gruntwork AWS modules and the respective versions that are
compatible with Terraform 0.13:

<a id="version-compatibility-table" className="snap-top" />
<table>
<colgroup>
<col />
<col />
</colgroup>
<tbody>
<tr className="odd">
<td><p><strong>Gruntwork Repo</strong></p></td>
<td><p><strong>Minimum version with Terraform 0.13 support</strong></p></td>
</tr>
<tr className="even">
<td><p>Terratest</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terratest/releases/tag/v0.30.0">v0.30.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>Terragrunt</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terragrunt/releases/tag/v0.25.4">v0.25.4</a></strong></p></td>
</tr>
<tr className="even">
<td><p>package-terraform-utilities</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/package-terraform-utilities/releases/tag/v0.3.0">v0.3.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-vpc</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.10.0">v0.10.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>module-asg</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/module-asg/releases/tag/v0.11.0">v0.11.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>module-server</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/module-server/releases/tag/v0.9.0">v0.9.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>package-lambda</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/package-lambda/releases/tag/v0.9.0">v0.9.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>module-security</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/module-security/releases/tag/v0.37.0">v0.37.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>module-load-balancer</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/module-load-balancer/releases/tag/v0.21.0">v0.21.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>module-data-storage</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/module-data-storage/releases/tag/v0.16.0">v0.16.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>module-cache</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/module-cache/releases/tag/v0.10.0">v0.10.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>package-messaging</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/package-messaging/releases/tag/v0.4.0">v0.4.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>package-static-assets</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/package-static-assets/releases/tag/v0.7.0">v0.7.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-monitoring</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.23.0">v0.23.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>package-openvpn</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/package-openvpn/releases/tag/v0.12.0">v0.12.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>module-ecs</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/module-ecs/releases/tag/v0.23.0">v0.23.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>module-ci</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/module-ci/releases/tag/v0.29.0">v0.29.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-eks</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.30.0">v0.30.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>package-zookeeper</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/package-zookeeper/releases/tag/v0.7.0">v0.7.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>package-kafka</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/package-kafka/releases/tag/v0.7.0">v0.7.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>package-elk</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/package-elk/releases/tag/v0.7.0">v0.7.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-kubernetes-helm</p></td>
<td><p><strong>Deprecated. Migrate to <code>terraform-kubernetes-namespace</code> instead.</strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-kubernetes-namespace</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-kubernetes-namespace/releases/tag/v0.1.0">v0.1.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>cis-compliance-aws</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/cis-compliance-aws/releases/tag/v0.9.0">v0.9.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>package-sam</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/package-sam/releases/tag/v0.3.0">v0.3.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-couchbase</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-couchbase/releases/tag/v0.4.0">v0.4.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-influx</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-influx/releases/tag/v0.2.0">v0.2.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-consul</p></td>
<td><p><strong><a href="https://github.com/hashicorp/terraform-aws-consul/releases/tag/v0.8.0">v0.8.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-vault</p></td>
<td><p><strong><a href="https://github.com/hashicorp/terraform-aws-vault/releases/tag/v0.14.0">v0.14.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-nomad</p></td>
<td><p><strong><a href="https://github.com/hashicorp/terraform-aws-nomad/releases/tag/v0.7.0">v0.7.0</a></strong></p></td>
</tr>
</tbody>
</table>
