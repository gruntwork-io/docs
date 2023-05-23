# Run the Wizard

The Gruntwork CLI features a wizard designed to assist you in completing your Reference Architecture setup actions.

The Gruntwork CLI wizard attempts to orchestrate all required configuration actions, such as provisioning AWS accounts, creating IAM roles used by Gruntwork tooling and engineers in each of the AWS accounts, registering new Route53 domain names, configuring Route53 Hosted Zones, and much more.

If you have already completed running wizard using the [bootstrap script option](./install-required-tools.md#use-the-bootstrap-script-preferred) while installing the required tools, then you can skip this step.

## Installation

Installation instructions for the Gruntwork CLI can be found in [Instal Required Tools](./install-required-tools.md#installing-gruntwork-cli).

## Running the wizard

To commence the wizard, first authenticate to AWS on the command line, then run `gruntwork wizard`.

If you need to stop the running the wizard at any time, or if there is an error, the next time you run the wizard it will restart at the last step it stopped on.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "d2be0ec8808222cd64db8b37fb186e38"
}
##DOCS-SOURCER-END -->
