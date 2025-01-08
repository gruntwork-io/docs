# Leveraging Infrastructure as Code (IaC) Modules for Efficiency and Reliability
Understanding the different levels of abstraction in IaC and the role of modules can enhance governance, documentation, mean time to recovery (MTTR), consistency, and infrastructure reliability.

## Understanding IaC abstraction levels
Gruntwork describes infrastructure using a four-layer system:

**Direct infrastructure** (lowest-level): The actual deployed infrastructure, including servers, networks, and databases.

**Resource-level IaC** (mid-level): OpenTofu provides a wrapper around cloud provider APIs, representing objects in those APIs as [resources](https://opentofu.org/docs/language/resources/). With OpenTofu, you can define individual infrastructure resources (e.g., servers, networks, databases) in code. While this improves consistency and enables version control, it can still be challenging to manage complex deployments and establish governance, as each resource and its arguments must be redefined for every deployment.

[**Module-level IaC**](/2.0/docs/library/concepts/modules) (high-level):  Modules group multiple resources into reusable building blocks. For example, a module might define a web server with a load balancer, database, and security groups. Modules simplify infrastructure management, increase efficiency, and codify best practices and business requirements.

[**Service-Level IaC**](/2.0/docs/library/concepts/service-modules) (Highest-Level):  At this level, you combine modules to create complete deployable architectures, such as multi-tier applications or data pipelines. This enables platform teams to further codify architectures, compliance, security, and reusable structures across the organization.

<img alt="Diagram showing IaC Module Hierarchy" className="img_node_modules-@docusaurus-theme-classic-lib-theme-MDXComponents-Img-styles-module medium-zoom-image" src="/img/iac/module_types.svg" />

## Benefits of IaC modules
* **Increased efficiency:** Modules eliminate repetitive coding, speeding up infrastructure deployments.
* **Reduced errors:** Pre-defined, tested modules ensure consistency and minimize configuration errors.
* **Improved collaboration:** Shared modules promote code reuse and foster better collaboration across teams.
* **Enhanced compliance:** Modules integrate security and compliance best practices to adhere to organizational standards.
* **Simplified documentation:** Modules are self-documenting and often include separate documentation and examples, making infrastructure components and their relationships clear.
* **Faster recovery:** Version-controlled modules enable quick recovery from errors by allowing rapid redeployment and rollback of infrastructure.
* **Faster scaling:** Reusable modules simplify scaling infrastructure to new regions, shared-fate zones, or data centers.

## IaC modules and documentation
While IaC code acts as documentation, it is important to supplement it with additional explanations:

* **Well-commented Code:** Add comments to clarify the purpose and functionality of modules and resources.
* **Module documentation:** Include details about:
  * Purpose and functionality
  * Input variables and outputs
* **Usage examples:** Provide practical examples demonstrating module usage with common input variables.
* **Design decisions and rationale:** Explain why specific architectural decisions were made and outline the trade-offs involved.

## IaC modules and disaster recovery

IaC modules significantly improve disaster recovery capabilities:

* **Rapid redeployment:** Quickly restore infrastructure from code in the event of failures.
* **Version-controlled infrastructure:** Maintain a source of truth for your infrastructure, tracking changes and enabling efficient rollbacks.
* **Consistent environments:** Recreate identical environments across regions for redundancy and reliability.
* **Drift detection and correction:** Compare actual infrastructure to IaC definitions to identify and correct configuration drift.
