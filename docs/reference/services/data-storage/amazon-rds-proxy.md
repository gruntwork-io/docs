---
type: "service"
name: "Amazon RDS Proxy"
description: "Deploy and manage an Amazon RDS Proxy in front of an RDS instance or Aurora cluster."
category: "database"
cloud: "aws"
tags: ["data","database","sql","rds","rds-proxy","aurora","postgresql","mysql"]
license: "gruntwork"
built-with: "terraform"
title: "Amazon RDS Proxy"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="2.11.0" />

# Amazon RDS Proxy

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v2.11.0/modules/data-stores/rds-proxy" className="link-button" title="View the source code for this service in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=data-stores%2Frds-proxy" className="link-button" title="Release notes for only versions which impacted this service.">Release Notes</a>

## Overview

This service contains code to deploy an [Amazon RDS Proxy](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html)
in front of an Amazon RDS instance or Aurora cluster. RDS Proxy is a fully managed, highly available database proxy that
pools and shares database connections to improve application scalability and resiliency to database failures. For the
underlying database, use the [RDS](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v2.11.0/modules/data-stores/rds/) or [Aurora](/reference/services/data-storage/amazon-aurora) service.

## Features

*   Deploy a fully-managed database proxy in front of an RDS instance or Aurora cluster
*   Connection pooling to improve scalability under high connection churn
*   Faster failover that preserves application connections
*   Secrets Manager integration for database credentials
*   Optional IAM authentication and enforced TLS

## Learn

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

*   [What is RDS Proxy?](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html)
*   [RDS Proxy documentation](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html): Amazon’s docs for RDS
    Proxy that cover core concepts such as connection pooling, security, and failover.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v2.11.0/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v2.11.0/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture/), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.


## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S RDS-PROXY MODULE
# ------------------------------------------------------------------------------------------------------

