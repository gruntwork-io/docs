# Use generic CI/CD platforms as a workflow engine but run infrastructure deployments from within your account

Given the limitations and tradeoffs of the various platforms we covered in [CI/CD platforms](#cicd_platforms), we don’t recommend
relying on a single platform for implementing the entire workflow. Instead, we recommend a hybrid solution that takes
advantage of the strengths of each platform, and cover the weaknesses. The design looks as follows:

- Deploy a self-hosted deploy server within your AWS account that has the permissions it needs to run infrastructure
  deployments and is locked down so it is only accessible via a trigger that can be used to run pre-defined commands
  (e.g., `terraform plan` and `terraform apply`) in pre-defined repos (e.g., `infrastructure-live`).

- Use any generic CI/CD server (e.g., Jenkins, CircleCI, GitLab) to implement a CI/CD workflow where you trigger a
  dry-run in the deploy server (e.g., `terraform plan`), get approval to proceed from an admin on your team (e.g., via a
  Slack notification), and then trigger a deployment in the deploy server (e.g., `terraform apply`).

- Define your CI workflows so that the CI/CD server triggers deployments against the deploy server.

This design implements separation of the concerns so that we take full advantage of the strengths of each platform,
while covering the weaknesses: relying on the CI/CD platforms to manage the workflow/pipeline, but having it trigger
infrastructure deployments on self-hosted systems that are more locked down.

We don’t want to give the CI/CD servers permissions to deploy and manage arbitrary infrastructure. CI/CD servers are
typically not secure enough to handle sensitive information, and you don’t want a server that is used for executing
arbitrary code and regularly used (and written to) by your entire dev team to have admin permissions.

Instead, we delegate this responsibility to an isolated, closed off system in the AWS account that only exposes a limited
set of actions that can be triggered. That way, if anyone gets access to your CI server, they can at most kick off
builds on existing code, but they don’t get arbitrary admin access.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"d635c72afed87b9cf52f221709e991ce"}
##DOCS-SOURCER-END -->
