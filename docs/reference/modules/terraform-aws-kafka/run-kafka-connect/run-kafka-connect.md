---
title: "Run a Kafka Connect Worker"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Kafka" version="0.11.0" />

# Run a Kafka Connect Worker

<a href="https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/run-kafka-connect" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-kafka/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

This folder contains:

1.  [run-kafka-connect](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/run-kafka-connect/bin/run-kafka-connect): A Bash script for configuring and running a Kafka Connect worker.
2.  [install.sh](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/run-kafka-connect/install.sh): A Bash script that installs the `run-kafka-connect` script.

Typically, you would run the `install.sh` script in a [Packer](https://www.packer.io/) template so that you create an Amazon
Machine Image (AMI) that comes pre-installed with `run-kafka-connect`. Then, by calling `run-kafka-connect` in [User Data](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html), your server will configure and start a Kafka Connect
worker on boot.

## `run-kafka-connect`

This script assumes that the following are already installed:

1.  Kafka Connect: These files are installed automatically when you run the [install-kafka](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/install-kafka) module.
    Specifically, that module installs the JAR files and bash scripts needed to run a Kafka Connect worker.

2.  Supervisord: see the [install-supervisord
    module](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/master/modules/install-supervisord) in
    [terraform-aws-zookeeper](https://github.com/gruntwork-io/terraform-aws-zookeeper).

3.  [AWS CLI](https://aws.amazon.com/cli/).

4.  [jq](https://stedolan.github.io/jq/).

The `run-kafka-connect` script will generate a Kafka Connect configuration file (see [Kafka Connect config docs](#kafka-connect-config) below for details) and then use Supervisord to start the Kafka Connect worker.

This script has been tested on the following operating systems:

*   Amazon Linux
*   Ubuntu

There is a good chance it will work on Debian, CentOS, and RHEL as well, but our automated testing for this
module does not cover these other distros at the moment.

## Quick Start

The easiest way to install the run-kafka-connect script is with the [Gruntwork Installer](https://github.com/gruntwork-io/gruntwork-installer):

```bash
gruntwork-install \
  --module-name "run-kafka-connect" \
  --repo "https://github.com/gruntwork-io/terraform-aws-kafka" \
  --tag "v0.2.0" \
  --module-param "config-dir-src=/tmp/config/kafka-connect/config" \
  --module-param "log4j-config-dir-src=/tmp/config/kafka-connect/log4j"
```

Note that this module *requires* that you specify a Kafka Connect worker config file and Log4j config file. The `run-kafka-connect`
module comes bundled with some config files you can manually copy & paste to a folder that can then be read by the above
`gruntwork-install` command.

We recommend installing this module, as well as [install-confluent-tools](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/install-confluent-tools) with the `--tool`
parameter set to `confluent-schema-registry`, as part of a [Packer](https://www.packer.io/) template to create an
[Amazon Machine Image (AMI)](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html) (see the [kafka-zookeeper-ami
example](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/examples/kafka-zookeeper-confluent-oss-ami) for a fully-working example).

## Install Command Line Arguments

You can install the `run-kafka-connect` script by running the [install.sh](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/run-kafka-connect/install.sh)
file in the `run-kafka-connect` module folder. The `install.sh` script requires the following arguments:

*   `--config-dir-src`: The directory containing the Kafka Connect config files to copy. See the [config folder](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/run-kafka-connect/config) for details.
*   `--log4j-config-dir-src`: The directory containing the Log4j config files to copy.

### Optional Arguments

*   `--config-dir-dst`: The path where the Schema Registry config file will be copied. Default: `/opt/kafka-connect/config/worker.properties.`
*   `--log4j-config-dir-dst`: The path where the Log4j config file will be copied. Default: `/opt/kafka-connect/config/log4j.properties`
*   `--startup-script-path`: The local path to the script used to start Kafka Connect. This script is typically installed
    when Kafka itself is installed. Default: `/opt/kafka/current/bin/connect-distributed.sh`
*   `--confluent-version`: The version of the Confluent Platform from which we should download a collection of JAR files,
    including the Avro Converter JAR. Make sure the Confluent version corresponds to the Kafka version installed. Default: `4.0.0`
*   `--confluent-scala-version`: The Scala version used to compile the Confluent version specified by `--confluent-version`.
    Default: `2.11`
*   `--confluent-sha256-checksum`: The SHA 256 hash of the Confluent platform tar.gz file downloaded based on the versions
    specified by `--confluent-version` `--confluent-scala-version`. Default: `security/confluent-4.0.0-2.11.tar.gz.checksum`
*   `--install-dir`: The directory where the `run-kafka-connect` files should be installed. Default: `/opt/kafka-connect`.
*   `--user`: The user who will be set as the owner of `--install-dir`. Default: `kafka_connect`.

### Optional SSL File Arguments

Run `install.sh` with the `--help` option or see the source code to see all additional arguments. If you wish to use SSL
with REST Proxy, see the [SSL Settings](#ssl-settings) section below for additional arguments that are accepted.

If you're using `gruntwork-install` to run this module, you can pass these arguments using `--module-param` arguments.
Example:

```bash
gruntwork-install \
  --module-name "run-kafka-connect" \
  --repo "https://github.com/gruntwork-io/terraform-aws-kafka" \
  --tag "v0.2.0" \
  --module-param "config-path-src=/tmp/config/kafka-connect/worker.properties" \
  --module-param "log4j-config-path-src=/tmp/config/kafka-connect/log4j.properties"
```

## run-kafka-connect Command Line Arguments

When you run the `run-kafka-connect` script, you must provide exactly one of each of the following pairs of arguments:

#### Connect to Kafka Brokers

*   `--kafka-brokers-tag`: The name and value of a tag, in the format `name=value`, that can be used to find Kafka Broker
    server ENI IPs.

*   `--kafka-brokers`: A comma-separated list of the IPs of Kafka brokers to connect to.

#### Connect to Schema Registry

*   `--schema-registry-tag`: The name and value of a tag, in the format `name=value`, that can be used to find Schema Registry
    ENI IPs.

*   `--schema-registry-url`: A comma-separated list of the IPs of Schema Registry nodes to connect to.

#### Other Required Arguments

The following arguments are all required:

*   `--group-id`: A unique identifier for a set of Kafka Connect workers that form a single Kafka Connect cluster.

*   `--config-storage-replication-factor` The replication factor for the 'config' internal Kafka topic used by Kafka Connect. Example: `3`

*   `--offset-storage-replication-factor` The replication factor for the 'offset' internal Kafka topic used by Kafka Connect. Example: `3`

*   `--status-storage-replication-factor` The replication factor for the 'status' internal Kafka topic used by Kafka Connect. Example: `3`

#### Optional Arguments

The script also accepts a number of optional parameters to customize the Kafka Connect worker's behavior. Run the script
with the `--help` flag to see all available options. See the [Kafka Connect config docs](#kafka-connect-config) below for
the highlights.

## Kafka Connect Config

The `run-kafka-connect` script dynamically replaces certain variables in a [Kafka Connect configuration file](https://docs.confluent.io/4.0.0/connect/allconfigs.html) as detailed in the [config folder](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/run-kafka-connect/config).

Here are the key items to pay attention to:

*   [Kafka IPs](#kafka-ips)
*   [Schema Registry IPs](#schema-registry-ips)
*   [Group ID](#group-id)
*   [SSL settings](#ssl-settings)
*   [Other settings](#other-settings)

### Kafka IPs

The whole point of a Kafka Connect worker is to connect to the Kafka cluster where it can either read data from the cluster
or write data to the cluster. You can provide the IPs of the Kafka brokers manually using the `--kafka-brokers` argument,
or you can allow the `run-kafka-connect` script to discover them automatically. To use the automatic version, you specify
the `--kafka-brokers-tag` argument with the name and value, in the format `name=value`, of a tag associated with the Elastic
Network Interfaces (ENIs) attached to the Kafka broker EC2 Instances.

The latter option is based on the assumption that the Kafka cluster is deployed using [terraform-aws-kafka](https://github.com/gruntwork-io/terraform-aws-kafka), which uses the [server-group module](https://github.com/gruntwork-io/terraform-aws-asg/tree/master/modules/server-group) under the hood, which assigns an ENI to each
Kafka broker EC2 Instance with special tags. For an example, see [kafka-zookeeper-confluent-oss-standalone-cluster](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/examples/kafka-zookeeper-confluent-oss-standalone-clusters/user-data/confluent-tools-cluster-user-data.sh).

### Schema Registry IPs

Kafka Connect can read and write [Apache Avro](https://docs.confluent.io/4.0.0/avro.html) data, which
includes support for schemas. These schemas often need to be read or written to the [Confluent Schema Registry](https://docs.confluent.io/4.0.0/schema-registry/docs/index.html). Therefore, Kafka Connect workers need to know the IPs
of the Schema Registry nodes.

You can provide the IPs of the Schema Registry nodes manually using the `--schema-registry-url` argument, or you can
allow the `run-kafka-connect` script to discover them automatically. To use the automatic version, you specify the
`--schema-registry-tag` argument with the name and value, in the format `name=value`, of a tag associated with the Elastic
Network Interfaces (ENIs) attached to Schema Registry EC2 Instances.

The latter option is based on the assumption that the Schema Registry cluster is deployed using either the
[kafka-cluster module](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/kafka-cluster) or [confluent-tools-cluster module](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/confluent-tools-cluster/README.md), both
of which which use the [server-group module](https://github.com/gruntwork-io/terraform-aws-asg/tree/master/modules/server-group) under the hood, which assigns an ENI to
each Schema Registry server with special tags.

### Group ID

Every group of Kafka Connect workers needs an ID that's shared among the group but unique across other groups of Kafka
Connect workers. This can be any string, so we typically use the cluster-name by default, under the assumption that
a single cluster will run a single group of Kafka Connect workers.

### SSL Settings

By default, Kafka Connect workers accept requests over unencrypted HTTP, connect to Kafka brokers over unencrypted HTTP,
and connect to Schema Registry over unencrypted HTTP. Here's how to enable SSL in each of these cases:

#### Enable SSL from Clients to the Kafka Connect Worker

Set the `--enable-ssl` argument to `true`. For SSL to work, you need the following:

*   A Key Store that contains an SSL certificate. You can use the [generate-key-stores](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/generate-key-stores)
    module to generate the Key Store (and a Trust Store).

*   You can install it on your server by copying the Key Store file into an AMI that you build with Packer and passing the
    path of the copied Key Store file to `gruntwork-install` as you install `run-kafka-connect`. For example:

    ```bash
    gruntwork-install \
      --module-name 'run-kafka-connect' \
      --tag v0.2.0 \
      --repo https://github.com/gruntwork-io/terraform-aws-kafka \
      ...
      --module-param "key-store-path-src=/tmp/ssl/kafka-rest/keystore.jks" \
    ```

    This will call `install.sh` in the `run-kafka-rest` module, install `run-kafka-rest`, and and copy the Key Store file
    to the path given by the default value of `--key-store-path-dst` for `install.sh`.

*   You must use the `--key-store-password` argument to provide the `run-kafka-rest` script with the password you used when
    creating the Key Store.

*   You may optionally install and configure a Trust Store file using a similar method as above, but replacing all instances
    of `key-store` with `trust-store` (e.g. `--trust-store-path`, `--trust-store-password`). This is necessary if you want
    REST Proxy to authenticate clients using mutual TLS authentication.

#### Enable SSL from a Kafka Connect worker to Kafka Brokers

Set the `--enable-kafka-ssl` argument to `true`. For SSL to work, you need the following:

*   The Trust Store that contains the the CA that signed the Kafka brokers' SSL certificate. You created this file when
    you (or a teammate) ran the [generate-key-stores](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/generate-key-stores) module to generate the Key Store and
    Trust Store file for the Kafka brokers.

*   You can install the Trust Store on your server by copying the Trust Store file into an AMI that you build with Packer
    and passing the path of the copied Trust Store file to `gruntwork-install` as you install `run-kafka-connect`. For example:

    ```bash
    gruntwork-install \
      --module-name 'run-kafka-connect' \
      --tag v0.2.0 \
      --repo https://github.com/gruntwork-io/terraform-aws-kafka \
      ...
      --module-param "kafka-trust-store-path-src=/tmp/ssl/kafka/truststore.jks" \
    ```

    This will call `install.sh` in the `run-kafka-connect` module, install `run-kafka-connect`, and and copy the Trust Store
    file to the path given by the default value of `--kafka-trust-store-path-dst` for `install.sh`.

*   In EC2 [User Data](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html), run the `run-kafka-connect`
    script to configure the Kafka Connect worker. You can optionally specify a value for `--kafka-trust-store-path` that
    points to the path of your copied Trust Store file, but usually the default value matches the default install location used
    by `install.sh` so this isn't necessary. However, you must specify the password you used when creating the Kafka
    Trust Store in the `--kafka-trust-store-password` argument.

#### Enable SSL from a Kafka Connect worker to Schema Registry

**WARNING!** Make sure that https://github.com/gruntwork-io/terraform-aws-kafka/issues/19 is resolved before enabling SSL
to Schema Registry!

The Confluent documentation ([ref1](https://docs.confluent.io/current/kafka/encryption.html#clients), [ref2](https://docs.confluent.io/current/connect/allconfigs.html#connect-allconfigs), [ref3](https://docs.confluent.io/current/connect/userguide.html#configuring-converters)) explains that Kafka Connect workers
need the ability to connect to Schema Registry, but there is no mention of connecting securely to Schema Registry. For
that reason, we *expect* that connecting to Schema Registry over SSL is possible, but we do not yet know how to configure it.

### JVM Memory Settings

By default, we configure Kafka Connect workers to run with `256m` to `2g` of memory. You can override this with the
`--initial-memory` and `--max-memory` arguments. If you wish to override all JVM settings for the Kafka Connect worker,
you can use the `--jvm-opts` argument.

## Other Settings

Kafka Connect workers have [many other configuration settings](https://docs.confluent.io/4.0.0/connect/allconfigs.html),
and this module supports arbitrary customization of the Kafka Connect configuration files. For additional details, see
the [config folder](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/run-kafka-connect/config).


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/run-kafka-connect/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/run-kafka-connect/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/run-kafka-connect/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "e13c543253d7d4706e25148eec1def1f"
}
##DOCS-SOURCER-END -->
