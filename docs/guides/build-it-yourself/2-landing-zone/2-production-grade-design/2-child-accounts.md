# Child accounts

The admins in the root account can create the following child accounts in your AWS organization:


<div className="dlist">

#### Security account

You will want a single _security account_ for managing authentication and authorization. This account is not used to
run any infrastructure. Instead, this is where you define all of the IAM users and IAM groups for your team (unless
you’re using [Federated auth](./federated-auth), as described later). None of the other child accounts will have IAM users; instead,
those accounts will have IAM roles that can be assumed from the security account. That way, each person on your team
will have a single IAM user and a single set of credentials in the security account (with the exception of the small
number of admins who will also have a separate IAM user in the root account) and they will be able to access the
other accounts by assuming IAM roles.

#### Application accounts (dev, stage, prod)

You can have one or more _application accounts_ for running your software. At a bare minimum, most companies will
have a production account ("prod"), for running user-facing software, and a staging account ("stage") which is a
replica of production (albeit with smaller or fewer servers to save money) used for internal testing. Some teams will
have more pre-prod environments (e.g., dev, qa, uat) and some may find the need for more than one prod account (e.g.,
a separate account for backup and/or disaster recovery, or separate accounts to separate workloads with and without
compliance requirements).

#### Shared-services account

The _shared-services account_ is used for infrastructure and data that is shared amongst all the application
accounts, such as CI servers and artifact repositories. For example, in your shared-services account, you might use
[ECR](https://aws.amazon.com/ecr/) to store Docker images and Jenkins to deploy those Docker images to dev, stage, and
prod. Since the shared-services account may provide resources to (e.g., application packages) and has access to
most of your other accounts (e.g., for deployments), including production, from a security perspective, you should
treat it as a production account, and use at least the same level of precaution when locking everything down.

#### Sandbox accounts

You may want to have one or more _sandbox accounts_ that developers can use for manual testing. The application
accounts (e.g., dev and stage) are usually shared by the whole company, so these sandbox accounts are intentionally
kept separate so that developers can feel comfortable deploying and undeploying anything they want without
fear of affecting someone else (in fact, the gold standard is one sandbox account per developer to keep things 100%
isolated).

#### Testing accounts

One other type of account that often comes in handy is a _testing account_ that is used specifically for automated
tests that spin up and tear down lots of AWS infrastructure. For example, at Gruntwork, we use
[Terratest](https://blog.gruntwork.io/open-sourcing-terratest-a-swiss-army-knife-for-testing-infrastructure-code-5d883336fcd5)
to test all of our infrastructure code, and when testing something like our
[Vault modules](https://github.com/hashicorp/terraform-aws-vault/), we end up spinning up and tearing down a dozen
Vault and Consul clusters after every single commit. You don’t want all this infrastructure churn in your application
or sandbox accounts, so we recommend having a separate AWS account dedicated for automated tests.

#### Logs account

You will want a single _logs account_ for aggregating log data. All the other accounts—root, security, application
accounts, shared-services, etc.—will send their AWS Config and CloudTrail data to this account so that you have a
single, central place where all logs are stored and can be viewed. This account will also contain a KMS customer
master key (CMK) that is used to encrypt CloudTrail logs.


</div>

Note that for larger organizations with multiple separate business units, you may need to repeat the structure above
multiple times. That is, in the root account, you
[create an Organization Unit](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_ous.html#create_ou)
for each business unit, and within each Organization Unit, you create a set of application, shared-services, sandbox,
and testing accounts (security and logs accounts are usually shared across the entire organization). It’s not unusual
for large organizations to have dozens or even hundreds of AWS accounts.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"59749cc69175511bee412377b15e200b"}
##DOCS-SOURCER-END -->
