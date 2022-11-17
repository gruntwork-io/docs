
# Gruntwork release 2022-09

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2022-09</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code 
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2022-09. For instructions 
on how to use these updates in your code, check out the [updating 
documentation](/guides/working-with-code/using-modules#updating).

Here are the repos that were updated:

- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-monitoring](#terraform-aws-monitoring)


## terraform-aws-asg


### [v0.19.4](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.19.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/27/2022 | Modules affected: server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.19.4">Release notes</a></small>
</p>



- Allows setting IOPS for ebs volumes of types `io2` and `gp3` on `server-group` module.




### [v0.19.3](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.19.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/26/2022 | Modules affected: server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.19.3">Release notes</a></small>
</p>



- Add var to `server-group` for `protect_from_scale_in`.




### [v0.19.2](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.19.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/15/2022 | Modules affected: server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.19.2">Release notes</a></small>
</p>



- Added support to configure Instance Metadata Service in the Auto Scaling Groups managed by the `server-group` module.





## terraform-aws-eks


### [v0.53.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.53.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/28/2022 | Modules affected: eks-alb-ingress-controller, eks-aws-auth-merger, eks-cloudwatch-agent, eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.53.1">Release notes</a></small>
</p>



- Internal updates:
  - CircleCI config updates
  - Updated comments and documentation to point to the correct new default branch
- Updated Ingress Controller Module to add Permission Boundary for IAM role





## terraform-aws-lambda


### [v0.20.5](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.20.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/27/2022 | Modules affected: lambda-http-api-gateway | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.20.5">Release notes</a></small>
</p>



- Fixes policy to allow API gateway to publish access logs to cloudwatch in `lambda-http-api-gateway` module.



### [v0.20.4](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.20.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/16/2022 | Modules affected: lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.20.4">Release notes</a></small>
</p>


- Improved error message on failure to validate inputs.





## terraform-aws-monitoring


### [v0.35.6](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.35.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/24/2022 | Modules affected: alarms, logs | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.35.6">Release notes</a></small>
</p>



- Tags var added to modules `cloudwatch-logs-filters` and `sns-to-slack`






<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "031e6fb6f6b307ccd3347aca56b3c419"
}
##DOCS-SOURCER-END -->
