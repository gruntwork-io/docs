import OpenTofuNotice from "/src/components/OpenTofuNotice"

# Gruntwork IaC Library

Gruntwork IaC Library is a collection of reusable Infrastructure as Code (IaC) modules designed to enable rapid, reliable infrastructure deployment and management.

The Library promotes code reusability, modularity, and consistency. It encapsulates years of experience building AWS infrastructure into pre-built modules you can integrate into your infrastructure management.

## Two types of modules

Gruntwork IaC Library contains two module types:

### "Building block" modules

"Building block" modules, referred to as **modules**, are authored by Gruntwork and written in OpenTofu/Terraform configuration files. They capture best-practice patterns for specific infrastructure components and are limited in scope yet highly reusable. For example, the `vpc-flow-logs` module adds VPC Flow Logs functionality to an existing VPC but does not create a VPC.

Refer to [Modules](/2.0/docs/library/concepts/modules) for additional details.

### Service modules

Service modules combine "building block" modules into opinionated, "off-the-shelf" solutions requiring minimal assembly. These modules typically address complete business use cases. For example, the `vpc` service module deploys a VPC, VPC Flow Logs, and Network ACLs. If the embedded configurations align with your needs, service modules provide a fast path to production-grade infrastructure.

Refer to [Service Modules](/2.0/docs/library/concepts/service-modules) to learn more.

