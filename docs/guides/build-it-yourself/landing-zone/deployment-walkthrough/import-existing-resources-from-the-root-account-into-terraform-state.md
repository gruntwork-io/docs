# Import existing resources from the root account into Terraform state

Before applying the `account-baseline-root` module to the root account, we need to import existing resources—including
the IAM user you created manually earlier—into Terraform state, so that Terraform manages those resources instead of
trying to create totally new ones. You can do this using the
[`import` command](https://www.terraform.io/docs/import/index.html), which uses the format:

```bash
terraform import <ADDRESS> <ID>
```

Where `<ADDRESS>` is the [address](https://www.terraform.io/docs/internals/resource-addressing.html) of the Terraform
resource you’re importing and `<ID>` is a resource-specific identifier (e.g., for `aws_instance`, it’s the instance ID,
whereas for `aws_lb`, it’s the load balancer’s name—check the docs for the resource to find out what to use).

Let’s import the IAM user you created manually in the root account. IAM users are managed using the
`aws_iam_user` resource, and the
[documentation for that
resource](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_user#import) tells us to use the user’s `name` as the `<ID>`; we’ll assume for this example that your IAM user’s name was
`alice`, who is already one of the entries in the `users` variable in `terragrunt.hcl`. So now we need the `<ADDRESS>`.
An easy way to get it is to run `plan`:

```bash
cd infrastructure-live/root/_global/account-baseline
aws-vault exec root-iam-user -- terragrunt plan
```

You should get a whole bunch of log output, including something that looks like this:

```bash
------------------------------------------------------------------------
An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  + create
  <= read (data resources)

Terraform will perform the following actions:

# ... (omitting lots of log output for simplicity) ...

# module.root_baseline.module.iam_users.aws_iam_user.user["alice"] will be created
  + resource "aws_iam_user" "user" {
      + arn           = (known after apply)
      + force_destroy = true
      + id            = (known after apply)
      + name          = "alice"
      + path          = "/"
      + unique_id     = (known after apply)
    }

# ... (omitting lots of log output for simplicity) ...

Plan: 160 to add, 0 to change, 0 to destroy.

------------------------------------------------------------------------
Note: You didn't specify an "-out" parameter to save this plan, so Terraform
can't guarantee that exactly these actions will be performed if
"terraform apply" is subsequently run.
```

This `plan` output is telling you that Terraform will create a bunch of resources, including the `aws_iam_user` named
`alice`. Of course, this user already exists, so we want to `import` the user rather than create it again. The text
next to the `#` gives you the `<ADDRESS>` to use:

    # module.root_baseline.module.iam_users.aws_iam_user.user["alice"] will be created

So the `<ADDRESS>` you want is `module.root_baseline.module.iam_users.aws_iam_user.user["alice"]`. Now, normally, you’d
run `import` right away, but due two Terraform bugs, [#13018](https://github.com/hashicorp/terraform/issues/13018) and
[#26211](https://github.com/hashicorp/terraform/issues/26211), `import` doesn’t work on certain types of modules—namely,
those with nested `provider` blocks that use dynamic data—and will produce an error like `unknown variable accessed: var.region in:`. One of these bugs has been open for over 3 years, so we built a workaround for it in Terragrunt: the
[`aws-provider-patch` command](https://terragrunt.gruntwork.io/docs/reference/cli-options/#aws-provider-patch).

The idea behind the workaround is to temporarily hard-code the dynamic data in nested `provider` blocks. In particular,
we need to temporarily hard-code some of the `region` and `role_arn` parameters of the nested `provider` blocks used by
`account-baseline-root` as follows:

```bash
terragrunt aws-provider-patch \
  --terragrunt-override-attr 'region="eu-west-1"' \
  --terragrunt-override-attr 'assume_role.role_arn=""'
```

_Note: You can use any region you want for the `region` parameter. It’s just temporary. However, `role_arn` must be set
to an empty string or Terraform will complain._

After running this command, you can finally import your IAM user:

```bash
aws-vault exec root-iam-user -- terragrunt import \
  'module.root_baseline.module.iam_users.aws_iam_user.user["alice"]' \
  'alice'
```

You should see log output that looks something like this:

    [terragrunt] 2020/10/13 14:19:16 Running command: terraform import module.root_baseline.module.iam_users.aws_iam_user.user["alice"] alice
    module.root_baseline.module.iam_users.aws_iam_user.user["alice"]: Importing from ID "alice"...
    module.root_baseline.module.iam_users.aws_iam_user.user["alice"]: Import prepared!
      Prepared aws_iam_user for import
    module.root_baseline.module.iam_users.aws_iam_user.user["alice"]: Refreshing state... [id=alice]

    Import successful!

    The resources that were imported are shown above. These resources are now in
    your Terraform state and will henceforth be managed by Terraform.

You’ll now be able to manage that IAM user as code going forward!

If you created other resources manually in the root account, you may want to `import` them too, so you can manage
everything as code, and so that Terraform doesn’t try to create any duplicate resources. For example, if you already
manually created an AWS Organization in your root account, you’ll need to import it using a command that looks like
this:

```bash
aws-vault exec root-iam-user -- terragrunt import \
  'module.root_baseline.module.organization.aws_organizations_organization.root[0]' \
  '<ORG_ID>'
```

Where `<ORG_ID>` is the ID of your AWS Organization. Note that this is NOT the same as the AWS account ID, but a
separate ID you can find by going to the [AWS Organizations](https://console.aws.amazon.com/organizations/home) page in
the AWS console, clicking on your root account (the one with a star to the left of it), and looking at the root
account’s ARN, which will look something like, `arn:aws:organizations::<ACCOUNT_ID>:account/<ORG_ID>/<ACCOUNT_ID>`. The
`<ORG_ID>` is the part between slashes, and it’ll look something like `o-a2lce3bbqq`.

You may also want to import child accounts you created manually. You’ll need to add each of these to the
`child_accounts` variable in `terragrunt.hcl`, and you can then import each one as follows:

```bash
aws-vault exec root-iam-user -- terragrunt import \
  'module.root_baseline.module.organization.aws_organizations_account.child_accounts["<ACCOUNT_NAME>"]' \
  '<ACCOUNT_ID>'
```

Where `<ACCOUNT_NAME>` is the name you used for the account in the `child_accounts` variable and `<ACCOUNT_ID>` is the
12-digit ID of that AWS account.

Once you’re done importing, you’ll want to undo the `aws-provider-patch` workaround. The easiest way to do that is to
delete the `.terraform` or `.terragrunt-cache` folders to remove any locally cached modules, as they would’ve been
modified by the `aws-provider-patch` command.

```bash
rm -rf .terragrunt-cache
```


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"d9f7dfdde4944b7cc694380b1de97f3b"}
##DOCS-SOURCER-END -->
