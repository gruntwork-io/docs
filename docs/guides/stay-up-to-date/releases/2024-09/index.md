
# Gruntwork release 2024-09

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2024-09</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2024-09. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [pipelines-actions](#pipelines-actions)
- [pipelines-cli](#pipelines-cli)
- [pipelines-credentials](#pipelines-credentials)
- [pipelines-workflows](#pipelines-workflows)
- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-control-tower](#terraform-aws-control-tower)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-utilities](#terraform-aws-utilities)
- [terraform-aws-vpc](#terraform-aws-vpc)


## boilerplate


### [v0.5.18](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.5.18)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/27/2024 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.5.18">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * chore: [CI] Skip test_signing Job on Release Tag Push by @ryehowell in https://github.com/gruntwork-io/boilerplate/pull/193
* feat: Add ability to set variables from environment variables by @yhakbar in https://github.com/gruntwork-io/boilerplate/pull/195

**Full Changelog**: https://github.com/gruntwork-io/boilerplate/compare/v0.5.17...v0.5.18

</div>



## pipelines-actions


### [v1.12.1](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v1.12.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/27/2024 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v1.12.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix: Avoid Newer Terragrunt Logging for Now by @yhakbar in https://github.com/gruntwork-io/pipelines-actions/pull/75


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v1.12.0...v1.12.1

</div>


### [v1.12.0](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v1.12.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/11/2024 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v1.12.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This release has no customer-facing changes.  v1.12.0 incorporates new files and prework in preparation for the launch of a few new major features in upcoming releases.  



* DEV-408 Add get job url action by @Resonance1584 in https://github.com/gruntwork-io/pipelines-actions/pull/55
* Add drift detection determine units by @Resonance1584 in https://github.com/gruntwork-io/pipelines-actions/pull/65
* Fix unit sorting. Use jq to construct array by @Resonance1584 in https://github.com/gruntwork-io/pipelines-actions/pull/67
* Add determine drift action by @Resonance1584 in https://github.com/gruntwork-io/pipelines-actions/pull/66
* Add consolidate jobs action by @Resonance1584 in https://github.com/gruntwork-io/pipelines-actions/pull/68
* Fix quotes in job summary by @Resonance1584 in https://github.com/gruntwork-io/pipelines-actions/pull/70


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v1.11.0...v1.12.0

</div>



## pipelines-cli


### [v0.28.3](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.28.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/11/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.28.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * DEV-514 Fix infinite loop calling terragrunt version by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/243


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.28.2...v0.28.3


</div>


### [v0.28.2](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.28.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/9/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.28.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * DEV-514 Fix telemetry tf reported versions by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/242


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.28.1...v0.28.2


</div>



## pipelines-credentials


### [v1](https://github.com/gruntwork-io/pipelines-credentials/releases/tag/v1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/27/2024 | <a href="https://github.com/gruntwork-io/pipelines-credentials/releases/tag/v1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  This release tracks the latest in v1.y.z releases.

</div>


### [v1.0.0](https://github.com/gruntwork-io/pipelines-credentials/releases/tag/v1.0.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/27/2024 | <a href="https://github.com/gruntwork-io/pipelines-credentials/releases/tag/v1.0.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Initial release 🎉 

</div>



## pipelines-workflows


### [v2.6.1](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v2.6.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/27/2024 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v2.6.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix: Pin `pipelines-actions` to `v.12.1` by @yhakbar in https://github.com/gruntwork-io/pipelines-workflows/pull/87


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v2...v2.6.1

</div>



## terraform-aws-cache


### [v0.22.8](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.22.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/20/2024 | Modules affected: elastic-cache, redis_copy_snapshot | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.22.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- LIB-124: Enable terrascan
- Address dependabot alerts
- Update CODEOWNERS



</div>



## terraform-aws-ci


### [v0.58.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.58.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/23/2024 | Modules affected: ecs-deploy-runner, infrastructure-deployer | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.58.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump github.com/gruntwork-io/go-commons to 0.17.2


</div>


### [v0.58.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.58.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/12/2024 | Modules affected: infrastructure-deployer, ecs-deploy-runner, github-release-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.58.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump github.com/sirupsen/logrus from 1.8.1 to 1.9.3 in nfrastructure-deployer
- Bump gopkg.in/yaml.v3 from 3.0.0-20210107192922-496545a6307b to 3.0.0 in infrastructure-deployer 
- Bump github.com/google/go-containerregistry from 0.15.1 to 0.20.2 in ecs-deploy-runner/docker/kaniko
- Dependabot configuration update
- Updated Windows assets name in Github releases publication
- Circle CI pre-commit execution fix


</div>



## terraform-aws-control-tower


### [v0.8.1](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.8.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/26/2024 | Modules affected: landingzone/control-tower-account-tagger | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.8.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- chore: Update CI dependencies and use bigger instances to avoid resource starvation
- fix: Use region flag for `aws organizations` API calls


</div>


### [v0.8.0](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.8.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/5/2024 | Modules affected: landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.8.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add CODEOWNERS
- Address dependabot alerts
- Enable full tag control

This introduces a change in how tags are managed for AWS Accounts. Now, any tag change will also be reflected in the AWS resource. 


</div>



## terraform-aws-data-storage


### [v0.38.1](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.38.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/6/2024 | Modules affected: redshift, rds-proxy, rds, backup-plan | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.38.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- SME-788 - delete note that we don&apos;t support Redshift Serverless
- Enhance multiple auth block on RDS Proxy
- fix unused continuous backup plan
-  Update CODEOWNERS
- LIB-114: Enable terrascan, address dependabot alerts


</div>



## terraform-aws-eks


### [v0.70.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.70.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/26/2024 | Modules affected: eks-container-logs | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.70.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add support for new Cloudwatch Logs plugin
    - **NOTE:** There is an [upstream issue ](https://github.com/aws/eks-charts/issues/931) with the default version of the `aws-for-fluent-bit` chart where default values are defined for `logGroupTemplate` and `logStreamTemplate` which cause these values to be set to the default values if not explicitly set. There are 3 main workarounds for this:
        - Set the variables to empty strings which will override the default values set in the upstream.
        - Override the default Helm Chart version and use a newer version of the chart which resolves the issue. This can be accomplished by setting `aws_for_fluent_bit_chart_version` to `0.1.32`.
        - Upgrade to [v0.73.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.73.0) of the `terraform-aws-eks` library module which uses a newer chart version as well as contains several enhancements to the module.
```yaml

</div>


### [v0.70.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.70.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/17/2024 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.70.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

-  Drop support for python2.x



</div>


### [v0.69.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.69.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/17/2024 | Modules affected: eks-cluster-control-plane, eks-alb-ingress-controller-iam-policy | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.69.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add variable to specify class for control-plane log group
- Add `elasticloadbalancing:DescribeTrustStores` Permission to LB Controller Policy
- Update dependency `terraform-aws-utilities` and remove deprecated python dependency 



</div>


### [v0.69.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.69.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/12/2024 | Modules affected: eks-aws-auth-merger, eks-cluster-control-plane, eks-k8s-karpenter | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.69.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Enable terrascan, address terrascan findings


</div>


### [v0.69.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.69.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/6/2024 | Modules affected: eks-aws-auth-merger, eks-cluster-control-plane, eks-ebs-csi-driver, eks-k8s-cluster-autoscaler | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.69.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Use bigger runner for the main CI job to avoid timeouts
- Add Support for EKS `1.30`
    - Default version of EKS is now `1.30`
    - [K8s 1.30 Release Announcement](https://kubernetes.io/blog/2024/04/17/kubernetes-v1-30-release/)
    - [K8s 1.30 Release Notes](https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.30.md)



</div>


### [v0.68.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.68.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/4/2024 | Modules affected: eks-cluster-control-plane, eks-k8s-karpenter | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.68.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add migration notes for EKS addons
- Remove Karpenter Chart ECR Auth to fix perpetual diff



</div>



## terraform-aws-lambda


### [v1.0.0](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v1.0.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/6/2024 | Modules affected: lambda-function-url, lambda-edge, lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v1.0.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- feat: Added Lambda URL origin access control (OAC) support
- feat: Added ignore_changes lifecycle block for lambda image_uri
- chore: Removed `replace_security_groups_on_destroy`
- chore: Removed deprecate attributes from lambda modules
- chore: Addressed Dependabot alerts
- chore: Updated CODEOWNERS, Address new terrascan findings



</div>



## terraform-aws-monitoring


### [v0.36.25](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.25)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/18/2024 | Modules affected: alarms, logs | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.25">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- LIB-121: Enable terrascan, address terrascan findings


</div>


### [v0.36.24](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.24)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/4/2024 | Modules affected: logs | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.24">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Improved Amazon Linux 2023 support
- Dependabot updates





</div>



## terraform-aws-openvpn


### [v0.27.9](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.27.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/24/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.27.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix CI precommit






</div>


### [v0.27.8](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.27.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/20/2024 | Modules affected: openvpn-server, openvpn-admin | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.27.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add var to encrypt ebs volume on openvpn-server module
- Update CODEOWNERS
- Address dependabot alerts
- LIB-122: Enable terrascan, replace deprecated resource in openvpn-server module



</div>



## terraform-aws-security


### [v0.74.3](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.74.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/20/2024 | Modules affected: iam-user-password-policy | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.74.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Address dependabot alerts
- Update terrascan config




</div>


### [v0.74.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.74.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/3/2024 | Modules affected: auto-update, fail2ban, ntp, ssh-grunt | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.74.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- LIB-136: Replace Centos EOL reference
- Update CODEOWNERS
- LIB-110: Enable terrascan


</div>



## terraform-aws-server


### [v0.16.1](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.16.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/26/2024 | Modules affected: single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.16.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- LIB-134: Replace Centos EOL references
- Address dependabot alerts
- Update CODEOWNERS
- Address terrascan finding


</div>



## terraform-aws-service-catalog


### [v0.115.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.115.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/26/2024 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.115.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- services/public-static-website: Add most_recent=true when searching for ACM certs
- services/asg-service: allow user-data override



</div>


### [v0.115.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.115.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/24/2024 | Modules affected: base | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.115.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `base/ec2-baseline`: disable fail2ban and iplockdown if AL2023 detected




</div>


### [v0.115.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.115.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/24/2024 | Modules affected: mgmt, networking, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.115.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Default version of EKS is `1.30` with this release! Please see the links below for full details of the EKS `1.30` release including new features and any API changes.
- [Kubernetes 1.30 Release Announcement](https://kubernetes.io/blog/2024/04/17/kubernetes-v1-30-release/)
- [Kubernetes 1.30 Release Notes](https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.30.md)
- **NOTE** The AWS EKS AMI requires the AWS CLI V2 now due to an [upstream change](https://github.com/awslabs/amazon-eks-ami/pull/1930). Before upgrading please make ensure that all self-managed workers have new AMI&apos;s built with the [latest packer template](https://github.com/gruntwork-io/terraform-aws-service-catalog/blob/master/modules/services/eks-workers/eks-node-al2.pkr.hcl) or make sure that any custom AMI&apos;s being used are using the AWS CLI V2 for the EKS worker nodes. This should only apply for clusters that are using a custom AMI and not the AWS EKS Optimized AMI provided by AWS.  




</div>


### [v0.114.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.114.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/20/2024 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.114.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added support for Custom Headers in CloudFront response headers policy



</div>


### [v0.114.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.114.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/13/2024 | Modules affected: base, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.114.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `services/ecs-cluster:` improve Amazon Linux 2023 support





</div>



## terraform-aws-static-assets


### [v0.18.5](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.18.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/20/2024 | Modules affected: s3-cloudfront, s3-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.18.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Address dependabot alerts
- LIB-118: Enable terrascan, address terrascan findings


</div>



## terraform-aws-utilities


### [v0.10.5](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.10.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/13/2024 | Modules affected: executable-dependency, require-executable | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.10.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump go testing modules
- Update CODEOWNERS
- Remove `distutils`





</div>



## terraform-aws-vpc


### [v0.26.25](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.25)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/26/2024 | Modules affected: vpc-app, vpc-flow-logs, vpc-mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.25">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- type typo fix sevice -&gt; service
- Update CODEOWNERS
- Address dependabot alerts
- LIB-125: Enable terrascan, fix precommit



</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "5bc26fd397602b0654b8f6b5a4d34d13"
}
##DOCS-SOURCER-END -->
