
# Gruntwork release 2017-02

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2017-02</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2017-02. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [gruntkms](#gruntkms)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-security](#terraform-aws-security)


## boilerplate


### [v0.2.7](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/2/2017 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - NEW FEATURE: Boilerplate now supports the following new helpers:
  - `boilerplateConfigDeps DEPENDENCY_NAME PROPERTY`: Return the value of the given property for the given Dependency
  - `boilerplateConfigVars VAR_NAME PROPERTY`: Return the value of the given property for the given Variable
- NEW FEATURE: Boilerplate now exposes the following global template variables. See the [docs](https://github.com/gruntwork-io/boilerplate#global-template-variables) for more information on how to use them:
  - `BoilerplateConfigVars`: A map of all variables defined in the root `boilerplate.yml`.
  - `BoilerplateConfigDeps`: A map of all dependencies defined in the root `boilerplate.yml`.
    - `This`: A map of the current `boilerplate.yml` being processed.
    - `This.Config`: A map of the Boilerplate configuration in use.
    - `This.Options`: A map of the Boilerplate options in use.
    - `This.CurrentDep`: A map of the Boilerplate Dependency currently being processed.


</div>



## gruntkms


### [v0.0.5](https://github.com/gruntwork-io/gruntkms/releases/tag/v0.0.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/3/2017 | <a href="https://github.com/gruntwork-io/gruntkms/releases/tag/v0.0.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Gruntkms is now built with Go 1.7.3 which has significantly better compatibility with MacOS Sierra.


</div>



## terraform-aws-asg


### [v0.2.0](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/28/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  MAJOR BREAKING CHANGE

In https://github.com/gruntwork-io/module-asg/pull/5, we implemented a completely new approach for the ASG that is:
1. Purely Terraform code (well, mostly), with no dependencies on CloudFormation.
2. Supports both static and dynamically sized ASGs.
3. Properly waits for instances to terminate, which supports using lifecycle hooks (e.g. in an ECS cluster).
4. Supports integration with the ALB.

All of this is good news. The bad news is that this change is completely backwards incompatible with the previous versions of our the ASG modules. Key things to note:
1. Both `asg-rolling-deploy-static` and `asg-rolling-deploy-dynamic` modules have been deleted. You should now use `asg-rolling-deploy`. The parameters used by this new module are very similar to the previous ones, but not identical. See its `vars.tf` and the `asg-rolling-deploy example` to see what parameters you need to pass.
2. The `cloudformation-scripts` module has been removed. Make sure to remove it from your Packer templates. Likewise, remove calls to `cfn-signal` from your User Data scripts.

To upgrade without downtime, we recommend the following approach:
1. Add a completely new ASG using the new `asg-rolling-deploy` module. You can hook it up to the same load balancer, launch configuration, security groups, IAM roles, etc you were using before.
2. Run `terraform apply` to deploy the new ASG. It should come up and serve traffic side-by-side with your old one.
3. Delete the old ASG code from your Terraform files and Packer templates.
4. Run `terraform apply` to undeploy the old ASG.


</div>



## terraform-aws-ci


### [v0.3.6](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/10/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - NEW MODULE: Added a new `check-url` script that can be used to repeatedly test a URL until either it returns an expected response, and the script exits successfully, or the max number of retries is exceeded, and the script exits with an error. The driving use case for this is verifying automated ECS deployments. You can add this script to the end of your CI build to check if the new version of your ECS service actually deployed and to fail the build if it didn&apos;t.


</div>


### [v0.3.5](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/3/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  NEW MODULES: This release introduces 4 new modules under the `iam-policies` folder. These modules each create a specific IAM Policy that can be attached to an IAM User, IAM Group, or IAM Role. Collectively, they can be composed to enable the minimum IAM Policies necessary to:
- Run Terraform with Remote State in S3
- Run Terragrunt with DynamoDB-based Locking 
- Push a new Docker image to Amazon ECR
- Deploy a new version of a service to an existing ECS Service.


</div>



## terraform-aws-ecs


### [v0.4.2](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.4.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/15/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.4.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Terraform 0.8.6 has some changes for the `aws_appautoscaling_target` and `aws_appautoscaling_policy` resources:
- `aws_appautoscaling_target`: the `scalable_dimension` and `service_namespace` parameters are now required. The `name` parameter has been removed.
- `aws_appautoscaling_policy`. the `scalable_dimension` and `service_namespace` parameters are now required.

We&apos;ve updated the `ecs-service-with-alb` module and example code accordingly. Note that this included adding some `depends_on` clauses to make sure resources were created in the right order. See https://github.com/gruntwork-io/module-ecs/pull/28 for details.


</div>



## terraform-aws-security


### [v0.4.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/8/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - NEW MODULE: We&apos;re introducing the `tls-cert-private` module, which allows you to generate customized TLS certificate key pairs simply by updating a `docker-compose.yml` file and running `docker-compose up`. 
  
  The module works by running a Docker container which downloads the latest version of OpenSSL and runs a series of commands to generate your certificates using RSA 4,096 bit encryption. The outputted files are then available on your local machine, where you may optionally encrypt the TLS private key.
  
  These keys can be used to create temporary self-signed certificates or permanent certificates with a custom Certificate Authority (CA).


</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "2285235c4150b59a76a9be9a8d2ab44d"
}
##DOCS-SOURCER-END -->
