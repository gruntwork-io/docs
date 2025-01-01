
# Gruntwork release 2023-01

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2023-01</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2023-01. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [repo-copier](#repo-copier)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)


## repo-copier


### [v0.2.0](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/2/2023 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Prevent continuously keeping `go-git` instances in memory by @levkoburburas in https://github.com/gruntwork-io/repo-copier/pull/134
* Improve code architecture by @levkoburburas in https://github.com/gruntwork-io/repo-copier/pull/138
* Switching to Git command  by @levkoburburas in https://github.com/gruntwork-io/repo-copier/pull/139


This release switches `repo-copier` to using your locally installed `git` instance rather than the embedded `go-git` library. This is because of memory consumption and stack overflow issues with `go-git`. Please ensure you have `git` installed locally and in your `PATH` whenever running `repo-copier` going forward!


**Full Changelog**: https://github.com/gruntwork-io/repo-copier/compare/v0.1.1...v0.2.0

</div>



## terraform-aws-ci


### [v0.51.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.51.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/9/2023 | Modules affected: kubernetes-circleci-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.51.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `kubernetes-circleci-helpers` **[BACKWARD INCOMPATIBLE]**



- Install cri-dockerd with Minikube



- This version requires k8s 1.24 or later



- https://github.com/gruntwork-io/terraform-aws-ci/pull/500



</div>



## terraform-aws-cis-service-catalog


### [v0.42.7](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.42.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/31/2023 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.42.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update tflint patch to latest docker and remove include root
- Plumb `maintenance_window` variable from CIS RDS module through to base RDS module



</div>


### [v0.42.6](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.42.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/18/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.42.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Add `flow_logs_traffic_type` var to the VPC module.
- Remove tflint-ruleset-aws-cis to it&apos;s own repo.
  - Update tflint patch: use tflint-ruleset-aws-cis own repo
- Remove Ina from CODEOWNERS



</div>



## terraform-aws-ecs


### [v0.35.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.35.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/26/2023 | Modules affected: ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.35.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Upgrade to launch templates


</div>



## terraform-aws-eks


### [v0.56.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.56.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/27/2023 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.56.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add conditional logic for writing ExecCredential api version to support backward compatibility with the latest release of this module and EKS clusters version &lt; `1.24`



</div>


### [v0.56.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.56.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/18/2023 | Modules affected: eks-k8s-external-dns | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.56.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Expose additional chart configurations for external-dns.





</div>


### [v0.56.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.56.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/5/2023 | Modules affected: eks-cluster-control-plane, eks-k8s-cluster-autoscaler, eks-container-logs, eks-alb-ingress-controller | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.56.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `eks-cluster-control-plane` **[BACKWARD INCOMPATIBLE]**
- `eks-k8s-cluster-autoscaler` **[BACKWARD INCOMPATIBLE]**
- `eks-container-logs` **[BACKWARD INCOMPATIBLE]**
- `eks-alb-ingress-controller`
- `eks-aws-auth-merger`
- `eks-fargate-container-logs` 
- `eks-k8s-external-dns`
- `eks-k8s-role-mapping`


The default version of Kubernetes installed by the module has been updated to 1.24. As a result of this, the default version of addons were updated to support installation into 1.24. Specifically:

- `cluster-autoscaler`: The default app version has been updated to `1.24.0`.
- `eks-alb-ingress-controller`: The default app version and chart version have been updated to `2.4.5` and `1.4.6`.
- `eks-k8s-external-dns`: The default chart version has been updated to `6.12.2`.
- `eks-container-logs`: As [EKS ended support for `Dockershim`](https://docs.aws.amazon.com/eks/latest/userguide/dockershim-deprecation.html), a new `cri` parser was added to Fluent Bit configuration in `eks-container-logs`.
- `kubernetes` provider constraints needed to be updated as Kubernetes [no longer creates a default `Secret` for `ServiceAccount`](https://github.com/hashicorp/terraform-provider-kubernetes/issues/1724).
- `kubernetes` `client.authentication.k8s.io/v1alpha1` API version [was removed](https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.24.md#deprecation) in `1.24`, so all examples were updated to `v1`.



If you wish to maintain backward compatibility with your existing setup without upgrading the Kubernetes version, you will want to configure the `kubernetes_version` parameter to the version of Kubernetes you are currently using. Note that `1.24` requires `kubergrunt` version 0.10.0 and above.


If you wish to maintain backward compatibility with your existing setup of the cluster autoscaler, you will want to configure the `cluster_autoscaler_version` input variable to what you are currently using. This should match semantic version of your EKS cluster Kubernetes version. Refer to the [gcr repository](https://console.cloud.google.com/gcr/images/k8s-artifacts-prod/US/autoscaling/cluster-autoscaler) and look for the latest version for your kubernetes version.


If you wish to maintain backward compatibility with your existing setup of the EKS container logs, you will want to set the `use_cri_parser_conf` input variable to `false`.


- https://github.com/gruntwork-io/terraform-aws-eks/pull/478



</div>



## terraform-aws-lambda


### [v0.21.6](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/24/2023 | Modules affected: api-gateway-account-settings, lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Adds `var.managed_policy_waiting_time` to modules `api-gateway-account-settings` and `lambda`. The purpose is mitigating racing conditions that occasionally cause these modules to fail to deploy when using managed IAM policies due to eventual consistency of policy permissions showing for the IAM role. 



</div>


### [v0.21.5](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/18/2023 | Modules affected: api-gateway-account-settings | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixes occasional deploy errors on module `api-gateway-account-settings` by enforcing the correct order of attaching permissions.





</div>



## terraform-aws-monitoring


### [v0.35.7](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.35.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/13/2023 | Modules affected: sns-to-slack | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.35.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added prevention of perpetual diff issues on `sns-to-slack` module when using terragrunt.



</div>



## terraform-aws-openvpn


### [v0.25.0](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.25.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/26/2023 | Modules affected: openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.25.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Upgrade to launch templates


</div>


### [v0.24.4](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.24.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/23/2023 | Modules affected: openvpn-admin, openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.24.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Use new upgrade test code.
- Updated default branch references (backward compatible)
- Bumped docker image from patches to v0.0.6
- Added permissions for SQS for revoking certs



</div>



## terraform-aws-security


### [v0.67.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.67.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/23/2023 | Modules affected: private-s3-bucket, kms-master-key | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.67.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed private-s3-bucket ACL 
- Added kms grant permissions for `cmk_user_iam_arns` supplied with conditions.


</div>



## terraform-aws-service-catalog


### [v0.100.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.100.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/30/2023 | Modules affected: base, data-stores, landingzone, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.100.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Updated version of terraform-aws-security from v0.66.0 to v0.67.2.  See release notes [here](https://github.com/gruntwork-io/terraform-aws-security/releases) for details



</div>


### [v0.100.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.100.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/10/2023 | Modules affected: data-stores, services/eks-cluster, services/eks-workers, services/eks-core-services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.100.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Adding variables to manage rds
- Updated Kubernetes to 1.24



</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "8148e8976b3b455218c44d18665c93ad"
}
##DOCS-SOURCER-END -->
