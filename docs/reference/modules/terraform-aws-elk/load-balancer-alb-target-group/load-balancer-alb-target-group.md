---
title: "Load Balancer Target Group Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="ELK AWS Module" version="0.11.1" />

# Load Balancer Target Group Module

<a href="https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/load-balancer-alb-target-group" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-elk/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

This module can be used to create a [Target
Group](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-target-groups.html) and
[Listener Rules](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-update-rules.html) for
an Application Load Balancer created with the [alb module](https://github.com/gruntwork-io/terraform-aws-load-balancer/tree/main/modules/alb).

The reason the `load-balancer-alb-target-group` module is separate is that you may wish to create multiple target groups
for a single load balancer.

See the [examples folder](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/examples) for fully working sample code.

## Sample Usage

<ModuleUsage>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S LOAD-BALANCER-ALB-TARGET-GROUP MODULE
# ------------------------------------------------------------------------------------------------------

module "load_balancer_alb_target_group" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-elk.git//modules/load-balancer-alb-target-group?ref=v0.11.1"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The path to use for health check requests.
  health_check_path = <INPUT REQUIRED>

  # The starting priority for the Listener Rules
  listener_rule_starting_priority = <INPUT REQUIRED>

  # The port the servers are listening on for requests.
  port = <INPUT REQUIRED>

  # The name to use for the Target Group
  target_group_name = <INPUT REQUIRED>

  # Whether we're using an ASG or Gruntwork's Server Group module. If using ASG,
  # then var.asg_name must be specified. Otherwise leave it blank
  using_server_group = <INPUT REQUIRED>

  # The ID of the VPC in which to deploy the Target Group
  vpc_id = <INPUT REQUIRED>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the ASG (ASG) in the servers are deployed. Leave this blank if using
  # with a Server Group
  asg_name = null

  # The amount time for the Load Balancer to wait before changing the state of a
  # deregistering server from draining to unused. The range is 0-3600 seconds.
  deregistration_delay = 300

  # Set to true to enable stickiness, so a given user always gets routed to the same
  # server. We recommend enabling this for the Couchbase Web Console.
  enable_stickiness = false

  # The number of times the health check must pass before a server is considered
  # healthy.
  health_check_healthy_threshold = 2

  # The approximate amount of time, in seconds, between health checks of each
  # server. Minimum value 5 seconds, Maximum value 300 seconds.
  health_check_interval = 30

  # The HTTP codes to use when checking for a successful response from a server. You
  # can specify multiple comma-separated values (for example, "200,202") or a range
  # of values (for example, "200-299").
  health_check_matcher = "200"

  # The amount of time, in seconds, during which no response from a server means a
  # failed health check. Must be between 2 and 60 seconds.
  health_check_timeout = 5

  # The number of times the health check must fail before a server is considered
  # unhealthy.
  health_check_unhealthy_threshold = 2

  # The HTTP ARNs of ALB listeners to which Listener Rules that route to this Target
  # Group should be added.
  http_listener_arns = []

  # The HTTPS ARNs of ALB listeners to which Listener Rules that route to this
  # Target Group should be added.
  https_listener_arns = []

  # The number of HTTP ARNs in var.listener_arns. We should be able to compute this
  # automatically, but due to a Terraform limitation, if there are any dynamic
  # resources in var.listener_arns, then we won't be able to:
  # https://github.com/hashicorp/terraform/pull/11482
  num_http_listener_arns = 0

  # The number of HTTPS ARNs in var.listener_arns. We should be able to compute this
  # automatically, but due to a Terraform limitation, if there are any dynamic
  # resources in var.listener_arns, then we won't be able to:
  # https://github.com/hashicorp/terraform/pull/11482
  num_https_listener_arns = 0

  # The protocol to use to talk to the servers. Must be one of: HTTP, HTTPS.
  protocol = "HTTP"

  # This variable defines the paths or domain names that will be routed to the
  # servers. By default, we route all paths and domain names to the servers. To
  # override this, you should pass in a list of maps, where each map has the keys
  # field and values. See the Condition Blocks documentation for the syntax to use:
  # https://www.terraform.io/docs/providers/aws/r/lb_listener_rule.html.
  routing_condition = [{"field":"path-pattern","values":["*"]}]

  # The time period, in seconds, during which requests from a client should be
  # routed to the same target. After this time period expires, the load
  # balancer-generated cookie is considered stale. The range is 1 second to 1 week
  # (604800 seconds). Only used if var.enable_stickiness is true.
  stickiness_cookie_duration = 86400

}

