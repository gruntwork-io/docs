
# Gruntwork release 2022-12

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2022-12</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code 
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2022-12. For instructions 
on how to use these updates in your code, check out the [updating 
documentation](/guides/working-with-code/using-modules#updating).

Here are the repos that were updated:

- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)


## terraform-aws-ci


### [v0.50.12](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.12)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/1/2022 | Modules affected: ecs-deploy-runner, gruntwork-module-circleci-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.12">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Use BuildKit pattern for passing secrets in the CircleCI build
- Fix intermittent test failure
- Use main branch in deploy-runner docker image
- Fix installing `gox` in Go 1.17 and newer





</div>



## terraform-aws-load-balancer


### [v0.29.3](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/1/2022 | Modules affected: alb | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Deprecate `vpc_id` variable



</div>




<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "e60e8ecf9e0395256fb8b57a7e33624b"
}
##DOCS-SOURCER-END -->
