import OpenTofuNotice from "/src/components/OpenTofuNotice"

# Gruntwork IaC Library

Gruntwork IaC Library is a collection of reusable, battle-tested OpenTofu/Terraform modules designed to enable rapid, reliable infrastructure deployment and management.

The IaC Library promotes code reusability, modularity, and consistency. It encapsulates years of experience building AWS infrastructure into pre-built modules you can integrate into your infrastructure management.

## Two types of modules

Gruntwork IaC Library contains two module types:

### Component modules

Component modules capture best-practice patterns for specific infrastructure components and are limited in scope yet highly reusable. For example, the `vpc-flow-logs` component module adds VPC Flow Logs functionality to an existing VPC but does not create a VPC itself.

Component modules optimize for control over convenience. For example, you can choose whether to use a `vpc-flow-logs` component module as part of building your own full-fledged VPC, and the `vpc-flow-logs` module itself gives you pretty much every configuration option you need for VPC Flow Logs. This gives you high control, but it's not a very convenient way to build a full-fledged VPC.

Refer to [Component Modules](/2.0/docs/library/concepts/component-modules) for additional details.

### Composite modules

Composite modules (previously called "service modules") combine component modules into opinionated, "off-the-shelf" solutions requiring minimal assembly. These modules typically address complete business use cases. For example, the `vpc` composite module deploys a VPC, VPC Flow Logs, and Network ACLs. If the embedded configurations align with your needs, composite modules provide a fast path to production-grade infrastructure.

Composite modules optimize for convenience over control. For example, the `vpc` composite module gives you a fully configured VPC with all the bells and whistles you need, but it doesn't give you the flexibility to customize every aspect of the VPC.

Refer to [Composite Modules](/2.0/docs/library/concepts/composite-modules) to learn more.
