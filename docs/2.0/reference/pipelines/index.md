# Overview

## Configuration Language Transition

Pipelines configurations are currently undergoing a transition from YAML configurations to new HCL [Configurations as Code](./configurations-as-code.md). These new configurations will offer a richer configuration experience, but are not yet required for use. [YAML configurations](./configurations.md) will continue to work as expected for the time being.

YAML configurations are read by Pipelines when HCL configurations are not present, and the Pipelines binary falls back to interpretting YAML configurations as if they were defined in the HCL configuration system in this scenario.

This means that if you have a `.gruntwork/config.yml` file in your repository, you can continue to use it as you have been, and Pipelines will continue to work as expected.

If you do introduce any HCL configurations into your `.gruntwork` directory or introduce a `gruntwork.hcl` file into a directory, Pipelines will begin to use the HCL configuration system instead of the YAML configuration system.

## Authentication

Core pipelines functionally generally requires only a small amount of configuration.  The most critical configuration for the CI/CD pipeline is how to authenticate with AWS, and that is covered in one of two ways:

* With the YAML system pipelines expects each top-level folder in the repository to correspond to an account in `accounts.hcl` and the existance of appropriate OIDC roles to enable pipeliens to assume the respective role for infra changes in those folders.  As such, very little of the YAML configuration requires customization.

* With the HCL system users can flexibly configure pipelines to authenticate to various AWS accounts to match arbitrary folder structures.  The bulk of the HCL configuration language we define is to support this flexibility.

## Other Configuration

Beyond authentication the main configuration options pertain to customizing Terragrunt execution - for example toggling experimental terragrunt features or configuring when/if to execute a `run` or a `run-all`.  A full list of configuration is available in these reference pages for both configuration systems.

## Next Steps

* Review the [YAML Configurations](./configurations.md) Reference
* Review the (Beta) [Configurations as Code](./configurations-as-code.md) Reference