```

</ModuleUsage>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="health_check_path" requirement="required" type="string">
<HclListItemDescription>

The path to use for health check requests.

</HclListItemDescription>
</HclListItem>

<HclListItem name="listener_rule_starting_priority" requirement="required" type="number">
<HclListItemDescription>

The starting priority for the Listener Rules

</HclListItemDescription>
</HclListItem>

<HclListItem name="port" requirement="required" type="number">
<HclListItemDescription>

The port the servers are listening on for requests.

</HclListItemDescription>
</HclListItem>

<HclListItem name="target_group_name" requirement="required" type="string">
<HclListItemDescription>

The name to use for the Target Group

</HclListItemDescription>
</HclListItem>

<HclListItem name="using_server_group" requirement="required" type="bool">
<HclListItemDescription>

Whether we're using an ASG or Gruntwork's Server Group module. If using ASG, then <a href="#asg_name"><code>asg_name</code></a> must be specified. Otherwise leave it blank

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the VPC in which to deploy the Target Group

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="asg_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the ASG (ASG) in the servers are deployed. Leave this blank if using with a Server Group

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="deregistration_delay" requirement="optional" type="number">
<HclListItemDescription>

The amount time for the Load Balancer to wait before changing the state of a deregistering server from draining to unused. The range is 0-3600 seconds.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="300"/>
</HclListItem>

<HclListItem name="enable_stickiness" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable stickiness, so a given user always gets routed to the same server. We recommend enabling this for the Couchbase Web Console.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="health_check_healthy_threshold" requirement="optional" type="number">
<HclListItemDescription>

The number of times the health check must pass before a server is considered healthy.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="2"/>
</HclListItem>

<HclListItem name="health_check_interval" requirement="optional" type="number">
<HclListItemDescription>

The approximate amount of time, in seconds, between health checks of each server. Minimum value 5 seconds, Maximum value 300 seconds.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

<HclListItem name="health_check_matcher" requirement="optional" type="string">
<HclListItemDescription>

The HTTP codes to use when checking for a successful response from a server. You can specify multiple comma-separated values (for example, '200,202') or a range of values (for example, '200-299').

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;200&quot;"/>
</HclListItem>

<HclListItem name="health_check_timeout" requirement="optional" type="number">
<HclListItemDescription>

The amount of time, in seconds, during which no response from a server means a failed health check. Must be between 2 and 60 seconds.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="5"/>
</HclListItem>

<HclListItem name="health_check_unhealthy_threshold" requirement="optional" type="number">
<HclListItemDescription>

The number of times the health check must fail before a server is considered unhealthy.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="2"/>
</HclListItem>

<HclListItem name="http_listener_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

The HTTP ARNs of ALB listeners to which Listener Rules that route to this Target Group should be added.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="https_listener_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

The HTTPS ARNs of ALB listeners to which Listener Rules that route to this Target Group should be added.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="num_http_listener_arns" requirement="optional" type="number">
<HclListItemDescription>

The number of HTTP ARNs in <a href="#listener_arns"><code>listener_arns</code></a>. We should be able to compute this automatically, but due to a Terraform limitation, if there are any dynamic resources in <a href="#listener_arns"><code>listener_arns</code></a>, then we won't be able to: https://github.com/hashicorp/terraform/pull/11482

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="num_https_listener_arns" requirement="optional" type="number">
<HclListItemDescription>

The number of HTTPS ARNs in <a href="#listener_arns"><code>listener_arns</code></a>. We should be able to compute this automatically, but due to a Terraform limitation, if there are any dynamic resources in <a href="#listener_arns"><code>listener_arns</code></a>, then we won't be able to: https://github.com/hashicorp/terraform/pull/11482

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="protocol" requirement="optional" type="string">
<HclListItemDescription>

The protocol to use to talk to the servers. Must be one of: HTTP, HTTPS.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;HTTP&quot;"/>
</HclListItem>

<HclListItem name="routing_condition" requirement="optional" type="list(object(…))">
<HclListItemDescription>

This variable defines the paths or domain names that will be routed to the servers. By default, we route all paths and domain names to the servers. To override this, you should pass in a list of maps, where each map has the keys field and values. See the Condition Blocks documentation for the syntax to use: https://www.terraform.io/docs/providers/aws/r/lb_listener_rule.html.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    field  = string
    values = list(string)
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue>

```hcl
[
  {
    field = "path-pattern",
    values = [
      "*"
    ]
  }
]
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="stickiness_cookie_duration" requirement="optional" type="number">
<HclListItemDescription>

The time period, in seconds, during which requests from a client should be routed to the same target. After this time period expires, the load balancer-generated cookie is considered stale. The range is 1 second to 1 week (604800 seconds). Only used if <a href="#enable_stickiness"><code>enable_stickiness</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="86400"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="target_group_arn">
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/load-balancer-alb-target-group/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/load-balancer-alb-target-group/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/load-balancer-alb-target-group/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "3ea3e2f6be2844da3cc66af1a16f12ac"
}
##DOCS-SOURCER-END -->
