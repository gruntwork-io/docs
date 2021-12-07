## Define pipeline as code

This guide will use [CircleCI](https://circleci.com/) as the CI server, but **it is NOT required for using the ECS
Deploy Runner stack**. You can configure any other CI server in a similar fashion to invoke deployments against the ECS
Deploy Runner.

Now that we have a working ECS Deploy Runner stack, the final step is to configure our CI/CD pipeline in our CI server
of choice. For this guide, we will configure CircleCI to implement the workflow described at the beginning of this
section.

Create the CircleCI configuration folder in your `infrastructure-live` repo:

    infrastructure-live
      └ .circleci
        └ config.yml
        └ deploy.sh
        └ install.sh
      └ production
        └ terragrunt.hcl
        └ us-east-2
          └ prod
            └ cicd
              └ ecr-repo
                └ terragrunt.hcl
              └ ecs-deploy-runner
                └ terragrunt.hcl
            └ networking
              └ vpc-mgmt
                └ terragrunt.hcl

The scripts `deploy.sh` and `install.sh` are helper scripts to make the CircleCI configuration more readable. Here are
the contents of the scripts:

**infrastructure-live/.circleci/install.sh**

```bash
#!/bin/bash
#
# Script used by CircleCI to install the necessary helpers for the CI/CD pipeline
#
# Required environment variables:
# - GRUNTWORK_INSTALLER_VERSION : The version of the gruntwork-installer helper utility used to install scripts from the
#                                 Gruntwork IaC Library.
# - MODULE_CI_VERSION : The version of the module-ci repository to use when installing the terraform helpers and
#                       infrastructure-deployer CLI.
# - MODULE_SECURITY_VERSION : The version of the module-security repository to use when installing the aws-auth utility.
#

set -e

function run {
  local -r gruntwork_installer_version="$1"
  local -r module_ci_version="$2"
  local -r module_security_version="$3"

  curl -Ls https://raw.githubusercontent.com/gruntwork-io/gruntwork-installer/master/bootstrap-gruntwork-installer.sh \
    | bash /dev/stdin --version "$gruntwork_installer_version"
  gruntwork-install --repo "https://github.com/gruntwork-io/module-ci" \
    --binary-name "infrastructure-deployer" \
    --tag "$module_ci_version"
  gruntwork-install --repo "https://github.com/gruntwork-io/module-ci" \
    --module-name "terraform-helpers" \
    --tag "$module_ci_version"
  gruntwork-install --repo "https://github.com/gruntwork-io/module-security" \
    --module-name "aws-auth" \
    --tag "$module_security_version"
}

run "${GRUNTWORK_INSTALLER_VERSION}" "${MODULE_CI_VERSION}" "${MODULE_SECURITY_VERSION}"
```

**infrastructure-live/.circleci/deploy.sh**

```bash
#!/bin/bash
#
# Script used by CircleCI to trigger deployments via the infrastructure-deployer CLI utility.
#
# Required positional arguments, in order:
# - REGION : The AWS Region where the ECS Deploy Runner exists.
# - SOURCE_REF : The starting point for identifying all the changes. The diff between SOURCE_REF and REF will be
#                evaluated to determine all the changed files.
# - REF : The end point for identifying all the changes. The diff between SOURCE_REF and REF will be evaluated to
#         determine all the changed files.
# - COMMAND : The command to run. Should be one of plan or apply.
#

set -e

# A function that uses aws-auth to assume the IAM role for invoking the ECS Deploy Runner.
function assume_role_for_environment {
  local -r environment="$1"

  # NOTE: Make sure to set the respective ACCOUNT_ID to the AWS account ID for each of the environments.
  if [[ "$environment" == "production" ]]; then
    aws-auth --role-arn "arn:aws:iam::<PRODUCTION_ACCOUNT_ID>:role/allow-auto-deploy-from-other-accounts"
  elif [[ "$environment" == "staging" ]]; then
    aws-auth --role-arn "arn:aws:iam::<STAGING_ACCOUNT_ID>:role/allow-auto-deploy-from-other-accounts"
  else
    echo "ERROR: Unknown environment $environment. Can not assume role."
    exit 1
  fi
}

# Function that invoke the ECS Deploy Runner using the infrastructure-deployer CLI. This will also make sure to assume
# the correct IAM role based on the deploy path.
function invoke_infrastructure_deployer {
  local -r region="$1"
  local -r ref="$2"
  local -r command="$3"
  local -r deploy_path="$4"

  local assume_role_exports
  if [[ $deploy_path =~ ^([^/]+)/.+$ ]]; then
    assume_role_exports="$(assume_role_for_environment "${BASH_REMATCH[1]}")"
  else
    echo "ERROR: Could not extract environment from deployment path $deploy_path."
    exit 1
  fi

  local container
  if [[ "$command" == "plan" ]] || [[ "$command" == "plan-all" ]] || [[ "$command" == "validate" ]] || [[ "$command" == "validate-all" ]]; then
    container="terraform-planner"
  else
    container="terraform-applier"
  fi

  (eval "$assume_role_exports" && \
    infrastructure-deployer --aws-region "$region" -- "$container" infrastructure-deploy-script --ref "$ref" --binary "terragrunt" --command "$command" --deploy-path "$deploy_path")
}

function run {
  local -r region="$1"
  local -r source_ref="$2"
  local -r ref="$3"
  local -r command="$4"

  # We must export the functions so that they can be invoked through xargs
  export -f invoke_infrastructure_deployer
  export -f assume_role_for_environment

  # Use git-updated-folders to find all the terragrunt modules that changed, and pipe that through to the
  # infrastructure-deployer.
  # NOTE: the tee in the middle of the pipeline is used so we can see the detected folders that were updated in the
  # logs. The last step is a check to see if there was any output from the previous command, which will be empty if no
  # modules were updated.
  git-updated-folders --source-ref "$source_ref" --terragrunt \
    | tee /dev/tty \
    | xargs -I{} --no-run-if-empty \
        bash -c "invoke_infrastructure_deployer \"$region\" \"$ref\" \"$command\" {}" \
    |& bash -c "grep . || echo 'No terragrunt modules were updated. Skipping plan.'"
}

run "$@"
```

We will call out to these scripts in the CI pipeline to setup our environment for the deployments. With the scripts
defined, let’s start building out our CircleCI config. We will start by defining the workflows, which acts as the basis
of our pipeline:

**infrastructure-live/.circleci/config.yml**

```yaml
version: 2.1

workflows:
  continuous-deploy:
    jobs:
      - plan

      - notify:
          requires:
            - plan
          filters:
            branches:
              only: master

      - hold:
          type: approval
          requires:
            - notify
          filters:
            branches:
              only: master

      - deploy:
          requires:
            - hold
          filters:
            branches:
              only: master
```

Our workflow consists of four steps:

- `plan`: Run `terragrunt plan` on all the files that changed. This is run on commits to all branches.

- `notify`: Notify on slack that there is an approval available for review. This should only run on `master` (our
  deployment branch). The rest of the pipeline will also only be restricted to commits on `master`.

- `hold`: The approval stage. We will hold all deployments for approval after running plan, but before proceeding to
  running `terragrunt apply` so that an admin has a chance to review the exact changes that are about to be
  rolled out.

- `deploy`: Run `terragrunt apply` on all the files that changed. This should only happen after approval.

Next, we will update our config to start defining the jobs. Since all the jobs will have common elements, we will
define a few aliases in the config to reuse common components.

The first is the runtime environment of each job:

**infrastructure-live/.circleci/config.yml**

```yaml
# Global constants for the jobs. This includes:
# - Using machine executor
# - Tools versions
defaults: &defaults
  machine:
    image: "ubuntu-1604:201903-01"
  environment:
    GRUNTWORK_INSTALLER_VERSION: v0.0.22
    MODULE_CI_VERSION: v0.27.2
    MODULE_SECURITY_VERSION: v0.24.1
    REGION: us-east-2
```

We will also want to figure out a friendly name for the deployment. CircleCI gives us a few environment variables that
are related to the commit that has triggered the build, but for notification purposes we would like to know whether the
build is a tag, branch, or SHA. The following routine updates the runtime with the environment variable
`CIRCLE_FRIENDLY_REF` which tells us whether the change was a tag, branch, or bare commit:

**infrastructure-live/.circleci/config.yml**

```yaml
# This common step is used to determine the user friendly Git Ref name of the build, either the branch or tag.
set_friendly_git_ref: &set_friendly_git_ref
  run:
    name: set friendly git ref name
    command: |
      if [[ ! -z "$CIRCLE_TAG" ]]; then
        echo 'export CIRCLE_FRIENDLY_REF="$CIRCLE_TAG"' >> $BASH_ENV
      elif [[ ! -z "$CIRCLE_BRANCH" ]]; then
        echo 'export CIRCLE_FRIENDLY_REF="$CIRCLE_BRANCH"' >> $BASH_ENV
      else
        echo 'export CIRCLE_FRIENDLY_REF="$CIRCLE_SHA1"' >> $BASH_ENV
      fi
```

We also need to know what the base comparison point is for finding updated modules. We will set this as the environment
variable `SOURCE_REF` in the runtime environment:

**infrastructure-live/.circleci/config.yml**

```yaml
# This is used to determine what to use as the base comparison point for determining what modules to deploy. The logic
# is as follows:
#   - If we are on the master branch, the comparison is only the current commit.
#   - If we are not on master, the comparison is to the current state of the master branch.
set_source_ref: &set_source_ref
  run:
    name: set source ref
    command: |
      if [[ "$CIRCLE_BRANCH" == "master" ]]; then
        echo 'export SOURCE_REF=HEAD^' >> $BASH_ENV
      else
        # We have to use origin/master because the checkout routine in CircleCI sets the local master to HEAD.
        echo 'export SOURCE_REF=origin/master' >> $BASH_ENV
      fi
```

Finally, we need to import functionality to notify on Slack. We will use the
[official Slack Orb](https://github.com/CircleCI-Public/slack-orb) from CircleCI:

**infrastructure-live/.circleci/config.yml**

```yaml
orbs:
  slack: circleci/slack@3.4.2
```

Once we have the common elements defined as aliases, we can start defining each of the jobs. We will start with the
`plan` job:

**infrastructure-live/.circleci/config.yml**

```yaml
  plan:
    <<: *defaults
    steps:
      - <<: *set_friendly_git_ref
      - <<: *set_source_ref
      - checkout
      - run:
          name: install utilities
          command: ./.circleci/install.sh
      - run:
          name: run plan
          command: ./.circleci/deploy.sh "$REGION" "$SOURCE_REF" "$CIRCLE_SHA1" plan
      - slack/status:
          channel: workflow-approvals
          success_message: "PLAN from $CIRCLE_FRIENDLY_REF ($CIRCLE_SHA1) successful. Click 'Visit Job' to see output."
          failure_message: "PLAN from $CIRCLE_FRIENDLY_REF ($CIRCLE_SHA1) failed. Click 'Visit Job' to see output."
```

This job will do the following:

- Set common environment variables for knowing a friendly name for the git ref that triggered the change and the source
  ref for the changes.

- Checkout the code in the repository.

- Call `install.sh` which will install gruntwork utilities necessary for invoking a deployment.

- Call `deploy.sh` which will use the `git-updated-folders` and `infrastructure-deployer` utilities to run plan on the
  updated modules.

- Notify in the `workflow-approvals` slack channel whether the plan was successful or had failed.

Next, we will define the `deploy` job, which will closely resemble the `plan` job:

**infrastructure-live/.circleci/config.yml**

```yaml
  deploy:
    <<: *defaults
    steps:
      - <<: *set_friendly_git_ref
      - <<: *set_source_ref
      - slack/notify:
          channel: workflow-approvals
          message: "A deployment was approved by $CIRCLE_USERNAME for $CIRCLE_FRIENDLY_REF ($CIRCLE_SHA1). Click 'Visit Job' to see output."
      - checkout
      - run:
          name: install utilities
          command: ./.circleci/install.sh
      - run:
          name: run apply
          command: ./.circleci/deploy.sh "$REGION" "$SOURCE_REF" "$CIRCLE_BRANCH" apply
      - slack/status:
          channel: workflow-approvals
          success_message: "APPLY from $CIRCLE_FRIENDLY_REF ($CIRCLE_SHA1) was successful. Click 'Visit Job' to see output."
          failure_message: "APPLY from $CIRCLE_FRIENDLY_REF ($CIRCLE_SHA1) failed. Click 'Visit Job' to see output."
```

This is very similar to the `plan` job, with two differences:

- Before invoking the deployment, send a message to the `workflow-approvals` slack channel indicating that a deployment
  had started in response to an approval event.

- Call `apply` instead of `plan`.

Finally, we define the jobs for the approval notifications:

**infrastructure-live/.circleci/config.yml**

```yaml
  notify:
    <<: *defaults
    steps:
      - <<: *set_friendly_git_ref
      - slack/approval:
          channel: workflow-approvals
          message: "A deployment for $CIRCLE_FRIENDLY_REF ($CIRCLE_SHA1) is pending approval. Click 'Visit Workflow' to approve."
```

This job will send a message to the `workflow-approvals` slack channel that there is a deployment that is pending
approval.

For convenience, here is the full configuration in its entirety, with a few components reorganized for readability:

**infrastructure-live/.circleci/config.yml**

```yaml
version: 2.1

workflows:
  continuous-deploy:
    jobs:
      - plan

      - notify:
          requires:
            - plan
          filters:
            branches:
              only: master

      - hold:
          type: approval
          requires:
            - notify
          filters:
            branches:
              only: master

      - deploy:
          requires:
            - hold
          filters:
            branches:
              only: master

orbs:
  slack: circleci/slack@3.4.2

# Global constants for the jobs. This includes:
# - Using machine executor
# - Tools versions
defaults: &defaults
  machine:
    image: "ubuntu-1604:201903-01"
  environment:
    GRUNTWORK_INSTALLER_VERSION: v0.0.22
    MODULE_CI_VERSION: v0.27.2
    MODULE_SECURITY_VERSION: v0.24.1
    REGION: us-east-2

# This common step is used to determine the user friendly Git Ref name of the build, either the branch or tag.
set_friendly_git_ref: &set_friendly_git_ref
  run:
    name: set friendly git ref name
    command: |
      if [[ ! -z "$CIRCLE_TAG" ]]; then
        echo 'export CIRCLE_FRIENDLY_REF="$CIRCLE_TAG"' >> $BASH_ENV
      elif [[ ! -z "$CIRCLE_BRANCH" ]]; then
        echo 'export CIRCLE_FRIENDLY_REF="$CIRCLE_BRANCH"' >> $BASH_ENV
      else
        echo 'export CIRCLE_FRIENDLY_REF="$CIRCLE_SHA1"' >> $BASH_ENV
      fi

# This is used to determine what to use as the base comparison point for determining what modules to deploy. The logic
# is as follows:
#   - If we are on the master branch, the comparison is only the current commit.
#   - If we are not on master, the comparison is to the current state of the master branch.
set_source_ref: &set_source_ref
  run:
    name: set source ref
    command: |
      if [[ "$CIRCLE_BRANCH" == "master" ]]; then
        echo 'export SOURCE_REF=HEAD^' >> $BASH_ENV
      else
        # We have to use origin/master because the checkout routine in CircleCI sets the local master to HEAD.
        echo 'export SOURCE_REF=origin/master' >> $BASH_ENV
      fi

jobs:
  plan:
    <<: *defaults
    steps:
      - <<: *set_friendly_git_ref
      - <<: *set_source_ref
      - checkout
      - run:
          name: install utilities
          command: ./.circleci/install.sh
      - run:
          name: run plan
          command: ./.circleci/deploy.sh "$REGION" "$SOURCE_REF" "$CIRCLE_SHA1" plan
      - slack/status:
          channel: workflow-approvals
          success_message: "PLAN from $CIRCLE_FRIENDLY_REF ($CIRCLE_SHA1) successful. Click 'Visit Job' to see output."
          failure_message: "PLAN from $CIRCLE_FRIENDLY_REF ($CIRCLE_SHA1) failed. Click 'Visit Job' to see output."
  deploy:
    <<: *defaults
    steps:
      - <<: *set_friendly_git_ref
      - <<: *set_source_ref
      - slack/notify:
          channel: workflow-approvals
          message: "A deployment was approved by $CIRCLE_USERNAME for $CIRCLE_FRIENDLY_REF ($CIRCLE_SHA1). Click 'Visit Job' to see output."
      - checkout
      - run:
          name: install utilities
          command: ./.circleci/install.sh
      - run:
          name: run apply
          command: ./.circleci/deploy.sh "$REGION" "$SOURCE_REF" "$CIRCLE_BRANCH" apply
      - slack/status:
          channel: workflow-approvals
          success_message: "APPLY from $CIRCLE_FRIENDLY_REF ($CIRCLE_SHA1) was successful. Click 'Visit Job' to see output."
          failure_message: "APPLY from $CIRCLE_FRIENDLY_REF ($CIRCLE_SHA1) failed. Click 'Visit Job' to see output."
  notify:
    <<: *defaults
    steps:
      - <<: *set_friendly_git_ref
      - slack/approval:
          channel: workflow-approvals
          message: "A deployment for $CIRCLE_FRIENDLY_REF ($CIRCLE_SHA1) is pending approval. Click 'Visit Workflow' to approve."
```



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"8b74ddfe65a33e708049795c81230d90"}
##DOCS-SOURCER-END -->
