# Update Logs, Security, and Shared accounts to allow cross account access

In the Reference Architecture, all the AWS activity logs are configured to be streamed to a dedicated `logs` account.
This ensures that having full access to a particular account does not necessarily grant you the ability to tamper with
audit logs.

In addition, all account access is managed by a central `security` account where the IAM users are defined. This allows
you to manage access to accounts from a central location, and your users only need to manage a single set of AWS
credentials when accessing the environment.

If you are sharing encrypted AMIs, then you will also need to ensure the new account has access to the KMS key that
encrypts the AMI root device. This is managed in the `shared` account baseline module.

Finally, for the [ECS Deploy
Runner](https://github.com/gruntwork-io/terraform-aws-ci/tree/master/modules/ecs-deploy-runner) to work, the new account
needs to be able to access the secrets for accessing the remote repositories and the docker images that back the build
runners. Both of these are stored in the `shared` account.

In order for this setup to work for each new account that is created, the `logs`, `security`, and `shared` accounts need
to be made aware of the new account. This is handled through the [accounts.json](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-production/infrastructure-live/accounts.json) file in your
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


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"5bff1b351c15013c2c899f19817071e4"}
##DOCS-SOURCER-END -->
