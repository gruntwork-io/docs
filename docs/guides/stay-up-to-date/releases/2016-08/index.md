
# Gruntwork release 2016-08

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2016-08</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code 
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2016-08. For instructions 
on how to use these updates in your code, check out the [updating 
documentation](/guides/working-with-code/using-modules#updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-vpc](#terraform-aws-vpc)


## boilerplate


### [v0.0.5](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.0.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/26/2016 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.0.5">Release notes</a></small>
</p>

- Add support for a new option called `--missing-key-action` that defines what to do when a template looks up a variable that is not defined



### [v0.0.4](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.0.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/22/2016 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.0.4">Release notes</a></small>
</p>

- Update the `README.md` in the `_docs` folder rather than the auto-generated one in the root folder



### [v0.0.3](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.0.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/8/2016 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.0.3">Release notes</a></small>
</p>

- Add a bunch of new template helpers to make it easier to manipulate strings and numbers: `downcase`, `upcase`, `capitalize`, `replace`, `replaceAll`, `trim`, `round`, `ceil`, `floor`, `dasherize`, `snakeCase`, `camelCase`, `camelCaseLower`.




## terraform-aws-ci


### [v0.0.18](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.18)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/5/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.18">Release notes</a></small>
</p>

- The script `configure-environment-for-gruntwork-module` now optionally installs [Terragrunt](https://github.com/gruntwork-io/terragrunt). In addition, `terraform`, `terragrunt`, `packer`, and `glide` are now automatically placed in the system `PATH`. 




## terraform-aws-monitoring


### [v0.0.9](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.0.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/13/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.0.9">Release notes</a></small>
</p>

- Add a syslog module that allows you to configure rate limiting and log rotation settings syslog.




## terraform-aws-security


### [v0.0.3](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.0.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/23/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.0.3">Release notes</a></small>
</p>

- Add a new module called `ssh-iam` that allows your developers to upload their public SSH keys to IAM and use those to SSH to servers.



### [v0.0.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/15/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.0.2">Release notes</a></small>
</p>

- Add `auto-update` module to configure Amazon Linux or Ubuntu to automatically download and install the latest security updates.



### [v0.0.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.0.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/11/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.0.0">Release notes</a></small>
</p>

This release is used for internal testing only! Do not use it in production!




## terraform-aws-vpc


### [v0.1.0](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/31/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.1.0">Release notes</a></small>
</p>


BREAKING CHANGE: Upgrade module parameters to take advantage of the new data types introduced in Terraform 0.7.x: list and map. As a result of this change, this release is NOT backwards-compatible with Terraform 0.6.x. 

- All VPC output variables that used to return comma-separated strings now return proper lists (e.g. `public_subnet_cidr_blocks`, `private_app_subnet_ids`, `private_persistence_route_table_ids`, etc).
- Similarly, all VPC input variables that used to look for a comma-separated string now look for a proper list as well (e.g. `public_subnet_ids`, `private_app_subnet_cidr_blocks`). 
- The VPC modules no longer take `aws_availability_zones` as an input variable. They now determine this using the [aws_availability_zones data source](https://www.terraform.io/docs/providers/aws/d/availability_zones.html) instead. Unfortunately, due to a [limitation in Terraform](https://github.com/hashicorp/terraform/issues/3888), we cannot automatically tell how many AZs are available, so you must specify the number using the `num_availability_zones` variable.
- The Availability Zones output is now called `availability_zones` instead of `aws_ availability_zones`. 


- `vars.tf`:




<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "06764630f13390690d470871c85fa54a"
}
##DOCS-SOURCER-END -->
