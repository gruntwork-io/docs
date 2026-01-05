
# Gruntwork release 2016-08

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2016-08</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2016-08. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

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

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Add support for a new option called `--missing-key-action` that defines what to do when a template looks up a variable that is not defined


</div>


### [v0.0.4](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.0.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/22/2016 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.0.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Update the `README.md` in the `_docs` folder rather than the auto-generated one in the root folder


</div>


### [v0.0.3](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.0.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/8/2016 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.0.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Add a bunch of new template helpers to make it easier to manipulate strings and numbers: `downcase`, `upcase`, `capitalize`, `replace`, `replaceAll`, `trim`, `round`, `ceil`, `floor`, `dasherize`, `snakeCase`, `camelCase`, `camelCaseLower`.


</div>



## terraform-aws-ci


### [v0.0.18](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.18)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/5/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.18">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - The script `configure-environment-for-gruntwork-module` now optionally installs [Terragrunt](https://github.com/gruntwork-io/terragrunt). In addition, `terraform`, `terragrunt`, `packer`, and `glide` are now automatically placed in the system `PATH`. 


</div>



## terraform-aws-monitoring


### [v0.0.9](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.0.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/13/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.0.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Add a syslog module that allows you to configure rate limiting and log rotation settings syslog.


</div>



## terraform-aws-security


### [v0.0.3](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.0.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/23/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.0.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Add a new module called `ssh-iam` that allows your developers to upload their public SSH keys to IAM and use those to SSH to servers.


</div>


### [v0.0.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/15/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Add `auto-update` module to configure Amazon Linux or Ubuntu to automatically download and install the latest security updates.


</div>


### [v0.0.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.0.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/11/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.0.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  This release is used for internal testing only! Do not use it in production!


</div>



## terraform-aws-vpc


### [v0.1.0](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/31/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
BREAKING CHANGE: Upgrade module parameters to take advantage of the new data types introduced in Terraform 0.7.x: list and map. As a result of this change, this release is NOT backwards-compatible with Terraform 0.6.x. 

- All VPC output variables that used to return comma-separated strings now return proper lists (e.g. `public_subnet_cidr_blocks`, `private_app_subnet_ids`, `private_persistence_route_table_ids`, etc).
- Similarly, all VPC input variables that used to look for a comma-separated string now look for a proper list as well (e.g. `public_subnet_ids`, `private_app_subnet_cidr_blocks`). 
- The VPC modules no longer take `aws_availability_zones` as an input variable. They now determine this using the [aws_availability_zones data source](https://www.terraform.io/docs/providers/aws/d/availability_zones.html) instead. Unfortunately, due to a [limitation in Terraform](https://github.com/hashicorp/terraform/issues/3888), we cannot automatically tell how many AZs are available, so you must specify the number using the `num_availability_zones` variable.
- The Availability Zones output is now called `availability_zones` instead of `aws_ availability_zones`. 


- `vars.tf`:
  - [Example diff](https://github.com/gruntwork-io/module-vpc/compare/c83c30f998f8486537e7308dcdfbcd5cdf34bffa...master?diff=unified&amp;name=master#diff-14c7cc73490c3d2d8347d14cb8a44729) and 
  - Remove the `aws_availability_zones` variable. 
  - Add a variable called `num_availability_zones`. This represents the number of availability zones usable by this AWS account for the current AWS region. Set its `default` value to 2, 3, or 4, depending on your region.
- `main.tf`
  - [Example diff](https://github.com/gruntwork-io/module-vpc/compare/c83c30f998f8486537e7308dcdfbcd5cdf34bffa...master?diff=unified&amp;name=master#diff-8140c347465c3fb50113f34a03f9c0d1) (ignore the `user_data` stuff)
  - Update the `ref` of the `vpc-mgmt` and `vpc-mgmt-network-acls` URLs to `0.1.0`.
  - In the `mgmt_vpc` module, instead of setting `aws_availability_zones = &quot;$&#x7B;var.aws_availability_zones&#x7D;&quot;`, set `num_availability_zones = &quot;$&#x7B;var.num_availability_zones&#x7D;&quot;`.
  - In the `mgmt_vpc_network_acls` module, instead of setting `num_subnets = &quot;$&#x7B;length(split(&quot;,&quot;, var.aws_availability_zones))&#x7D;&quot;`, set `num_subnets = &quot;$&#x7B;var.num_availability_zones&#x7D;&quot;`. 
  - In the `mgmt_vpc_network_acls` module, if you don&apos;t have it already, set a new parameter: `vpc_ready = &quot;$&#x7B;module.mgmt_vpc.vpc_ready&#x7D;&quot;`.
- Deploy:
  - Run `terragrunt get -update`
  - Run `terragrunt plan`
  - You may see a few Network ACLs being created and destroyed. That&apos;s OK.
  - You should NOT see the VPC, any route tables, or any subnets being created or destroyed. If you do, let us know (support@gruntwork.io)!
  - If everything looks OK, run `terragrunt apply`.


These use the exact same upgrade process as the mgmt VPC, except there are some additional steps for the peering connection:
- `main.tf`:
  - [Example diff](https://github.com/gruntwork-io/module-vpc/compare/c83c30f998f8486537e7308dcdfbcd5cdf34bffa...master?diff=unified&amp;name=master#diff-3c06616a9c2b49d630e46d8439b63a8c) (ignore the `user_data` stuff)
  - Update the `ref` of the `vpc-peering` URL to `0.1.0`.
  - Instead of manually concatenating values in a string for the `origin_vpc_route_table_ids` and `destination_vpc_route_table_ids` parameters, use the [concat](https://www.terraform.io/docs/configuration/interpolation.html#concat_list1_list2_) and [list](https://www.terraform.io/docs/configuration/interpolation.html#list_items_) functions. You should get something like `origin_vpc_route_table_ids = &quot;$&#x7B;concat(data.terraform_remote_state.mgmt_vpc.private_subnet_route_table_ids, list(data.terraform_remote_state.mgmt_vpc.public_subnet_route_table_id))&#x7D;&quot;`. 
  - Replace `length(split(&quot;,&quot;, var.aws_availability_zones))` in the calculation of the `num_origin_vpc_route_tables` and `num_destination_vpc_route_tables` parameters with `var.num_availability_zones`. The other parts of the calculation (e.g. the +1 and the *2) stay the same.
- Deploy:
  - Same process as the mgmt VPC above.
  - Other than minor Network ACL changes, you should not see anything being destroyed. If you do, this could lead to outage, so please notify us (support@gruntwork.io)!


You can update other variables and outputs to lists (e.g. `var.aws_account_ids`), get rid of unnecessary `split` and `join` usage, and upgrade `terraform_remote_state` usage to data sources. See the [Terraform 0.7 upgrade guide](https://www.terraform.io/upgrade-guides/0-7.html) for details.


Finally, when using other modules that depend on outputs from your VPC, note that the outputs are now lists rather than strings, so you may want to update those other modules to the 0.7 versions (see their release notes) or you may need to add or remove some calls to `split` and `join`.


ENHANCEMENT: `vpc-app` and `vpc-mgmt` now allow for specifying the exact CIDR blocks to be used for all subnets.


</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "39fcf4fcae7d86b79e55ee1d4ad807ee"
}
##DOCS-SOURCER-END -->
