
# Gruntwork release 2019-03

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2019-03</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2019-03. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-messaging](#terraform-aws-messaging)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-vpc](#terraform-aws-vpc)


## terraform-aws-ci


### [v0.13.11](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/27/2019 | Modules affected: ec2-backup | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `ec2-backup`


* This module has been updated to use node 8.10, as node 6.10 was deprecated in AWS Lambda.


* https://github.com/gruntwork-io/module-ci/pull/90

</div>


### [v0.13.10](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/15/2019 | Modules affected: jenkins-server | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `jenkins-server`


*  Update the version of `server-group` module for Jenkins to `v0.6.25`


* https://github.com/gruntwork-io/module-ci/pull/89

</div>



## terraform-aws-ecs


### [v0.12.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.12.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/18/2019 | Modules affected: ecs-service, ecs-service-with-alb | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.12.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `ecs-service` [**BREAKING**]
* `ecs-service-with-alb` [**BREAKING**]


This release introduces support for AWS provider version 2.X:

* Fix deprecated usage of `placement_strategy` and replace with `ordered_placement_strategy`.


This change is backwards incompatible on certain versions of the AWS provider. Specifically:

- `ecs-service` and `ecs-service-with-alb` is no longer compatible with AWS provider version `&lt;1.17.0`.
- `ecs-service` and `ecs-service-with-alb` will recreate the `ecs_service` resource (delete + create) on AWS provider version `&lt;2.1.0`.


Special thanks to @fieldawarepiotr for contributions to help implement the changes in this release.


* https://github.com/gruntwork-io/module-ecs/pull/122
* https://github.com/gruntwork-io/module-ecs/pull/126

</div>



## terraform-aws-eks


### [v0.2.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/29/2019 | Modules affected: eks-cluster-workers, eks-scripts, eks-k8s-role-mapping | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release introduces `eks-scripts`, a new module that contains helper scripts for working with EKS. The release ships with the script `map-ec2-tags-to-node-labels`, a python script that can run on the EC2 instance acting as an EKS worker to pull in the tags associated with the EC2 instance and map it to kubernetes node labels. You can then take the output to pass to the bootstrap script to set the labels in kubernetes.

Take a look at [the `eks-cluster-with-supporting-services` example](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/examples/eks-cluster-with-supporting-services) for example usage.

Additionally, this release introduces a few bug fixes for working with multiple ASG worker pools:

- `eks-cluster-workers` now takes in a `name_prefix` variable that can be used to name the resources it creates with a prefix. Previously all the resources were named by the EKS cluster name, which leads to resource conflicts when there are multiple instances of the module.
- `eks-k8s-role-mapping` previously assumed there was only one worker IAM role, but when there are multiple worker pools, you can have multiple worker IAM roles. This release fixes that by expecting a list now for the worker IAM role name input.


</div>


### [v0.1.5](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.1.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/5/2019 | Modules affected: eks-k8s-role-mapping, eks-cluster-workers, eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.1.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release does not introduce any changes to the underlying module features. Instead, this release focuses on documentation, examples, and test stability:

- Includes various documentation fixes around updating links since post split.
- Includes test stability improvements.
- Updated examples to split out a minimal EKS cluster from one that demonstrates the IAM roles.
- Includes python code formatting for `eks-k8s-role-mapping`.




</div>



## terraform-aws-messaging


### [v0.1.4](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.1.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/6/2019 | Modules affected: kinesis | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.1.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `kinesis`


The `kinesis` module now supports server-side encryption.


* #16 


</div>



## terraform-aws-static-assets


### [v0.4.2](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.4.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/8/2019 | Modules affected: s3-cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.4.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `s3-cloudfront`


* Fix compatibility issues with AWS provider 2.0.0 


* #19 

</div>



## terraform-aws-vpc


### [v0.5.6](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.5.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/19/2019 | Modules affected: vpc-app, vpc-peering | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.5.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `vpc-app`
* `vpc-peering`


* You can now customize the CIDR block calculations for each &quot;tier&quot; of subnet in the `vpc-app` module using the `public_subnet_bits`, `private_subnet_bits`, and `persistence_subnet_bits` input variables, each of which specifies the number of bits to add to the CIDR prefix when calculating subnet ranges.
* You can now enable public IPs to be enabled by default on public subnets in the `vpc-app` module by setting the `map_public_ip_on_launch` input variable to `true`.
* You can now configure the VPC peering connection using the new `allow_remote_vpc_dns_resolution`, `allow_classic_link_to_remote_vpc`, and `allow_vpc_to_remote_classic_link` input variables in the `vpc-peering` module.


* https://github.com/gruntwork-io/module-vpc/pull/56
* https://github.com/gruntwork-io/module-vpc/pull/58
* https://github.com/gruntwork-io/module-vpc/pull/59
* https://github.com/gruntwork-io/module-vpc/pull/61

</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "dd5c723ceb9c4b37d4732ae267e6daa4"
}
##DOCS-SOURCER-END -->
