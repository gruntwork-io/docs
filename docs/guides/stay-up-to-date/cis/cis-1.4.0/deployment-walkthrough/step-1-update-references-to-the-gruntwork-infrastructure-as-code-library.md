---
sidebar_label: Update references to the Gruntwork Infrastructure as Code Library
---

# Step 1: Update references to the Gruntwork Infrastructure as Code Library

To update to the CIS AWS Foundations Benchmark v1.4.0, you need to update your references to the Gruntwork
Infrastructure as Code Library to use compatible versions. We (Gruntwork) have reviewed and updated all the library
modules for compatibility with the new version of the benchmark. As a customer, you need to update to
the proper versions of the Gruntwork IaC Library to pick up the fixes/changes made to be compatible. Refer to our ["Updating to new versions"](/library/stay-up-to-date/updating) guide for instructions on how to update the
versions in your code.

Gruntwork follows
[semantic
versioning](/library/stay-up-to-date/versioning). For any pre-1.0 modules, this means that version updates to the minor version are considered backward
incompatible releases for any version updates before the 1.0.0 release. Make sure to read the release notes for the
relevant modules any time you are updating minor versions! Note that you will want to read the release notes for each
minor version that is updated (e.g., if you are going from v0.5.x to v0.9.x, you will want to read the notes for v0.6.0,
v0.7.0, v0.8.0, and v0.9.0 to get the full list of backward incompatible updates).

The following table provides a summary of all the relevant Gruntwork AWS modules and the respective versions that are
compatible with CIS AWS v1.4.0:

##### Compatibility Table

<table id="compatibility-table">
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
          <strong>Minimum version with CIS AWS v1.4.0 support</strong>
        </p>
      </td>
      <td>
        <p>Corresponding CIS AWS v1.4.0 recommendations</p>
      </td>
    </tr>
    <tr className="even">
      <td>
        <p>terraform-aws-security</p>
      </td>
      <td>
        <p>
          <strong>
            <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.54.0">
              v0.54.0
            </a>
          </strong>
        </p>
      </td>
      <td>
        <p>1.12, 2.1.3, 2.1.5</p>
      </td>
    </tr>
    <tr className="odd">
      <td>
        <p>terraform-aws-cis-service-catalog</p>
      </td>
      <td>
        <p>
          <strong>
            <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.27.0">
              v0.27.0
            </a>
          </strong>
        </p>
      </td>
      <td>
        <p>2.1.4, 4.1</p>
      </td>
    </tr>
  </tbody>
</table>


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "204f92b6230a8a548898df98b5272439"
}
##DOCS-SOURCER-END -->
