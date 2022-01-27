# Landing Zone

One of the first things you'll need to deploy from your Service Catalog is your *Landing Zone*, which is the basic
structure you'll use for your cloud *accounts* (as well as *projects* in some clouds, such as GCP), including
authentication, authorization, guard rails, and other scaffolding.

![Gruntwork Landing Zone](/img/guides/production-framework/gruntwork-landing-zone.png)

Everything else deploys on top of the Landing Zone, so getting this right is essential. In fact, the Landing Zone has
significant implications on security, maintainability, governance, and much more. If you get it wrong early on, it's
hard to fix later: i.e., getting dozens or hundreds of manually-managed accounts under control and locked down is much
harder than setting up the proper controls in the first place.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"638abda85660525852f391f9d2e1a759"}
##DOCS-SOURCER-END -->
