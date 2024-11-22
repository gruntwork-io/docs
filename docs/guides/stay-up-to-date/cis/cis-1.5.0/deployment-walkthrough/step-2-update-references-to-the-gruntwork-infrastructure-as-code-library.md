---
sidebar_label: Update references to the Gruntwork Infrastructure as Code Library
---

# Step 2: Update references to the Gruntwork Infrastructure as Code Library

To update to the CIS AWS Foundations Benchmark v1.5.0, you need to update your references to the Gruntwork
Infrastructure as Code Library to use compatible versions. We (Gruntwork) have reviewed and updated all the library
modules for compatibility with the new version of the benchmark. As a customer, you need to update to the correct
versions of the Gruntwork IaC Library to pick up the changes necessary for your infrastructure to be compatible.

The following table provides a summary of all the relevant Gruntwork AWS modules and the respective versions that are
compatible with CIS AWS v1.5.0:

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
          <strong>Minimum version with CIS AWS v1.5.0 support</strong>
        </p>
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
    </tr>
  </tbody>
</table>

## 2A Updating with Patcher

Beginning with CIS AWS Foundations Benchmark v1.5.0, Gruntwork is providing an automated way update to the correct
versions of Gruntwork's CIS Reference Architecture (part of the Gruntwork IaC Library) using a tool we call Patcher.

<a id="patcher-compatibility-table" class="snap-top"></a>

<table id="patcher-compatibility-table">
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
        <p>
          <strong>Minimum version to use Patcher</strong>
        </p>
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
              v0.54.0
            </a>
          </strong>
        </p>
      </td>
      <td>
        <p>
          <strong>
            <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.67.2">
              v0.65.0
            </a>
          </strong>
        </p>
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
              v0.27.0
            </a>
          </strong>
        </p>
      </td>
      <td>
        <p>
          <strong>
            <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.40.1">
              v0.40.1
            </a>
          </strong>
        </p>
      </td>
    </tr>
  </tbody>
</table>

If you're a customer who signed up for the Gruntwork CIS RefArch from August 4, 2022 onwards then you can use Patcher to safely apply the more than 200 version updates that are necessary to be compatible with CIS AWS v1.5.0.

Included in those more than 200 updates are 3 breaking changes that need to be applied to your
infrastructure. These breaking changes include migrating to our new CIS RDS module. Patcher applies a series of patches
modify your infrastructure code to fix 2 of these breaking changes. The manual migration for the last breaking change
is included in this guide.

