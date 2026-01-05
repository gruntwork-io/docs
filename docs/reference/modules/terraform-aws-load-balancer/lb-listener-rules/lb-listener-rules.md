---
title: "Load Balancer Listener Rules"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Load Balancer Modules" version="1.1.1" lastModifiedVersion="1.1.0"/>

# Load Balancer Listener Rules

<a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/tree/v1.1.1/modules/lb-listener-rules" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v1.1.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module provides a simpler, more declarative interface for creating
[Load Balancer Listener Rules](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-listeners.html)
that determine how the load balancer routes requests to its registered targets. It's an alternative to creating
[`lb_listener_rule`](https://www.terraform.io/docs/providers/aws/r/lb_listener_rule.html) resources directly in
Terraform, which can be convenient, for example, when configuring listener rules in a
[Terragrunt configuration](https://terragrunt.gruntwork.io/).

This module currently supports:

*   Most major rule types: forward rules, redirect rules, fixed-response
*   Most condition types: host header, HTTP header, request method, path pattern, query string, source IP.

This module does NOT currently support:

*   `authenticate_cognito` and `authenticate_oidc` rules

This feature may be added later, but if you need them now, you should use the
[`lb_listener_rule`](https://www.terraform.io/docs/providers/aws/r/lb_listener_rule.html) resource directly.

## Gotcha's

### Make sure your Listeners handle all possible request paths

An [LB Listener](http://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-listeners.html)
represents an open port on your ALB, waiting to receive requests and route them to a [Target
Group](http://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-target-groups.html).

Suppose you want to have this LB Listener route requests for `/foo` to ServiceFoo and requests for `/bar` to ServiceBar.
You'd accomplish this creating two [LB Listener
Rules](http://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-update-rules.html) as follows:

*   Route `/foo` traffic to Target Group ServiceFoo
*   Route `/bar` traffic to Target Group ServiceBar

So far so good. But what if the Listener receives a request for `/hello`? Since no Listener Rule handles that path, the
LB needs to handle it with a default action. The default action in [the ALB module](https://github.com/gruntwork-io/terraform-aws-load-balancer/blob/f95b13e/modules/alb/main.tf#L50-L89), for example, returns a fixed response, which
by default is a blank 404 page. You can also add an ALB Listener Rule that catches ALL requests (i.e., `*`) and have that
rule forward to a custom Target Group so your own apps can respond in any way you wish.

### Make sure your Listener Rules each have a unique "priority"

See the [prior section](#make-sure-your-listeners-handle-all-possible-request-paths) understand what Listener Rules are.

When defining a Listener Rule, you must specify both a priority and a path. The priority tells the ALB in what priority
a particular Listener Rule should be evaluated. For example, suppose you have the following Listener Rules defined on
your ALB:

*   Route `/foo` traffic to Target Group ServiceFoo
*   Route `/foo*` traffic to Target Group ServiceBar

To which Target Group should a request for `/foo` be routed? Based on the above, it's non-determinate. For this reason,
you must include a "priority" in the Listener Rule. A priority is an integer value where the lower the number the higher
the priority. For example, if we add in priorities to our Listener Rules:

*   Priority: 100. Route `/foo` traffic to Target Group ServiceFoo
*   Priority: 200. Route `/foo*` traffic to Target Group ServiceBar

Now we know that the first Listener Rule has a higher priority. That means that requests for `/foo` will be routed to
ServiceFoo, while all other requests will be routed to ServiceBar.

The gotcha here is that, because you define the Listener Rules for a single Listener across potentially many different
ECS Services or Auto Scaling Groups, take care to make sure that each Listener Rule uses a globally unique priority number.

Note that in most cases, your path definitions should be mutually exclusive and the actual priority value won't matter.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S LB-LISTENER-RULES MODULE
# ------------------------------------------------------------------------------------------------------

module "lb_listener_rules" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-load-balancer.git//modules/lb-listener-rules?ref=v1.1.1"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A map of all the listeners on the load balancer. The keys should be the port
  # numbers and the values should be the ARN of the listener for that port.
  default_listener_arns = <map(string)>

  # The default port numbers on the load balancer to attach listener rules to.
  # You can override this default on a rule-by-rule basis by setting the
  # listener_ports parameter in each rule. The port numbers specified in this
  # variable and the listener_ports parameter must exist in var.listener_arns.
  default_listener_ports = <list(string)>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A map of custom tags to apply to the listener rules.
  custom_tags = {}

  # The ARN of the Target Group to which to route traffic. Required if using
  # forward rules.
  default_forward_target_group_arns = []

  # Listener rules for a fixed-response action. See comments below for
  # information about the parameters.
  fixed_response_rules = {}

  # Listener rules for a forward action that distributes requests among one or
  # more target groups. See comments below for information about the parameters.
  forward_rules = {}

  # Whether or not to ignore changes to the target groups in the listener
  # forwarding rule. Can be used with AWS CodeDeploy to allow changes to target
  # group mapping outside of Terraform.
  ignore_changes_to_target_groups = false

  # Listener rules for a redirect action. See comments below for information
  # about the parameters.
  redirect_rules = {}

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S LB-LISTENER-RULES MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-load-balancer.git//modules/lb-listener-rules?ref=v1.1.1"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A map of all the listeners on the load balancer. The keys should be the port
  # numbers and the values should be the ARN of the listener for that port.
  default_listener_arns = <map(string)>

  # The default port numbers on the load balancer to attach listener rules to.
  # You can override this default on a rule-by-rule basis by setting the
  # listener_ports parameter in each rule. The port numbers specified in this
  # variable and the listener_ports parameter must exist in var.listener_arns.
  default_listener_ports = <list(string)>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A map of custom tags to apply to the listener rules.
  custom_tags = {}

  # The ARN of the Target Group to which to route traffic. Required if using
  # forward rules.
  default_forward_target_group_arns = []

  # Listener rules for a fixed-response action. See comments below for
  # information about the parameters.
  fixed_response_rules = {}

  # Listener rules for a forward action that distributes requests among one or
  # more target groups. See comments below for information about the parameters.
  forward_rules = {}

  # Whether or not to ignore changes to the target groups in the listener
  # forwarding rule. Can be used with AWS CodeDeploy to allow changes to target
  # group mapping outside of Terraform.
  ignore_changes_to_target_groups = false

  # Listener rules for a redirect action. See comments below for information
  # about the parameters.
  redirect_rules = {}

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="default_listener_arns" requirement="required" type="map(string)">
<HclListItemDescription>

A map of all the listeners on the load balancer. The keys should be the port numbers and the values should be the ARN of the listener for that port.

</HclListItemDescription>
</HclListItem>

<HclListItem name="default_listener_ports" requirement="required" type="list(string)">
<HclListItemDescription>

The default port numbers on the load balancer to attach listener rules to. You can override this default on a rule-by-rule basis by setting the listener_ports parameter in each rule. The port numbers specified in this variable and the listener_ports parameter must exist in <a href="#listener_arns"><code>listener_arns</code></a>.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the listener rules.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="default_forward_target_group_arns" requirement="optional" type="list(map(…))">
<HclListItemDescription>

The ARN of the Target Group to which to route traffic. Required if using forward rules.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(map(any))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Each entry in the map supports the following attributes:
   REQUIRED:
   - arn      string: The ARN of the target group.
   OPTIONAL:
   - weight   number: The weight. The range is 0 to 999. Only applies if len(target_group_arns) > 1.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="fixed_response_rules" requirement="optional" type="map(any)">
<HclListItemDescription>

Listener rules for a fixed-response action. See comments below for information about the parameters.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
    {
      "health-path" = {
        priority     = 130
  
        content_type = "text/plain"
        message_body = "HEALTHY"
        status_code  = "200"
  
      Authentication OIDC:
        authenticate_oidc = {
          authorization_endpoint = "https://myaccount.oktapreview.com/oauth2/v1/authorize"
          client_id              = "0123456789aBcDeFgHiJ"
          client_secret          = "clientsecret"
          issuer                 = "https://myaccount.oktapreview.com"
          token_endpoint         = "https://myaccount.oktapreview.com/oauth2/v1/token"
          user_info_endpoint     = "https://myaccount.oktapreview.com/oauth2/v1/userinfo"
        }
  
      Conditions:
      You need to provide *at least ONE* per set of rules. It should contain one of the following:
        host_headers         = ["foo.com", "www.foo.com"]
        path_patterns        = ["/health"]
        source_ips           = ["127.0.0.1"]
        http_request_methods = ["GET"]
        query_strings = [
          {
            key   = "foo"   Key is optional, this can be ommited.
            value = "bar"
          }, {
            value = "hello"
          }
        ]
      }
    }

```
</details>

</HclGeneralListItem>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Each entry in the map supports the following attributes:
  
   REQUIRED
   - content_type string        : The content type. Valid values are `text/plain`, `text/css`, `text/html`,
                                  `application/javascript` and `application/json`.
  
   OPTIONAL (defaults to value of corresponding module input):
   - priority             number       : A value between 1 and 50000. Leaving it unset will automatically set the rule with
                                          the next available priority after currently existing highest rule. This value
                                          must be unique for each listener.
   - listener_ports       list(string) : A list of ports to use to lookup the LB listener from var.default_listener_arns.
                                          Conflicts with listener_arns attribute. Defaults to var.default_listener_ports
                                          if omitted.
   - listener_arns        list(string) : A list of listener ARNs to use for applying the rule. Conflicts with
                                          listener_ports attribute.
   - message_body         string       : The message body.
  
   - status_code          string       : The HTTP response code. Valid values are `2XX`, `4XX`, or `5XX`.
  
   - authenticate_oidc    map(object)  : OIDC authentication configuration. Only applies, if not null.
  
   - authenticate_cognito map(object)  : Cognito authentication configuration. Only applies, if not null.
  

```
</details>

<details>


```hcl

   Wildcard characters:
   * - matches 0 or more characters
   ? - matches exactly 1 character
   To search for a literal '*' or '?' character in a query string, escape the character with a backslash (\).
  
   Conditions (need to specify at least one):
   - path_patterns        list(string)     : A list of paths to match (note that "/foo" is different than "/foo/").
                                              Comparison is case sensitive. Wildcard characters supported: * and ?.
                                              It is compared to the path of the URL, not it's query string. To compare
                                              against query string, use the `query_strings` condition.
   - host_headers         list(string)     : A list of host header patterns to match. Comparison is case insensitive.
                                              Wildcard characters supported: * and ?.
   - source_ips           list(string)     : A list of IP CIDR notations to match. You can use both IPv4 and IPv6
                                              addresses. Wildcards are not supported. Condition is not satisfied by the
                                              addresses in the `X-Forwarded-For` header, use `http_headers` condition instead.
   - query_strings        list(map(string)): Query string pairs or values to match. Comparison is case insensitive.
                                              Wildcard characters supported: * and ?. Only one pair needs to match for
                                              the condition to be satisfied.
   - http_request_methods list(string)     : A list of HTTP request methods or verbs to match. Only allowed characters are
                                              A-Z, hyphen (-) and underscore (_). Comparison is case sensitive. Wildcards
                                              are not supported. AWS recommends that GET and HEAD requests are routed in the
                                              same way because the response to a HEAD request may be cached.

```
</details>

<details>


```hcl

   Authenticate OIDC Blocks:
   authenticate_oidc:
   - authorization_endpoint              string     : (Required) The authorization endpoint of the IdP.
   - client_id                           string     : (Required) The OAuth 2.0 client identifier.
   - client_secret                       string     : (Required) The OAuth 2.0 client secret.
   - issuer                              string     : (Required) The OIDC issuer identifier of the IdP.
   - token_endpoint                      string     : (Required) The token endpoint of the IdP.
   - user_info_endpoint                  string     : (Required) The user info endpoint of the IdP.
   - authentication_request_extra_params map(string): (Optional) The query parameters to include in the redirect request to the authorization endpoint. Max: 10.
   - on_unauthenticated_request          string     : (Optional) The behavior if the user is not authenticated. Valid values: deny, allow and authenticate
   - scope                               string     : (Optional) The set of user claims to be requested from the IdP.
   - session_cookie_name                 string     : (Optional) The name of the cookie used to maintain session information.
   - session_timeout                     int        : (Optional) The maximum duration of the authentication session, in seconds.

```
</details>

<details>


```hcl

   Authenticate Cognito Blocks:
   authenticate_cognito:
   - user_pool_arn                       string      : (Required) The ARN of the Cognito user pool
   - user_pool_client_id                 string      : (Required) The ID of the Cognito user pool client.
   - user_pool_domain                    string      : (Required) The domain prefix or fully-qualified domain name of the Cognito user pool.
   - authentication_request_extra_params map(string) : (Optional) The query parameters to include in the redirect request to the authorization endpoint. Max: 10.
   - on_unauthenticated_request          string      : (Optional) The behavior if the user is not authenticated. Valid values: deny, allow and authenticate
   - scope                               string      : (Optional) The set of user claims to be requested from the IdP.
   - session_cookie_name                 string      : (Optional) The name of the cookie used to maintain session information.
   - session_timeout                     int         : (Optional) The maximum duration of the authentication session, in seconds.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="forward_rules" requirement="optional" type="any">
<HclListItemDescription>

Listener rules for a forward action that distributes requests among one or more target groups. See comments below for information about the parameters.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
    {
      "foo" = {
        priority = 120
  
        host_headers         = ["www.foo.com", "*.foo.com"]
        path_patterns        = ["/foo/*"]
        source_ips           = ["127.0.0.1/32"]
        http_request_methods = ["GET"]
        query_strings = [
          {
             key   = "foo"   Key is optional, this can be ommited.
            value = "bar"
          }, {
            value = "hello"
          }
       ]
     },
     "bar" = {
       priority       = 127
       listener_ports = ["443"]
  
       host_headers   = ["example.com", "www.example.com"]
       path_patterns  = ["/super_secure_path", "/another_path"]
       http_headers   = [
         {
           http_header_name = "X-Forwarded-For"
           values           = ["127.0.0.1"]
         }
       ]
     },
     "auth" = {
       priority       = 128
       listener_ports = ["443"]
  
       host_headers      = ["intern.example.com]
       path_patterns     = ["/admin", "/admin/*]
       authenticate_oidc = {
         authorization_endpoint = "https://myaccount.oktapreview.com/oauth2/v1/authorize"
         client_id              = "0123456789aBcDeFgHiJ"
         client_secret          = "clientsecret"
         issuer                 = "https://myaccount.oktapreview.com"
         token_endpoint         = "https://myaccount.oktapreview.com/oauth2/v1/token"
         user_info_endpoint     = "https://myaccount.oktapreview.com/oauth2/v1/userinfo"
       }
     }
   }

```
</details>

</HclGeneralListItem>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Each entry in the map supports the following attributes:
  
   OPTIONAL (defaults to value of corresponding module input):
   - priority             number                    : A value between 1 and 50000. Leaving it unset will automatically set
                                                       the rule with the next available priority after currently existing highest
                                                        rule. This value must be unique for each listener.
   - listener_ports       list(string)              : A list of ports to use to lookup the LB listener from
                                                      var.default_listener_arns. Conflicts with listener_arns attribute.
                                                      Defaults to var.default_listener_ports if omitted.
   - listener_arns        list(string)              : A list of listener ARNs to use for applying the rule. Conflicts with
                                                      listener_ports attribute.
   - stickiness           map(object[Stickiness)    : Target group stickiness for the rule. Only applies if more than one
                                                    target_group_arn is defined.
   - authenticate_oidc    map(object)               : OIDC authentication configuration. Only applies, if not null.
  
   - authenticate_cognito map(object)               : Cognito authentication configuration. Only applies, if not null.
  

```
</details>

<details>


```hcl

   Wildcard characters:
   * - matches 0 or more characters
   ? - matches exactly 1 character
   To search for a literal '*' or '?' character in a query string, escape the character with a backslash (\).

```
</details>

<details>


```hcl

   Conditions (need to specify at least one):
   - path_patterns        list(string)     : A list of paths to match (note that "/foo" is different than "/foo/").
                                              Comparison is case sensitive. Wildcard characters supported: * and ?.
                                              It is compared to the path of the URL, not it's query string. To compare
                                              against query string, use the `query_strings` condition.
   - host_headers         list(string)     : A list of host header patterns to match. Comparison is case insensitive.
                                              Wildcard characters supported: * and ?.
   - source_ips           list(string)     : A list of IP CIDR notations to match. You can use both IPv4 and IPv6
                                              addresses. Wildcards are not supported. Condition is not satisfied by the
                                              addresses in the `X-Forwarded-For` header, use `http_headers` condition instead.
   - query_strings        list(map(string)): Query string pairs or values to match. Comparison is case insensitive.
                                              Wildcard characters supported: * and ?. Only one pair needs to match for
                                              the condition to be satisfied.
   - http_request_methods list(string)     : A list of HTTP request methods or verbs to match. Only allowed characters are
                                              A-Z, hyphen (-) and underscore (_). Comparison is case sensitive. Wildcards
                                              are not supported. AWS recommends that GET and HEAD requests are routed in the
                                              same way because the response to a HEAD request may be cached.

```
</details>

<details>


```hcl

   Authenticate OIDC Blocks:
   authenticate_oidc:
   - authorization_endpoint              string     : (Required) The authorization endpoint of the IdP.
   - client_id                           string     : (Required) The OAuth 2.0 client identifier.
   - client_secret                       string     : (Required) The OAuth 2.0 client secret.
   - issuer                              string     : (Required) The OIDC issuer identifier of the IdP.
   - token_endpoint                      string     : (Required) The token endpoint of the IdP.
   - user_info_endpoint                  string     : (Required) The user info endpoint of the IdP.
   - authentication_request_extra_params map(string): (Optional) The query parameters to include in the redirect request to the authorization endpoint. Max: 10.
   - on_unauthenticated_request          string     : (Optional) The behavior if the user is not authenticated. Valid values: deny, allow and authenticate
   - scope                               string     : (Optional) The set of user claims to be requested from the IdP.
   - session_cookie_name                 string     : (Optional) The name of the cookie used to maintain session information.
   - session_timeout                     int        : (Optional) The maximum duration of the authentication session, in seconds.

```
</details>

<details>


```hcl

   Authenticate Cognito Blocks:
   authenticate_cognito:
   - user_pool_arn                       string      : (Required) The ARN of the Cognito user pool
   - user_pool_client_id                 string      : (Required) The ID of the Cognito user pool client.
   - user_pool_domain                    string      : (Required) The domain prefix or fully-qualified domain name of the Cognito user pool.
   - authentication_request_extra_params map(string) : (Optional) The query parameters to include in the redirect request to the authorization endpoint. Max: 10.
   - on_unauthenticated_request          string      : (Optional) The behavior if the user is not authenticated. Valid values: deny, allow and authenticate
   - scope                               string      : (Optional) The set of user claims to be requested from the IdP.
   - session_cookie_name                 string      : (Optional) The name of the cookie used to maintain session information.
   - session_timeout                     int         : (Optional) The maximum duration of the authentication session, in seconds.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="ignore_changes_to_target_groups" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to ignore changes to the target groups in the listener forwarding rule. Can be used with AWS CodeDeploy to allow changes to target group mapping outside of Terraform.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="redirect_rules" requirement="optional" type="map(any)">
<HclListItemDescription>

Listener rules for a redirect action. See comments below for information about the parameters.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
    {
      "old-website" = {
        priority = 120
        port     = 443
        protocol = "HTTPS"
  
        status_code = "HTTP_301"
        host  = "gruntwork.in"
        path  = "/signup"
        query = "foo"
  
      Authentication OIDC:
        authenticate_oidc = {
          authorization_endpoint = "https://myaccount.oktapreview.com/oauth2/v1/authorize"
          client_id              = "0123456789aBcDeFgHiJ"
          client_secret          = "clientsecret"
          issuer                 = "https://myaccount.oktapreview.com"
          token_endpoint         = "https://myaccount.oktapreview.com/oauth2/v1/token"
          user_info_endpoint     = "https://myaccount.oktapreview.com/oauth2/v1/userinfo"
        }
  
      Conditions:
        host_headers         = ["foo.com", "www.foo.com"]
        path_patterns        = ["/health"]
        source_ips           = ["127.0.0.1"]
        http_request_methods = ["GET"]
        query_strings = [
          {
            key   = "foo"   Key is optional, this can be ommited.
            value = "bar"
          }, {
            value = "hello"
          }
        ]
      }
    }

```
</details>

</HclGeneralListItem>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Each entry in the map supports the following attributes:
  
   OPTIONAL (defaults to value of corresponding module input):
   - priority             number         : A value between 1 and 50000. Leaving it unset will automatically set the rule
                                           with the next available priority after currently existing highest rule. This
                                           value must be unique for each listener.
   - listener_ports       list(string)   : A list of ports to use to lookup the LB listener from var.default_listener_arns.
                                           Conflicts with listener_arns attribute. Defaults to var.default_listener_ports
                                           if omitted.
   - listener_arns        list(string)   : A list of listener ARNs to use for applying the rule. Conflicts with
                                           listener_ports attribute.
   - status_code          string         : The HTTP redirect code. The redirect is either permanent `HTTP_301` or temporary `HTTP_302`.
  
   - authenticate_oidc    map(object)    : OIDC authentication configuration. Only applies, if not null.
  
   - authenticate_cognito map(object)    : Cognito authentication configuration. Only applies, if not null.
  

```
</details>

<details>


```hcl

   The URI consists of the following components: `protocol://hostname:port/path?query`. You must modify at least one of
   the following components to avoid a redirect loop: protocol, hostname, port, or path. Any components that you do not
   modify retain their original values.
   - host        string  : The hostname. The hostname can contain {host}.
   - path        string  : The absolute path, starting with the leading "/". The path can contain `host`, `path`, and
                           `port`.
   - port        string  : The port. Specify a value from 1 to 65525.
   - protocol    string  : The protocol. Valid values are `HTTP` and `HTTPS`. You cannot redirect HTTPS to HTTP.
   - query       string  : The query params. Do not include the leading "?".
  
   Wildcard characters:
   * - matches 0 or more characters
   ? - matches exactly 1 character
   To search for a literal '*' or '?' character in a query string, escape the character with a backslash (\).
  
   Conditions (need to specify at least one):
   - path_patterns        list(string)     : A list of paths to match (note that "/foo" is different than "/foo/").
                                              Comparison is case sensitive. Wildcard characters supported: * and ?.
                                              It is compared to the path of the URL, not it's query string. To compare
                                              against query string, use the `query_strings` condition.
   - host_headers         list(string)     : A list of host header patterns to match. Comparison is case insensitive.
                                              Wildcard characters supported: * and ?.
   - source_ips           list(string)     : A list of IP CIDR notations to match. You can use both IPv4 and IPv6
                                              addresses. Wildcards are not supported. Condition is not satisfied by the
                                              addresses in the `X-Forwarded-For` header, use `http_headers` condition instead.
   - query_strings        list(map(string)): Query string pairs or values to match. Comparison is case insensitive.
                                              Wildcard characters supported: * and ?. Only one pair needs to match for
                                              the condition to be satisfied.
   - http_request_methods list(string)     : A list of HTTP request methods or verbs to match. Only allowed characters are
                                              A-Z, hyphen (-) and underscore (_). Comparison is case sensitive. Wildcards
                                              are not supported. AWS recommends that GET and HEAD requests are routed in the
                                              same way because the response to a HEAD request may be cached.

```
</details>

<details>


```hcl

   Authenticate OIDC Blocks:
   authenticate_oidc:
   - authorization_endpoint              string     : (Required) The authorization endpoint of the IdP.
   - client_id                           string     : (Required) The OAuth 2.0 client identifier.
   - client_secret                       string     : (Required) The OAuth 2.0 client secret.
   - issuer                              string     : (Required) The OIDC issuer identifier of the IdP.
   - token_endpoint                      string     : (Required) The token endpoint of the IdP.
   - user_info_endpoint                  string     : (Required) The user info endpoint of the IdP.
   - authentication_request_extra_params map(string): (Optional) The query parameters to include in the redirect request to the authorization endpoint. Max: 10.
   - on_unauthenticated_request          string     : (Optional) The behavior if the user is not authenticated. Valid values: deny, allow and authenticate
   - scope                               string     : (Optional) The set of user claims to be requested from the IdP.
   - session_cookie_name                 string     : (Optional) The name of the cookie used to maintain session information.
   - session_timeout                     int        : (Optional) The maximum duration of the authentication session, in seconds.

```
</details>

<details>


```hcl

   Authenticate Cognito Blocks:
   authenticate_cognito:
   - user_pool_arn                       string      : (Required) The ARN of the Cognito user pool
   - user_pool_client_id                 string      : (Required) The ID of the Cognito user pool client.
   - user_pool_domain                    string      : (Required) The domain prefix or fully-qualified domain name of the Cognito user pool.
   - authentication_request_extra_params map(string) : (Optional) The query parameters to include in the redirect request to the authorization endpoint. Max: 10.
   - on_unauthenticated_request          string      : (Optional) The behavior if the user is not authenticated. Valid values: deny, allow and authenticate
   - scope                               string      : (Optional) The set of user claims to be requested from the IdP.
   - session_cookie_name                 string      : (Optional) The name of the cookie used to maintain session information.
   - session_timeout                     int         : (Optional) The maximum duration of the authentication session, in seconds.

```
</details>

</HclGeneralListItem>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="lb_listener_rule_fixed_response_arns">
<HclListItemDescription>

The ARNs of the rules of type fixed-response. The key is the same key of the rule from the `fixed_response_rules` variable.

</HclListItemDescription>
</HclListItem>

<HclListItem name="lb_listener_rule_forward_arns">
<HclListItemDescription>

The ARNs of the rules of type forward. The key is the same key of the rule from the `forward_rules` variable.

</HclListItemDescription>
</HclListItem>

<HclListItem name="lb_listener_rule_forward_with_ignore_target_groups_arns">
<HclListItemDescription>

The ARNs of the rules of type forward. The key is the same key of the rule from the `forward_rules` variable.

</HclListItemDescription>
</HclListItem>

<HclListItem name="lb_listener_rule_redirect_arns">
<HclListItemDescription>

The ARNs of the rules of type redirect. The key is the same key of the rule from the `redirect_rules` variable.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-load-balancer/tree/v1.1.1/modules/lb-listener-rules/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-load-balancer/tree/v1.1.1/modules/lb-listener-rules/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-load-balancer/tree/v1.1.1/modules/lb-listener-rules/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "7ea001746fa2f51dd75e3af382c81464"
}
##DOCS-SOURCER-END -->
