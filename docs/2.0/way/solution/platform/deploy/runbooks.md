---
sidebar_position: 2
title: Runbooks
---

# Runbooks

**How developers configure an infrastructure module instance**

## What is the Runbooks component?

### The challenge

When a developer needs to deploy new infrastructure, per the principle of [define all live infrastructure as pattern instances](/2.0/way/principles/technical-foundations/define-all-live-infrastructure-as-pattern-instances), the developer will need a way to create a new [infrastructure module instance](/2.0/way/solution/patterns/types#infrastructure-module-instances). 

But creating a module instance can be complex! The developer may need to do any or all of the following:

- Write new code that calls the desired [infrastructure module](/2.0/way/solution/patterns/types#infrastructure-modules) (e.g. a Terragrunt unit)
- Compose many infrastructure modules together to achieve a more complex use case
- Confirm that they meet all pre-requisites to use a given infrastructure module
- Perform other actions needed to meet the pre-requisites (e.g. obtain a new internal API key)
- "Apply" the code they generated
- Validate that a pattern was created successfully

The breath and depth of these requirements impose a heavy burden on the humble developer who wishes only to deploy a pattern so they can get back to their real job of building their app. 

### The solution

The solution is to make meeting the requirements above easy for the developer by encapsulating all required expertise into an intuitive, streamlined format.

One format for accomplishing this is the **runbook.** We call this format a runbook because users will go through a sequence of individual steps that, once finished, achieve a configured instance of the desired infrastructure module.

A first-class Runbook should be able to do all the following:

- Run pre-flight checks to ensure the user is "ready" to instantiate the module
- Perform "side effects" like requesting an API key, or installing new local tools
- Enable the user to configure the module with custom parameter values
- Generate the relevant code
- Validate that the infrastructure module instance deployed correctly by running post-flight checks

Runbooks pack a wide collection of functionality into a single format, so we explore some real-world options below.

### Developer self-service

A common industry term is "developer self-service." We can now assert a definition of developer self-service using the terms we've introduced so far.

Specifically, developer self-service is the combination of a [catalog](./catalog.md) of infrastructure modules that meet the most common infrastructure needs, plus the ability to use **runbooks,** plus a way to deploy the generated using a [pipeline](./pipelines.md).

## Effective runbooks

### Minimum requirements

To qualify as a runbook, you need to at least meet the following requirements. A runbook must:

- **Expose parameter values.** The user can see a list of the parameter values available.
- **Configure parameter values.** The user can configure the parameter values.
- **Generate code.** The user can instantiate an [infrastructure module](/2.0/way/solution/patterns/types#infrastructure-modules), either by generating code or other means.

### Effective runbooks

To be an _effective_ runbook, we need a few more requirements. Effective runbooks are/do:

#### General

- **Easily authored.** It must be easy for runbook authors to capture their expertise.
- **Easily launched.** It must be easy for the runbook consumer to begin using the runbook.
- **Documented.** The runbook must teach the user about this particular area of subject matter expertise, intermixing documentation and interactivity.
- **Testable.** A runbook must be programmatically testable so that you can continually validate that it functions as expected.immediately see how that impacts the generated code. 
- **Capture feedback.** The runbook must expose a way for runbook consumers to share feedback about their experience and request improvements.

#### Code execution

- **Run arbitrary code.** To check pre-requisites, perform "side effects" (like requesting an API key), and validate post-apply correctness, users need to run arbitrary code written in standard programming languages.
- **Real-time.** When users execute arbitrary code to run pre-flight checks, post-flight checks, or achieve side effects, they should see what is happening in real-time.
- **Secure.** The ability to run arbitrary code needs to be paired with a strong security posture that ensures only trusted code is executed.

#### Configuration

- **Read external data.** An infrastructure module instance often needs data from other module instances or other sources, so the runbook must be able to "import" these values somehow.
- **Adaptive.** As users fill in configuration values, some configuration options are disabled and new options are revealed.

## Runbook options

You have several options when implementing a runbooks. In order from least favorable to most favorable:

### Static documentation

You can describe in writing how a user would create the code necessary to instantiate an infrastructure module, how they would identify the parameter values, and how to configure those values. 

You _can_ do all of this, but as you'll see shortly, there are better options.

### Code templates

You can define a template that generates the code necessary to instantiate an infrastructure module, and then give some mechanism for users to specify parameters.

For example, the command [terragrunt scaffold](https://terragrunt.gruntwork.io/docs/features/scaffold/) expects a parameter for an OpenTofu/Terraform module URL and will then generate a template that looks like this:

```hcl
# This is a Terragrunt unit generated by Gruntwork Boilerplate.
terraform {
  source = "git::https://github.com/gruntwork-io/terragrunt-infrastructure-modules-example.git//modules/mysql?ref=v0.8.1"
}

inputs = {
  # --------------------------------------------------------------------------------------------------------------------
  # Required input variables
  # --------------------------------------------------------------------------------------------------------------------

  # Type: string
  # Description: The AWS region to deploy to (e.g. us-east-1)
  aws_region = "" # TODO: fill in value

  # Type: string
  # Description: The name of the DB
  name = "" # TODO: fill in value

  # Type: string
  # Description: The instance class of the DB (e.g. db.t2.micro)
  instance_class = "" # TODO: fill in value

  # (... full list of inputs omitted for brevity ...)
}
```

This improves on using static documentation because we offer the user a pre-set opinion on how to generate inputs. Rather than telling the user how to write this code, we can now tell them how to generate a template that writes the code.

Better yet, either the process of generating the code includes a step to configure variables, or the template itself can leave placeholders for users to enter variables (as it does above).

:::info
Gruntwork maintains an open source template generator built specially for DevOps and platform engineering called **Gruntwork Boilerplate.** Learn more at https://github.com/gruntwork-io/boilerplate.
:::

### Infrastructure module UI

You can build (or buy) a solution that renders a UI for a given infrastructure module. The UI lists the available parameter values, and users fill in those values directly through the UI. Ideally, the UI can allow users to fetch value from external data sources such as infrastructure-as-code state, a secrets manager, or a third-party cool.

The primary limitation of the infrastructure module UI is that, by definition, it is scoped to a single infrastructure module. 

### Infrastructure template UI

An infrastructure template UI renders a UI not around an infrastructure module, but around a [code template](#code-templates). This makes it more powerful because a code template could generate a single infrastructure module instance, or a collection of infrastructure module instances, or really anything.

Beyond that, the functionality is the same. The UI lists the available parameters, and users fill in those values directly through the UI. The template then renders based on those input parameters.

### First-class runbooks

It's not a common solution, but the best option is to combine an [infrastructure template UI](#infrastructure-template-ui) with the ability to execute arbitrary code, all in a format that's easy to document, test, and author.

:::info
Gruntwork maintains an open source tool called [Gruntwork Runbooks](https://runbooks.gruntwork.io/) that is based on all the insights and philosophy that we capture here. Check it out! 
:::
