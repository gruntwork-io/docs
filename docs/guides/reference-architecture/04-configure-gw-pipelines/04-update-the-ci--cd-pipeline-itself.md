# Update the CI / CD pipeline itself

The CI / CD pipeline uses the Gruntwork [terraform-aws-ci](https://github.com/gruntwork-io/terraform-aws-ci) repo code, so
whenever there's a new release, it's a good idea to update your pipeline.

Here are the manual steps for this process:

1. Update the Service Catalog version tag in the
[`build_deploy_runner_image.sh`](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-production/infrastructure-live/shared/us-west-2/_regional/container_images/build_deploy_runner_image.sh) and
[`build_kaniko_image.sh`](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-production/infrastructure-live/shared/us-west-2/_regional/container_images/build_kaniko_image.sh) scripts.

1. Run each script while authenticating to the `shared` account.

  ```bash
  aws-vault exec your-shared -- shared/us-west-2/_regional/container_images/build_deploy_runner_image.sh
  aws-vault exec your-shared -- shared/us-west-2/_regional/container_images/build_kaniko_image.sh
  ```

1. Update [`common.hcl`](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-production/infrastructure-live/common.hcl) with new tag values for these images. The new tag value will be version of
`terraform-aws-ci` that the images use. For example, if your newly created images are using the `v0.38.9` release of
`terraform-aws-ci`, update [`common.hcl`](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-production/infrastructure-live/common.hcl) to:

  ```bash
  deploy_runner_container_image_tag = "v0.38.9"
  kaniko_container_image_tag = "v0.38.9"
  ```

1. Run `apply` on the `ecs-deploy-runner` modules in each account. These can be run simultaneously in different terminal sessions.

  ```bash
  cd logs/us-west-2/mgmt/ecs-deploy-runner
  aws-vault exec your-logs -- terragrunt apply --terragrunt-source-update -auto-approve

  cd shared/us-west-2/mgmt/ecs-deploy-runner
  aws-vault exec your-shared -- terragrunt apply --terragrunt-source-update -auto-approve

  cd security/us-west-2/mgmt/ecs-deploy-runner
  aws-vault exec your-security -- terragrunt apply --terragrunt-source-update -auto-approve

  cd dev/us-west-2/mgmt/ecs-deploy-runner
  aws-vault exec your-dev -- terragrunt apply --terragrunt-source-update -auto-approve

  cd stage/us-west-2/mgmt/ecs-deploy-runner
  aws-vault exec your-stage -- terragrunt apply --terragrunt-source-update -auto-approve

  cd prod/us-west-2/mgmt/ecs-deploy-runner
  aws-vault exec your-prod -- terragrunt apply --terragrunt-source-update -auto-approve
  ```

## Why manually?

The CI / CD pipeline has a guard in place to avoid being updated automatically by the pipeline itself. This is so that
you cannot accidentally lock yourself out of the pipeline when applying a change to the pipeline that changes
permissions. For example, if you change the IAM permissions of the CI user, you may no longer be able to run the
pipeline. The pipeline job that updates the permissions will also be affected by the change. This can be difficult to
recover from because you will have lost access to make further changes. That's why we recommend the manual approach
detailed above.

If you are certain that your changes will not break the pipeline itself, you can go ahead and use the pipeline to
update itself. To do this, you need to remove the guard that's in place, temporarily. That is, comment or remove the
lines

```bash
elif [[ "$updated_folder" =~ ^.+/ecs-deploy-runner(/.+)?$ ]]; then
echo "No action defined for changes to $updated_folder."
```

in [`_ci/scripts/deploy-infra.sh`](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-production/infrastructure-live/_ci/scripts/deploy-infra.sh). You can combine this change into the same commit or
pull request as your changes to the `ecs-deploy-runner` module configuration.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"6457637d554e50c34b0c4e2e1785d09b"}
##DOCS-SOURCER-END -->
