# Module Defaults

Module defaults allow infrastructure as code developers to reference an OpenTofu/Terraform module, set locals, and set default (but mutable) variable values. This pattern helps keep Terragrunt architecture DRY, reducing the likelihood of errors when making changes across environments.

This pattern benefits both module developers and consumers:

- Module developers can centrally define defaults for consistent usage.
- Module consumers reduce repetitive code when leveraging the module.

:::note

The module defaults pattern was previously known as the "envcommon" pattern, stored in an `_envcommon` directory within the `infrastructure-live` repository. These are equivalent concepts, and references to "envcommon" can be directly mapped to module defaults.

:::

A helpful analogy is purchasing a car. The manufacturer offers a "base model" with several configurable options, such as interior upgrades, while ensuring the vehicle remains functional. Similarly, module defaults allow you to define a "base" resource, like an AWS RDS for a PostgreSQL instance. For example, consumers might receive a `db.t3.medium` instance with a `50GB` general-purpose SSD as the default. Consumers can override variables for increased memory, CPU, or storage in production without altering other configurations.

With module defaults established, the next step is defining a "defaults module" to implement this pattern effectively.
