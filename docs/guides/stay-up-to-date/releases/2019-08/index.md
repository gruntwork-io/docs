
# Gruntwork release 2019-08

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2019-08</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2019-08. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [gruntwork](#gruntwork)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-vpc](#terraform-aws-vpc)


## gruntwork


### [v0.1.0](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/19/2019 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/gruntwork/pull/48 : Add support for bootstrapping GCP Reference Architecture. This version introduces a new set of commands under the subcommand `gcp` for setting up your GCP org for deploying the Gruntwork GCP Reference Architecture.

</div>



## terraform-aws-openvpn


### [v0.9.4](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.9.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/6/2019 | Modules affected: install-openvpn, init-openvpn | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.9.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add support for Duo OpenVPN Plugin for 2fa



</div>



## terraform-aws-security


### [v0.18.5: Added aws-config module](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.18.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/29/2019 | Modules affected: aws-config | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.18.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release adds a module for [AWS Config](https://aws.amazon.com/config/). The module creates an S3 bucket and an SNS topic (or accepts an existing bucket/topic) and creates a config recorder in the given region. The module does not manage Config Rules. In a future update we may add a recommended set of Config Rules.




</div>


### [v0.18.4: Updates to the CloudTrail module](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.18.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/29/2019 | Modules affected: cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.18.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- The CloudTrail S3 bucket now has [public access disabled](https://www.terraform.io/docs/providers/aws/r/s3_bucket_public_access_block.html).
- S3 Server Access Logging: This release adds an option to enable [Server Access Logging](https://docs.aws.amazon.com/AmazonS3/latest/dev/cloudtrail-logging.html#cloudtrail-logging-vs-server-logs) for the CloudTrail S3 bucket. To use this feature, simply set `enable_s3_server_access_logging` to `true` (defaults to `false`). It will create a bucket for Access Logs, make sure the bucket does not allow public access policies, and enable S3 Access Logging to the new bucket on the Cloudtrail Bucket.
- CloudWatch Logs integration: This release adds [integration for CloudTrail with CloudWatch Logs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/logging_cw_api_calls_cwl.html). To enable this feature, provide a CloudWatch Logs group name by setting the `cloudwatch_logs_group_name` variable. The module will create the log group and configure CloudTrail accordingly.



</div>


### [v0.18.3](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.18.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/21/2019 | Modules affected: iam-users | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.18.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- We&apos;ve added a new module called `iam-users` that you can use to create and manage IAM users as code. The module can create IAM users, add them to IAM groups, and generate console passwords and access keys for them, encrypting each with PGP so they don&apos;t end up in plaintext in Terraform state.



</div>


### [v0.18.2: Enable KMS key rotation by default](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.18.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/15/2019 | Modules affected: kms-master-key, cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.18.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The cloudtrail and kms-master-key modules each create KMS key resources. Previously, [key rotation](https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html) was disabled on these keys. This change enables key rotation by default. Any existing keys will be updated in place to have key rotation enabled. If you prefer to have to key rotation enabled, set `enable_key_rotation=false`



</div>


### [v0.18.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.18.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/14/2019 | Modules affected: iam-groups | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.18.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix bug where when upgrading the `iam-groups` module to tf12 with existing resources, `terraform` gets into a state where you can&apos;t `apply`, `plan`, or `destroy`.



</div>


### [v0.18.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.18.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/9/2019 | Modules affected: ssh-grunt, iam-groups | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.18.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

`ssh-grunt` now supports passing in multiple IAM groups (by passing in `--iam-group` and `--iam-group-sudo` multiple times) to sync. When multiple groups are passed, users who are in at least one of the list of groups passed in will be synced to the server.

`iam-groups` now supports creating multiple `ssh-grunt` IAM groups that can be used to differentiate different groups of servers. Note that this is a backwards incompatible change: see the migration guide below for more details.


</div>



## terraform-aws-server


### [v0.7.3](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.7.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/21/2019 | Modules affected: single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.7.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `single-server` now properly returns the public IP when `attach_eip` is `false`.



</div>



## terraform-aws-static-assets


### [v0.5.3](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.5.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/1/2019 | Modules affected: s3-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.5.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix `type` constraint on the `cors_rule` input variable in `s3-static-website`.


</div>



## terraform-aws-vpc


### [v0.7.3](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.7.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/19/2019 | Modules affected: vpc-flow-logs | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.7.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The key managers for a KMS key used to encrypt VPC flow logs must now be provided as a variable. This is to avoid the situation in which different users running terraform will cause updates to the KMS key policy on each invocation.


</div>


### [v0.7.2](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.7.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/12/2019 | Modules affected: vpc-flow-logs | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.7.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Conditionally create a key (fixes #75) - previously, if a KMS key was specified when creating a flow log, the module would still create an (unused) KMS key. This release fixes that issue and adds regression tests to catch potential future related issues.



</div>


### [v0.7.1](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.7.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/7/2019 | Modules affected: vpc-flow-logs | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.7.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This release adds a new submodule for managing [VPC Flow Logs](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html). Flow Logs capture IP traffic information, allowing you to observe, debug, and evaluate the network traffic to and from resources in a VPC. 

The module has support for the following features:
* Manage flow logs for VPCs, subnets, and Elastic Network Interfaces (ENIs)
* Publish logs to CloudWatch Logs or to an S3 bucket
* Log retention policies (for CloudWatch: log retention, for S3: lifecycle rules)





</div>


### [v0.7.0](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.7.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/7/2019 | Modules affected: vpc-app-network-acls | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.7.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `vpc-app-network-acls` module now sets `allow_access_from_mgmt_vpc` to `false` by default. This is a more sane default because (a) it&apos;s more secure and (b) `mgmt_vpc_cidr_block` is `null` by default, so if you left all parameters at their defaults, it doesn&apos;t actually work. If you are upgrading to this new version and you want to allow access to an app VPC from a mgmt VPC via VPC peering, you must now explicitly set `allow_access_from_mgmt_vpc` to true.



</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "be31556b6d645709e9dde3acb85742fd"
}
##DOCS-SOURCER-END -->
