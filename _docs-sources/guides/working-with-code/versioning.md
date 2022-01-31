# How we version code

## Versioning

All of the code in the Gruntwork Infrastructure as Code Library is _versioned_. Every time we make a change, we put out a new
versioned release, and announce it in the monthly
[Gruntwork Newsletter](https://blog.gruntwork.io/tagged/gruntwork-newsletter).

![An example of all the versioned updates announced in the monthly Gruntwork Newsletter](/img/guides/stay-up-to-date/newsletter.png)

### Pinned Versions

When you use the code from the Gruntwork Infrastructure as Code Library, you pin
yourself to a specific version of the code. That way, you are not accidentally affected by any subsequent changes in
the Gruntwork Infrastructure as Code Library until you explicitly choose to pull those changes in. And when you do want to pull the
changes in, it’s just a matter of bumping the version number!

### Semantic Versioning

We use version numbers of the form `MAJOR.MINOR.PATCH` (e.g., `1.2.3`), following the principles of
_[semantic versioning](https://semver.org)_. In traditional semantic versioning, you increment the:

1. MAJOR version when you make incompatible API changes,
2. MINOR version when you add functionality in a backwards compatible manner, and
3. PATCH version when you make backwards compatible bug fixes.

However, much of the Gruntwork Infrastructure as Code Library is still not at version `1.0.0`. Most of the Gruntwork Infrastructure as Code Library is using `0.MINOR.PATCH` version numbers. With `0.MINOR.PATCH`, the rules are a bit different, where you increment the:

1. MINOR version when you make incompatible API changes
2. PATCH version when you add backwards compatible functionality or bug fixes.

## Updating to new versions

Follow the steps below to keep your code up to date:

1.  Make sure you're following our monthly [Gruntwork Newsletter](https://blog.gruntwork.io/tagged/gruntwork-newsletter) to be notified
    of all updates to the Gruntwork Infrastructure as Code Library. Alternatively, you can "watch" repos in GitHub that you’re
    interested in.

2.  When you find an update you’d like for a specific module, update any code using that module in
    `infrastructure-modules` to the new version number. For example, if you were using `terraform-aws-vpc` at `v0.18.5` and you
    wanted to update to `v0.7.3`, you would change from:

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

3.  Pay close attention to the release notes for any additional instructions. In particular, if the MINOR version number
    was increased (e.g., `v0.18.0` → `v0.19.0`), that implies a backwards incompatible change, and the release notes will
    explain what you need to do (e.g., you might have to add, remove, or change arguments you pass to the module).

4.  Test your changes locally. You do this using the same process outlined in [Manual tests for Terraform code](/intro/first-deployment/testing#manual-tests-for-terraform-code) and
    [Automated tests for Terraform code](/intro/first-deployment/testing#automated-tests-for-terraform-code).

5.  Deploy your changes to each environment. You do this using the same process outlined in [Deploying Terraform code](#deploy_terraform).
