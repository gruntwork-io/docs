# Create new Account in your AWS Org

The first step to adding a new account is to create the new AWS Account in your AWS Organization. This can be done
either through the AWS Web Console, or by using the [Gruntwork CLI](https://github.com/gruntwork-io/gruntwork/). If you
are doing this via the CLI, you can run the following command to create the new account:

```bash
gruntwork aws create --account "<ACCOUNT_NAME>=<EMAIL_ADDRESS_FOR_ROOT_USER>"
```

Record the account name and AWS ID of the new account you just created in the [accounts.json](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-production/infrastructure-live/accounts.json) file so
that we can reference it throughout the process.

Once the account is created, log in using the root credentials and configure MFA (see [this
document](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html#enable-virt-mfa-for-root)
for instructions on how to configure this). It is critical to enable MFA as the root user can bypass just about any
other security restrictions you put in place. Make sure you keep a paper copy of the virtual device secret key so that
you have a backup in case you lose your MFA device.

Once MFA is configured, set up a temporary IAM user with administrator access (the AWS managed IAM policy
`AdministratorAccess`) and create an AWS Access key pair so you can authenticate on the command line.

At this point, you won't need to use the root credentials again until you are ready to delete the AWS account.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"ce81ca7d4a533a62629db83aa91e9910"}
##DOCS-SOURCER-END -->
