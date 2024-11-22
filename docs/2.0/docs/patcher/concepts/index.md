# What is Gruntwork Patcher?

Gruntwork Patcher helps you automatically keep your infrastructure code ([Terragrunt](https://terragrunt.gruntwork.io/) and [OpenTofu](https://opentofu.org/)) up to date, including patching your code to make it work with backward incompatible module releases.

Without Patcher, the manual process of discovering updates and determining if they can be safely applied can take hours of an engineer's time for each module dependency.

You can use Patcher to maintain your dependencies on the Gruntwork IaC Library which includes patches for recent breaking changes to Gruntwork modules. Patcher can also be used to update dependencies on your own modules and dependencies on open source modules using semantic versioning to decide which versions can be safely updated and which require manual intervention.

Gruntwork Patcher provides a straightforward README driven workflow for use when applying breaking changes that don't have patches. Patcher updates the dependency to the version with a breaking changes, generates a README file into the folder that contains the file that has been updated, and then stops. The README will contain the release note for the breaking change. The user reads the README file, takes any action that is required and then deletes the README file before running Patcher again.
