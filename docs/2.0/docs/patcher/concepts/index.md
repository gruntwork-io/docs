# What is Gruntwork Patcher?

Gruntwork Patcher automates the process of keeping your infrastructure code ([Terragrunt](https://terragrunt.gruntwork.io/) and [OpenTofu](https://opentofu.org/)) up to date, including applying patches to ensure compatibility with backward-incompatible module releases.

Manually identifying updates and assessing whether they can be safely applied can consume significant engineering time for each module dependency. Patcher eliminates this inefficiency by streamlining the update process.

You can use Gruntwork Patcher to manage dependencies on the Gruntwork IaC Library, which includes patches for recent breaking changes to Gruntwork modules. Patcher also supports updating dependencies for your own modules or open-source projects, using semantic versioning to identify safe updates and highlight those that need manual review.

Gruntwork Patcher provides a clear, README-driven workflow for breaking changes without available patches. When Patcher detects breaking changes, it updates the relevant dependency to the version containing those changes and generates a README file in the folder with the updated file. This README outlines the release notes and details the breaking changes. Users must review the README, address any necessary actions, and remove the file before rerunning Patcher.
