# Options for deploy server

The deploy server needs to be a self-hosted platform in order to satisfy the requirement for isolation. It should also
avoid executing arbitrary workflows. Finally, it should support configurations options that limit what code can run on
the server. This limits the options for what you can use as your deploy server. Here is a list of platforms that satisfy
these constraints, and their strengths and weaknesses:

<div className="dlist">

#### Gruntwork ECS Deploy Runner Stack

This is a stack you can deploy in your AWS account that sets up an ECS task with a customizable docker container for
running `terraform validate`, `terraform plan`, and `terraform apply`, or the Terragrunt equivalent. It is also
extensible to support other commands as well, such as running `go test` for Terratest or `packer build` for building
images. To limit the ability to run arbitrary code, the stack includes a Lambda function that can be used as a trigger
which exposes a limited set of options and additional checks for source repository. It relies on serverless
technologies to limit the amount of overhead required for maintaining the system.

#### Terraform Enterprise

Terraform enterprise provides an API for triggering runs manually (as opposed to Atlantis which only supports VCS
webhook based triggers). In addition, Terraform Enterprise supports
[Sentinel Policies](https://www.terraform.io/docs/cloud/sentinel/manage-policies.html), a feature to enforce that
the Terraform code are in compliance with company policies (e.g., it has the appropriate tags). As a self hosted
solution, it supports running in your own account. However, being a stateful server, there is a high maintenance cost
to keeping it up and running, in addition to licensing cost for using the service.

</div>

Depending on your needs, you may choose to use either option. For example, large enterprise organizations may have a
risk profile that requires the automated validation you get from the sentinel policies of Terraform Enterprise such that
the overhead of maintaining TFE is well worth the cost. On the other hand, a small startup may not have a high enough
risk profile from internal threats such that the simpler infrastructure of the ECS Deploy Runner Stack may be
sufficient.

In this guide, we will use the ECS Deploy Runner Stack as the deploy server. Note that although we will not explicitly
cover it, the design is compatible with using Terraform Enterprise as the deploy server.
