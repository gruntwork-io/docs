# Run the Wizard

The Gruntwork CLI features a wizard designed to assist you in completing your Reference Architecture setup actions. The Gruntwork CLI wizard attempts to orchestrate all required configuration actions, such as provisioning AWS accounts, creating IAM roles used by Gruntwork tooling and engineers in each of the AWS accounts, registering new Route53 domain names, configuring Route53 Hosted Zones, and much more.

If you have already run the wizard using the [bootstrap script](/refarch/configuration/install-required-tools.md#use-the-bootstrap-script-preferred), then you can skip this step.

## Installation

Installation instructions for the Gruntwork CLI can be found in [Install Required Tools](/refarch/configuration/install-required-tools.md#installing-gruntwork-cli).

## Required Permissions

To run the wizard you will need access to the AWS account that serves as the Organization Root of your AWS Organization. At a minimum, the AWS IAM user or role will need the `organizations:CreateAccount` action, which grants the ability to create member accounts.

## Running the wizard

To commence the wizard, first authenticate to AWS on the command line, then run `gruntwork wizard`.

If you need to stop the running the wizard at any time, or if there is an error, the next time you run the wizard it will restart at the last step it stopped on.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "1938848af7e91882608e76336fbe83b5"
}
##DOCS-SOURCER-END -->
