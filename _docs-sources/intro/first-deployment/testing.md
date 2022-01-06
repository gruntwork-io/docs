# Test Your Code

## Manual tests for Terraform code

Now that the code is written, you may want to test it manually. We recommend testing in a _sandbox environment_ where
you can deploy infrastructure without affecting any other environments (especially production!). For example, if you’re
using AWS, this should be a separate AWS account.

The easiest way to test is to create a `testing/terraform.tfvars` file:

    infrastructure-modules
      └ networking
        └ vpc-app
          └ main.tf
          └ outputs.tf
          └ variables.tf
          └ testing
            └ terraform.tfvars

Inside this file, you can set all the variables for your module to test-friendly values:

```hcl title=infrastructure-modules/networking/vpc-app/testing/terraform.tfvars
aws_region       = "us-east-2"
aws_account_id   = "555566667777"
vpc_name         = "example-vpc"
cidr_block       = "10.0.0.0/16"
num_nat_gateways = 1
```

You should also add a `testing/backend.hcl` file:

    infrastructure-modules
      └ networking
        └ vpc-app
          └ main.tf
          └ outputs.tf
          └ variables.tf
          └ testing
            └ terraform.tfvars
            └ backend.hcl

In this file, you can configure test-friendly settings for your backend. For example, if you’re using the S3 backend,
you can specify:

```hcl title=infrastructure-modules/networking/vpc-app/testing/backend.hcl
bucket = "<YOUR-BUCKET-FOR-TESTING>"
key    = "manual-testing/<YOUR-NAME>/terraform.tfstate"
region = "us-east-2"
```

