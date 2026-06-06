# Deployment walkthrough

## Updating references to Gruntwork Infrastructure as Code Library

In order to take advantage of the Terraform AWS provider version 3, you need to update your references to the Gruntwork
Infrastructure as Code Library to use a compatible version. We (Gruntwork) have gone through all our modules in the
library to test and update the code to be compatible with AWS provider version 3. As a customer, you need to update to
the proper versions of the Gruntwork IaC Library to pick up the fixes/changes that were made to be compatible. Be sure to
read the release notes to know what changes need to be made to update to that version.

Refer to our ["Updating to new versions"](/library/stay-up-to-date/updating) guide
for instructions on how to update the versions in your code.

The following table provides a summary of all the relevant Gruntwork AWS modules and the respective versions that are
compatible with AWS provider version 3.

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

## Version Compatibility table

<table>
<colgroup>
<col />
<col />
</colgroup>
<tbody>
<tr className="odd">
<td><p><strong>Gruntwork Repo</strong></p></td>
<td><p><strong>Minimum version with AWS Provider v3 support</strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-vpc</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.9.0">v0.9.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>module-asg</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/module-asg/releases/tag/v0.10.0">v0.10.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>module-data-storage</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/module-data-storage/releases/tag/v0.15.0">v0.15.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>module-server</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/module-server/releases/tag/v0.8.5">v0.8.5</a></strong></p></td>
</tr>
<tr className="even">
<td><p>package-lambda</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/package-lambda/releases/tag/v0.8.1">v0.8.1</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>package-sam</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/package-sam/releases/tag/v0.2.1">v0.2.1</a></strong></p></td>
</tr>
<tr className="even">
<td><p>module-cache</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/module-cache/releases/tag/v0.9.4">v0.9.4</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>package-messaging</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/package-messaging/releases/tag/v0.3.4">v0.3.4</a></strong></p></td>
</tr>
<tr className="even">
<td><p>package-static-assets</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/package-static-assets/releases/tag/v0.6.5">v0.6.5</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-monitoring</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.22.1">v0.22.1</a></strong></p></td>
</tr>
<tr className="even">
<td><p>package-openvpn</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/package-openvpn/releases/tag/v0.11.0">v0.11.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>module-security</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/module-security/releases/tag/v0.35.0">v0.35.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>module-ecs</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/module-ecs/releases/tag/v0.22.0">v0.22.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>module-ci</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/module-ci/releases/tag/v0.27.3">v0.27.3</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-eks</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.22.1">v0.22.1</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>module-load-balancer</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/module-load-balancer/releases/tag/v0.20.4">v0.20.4</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-couchbase</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-couchbase/releases/tag/v0.3.0">v0.3.0</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>package-zookeeper</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/package-zookeeper/releases/tag/v0.6.7">v0.6.7</a></strong></p></td>
</tr>
<tr className="even">
<td><p>package-kafka</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/package-kafka/releases/tag/v0.6.3">v0.6.3</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>package-elk</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/package-elk/releases/tag/v0.6.0">v0.6.0</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-influx</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-influx/releases/tag/v0.1.3">v0.1.3</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-vault</p></td>
<td><p><strong><a href="https://github.com/hashicorp/terraform-aws-vault/releases/tag/v0.13.11">v0.13.11</a></strong></p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-consul</p></td>
<td><p><strong><a href="https://github.com/hashicorp/terraform-aws-consul/releases/tag/v0.7.10">v0.7.10</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-nomad</p></td>
<td><p><strong><a href="https://github.com/hashicorp/terraform-aws-nomad/releases/tag/v0.6.6">v0.6.6</a></strong></p></td>
</tr>
<tr className="even">
<td><p>package-terraform-utilities</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/package-terraform-utilities/releases/tag/v0.2.1">v0.2.1</a></strong></p></td>
</tr>
<tr className="odd">
<td><p>cis-compliance-aws</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/cis-compliance-aws/releases/tag/v0.6.0">v0.6.0</a></strong></p></td>
</tr>
</tbody>
</table>

## Update the Gruntwork Reference Architecture to AWS Provider v3

If you purchased the Gruntwork Reference Architecture, you will have a copy of the `infrastructure-live` and
`infrastructure-modules` repositories that contain the infrastructure code for deploying the Reference Architecture. You
will need to update the relevant code in `infrastructure-modules` to use a compatible version of the
Gruntwork Infrastructure as Code Library, as per [the compatibility table](#version-compatibility-table) above.

To help guide you through the upgrade process, we have updated the Acme Reference Architecture examples to support AWS
provider v3. You can refer to the following release notes for detailed information and code patches that you can apply
to update your snapshot of the Gruntwork Reference Architecture:

<div className="dlist">

#### CIS Reference Architecture

Refer to the release notes for
[v0.0.1-20201021](https://github.com/gruntwork-io/cis-infrastructure-live-acme/releases/tag/v0.0.1-20201021)
of the `cis-infrastructure-live-acme` repository for instructions on how to
update the CIS components of the Reference Architecture to be compatible with
AWS provider v3. For all other components, refer to the release notes for
[v0.0.1-20201021](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/releases/tag/v0.0.1-20201021)
of the `infrastructure-modules-multi-account-acme` repository.

#### Standard Reference Architecture

Refer to the release notes for
[v0.0.1-20201021](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/releases/tag/v0.0.1-20201021)
of the `infrastructure-modules-multi-account-acme` repository for instructions
on how to update your components to be compatible with AWS provider v3.

</div>


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "c8710076a046d77f4f3749b162040d89"
}
##DOCS-SOURCER-END -->