module "rds_proxy" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/data-stores/rds-proxy?ref=v2.11.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Configuration block for the connection pool for the RDS proxy.
  connection_pool_config = <object(
  )>

  # The ARN of the Secrets Manager secret containing the database credentials.
  # The secret should contain username and password as key-value pairs in the
  # format {"username":"your_username","password":"your_password"}.
  db_secret_arn = <string>

  # The kind of database engine that the proxy will connect to. Valid values are
  # MYSQL, POSTGRESQL, or SQLSERVER. This value determines which database
  # network protocol the proxy recognizes when it interprets network traffic to
  # and from the database.
  engine_family = <string>

  # The identifier for the proxy. This name must be unique for all proxies owned
  # by your AWS account in the specified AWS Region. An identifier must begin
  # with a letter and must contain only ASCII letters, digits, and hyphens; it
  # can't end with a hyphen or contain two consecutive hyphens.
  name = <string>

  # A list of VPC subnet IDs to associate with the RDS proxy. These must be
  # private subnets in different Availability Zones.
  subnet_ids = <list(string)>

  # The ID of the VPC in which to create the RDS proxy.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of CIDR blocks that are allowed to connect to the proxy. These should
  # typically be the CIDR blocks of the private application subnets in the VPC
  # plus any other networks that need access.
  allow_connections_from_cidr_blocks = []

  # A list of IPv6 CIDR blocks that are allowed to connect to the proxy. These
  # should typically be the IPv6 CIDR blocks of the private application subnets
  # in the VPC plus any other networks that need access.
  allow_connections_from_ipv6_cidr_blocks = []

  # A list of Security Groups that are allowed to connect to the proxy.
  allow_connections_from_security_groups = []

  # A list of CIDR blocks that the RDS Proxy is allowed to connect to. This is
  # used to allow the proxy to connect to the RDS instances.
  allow_outbound_connections_to_cidr_blocks = ["0.0.0.0/0"]

  # A list of IPv6 CIDR blocks that the RDS Proxy is allowed to connect to. This
  # is used to allow the proxy to connect to the RDS instances in dual-stack
  # networks.
  allow_outbound_connections_to_ipv6_cidr_blocks = []

  # Configuration block for authentication and authorization mechanisms to
  # connect to the associated instances or clusters.
  auth = {}

  # A map of custom tags to apply to the RDS Proxy and its associated resources.
  # The key is the tag name and the value is the tag value.
  custom_tags = {}

  # The identifier of the Aurora DB cluster to be associated with the proxy.
  # Required if connecting to an Aurora cluster. Either db_instance_identifier
  # or db_cluster_identifier must be set, but not both.
  db_cluster_identifier = null

  # The identifier of the RDS DB instance to be associated with the proxy.
  # Required if connecting to a RDS instance. Either db_instance_identifier or
  # db_cluster_identifier must be set, but not both.
  db_instance_identifier = null

  # The ARN of the KMS key used to encrypt the database secret in AWS Secrets
  # Manager.
  db_secret_kms_key_arn = null

  # Whether the proxy includes detailed information about SQL statements in its
  # logs. This information helps you to debug issues involving SQL behavior or
  # the performance and scalability of the proxy connections. The debug
  # information includes the text of SQL statements that you submit through the
  # proxy. Thus, only enable this setting when needed for debugging, and only
  # when you have security measures in place to safeguard any sensitive
  # information that appears in the logs.
  debug_logging = false

  # The number of seconds that a connection to the proxy can be inactive before
  # the proxy disconnects it. Minimum: 1, Maximum: 7200.
  idle_client_timeout = null

  # The port that the proxy will listen on. If not specified, the default port
  # for the engine family will be used (3306 for MySQL, 5432 for PostgreSQL).
  port = 3306

  # A boolean parameter that specifies whether Transport Layer Security (TLS)
  # encryption is required for connections to the proxy. By enabling this
  # setting, you can enforce encrypted TLS connections to the proxy.
  require_tls = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S RDS-PROXY MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/data-stores/rds-proxy?ref=v2.11.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Configuration block for the connection pool for the RDS proxy.
  connection_pool_config = <object(
  )>

  # The ARN of the Secrets Manager secret containing the database credentials.
  # The secret should contain username and password as key-value pairs in the
  # format {"username":"your_username","password":"your_password"}.
  db_secret_arn = <string>

  # The kind of database engine that the proxy will connect to. Valid values are
  # MYSQL, POSTGRESQL, or SQLSERVER. This value determines which database
  # network protocol the proxy recognizes when it interprets network traffic to
  # and from the database.
  engine_family = <string>

  # The identifier for the proxy. This name must be unique for all proxies owned
  # by your AWS account in the specified AWS Region. An identifier must begin
  # with a letter and must contain only ASCII letters, digits, and hyphens; it
  # can't end with a hyphen or contain two consecutive hyphens.
  name = <string>

  # A list of VPC subnet IDs to associate with the RDS proxy. These must be
  # private subnets in different Availability Zones.
  subnet_ids = <list(string)>

  # The ID of the VPC in which to create the RDS proxy.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of CIDR blocks that are allowed to connect to the proxy. These should
  # typically be the CIDR blocks of the private application subnets in the VPC
  # plus any other networks that need access.
  allow_connections_from_cidr_blocks = []

  # A list of IPv6 CIDR blocks that are allowed to connect to the proxy. These
  # should typically be the IPv6 CIDR blocks of the private application subnets
  # in the VPC plus any other networks that need access.
  allow_connections_from_ipv6_cidr_blocks = []

  # A list of Security Groups that are allowed to connect to the proxy.
  allow_connections_from_security_groups = []

  # A list of CIDR blocks that the RDS Proxy is allowed to connect to. This is
  # used to allow the proxy to connect to the RDS instances.
  allow_outbound_connections_to_cidr_blocks = ["0.0.0.0/0"]

  # A list of IPv6 CIDR blocks that the RDS Proxy is allowed to connect to. This
  # is used to allow the proxy to connect to the RDS instances in dual-stack
  # networks.
  allow_outbound_connections_to_ipv6_cidr_blocks = []

  # Configuration block for authentication and authorization mechanisms to
  # connect to the associated instances or clusters.
  auth = {}

  # A map of custom tags to apply to the RDS Proxy and its associated resources.
  # The key is the tag name and the value is the tag value.
  custom_tags = {}

  # The identifier of the Aurora DB cluster to be associated with the proxy.
  # Required if connecting to an Aurora cluster. Either db_instance_identifier
  # or db_cluster_identifier must be set, but not both.
  db_cluster_identifier = null

  # The identifier of the RDS DB instance to be associated with the proxy.
  # Required if connecting to a RDS instance. Either db_instance_identifier or
  # db_cluster_identifier must be set, but not both.
  db_instance_identifier = null

  # The ARN of the KMS key used to encrypt the database secret in AWS Secrets
  # Manager.
  db_secret_kms_key_arn = null

  # Whether the proxy includes detailed information about SQL statements in its
  # logs. This information helps you to debug issues involving SQL behavior or
  # the performance and scalability of the proxy connections. The debug
  # information includes the text of SQL statements that you submit through the
  # proxy. Thus, only enable this setting when needed for debugging, and only
  # when you have security measures in place to safeguard any sensitive
  # information that appears in the logs.
  debug_logging = false

  # The number of seconds that a connection to the proxy can be inactive before
  # the proxy disconnects it. Minimum: 1, Maximum: 7200.
  idle_client_timeout = null

  # The port that the proxy will listen on. If not specified, the default port
  # for the engine family will be used (3306 for MySQL, 5432 for PostgreSQL).
  port = 3306

  # A boolean parameter that specifies whether Transport Layer Security (TLS)
  # encryption is required for connections to the proxy. By enabling this
  # setting, you can enforce encrypted TLS connections to the proxy.
  require_tls = null

}


