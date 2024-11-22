import OpenTofuNotice from "/src/components/OpenTofuNotice"

# Gruntwork IaC Library

Gruntwork IaC Library is a collection of reusable Infrastructure as Code (IaC) modules that enables you to deploy and manage infrastructure quickly and reliably.

It promotes code reusability, modularity, and consistency in infrastructure deployments. Essentially, we’ve taken the thousands of hours we spent building infrastructure on AWS and condensed all that experience and code into pre-built modules you can deploy into your own infrastructure.

## Two types of modules

Gruntwork IaC Library contains two types of modules:

### "Building block" modules

"Building block" modules (which we call simply **modules**) are "infrastructure building blocks" authored by Gruntwork and written in OpenTofu configuration files. They capture a singular best-practice pattern for specific pieces of infrastructure and are designed to be both limited in scope and highly reusable. They typically represent one part of a use case you want to accomplish. For example, the `vpc-flow-logs` module does not create a VPC, it only adds the VPC Flow Logs functionality to an existing VPC.

To learn more, refer to [Modules](/2.0/docs/library/concepts/modules)

### Service modules

**Service modules** are opinionated combinations of "building block" modules described above. They are designed to be used "off the shelf" with no need to assemble a collection of “building block” modules on your own. They typically represent a full use case to solve a business problem on their own. For example, the `vpc` service module deploys a VPC, VPC Flow Logs, and Network ACLs. If you agree with the opinions embedded in a service module, they’re the fastest way to deploy production-grade infrastructure.

To learn more, refer to [Service Modules](/2.0/docs/library/concepts/service-modules)
