
# Gruntwork release 2019-03

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2019-03</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code 
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2019-03. For instructions 
on how to use these updates in your code, check out the [updating 
documentation](/guides/working-with-code/using-modules#updating).

Here are the repos that were updated:

- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-kafka](#terraform-aws-kafka)
- [terraform-aws-messaging](#terraform-aws-messaging)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-vpc](#terraform-aws-vpc)


## terraform-aws-ci


### [v0.13.11](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/27/2019 | Modules affected: ec2-backup | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.11">Release notes</a></small>
</p>


* `ec2-backup`


* This module has been updated to use node 8.10, as node 6.10 was deprecated in AWS Lambda.


* https://github.com/gruntwork-io/module-ci/pull/90


### [v0.13.10](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/15/2019 | Modules affected: jenkins-server | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.10">Release notes</a></small>
</p>


* `jenkins-server`


*  Update the version of `server-group` module for Jenkins to `v0.6.25`


* https://github.com/gruntwork-io/module-ci/pull/89



## terraform-aws-ecs


### [v0.12.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.12.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/18/2019 | Modules affected: ecs-service, ecs-service-with-alb | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.12.0">Release notes</a></small>
</p>


* `ecs-service` [**BREAKING**]
* `ecs-service-with-alb` [**BREAKING**]


This release introduces support for AWS provider version 2.X:

* Fix deprecated usage of `placement_strategy` and replace with `ordered_placement_strategy`.





## terraform-aws-eks


### [v0.2.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/29/2019 | Modules affected: eks-cluster-workers, eks-scripts, eks-k8s-role-mapping | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.2.0">Release notes</a></small>
</p>



This release introduces `eks-scripts`, a new module that contains helper scripts for working with EKS. The release ships with the script `map-ec2-tags-to-node-labels`, a python script that can run on the EC2 instance acting as an EKS worker to pull in the tags associated with the EC2 instance and map it to kubernetes node labels. You can then take the output to pass to the bootstrap script to set the labels in kubernetes.

Take a look at [the `eks-cluster-with-supporting-services` example](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/examples/eks-cluster-with-supporting-services) for example usage.

Additionally, this release introduces a few bug fixes for working with multiple ASG worker pools:

- `eks-cluster-workers` now takes in a `name_prefix` variable that can be used to name the resources it creates with a prefix. Previously all the resources were named by the EKS cluster name, which leads to resource conflicts when there are multiple instances of the module.
- `eks-k8s-role-mapping` previously assumed there was only one worker IAM role, but when there are multiple worker pools, you can have multiple worker IAM roles. This release fixes that by expecting a list now for the worker IAM role name input.


### [v0.1.5](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.1.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/5/2019 | Modules affected: eks-k8s-role-mapping, eks-cluster-workers, eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.1.5">Release notes</a></small>
</p>



This release does not introduce any changes to the underlying module features. Instead, this release focuses on documentation, examples, and test stability:

- Includes various documentation fixes around updating links since post split.
- Includes test stability improvements.
- Updated examples to split out a minimal EKS cluster from one that demonstrates the IAM roles.
- Includes python code formatting for `eks-k8s-role-mapping`.





## terraform-aws-kafka


### [v0.5.3](https://github.com/gruntwork-io/terraform-aws-kafka/releases/tag/v0.5.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/29/2019 | Modules affected: install-kafka | <a href="https://github.com/gruntwork-io/terraform-aws-kafka/releases/tag/v0.5.3">Release notes</a></small>
</p>


* `install-kafka`


*  apache has moved certain versions of kafka to the https://archive.apache.org/dist/kafka/ url rather than the https://www-us.apache.org/dist/kafka. This release addresses this by first trying to download the version from the mainline location and if an error occurs, it tries to download from the archive location.


* https://github.com/gruntwork-io/package-kafka/pull/56



### [v0.5.2](https://github.com/gruntwork-io/terraform-aws-kafka/releases/tag/v0.5.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/21/2019 | Modules affected: run-kafka | <a href="https://github.com/gruntwork-io/terraform-aws-kafka/releases/tag/v0.5.2">Release notes</a></small>
</p>


* `run-kafka`


*  Advertise Kafka health-check listener on private IP instead of 127.0.0.1 


* #55 




## terraform-aws-messaging


### [v0.1.4](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.1.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/6/2019 | Modules affected: kinesis | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.1.4">Release notes</a></small>
</p>


* `kinesis`


The `kinesis` module now supports server-side encryption.


* #16 




## terraform-aws-static-assets


### [v0.4.2](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.4.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/8/2019 | Modules affected: s3-cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.4.2">Release notes</a></small>
</p>


* `s3-cloudfront`


* Fix compatibility issues with AWS provider 2.0.0 


* #19 



## terraform-aws-vpc


### [v0.5.6](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.5.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/19/2019 | Modules affected: vpc-app, vpc-peering | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.5.6">Release notes</a></small>
</p>


* `vpc-app`
* `vpc-peering`


* You can now customize the CIDR block calculations for each "tier" of subnet in the `vpc-app` module using the `public_subnet_bits`, `private_subnet_bits`, and `persistence_subnet_bits` input variables, each of which specifies the number of bits to add to the CIDR prefix when calculating subnet ranges.
* You can now enable public IPs to be enabled by default on public subnets in the `vpc-app` module by setting the `map_public_ip_on_launch` input variable to `true`.
* You can now configure the VPC peering connection using the new `allow_remote_vpc_dns_resolution`, `allow_classic_link_to_remote_vpc`, and `allow_vpc_to_remote_classic_link` input variables in the `vpc-peering` module.






<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "e6b5040ca404114ca850d509f5bced02"
}
##DOCS-SOURCER-END -->