The CIS AWS Foundations Benchmark v1.5.0 includes a requirement to "Ensure no security groups allow ingress from ::/0
to remote server administration ports", Patcher also includes a patch that configures `tflint` with the [gruntwork-io/tflint-ruleset-aws-cis](https://github.com/gruntwork-patcher-dev/tflint-ruleset-aws-cis) to scan your
infrastructure and enforce this requirement. [Terragrunt now supports running `tflint` as a `before_hooks`](https://terragrunt.gruntwork.io/docs/features/hooks/#tflint-hook).

### 2A.1 Installing Patcher

:::info

Patcher can only be installed by customers that have been granted access by Gruntwork to the Patcher repositories. If you'd like access
then please contact sales@gruntwork.io.

:::

Patcher relies on Docker to run patches in containers. Please ensure that [Docker](https://www.docker.com/) is installed on your system.
In the future we will support alternative container engines.

After you've installed Docker, you need to download the appropriate `patcher` binary for your system from the releases repo:
https://github.com/gruntwork-io/patcher-cli/releases. We only officially support macOS at this stage.


:::caution

Your browser or OS may show a warning about the downloaded binary. Please confirm the warnings and ensure the extracted
binary has been marked as executable: `+x`.

:::

### 2A.2 Running Patcher

Patcher retrieves information about modules and their releases using the GitHub API. To enable this, please create a GitHub Personal
Access Token with `repo` and `org` scope and set the environment variable `GITHUB_OAUTH_TOKEN` to its value:

```bash
export GITHUB_OAUTH_TOKEN="<YOUR_GITHUB_PAT>"
```

Next, in your terminal navigate to the directory with your CIS `infrastructure-live` code and run Patcher’s `upgrade cis` command once on each environment (dev, prod, stage, security etc):


```bash
cd <PATH/TO/YOUR/INFRASTRUCTURE-LIVE/CODE>
cd dev
patcher upgrade cis
```

Patcher will then scan your current directory and its subdirectories, looking for the files containing Terraform or Terragrunt dependencies.

#### Analysis of module usage

The CIS upgrade analyses your module usage and then displays a list of the modules that need to be updated along with the version that is currently being used and the latest available version for each module.

![Screenshot of Patcher with a list of modules in an infrastructure-live repo.](/img/guides/stay-up-to-date/cis-1.5.0/patcher-modules-list.png)

#### View the changelog for each module

Before upgrading you can view the changelogs for each module.

![Screenshot of Patcher with changelogs for a module.](/img/guides/stay-up-to-date/cis-1.5.0/patcher-changelogs.png)

#### Start the upgrade

:::info

Patcher only changes the files on your local machine and does not run Terraform or Terragrunt `apply` commands. You can review all changes before deciding to run these commands.

:::

Patcher prompts you for permission to begin the upgrade before proceeding. Patcher only changes the files on your local machine.

If you agree to the upgrade, press `y` and Patcher will update each module sequentially. When updating to the next version involves a breaking change, Patcher will apply a _patch_ to your infrastructure code.

**What are patches?** A Patch is a YAML file with a set of commands to execute to transform your code. The maintainers
of the dependencies you're using can create patches to update your code automatically, such as when a new release
contains backwards incompatible changes. [See the example of a patch in the CIS Service Catalog.](https://github.com/gruntwork-io/terraform-aws-service-catalog/blob/c3d5ede211fc3230a7d493ceea43622b337ee88a/.patcher/patches/v0.96.4/switch-to-cis-rds-module/patch.yaml)

![Screenshot of Patcher applying a patch.](/img/guides/stay-up-to-date/cis-1.5.0/patcher-rds-patch.png)

### 2A.3 Running the migration scripts

:::caution

You must run the migration scripts. Failing to do so will result in data loss.

:::

When Patcher completes successfully it provides a list migration scripts that need to be run before proceeding.
In order to see the full path of the new scripts, run `git status`, and they will appear as a new file.


![Screenshot of Patcher's summary.](/img/guides/stay-up-to-date/cis-1.5.0/patcher-summary.png)

Example:

```bash
cd us-west-2/dev/data-stores/rds/
aws-vault exec dev -- ./01_state_mv_rds_database.sh
```

### Next Steps

:::caution

Before continuing check that you have completed step 2A.3. Failing to do so will result in data loss.

:::

If you have successfully completed steps 2A.1 through 2A.3 then you should now move to [step 3](step-3-update-the-account-baseline-modules.md) and complete the manual update for the Landing Zone (`account-baseline-*`) modules.


## 2B Updating Manually

Refer to our ["Updating to new versions"](/library/stay-up-to-date/updating) guide for instructions on how to update the versions in your code.

Gruntwork follows [semantic versioning](/library/stay-up-to-date/versioning). For any pre-1.0 modules, this means that version updates to the minor version are considered backward incompatible releases for any version updates before the 1.0.0 release. Make sure to read the release notes for the relevant modules any time you are updating minor versions! Note that you will want to read the release notes for each minor version that is updated (e.g., if you are going from v0.5.x to v0.9.x, you will want to read the notes for v0.6.0, v0.7.0, v0.8.0, and v0.9.0 to get the full list of backward incompatible updates).

### Module change logs

To make this process easier we have added change logs for each module. The changelog clearly states when you can safely bump the module version. If there is a breaking change the changelog includes the migration guide.

The example below is from the changelog for the new [CIS RDS module](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/tree/master/modules/data-stores/rds).

````md title=terraform-aws-cis-service-catalog/modules/data-stores/rds/CHANGELOG.md
## [v0.42.8](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.42.8) - 2023-02-01

### Changed
- No breaking changes, safe to bump

### Description
- Updated upstream `rds` module to v0.100.1

### Related Links
- https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/pull/523

## [v0.42.7](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.42.7) - 2023-01-31

### Changed
- No breaking changes, safe to bump

### Description
- Added `maintenance_window` variable to CIS RDS module

### Related Links
- https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/pull/522

## [v0.42.6](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.42.6) - 2023-01-18

### Changed
- No changes, safe to bump
````

### Next Steps

:::caution

Before continuing check that you have followed all the necessary migration guides. Failing to do so will result in data loss.

:::

If you have successfully completed manually updating the modules to the minimum version with CIS AWS v1.5.0 support then you should now move to [step 3](step-3-update-the-account-baseline-modules.md) and complete the manual update for the account baseline modules.




<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "90db2ba2a03fce70b435066a5f80b9df"
}
##DOCS-SOURCER-END -->
