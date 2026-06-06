---
sidebar_label: Update references to the Gruntwork Infrastructure as Code Library
---

# Step 1: Update references to the Gruntwork Infrastructure as Code Library

:::info

Please follow the steps listed to upgrade from version 1.2.0 to version 1.3.0 of the Benchmark. To see examples of what the relevant code
changes look like, please refer to these pull requests in the Acme CIS Reference Architecture:

- [`cis-infrastructure-modules-acme`](https://github.com/gruntwork-io/cis-infrastructure-modules-acme/pull/6)
- [`cis-infrastructure-live-acme`](https://github.com/gruntwork-io/cis-infrastructure-live-acme/pull/8)

:::

To update to the CIS AWS Foundations Benchmark v1.3.0, you need to update your references to the Gruntwork
Infrastructure as Code Library to use compatible versions. We (Gruntwork) have reviewed and updated all the library modules for compatibility with the new version of the Benchmark. As a customer, you need to update to
the proper versions of the Gruntwork IaC Library to pick up the fixes/changes made to be compatible. Refer to
[the
"Updating to new versions" section of "Stay Up to Date"](/library/stay-up-to-date/updating) for instructions on how to update the
versions in your code.

For the vast majority of the repos, the only change that will be necessary is a version number bump, but several repos
require more extensive code changes and state migrations. To upgrade without downtime and data loss, **you MUST follow
the migration instructions in the release notes in each repo to know what changes need to be made to update to the new
version.**

:::caution

Gruntwork follows
[semantic
versioning](/library/stay-up-to-date/versioning). For any pre-1.0 modules, this means that version updates to the minor version are considered backward
incompatible releases for any version updates before the 1.0.0 release. Make sure to read the release notes for the
relevant modules any time you are updating minor versions! Note that you will want to read the release notes for each
minor version that is updated (e.g., if you are going from v0.5.x to v0.9.x, you will want to read the notes for v0.6.0,
v0.7.0, v0.8.0, and v0.9.0 to get the full list of backward incompatible updates).

:::

The following table provides a summary of all the relevant Gruntwork AWS modules and the respective versions that are
compatible with CIS AWS v1.3.0:

##### Compatibility Table

<table >
  <colgroup>
    <col />
    <col />
    <col />
  </colgroup>
  <tbody>
    <tr className="odd">
      <td>
        <p>Gruntwork Repo</p>
      </td>
      <td>
        <p>
          <strong>Minimum version with CIS AWS v1.3.0 support</strong>
        </p>
      </td>
      <td>
        <p>Corresponding CIS AWS v1.3.0 recommendations</p>
      </td>
    </tr>
    <tr className="even">
      <td>
        <p>terraform-aws-security</p>
      </td>
      <td>
        <p>
          <strong>
            <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.6">
              v0.44.6
            </a>
          </strong>
        </p>
      </td>
      <td>
        <p>1.20, 1.21, 2.1.1, 2.1.2, 3.10, 3.11</p>
      </td>
    </tr>
    <tr className="odd">
      <td>
        <p>terraform-aws-monitoring</p>
      </td>
      <td>
        <p>
          <strong>
            <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.24.0">
              v0.24.0
            </a>
          </strong>
        </p>
      </td>
      <td>
        <p>1.20, 2.1.1, 2.1.2</p>
      </td>
    </tr>
    <tr className="even">
      <td>
        <p>terraform-aws-zookeeper</p>
      </td>
      <td>
        <p>
          <strong>
            <a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/releases/tag/v0.8.0">
              v0.8.0
            </a>
          </strong>
        </p>
      </td>
      <td>
        <p>1.20, 2.1.1, 2.1.2</p>
      </td>
    </tr>
    <tr className="odd">
      <td>
        <p>terraform-aws-vpc</p>
      </td>
      <td>
        <p>
          <strong>
            <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.13.0">
              v0.13.0
            </a>
          </strong>
        </p>
      </td>
      <td>
        <p>1.20, 2.1.1, 2.1.2</p>
      </td>
    </tr>
    <tr className="even">
      <td>
        <p>terraform-aws-openvpn</p>
      </td>
      <td>
        <p>
          <strong>
            <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.13.0">
              v0.13.0
            </a>
          </strong>
        </p>
      </td>
      <td>
        <p>1.20, 2.1.1, 2.1.2</p>
      </td>
    </tr>
    <tr className="odd">
      <td>
        <p>terraform-aws-cis-service-catalog</p>
      </td>
      <td>
        <p>
          <strong>
            <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.11.1">
              v0.11.1
            </a>
          </strong>
        </p>
      </td>
      <td>
        <p>3.10, 3.11, 4.15, 5.1</p>
      </td>
    </tr>
    <tr className="even">
      <td>
        <p>terraform-aws-service-catalog</p>
      </td>
      <td>
        <p>
          <strong>
            <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.15.4">
              v0.15.4
            </a>
          </strong>
        </p>
      </td>
      <td>
        <p>1.21</p>
      </td>
    </tr>
  </tbody>
</table>


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "df4c2eb967c8e044940b34b0b95dc64e"
}
##DOCS-SOURCER-END -->
