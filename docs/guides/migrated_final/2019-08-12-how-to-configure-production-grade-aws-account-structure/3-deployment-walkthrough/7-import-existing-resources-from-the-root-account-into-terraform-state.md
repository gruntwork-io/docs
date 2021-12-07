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

An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:

- create
  ⇐ read (data resources)

Terraform will perform the following actions:

# … (ommitting lots of log output for simplicity) …



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"bb737bc45993b846ea4323fcb1231414"}
##DOCS-SOURCER-END -->
