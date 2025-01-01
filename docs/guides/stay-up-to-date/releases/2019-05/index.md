
# Gruntwork release 2019-05

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2019-05</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2019-05. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-messaging](#terraform-aws-messaging)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-kubernetes-helm](#terraform-kubernetes-helm)


## boilerplate


### [v0.2.24](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.24)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/15/2019 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.24">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/boilerplate/pull/49: This integrates [sprig](http://masterminds.github.io/sprig/) into `boilerplate` so that the sprig functions are available in the templates rendered by `boilerplate. Note that there are a few `boilerplate` functions that overlap with `sprig`. Each of these are now documented in the README. As such, starting this release those helpers are deprecated, and will be replaced with the `sprig` versions in a future release. Please review the deprecation notes [in the README](https://github.com/gruntwork-io/boilerplate#deprecated-helpers), pasted below for convenience.



These helpers are deprecated. They are currently available for backwards compatibility, but may be removed in future
versions. Please use the alternative supported forms listed in the description.

* `downcase STRING`: Same functionality as [lower in sprig](http://masterminds.github.io/sprig/strings.html#lower).
* `upcase STRING`: Same functionality as [upper in sprig](http://masterminds.github.io/sprig/strings.html#upper).
* `capitalize STRING`: Same functionality as [title in sprig](http://masterminds.github.io/sprig/strings.html#title).
* `snakeCase STRING`: Same functionality as [snakecase in sprig](http://masterminds.github.io/sprig/strings.html#snakecase).
* `camelCase STRING`: Same functionality as [camelcase in sprig](http://masterminds.github.io/sprig/strings.html#camelcase).

The following functions overlap with sprig, but have different functionality. There is an equivalent function listed
above under a different name. These point to the boilerplate implementations for backwards compatibility. Please migrate
to using the new naming scheme, as they will be updated to use the sprig versions in future versions of boilerplate.

* `round`: In boilerplate, `round` returns the integer form as opposed to float. E.g `&#x7B;&#x7B; round 123.5555 &#x7D;&#x7D;` will return
  `124`. The following supported alternative functions are available:
    - `roundFloat`: The sprig version of [round](http://masterminds.github.io/sprig/math.html#round), which supports
      arbitrary decimal rounding. E.g `&#x7B;&#x7B; round 123.5555 3 &#x7D;&#x7D;` returns `123.556`. Note that `&#x7B;&#x7B; round 123.5555 0 &#x7D;&#x7D;`
      returns `124.0`.
    - `roundInt`: Another name for the boilerplate version of `round`. Use this if you would like to keep old behavior.
* `ceil` and `floor`: In boilerplate, `ceil` and `floor` return integer forms as opposed to floats. E.g `&#x7B;&#x7B; ceil 1.1
  &#x7D;&#x7D;` returns `2`, as opposed to `2.0` in the sprig version. The following supported alternative functions are
  available:
    - `ceilFloat` and `floorFloat`: The sprig version of [ceil](http://masterminds.github.io/sprig/math.html#ceil) and
      [floor](http://masterminds.github.io/sprig/math.html#floor).
    - `ceilInt` and `floorInt`: Another name for the boilerplate version `ceil` and `floor`. Use this if you would like to keep old behavior.
* `env`: In boilerplate, `env` supports returning a default value if the environment variable is not defined. The
  following supported alternative functions are available:
    - `readEnv`: The sprig version of [env](http://masterminds.github.io/sprig/os.html). This always returns empty
      string if the environment variable is undefined.
    - `envWithDefault`: Another name for the boilerplate version of `env`. Use this if you would like to keep old
      behavior.
* `keys`: In boilerplate, `keys` returns the keys of the map in sorted order. The following supported alternative
  functions are available:
    - `keysUnordered`: The sprig version of [keys](http://masterminds.github.io/sprig/dicts.html#keys). This returns the
      list of keys in no particular order, and there is no guarantee that the order of the returned list is consistent.
    - `keysSorted`: Another name for the boilerplate version of `keys`. Use this if you would like to keep old
      behavior.
* `replace`: In boilerplate, `replace` only replaces the first occurrence in the string, as opposed to all occurrences
  as in sprig. The following supported alternative functions are available:
    - `replaceAll`: The sprig version of [replace](http://masterminds.github.io/sprig/strings.html#replace).
    - `replaceOne`: Another name for the boilerplate version of `replace`. Use this if you would like to keep old
      behavior.
* `slice`: In boilerplate, `slice` returns a list of numbers in the provided range. E.g `&#x7B;&#x7B; slice 1 5 1 &#x7D;&#x7D;` returns
  the list `[1, 2, 3, 4]`. The following supported alternative functions are available:
    - `sliceList`: The sprig version of [slice](http://masterminds.github.io/sprig/lists.html#slice), which returns the
      slice of the given list. E.g `&#x7B;&#x7B; slice list n m &#x7D;&#x7D;` returns `list[n:m]`.
    - `numRange`: Another name for the boilerplate version of `slice`. Use this if you would like to keep old
      behavior.
* `trimPrefix` and `trimSuffix`: In boilerplate, `trimPrefix` and `trimSuffix` takes the base string first. E.g
  `&#x7B;&#x7B; trimPrefix hello-world hello &#x7D;&#x7D;` returns `-world`. The following supported alternative functions are available:
    - `trimPrefixSprig` and `trimSuffixSprig`: The sprig version of
      [trimPrefix](http://masterminds.github.io/sprig/strings.html#trimPrefix) and
      [trimSuffix](http://masterminds.github.io/sprig/strings.html#trimSuffix). Unlike the boilerplate version, this takes the trim text first so that you can pipeline the trimming. E.g `&#x7B;&#x7B; &quot;hello-world&quot; | trimPrefix &quot;hello&quot; &#x7D;&#x7D;` returns `&#x7B;&#x7B; -world &#x7D;&#x7D;`.
    - `trimPrefixBoilerplate` and `trimSuffixBoilerplate`: Another name for the boilerplate versions of `trimPrefix`
      and `trimSuffix`. Use this if you would like to keep old behavior.


</div>



## terraform-aws-ci


### [v0.13.14](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.14)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/8/2019 | Modules affected: gruntwork-module-circleci-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.14">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `gruntwork-module-circleci-helpers`: Ensure the latest golang version is always installed



</div>



## terraform-aws-ecs


### [v0.13.4](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.13.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/20/2019 | Modules affected: ecs-service-with-discovery, ecs-service-with-alb, ecs-fargate, ecs-daemon-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.13.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- All the ECS service modules now allow you to optionally specify a custom prefix to use for the IAM execution role. The default value is to use the service name as before.



</div>


### [v0.13.3](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.13.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/9/2019 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.13.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now set a custom name prefix for the IAM roles created by the `ecs-service` module using the new `task_execution_name_prefix` input variable. The default is `var.service_name`, as before.



</div>


### [v0.13.2](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.13.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/1/2019 | Modules affected: ecs-fargate | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.13.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- This release fixes a bug where the `fargate_without_lb` resource incorrectly set a `health_check_grace_period_seconds`. From [the terraform documentation](https://www.terraform.io/docs/providers/aws/r/ecs_service.html), &quot;Health check grace period is only valid for services configured to use load balancers&quot;.


</div>



## terraform-aws-eks


### [v0.5.4](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.5.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/9/2019 | Modules affected: eks-k8s-role-mapping, eks-cluster-control-plane, eks-cluster-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.5.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update package-terraform-utilities to latest version with terraform fmt to avoid drift
- Add option to add load balancers to the eks worker asg


</div>


### [v0.5.3](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.5.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/1/2019 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.5.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release confirms that `external-dns` and ALB ingress controller support ACM certificates. Additionally, this release extends the timeout for EKS cluster creation as some regions take longer than 15 minutes to provision the EKS cluster.



</div>



## terraform-aws-messaging


### [v0.2.0](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/13/2019 | Modules affected: sqs | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `sqs` **[BREAKING CHANGES]**


* The `sqs` module had a very unsafe default configuration that allowed unauthenticated incoming requests from any IP. In this update, IP-based access is now disabled completely by default. Unless you intend to allow unauthenticated IP-based, we **strongly recommend updating** to this new version. If you wish to preserve the original IP-based access, set `apply_ip_queue_policy` to `true` and specify the IPs that should be able to access the queue via `allowed_cidr_blocks`.


A huge thanks to @burtino for spotting this and providing a fix.


* https://github.com/gruntwork-io/package-messaging/pull/21

</div>



## terraform-aws-monitoring


### [v0.12.5](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.12.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/21/2019 | Modules affected: logs | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.12.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixes policy principal so NLBs can write to S3 bucket



</div>


### [v0.12.4](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.12.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/14/2019 | Modules affected: logs/load-balancer-access-logs | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.12.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- This release adds conditional support for the `logs/load-balancer-access-logs` module. You can now set `create_resources = false` on the module call to avoid creating the S3 bucket.



</div>


### [v0.12.3](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.12.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/9/2019 | Modules affected: All | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.12.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now set tags on all the `alarms` modules via a new `tags` input variable.
- You can now configure the snapshot period and snapshot evaluation period for the `elasticsearch-alarms` module using the new `snapshot_period` and `snapshot_evaluation_period` input variables, respectively. 
- We made a few fixes/improvements to our examples and docs, including fixing a bug with `source_ami_filter` for the example CentOS Packer template and cleaning up some typos.



</div>



## terraform-aws-security


### [v0.16.4](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.16.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/24/2019 | Modules affected: cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.16.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now configure an optional SNS delivery notification topic for the `cloudtrail` module using a new  `sns_delivery_topic` input variable.


</div>


### [v0.16.3](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.16.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/15/2019 | Modules affected: iam-groups | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.16.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now tell the `iam-groups` module to not create the &quot;access-all&quot; group by setting the new input variable `should_create_iam_group_cross_account_access_all` to false. This can help work around an AWS limitation where we exceed the max IAM policy length.


</div>


### [v0.16.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.16.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/3/2019 | Modules affected: fail2ban | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.16.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release fixes https://github.com/gruntwork-io/module-security/issues/89, where `fail2ban` was not correctly working on non-ubuntu instances. Specifically:

- For CentOS and Amazon Linux 2, `fail2ban` installed `firewalld`. `firewalld` by default disallows all inbound access except for SSH, which leads to frustrating UX where you have to explicitly enable your web services running on the instance. Additionally, this behavior doesn&apos;t play well with docker clusters like ECS and EKS, where the service ports are dynamic. This release fixes this behavior by updating `firewalld` to default to trust all traffic. See https://github.com/gruntwork-io/module-security/blob/master/modules/fail2ban/README.md#default-zone-for-firewalld-amazon-linux-2-and-centos for more info.
- For Amazon Linux 1, the `fail2ban` configuration had a bug where it was not starting up correctly. This release fixes that so that `fail2ban` starts correctly.
- For Amazon Linux 1, the default regex for searching for failed SSH attempts was incorrect for the messages actually emitted by sshd on the platform. This release installs updated regex rules that properly detect the failing messages.
- For CentOS and RHEL, the `configure-fail2ban-cloudwatch.sh` script had a bug preventing execution. This release fixes that.



</div>



## terraform-kubernetes-helm


### [v0.4.0](https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/16/2019 | Modules affected: k8s-tiller, k8s-tiller-tls-certs, k8s-helm-client-tls-certs | <a href="https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.4.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This brings in TLS generation into the `k8s-tiller` module. In particular, `k8s-tiller` has a new required variable `tiller_tls_gen_method` which indicates how the module should generate the TLS certificates. Currently there are three options:

- `kubergrunt`: Use the [kubergrunt utility](https://github.com/gruntwork-io/kubergrunt) to generate the TLS certificates and upload as a Kubernetes `Secret` resource.
- `provider`: Use the [tls Terraform provider](https://www.terraform.io/docs/providers/tls/index.html) to generate the TLS certs, and then use the [kubernetes provider](https://www.terraform.io/docs/providers/kubernetes/index.html) to upload them as a Kubernetes `Secret` resource.
- `none`: Don&apos;t generate any TLS certs and look them up based on the input variable `tiller_tls_secret_name`.

The characteristics of the three approaches are summarized in the table below. You can refer to the [module README](https://github.com/gruntwork-io/terraform-kubernetes-helm/tree/master/modules/k8s-tiller) for more details.

| **Method** | **Amount of Control** | **Terraform Features** | **Secrets in Terraform State**            | **External Dependencies**                    |
|------------|-----------------------|------------------------|-------------------------------------------|----------------------------------------------|
| Direct     | Full control          | N/A                    | Only references                           | Yes (TLS certs must be generated externally) |
| Provider   | Limited control       | Full support           | All Secrets are stored in Terraform State | No                                           |
| Kubergrunt | Limited control       | Limited support        | Only references                           | Yes (kubergrunt binary)                      |

Additionally, this introduces the [k8s-tiller-tls-certs](https://github.com/gruntwork-io/terraform-kubernetes-helm/tree/master/modules/k8s-tiller-tls-certs) and [k8s-helm-client-tls-certs](https://github.com/gruntwork-io/terraform-kubernetes-helm/tree/master/modules/k8s-helm-client-tls-certs) modules, which can be used to manually manage the TLS certificates for Tiller using the tls Terraform provider. Refer to the module READMEs for more details.

You can refer to the [updated root example](https://github.com/gruntwork-io/terraform-kubernetes-helm) for example usage of the new modules.



</div>


### [v0.3.2](https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.3.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/8/2019 | <a href="https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.3.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This updates the READMEs in all the modules to be compatible with the Terraform registry.



</div>


### [v0.3.1](https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.3.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/6/2019 | Modules affected: k8s-namespace, k8s-namespace-roles | <a href="https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.3.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `k8s-namespace` and `k8s-namespace-roles` modules now support conditionally creating the namespace and roles via the `create_resources` input variable.



</div>


### [v0.3.0](https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/2/2019 | Modules affected: k8s-tiller, k8s-service-account, k8s-namespace, k8s-namespace-roles | <a href="https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release introduces a new module `k8s-tiller`, which can be used to use manage Tiller deployments using Terraform. The difference with the `kubergrunt` approach is that this supports using Terraform to apply updates to the Tiller `Deployment` resource. E.g you can now upgrade Tiller using Terraform, or update the number of replicas of Tiller `Pods` to deploy. Note that you still need to use `kubergrunt` to manage the TLS certificates.

The other modules have backwards compatible minor changes in the way dependencies are managed.



</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "609239358eb36eb1a6d727fec29ed0dc"
}
##DOCS-SOURCER-END -->
