# Patcher Architecture


### Environments

Patcher allows teams to define environments as groupings of folders using glob patterns. Patcher commands on the CLI and in GitHub Actions accept arguments to match these folders. For example, the `patcher-action` argument `include_dirs: "{*prod*}/**"` matches all folders containing "prod" in their name. A single environment can include one or multiple folders without any set limit. Patcher scans the entire group of folders simultaneously for potential updates and changes.

There are no restrictions on the number of environments or the naming structure you can use.

In the future, you'll model environments using a configuration-based system integrated with Gruntwork Pipelines, offering greater flexibility in organizing folder structures.

### Dependencies

A `dependency` in Patcher workflows refers to versioned code that your codebase references, typically a Terraform or OpenTofu module stored in a Git repository and tagged with a specific version. For example, if your Terraform source module is `gruntwork-io/terraform-aws-messaging.git//modules/sqs?ref=v0.8.0`, the corresponding dependency is `gruntwork-io/terraform-aws-messaging/sqs`.


Patcher organizes promotion workflows by grouping changes per dependency. It identifies all instances of `gruntwork-io/terraform-aws-messaging/sqs` within a specified environment and generates a single pull request to update the dependency to the next appropriate version.  
