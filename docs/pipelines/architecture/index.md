# Architecture

There are three components in pipelines - the orchestrator, the dispatcher, and the executor. The orchestrator determines the jobs that needs to be executed, the dispatcher takes each job as input and calls the executor then reports the status of the job. Each component is explained in detail in sections below.

## Orchestrator

The orchestrator identifies each infrastructure change in the Pull Request or git commit, classifies the type of infrastructure change it is (e.g. AccountAdded, ModuleChanged, EnvCommonChanged) and determines the right pipelines actions (e.g., terragrunt plan, apply, or destroy) to run based on that infrastructure change. For each infrastructure change, it calls the dispatcher.

## Dispatcher

The dispatcher takes an infrastructure change, a pipelines action, and parameters as input. Then, it calls the executor to run the action on the infrastructure change. Once complete, the dispatcher creates a Pull Request comment (for PR workflows) or a GitHub issue (for pushes to main) with a link to the GitHub logs

## Executor

The executor takes a pipeline action and infra change as input then performs the action on the infra change. In some cases, like responding to AccountAdded events on merge, the executor will create a Pull Request in the infrastructure-live repository with additional IaC code to provision additional resources.

## Execution Flow

Pipelines starts with an event in GitHub - a Pull Request being created, synchronized, or re-opened, and a PR being merged to main (e.g., a push to main). From there, the orchestrator determines the infra-change set and appropriate action to run for each infra-change. The dispatcher then sends the information to the dispatcher, which calls the executor and waits for it to complete. Once complete, the status of the execution is reported to the calling Pull Request in a comment or as a GitHub issue if an apply or destroy fails.

![Gruntwork Pipelines Execution Flow](/img/pipelines/how-it-works/pipelines_execution_flow.png)


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "97373ff12588ec9018a63cb0e7e27a2a"
}
##DOCS-SOURCER-END -->
