# What is Gruntwork Patcher?

Gruntwork Patcher automates the process of keeping your infrastructure code ([Terragrunt](https://terragrunt.gruntwork.io/) and [OpenTofu](https://opentofu.org/)) up to date, including applying patches to ensure compatibility with backward-incompatible module releases.

Manually identifying updates and assessing whether they can be safely applied can consume significant engineering time for each module dependency. Patcher eliminates this inefficiency by streamlining the update process.

You can use Gruntwork Patcher to manage dependencies on the Gruntwork IaC Library, which includes patches for recent breaking changes to Gruntwork modules. Patcher also supports updating dependencies for your own modules or open-source projects, utilizing semantic versioning to identify safe updates and highlight those that need manual review.

Gruntwork Patcher provides a clear, README-driven workflow for breaking changes without available patches. When it encounters such changes, Patcher updates the relevant dependency to the version with the breaking changes, generates a README file in the folder containing the updated file, and then stops. This README includes the release notes detailing the breaking changes. Users must review the README, take any required actions, and delete the file before rerunning Patcher.
