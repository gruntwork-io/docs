import BrowserWindow from '@site/src/components/BrowserWindow';

# Adding a new account

This document is a guide to how to add a new AWS account to your Reference Architecture. This is useful if you have a
need to expand the Reference Architecture with more accounts, like a test or sandbox account.

## Create new Account in your AWS Org

The first step to adding a new account is to create the new AWS Account in your AWS Organization. This can be done
either through the AWS Web Console, or by using the [Gruntwork CLI](https://github.com/gruntwork-io/gruntwork/). If you
are doing this via the CLI, you can run the following command to create the new account:

```bash
gruntwork aws create --account "<ACCOUNT_NAME>=<EMAIL_ADDRESS_FOR_ROOT_USER>"
```

Record the account name, AWS ID, and deploy order of the new account you just created in the
[accounts.json](/examples/for-production/infrastructure-live/accounts.json) file so that we can reference it throughout the process.

### Set the deploy order

The deploy order is the order in which the accounts are deployed when a common env file is modified (the files in
`_envcommon`). Note that the deploy order does not influence how changes to individual component configurations
(child Terragrunt configurations) are rolled out.

Set the deploy order depending on the role that the account plays and how you want changes to be promoted across your
environment.

General guidelines:

- The riskier the change would be, the higher you should set the deploy order. You'll have to determine the level of
  risk for each kind of change.
- The lowest deploy order should be set for `dev` and `sandbox` accounts. `dev` and `sandbox` accounts are typically the
  least risky to break because they only affect internal users, and thus the impact to the business of downtime to these
  accounts is limited.
- `prod` accounts should be deployed after all other app accounts (`dev`, `sandbox`, `stage`) because the risk of
  downtime is higher.
- It could make sense for `prod` accounts to be deployed last, after shared services accounts (`shared`, `logs`,
  `security`), but it depends on your risk level.
- Shared services accounts (`shared` and `logs`) should be deployed after the app accounts (`dev`, `sandbox`, `stage`,
  `prod`).
  - A potential outage in `shared` could prevent access to deploy old and new code to all of your environments (e.g.,
    a failed deploy of `account-baseline` could cause you to lose access to the ECR repos). This could be more
    damaging than just losing access to `prod`.
  - Similarly, an outage in `logs` could result in losing access to audit logs which can prevent detection of
    malicious activity, or loss of compliance.
- `security` should be deployed after all other accounts.
  - A potential outage in `security` could prevent loss of all access to all accounts, which will prevent you from
    making any changes, which is the highest impact to your operations. Therefore we recommend deploying security
    last.

For example, suppose you have the following folder structure:

```bash title="Infrastructure Live"
.
├── accounts.json
├── _envcommon
│   └── services
│       └── my-app.hcl
├── dev
│   └── us-east-1
│       └── dev
│           └── services
│               └── my-app
│                   └── terragrunt.hcl
│
├── stage
│   └── us-east-1
│       └── stage
│           └── services
│               └── my-app
│                   └── terragrunt.hcl
└── prod
    └── us-east-1
        └── prod
            └── services
                └── my-app
                    └── terragrunt.hcl
```

And suppose you had the following in your `accounts.json` file:

```json title="accounts.json"
{
  "logs": {
    "deploy_order": 5,
    "id": "111111111111",
    "root_user_email": ""
  },
  "security": {
    "deploy_order": 5,
    "id": "222222222222",
    "root_user_email": ""
  },
  "shared": {
    "deploy_order": 4,
    "id": "333333333333",
    "root_user_email": ""
  },
  "dev": {
    "deploy_order": 1,
    "id": "444444444444",
    "root_user_email": ""
  },
  "stage": {
    "deploy_order": 2,
    "id": "555555555555",
    "root_user_email": ""
  },
  "prod": {
    "deploy_order": 3,
    "id": "666666666666",
    "root_user_email": ""
  }
}
```

If you make a change in `_envcommon/services/my-app.hcl`, then the Infrastructure CI/CD pipeline will proceed to run
`plan` and `apply` in the deploy order specified in the `accounts.json` file. For the example, this means that the
pipeline will run `plan` and `apply` on `dev` first, then `stage`, and then finally `prod`. If anything fails in
between, then the pipeline will halt at that point. That is, if there is an error trying to deploy to `dev`, then the
pipeline will halt without moving to `stage` or `prod`.

If instead you made a change in `dev/us-east-1/dev/services/my-app/terragrunt.hcl` and
`prod/us-east-1/prod/services/my-app/terragrunt.hcl`, then the changes are applied simultaneously, ignoring the deploy
order. This is because a child config was updated directly, instead of the common configuration file. In this way, the
deploy order only influences the pipeline for updates to the common component configurations.

### Configure MFA

Once the account is created, log in using the root credentials and configure MFA using [this
document](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html#enable-virt-mfa-for-root) as a guide.

:::caution

It is critical to enable MFA as the root user can bypass just about any other security restrictions you put in place.

:::

:::tip

Make sure you keep a paper copy of the virtual device secret key so that
you have a backup in case you lose your MFA device.

:::

### Create a temporary IAM User

Once MFA is configured, set up a temporary IAM User with administrator access (the AWS managed IAM Policy
`AdministratorAccess`) and create an AWS Access key pair so you can authenticate on the command line.

:::note

At this point, you won't need to use the root credentials again until you are ready to delete the AWS account.

:::

## Update Logs, Security, and Shared accounts to allow cross account access

In the Reference Architecture, all the AWS activity logs are configured to be streamed to a dedicated `logs` account.
This ensures that having full access to a particular account does not necessarily grant you the ability to tamper with
audit logs.

In addition, all account access is managed by a central `security` account where the IAM Users are defined. This allows
you to manage access to accounts from a central location, and your users only need to manage a single set of AWS
credentials when accessing the environment.

If you are sharing encrypted AMIs, then you will also need to ensure the new account has access to the KMS key that
encrypts the AMI root device. This is managed in the `shared` account baseline module.

Finally, for the [ECS Deploy
Runner](https://github.com/gruntwork-io/terraform-aws-ci/tree/main/modules/ecs-deploy-runner) to work, the new account
needs to be able to access the secrets for accessing the remote repositories and the Docker images that back the build
runners. Both of these are stored in the `shared` account.

In order for this setup to work for each new account that is created, the `logs`, `security`, and `shared` accounts need
to be made aware of the new account. This is handled through the [accounts.json](/examples/for-production/infrastructure-live/accounts.json) file in your
`infrastructure-live` repository.

Once the `accounts.json` file is updated with the new account, you will want to grant the permissions for the new
account to access the shared resources. This can be done by running `terragrunt apply` in the `account-baseline` module
for the `logs`, `shared`, and `security` account, and the `ecr-repos` and `shared-secret-resource-policies` modules in the `shared`
account:

```bash
(cd logs/_global/account-baseline && terragrunt apply)
(cd security/_global/account-baseline && terragrunt apply)
(cd shared/_global/account-baseline && terragrunt apply)
(cd shared/us-west-2/_regional/ecr-repos && terragrunt apply)
(cd shared/us-west-2/_regional/shared-secret-resource-policies && terragrunt apply)
```

Each call to apply will show you the plan for making the cross account changes. Verify the plan looks correct, and then
approve it to apply the updated cross account permissions.

## Deploy the security baseline for the app account

Now that the cross account access is configured, you are ready to start provisioning the new account!

First, create a new folder for your account in `infrastructure-live`. The folder name should match the name of the AWS
account.

Once the folder is created, create the following sub-folders and files with the following content:

- ```json title="./infrastructure-live/account.hcl"
      locals {
        account_name = "<REPLACE_WITH_NAME_OF_ACCOUNT>"
      }
  ```

- ```bash title="./infrastructure-live/_global/region.hcl"
      # Modules in the account _global folder don't live in any specific AWS region, but you still have to send the API calls
      # to _some_ AWS region, so here we pick a default region to use for those API calls.
      locals {
        aws_region = "us-east-1"
      }
  ```

Next, copy over the `account-baseline` configuration from one of the application accounts (e.g., `dev`) and place it in
the `_global` folder:

```bash
cp -r dev/\_global/account-baseline <REPLACE_WITH_NAME_OF_ACCOUNT>/\_global/account-baseline
```

Open the `terragrunt.hcl` file in the `account-baseline` folder and sanity check the configuration. Make sure there are
no hard coded parameters that are specific to the dev account. If you have not touched the configuration since the
Reference Architecture was deployed, you won't need to change anything.

At this point, your folder structure for the new account should look like the following:

```bash
.
└── new-account
├── account.hcl
└── \_global
├── region.hcl
└── account-baseline
└── terragrunt.hcl

```

Once the folder structure looks correct and you have confirmed the `terragrunt.hcl` configuration is accurate, you are
ready to deploy the security baseline. Authenticate to the new account on the CLI (see [this blog
post](https://blog.gruntwork.io/a-comprehensive-guide-to-authenticating-to-aws-on-the-command-line-63656a686799) for
instructions) using the access credentials for the temporary IAM User you created above and run `terragrunt apply`.

When running `apply`, you will see the plan for applying all the security baseline to the new account. Verify the plan
looks correct, and then approve it roll out the security baseline.

At this point, you can now use the cross account access from the `security` account to authenticate to the new account.
Use your security account IAM User to assume the `allow-full-access-from-other-accounts` IAM Role in the new account to
confirm this.

Once you confirm you have access to the new account from the `security` account, login using the
`allow-full-access-from-other-accounts` IAM Role and remove the temporary IAM User as you will no longer need to use it.

## Deploy the ECS Deploy Runner

Once the security baseline is deployed on the new account, you can deploy the ECS Deploy Runner. With the ECS Deploy
Runner, you will be able to provision new resources in the new account.

To deploy the ECS Deploy Runner, copy the terragrunt configurations for `mgmt/vpc-mgmt` and `mgmt/ecs-deploy-runner`
from the `dev` account:

```bash
mkdir -p <REPLACE_WITH_NAME_OF_ACCOUNT>/us-west-2/mgmt
cp -r dev/us-west-2/mgmt/{vpc-mgmt,ecs-deploy-runner} <REPLACE_WITH_NAME_OF_ACCOUNT>/us-west-2/mgmt
```

Be sure to open the `terragrunt.hcl` file in the copied folders and sanity check the configuration. Make sure there are
no hard coded parameters that are specific to the dev account. If you have not touched the configuration since the
Reference Architecture was deployed, you won't need to change anything.

Once the configuration looks correct, go in to the `mgmt` folder and use `terragrunt run-all apply` to deploy the ECS
Deploy Runner:

```bash
cd <REPLACE_WITH_NAME_OF_ACCOUNT>/us-west-2/mgmt && terragrunt run-all apply
```

:::note

Because this uses `run-all`, the command will not pause to show you the plan. If you wish to view the plan,
run `apply` in each subfolder of the `mgmt` folder, in dependency graph order. You can see the dependency graph by using
the [graph-dependencies terragrunt
command](https://terragrunt.gruntwork.io/docs/reference/cli-options/#graph-dependencies).

:::

At this point, the ECS Deploy Runner is provisioned in the new account, and you can start using the Gruntwork Pipeline
to provision new infrastructure in the account.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "912dd9724ace4e73a6214d1cb12149a9"
}
##DOCS-SOURCER-END -->
