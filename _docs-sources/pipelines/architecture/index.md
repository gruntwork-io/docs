# Architecture

## Overview

There are three major components in the Gruntwork Pipelines architecture:

1. The orchestrator
2. The dispatcher
3. The executor

### The orchestrator

The orchestrator identifies each [infrastructure change](../core-concepts/#infrastructure-change) in the Pull Request or git commit, classifies the type of infrastructure change it is (e.g. NewAwsAccount vs. OpenTfModuleUpdate) and determines the right [pipelines actions](../core-concepts/#pipelines-actions) to run based on that infrastructure change. For each infrastructure change, it calls the dispatcher.

### The dispatcher

The dispatcher takes as input an infrastructure change and a list of which pipelines actions to run with along with what parameters, and calls the executor to run these actions on the right infrastructure change.

### The executor

The executor executes an ordered list of pipelines actions against a specific pull request or git commit in response to a specific infrastructure. It then posts the status and output of these pipelines actions to the pull request, or takes other actions to ensure that the user has visibility into what happened.

## Execution Flow

You can see these components in action below:

![Gruntwork Pipelines Execution Flow](/img/pipelines/how-it-works/pipelines_execution_flow.png)


## Separating execution from configuration

Infrastructure pipelines typically require admin-level permissions to deploy virtually any infrastructure. This makes them high-risk security targets. An attacker who gains access to the infrastructure pipeline would likely have the power to destroy the entire cloud architecture.

To mitigate this threat, a key design decision in Gruntwork Pipelines is to separate code that is _executed_ by Pipelines from code that changes the _configuration_ of Pipelines.

The code that is executed by Pipelines is typically defined in a dedicated git repo (commonly named `infrastructure-live`) whose purpose is to describe all deployed infrastructure. The code that configures how Pipelines deployments are done lives in a different git repo (commonly named `infrastructure-pipelines`).

GitHub events in the `infrastructure-live` repo trigger the executor to run as a GitHub Actions workflow in the `infrastructure-pipelines` repo. That workflows runs the relevant [pipeline action](../core-concepts/#pipelines-actions) such as the appropriate `terragrunt` commands on the changed code to perform changes to your infrastructure.


This split into an `infrastructure-live` and `infrastructure-pipelines` repo allows your team to have many collaborators for your infrastructure-as-code (IaC) in your `infrastructure-live` repo, while permitting a limited set of administrator users to configure the workflows in `infrastructure-pipelines` that can access your AWS environments. As one example, only administrator users can add the ability to run a new [pipeline action](../core-concepts/#pipelines-actions). But once added, any users with access to your `infrastructure-live` repo can leverage that pipelines action.

You can see the two-repo architecture visualized below, where a change made to the `infrastructure-live` repo triggers a GitHub Actions Workflow that triggers a second GitHub Actions Workflow in the `infrastructure-pipelines` repo, which has access to the privileged AWS access and the original `infrastrucutre-live` repo.

![Gruntwork Pipelines Architecture](/img/pipelines/how-it-works/pipelines_architecture.png)
