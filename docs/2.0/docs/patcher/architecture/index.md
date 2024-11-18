# Patcher Architecture

## Overview

Patcher scans infrastructure dependencies to provide updates to an IaC codebase, based on the upstream updates to those dependencies. 

The following image depicts the core Patcher engine, which powers both the GitHub Action and the Patcher-CLI. 

![Architecture Overview Diagram](/img/patcher/architecture.png)

Here is a short overview of each process:

- **Provider**. Allows Patcher to discover dependencies by delegating to different provider implementations like Terraform, Terragrunt, etc.
- **Datasources**. Allows Patcher to lookup new versions and discover patches from different sources like GitHub or the filesystem.
- **Update Operation**. This process provides the core functionalities for managing an update operation for dependencies. It includes methods for setting the target dependency, updating dependencies and their usages, tracking completed updates, handling errors, and managing repository configurations. The update operation is reset after each update.
- **Patch Manager**. The Patch Manager is responsible for discovering and applying patches.
- **Container Runtime**. This process defines an interface for managing containers. It provides functionalities to build and run container images, validate image names, and parse image strings. It also includes configurations for container properties and host dependencies.
- **Update Summary**. This process provides functionality to create an update summary. It aggregates information about completed dependency updates, errors encountered during updates, and updates with breaking changes. It also generates a summary using a TUI component.

Additionally, the Patcher engine streams events using Go channels. This strategy is currently used to stream real-time updates to the TUI without blocking the UI.

## Patcher Engine States

The Patcher engine operates as a state machine with the following states:

```go
const (
  // NotStarted is when the Patcher engine is created initially before any operation
  NotStarted State = iota
  // Discovering is when Patcher is scanning files for dependencies
  Discovering
  // Updating is when Patcher is updating dependencies and applying patches
  Updating
  // Success is when an upgrade has completed successfully
  Success
  // Failure is when an upgrade has failed
  Failure
)
```

## Discovering and Extracting Dependencies

Dependencies are discovered and extracted using the concept of “providers”. We support both a Terraform/OpenTofu and Terragrunt provider. Currently, the provider logic only works on filename patterns, but in theory this logic could be extended to support remote sources as a database or SCM provider. Searching for provider dependencies and updates will cause the following operations to occur:

1. Patcher will begin walking the specified working directory tree using all available providers to discover files that match a registered filename pattern.
2. It then performs a second pass on each matched file to extract one or more dependencies.
3. Finally, dependencies are optionally resolved using a datasource. Resolving makes each dependency aware of any new versions.
