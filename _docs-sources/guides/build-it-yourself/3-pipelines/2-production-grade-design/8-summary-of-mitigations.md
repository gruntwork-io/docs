# Summary of mitigations

With this production design in mind, let’s take a look at how each of the design decisions addresses the concerns of the
threat model:

<div className="dlist">

#### Minimal access to target environments

All the infrastructure is deployed from within the accounts using a serverless platform. This means that attackers
that gain access to the underlying AWS secrets used by the CI environments will at most have the ability to run
deployments against a predefined set of code. This means that external attackers who do not have access to the source
code will at most be able to: (a) deploy code that has already been deployed before, (b) see the plan of the
infrastructure between two points of time. They will not be able to write arbitrary infrastructure code to read DB
secrets, for example. The IAM policies are set up such that the IAM user for CI only has
access to trigger predefined events. They do not have access to arbitrarily invoke the ECS task, as that could
potentially expose arbitrary deployments by modifying the command property (e.g., use a command to `echo` some
infrastructure code and run `terraform`).

</div>

    -   Note that there is still a risk of rolling back the existing infrastructure by attempting to deploy a previous
        version. See below for potential ways to mitigate this type of attack.

    -   Similarly, this alone does not mitigate threats from internal attackers who have access to the source code, as a
        potential attacker with access to the source code can write arbitrary code to destroy or lookup arbitrary
        infrastructure in the target environment. See below for potential ways to mitigate this type of attack.

<div className="dlist">

#### Minimal options for deployment

The Lambda function exposes a minimal interface for triggering deployments. Attackers will only be able to trigger a
deployment against a known repo and known git refs (branches, tags, etc). To further limit the scope, the lambda
function can be restricted to only allow references to repositories that matches a predefined regular expression.
Terraform Enterprise exposes similar configuration parameters to restrict what deployments can be triggered. This
prevents attackers from creating an open source repo with malicious code that they subsequently deploy by pointing the
deploy runner to it.

#### Restricted refs for `apply`

Since many CI systems depend on the pipeline being managed as code in the same repository, internal attackers can
easily circumvent approval flows by modifying the CI configuration on a test branch. This means that potential
attackers can run an `apply` to destroy the environment or open backdoors by running infrastructure code from test
branches without having the code approved. To mitigate this, the Lambda function allows specifying a list of git refs
(branches, tags, etc) as the source of `apply` and `apply-all`. If you limit the source of `apply` to only protected
branches (see below), it prevents attackers from having the ability to run `apply` unless it has been reviewed.

#### CI server does not need access to the source code

Since the deployments are being done remotely in separate infrastructure, the actual CI server does not need to make
any modifications to the code for the deployment. You can limit the CI server to read only access to the underlying
repository, limiting the damage from a potential breach of the CI server.

</div>

These mitigations alone will not prevent all attacks defined in the threat model. For example, an internal
attacker with access to the source code can still do damage to the target environments by merging in code that removes
all the infrastructure resources, thereby destroying all infrastructure when the `apply` command is run. Or, they could
expose secrets by writing infrastructure code that will leak the secrets in the logs via a `local-exec` provisioner.
However, the reality is that _any_ CI/CD solution can likely be compromised if an attacker has full access to your source code.

For these types of threats, your best bet is to implement various policies and controls on the source control repository
and build configurations:

<div className="dlist">

#### Use approval flows

In addition to providing a moment to pause and inspect the exact infrastructure changes that are about to be deployed,
approval workflows in the CI server can mitigate attacks such that attackers will need enough privileges on the CI
server to approve builds in order to actually modify infrastructure. This can mitigate potential attacks where the
attacker has access to the CI server to trigger arbitrary builds manually (e.g., to run a previous job that is deploying
an older version to roll back the infrastructure), but not enough access to approve the job. Note that this will not
mitigate potential threats from internal attackers who have enough permissions to approve builds.

#### Lock down VCS systems

As mentioned in the previous section, it is important that you implement various controls on the VCS repositories.
Once you implement a CI/CD pipeline, access to source code translates to access to your infrastructure environments,
so you will want to reflect the same kind of security controls you implement on your environments in your VCS
repositories.

#### Avoid logging secrets

Our threat model assumes that attackers can get access to the CI servers, which means they will have access to the
deployment logs. This will include detailed outputs from a `terraform plan` or `apply`. While it is impossible to
prevent terraform from leaking secrets into the state, it is possible to avoid terraform from logging sensitive
information. Make use of PGP encryption functions or encrypted environment variables / config files (in the case of
service deployments) to ensure sensitive data does not show up in the plan output. Additionally, tag sensitive outputs
with the `sensitive` keyword so that terraform will mask the outputs.

</div>
