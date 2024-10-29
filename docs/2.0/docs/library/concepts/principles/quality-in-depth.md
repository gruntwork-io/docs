# Quality in Depth

Similar to the notion of [Defense in Depth](https://en.wikipedia.org/wiki/Defense_in_depth_(computing)), quality in depth is a concept relating to how multiple layers of quality assurance can be used to ensure that modules continuously improve in quality over time.

## Quality Checks We Use

These are some of the standard quality checks that are frequently used to ensure that modules are of high quality.

### Automated Testing

The most important tool in our arsenal for ensuring high quality modules is automated testing. Nothing will catch more bugs than actually attempting to provision infrastructure using a module, verifying that the infrastructure is provisioned as expected, and then tearing it down.

To support this, we use the [Terratest](https://github.com/gruntwork-io/terratest) library, which is an open source Go library maintained by Gruntwork that makes it easier to automate this process.

These tests can be run locally, and are run in CI pipelines against live cloud environments to ensure that every module in the library works as expected.

### Pre-commit Hooks

Prior to committing any software, module authors leverage a suite of pre-commit hooks to ensure that quality is introduced as early as possible. These hooks are run again in CI to ensure that authors did in-fact run them locally.

For a list of hooks available for authors, and for information on the hooks leveraged for a particular repository in the library, see the documentation in the [pre-commit](https://github.com/gruntwork-io/pre-commit?tab=readme-ov-file#pre-commit-hooks) repository.

### Security Scanning

While making modules secure is often a practice of exercising good judgement and following best practices, there are some tools that can help identify security vulnerabilities in modules through static analysis.

The tool used to achieve this in CI is [Terrascan](https://github.com/tenable/terrascan). This is an open source tool that is run continuously to ensure that our modules do not have any security vulnerabilities that are easily detectable.

In addition to static analysis, we also use the [Steampipe](https://github.com/turbot/steampipe) tool to scan live test cloud environments for security vulnerabilities that might not be easily detectable through static analysis. This tool is particularly useful in ensuring the CIS compliance of the [cis-service-catalog](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog) provided to automate the provisioning of CIS compliant AWS accounts.

### Automated Documentation Generation

Generally, the best documentation is that which is written by a person and accurately conveys not only the technical details of a module, but also the intent behind the module. However, it is also useful to have automated documentation generation to ensure that the documentation is always up to date.

To achieve that goal, some custom tooling is used to automatically generate documentation for modules in the library in the context of the manually written documentation to express intent. You can see this documentation by navigating to the [Library Reference](/2.0/reference/library)

## Quality Checks We Don't Use

It is impossible to use every conceivable quality check, and some quality checks are more valuable than others. Every quality check has a cost associated with it, and it is important to be judicious in the quality checks that are used to ensure a high signal to noise ratio. That being said, there is also limited time and resources to implement new quality checks on the entire library.

Gruntwork strives to use the most valuable quality checks that result in high quality modules with the resources available to us.

These are some quality checks that we are aware of, but don't use. They may not be in use at the moment because they are not valuable enough to justify the cost of implementing them, or because they are not a good fit for the library. Regardless, they are referenced here so that they can be considered in the future, and so that you can evaluate whether they are a good fit for your own modules.

### Infrastructure Cost

A useful tool for evaluating the cost of infrastructure is [Infracost](https://github.com/infracost/infracost). This is a useful tool, but more practically useful for live infrastructure than a library of modules.

### More to be Discovered

Quality checks that are _not_ used are harder to think of than those that _are_ used. If you have any suggestions for quality checks that we should consider, please let us know by sending a pull request to this document.

