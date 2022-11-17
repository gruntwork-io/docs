
# Gruntwork release 2018-11

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2018-11</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code 
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2018-11. For instructions 
on how to use these updates in your code, check out the [updating 
documentation](/guides/working-with-code/using-modules#updating).

Here are the repos that were updated:

- [gruntkms](#gruntkms)
- [gruntwork](#gruntwork)
- [package-k8s](#package-k-8-s)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-zookeeper](#terraform-aws-zookeeper)


## gruntkms


### [v0.0.7](https://github.com/gruntwork-io/gruntkms/releases/tag/v0.0.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/10/2018 | <a href="https://github.com/gruntwork-io/gruntkms/releases/tag/v0.0.7">Release notes</a></small>
</p>

https://github.com/gruntwork-io/gruntkms/pull/16: Update all dependency versions, including updating to the latest AWS Go SDK. This should ensure `gruntkms` works with the latest AWS metadata endpoints, including the ECS Task metadata endpoints.



## gruntwork


### [v0.0.25](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.25)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/6/2018 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.25">Release notes</a></small>
</p>

https://github.com/gruntwork-io/gruntwork/pull/36: Update AWS account we use to access other accounts.


### [v0.0.24](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.24)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/6/2018 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.24">Release notes</a></small>
</p>

https://github.com/gruntwork-io/gruntwork/pull/35: Update list of GitHub users on Gruntwork team.



## package-k8s


### [v0.0.2](https://github.com/gruntwork-io/package-k8s/releases/tag/v0.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/26/2018 | Modules affected: eks-vpc-tags | <a href="https://github.com/gruntwork-io/package-k8s/releases/tag/v0.0.2">Release notes</a></small>
</p>


- `eks-vpc-tags`


This release contains implementations for the following modules:

- `eks-vpc-tags`: A module exporting common tags necessary for VPC resources in order to have a functional EKS environment. Refer to the updated `eks-cluster` example for reference on how to use the tags exported by this module.


- This release is not intended to be used in production, as core features of a production grade infrastructure is still missing. This is currently intended to be used for development and learning purposes so that you can plan out a migration to Gruntwork modules for managing EKS.


### [v0.0.1: Development Grade EKS Cluster](https://github.com/gruntwork-io/package-k8s/releases/tag/v0.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/23/2018 | Modules affected: eks-cluster-control-plane, eks-cluster-workers, eks-k8s-role-mapping, install-eks-aws-iam-authenticator | <a href="https://github.com/gruntwork-io/package-k8s/releases/tag/v0.0.1">Release notes</a></small>
</p>


- `eks-cluster-control-plane`
- `eks-cluster-workers`
- `eks-k8s-role-mapping`
- `install-eks-aws-iam-authenticator`
- `k8s-scripts`


This initial release contains implementations for the following modules:




## terraform-aws-ci


### [v0.13.4](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/22/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.4">Release notes</a></small>
</p>


```
Some commit message. [go-test-args=-run SomeTestFunc]
```

The above commit message will only run `SomeTestFunc` test function in the CI server after a push



## terraform-aws-data-storage


### [v0.8.1](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.8.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/22/2018 | Modules affected: aurora | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.8.1">Release notes</a></small>
</p>


* `aurora`


* You can now enable performance insights using two new (optional) parameters, `performance_insights_enabled` and `performance_insights_kms_key_id`.


* https://github.com/gruntwork-io/module-data-storage/pull/63


### [v0.8.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.8.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/15/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.8.0">Release notes</a></small>
</p>



To update your existing encryption enabled RDS cluster (which most likely uses serverless engine mode, else you'd have run into an error), simply run:

```
terragrunt state mv module.<module-name>.aws_rds_cluster.cluster_with_encryption module.<module-name>.aws_rds_cluster.cluster_with_encryption_serverless
```


### [v0.7.1](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.7.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/7/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.7.1">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-data-storage/pull/59, https://github.com/gruntwork-io/module-data-storage/pull/60, https://github.com/gruntwork-io/module-data-storage/pull/61: New features in the `aurora` module!

* *Add support for Aurora serverless*: You can now set the `engine_mode` parameter to `provisioned` or `serverless`. You can also set scaling configuration settings using the `scaling_configuration_xxx` parameters.

* *Add support for deletion protection*: You can set `deletion_protection` to `true` to prevent a database from being deleted by accident.



## terraform-aws-ecs


### [v0.10.2](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.10.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/28/2018 | Modules affected: ecs-deploy-check-binaries | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.10.2">Release notes</a></small>
</p>


- `ecs-deploy-check-binaries`


- Preliminary windows support for `check-ecs-service-deployment` script by using python as opposed to bash for the entrypoint. Also rebuilds the binaries to include windows versions of the dependencies.


- https://github.com/gruntwork-io/module-ecs/pull/99


### [v0.10.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.10.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/23/2018 | Modules affected: ecs-deploy-check-binaries | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.10.1">Release notes</a></small>
</p>


- `ecs-deploy-check-binaries`


- Fixes a bug in the `check-ecs-service-deployment` script where it did not properly detect the major python version on certain OS versions.


- https://github.com/gruntwork-io/module-ecs/pull/97



## terraform-aws-security


### [v0.15.5](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.15.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/28/2018 | Modules affected: cross-account-iam-roles, iam-groups, iam-policies | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.15.5">Release notes</a></small>
</p>


* `cross-account-iam-roles`
* `iam-groups`
* `iam-policies`


* The `cross-account-iam` roles module now exposes an optional `allow_houston_cli_access_from_other_account_arns` parameter that allows you to specify the ARNs of other AWS accounts that will be allowed to call the CLI endpoints in Gruntwork Houston.
* The `iam-groups` module now exposes an optional `should_create_iam_group_houston_cli_users` parameter that, if set to true, will create an IAM Group with permissions that grants its users permissions to call the CLI endpoints in Gruntwork Houston.
* The `iam-policies` module now exposes an output called `houston_cli_permissions` that creates the permissions necessary to call the CLI endpoints in Gruntwork Houston.



### [v0.15.4](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.15.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/11/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.15.4">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-security/pull/119: The `cloudtrail` module now exposes a `force_destroy` flag you can use to forcibly delete all the contents of the CloudTrail S3 bucket when you run `destroy`.



## terraform-aws-static-assets


### [v0.4.0](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/29/2018 | Modules affected: s3-cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.4.0">Release notes</a></small>
</p>


* `s3-cloudfront`


* The `s3-cloudfront` module will now automatically create an `AAAA` alias record (in addition to the `A` record it always created) if `is_ipv6_enabled` and `create_route53_entries ` are both set to `true`. This is necessary so your static websites work over IPv6. 


* https://github.com/gruntwork-io/package-static-assets/pull/16


### [v0.3.4](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.3.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/21/2018 | Modules affected: s3-static-website, s3-cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.3.4">Release notes</a></small>
</p>


* `s3-static-website`
* `s3-cloudfront`


You can now specify custom tags for all S3 buckets created by these modules using the new (optional) `custom_tags` parameter.


* https://github.com/gruntwork-io/package-static-assets/pull/14


### [v0.3.3](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.3.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/12/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.3.3">Release notes</a></small>
</p>

https://github.com/gruntwork-io/package-static-assets/pull/13: Expose `force_destroy_website` and `force_destroy_redirect` flags in the `s3-static-website` module. You can use these flags to force the module S3 buckets in the module to be destroyed, even if they still have content in them.



## terraform-aws-zookeeper


### [v0.4.9](https://github.com/gruntwork-io/terraform-aws-zookeeper/releases/tag/v0.4.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/5/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/releases/tag/v0.4.9">Release notes</a></small>
</p>






<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "aa03777bc64a693ddf6843da61cfeaf0"
}
##DOCS-SOURCER-END -->
