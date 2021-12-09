# Limit triggers for deploy server

The deploy server should only expose a limited set of options for triggering deployments. That is, it should not allow
arbitrary deployments on arbitrary code. For example, the default configuration of Atlantis allows webhooks from any
repository. This means that any public repo can cause your Atlantis server to run `terraform plan` and `terraform apply`
on custom code you do not control using the permissions granted to that server. Instead, you will want to configure it
so that only certain repositories, branches, and users can trigger the workflow.

The Gruntwork ECS Deploy Runner stack mitigates this concern by only allowing triggers from a Lambda function that
exposes a limited set of actions against the deploy runner task. The lambda function:

- Requires a single repository to trigger deployments by default.

- Can be configured to limit deployments to specific branches.

- Requires explicit IAM permissions to trigger.

You can find similar mechanisms for limiting deployments in the various deploy server options.
