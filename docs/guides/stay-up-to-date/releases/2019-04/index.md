
# Gruntwork release 2019-04

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2019-04</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2019-04. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [gruntwork](#gruntwork)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-sam](#terraform-aws-sam)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-utilities](#terraform-aws-utilities)
- [terraform-aws-vpc](#terraform-aws-vpc)
- [terraform-kubernetes-helm](#terraform-kubernetes-helm)


## gruntwork


### [v0.0.27](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.27)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/23/2019 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.27">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/gruntwork/pull/42: Fix username capitalization.

</div>


### [v0.0.26](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.26)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/18/2019 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.26">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/gruntwork/pull/40: Fix a bug in how we picked the name of the &quot;security&quot; account so it works correctly when granting access to `__current__`.

</div>



## terraform-aws-asg


### [v0.6.26](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.26)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/24/2019 | Modules affected: server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.26">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Per our aws 2.0 strategy, we added in the nightly build for this repo so that we can catch issues with provider upgrades in the future as they are released.
- Fixed a new exception that was being thrown because the healthchecker was being notified about the existence of a new EC2 instance and then was trying to check its health via the ELB before that instance had a chance to register itself with the ELB.  This resulted in an exception being thrown. We now handle this properly.



</div>



## terraform-aws-ci


### [v0.13.13](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.13)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/21/2019 | Modules affected: jenkins-server | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.13">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now set the `redirect_http_to_https` variable to `true` on the `jenkins-server` module to automatically redirect all HTTP requests to HTTPS.




</div>


### [v0.13.12](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.12)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/8/2019 | Modules affected: kubernetes-circleci-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.12">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `kubernetes-circleci-helpers` [**NEW**]


This release introduces scripts that help with setting up a Kubernetes testing environment in CircleCI. Specifically, this release introduces `setup-minikube`, a bash script that will install and start up `minikube` in CircleCI.


* https://github.com/gruntwork-io/module-ci/pull/91

</div>



## terraform-aws-data-storage


### [v0.8.8](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.8.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/3/2019 | Modules affected: lambda-cleanup-snapshots | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.8.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `lambda-cleanup-snapshots`


* Filters snapshots by manual type, because automated snapshots may not be deleted manually


* https://github.com/gruntwork-io/module-data-storage/pull/77

</div>



## terraform-aws-ecs


### [v0.13.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.13.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/26/2019 | Modules affected: ecs-service, ecs-service-with-discovery, ecs-service-with-alb, ecs-daemon-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.13.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Adds and exposes a task execution iam role so the tasks can pull private images from ECR and read secrets from AWS Secrets Manager.

**NOTE: This release introduces new resources that require additional permissions to update an existing deployment. If you were using restricted IAM policies for your deployment accounts, you will need to add the following IAM permissions:**

- `iam:GetPolicy`
- `iam:GetPolicyVersion`
- `iam:ListEntitiesForPolicy`



</div>


### [v0.13.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.13.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/18/2019 | Modules affected: ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.13.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `ecs-clsuter` module now allows you to set the termination policy for the underlying Auto Scaling Group using a new `termination_policies` input variable. This module now sets the default termination policy to `OldestInstance`. Before, we used to use the default termination policy, but recent changes to the default termination policy breaks the ability of the `roll-out-ecs-cluster-update.py` script to do zero-downtime rolling updates of the ECS cluster. Switching to `OldestInstance` should fix this issue. 




</div>


### [v0.12.2](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.12.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/9/2019 | Modules affected: ecs-deploy-check-binaries | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.12.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- This release fixes #125, where the ALB Healthcheck was not checking that all the tasks were registered, so was prematurely passing the deployment check. Starting this release, the LB checker now verifies that all the tasks for the newest versions are actually registered in the list before checking the health status.



</div>


### [v0.12.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.12.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/2/2019 | Modules affected: ecs-service, ecs-service-with-discovery, ecs-service-with-alb, ecs-fargate | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.12.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Sometimes the ECS service creation will fail because it can not associate the IAM role for the task. This release adds a sleep for each `aws_iam_role` creation to give time to propagate before associating the role.



</div>



## terraform-aws-eks


### [v0.5.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.5.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/29/2019 | Modules affected: eks-k8s-external-dns, eks-k8s-external-dns-iam-policy, eks-alb-ingress-controller | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.5.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release introduces the following changes:

**eks-alb-ingress-controller**
- Make AWS API debug logs configurable at the module level instead of hardcoding to true.

**eks-k8s-external-dns**
- Make `updatePolicy` a configurable option. This allows you to configure external-dns to run in `sync` mode (as opposed to the default `upsert-only` mode), which will delete records that do not map to `Ingress` resources. Note that this will not touch any records that it does not explicitly know about, which is tracked through `TXT` records on the hosted zone.
- Allow filtering Hosted Zones to manage by tags.

**eks-k8s-external-dns-iam-policy**
- Grant permissions to list tags on Hosted Zones, so that you can filter by tags when specifying hosted zones for the external-dns to manage.




</div>


### [v0.5.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.5.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/23/2019 | Modules affected: eks-k8s-external-dns, eks-k8s-external-dns-iam-policy, eks-alb-ingress-controller | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.5.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release introduces a new module `eks-k8s-external-dns` that can be used to deploy [external-dns](https://github.com/kubernetes-incubator/external-dns). This is a Kubernetes application that can map `Ingress` resource host paths to route 53 domain records so that you automatically configure host name routes to hit the `Ingress` endpoints. See [the module documentation](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/modules/eks-k8s-external-dns) for more information.



</div>


### [v0.5.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.5.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/18/2019 | Modules affected: eks-vpc-tags, eks-cloudwatch-container-logs, eks-alb-ingress-controller, eks-alb-ingress-controller-iam-policy | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.5.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release introduces two new modules: `eks-alb-ingress-controller` and `eks-alb-ingress-controller-iam-policy`. These two modules can be used to deploy [the AWS ALB Ingress Controller](https://github.com/kubernetes-sigs/aws-alb-ingress-controller), which allows you to map [Ingress resources](https://kubernetes.io/docs/concepts/services-networking/ingress/) to AWS ALBs. See the [module documentation for more information](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/modules/eks-alb-ingress-controller).

This release also includes the following updates:
- `eks-vpc-tags` now tags the public subnets with `kubernetes.io/role/elb: 1` so that public ELBs will use those subnets.
- `eks-cloudwatch-container-logs` module input variable `pod_node_affinity` has been tweaked to support specifying the `operator`. This requires changes to your code. See the migration guide below.



</div>


### [v0.4.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/12/2019 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.4.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- This release exposes `enabled_cluster_log_types`, which allow you to access control plane logging in CloudWatch Logs. You can read more about this feature in [the official AWS documentation](https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html).



</div>


### [v0.3.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.3.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/11/2019 | Modules affected: eks-cluster-workers-cross-access, eks-cloudwatch-container-logs | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.3.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release introduces support for specifying tolerations on the `fluentd-cloudwatch` Pods deployed using the `eks-cloudwatch-container-logs` module. This allows you to schedule the `fluentd-cloudwatch` Pods on nodes that have taints that prevent normal scheduling of Pods.

Additionally, this release introduces the `eks-cluster-workers-cross-access` module which allows defining security group rules that allow communication across multiple worker groups. Take a look at the [module docs](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/modules/eks-cluster-workers-cross-access) for more information. Check out the usage in the [eks-cluster-with-supporting-services example](https://github.com/gruntwork-io/terraform-aws-eks/blob/master/examples/eks-cluster-with-supporting-services/eks-cluster/main.tf#L189) for example usage.



</div>


### [v0.3.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/10/2019 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- This release updates all the examples to switch to a data source based token retrieval scheme to authenticate the kubernetes utilities (`kubergrunt`, `kubectl`, and the `kubernetes` + `helm` providers) as opposed to authentication by kubeconfig. This improves the experience for team based workflows, as now the terraform code is no longer dependent on having setup `kubectl` to work (NOTE: you still have to setup `helm`, but in the future this will also be changed to a data source based method). Take a look at [the `eks-cluster-basic` example](https://github.com/gruntwork-io/terraform-aws-eks/blob/master/examples/eks-cluster-basic/main.tf#L15) for an example.
- Given the new authentication scheme, we no longer recommend using the `configure_kubectl` option. This is great for a single person example setup, but when using in production, it can lead to team confusion. As such starting this release, the option is set to `false` by default. If you would like the old behavior, you can set it to `true` in your module.



</div>


### [v0.2.3](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.2.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/10/2019 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.2.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- We now support EKS private endpoints for clusters launched using the `eks-cluster-control-plane` module. Check out [the module docs for more info](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/modules/eks-cluster-control-plane#api-access-and-networking).



</div>


### [v0.2.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.2.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/8/2019 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.2.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- This fixes a bug where `kubergrunt` was still required even if all the feature flags were turned off.
- Various fixes to the README and examples.



</div>


### [v0.2.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.2.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/2/2019 | Modules affected: eks-cloudwatch-container-logs | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.2.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release introduces the `eks-cloudwatch-container-logs` module, which installs a `DaemonSet` on your EKS cluster to ship logs to CloudWatch using `fluentd`. Refer to the [module documentation](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/modules/eks-cloudwatch-container-logs) and [eks-cluster-with-supporting-services](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/examples/eks-cluster-with-supporting-services) for more information on how this works.



</div>



## terraform-aws-load-balancer


### [v0.13.3](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.13.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/24/2019 | Modules affected: alb | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.13.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `alb`


* This release fixes an issue with multiple duplicate ACM certs - e.g. you&apos;re rotating to a new cert and still have systems using the old cert - where previously it errored out if multiple ACM certs matched the domain. Instead, we will now pick the newer one.


Special thanks to @jasonmcintosh for the contribution!


* https://github.com/gruntwork-io/module-load-balancer/pull/52

</div>


### [v0.13.2](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.13.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/11/2019 | Modules affected: acm-tls-certificate | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.13.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `acm-tls-certificate` **[NEW MODULE!]**


* Added a new `acm-tls-certificate` module that you can use to programmatically issue and validate a free, auto-renewing TLS certificate in AWS Certificate Manager (ACM). This makes it easy to manage your TLS certs as code and easily attach them to ALBs, CloudFront, API Gateway, etc.


* https://github.com/gruntwork-io/module-load-balancer/pull/50

</div>



## terraform-aws-monitoring


### [v0.12.2](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.12.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/3/2019 | Modules affected: logs/cloudwatch-log-aggregation-iam-policy | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.12.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Extend cloudwatch log aggregation IAM policy with `logs:DescribeLogGroups` as needed by fluentd.



</div>


### [v0.12.1](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.12.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/2/2019 | Modules affected: alarms/sqs-alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.12.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- This release introduces `sqs-alarms`, which can be used to setup CloudWatch alarms for SQS queues. Check out the [example](https://github.com/gruntwork-io/module-aws-monitoring/tree/master/examples/sqs-alarms) for how to set it up.
- This release verifies compatibility with AWS provider 2.X. **NOTE**: there are no changes to the underlying modules (only the examples), so there are no breaking changes with this release.


</div>



## terraform-aws-sam


### [v0.1.12](https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.1.12)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/9/2019 | Modules affected: gruntsam | <a href="https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.1.12">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixes a bug where `gruntsam` generates broken code for dashes in route paths. (https://github.com/gruntwork-io/package-sam/issues/40)



</div>


### [v0.1.11](https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.1.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/9/2019 | Modules affected: api-gateway-account-settings | <a href="https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.1.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add a new `create_resources` input variable that, if set to false, will result in the `api-gateway-account-settings` module creating no resources. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack that will allow us to conditionally decide if the API Gateway account settings should be created or not.




</div>



## terraform-aws-security


### [v0.16.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.16.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/10/2019 | Modules affected: cross-account-iam-roles, kms-master-key | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.16.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `cross-account-iam-roles`: Add support for IAM role name prefix via new input variable `iam_role_name_prefix`. This way, we can have all the IAM roles created with names such as `houston-&lt;account-name&gt;-xxx`: e.g., `houston-stage-allow-full-access-from-other-accounts` and `houston-prod-allow-full-access-from-other-accounts`.
- `kms-master-key`: Add a new `create_resources` input variable to `kms-master-key` that, if set to false, will result in the module creating no resources. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack that will allow us to conditionally decide if the KMS master key should be created or not.




</div>



## terraform-aws-static-assets


### [v0.4.3](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.4.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/4/2019 | Modules affected: s3-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.4.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `s3-static-website`


* The `s3-static-website` module now has a new output called `website_bucket_endpoint_path_style` that has a path-style output of the S3 bucket endpoint, which will be of the format `s3-&lt;region&gt;.amazonaws.com/&lt;bucket-name&gt;`. The advantage of this style of endpoint is that it works over both HTTP and HTTPS.


* https://github.com/gruntwork-io/package-static-assets/pull/20

</div>



## terraform-aws-utilities


### [v0.0.8](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.0.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/19/2019 | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.0.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `list-remove` [**NEW**]


This release introduces a new module `list-remove` which can be used to remove items from a terraform list. See the [module docs](https://github.com/gruntwork-io/package-terraform-utilities/tree/master/modules/list-remove) for more info.


- https://github.com/gruntwork-io/package-terraform-utilities/pull/14

</div>


### [v0.0.7](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.0.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/10/2019 | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.0.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This release formats all the modules using `terraform fmt`. No functional changes are introduced.


- https://github.com/gruntwork-io/package-terraform-utilities/pull/13

</div>



## terraform-aws-vpc


### [v0.5.7](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.5.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/19/2019 | Modules affected: vpc-dns-forwarder, vpc-dns-forwarder-rules | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.5.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `vpc-dns-forwarder` [**NEW**]
* `vpc-dns-forwarder-rules` [**NEW**]


This release introduces two new modules that can be used to setup Route 53 Resolver endpoints to forward DNS queries over a peering network. This can be used to allow domains in Route 53 Private Hosted Zones to be resolved over a peering connection. See [the module documentation](https://github.com/gruntwork-io/module-vpc/tree/master/modules/vpc-dns-forwarder) for more details.



* https://github.com/gruntwork-io/module-vpc/pull/64
* https://github.com/gruntwork-io/module-vpc/pull/65

</div>



## terraform-kubernetes-helm


### [v0.2.4](https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.2.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/15/2019 | <a href="https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.2.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- This release improves the examples and documentation.



</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "6497c3f775b8577722edacb03efe76bf"
}
##DOCS-SOURCER-END -->
