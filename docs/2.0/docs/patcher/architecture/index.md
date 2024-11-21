# Patcher Architecture


### Environments

Patcher allows teams to define environments as a grouping of folders using glob patterns. Patcher commands (on the CLI and in GitHub Actions) accept commands to match those folders, such as the argument to `patcher-action` -- `include_dirs: "{*prod*}/**"` which would match all folders with "prod" in the name. A given environment can include 1 or many (without limit) folders. Patcher will scan the entire group of folders at once for potential updates and changes.

There is no limit on how many environments you can have, or other limit on the naming structure for those environments.

In the future it is planned to model environments using a configuration based system (to be shared with Gruntwork Pipelines) which will allow for even more flexibility in your folder structure.

### Dependencies

A `dependency` in Patcher workflows is a reference to code that is versioned and in use by your codebase, generally a Terraform or Tofu module that exists in a git repo using a specific git tag for versioning. For example, if you are using `gruntwork-io/terraform-aws-messaging.git//modules/sqs?ref=v0.8.0` as a terraform source module, then your dependency would be `gruntwork-io/terraform-aws-messaging/sqs`.

Patcher generally models promotion workflows around the idea of grouping changes together per-dependency. Patcher would then identify all usages of `gruntwork-io/terraform-aws-messaging/sqs` within a given environment and create a single pull request to update to the next appropriate version.
