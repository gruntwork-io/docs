# How we version code

## Versioning

All of the code in the Gruntwork Infrastructure as Code Library is _versioned_. Every time we make a change, we put out a new
versioned release, and announce it in the periodical
[Gruntwork Newsletter](https://blog.gruntwork.io/tagged/gruntwork-newsletter).

![An example of all the versioned updates announced in the Gruntwork Newsletter](/img/guides/stay-up-to-date/newsletter.png)

### Pinned Versions

When you use the code from the Gruntwork IaC Library, you pin yourself to a specific version of the code. That way 
you are not accidentally affected by any subsequent changes in the Gruntwork IaC Library until you explicitly choose to
pull those changes in. When you do want to pull the changes in, it’s just a matter of bumping the version number!

### Semantic Versioning

We use version numbers of the form `MAJOR.MINOR.PATCH` (e.g., `1.2.3`), following the principles of
_[semantic versioning](https://semver.org)_. In traditional semantic versioning, you increment the:

1. MAJOR version when you make backward incompatible API changes,
2. MINOR version when you add functionality in a backward compatible manner, and
3. PATCH version when you make backward compatible bug fixes.

However, much of the Gruntwork IaC Library is still pre-`1.0.0`. Most of the Gruntwork IaC Library uses 
`0.MINOR.PATCH` version numbers. With `0.MINOR.PATCH`, the rules are a bit different, where you increment the:

1. MINOR version when you make backward incompatible API changes, and
2. PATCH version when you add backward compatible functionality or bug fixes.

### What changes are backward compatible?

- Any update that requires some toil by the user. This is a moving target. At the moment, actions like bumping a
version number are not considered toil, but actions like running migration steps that modify Terraform state are
considered toil. In the near future, bumping a version number could be toil, and we are working to remove the need
for users to do that.

- Any update that does not require configuration changes by the user is considered backward compatible. When we 
release a new MINOR version in pre-`1.0.0`, we include a migration guide with explicit steps you can take to resolve
the backward incompatibilities, such that the update becomes backward compatible for you. 

- Any update that does not incur downtime for you is also considered backward compatible. This excludes changes that 
require recreating a resource that may be in use.

- Most updates that do not destroy resources are also backward compatible. There are cases where destroying resources is
necessary and will not incur downtime, such as `null_resources` that only existed previously as a stop-gap for 
something missing in the AWS API.

We try to err on the side of caution. Sometimes we release an update as MINOR even if it is functionally backward 
compatible. This is the case with the [AWS Provider v4 update](/../stay-up-to-date/terraform/how-to-update-to-aws-provider-v4/),
which requires no configuration changes in Gruntwork module usage. It requires unlocking the provider version maintained
in the `terraform.lock.hcl` file, which makes it somewhat backward incompatible. Additionally it may still require you 
to update any infrastructure code which does not use Gruntwork modules. Because this upgrade requires some vigilance, 
we released it as a MINOR version increase to signal importance.

We're working to provide automatic resolution with patches, i.e., scripts that you can run when bumping your versions, 
so that `terraform plan` and `terraform apply` result in clean updates. These releases would still be considered
backward incompatible because they require running a patch, could cause downtime, or could change resources 
significantly.

## Updating to new versions

Follow the steps below to keep your code up to date:

1.  Make sure you're following our [Gruntwork Newsletter](https://blog.gruntwork.io/tagged/gruntwork-newsletter)
    to be notified of all updates to the Gruntwork IaC Library. Alternatively, you can watch repos in GitHub that 
    you’re interested in. If you use the Reference Architecture, you could watch the Service Catalog repos.

2.  When you find an update you’d like for a specific module, update module sources referencing that module in your 
    Terraform code to the new version number. For example, if you were using `terraform-aws-vpc` at `v0.18.5` and you
    wanted to update to `v0.18.6`, you would change from:

    ```hcl
    module "vpc" {
      source = "git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-app?ref=v0.18.5"
      # ...
    }
    ```

    to:

    ```hcl
    module "vpc" {
      source = "git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-app?ref=v0.18.6"
      # ...
    }
    ```

    One way you can do this quickly is by stringing together commands using `ripgrep`, `xargs`, and `sed`, or any other
    method that allows find-and-replace operations within a directory.

3.  In general, update one MINOR at a time, paying close attention to the release notes for migration steps. A MINOR 
    version number increase (e.g., `v0.18.0` → `v0.19.0`) signals a backward incompatible change, and the release 
    notes will contain a migration guide explaining what you need to do (e.g., update the configuration by adding, 
    removing, or changing variables you pass to the module).

4.  Optionally, test your changes locally. Use the same process outlined in 
    [Manual tests for Terraform code](/intro/first-deployment/testing#manual-tests-for-terraform-code) and
    [Automated tests for Terraform code](/intro/first-deployment/testing#automated-tests-for-terraform-code).

5.  Deploy your changes to each environment. Use `terraform plan` to sanity-check the changes before `terraform apply`.
    Use the same process outlined in [Deploying Terraform code](#deploy_terraform).


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "c90aa0638a17caccf49f7c05c3e5a64f"
}
##DOCS-SOURCER-END -->
