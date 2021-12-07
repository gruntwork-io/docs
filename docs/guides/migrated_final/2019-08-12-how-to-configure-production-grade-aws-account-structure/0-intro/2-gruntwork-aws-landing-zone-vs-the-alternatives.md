## Gruntwork AWS Landing Zone vs the alternatives

In June 2018, Amazon [announced](https://aws.amazon.com/about-aws/whats-new/2018/06/introducing-aws-landing-zone/)
AWS Landing Zone, which solved three core problems:

1.  Streamline the process of creating a new AWS account;

2.  Configure that new AWS account according to best practices;

3.  And make it possible to configure a best-practices multi-AWS-account setup.

Almost every AWS customer that creates more than a few accounts needs to solve these problems, so over time we
saw additional solutions enter the market. We call all of these options "Landing Zone solutions" and when we
evaluated them, we found that they varied along the following dimensions:

- **Customizability.** Some users are content to stick with AWS’s default definition of "best
  practices" for how their newly created account should be configured, but other customers would like to add to,
  subtract from or modify that definition and some Landing Zones offer very little customization at all.

- **Automatable.** Many users want to define their own custom pipeline for creating new AWS accounts, but not all
  Landing Zone solutions can be integrated into an arbitrary pipeline. For example, AWS Control Tower includes
  Landing Zone functionality, but does not expose any kind of API and is usable only from the management console.

- **UI-driven.** Some AWS users want a first-class UI they can use to deploy new AWS accounts, but not all Landing
  Zone solutions expose a UI.

- **Terraform-native.** Terraform users often want 100% of their deployed infrastructure to be codified in Terraform,
  but some Landing Zone solutions only offer support for CloudFormation or no infrastructure as code at all.

- **No dependencies.** Some AWS Landing Zone solutions depend on purchasing related commercial products or services
  to have access to them or to make them work, whereas other Landing Zone solutions stand on their own without any
  third-party or related-service dependencies.

With these dimensions in mind, we set out to build a Landing Zone solution that:

- Is fully customizable

- Is easily automatable as part of a separate pipeline

- Is 100% Terraform-native

- Does not depend on any third-party products or related services

Because we use Terraform, we do not currently see the need for adding a first-class UI to our Landing Zone
solution, however some users may wish to add UI or UI-like functionality through their CI system or other Terraform
automation tools.



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"2d355d51df301a04501541aa8da4303f"}
##DOCS-SOURCER-END -->
