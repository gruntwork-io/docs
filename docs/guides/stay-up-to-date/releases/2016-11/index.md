
# Gruntwork release 2016-11

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2016-11</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code 
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2016-11. For instructions 
on how to use these updates in your code, check out the [updating 
documentation](/guides/working-with-code/using-modules#updating).

Here are the repos that were updated:

- [gruntkms](#gruntkms)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-monitoring](#terraform-aws-monitoring)


## gruntkms


### [v0.0.4](https://github.com/gruntwork-io/gruntkms/releases/tag/v0.0.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/4/2016 | <a href="https://github.com/gruntwork-io/gruntkms/releases/tag/v0.0.4">Release notes</a></small>
</p>

- Update to a new version of the AWS golang SDK that should support IAM Roles for ECS Tasks.




## terraform-aws-ci


### [v0.0.25](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.25)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/15/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.25">Release notes</a></small>
</p>

- Undo the fix in configure-environment-for-gruntwork-module from the previous release because, apprently, _only_ Terraform 0.7.7 dropped the "v" in the versioning scheme (0.7.7 and not v0.7.7). All the versions after that have re-added the "v", so this release updates the script to handle it again.




## terraform-aws-monitoring


### [v0.3.2](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.3.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/3/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.3.2">Release notes</a></small>
</p>

- ENHANCEMENT: Many of the [CloudWatch Alarms](https://github.com/gruntwork-io/module-aws-monitoring/tree/master/modules/alarms) now expose parameters for the setting the `Evaluation Periods` and `Statistic` properties to allow finer-grained control by customers.
  - The `Evaluation Periods` property is the number of periods over which a CloudWatch metric's data is compared to a given threshold.
  - The `Statistic` property is the statistic to apply to a CloudWatch Alarm's associated metric. Acceptable Values are `SampleCount`, `Average`, `Sum`, `Minimum`, or `Maximum`.
- TWEAK: Many Amazon services report CloudWatch metrics every 60 seconds, and the [CloudWatch Alarms](https://github.com/gruntwork-io/module-aws-monitoring/tree/master/modules/alarms) now reflect that period where applicable as a default.





<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "a32a0ab57887a0ae57bb9af0e47422b9"
}
##DOCS-SOURCER-END -->
