# Module Defaults

Module defaults is a pattern that allows infrastructure as code developers to reference a terraform module, set locals, and set default (but mutable) variable values. This pattern helps keep your Terragrunt architecture DRY, reducing the likelihood of errors when making changes across environments.

This patterns has benefits for both module developers and consumers:

- Module developers can centrally define defaults that can be applied to all usage.
- Module consumers don’t have to repeat as much code when leveraging the module.

:::note

The module defaults pattern was previously known as the "envcommon" pattern (and stored in an `_envcommon` directory of the `infrastructure-live` repo. These are equivalent concepts, so any knowledge base posts or other material referencing "envcommon" can be directly mapped to the concept of module defaults.)

:::

One analogy is to think about module defaults in the same way you might think about purchasing a new car. The manufacturer offers a "base model" with several configurable options, such as interior upgrades, but at the end of the purchase you will have a car. As the purchaser, you might just need the base model without any upgrades, or you may upgrade the stereo to a premium option.

Similarly, with module defaults you may define a "base" resource, such as an AWS RDS for PostgreSQL instance. By default, all consumers of the module might get a `db.t3.medium` instance with a `50gb` general purpose SSD. While this might work in the majority of your environments, for a production deployment you might need an instance with more memory, CPU, and storage space. With module defaults, you would simply override the variable names for the instance size/type and the amount of desired storage. Everything else remains the same.

Now that we’ve established what the module defaults pattern is and how it can help simplify your infrastructure as code, let’s dive into how you can define a "defaults module" that implements the pattern.
