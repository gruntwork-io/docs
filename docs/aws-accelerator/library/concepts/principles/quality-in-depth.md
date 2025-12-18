# Quality in Depth

Inspired by the concept of [Defense in Depth](https://en.wikipedia.org/wiki/Defense_in_depth_(computing)), quality in depth refers to implementing multiple layers of quality assurance to ensure continuous improvement in the quality of modules.

## Quality checks we use

These are the standard quality checks we employ to maintain high-quality modules.

### Automated testing

Automated testing is the most effective method for ensuring the quality of modules. It involves provisioning infrastructure using a module, verifying it works as expected, and tearing it down.

We rely on [Terratest](https://github.com/gruntwork-io/terratest), an open-source Go library maintained by Gruntwork, to facilitate this process. Terratest enables local testing and CI pipeline tests against live cloud environments to verify that all library modules function as intended.

### Pre-commit hooks

Pre-commit hooks enable module authors to identify and address issues early in the development process. They are also enforced during CI runs to maintain compliance and consistency.

For details on available hooks and repository-specific configurations, refer to the documentation in the [pre-commit repository](https://github.com/gruntwork-io/pre-commit?tab=readme-ov-file#pre-commit-hooks).

### Security scanning

While ensuring security often involves good practices and sound judgment, static analysis tools can identify potential module vulnerabilities. 

- [Terrascan](https://github.com/tenable/terrascan) is used in CI pipelines to detect vulnerabilities through static analysis.
- [Steampipe](https://github.com/turbot/steampipe) performs live test cloud environment scans to detect security risks not captured by static analysis. These live test scans validate CIS compliance of modules like the [cis-service-catalog](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog).

### Automated documentation generation

While well-written, human-generated documentation captures intent and technical details, automated documentation generation ensures accuracy and up-to-date information. Gruntwork employs custom tools to supplement manually written documentation with automatically generated details, available in the [Library Reference](/library/reference).

## Quality checks we don't use

Not every quality check is practical or valuable enough to justify its implementation. Each quality check incurs a cost, and we aim to maintain a high signal-to-noise ratio by using the most impactful methods within available resources.

### Infrastructure cost

Tools like [Infracost](https://github.com/infracost/infracost) can help assess the cost of live infrastructure. However, it is less relevant to a module library and is not currently part of our quality checks.

### Further exploration

Determining unused quality checks is inherently challenging. If you have suggestions for additional quality checks we should consider, please contribute by submitting a pull request to this document.
