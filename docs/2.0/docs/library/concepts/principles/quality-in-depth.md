# Quality in Depth

Inspired by the concept of [Defense in Depth](https://en.wikipedia.org/wiki/Defense_in_depth_(computing)), quality in depth refers to implementing multiple layers of quality assurance to ensure continuous improvement in the quality of modules.

## Quality Checks We Use

These are the standard quality checks employed to maintain high-quality modules.

### Automated Testing

Automated testing is the most effective method for ensuring the quality of modules. It involves provisioning infrastructure using a module, verifying it works as expected, and tearing it down.

We rely on [Terratest](https://github.com/gruntwork-io/terratest), an open-source Go library maintained by Gruntwork, to facilitate this process. Terratest enables local testing and CI pipeline tests against live cloud environments to verify that all library modules function as intended.

### Pre-commit Hooks

Pre-commit hooks allow module authors to catch issues early in the development process. These hooks are enforced during CI runs to ensure compliance.

For details on available hooks and repository-specific configurations, refer to the documentation in the [pre-commit repository](https://github.com/gruntwork-io/pre-commit?tab=readme-ov-file#pre-commit-hooks).

### Security Scanning

While ensuring security often involves good practices and sound judgment, static analysis tools can identify potential module vulnerabilities. 

- [Terrascan](https://github.com/tenable/terrascan) is used in CI pipelines to detect vulnerabilities through static analysis.
- [Steampipe](https://github.com/turbot/steampipe) performs live test cloud environment scans to detect security risks not captured by static analysis. These live test scans validate CIS compliance of modules like the [cis-service-catalog](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog).

### Automated Documentation Generation

While well-written, human-generated documentation captures intent and technical details, automated documentation generation ensures accuracy and up-to-date information. Gruntwork employs custom tools to supplement manually written documentation with automatically generated details, available in the [Library Reference](/library/reference).

## Quality Checks We Don't Use

Not every quality check is practical or valuable enough to justify its implementation. Each quality check incurs a cost, and we aim to maintain a high signal-to-noise ratio by using the most impactful methods within available resources.

### Infrastructure Cost

Tools like [Infracost](https://github.com/infracost/infracost) can help assess the cost of live infrastructure. However, it is less relevant to a module library and is not currently part of our quality checks.

### Further Exploration

Determining unused quality checks is inherently challenging. If you have suggestions for additional quality checks we should consider, please contribute by submitting a pull request to this document.
