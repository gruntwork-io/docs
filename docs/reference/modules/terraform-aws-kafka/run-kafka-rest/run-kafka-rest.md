---
title: "Run Confluent REST Proxy"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Kafka" version="0.11.0" />

# Run Confluent REST Proxy

<a href="https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/run-kafka-rest" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-kafka/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

This folder contains:

1.  [run-kafka-rest](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/run-kafka-rest/bin/run-kafka-rest): A Bash script for configuring and running Confluent REST Proxy.
2.  [install.sh](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/run-kafka-rest/install.sh): A Bash script that installs the `run-kafka-rest` script.

Typically, you would run the `install.sh` script in a [Packer](https://www.packer.io/) template so that you create an Amazon
Machine Image (AMI) that comes pre-installed with `run-kafka-rest`. Then, by calling `run-kafka-rest` in [User Data](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html), your server will configure and start REST Proxy on
boot.

## `run-kafka-rest`

This script assumes that the following are already installed:

1.  REST Proxy: see the [install-confluent-tools module](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/install-confluent-tools). We assume the value `confluent-kafka-rest`
    was passed to the `--tool` parameter.

2.  Supervisord: see the [install-supervisord
    module](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/master/modules/install-supervisord) in
    [terraform-aws-zookeeper](https://github.com/gruntwork-io/terraform-aws-zookeeper).

3.  [AWS CLI](https://aws.amazon.com/cli/).

4.  [jq](https://stedolan.github.io/jq/).

The `run-kafka-rest` script will generate a REST Proxy configuration file (see [REST Proxy config docs](#rest-proxy-config)
below for details) and then use Supervisord to start REST Proxy.

This script has been tested on the following operating systems:

*   Amazon Linux
*   Ubuntu

There is a good chance it will work on Debian, CentOS, and RHEL as well, but our automated testing for this
module does not cover these other distros at the moment.

## Quick Start

The easiest way to install the run-kafka script is with the [Gruntwork
Installer](https://github.com/gruntwork-io/gruntwork-installer):

```bash
gruntwork-install \
  --module-name "run-kafka-rest" \
  --repo "https://github.com/gruntwork-io/terraform-aws-kafka" \
  --tag "v0.0.4" \
  --module-param "config-dir-src=/tmp/config/kafka-rest/config" \
  --module-param "log4j-config-dir-src=/tmp/config/kafka-rest/log4j"
```

Note that this module *requires* that you specify a REST Proxy config file and Log4j config file. The `run-kafka-rest`
module comes bundled with some config files you can manually copy & paste to a folder that can then be read by the above
`gruntwork-install` command.

We recommend installing this module, as well as [install-confluent-tools](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/install-confluent-tools) with the `--tool`
parameter set to `confluent-schema-registry`, as part of a [Packer](https://www.packer.io/) template to create an
[Amazon Machine Image (AMI)](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html) (see the [kafka-zookeeper-ami
example](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/examples/kafka-zookeeper-confluent-oss-ami) for a fully-working example).

## Install Command Line Arguments

You can install the `run-kafka-rest` script by running the [install.sh](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/run-kafka-rest/install.sh)
file in the `run-kafka-rest` module folder. The `install.sh` script requires the following arguments:

*   `--config-dir-src`: The directory containing the REST Proxy config files to copy.
*   `--log4j-config-dir-src`: The directory containing the Log4j config files to copy.

In addition, the following optional arguments are accepted:

*   `--install-dir`: The directory where the `run-kafka-rest` files should be installed. Default: `/opt/kafka-rest`.
*   `--user`: The user who will be set as the owner of `--install-dir`. Default: `kafka_rest`.

Run `install.sh` with the `--help` option or see the source code to see all additional arguments. If you wish to use SSL
with REST Proxy, see the [SSL Settings](#ssl-settings) section below for additional arguments that are accepted.

If you're using `gruntwork-install` to install this module, you can pass these arguments using `--module-param` arguments.
Example:

```bash
gruntwork-install \
  --module-name "run-kafka-rest" \
  --repo "https://github.com/gruntwork-io/terraform-aws-kafka" \
  --tag "v0.0.4" \
  --module-param "config-dir-src=/tmp/config/kafka-rest/config" \
  --module-param "log4j-config-dir-src=/tmp/config/kafka-rest/log4j"
```

## run-kafka-rest Command Line Arguments

When you run the `run-kafka-rest` script, you must provide exactly one of each of the following pairs of arguments:

#### Connect to Zookeeper

*   `--zookeeper-eni-tag`: The name and value of a tag, in the format `name=value`, that can be used to find ZooKeeper
    server ENI IPs.

*   `--zookeeper-connect`: A comma-separated list of the IPs of ZooKeeper nodes to connect to.

#### Connect to Kafka Brokers

*   `--kafka-brokers-tag`: The name and value of a tag, in the format `name=value`, that can be used to find Kafka Broker
    server ENI IPs.

*   `--kafka-brokers`: A comma-separated list of the IPs of Kafka brokers to connect to.

#### Connect to Schema Registry

*   `--schema-registry-tag`: The name and value of a tag, in the format `name=value`, that can be used to find Schema Registry
    ENI IPs.

*   `--schema-registry-url`: A comma-separated list of the IPs of Schema Registry nodes to connect to.

The script also accepts a number of optional parameters to customize REST Proxy's behavior. Run the script with the
`--help` flag to see all available options. See the [REST Proxy config docs](#rest-proxy-config) below for the highlights.

## REST Proxy Config

The `run-kafka-rest` script dynamically fills in the most important values in a [REST Proxy configuration
file](https://docs.confluent.io/4.0.0/kafka-rest/docs/config.html). The script focuses primarily on values that differ
from environment to environment (i.e., stage and prod), so to see how to set other values, see
[other settings](#other-settings).

Here are the key items to pay attention to:

*   [ZooKeeper IPs](#zookeeper-ips)
*   [Kafka IPs](#kafka-ips)
*   [Schema Registry IPs](#schema-registry-ips)
*   [ID](#id)
*   [SSL settings](#ssl-settings)
*   [Other settings](#other-settings)

### ZooKeeper IPs

REST Proxy uses a Zookeeper cluster to store cluster-wide information. You can provide the IPs of the ZooKeeper nodes
manually using the `--zookeeper-connect` argument, or you can allow the `run-kafka-rest` script to discover them
automatically. To use the automatic version, you specify the `--zookeeper-eni-tag` argument with the name and value, in
the format `name=value`, of a tag used on ZooKeeper ENIs. The latter option is based on the assumption that the ZooKeeper
cluster is deployed using [terraform-aws-zookeeper](https://github.com/gruntwork-io/terraform-aws-zookeeper), which uses the
[server-group module](https://github.com/gruntwork-io/terraform-aws-asg/tree/master/modules/server-group) under the hood, which
assigns an ENI to each ZooKeeper server with special tags. See [Server IPs and IDs](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/master/modules/run-exhibitor#server-ips-and-ids) for more info.

### Kafka IPs

REST Proxy connects to a Kafka Broker to discover all Kafka brokers in a cluster. You can provide the IPs of the Kafka
brokers manually using the `--kafka-brokers` argument, or you can allow the `run-kafka-rest` script to discover them
automatically. To use the automatic version, you specify the `--kafka-brokers-tag` argument with the name and value, in
the format `name=value`, of a tag used on ZooKeeper ENIs. The latter option is based on the assumption that the Kafka
cluster is deployed using [terraform-aws-kafka](https://github.com/gruntwork-io/terraform-aws-kafka), which uses the
[server-group module](https://github.com/gruntwork-io/terraform-aws-asg/tree/master/modules/server-group) under the hood, which
assigns an ENI to each ZooKeeper server with special tags. See [Server IPs and IDs](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/master/modules/run-exhibitor#server-ips-and-ids) for more info.

### Schema Registry IPs

REST Proxy accepts HTTP requests that use the [Apache Avro](https://docs.confluent.io/4.0.0/avro.html) data format, which
includes support for schemas. When an HTTP request includes a schema definition, that schema must be written to the
[Confluent Schema Registry](https://docs.confluent.io/4.0.0/schema-registry/docs/index.html). Therefore, REST Proxy needs
to know the IPs of the Schema Registry nodes.

You can provide the IPs of the Schema Registry nodes manually using the `--schema-registry-url` argument, or you can
allow the `run-kafka-rest` script to discover them automatically. To use the automatic version, you specify the
`--schema-registry-tag` argument with the name and value, in the format `name=value`, of a tag used on Schema Registy
ENIs. The latter option is based on the assumption that the Schema Registry cluster is deployed using
[terraform-aws-kafka](https://github.com/gruntwork-io/terraform-aws-kafka), which uses the [server-group module](https://github.com/gruntwork-io/terraform-aws-asg/tree/master/modules/server-group) under the hood, which assigns an ENI to
each Schema Registry server with special tags. See [Server IPs and IDs](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/master/modules/run-exhibitor#server-ips-and-ids) for more info.

### ID

Every REST Proxy node needs a unique ID. By default, the `run-kafka-rest` script automatically figures out the
ID by looking up the EC2 Instance ID of the current server. You can override this value with a custom ID by specifying
the `--id` argument.

### SSL Settings

By default, REST Proxy accepts requests over unencrypted HTTP, connects to Kafka brokers over unencrypted HTTP, and
connects to Schema Registry over unencrypted HTTP. Here's how to enable SSL in each of these cases:

#### Enable SSL from Clients to REST Proxy

Set the `--enable-ssl` argument to `true`. For SSL to work, you need the following:

*   A Key Store that contains an SSL certificate. You can use the [generate-key-stores](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/generate-key-stores)
    module to generate the Key Store (and a Trust Store).

*   You can install it on your server by copying the Key Store file into an AMI that you build with Packer and passing the
    path of the copied Key Store file to `gruntwork-install` as you install `run-kafka-rest`. For example:

    ```bash
    gruntwork-install \
      --module-name 'run-kafka-rest' \
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

#### Enable SSL from REST Proxy to Schema Registry

Set the `--enable-schema-registry-ssl` argument to `true`. For SSL to work, you need the following:

*   The Trust Store that contains the the CA that signed the Schema Registry's SSL certificate. You created this file when
    you (or a teammate) ran the [generate-key-stores](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/generate-key-stores) module to generate the Key Store and
    Trust Store file for Schema Registry.

*   You can install the Trust Store on your server by copying the Trust Store file into an AMI that you build with Packer
    and passing the path of the copied Trust Store file to `gruntwork-install` as you install `run-kafka-rest`. For example:

    ```bash
    gruntwork-install \
      --module-name 'run-kafka-rest' \
      --tag v0.2.0 \
      --repo https://github.com/gruntwork-io/terraform-aws-kafka \
      ...
      --module-param "schema-registry-trust-store-path-src=/tmp/ssl/schema-registry/truststore.jks" \
    ```

    This will call `install.sh` in the `run-kafka-rest` module, install `run-kafka-rest`, and and copy the Trust Store
    file to the path given by the default value of `--schema-registry-trust-store-path-dst` for `install.sh`.

*   In EC2 [User Data](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html), run the `run-kafka-rest` script
    to configure REST Proxy. You can optionally specify a value for `--schema-registry-trust-store-path` that points
    to the path of your copied Trust Store file, but usually the default value matches the default install location used
    by `install.sh` so this isn't necessary. However, you must specify the password you used when creating the Schema
    Registry Trust Store in the `--schema-registry-trust-store-password` argument.

#### Enable SSL from REST Proxy to Kafka Brokers

Set the `--enable-kafka-ssl` argument to `true`. For SSL to work, you need the following:

*   The Trust Store that contains the the CA that signed the Kafka brokers' SSL certificate. You created this file when
    you (or a teammate) ran the [generate-key-stores](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/generate-key-stores) module to generate the Key Store and
    Trust Store file for the Kafka brokers.

*   You can install the Trust Store on your server by copying the Trust Store file into an AMI that you build with Packer
    and passing the path of the copied Trust Store file to `gruntwork-install` as you install `run-kafka-rest`. For example:

    ```bash
    gruntwork-install \
      --module-name 'run-kafka-rest' \
      --tag v0.2.0 \
      --repo https://github.com/gruntwork-io/terraform-aws-kafka \
      ...
      --module-param "kafka-trust-store-path-src=/tmp/ssl/kafka/truststore.jks" \
    ```

    This will call `install.sh` in the `run-kafka-rest` module, install `run-kafka-rest`, and and copy the Trust Store
    file to the path given by the default value of `--kafka-trust-store-path-dst` for `install.sh`.

*   In EC2 [User Data](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html), run the `run-kafka-rest` script
    to configure REST Proxy. You can optionally specify a value for `--kafka-trust-store-path` that points
    to the path of your copied Trust Store file, but usually the default value matches the default install location used
    by `install.sh` so this isn't necessary. However, you must specify the password you used when creating the Kafka
    Trust Store in the `--kafka-trust-store-password` argument.

### JVM Memory Settings

By default, we configure Schema Registry to run with `1g` of memory. You can override this with the `  --memory ` argument. If you
wish to override all JVM settings for Kafka, you can use the `--jvm-opts` argument.

## Other Settings

REST Proxy has [many, many configuration settings](https://docs.confluent.io/4.0.0/kafka-rest/docs/config.html). The
`run-kafka-rest` script gives you a convenient way to set just a few of the most important ones, and especially those
that may differ from environment to environment. To set other types of settings, your best bet is to put them into a custom
`kafka-rest.properties` file and to install that file using the [install.sh script](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/run-kafka-rest/install.sh) that installs the
`run-kafka-test` script by setting the `--config-path` argument.

The default `kafka-rest.properties` file has no options defined in it, so you may create a custom config file with a
single option, or many options. Please note that the `run-kafka-rest` script does a simple search and replace using `sed`
to fill in run-time properties, so it will replace or add settings to your custom `kafka-rest.properties` at run time.


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/run-kafka-rest/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/run-kafka-rest/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/run-kafka-rest/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "8e0cc06d62958e12a0d7e975284f6a91"
}
##DOCS-SOURCER-END -->