You can now test manually by authenticating to your sandbox environment (see
[A Comprehensive Guide to Authenticating to AWS on the Command Line](https://blog.gruntwork.io/a-comprehensive-guide-to-authenticating-to-aws-on-the-command-line-63656a686799))
and running:

```bash
cd infrastructure-modules/networking/vpc-app/testing
terraform init -backend-config=backend.hcl ../
terraform apply ../
```

When you’re done testing, clean up by running:

```bash
terraform destroy ../
```

## Automated tests for Terraform code

You may also want to create automated tests for your module. Automated tests for infrastructure code will spin up and
tear down a lot of infrastructure, so we recommend a separate _testing environment_ (e.g. yet another AWS account) for
running automated tests—separate even from the sandboxes you use for manual testing. You can run a tool like
[cloud-nuke](https://github.com/gruntwork-io/cloud-nuke) on a schedule to periodically clean up left-over resources in
your testing environment (e.g., delete all resources that are older than 24h).

The only way to build confidence that your infrastructure code works as you expect is to deploy it into a real AWS
account. That means you’ll primarily be writing _integration tests_ that:

1.  Run `terraform apply` to deploy your module

2.  Perform a bunch of validations that the deployed infrastructure works as expected

3.  Run `terraform destroy` at the end to clean up

In short, you’re automating the steps you took to manually test your module!

You can make it easier to write tests of this format by leveraging [Terratest](https://github.com/gruntwork-io/terratest/),
an open source Go library that contains helpers for testing many types of infrastructure code, including Terraform,
Packer, and Docker.

You can define tests for your `vpc-app` module in a `vpc_app_test.go` file in a `test` folder:

    infrastructure-modules
      └ networking
        └ vpc-app
          └ main.tf
          └ outputs.tf
          └ variables.tf
          └ testing
            └ terraform.tfvars
            └ backend.hcl
      └ test
        └ vpc_app_test.go

Check out the [Terratest install instructions](https://github.com/gruntwork-io/terratest/#quickstart) for how to
configure your environment for Go and install Terratest.

Next, write some test code in `vpc_app_test.go` that looks like this:

```go title=infrastructure-modules/test/vpc_app_test.go
package test

import (
        "testing"

        "fmt"
        "github.com/gruntwork-io/terratest/modules/random"
        "github.com/gruntwork-io/terratest/modules/terraform"
)

func TestVpcApp(t *testing.T) {
        // Run this test in parallel with all the others
        t.Parallel()

        // Unique ID to namespace resources
        uniqueId := random.UniqueId()
        // Generate a unique name for each VPC so tests running in parallel don't clash
        vpcName := fmt.Sprintf("test-vpc-%s", uniqueId)
        // Generate a unique key in the S3 bucket for the Terraform state
        backendS3Key := fmt.Sprintf("vpc-app-test/%s/terraform.tfstate", uniqueId)

        terraformOptions := &terraform.Options {
                // Where the Terraform code is located
                TerraformDir: "../networking/vpc-app",

                // Variables to pass to the Terraform code
                Vars: map[string]interface{}{
                        "aws_region":       "us-east-2",
                        "aws_account_id":   "111122223333", // ID of testing account
                        "vpc_name":         vpcName,
                        "cidr_block":       "10.0.0.0/16",
                        "num_nat_gateways": 1,
                },

                // Backend configuration to pass to the Terraform code
                BackendConfig: map[string]interface{}{
                        "bucket":   "<YOUR-S3-BUCKET>", // bucket in testing account
                        "region":   "us-east-2", // region of bucket in testing account
                        "key":      backendS3Key,
                },
        }

        // Run 'terraform destroy' at the end of the test to clean up
        defer terraform.Destroy(t, terraformOptions)

        // Run 'terraform init' and 'terraform apply' to deploy the module
        terraform.InitAndApply(t, terraformOptions)
}
```

The test code above implements a minimal test that does the following:

<div className="dlist">

#### Configure variables

This is similar to the `testing/terraform.tfvars` used in manual testing.

#### Configure the backend

This is similar to the `testing-backend.hcl` used in manual testing.

#### Namespace resources

The code uses ‘random.UniqueId()\` to generate unique identifiers for all the resources in this test. This allows
multiple tests to run in parallel (e.g., on your computer, your teammates’ computers, CI servers) without running
into conflicts (e.g., without conflicts over resources that require unique names, such as VPCs).

#### Defer `terraform destroy`

The test code uses `defer` to schedule `terraform.Destroy` to run at the end of the test, whether or not the test
passes.

#### `terraform init` and `apply`

The test runs `terraform init` and `terraform apply` on the module. If this hits any errors, the test will fail.

</div>
This is a minimal test that just makes sure your module can deploy and undeploy successfully. This is a great start,
and will catch a surprising number of bugs, but for production-grade code, you’ll probably want more validation logic.
Check out the real [module-vpc tests](https://github.com/gruntwork-io/module-vpc/tree/master/test) to see how we validate
VPCs by, for example, launching EC2 instances in various subnets and making sure that connections between some subnets
work, and others are blocked, based on the networking settings in that VPC.

To run the test, authenticate to your testing environment and do the following:

```bash
cd infrastructure-modules/test
go test -v -timeout 45m
```

Note the use of the `-timeout 45m` argument with `go test`. By default, Go imposes a time limit of 10 minutes for
tests, after which it forcibly kills the test run, causing the tests to not only fail, but even preventing the cleanup
code (i.e., `terraform destroy`) from running. This VPC test should take closer to ten minutes, but whenever running a
Go test that deploys real infrastructure, it’s safer to set an extra long timeout to avoid the test being killed part
way through and leaving all sorts of infrastructure still running.

For a lot more information on writing automated tests for Terraform code, see:

1.  [Terratest documentation](https://github.com/gruntwork-io/terratest/), especially the many examples and corresponding
    tests in the `examples` and `test` folders, respectively, and the
    [testing best practices](https://github.com/gruntwork-io/terratest/#testing-best-practices) section.

2.  _[Terraform: Up & Running](https://www.terraformupandrunning.com)_, 2nd edition, has an entire chapter dedicated to
    automated testing for Terraform code, including unit tests, integration tests, end-to-end tests, dependency injection,
    running tests in parallel, test stages, and more.
