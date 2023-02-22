---
sidebar_label: Update references to the Gruntwork Infrastructure as Code Library
---

# Step 2: Update references to the Gruntwork Infrastructure as Code Library

To update to the CIS AWS Foundations Benchmark v1.5.0, you need to update your references to the Gruntwork
Infrastructure as Code Library to use compatible versions. We (Gruntwork) have reviewed and updated all the library modules for compatibility with the new version of the benchmark. As a customer, you need to update to the correct versions of the Gruntwork library to pick up the changes necessary for your infrastructure to be compatible.

The following table provides a summary of all the relevant Gruntwork AWS modules and the respective versions that are
compatible with CIS AWS v1.5.0:

<a id="compatibility-table" class="snap-top"></a>

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
          <strong>Minimum version with CIS AWS v1.5.0 support</strong>
        </p>
      </td>
      <td>
        <p>Corresponding CIS AWS v1.5.0 recommendations</p>
      </td>
    </tr>
    <tr className="even">
      <td>
        <p>terraform-aws-security</p>
      </td>
      <td>
        <p>
          <strong>
            <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.67.2">
              v0.67.2
            </a>
          </strong>
        </p>
      </td>
      <td>
        <p>1.12, 2.1.3, 2.1.5 @@CHECK NEEDED</p>
      </td>
    </tr>
    <tr className="odd">
      <td>
        <p>terraform-aws-cis-service-catalog</p>
      </td>
      <td>
        <p>
          <strong>
            <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.42.9">
              v0.42.9
            </a>
          </strong>
        </p>
      </td>
      <td>
        <p>2.1.4, 4.1 @@CHECK NEEDED</p>
      </td>
    </tr>
  </tbody>
</table>

## 2A Updating with Patcher

Beginning with CIS AWS Foundations Benchmark v1.5.0, Gruntwork is providing an automated way update to the correct versions of the Gruntwork library using a tool we call Patcher.

If you're a customer who signed up for the Gruntwork CIS RefArch from October 1, 2022 then you can use Patcher to safely apply the more than 200 version updates that are necessary to be compatible with CIS AWS v1.5.0.

Included in those more than 200 updates are 4 (@@CHECK NEEDED) breaking changes that need to be applied to your infrastructure. These breaking changes include migrating to our new CIS RDS module. Patcher applies a series of patches modify your infrastructure code to fix 3 of these breaking changes. The manual migration for the last breaking change is included in this guide.

The CIS AWS Foundations Benchmark v1.5.0 includes a requirement to "Ensure no security groups allow ingress from ::/0 to remote server administration ports", Patcher also includes a patch that configures terragrunt to scan your infrastructure and enforce this requirement.

### 2A.1 Installing Patcher

@@ FIX ME

### 2A.2 Running Patcher

:::info

Patcher only changes the files on your local machine. You must complete steps 2A.1 to 2A.3 plus step 3 @@ CHECK NEEDED

:::

`patcher upgrade cis`

@@ FIX ME

### 2A.3 Running the migration scripts

:::caution

You must run the migration scripts. Failing to do so will result in data loss.

:::

When Patcher completes successfully it provides a list migration scripts that need to be run before proceeding

@@ FIX ME

### Next Steps


@@ FIX ME - moved to step 4 (recommended for all customers not just patcher)


## 2B Updating Manually

Refer to our ["Updating to new versions"](/guides/working-with-code/versioning#updating-to-new-versions) guide for instructions on how to update the versions in your code.

Gruntwork follows [semantic versioning](/guides/working-with-code/versioning#semantic-versioning). For any pre-1.0 modules, this means that version updates to the minor version are considered backward incompatible releases for any version updates before the 1.0.0 release. 

Make sure to read the release notes for the relevant modules any time you are updating minor versions! Note that you will want to read the release notes for each minor version that is updated (e.g., if you are going from v0.54.0 to v0.67.2, you will want to read the release notes for v0.55.0, v0.56.0, and all the intermediate notes up to and including v0.66.0, and v0.67.0 to get the full list of backward incompatible updates).

