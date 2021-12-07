# Background

On August 26th, 2020, we announced the initial release of
[the Service
Catalog](https://blog.gruntwork.io/introducing-the-gruntwork-module-service-and-architecture-catalogs-eb3a21b99f70) in a private, invite-only alpha program. Since then we have expanded the catalog to be generally available,
with all Gruntwork subscribers getting access to the services of the catalog. A _service_ includes everything you need
in production, including the Terraform code for provisioning, Packer templates or Dockerfiles for configuration
management, built-in monitoring (metrics, logging, alerting), built-in security features (SSH access, secrets
management, server hardening, encryption in transit and at rest), and so on. This allows you to deploy infrastructure
without writing any code.

Prior to the release of the Service Catalog, the Gruntwork Reference Architecture included a customized set of services
in the form of a private `infrastructure-modules` repository for each customer. These services required continuous
maintenance from the end users to keep up to date with each change, including updating module references when new
versions were released.

Now with the Service Catalog, there is no longer a need to maintain a separate service module for every component you use.
Instead, you can rely on the battle tested, Gruntwork maintained service module in the Service Catalog!

If you haven’t made any modifications to a service since receiving the Reference Architecture, we recommend updating
your `infrastructure-live` configuration to use the service modules from the Service Catalog instead of using and
maintaining your copy in `infrastructure-modules`. Using the Service Catalog directly has several advantages:

- Keep up to date with module releases with a single version bump in your Terragrunt live configuration, as opposed to
  updating each module block reference.

- Update to a new, backward incompatible Terraform version with a single version bump as well. No need to track backward
  incompatible syntactical changes in Terraform!

- Rely on Gruntwork to provide feature updates and bug fixes to the services.

Though the Service Catalog fully replaces the services defined in your `infrastructure-modules` repository, there are
some differences that require you to make modifications to Terragrunt configurations in your `infrastructure-live`
repository before you can start using the Service Catalog.



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"92eff39b0fb3fe404149591df5e4ce30"}
##DOCS-SOURCER-END -->
