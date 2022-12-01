
# Gruntwork release 2018-04

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2018-04</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code 
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2018-04. For instructions 
on how to use these updates in your code, check out the [updating 
documentation](/guides/working-with-code/using-modules#updating).

Here are the repos that were updated:

- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-kafka](#terraform-aws-kafka)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-vpc](#terraform-aws-vpc)
- [terraform-aws-zookeeper](#terraform-aws-zookeeper)


## terraform-aws-cache


### [v0.4.1](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.4.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/17/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.4.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>


### [v0.4.0](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/3/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.4.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  **BACKWARDS INCOMPATIBLE RELEASE**


* redis_with_snapshotting_without_auth_token
* redis_with_snapshotting_with_auth_token
* redis_without_snapshotting_without_auth_token
* redis_without_snapshotting_with_auth_token

To update your existing Redis cluster ensure you use `terragrunt state mv &lt;old_address&gt; &lt;new_address&gt;` to ensure that your cluster isn't deleted when you run `terraform apply`

For example:

To update a Redis cluster that was deployed using the `redis_without_snapshotting` resource to one of the new resources, you'll simply run:

```
terragrunt state mv module.redis.aws_elasticache_replication_group.redis_without_snapshotting module.redis.aws_elasticache_replication_group.redis_without_snapshotting_without_auth_token
```

</div>



## terraform-aws-ci


### [v0.7.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.7.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/29/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.7.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-ci/pull/55: Update the ALB version used in the `jenkins-server` module to v0.8.1 to pick up the fixes listed here: https://github.com/gruntwork-io/module-load-balancer/releases/tag/v0.8.1.

</div>



## terraform-aws-data-storage


### [v0.6.2](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.6.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/28/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.6.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-data-storage/pull/40, https://github.com/gruntwork-io/module-data-storage/pull/41: The `aurora` module now exposes two new input variables:

* `monitoring_role_arn`: specify an IAM role to associate with the Aurora DB.
* `monitoring_interval`: enable enhanced monitoring. Note that enhanced monitoring requires IAM permissions. If you don't specify `monitoring_role_arn` yourself, the `aurora` module will add the appropriate permissions automatically. If you do specify a custom `monitoring_role_arn`, make sure it has the IAM permissions required for enhanced monitoring.

This release also fixes a bug in v0.6.1 where the `monitoring_role_arn` param was not properly used in the `rds` module.

</div>


### [v0.6.1](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.6.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/25/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.6.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-data-storage/pull/39: The `rds` module now exposes two new input variables:

* `monitoring_role_arn`: specify an IAM role to associate with the RDS DB.
* `monitoring_interval`: enable enhanced monitoring. Note that enhanced monitoring requires IAM permissions. If you don't specify `monitoring_role_arn` yourself, the `rds` module will add the appropriate permissions automatically. If you do specify a custom `monitoring_role_arn`, make sure it has the IAM permissions required for enhanced monitoring.


</div>



## terraform-aws-kafka


### [v0.3.1](https://github.com/gruntwork-io/terraform-aws-kafka/releases/tag/v0.3.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/10/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-kafka/releases/tag/v0.3.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - #31: Fix an issue where `aws.sh` in `bash-commons` did not correctly handle the case where only private IP addresses are in use on an EC2 Instance.

Please note that this is a **pre-release**. See [v0.3.0](https://github.com/gruntwork-io/package-kafka/releases/tag/v0.3.0) for an explanation.

</div>


### [v0.3.0](https://github.com/gruntwork-io/terraform-aws-kafka/releases/tag/v0.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/8/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-kafka/releases/tag/v0.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Kafka v1.0.0 is now supported.
- Kafka download is now verified using a GPG Key published by Apache
- Update Kafka to work with CentOS.
- You can now assign DNS names to the ENIs used by Kafka, and optionally make ENIs public (though we strongly advise keeping ENIs private for all production deployments)
- We now bundle the running of [kafka-health-check](https://github.com/andreas-schroeder/kafka-health-check) directly with `run-kafka`. This is because a  more sophisticated health check tool is needed by Kafka in order for Kafka to accurately report its health status to the Elastic Load Balancer. Unfortunately, this required a backwards-incompatible change to the `run-kafka` interface.
- The configuration files are now easier to customize by using a "variable substitution" paradigm (See the [run-kafka config README](https://github.com/gruntwork-io/package-kafka/tree/master/modules/run-kafka/config) for additional details).
- We've introduced a `bash-commons` module that consolidates all the common bash functions we use into a single module. This makes all bash scripts shorter and gives us higher-quality more reusable bash functions. Just be sure to `gruntwork-install` the `bash-commons` module! See below for details.
- For developers of this module, we introduced a number of improved patterns for building and testing the module including running the Kafka cluster in Docker and being able to selectively disable some stages of the automated tests from running (e.g. don't rebuild the AMI every time, just reuse the previous AMI).

Related PRs: #27, #28, #29, #30 


All tests are passing for Kafka, and the following Kafka modules are all production-ready:
  - `bash-commons`
  - `generate-key-stores`
  - `install-kafka`
  - `kafka-cluster`
  - `kafka-iam-permissions`
   - `kafka-security-group-rules`
  - `run-kafka`

  The remaining modules that implement REST Proxy, Schema Registry, and Kafka Connect are probably production ready as-is, but we first need to add automated tests to validate their functionality. That is  scheduled for later this week.

  ### Backwards-Incompatible Changes
  
  - One important change is that we now bundle [kafka-health-check](https://github.com/andreas-schroeder/kafka-health-check) directly with `run-kafka`. Previously, this script did not install any health check tool. Kafka-health-check runs locally on a Kafka broker and exposes an HTTP interface (by default, port 8000) that will return an HTTP 200 response when the broker is healthy. 
    
    Technically, this isn't a backwards-incompatible change because you can still query the Kafka listener directly on port 9092, but we want to make sure you're aware that there is now a better way to check the health status of Kafka.

   - In order to accommodate the kafka-health-check tool, we needed to define three separate listeners for Kafka in the [listeners](https://github.com/gruntwork-io/package-kafka/blob/master/modules/run-kafka/config/kafka/server-4.0.x.properties#L45) and [advertised.listeners](https://github.com/gruntwork-io/package-kafka/blob/master/modules/run-kafka/config/kafka/server-4.0.x.properties#L50) properties of the Kafka configuration file:

     - `EXTERNAL`: Accepts traffic from Kafka clients.
     - `INTERNAL`: Accepts traffic from fellow Kafka brokers.
     - `HEALTHCHECK`: Only accepts traffic from `127.0.0.1` and intended for use with kafka-health-check

      We need multiple listeners so that external Kafka clients, fellow Kafka brokers, and the kafka-health-check tool each receive the appropriate "advertised listener" property when connecting to Kafka. This was especially useful for supporting Kafka in a local Docker environment as well.

     #### Example

      Suppose we have the following configuration file for a Kafka broker:

      ```
      listeners=EXTERNAL://0.0.0.0:9092, INTERNAL://0.0.0.0:9093, HEALTHCHECK://127.0.0.1:9094
   
      advertised.listeners=EXTERNAL://1.2.3.4:9094,INTERNAL://172.21.0.3:9093,HEALTHCHECK://127.0.0.1:9094
   
      listener.security.protocol.map=EXTERNAL:SSL, INTERNAL:SSL, HEALTHCHECK: PLAINTEXT
   
      inter.broker.listener.name=INTERNAL
      ```
   
      This indicates that Kafka will accept connections from any IP address on ports 9092 and 9093, and only from `127.0.0.1` on port 9094. Suppose Kafka were to receive a connection on port 9093. It would then return an "advertised listener" value to the client of `172.21.0.3:9093`, the advertised listener value that corresponds to the `INTERNAL` listener. The idea here is that a Kafka client may have used any IP address that reaches the Kafka broker to connect initially, but going forward the client should specifically use `172.21.0.3:9093` to connect.

   - Finally, the interface to `run-kafka` has changed. It now requires the following arguments:
      - `--config-path "/path/to/kafka.properties"` 
      - `--log4j-config-path "/path/to/log4j.properties"`

      In addition, there are a some new arguments. See the [updated run-kafka docs](https://github.com/gruntwork-io/package-kafka/blob/master/modules/run-kafka/bin/run-kafka#L84)

   ### Upgrade Instructions
   
1. On the Terraform side, upgrade to the latest version of all the following modules:

   - `kafka-security-group-rules`: We added a Security Group rule that allows Kafka brokers to reach each other via the `INTERNAL` listener described above.

   - `kafka-iam-permissions`: We fixed and issue where Kafka brokers did not have the appropriate IAM permissions to discover the Elastic Network Interfaces (ENIs) of themselves or other Kafka brokers.

   - `kafka-cluster`: We added the ability to assign a DNS name and public IP to each Elastic Network Interface. Note that we NOT recommend exposing Kafka on public IPs for production usage. Note also that Kafka does not listen over HTTPS, so DNS names are a convenient way to address a Kafka cluster, but you'll still need to use TCP-based Kafka clients to connect. We'll soon be releasing REST Proxy, which does expose an HTTPS interface to Kafka.
       - If you wish to assign a DNS name to each Kafka broker, set the `var.dns_name_common_portion` or `var.dns_names` variables, and also the `var.route53_hosted_zone_id` variable.
       - To expose Kafka's ENIs publicly, set `var.enable_elastic_ips` to `true`. (WARNING: Do not do this in a production setting!)

1. For your Packer template, make the following updates:
 
   - You'll now need to install the `bash-commons` module from this repo. That's because almost all bash scripts in this repo now use the common bash functions in bash-commons rather than duplicating the same bash functions each time.

   To install this, add the following line to your Packer template above all the other `gruntwork-install` calls for `package-kafka`:

   ```bash
    gruntwork-install --module-name 'bash-commons' --tag 'v0.3.0' --repo https://github.com/gruntwork-io/package-kafka
   ```

   - You'll need to do the same when installing Zookeeper. See the [zookeeper-ami example](https://github.com/gruntwork-io/package-kafka/blob/master/examples/zookeeper-ami/configure-zookeeper-server.sh#L8)

   - Upgrade to the newest `install-kafka` script, which now downloads Kafka v1.0.0 and validates the downloaded binary with the Apacha Kafka GPG key.

   - Upgrade to the newest `run-kafka`, which now installs kafka-health-check by default. 

1. Next, update the user data for your Kafka brokers by making sure your arguments to `run-kafka` match the new `run-kafka` interface. 

   Note that the default values for `run-kafka` will "just work", however if you previously added optional arguments, you may need to update the argument values or argument names you pass in. See the [kafka user data example](https://github.com/gruntwork-io/package-kafka/blob/master/examples/kafka-zookeeper-standalone-clusters/user-data/kafka-user-data.sh#L39-L59) for a good reference, as well as the [updated run-kafka docs](https://github.com/gruntwork-io/package-kafka/blob/master/modules/run-kafka/bin/run-kafka#L84).

1. Finally, we've updated the way that configuration files are customized for Kafka. See the new [run-kafka config README](https://github.com/gruntwork-io/package-kafka/tree/master/modules/run-kafka/config) for additional details.

</div>



## terraform-aws-load-balancer


### [v0.8.1](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.8.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/29/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.8.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-load-balancer/pull/30, https://github.com/gruntwork-io/module-load-balancer/pull/31, https://github.com/gruntwork-io/module-load-balancer/pull/32: Fix several bugs with `count` in the `alb` module that would crop up if `allow_inbound_from_cidr_blocks` or `allow_inbound_from_security_group_ids` were empty.

</div>


### [v0.8.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.8.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/3/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.8.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>



## terraform-aws-openvpn


### [v0.5.4](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.5.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/19/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.5.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Fix an issue where the `pip` upgrade was breaking the `aws-cli` install process

</div>



## terraform-aws-security


### [v0.8.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.8.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/27/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.8.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
The main motivation for locking down EC2 metadata is as follows:

1. EC2 metadata gives you the credentials you need to assume any IAM role associated with the EC2 instance, and thereby, get all the permissions available in that IAM role.
1. Locking down the metadata to, for example, only the root user, makes sure that if a hacker breaks into your server with a privileged user, they cannot get the full power of the IAM role.

</div>


### [v0.8.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.8.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/17/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.8.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-security/pull/80: The `aws-auth` script now exposes the expiration time in the `AWS_SESSION_EXPIRATION` environment variable.

</div>


### [TEST RELEASE](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.8.1-test)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/16/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.8.1-test">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  This release is for testing purposes ONLY. This is NOT a production release. The only intention here is to test the deployment portion of the CircleCI 2.0 migration

</div>



## terraform-aws-vpc


### [v0.5.0](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.5.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/27/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.5.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-vpc/pull/41, https://github.com/gruntwork-io/module-vpc/pull/42: 

* The `vpc-mgmt-network-acls` module now allows all inbound and outbound traffic within the private subnet and between the public and private subnet. Before, all inbound traffic was allowed, but outbound traffic was limited solely to TCP.

* The `vpc-app-network-acls` module now allows all inbound and outbound traffic from/to the mgmt VPC. Before, all inbound traffic was allowed, but outbound traffic was limited solely TCP.

</div>



## terraform-aws-zookeeper


### [v0.4.3](https://github.com/gruntwork-io/terraform-aws-zookeeper/releases/tag/v0.4.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/25/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/releases/tag/v0.4.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - #25: Update to Zookeeper v3.4.12. Check the file integrity of downloaded Zookeeper file. Switch the download URL used by Zookeeper to one more likely to retain historical versions.

</div>


### [v0.4.2](https://github.com/gruntwork-io/terraform-aws-zookeeper/releases/tag/v0.4.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/23/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/releases/tag/v0.4.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - #24: Oracle released Java 1.8u171 and 1.8u172, and disabled java 1.8u161 in the process. This release fixes the issue so that installing Oracle JDK8 by `yum` works once again.

</div>




<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "12eb772ba238756a2bb027f2f7daaa28"
}
##DOCS-SOURCER-END -->
