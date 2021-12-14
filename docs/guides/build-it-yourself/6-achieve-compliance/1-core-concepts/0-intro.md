---
pagination_label: Core Concepts
sidebar_label: Intro
---

# CIS Compliance Core Concepts

The CIS AWS Foundations Benchmark is organized into the following sections:

- Identity and Access Management
- Storage
- Logging
- Monitoring
- Networking

There are multiple recommendations within each section. Note the use of the term _recommendation_ as opposed
to _control_ or _requirement_. This reinforces the point that CIS is a self-imposed, best-practices standard,
as opposed to compulsory or regulated and centralized standards such as the
[PCI DSS](https://www.pcisecuritystandards.org/) for the payment card industry or
[HIPAA](https://www.hhs.gov/hipaa/for-professionals/security/laws-regulations/index.html) for covered
health care entities.

## Assessment Status

Each recommendation is classified as either _Automated_ or _Manual_. _Automated_ recommendations indicate that
the check for the recommendation may be accessed programmatically (e.g., an API exists to validate or enable
the recommendation). _Manual_ recommendations must be checked and remediated manually.

## Profiles

The Benchmark defines two profile levels. Level one recommendations are easier to implement, incur less
overhead, but still substantially improve security. Level two recommendations are meant for highly sensitive
environments with a lower risk appetite. They may be more difficult to implement and/or cause more overhead in
day-to-day usage.

## CIS Controls

Each recommendation is also linked to a corresponding [CIS Control](https://www.cisecurity.org/controls/). The
controls are distinct from the Benchmark. They’re described by CIS as "a prioritized set of actions that collectively
form a defense-in-depth set of best practices that mitigate the most common attacks against systems and networks".
Organizations seeking to implement a comprehensive security program or framework can use the controls to measure their
progress and prioritize security efforts. The Foundations Benchmark is just one of several guidelines that can help
reach the bar set by the CIS Controls. Refer to the Benchmark document directly to view how the recommendations map to
controls.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"56c0543c5fd2cf410b922c940c4a414a"}
##DOCS-SOURCER-END -->
