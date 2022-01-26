# Create your own service catalog

The services in the Gruntwork Service Catalog will fit ~80% of use cases right out of the box, but for the other 20%,
you will need to customize things to fit your use cases. This section will walk you through how to handle those use
cases by creating your own Service Catalog:

1. [Do it with the Gruntwork Service Catalog](#do-it-with-the-gruntwork-service-catalog)
1. [Creating a Service Catalog](#creating-a-service-catalog)
1. [Testing your Service Catalog](#testing-your-service-catalog)
1. [Deploying from your Service Catalog](#deploying-from-your-service-catalog)

## Do it with the Gruntwork Service Catalog

Creating and maintaining your own Service Catalog is a lot of work, so the first thing to ask is: can you do it with
the Gruntwork Service Catalog? There are two things to check:

1. **Does the Service Catalog support it already?** The services in the Gruntwork Service Catalog are highly
   customizable: what region to deploy to, what VPC and subnets to use, how to do secrets management, what to use for
   metrics and logging, and many other settings are all configurable. Check the `variables.tf` file for Terraform
   services and the `variables` block at the top of Packer templates to see if there is already a way to do what you
   want.

1. **Should the Service Catalog be updated to support it?** If the Service Catalog doesn't already support the
   functionality you need, the next question to ask is if it should. As a general rule, if your use case is fairly
   common and likely affects many companies, we should support it! If that's the case, please [file a GitHub issue in
   this repo](https://github.com/gruntwork-io/terraform-aws-service-catalog/issues/new), and the Gruntwork team may be able to implement it for you. Also, pull requests are VERY welcome! See
   [Contributing to the Gruntwork Service
   Catalog](/docs/guides/working-with-code/contributing)
   for instructions.

If your use case isn't handled by the Gruntwork Service Catalog, and it's something fairly specific to your company,
then you'll need to handle it in your own Service Catalog. Let's discuss how to do that.

## Creating a Service Catalog

A Service Catalog is really just a Git repo used in a certain way! Here's what you need to do:

1. **Create a Git repo**: Create a Git repo in your company. Let's say it's called `infrastructure-modules`.

1. **Set up the folder structure**. We recommend using the same [folder structure as the Gruntwork Service
   Catalog](#how-to-navigate-the-service-catalog), with `modules`, `examples`, and `test` folders.

1. **Configure versioning**. We recommend versioning your code using Git tags. You can create Git tags at the command
   line as follows:

   ```bash
   git tag -a "v1.2.3" -m "Description of tag"
   git push --follow-tags
   ```

   Alternatively, some version control systems, such as GitHub, allow you to create "Releases" in the UI. Under the
   hood, the release tags are stored as Git tags.

Now that you have a Service Catalog, you can start populating it with services. There are two ways to do that:

1. [Extend Gruntwork Services](#extend-gruntwork-services)
1. [Create totally new Services](#create-totally-new-services)

### Extend Gruntwork Services

One way to populate your Service Catalog is to extend Gruntwork Services. There are several ways to do this:

1. **(RECOMMENDED) Wrap a Gruntwork Service**. The best way to extend a Gruntwork Service is to wrap it and add your
   additional functionality on top of it. Since Gruntwork Services export the IDs of all resources they create, adding
   new logic / functionality is easy. For example, let's say the `vpc` service creates a VPC more or less like
   you want it, but you need some additional routing logic that's specific to your company. What you can do is create
   a module in your Private Service Catalog (e.g., in `infrastructure-modules/modules/networking/vpc`) that wraps
   the Gruntwork `vpc` service as follows:

   ```hcl
   module "vpc" {
     # Make sure to replace <VERSION> in this URL with the latest terraform-aws-service-catalog release from
     # https://github.com/gruntwork-io/terraform-aws-service-catalog/releases
     source = "git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/networking/vpc?ref=<VERSION>"

     # Fill in the arguments for this service
     aws_region       = "eu-west-1"
     vpc_name         = "example-vpc"
     cidr_block       = "10.0.0.0/16"
     num_nat_gateways = 1
     create_flow_logs = false
   }
   ```

   Now you can use outputs from the `vpc` service to add your custom routing behavior as follows:

   ```hcl
   resource "aws_route" "my_custom_route" {
     # Use an output from the vpc service to attach custom behavior!
     route_table_id         = module.vpc.public_subnet_route_table_id
     destination_cidr_block = "10.0.4.0/18"
     gateway_id             = var.my_custom_gateway_id
   }
   ```

   You now have your own `vpc` service, with your custom routing logic, but most of the VPC code still lives in
   the Gruntwork Service Catalog and can be maintained by the Gruntwork team!

1. **(NOT RECOMMENDED) Copy a Gruntwork Service**. Another way to extend a Gruntwork Service is to copy all of the code
   for that one service into your own Git repo and modify the code directly. This is not recommended, as then you'll
   have to maintain all of the code for that service yourself, and won't benefit from all the [maintenance
   work](/docs/reference/services/intro/overview#maintenance-and-versioning) done by the Gruntwork team. The only reason to copy the code this way is if you
   need a significant change that cannot be done from outside the service.

1. **(NOT RECOMMENDED) Fork the Gruntwork Service Catalog**. Yet another option is to
   [fork](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) the entire Gruntwork Service
   Catalog into a repo of your own. This is not recommended, as then you'll have to maintain all of that code yourself,
   and won't benefit from all the [maintenance work](/docs/reference/services/intro/overview/#maintenance-and-versioning) done by the Gruntwork team. The only
   reason to fork the entire repo is if you have a company policy that only allows you consume code from your own
   repositories. Note that if you do end up forking the entire Service Catalog, you can use `git fetch` and `git merge`
   to [automatically pull in changes from
   upstream](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-forkhttps://help.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork)
   (that is, from the original Gruntwork Service Catalog), but if you make any changes to your local fork, it'll be up
   to you to deal with merge conflicts.

### Create totally new Services

If you need something that is not supported at all in the Gruntwork Service Catalog, then you'll need to create your
own services from scratch. Here are a few resources to help you build your own reusable infrastructure code for
production:

1. [Infrastructure Module Cookbook](https://training.gruntwork.io/p/infrastructure-module-cookbook). Our video training
   course on how to write reusable infrastructure code. You should have access to this course as part of your
   Gruntwork Subscription (search your inbox for an invite from Teachable). If you're having trouble getting access,
   please email [support@gruntwork.io](mailto:support@gruntwork.io).

1. [5 Lessons Learned From Writing Over 300,000 Lines of Infrastructure Code](https://blog.gruntwork.io/5-lessons-learned-from-writing-over-300-000-lines-of-infrastructure-code-36ba7fadeac1).
   A talk and blog post that goes over some of the most important lessons for building reusable infrastructure code.

1. [Modules from the Gruntwork IaC Library](https://gruntwork.io/infrastructure-as-code-library/). We strongly
   recommend building your own services by combining modules from the Gruntwork IaC Library. For example, if your
   service runs in an Auto Scaling Group (ASG), you may want to use the modules from
   [terraform-aws-asg](https://github.com/gruntwork-io/terraform-aws-asg) to create an ASG that can do zero-downtime rolling
   deployments; if your service needs custom CloudWatch metrics, log aggregation, or alerts, you may want to use
   modules from [terraform-aws-monitoring](https://github.com/gruntwork-io/terraform-aws-monitoring); if your service is
   doing something related to Kubernetes, you may want to use modules from
   [terraform-aws-eks](https://github.com/gruntwork-io/terraform-aws-eks) or
   [helm-kubernetes-services](https://github.com/gruntwork-io/helm-kubernetes-servicesv); and so on.

1. [The Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/). You can of course also use
   the Gruntwork Service Catalog for inspiration and examples of how to build your own Service Catalog!

## Testing your Service Catalog

We strongly recommend writing automated tests for your Service Catalog. Here are some resources to help you along:

1. [Terratest](https://terratest.gruntwork.io/). This is the open source library we use to make it easier to write
   automated tests for all types of infrastructure code (Terraform, Packer, Docker, Kubernetes, etc).

1. [Automated Testing for Terraform, Docker, Packer, Kubernetes, and More](https://www.infoq.com/presentations/automated-testing-terraform-docker-packer/).
   A step-by-step, live-coding class on how to write automated tests for infrastructure code, including the code you
   write for use with tools such as Terraform, Kubernetes, Docker, and Packer. Topics covered include unit tests,
   integration tests, end-to-end tests, test parallelism, retries, error handling, static analysis, and more.

1. [The Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/). The Gruntwork Service Catalog
   has [thorough automated tests](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/test), so you can use it for inspiration and examples of how to test your own
   Service Catalog!

## Deploying from your Service Catalog

Once you've created your own Service Catalog, developers at your company can deploy from it using the exact same
techniques you use for [deploying from the Gruntwork Service Catalog](#deploy-new-infrastructure)! The only difference
is that instead of the URLs all pointing to Gruntwork's Git repos, you should update them to point to your Git repos.

For example, if you had your own `vpc` service in a repo called `infrastructure-modules` in the `acme` GitHub org,
you could deploy that module using Terragrunt by writing a `terragrunt.hcl` file that looks something like this:

```hcl
include {
  path = find_in_parent_folders()
}

terraform {
  # Note how the source URL is pointing to YOUR Service Catalog! Just make sure to replace <VERSION> in this URL with
  # the latest release from your own Service Catalog.
  source = "git@github.com:acme/infrastructure-modules.git//modules/networking/vpc?ref=<VERSION>"
}

# Fill in the arguments for this service
inputs = {
  aws_region       = "eu-west-1"
  vpc_name         = "example-vpc"
  cidr_block       = "10.0.0.0/16"
  num_nat_gateways = 1
}
```