```

</TabItem>
</Tabs>



## Reference


<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="connection_pool_config" requirement="required" type="object(…)">
<HclListItemDescription>

Configuration block for the connection pool for the RDS proxy.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    connection_borrow_timeout    = number       # The number of seconds for a proxy to wait for a connection to become available in the connection pool
    init_query                   = string       # One or more SQL statements for the proxy to run when opening each new database connection
    max_connections_percent      = number       # The maximum size of the connection pool for each target in a target group (1-100)
    max_idle_connections_percent = number       # Controls how actively the proxy closes idle database connections in the connection pool (0-100)
    session_pinning_filters      = list(string) # Each item in the list represents a class of SQL operations that normally cause all later statements in a session using a proxy to be pinned to the same underlying database connection
  })
```

</HclListItemTypeDetails>
</HclListItem>

<HclListItem name="db_secret_arn" requirement="required" type="string">
<HclListItemDescription>

The ARN of the Secrets Manager secret containing the database credentials. The secret should contain username and password as key-value pairs in the format &#123;'username':'your_username','password':'your_password'&#125;.

</HclListItemDescription>
</HclListItem>

<HclListItem name="engine_family" requirement="required" type="string">
<HclListItemDescription>

The kind of database engine that the proxy will connect to. Valid values are MYSQL, POSTGRESQL, or SQLSERVER. This value determines which database network protocol the proxy recognizes when it interprets network traffic to and from the database.

</HclListItemDescription>
</HclListItem>

<HclListItem name="name" requirement="required" type="string">
<HclListItemDescription>

The identifier for the proxy. This name must be unique for all proxies owned by your AWS account in the specified AWS Region. An identifier must begin with a letter and must contain only ASCII letters, digits, and hyphens; it can't end with a hyphen or contain two consecutive hyphens.

</HclListItemDescription>
</HclListItem>

<HclListItem name="subnet_ids" requirement="required" type="list(string)">
<HclListItemDescription>

A list of VPC subnet IDs to associate with the RDS proxy. These must be private subnets in different Availability Zones.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the VPC in which to create the RDS proxy.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="allow_connections_from_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of CIDR blocks that are allowed to connect to the proxy. These should typically be the CIDR blocks of the private application subnets in the VPC plus any other networks that need access.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_connections_from_ipv6_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IPv6 CIDR blocks that are allowed to connect to the proxy. These should typically be the IPv6 CIDR blocks of the private application subnets in the VPC plus any other networks that need access.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_connections_from_security_groups" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of Security Groups that are allowed to connect to the proxy.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_outbound_connections_to_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of CIDR blocks that the RDS Proxy is allowed to connect to. This is used to allow the proxy to connect to the RDS instances.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[
  &quot;0.0.0.0/0&quot;
]"/>
</HclListItem>

