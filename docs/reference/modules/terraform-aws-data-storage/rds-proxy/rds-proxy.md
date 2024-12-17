---
title: "RDS Proxy Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Data Storage Modules" version="0.40.0" lastModifiedVersion="0.38.1"/>

# RDS Proxy Module

<a href="https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.40.0/modules/rds-proxy" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.38.1" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

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

## How to use the RDS Proxy Module

In order to setup a RDS proxy, you need to setup database credentials in AWS Secrets Manager and pass it to this module.
Refer to the [examples/rds-proxy](https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.40.0/examples/rds-proxy) or [https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/rds-proxy-setup.html#rds-proxy-secrets-arns](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/rds-proxy-setup.html#rds-proxy-secrets-arns) for more information.

If you use a customer managed KMS key to encrypt the secret, you will need to provide the KMS key ARN to this module
using the `db_secret_kms_key_arn` parameter.

Setting up a RDS proxy requires the following steps, which is handled by this module:

*   Setting up network prerequisites
*   Setting up database credentials
*   Setting up AWS Identity and Access Management (IAM) policies

## Configuring access to RDS Proxy

If you don't provide the `allow_connections_from_cidr_blocks` variable, you will need to provision your own access. To
do that create an ingress rule on the security group that this module creates. The security group ID will be available
from the [`security_group_id`](https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.40.0/modules/rds-proxy/outputs.tf#L9) output variable.

## Testing the connection to RDS Proxy

You connect to an RDS DB instance through a proxy in generally the same way as you connect directly to the database. The main difference is that you specify the proxy endpoint instead of the DB endpoint. When using this module, the proxy endpoint will be avaialable from the [`rds_proxy_endpoint`](https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.40.0/modules/rds-proxy/outputs.tf#L5) output variable. Note that RDS Proxy [can't be publicly accessible](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html#rds-proxy.limitations), so you might need to use provision EC2 instance inside the same VPC to test the connection.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S RDS-PROXY MODULE
# ------------------------------------------------------------------------------------------------------

module "rds_proxy" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-data-storage.git//modules/rds-proxy?ref=v0.40.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The number of seconds that a connection to the proxy can be inactive before
  # the proxy disconnects it. You can set this value higher or lower than the
  # connection timeout limit for the associated database.
  connection_pool_config = <object(
    connection_borrow_timeout    = number
    init_query                   = string
    max_connections_percent      = number
    max_idle_connections_percent = number
    session_pinning_filters      = list(string)
  )>

  # The DB secret should contain username and password for the DB as a key-value
  # pairs. Otherwise, you can insert plaintext secret with the format should
  # look like {"username":"your_username","password":"your_password"}.
  db_secret_arn = <string>

  # The kinds of databases that the proxy can connect to. This value determines
  # which database network protocol the proxy recognizes when it interprets
  # network traffic to and from the database. The engine family applies to MySQL
  # and PostgreSQL for both RDS and Aurora. Valid values are MYSQL and
  # POSTGRESQL.
  engine_family = <string>

  # The identifier for the proxy.
  name = <string>

  # A list of subnet ids where the database instances should be deployed. In the
  # standard Gruntwork VPC setup, these should be the private persistence subnet
  # ids. This is ignored if create_subnet_group=false.
  subnet_ids = <list(string)>

  # The id of the VPC in which this DB should be deployed.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of CIDR-formatted IP address ranges that can connect to this DB.
  # Should typically be the CIDR blocks of the private app subnet in this VPC
  # plus the private subnet in the mgmt VPC.
  allow_connections_from_cidr_blocks = []

  # Configuration block(s) with authorization mechanisms to connect to the
  # associated instances or clusters
  auth = {}

  # The DB cluster identifier. Note that one of `db_instance_identifier` or
  # `db_cluster_identifier` is required.
  db_cluster_identifier = null

  # The DB instance identifier. Note that one of `db_instance_identifier` or
  # `db_cluster_identifier` is required.
  db_instance_identifier = null

  # The KMS key used to encrypt the DB secret.
  db_secret_kms_key_arn = null

  # The number of seconds that a connection to the proxy can be inactive before
  # the proxy disconnects it. You can set this value higher or lower than the
  # connection timeout limit for the associated database.
  idle_client_timeout = null

  # The port the RDS proxy will listen on (e.g. 3306)
  port = 3306

  # The number of seconds that a connection to the proxy can be inactive before
  # the proxy disconnects it. You can set this value higher or lower than the
  # connection timeout limit for the associated database.
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
  source = "git::git@github.com:gruntwork-io/terraform-aws-data-storage.git//modules/rds-proxy?ref=v0.40.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The number of seconds that a connection to the proxy can be inactive before
  # the proxy disconnects it. You can set this value higher or lower than the
  # connection timeout limit for the associated database.
  connection_pool_config = <object(
    connection_borrow_timeout    = number
    init_query                   = string
    max_connections_percent      = number
    max_idle_connections_percent = number
    session_pinning_filters      = list(string)
  )>

  # The DB secret should contain username and password for the DB as a key-value
  # pairs. Otherwise, you can insert plaintext secret with the format should
  # look like {"username":"your_username","password":"your_password"}.
  db_secret_arn = <string>

  # The kinds of databases that the proxy can connect to. This value determines
  # which database network protocol the proxy recognizes when it interprets
  # network traffic to and from the database. The engine family applies to MySQL
  # and PostgreSQL for both RDS and Aurora. Valid values are MYSQL and
  # POSTGRESQL.
  engine_family = <string>

  # The identifier for the proxy.
  name = <string>

  # A list of subnet ids where the database instances should be deployed. In the
  # standard Gruntwork VPC setup, these should be the private persistence subnet
  # ids. This is ignored if create_subnet_group=false.
  subnet_ids = <list(string)>

  # The id of the VPC in which this DB should be deployed.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of CIDR-formatted IP address ranges that can connect to this DB.
  # Should typically be the CIDR blocks of the private app subnet in this VPC
  # plus the private subnet in the mgmt VPC.
  allow_connections_from_cidr_blocks = []

  # Configuration block(s) with authorization mechanisms to connect to the
  # associated instances or clusters
  auth = {}

  # The DB cluster identifier. Note that one of `db_instance_identifier` or
  # `db_cluster_identifier` is required.
  db_cluster_identifier = null

  # The DB instance identifier. Note that one of `db_instance_identifier` or
  # `db_cluster_identifier` is required.
  db_instance_identifier = null

  # The KMS key used to encrypt the DB secret.
  db_secret_kms_key_arn = null

  # The number of seconds that a connection to the proxy can be inactive before
  # the proxy disconnects it. You can set this value higher or lower than the
  # connection timeout limit for the associated database.
  idle_client_timeout = null

  # The port the RDS proxy will listen on (e.g. 3306)
  port = 3306

  # The number of seconds that a connection to the proxy can be inactive before
  # the proxy disconnects it. You can set this value higher or lower than the
  # connection timeout limit for the associated database.
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

The number of seconds that a connection to the proxy can be inactive before the proxy disconnects it. You can set this value higher or lower than the connection timeout limit for the associated database.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    connection_borrow_timeout    = number
    init_query                   = string
    max_connections_percent      = number
    max_idle_connections_percent = number
    session_pinning_filters      = list(string)
  })
```

</HclListItemTypeDetails>
</HclListItem>

<HclListItem name="db_secret_arn" requirement="required" type="string">
<HclListItemDescription>

The DB secret should contain username and password for the DB as a key-value pairs. Otherwise, you can insert plaintext secret with the format should look like &#123;'username':'your_username','password':'your_password'&#125;.

</HclListItemDescription>
</HclListItem>

<HclListItem name="engine_family" requirement="required" type="string">
<HclListItemDescription>

The kinds of databases that the proxy can connect to. This value determines which database network protocol the proxy recognizes when it interprets network traffic to and from the database. The engine family applies to MySQL and PostgreSQL for both RDS and Aurora. Valid values are MYSQL and POSTGRESQL.

</HclListItemDescription>
</HclListItem>

<HclListItem name="name" requirement="required" type="string">
<HclListItemDescription>

The identifier for the proxy.

</HclListItemDescription>
</HclListItem>

<HclListItem name="subnet_ids" requirement="required" type="list(string)">
<HclListItemDescription>

A list of subnet ids where the database instances should be deployed. In the standard Gruntwork VPC setup, these should be the private persistence subnet ids. This is ignored if create_subnet_group=false.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

The id of the VPC in which this DB should be deployed.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="allow_connections_from_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of CIDR-formatted IP address ranges that can connect to this DB. Should typically be the CIDR blocks of the private app subnet in this VPC plus the private subnet in the mgmt VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="auth" requirement="optional" type="map(object(…))">
<HclListItemDescription>

Configuration block(s) with authorization mechanisms to connect to the associated instances or clusters

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    auth_scheme               = optional(string, "SECRETS")
    secret_arn                = string
    description               = optional(string)
    iam_auth                  = optional(string, "DISABLED") # REQUIRED or DISABLED
    client_password_auth_type = optional(string)
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="db_cluster_identifier" requirement="optional" type="string">
<HclListItemDescription>

The DB cluster identifier. Note that one of `db_instance_identifier` or `db_cluster_identifier` is required.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="db_instance_identifier" requirement="optional" type="string">
<HclListItemDescription>

The DB instance identifier. Note that one of `db_instance_identifier` or `db_cluster_identifier` is required.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="db_secret_kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

The KMS key used to encrypt the DB secret.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="idle_client_timeout" requirement="optional" type="number">
<HclListItemDescription>

The number of seconds that a connection to the proxy can be inactive before the proxy disconnects it. You can set this value higher or lower than the connection timeout limit for the associated database.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="port" requirement="optional" type="number">
<HclListItemDescription>

The port the RDS proxy will listen on (e.g. 3306)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="3306"/>
</HclListItem>

<HclListItem name="require_tls" requirement="optional" type="bool">
<HclListItemDescription>

The number of seconds that a connection to the proxy can be inactive before the proxy disconnects it. You can set this value higher or lower than the connection timeout limit for the associated database.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="rds_proxy_arn">
</HclListItem>

<HclListItem name="rds_proxy_endpoint">
</HclListItem>

<HclListItem name="security_group_id">
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.40.0/modules/rds-proxy/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.40.0/modules/rds-proxy/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.40.0/modules/rds-proxy/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "209292ff3cef0af6da930ce41cf863c1"
}
##DOCS-SOURCER-END -->
