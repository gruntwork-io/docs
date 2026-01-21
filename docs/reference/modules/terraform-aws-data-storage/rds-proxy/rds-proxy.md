---
title: "RDS Proxy Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Data Storage Modules" version="0.45.0" lastModifiedVersion="0.45.0"/>

# RDS Proxy Module

<a href="https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.45.0/modules/rds-proxy" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.45.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

Amazon RDS Proxy is a fully managed database proxy service that makes it easy to manage database
connections for Amazon Relational Database Service (RDS) and Amazon Aurora. It allows you to
efficiently pool and share database connections among multiple application processes, reducing
the connection overhead on your database instances and providing improved scalability, availability,
and security for your database workloads.

RDS Proxy works by creating a secure database proxy endpoint that applications can connect to instead of
connecting directly to the database instance. When an application connects to the proxy endpoint, the proxy
establishes and manages the database connections on behalf of the application, pooling connections and
multiplexing requests to reduce overhead and improve performance. It also provides features like connection
pooling, read/write splitting, and automatic failover to improve database availability and resilience.

## Features

This module provides the following features:

*   Creates an RDS Proxy with configurable connection pooling settings
*   Sets up IAM roles and policies for accessing Secrets Manager and KMS
*   Configures security groups with customizable ingress rules
*   Supports both RDS instances and Aurora clusters
*   Configurable authentication methods including IAM authentication
*   TLS encryption enforcement option
*   Configurable idle client timeout
*   Customizable connection pool settings

## Prerequisites

Before using this module, you need to:

1.  Have an existing RDS instance or Aurora cluster
2.  Store database credentials in AWS Secrets Manager
3.  Have appropriate VPC and subnet configuration
4.  Have necessary IAM permissions to create RDS proxies and related resources

## How to use the RDS Proxy Module

In order to setup a RDS proxy, you need to setup database credentials in AWS Secrets Manager and pass it to this module.
Refer to the [examples/rds-proxy](https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.45.0/examples/rds-proxy) or [https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/rds-proxy-setup.html#rds-proxy-secrets-arns](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/rds-proxy-setup.html#rds-proxy-secrets-arns) for more information.

If you use a customer managed KMS key to encrypt the secret, you will need to provide the KMS key ARN to this module
using the `db_secret_kms_key_arn` parameter.

Setting up a RDS proxy requires the following steps, which is handled by this module:

*   Setting up network prerequisites (VPC, subnets, security groups)
*   Setting up database credentials in Secrets Manager
*   Setting up AWS Identity and Access Management (IAM) policies
*   Configuring connection pooling and authentication settings

## Configuring access to RDS Proxy

The module provides two ways to configure access to the RDS Proxy:

1.  Using `allow_connections_from_cidr_blocks` variable to specify CIDR blocks that can connect to the proxy
2.  Manually configuring the security group by using the `security_group_id` output and adding your own ingress rules

The security group created by this module:

*   Allows all outbound traffic
*   Can be configured with custom ingress rules for the specified port (default: 3306)
*   Is associated with the VPC specified in `vpc_id`

## Testing the connection to RDS Proxy

You connect to an RDS DB instance through a proxy in generally the same way as you connect directly to the database. The main difference is that you specify the proxy endpoint instead of the DB endpoint. When using this module, the proxy endpoint will be available from the `rds_proxy_endpoint` output variable.

Important notes:

*   RDS Proxy cannot be publicly accessible
*   You must connect from within the same VPC
*   You can use an EC2 instance in the same VPC to test the connection
*   The connection will use the port specified in the `port` variable (default: 3306)

## Required IAM Permissions

The module creates and manages the following IAM resources:

*   An IAM role for the RDS Proxy to access Secrets Manager
*   IAM policies for accessing secrets and KMS keys
*   Additional user-specific IAM policies if authentication is configured

The IAM role has permissions to:

*   Get secret values from Secrets Manager
*   Decrypt secrets using KMS (if KMS key ARN is provided)
*   Assume the RDS service role

## Connection Pool Configuration

The module allows you to configure connection pooling through the `connection_pool_config` variable, which supports:

*   Connection borrow timeout
*   Initial query execution
*   Maximum connections percentage
*   Maximum idle connections percentage
*   Session pinning filters

## Authentication Configuration

The module supports multiple authentication methods through the `auth` variable:

*   SECRETS-based authentication (default)
*   IAM authentication (optional)
*   Custom client password authentication types

Each authentication method can be configured with:

*   Authentication scheme
*   Secret ARN
*   Description
*   IAM authentication setting
*   Client password authentication type

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S RDS-PROXY MODULE
# ------------------------------------------------------------------------------------------------------

module "rds_proxy" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-data-storage.git//modules/rds-proxy?ref=v0.45.0"

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
  # MYSQL or POSTGRESQL. This value determines which database network protocol
  # the proxy recognizes when it interprets network traffic to and from the
  # database.
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

  # Configuration block for authentication and authorization mechanisms to
  # connect to the associated instances or clusters.
  auth = {}

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
  source = "git::git@github.com:gruntwork-io/terraform-aws-data-storage.git//modules/rds-proxy?ref=v0.45.0"
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
  # MYSQL or POSTGRESQL. This value determines which database network protocol
  # the proxy recognizes when it interprets network traffic to and from the
  # database.
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

  # Configuration block for authentication and authorization mechanisms to
  # connect to the associated instances or clusters.
  auth = {}

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

The kind of database engine that the proxy will connect to. Valid values are MYSQL or POSTGRESQL. This value determines which database network protocol the proxy recognizes when it interprets network traffic to and from the database.

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
    client_password_auth_type = optional(string)             # The type of authentication the proxy uses for connections from clients. Valid values: MYSQL_NATIVE_PASSWORD, POSTGRES_SCRAM_SHA_256, POSTGRES_MD5
  }))
```

</HclListItemTypeDetails>
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
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.45.0/modules/rds-proxy/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.45.0/modules/rds-proxy/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.45.0/modules/rds-proxy/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "07703dba97d330f4a0abfca39fb1b879"
}
##DOCS-SOURCER-END -->