<HclListItem name="allow_outbound_connections_to_ipv6_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IPv6 CIDR blocks that the RDS Proxy is allowed to connect to. This is used to allow the proxy to connect to the RDS instances in dual-stack networks.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="auth" requirement="optional" type="map(object(…))">
<HclListItemDescription>

Configuration block for authentication and authorization mechanisms to connect to the associated instances or clusters.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    auth_scheme               = optional(string, "SECRETS")  # The type of authentication that the proxy uses for connections from the proxy to the underlying database. Valid values: SECRETS
    secret_arn                = string                       # The ARN of the Secrets Manager secret containing the database credentials
    description               = optional(string)             # A user-specified description about the authentication used by a proxy to connect to the underlying database
    iam_auth                  = optional(string, "DISABLED") # Whether to require or disallow AWS Identity and Access Management (IAM) authentication for connections to the proxy. Valid values: REQUIRED, DISABLED
    client_password_auth_type = optional(string)             # The type of authentication the proxy uses for connections from clients. Valid values: MYSQL_NATIVE_PASSWORD, MYSQL_CACHING_SHA2_PASSWORD, POSTGRES_SCRAM_SHA_256, POSTGRES_MD5, SQL_SERVER_AUTHENTICATION
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the RDS Proxy and its associated resources. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="db_cluster_identifier" requirement="optional" type="string">
<HclListItemDescription>

The identifier of the Aurora DB cluster to be associated with the proxy. Required if connecting to an Aurora cluster. Either db_instance_identifier or db_cluster_identifier must be set, but not both.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="db_instance_identifier" requirement="optional" type="string">
<HclListItemDescription>

The identifier of the RDS DB instance to be associated with the proxy. Required if connecting to a RDS instance. Either db_instance_identifier or db_cluster_identifier must be set, but not both.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="db_secret_kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the KMS key used to encrypt the database secret in AWS Secrets Manager.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="debug_logging" requirement="optional" type="bool">
<HclListItemDescription>

Whether the proxy includes detailed information about SQL statements in its logs. This information helps you to debug issues involving SQL behavior or the performance and scalability of the proxy connections. The debug information includes the text of SQL statements that you submit through the proxy. Thus, only enable this setting when needed for debugging, and only when you have security measures in place to safeguard any sensitive information that appears in the logs.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="idle_client_timeout" requirement="optional" type="number">
<HclListItemDescription>

The number of seconds that a connection to the proxy can be inactive before the proxy disconnects it. Minimum: 1, Maximum: 7200.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="port" requirement="optional" type="number">
<HclListItemDescription>

The port that the proxy will listen on. If not specified, the default port for the engine family will be used (3306 for MySQL, 5432 for PostgreSQL).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="3306"/>
</HclListItem>

<HclListItem name="require_tls" requirement="optional" type="bool">
<HclListItemDescription>

A boolean parameter that specifies whether Transport Layer Security (TLS) encryption is required for connections to the proxy. By enabling this setting, you can enforce encrypted TLS connections to the proxy.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="rds_proxy_arn">
<HclListItemDescription>

The Amazon Resource Name (ARN) for the RDS proxy. This ARN uniquely identifies the proxy across all AWS accounts and regions.

</HclListItemDescription>
</HclListItem>

<HclListItem name="rds_proxy_endpoint">
<HclListItemDescription>

The endpoint that you can use to connect to the RDS proxy. This endpoint includes the hostname and port number that clients should use to connect to the proxy.

</HclListItemDescription>
</HclListItem>

<HclListItem name="rds_proxy_name">
<HclListItemDescription>

The name of the RDS proxy. This can be used to query the proxy's target health status.

</HclListItemDescription>
</HclListItem>

<HclListItem name="security_group_id">
<HclListItemDescription>

The ID of the security group associated with the RDS proxy. This security group controls inbound and outbound traffic to the proxy.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v2.11.0/modules/data-stores/rds-proxy/README.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v2.11.0/modules/data-stores/rds-proxy/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v2.11.0/modules/data-stores/rds-proxy/outputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "76ccee98649a87173c63895459422745"
}
##DOCS-SOURCER-END -->
