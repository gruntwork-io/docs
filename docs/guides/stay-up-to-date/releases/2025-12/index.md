
# Gruntwork release 2025-12

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2025-12</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2025-12. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [patcher-cli](#patcher-cli)
- [pipelines-actions](#pipelines-actions)
- [pipelines-cli](#pipelines-cli)
- [pipelines-workflows](#pipelines-workflows)
- [repo-copier](#repo-copier)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-static-assets](#terraform-aws-static-assets)


## patcher-cli


### [v0.17.0](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.17.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/4/2025 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.17.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/patcher/releases/tag/v0.17.0

</div>


### [v0.17.0-alpha1](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.17.0-alpha1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/4/2025 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.17.0-alpha1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/patcher/releases/tag/v0.17.0-alpha1

</div>



## pipelines-actions


### [v4.1.3](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v4.1.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/18/2025 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v4.1.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * DEV-1246 Remove greedy ansi removing regex. Ansi is removed in the binary now by @Resonance1584 in https://github.com/gruntwork-io/pipelines-actions/pull/148


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v4.1.2...v4.1.3

</div>



## pipelines-cli


### [v0.42.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.42.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/5/2025 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.42.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add EXPERIMENT_GENERATE_ALL_STACKS by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/503
* Fix ReadLastDriftHistoryEntry implementation by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/504


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.41.0...v0.42.0


</div>


### [v0.41.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.41.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/1/2025 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.41.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Ignore units not in an environment by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/501


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.40.7...v0.41.0


</div>



## pipelines-workflows


### [v4.2.1](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.2.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/18/2025 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.2.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Fixed a bug causing some lines in the plan comment to drop characters at the beginning of the line

**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v4...v4.2.1

</div>


### [v4.2.0](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/5/2025 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Added `PIPELINES_FEATURE_EXPERIMENT_GENERATE_ALL_STACKS` this feature causes Pipelines to generate all stacks before running a plan or apply operation. See [the docs](https://docs.gruntwork.io/2.0/reference/pipelines/feature-flags/#pipelines_feature_experiment_generate_all_stacks) for more info.

- Fixed a bug causing the wrong unit to be plan/applied during drift remediation inside stacks

**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v4...v4.2.0

</div>


### [v4.1.0](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/2/2025 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Added experimental feature flag `PIPELINES_FEATURE_EXPERIMENT_IGNORE_UNITS_WITHOUT_ENVIRONMENT`. This feature flag makes Pipelines ignore changes if they have no environment defined - and is intended to help simplify adding Pipelines to existing repositories.

See the [documentation](https://docs.gruntwork.io/2.0/reference/pipelines/feature-flags#pipelines_feature_experiment_ignore_units_without_environment) for full details.


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v4...v4.1.0

</div>



## repo-copier


### [v0.7.0](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.7.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/5/2025 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.7.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add error suggestions by @odgrim in https://github.com/gruntwork-io/repo-copier/pull/295


**Full Changelog**: https://github.com/gruntwork-io/repo-copier/compare/v0.6.6...v0.7.0

</div>


### [v0.6.6](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.6.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/4/2025 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.6.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

    * fix: make --non-interactive truly non-interactive with centralized prompt policy by @denis256 in https://github.com/gruntwork-io/repo-copier/pull/297
  * chore: deprecate bitbucket by disabling tests while leaving them in place by @odgrim in https://github.com/gruntwork-io/repo-copier/pull/298


**Full Changelog**: https://github.com/gruntwork-io/repo-copier/compare/v0.6.5...v0.6.6

</div>



## terraform-aws-asg


### [v1.1.0](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v1.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/8/2025 | Modules affected: asg-instance-refresh, asg-rolling-deploy, server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v1.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated AWS provider to 6.x (&lt; 7.0.0)





</div>



## terraform-aws-cache


### [v1.0.4](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v1.0.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/11/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v1.0.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * feat(elastic-cache): Add Event Notifications for ElastiCache cluster by @Zoltowska in https://github.com/gruntwork-io/terraform-aws-cache/pull/173

* @Zoltowska made their first contribution in https://github.com/gruntwork-io/terraform-aws-cache/pull/173

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-cache/compare/v1.0.2...v1.0.4

</div>



## terraform-aws-data-storage


### [v0.44.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.44.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/11/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.44.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * feat: Support AWS provider up to 7.0.0 by @james00012 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/544


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-data-storage/compare/v0.43.0...v0.44.0

</div>


### [v0.43.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.43.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/10/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.43.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * feat(rds): add database_insights_mode option by @jasonyoung-pearl in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/539
* fix: Don&apos;t send monitoring ARN if Performance Insights / Enhanced Monitoring is disabled by @imlach in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/541

* @imlach made their first contribution in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/541

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-data-storage/compare/v0.42.0...v0.43.0

</div>



## terraform-aws-ecs


### [v1.3.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v1.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/8/2025 | Modules affected: ecs-cluster, ecs-daemon-service, ecs-service, ecs-task-definition | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v1.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated AWS provider to 6.x (&lt; 7.0.0)




</div>



## terraform-aws-eks


### [v3.2.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v3.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/16/2025 | Modules affected: eks-alb-ingress-controller-iam-policy, eks-alb-ingress-controller, eks-aws-auth-merger, eks-cloudwatch-agent | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v3.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This release updates the module&apos;s AWS provider version constraint to support `hashicorp/aws` v6.x.
- The module previously required AWS provider `&lt; 6.0.0`. This constraint has been relaxed to allow v6.x.
- The EKS module does not use any resources or attributes that have breaking changes in provider v6. Users can upgrade to provider v6 without module changes.


</div>



## terraform-aws-load-balancer


### [v1.1.1](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v1.1.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/17/2025 | Modules affected: alb | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v1.1.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add `enable_zonal_shift` variable that can be used to enable ARC Zonal Shift functionality (defaults to disabled)



</div>


### [v1.1.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v1.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/8/2025 | Modules affected: acm-tls-certificate, alb, lb-listener-rules | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v1.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated AWS provider to 6.x (&lt; 7.0.0)




</div>



## terraform-aws-monitoring


### [v1.3.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v1.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/9/2025 | Modules affected: alarms, logs, metrics | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v1.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update AWS provider lock to 6.x (&lt; 7.0.0)





</div>



## terraform-aws-openvpn


### [v0.27.11](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.27.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/10/2025 | Modules affected: openvpn-admin | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.27.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump golang.org/x/net from 0.33.0 to 0.36.0 in /test
- Bump golang.org/x/net from 0.36.0 to 0.38.0 in /test
- Fixing empty `.ovpn` generation 



</div>



## terraform-aws-security


### [v1.2.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v1.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/12/2025 | Modules affected: aws-config-bucket, aws-config-multi-region, aws-config-rules, aws-config | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v1.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Test and Example fixes/improvements
- Update AWS provider to v6.x (&lt; 7.0.0)




</div>



## terraform-aws-service-catalog


### [v0.145.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.145.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/12/2025 | Modules affected: networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.145.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added support for subdomain records in Route53 private hosted zones



</div>


### [v0.144.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.144.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/12/2025 | Modules affected: data-stores/aurora, data-stores/ecr-repos, data-stores/elasticsearch, data-stores/memcached | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.144.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Support AWS provider up to 7.0.0 for data-stores modules
- Add `eks_kubelet_extra_args` and `max_pods_allowed` support for AL2023 workers


</div>


### [v0.143.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.143.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/11/2025 | Modules affected: services/eks-workers | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.143.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Pin `terraform_aws_eks_version` to `v2.0.0` in EKS Worker Packer templates to address Python dependency issue that was released in `terraform-aws-eks` `v2.1.1` which resolves the Packer build errors. 



</div>


### [v0.143.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.143.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/11/2025 | Modules affected: services/ec2-instance | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.143.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update examples to demonstrate support for custom KMS key for EC2 root volume encryption. 
- Update variable description for `root_volume_kms_key_id` in `services/ec2-instance` for clarity on usage.



</div>


### [v0.143.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.143.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/11/2025 | Modules affected: services/eks-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.143.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Expose `cloudwatch_log_group_class` in `services/eks-cluster`.



</div>


### [v0.143.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.143.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/11/2025 | Modules affected: mgmt/bastion-host, mgmt/ecs-deployo-runner, mgmt/jenkins, mgmt/openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.143.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Pin packer-plugin-amazon version to `&lt; 1.3.10` for all Packer templates.


</div>


### [v0.142.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.142.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/11/2025 | Modules affected: data-stores/aurora | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.142.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Expose `delete_automated_backups` and `restore_to_time` in `data-stores/aurora` module.



</div>


### [v0.142.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.142.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/11/2025 | Modules affected: services/ecs-service, services/ec2-instance, services/lambda, data-stores/aurora | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.142.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Expose additional parameters to the `services/ecs-service` module:
    - `elb_slow_start` - configure target warm-up time (0-900 seconds)
    - `use_alb_sticky_sessions` - enable/disable ALB sticky sessions
    - `alb_sticky_session_type` - configure sticky session type
    - `alb_sticky_session_cookie_duration` - set cookie duration
- Add `aws_volume_attachment` to `services/ec2-instance` module
    - Adds `aws_volume_attachment` resource to attach EBS volumes during Terraform apply
    - Fixes issue where volumes created via `ebs_volumes` variable were not attached to the EC2 instance 
- Expose `var.iam_role_name` and `var.managed_policy_waiting_time` on `services/lambda` module
- Expose the `enable_http_endpoint` variable on the `data-stores/aurora` module for enabling the RDS data API.



</div>



## terraform-aws-static-assets


### [v1.1.3](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v1.1.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/12/2025 | Modules affected: cloudfront, s3-cloudfront, s3-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v1.1.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Enabled usage of TF Provider v6



</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "09a66d422affa3d38c4d6b35b1985a70"
}
##DOCS-SOURCER-END -->
