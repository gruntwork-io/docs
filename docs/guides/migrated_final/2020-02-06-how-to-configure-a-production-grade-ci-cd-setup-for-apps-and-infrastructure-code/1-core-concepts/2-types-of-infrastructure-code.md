# Types of infrastructure code

Before diving into infrastructure CI/CD workflows, it is important to understand the different types of infrastructure
code that is available. There are two distinct types of infrastructure code:

Infrastructure Modules  
Modules are bundles of infrastructure code that can be used to deploy a specific component of your architecture.
For example, many companies have modules for deploying private networks using Virtual Private Clouds (VPCs),
databases, docker clusters (e.g., Elastic Container Service, Kubernetes, Nomad), etc. Think of modules as the
"blueprints" that define the way your company configures infrastructure.

Live Infrastructure Configurations  
Live infrastructure configurations are specific parameters for each component in your architecture. The live
configurations are the frontend for your infrastructure deployments. For example, you might define your dev
environment as a series of configuration files for the modules that specify the various parameters specific to
development (e.g., small instance sizes, naming instances with a `dev` prefix, using cloud provider accounts that are accessible to all developers,
etc). If the modules are "blueprints" then the live configuration contain the "houses" that were built using the
"blueprints." Each "house" may have slightly different features or customizations, even though they share a common
blueprint.

Typically you would have separate repositories for each of these (e.g., `infrastructure-modules` for modules and
`infrastructure-live` for live configuration). Organizing your infrastructure code in this way makes it easier to test
the module code, promote immutable versions across environments, and keep it DRY.

There are distinct differences in the way the code is tested, used, and deployed between the two flavors of
infrastructure code. These differences are important to consider when designing CI/CD workflows, as they lead to many
differences in the implementation of the pipeline. In the next section, we will walk through a typical CI/CD workflow
and compare and contrast the pipeline between the three flavors of code we’ve talked about so far: application code,
infrastructure modules, and live infrastructure configuration.



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"d61d54a4fa145a1ce55a3504cb47a629"}
##DOCS-SOURCER-END -->
