# Updating the Gruntwork Reference Architecture to Terraform 0.13

If you purchased the Gruntwork Reference Architecture, you will have a copy of the `infrastructure-live` and
`infrastructure-modules` repositories that contain the infrastructure code for deploying the Reference Architecture. You
will need to update the relevant code in `infrastructure-modules` to use a compatible version of the
Gruntwork Infrastructure as Code Library, as per [the compatibility table](2-step-3-update-references-to-the-gruntwork-infrastructure-as-code-library.md#version-compatibility-table) above.

To help guide you through the upgrade process, we have updated the Acme Reference Architecture examples to support
Terraform 0.13. You can refer to the pull requests to see an example of the updates you’ll need to do to make your
Reference Architecture work with Terraform 0.13:

<div className="dlist">

#### Standard Reference Architecture

See the Release Notes for
[v0.0.1-20201218
tag in infrastructure-modules](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/releases/tag/v0.0.1-20201218) instructions on how to update the Reference Architecture for Terraform 0.13
compatibility. You can also view the [infrastructure-modules PR](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/pull/46)
and the [infrastructure-live PR](https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/pull/44) for
an example of a Terraform 0.13 update.

#### CIS Reference Architecture

See the [infrastructure-modules PR](https://github.com/gruntwork-io/cis-infrastructure-modules-acme/pull/5)
and the [infrastructure-live PR](https://github.com/gruntwork-io/cis-infrastructure-live-acme/pull/7) for
an example of a Terraform 0.13 update for the CIS components of the Reference Architecture. For all other components,
refer to PRs in the Standard Reference Architecture section above.

</div>
