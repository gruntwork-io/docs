---
date: "2019-03-26"
title: "Deploy Node App on ECS"
tags: ["terraform", "packer"]
author: "robmorgan"
---

The easiest way to install Hashicorp [Terraform](https://www.terraform.io) and [Packer](https://www.packer.io/) on your Mac
is by using [Homebrew](https://brew.sh/). Simply run:

    $ brew install packer terraform awscli jq awslogs git

To install them and a few other useful tools for AWS cloud development.

You can verify your installation using the `-v` parameter:

    $ terraform -v
    Terraform v0.11.7
    $ packer -v
    1.2.3


## Getting Started
First things first you’ll need a recent version of the [Go](https://golang.org/) language installed. If you're on a Mac you can install one easily using [Homebrew](https://brew.sh):

```bash
$ brew update
$ brew install go
```

Next install the [dep](https://github.com/golang/dep) dependency management tool so we can add Terratest to the project.

```bash
$ brew install dep
```

If you wish to install Terratest globally then you can use the `go get` command:

```bash
$ go get -v github.com/gruntwork-io/terratest
```

You’ll also need Git, Terraform and Packer installed. Please follow the details described in my [Bootstrapping Terraform and Packer on your Mac](https://brightfame.co/blog/bootstrapping-terraform-and-packer-on-your-mac/) post.

## Cloning the Repository
Now let's clone my example repository so we can add tests to it:

```bash
$ git clone https://github.com/robmorgan/terraform-rolling-deploys.git
```

## Terratest Workflow
As mentioned on the [Gruntwork blog post](https://blog.gruntwork.io/open-sourcing-terratest-a-swiss-army-knife-for-testing-infrastructure-code-5d883336fcd5) the basic workflow for using Terratest is as follows:

1. Write tests using Go’s built-in package testing by creating files that end in `_test.go`.
2. Use Terratest to execute Terraform and Packer which will in turn create *real* infrastructure in a *real* environment.
3. Use the helper methods in Terratest to validate that the infrastructure was created and works correctly.
4. Clean up and Destroy everything at the end.

## Adding Terratest to your Project
If you didn’t install Terratest globally then the preferred way is by using the `dep` tool:

```bash
dep init
dep ensure -add github.com/gruntwork-io/terratest
```

**Note:** If your project is not checked out under your `$GOPATH` then `dep` may throw an error.

I got an error about not having any Go files in the root of my project so I created a dummy one:

```bash
$ echo "package main" > main.go
```

## Writing Tests
As my project was initially written two years ago, I first had to upgrade it to work with the latest version of Terraform. I added a new `init` target to the `Makefile` and locked the AWS provider to the latest version.

My project includes both Terraform and Packer code it makes sense to test both areas. I came up with the following test sequence:

1. Run Packer to build an AMI.
2. Create the infrastructure using the Terraform `apply` command.
3. Validate that the Autoscaling group has been created and the web servers are responding correctly.
4. Deregister and cleanup the AMI.
5. Destroy the infrastructure using the Terraform `destroy` command.

After browsing the various Terratest examples I found I could reuse most of the code in the [terraform-redeploy-example](https://github.com/gruntwork-io/terratest/blob/master/test/terraform_redeploy_example_test.go) project.

## Testing the Packer Code
It makes sense to test the Packer code first as it executes prior to Terraform.
Here is the Packer template I use in my project:

```json
{
  "variables": {
    "aws_access_key": "{{env `AWS_ACCESS_KEY_ID`}}",
    "aws_secret_key": "{{env `AWS_SECRET_ACCESS_KEY`}}",
    "ssh_username": "ubuntu"
  },
  "builders": [
    {
      "type": "amazon-ebs",
      "access_key": "{{user `aws_access_key`}}",
      "secret_key": "{{user `aws_secret_key` }}",
      "region": "eu-west-1",
      "source_ami": "ami-8d16ccfe",
      "instance_type": "c3.large",
      "ssh_username": "{{user `ssh_username`}}",
      "ami_name": "packer-base {{timestamp}}",
      "associate_public_ip_address": true
    }
  ],
  "provisioners": [
    {
      "type": "shell",
      "execute_command": "echo {{user `ssh_username`}} | {{ .Vars }} sudo -E -S sh '{{ .Path }}'",
      "inline": [
        "mkdir -p /ops",
        "chmod a+w /ops"
      ]
    },
    {
      "type": "file",
      "source": "{{template_dir}}/../../ssh_keys",
      "destination": "/ops"
    },
    {
      "type": "shell",
      "execute_command": "echo {{user `ssh_username`}} | {{ .Vars }} sudo -E -S sh '{{ .Path }}'",
      "inline": [
        "cat /ops/ssh_keys/* >> /home/ubuntu/.ssh/authorized_keys"
      ]
    },
    {
      "type": "shell",
      "scripts": [
        "{{template_dir}}/../scripts/base.sh"
      ],
      "execute_command": "chmod +x {{ .Path }}; {{ .Vars }} sudo -E '{{ .Path }}'"
    },
    {
      "type": "shell",
      "scripts": [
        "{{template_dir}}/../scripts/docker.sh"
      ],
      "execute_command": "chmod +x {{ .Path }}; {{ .Vars }} sudo -E '{{ .Path }}'"
    },
    {
      "type": "shell",
      "execute_command": "echo {{user `ssh_username`}} | {{ .Vars }} sudo -E -S sh '{{ .Path }}'",
      "inline": [
        "docker pull nginx"
      ]
    },
    {
      "type": "shell",
      "scripts": [
        "{{template_dir}}/../scripts/cleanup.sh"
      ],
      "execute_command": "chmod +x {{ .Path }}; {{ .Vars }} sudo -E '{{ .Path }}'"
    }
  ]
}

```


You can also find it directly in the [GitHub repository](https://github.com/robmorgan/terraform-rolling-deploys/blob/master/packer/aws/app-server.json). I rewrote the paths to use the `{{template_dir}}` variable as it plays better with Terratest.

I then created a new test file under the `test` directory:

``` bash
$ mkdir -p test
$ touch test/terraform_packer_test.go
```

And added the following code:

```go
package test

import (
	"fmt"
	"testing"
	"time"

	"github.com/gruntwork-io/terratest/modules/aws"
	"github.com/gruntwork-io/terratest/modules/http-helper"
	"github.com/gruntwork-io/terratest/modules/packer"
	"github.com/gruntwork-io/terratest/modules/retry"
	"github.com/gruntwork-io/terratest/modules/terraform"
	"github.com/gruntwork-io/terratest/modules/test-structure"
)

// The test is broken into "stages" so you can skip stages by setting environment variables (e.g., skip stage
// "deploy_initial" by setting the environment variable "SKIP_deploy_initial=true"), which speeds up iteration when
// running this test over and over again locally.
func TestTerraformPackerExample(t *testing.T) {
	t.Parallel()

	// Use eu-west-1 for now, but in future we should pick a random AWS region
	awsRegion := "eu-west-1"

	// The folder where we have our Terraform code
	workingDir := "../"

	// Build the AMI for the web app
	test_structure.RunTestStage(t, "build_ami", func() {
		buildAmi(t, awsRegion, workingDir)
	})

	// At the end of the test, delete the AMI
	defer test_structure.RunTestStage(t, "cleanup_ami", func() {
		deleteAmi(t, awsRegion, workingDir)
	})
}

// Build the AMI
func buildAmi(t *testing.T, awsRegion string, workingDir string) {
	packerOptions := &packer.Options{
		// The path to where the Packer template is located
		Template: "../packer/aws/app-server.json",
	}

	// Save the Packer Options so future test stages can use them
	test_structure.SavePackerOptions(t, workingDir, packerOptions)

	// Build the AMI
	amiId := packer.BuildAmi(t, packerOptions)

	// Save the AMI ID so future test stages can use them
	test_structure.SaveAmiId(t, workingDir, amiId)
}

// Delete the AMI
func deleteAmi(t *testing.T, awsRegion string, workingDir string) {
	// Load the AMI ID and Packer Options saved by the earlier build_ami stage
	amiId := test_structure.LoadAmiId(t, workingDir)

	aws.DeleteAmi(t, awsRegion, amiId)
}
```

This code allows Terratest to build an AMI and save it locally in a configuration file to be used by later steps. Finally when the test finishes Terratest deregisters the AMI.

## Testing the Terraform Code
Now we need to extend the tests to cover the Terraform code. I simply copied and modified some additional methods from the example project. This included running the Terraform `apply` command and verifying the ELB was returning a HTTP 200 response.

The test file now looks like:

```go
package test

import (
	"fmt"
	"testing"
	"time"

	"github.com/gruntwork-io/terratest/modules/aws"
	"github.com/gruntwork-io/terratest/modules/http-helper"
	"github.com/gruntwork-io/terratest/modules/packer"
	"github.com/gruntwork-io/terratest/modules/retry"
	"github.com/gruntwork-io/terratest/modules/terraform"
	"github.com/gruntwork-io/terratest/modules/test-structure"
)

// The test is broken into "stages" so you can skip stages by setting environment variables (e.g., skip stage
// "deploy_initial" by setting the environment variable "SKIP_deploy_initial=true"), which speeds up iteration when
// running this test over and over again locally.
func TestTerraformPackerExample(t *testing.T) {
	t.Parallel()

	// Use eu-west-1 for now, but in future we should pick a random AWS region
	awsRegion := "eu-west-1"

	// The folder where we have our Terraform code
	workingDir := "../"

	// Build the AMI for the web app
	test_structure.RunTestStage(t, "build_ami", func() {
		buildAmi(t, awsRegion, workingDir)
	})

	// At the end of the test, delete the AMI
	defer test_structure.RunTestStage(t, "cleanup_ami", func() {
		deleteAmi(t, awsRegion, workingDir)
	})

	// At the end of the test, undeploy the web app using Terraform
	defer test_structure.RunTestStage(t, "cleanup_terraform", func() {
		undeployUsingTerraform(t, workingDir)
	})

	// Deploy the web app using Terraform
	test_structure.RunTestStage(t, "deploy_terraform", func() {
		deployUsingTerraform(t, awsRegion, workingDir)
	})

	// Validate that the ASG deployed and is responding to HTTP requests
	test_structure.RunTestStage(t, "validate", func() {
		validateAsgRunningWebServer(t, workingDir)
	})
}

// Build the AMI
func buildAmi(t *testing.T, awsRegion string, workingDir string) {
	packerOptions := &packer.Options{
		// The path to where the Packer template is located
		Template: "../packer/aws/app-server.json",
	}

	// Save the Packer Options so future test stages can use them
	test_structure.SavePackerOptions(t, workingDir, packerOptions)

	// Build the AMI
	amiId := packer.BuildAmi(t, packerOptions)

	// Save the AMI ID so future test stages can use them
	test_structure.SaveAmiId(t, workingDir, amiId)
}

// Delete the AMI
func deleteAmi(t *testing.T, awsRegion string, workingDir string) {
	// Load the AMI ID and Packer Options saved by the earlier build_ami stage
	amiId := test_structure.LoadAmiId(t, workingDir)

	aws.DeleteAmi(t, awsRegion, amiId)
}

// Deploy the terraform-packer-example using Terraform
func deployUsingTerraform(t *testing.T, awsRegion string, workingDir string) {
	// Load the AMI ID saved by the earlier build_ami stage
	amiId := test_structure.LoadAmiId(t, workingDir)

	terraformOptions := &terraform.Options{
		// The path to where our Terraform code is located
		TerraformDir: workingDir,

		// Variables to pass to our Terraform code using -var options
		Vars: map[string]interface{}{
			"ami": amiId,
		},
	}

	// Save the Terraform Options struct, instance name, and instance text so future test stages can use it
	test_structure.SaveTerraformOptions(t, workingDir, terraformOptions)

	// This will run `terraform init` and `terraform apply` and fail the test if there are any errors
	terraform.InitAndApply(t, terraformOptions)
}

// Undeploy the terraform-packer-example using Terraform
func undeployUsingTerraform(t *testing.T, workingDir string) {
	// Load the Terraform Options saved by the earlier deploy_terraform stage
	terraformOptions := test_structure.LoadTerraformOptions(t, workingDir)

	terraform.Destroy(t, terraformOptions)
}

// Validate the ASG has been deployed and is working
func validateAsgRunningWebServer(t *testing.T, workingDir string) {
	// Load the Terraform Options saved by the earlier deploy_terraform stage
	terraformOptions := test_structure.LoadTerraformOptions(t, workingDir)

	// Run `terraform output` to get the value of an output variable
	url := terraform.Output(t, terraformOptions, "url")

	// It can take a few minutes for the ASG and ELB to boot up, so retry a few times
	//	maxRetries := 30
	timeBetweenRetries := 5 * time.Second

	// Verify that the ELB returns a proper response
	elbChecks := retry.DoInBackgroundUntilStopped(t, fmt.Sprintf("Check URL %s", url), timeBetweenRetries, func() {
		http_helper.HttpGetWithCustomValidation(t, url, func(statusCode int, body string) bool {
			return statusCode == 200
		})
	})

	// Stop checking the ELB
	elbChecks.Done()
}
```

Now it's time to execute the test suite.

## Executing the Test Suite
I added a new target to the `Makefile` which simply proxies to the `go test` command. You can execute the tests by running:

```bash
$ make test
```

This will take approximately 15 minutes to run the entire test suite.

**Note:** By default Go imposes a 10 minute timeout on running tests, so I’ve increased this value to `30m` in the `Makefile` using the `-timeout` parameter to play it safe.

Terratest also includes functionality to skip stages by specify environment variables. This is a really handy feature when writing tests as you can skip time-expensive stages like rebuilding the AMI each time. When I was debugging the tests I simply set `SKIP_build_ami=true` before running the test suite:

```bash
$ SKIP_build_ami=true make test
```

*Note:* You may need to manually build an AMI or ensure your test suite doesn’t remove the one in `.test-data/AMI.json` before skipping a stage.

When Terratest finishes running the tests correctly it will return the following output:

```bash
PASS
ok      github.com/robmorgan/terraform-rolling-deploys/test     800.570s
```

## HCL Test

```hcl
resource "aws_instance" "foo" {
    ami_id = "ami-1337"
}
```
