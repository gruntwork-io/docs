# What are Module Defaults?

Module Defaults is a pattern that allows infrastructure as code developers to reference a terraform module, set locals, and set default (but mutable) default variable values. This pattern helps keep your Terragrunt architecture DRY, reducing the likelihood of errors when making changes across environments.

This patterns has benefits for module developers and consumers — Engineers developing modules can centrally define defaults that can be applied to all usage while engineers consuming modules don't have to repeat as much code when leveraging the module.

One analogy is to think about Module Defaults in the same way you might think about purchasing a new car. The manufacturer offers a "base model" with several configurable options, such as interior upgrades, but at the end of the purchase you will have a car. As the purchaser, you might just need the base model without any upgrades, or you may upgrade the stereo to a premium option.

Similarly, with Module Defaults you may define a "base" resource, such as an AWS RDS for PostgreSQL instance. By default, all consumers of the module might get a `db.t3.medium` instance with a `50gb`  general purpose SSD. While this might work in the majority of your environments, for a production deployment you might need an instance with more memory, CPU, and storage space. With Module Defaults, you would simplify override the variable names for the instance size/type and the amount of desired storage. Everything else remains the same.

Now that we've established what the Module Defaults pattern is and how it can help simplify your infrastructure as code, let's dive into how you can define an Module Defaults module.
