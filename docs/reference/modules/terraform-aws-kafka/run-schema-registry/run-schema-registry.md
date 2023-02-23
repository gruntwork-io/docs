---
title: undefined
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem} from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules%2Frun-schema-registry" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-kafka/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# [Other settings](#other-settings)

### ZooKeeper IPs

Schema Registry uses a Zookeeper cluster to store information about the state of the cluster, such as the Kafka Topic
used to store schemas. You can provide the IPs of the ZooKeeper nodes manually using the `--zookeeper-connect` argument,
or you can allow the `run-kafka-rest` script to discover them automatically. To use the automatic version, you specify
the `--zookeeper-eni-tag` argument with the name and value, in the format `name=value`, of a tag used on ZooKeeper ENIs.
The latter option is based on the assumption that the ZooKeeper cluster is deployed using [terraform-aws-zookeeper](https://github.com/gruntwork-io/terraform-aws-zookeeper), which uses the [server-group module](https://github.com/gruntwork-io/terraform-aws-asg/tree/master/modules/server-group) under the hood, which assigns an ENI to
each ZooKeeper server with special tags. See [Server IPs and IDs](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/master/modules/run-exhibitor#server-ips-and-ids) for more info.

### Host Name

This is the host name a Schema Registry node will advertise in Zookeeper. By default, the `run-kafka-rest` script
automatically figures out the private IP address of the current server. You can override this value with a custom host
name by specifying the `--host-name` argument.

### SSL Settings

By default, Schema Registry accepts requests over unencrypted HTTP and connects to Kafka brokers over unencrypted HTTP.
Here's how to enable SSL in each of these cases:

#### Enable SSL from Clients to Schema Registry

**WARNING!** Make sure that https://github.com/gruntwork-io/terraform-aws-kafka/issues/19 is resolved before enabling SSL
from clients to Schema Registry!

Set the `--enable-ssl` argument to `true`. For SSL to work, you need the following:

*   A Key Store that contains an SSL certificate. You can use the [generate-key-stores](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/generate-key-stores)
    module to generate the Key Store (and a Trust Store).

*   You can install it on your server by copying the Key Store file into an AMI that you build with Packer and passing the
    path of the copied Key Store file to `gruntwork-install` as you install `run-schema-registry`. For example:

    ```bash
    gruntwork-install \
      --module-name 'run-schema-registry' \
      --tag v0.2.0 \
      --repo https://github.com/gruntwork-io/terraform-aws-kafka \
      ...
      --module-param "key-store-path-src=/tmp/ssl/schema-registry/keystore.jks" \
    ```

    This will call `install.sh` in the `run-schema-registry` module, install `run-schema-registry`, and and copy the Key
    Store file to the path given by the default value of `--key-store-path-dst` for `install.sh`.

*   You must use the `--key-store-password` argument to provide the `run-schema-registry` script with the password you
    used when creating the Key Store.

*   You may optionally install and configure a Trust Store file using a similar method as above, but replacing all instances
    of `key-store` with `trust-store` (e.g. `--trust-store-path`, `--trust-store-password`). This is necessary if you want
    Schema Registry to authenticate clients using mutual TLS authentication.

#### Enable SSL from Schema Registry to Kafka Brokers

Set the `--enable-kafka-ssl` argument to `true`. For SSL to work, you need the following:

*   The Trust Store that contains the the CA that signed the Kafka brokers' SSL certificate. You created this file when
    you (or a teammate) ran the [generate-key-stores](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/generate-key-stores) module to generate the Key Store and
    Trust Store file for the Kafka brokers.

*   You can install the Trust Store on your server by copying the Trust Store file into an AMI that you build with Packer
    and passing the path of the copied Trust Store file to `gruntwork-install` as you install `run-schema-registry`. For
    example:

    ```bash
    gruntwork-install \
      --module-name 'run-schema-registry' \
      --tag v0.2.0 \
      --repo https://github.com/gruntwork-io/terraform-aws-kafka \
      ...
      --module-param "kafka-trust-store-path-src=/tmp/ssl/kafka/truststore.jks" \
    ```

    This will call `install.sh` in the `run-schema-registry` module, install `run-schema-registry`, and and copy the Trust
    Store file to the path given by the default value of `--kafka-trust-store-path-dst` for `install.sh`.

*   In EC2 [User Data](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html), run the `run-schema-registry`
    script to configure Schema Registry. You can optionally specify a value for `--kafka-trust-store-path` that points
    to the path of your copied Trust Store file, but usually the default value matches the default install location used
    by `install.sh` so this isn't necessary. However, you must specify the password you used when creating the Kafka
    Trust Store in the `--kafka-trust-store-password` argument.

### JVM Memory Settings

By default, we configure Schema Registry to run with `1g` of memory. You can override this with the `  --memory ` argument.
If you wish to override all JVM settings for Kafka, you can use the `--jvm-opts` argument.

## ` run-schema-registry  `

This script assumes that the following are already installed:

1.  Schema Registry: see the [install-confluent-tools module](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/install-confluent-tools). We assume the value
    `confluent-schema-registry` was passed to the `--tool` parameter.

2.  Supervisord: see the [install-supervisord
    module](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/master/modules/install-supervisord) in
    [terraform-aws-zookeeper](https://github.com/gruntwork-io/terraform-aws-zookeeper).

3.  [AWS CLI](https://aws.amazon.com/cli/).

4.  [jq](https://stedolan.github.io/jq/).

The `run-schema-registry` script will generate a Schema Registry configuration file (see [Schema Registry config
docs](#schema-registry-config) below for details) and then use Supervisord to start Schema Registry.

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
  --module-name "run-schema-registry" \
  --repo "https://github.com/gruntwork-io/terraform-aws-kafka" \
  --tag "v0.0.4" \
  --module-param "config-dir-src=/tmp/config/schema-registry/config" \
  --module-param "log4j-config-dir-src=/tmp/config/schema-registry/log4j"
```

Note that this module *requires* that you specify a Schema Registry config file and Log4j config file. The `run-schema-registry`
module comes bundled with some config files you can manually copy & paste to a folder that can then be read by the above
`gruntwork-install` command.

We recommend installing this module, as well as [install-confluent-tools](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/install-confluent-tools) with the `--tool`
parameter set to `confluent-schema-registry`, as part of a [Packer](https://www.packer.io/) template to create an
[Amazon Machine Image (AMI)](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html) (see the [kafka-zookeeper-ami
example](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/examples/kafka-zookeeper-confluent-oss-ami) for a fully-working example).

## Install Command Line Arguments

You can install the `run-schema-registry` script by running the [install.sh](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/run-schema-registry/install.sh)
file in the `run-schema-registry` module folder. The `install.sh` script requires the following arguments:

*   `--config-dir-src`: The directory containing the Schema Registry config files to copy.
*   `--log4j-config-dir-src`: The directory containing the Log4j config files to copy.

In addition, the following optional arguments are accepted:

*   `--install-dir`: The directory where the `run-schema-registry` files should be installed. Default: `/opt/schema-registry`.
*   `--user`: The user who will be set as the owner of `--install-dir`. Default: `schema_registry`.

Run `install.sh` with the `--help` option or see the source code to see all additional arguments. If you wish to use SSL
with Schema Registry, see the [SSL Settings](#ssl-settings) section below for additional arguments that are accepted.

If you're using `gruntwork-install` to install this module, you can pass these arguments using `--module-param` arguments.
Example:

```bash
gruntwork-install \
  --module-name "run-schema-registry" \
  --repo "https://github.com/gruntwork-io/terraform-aws-kafka" \
  --tag "v0.0.4" \
  --module-param "config-dir-src=/tmp/config/schema-registry/config" \
  --module-param "log4j-config-dir-src=/tmp/config/schema-registry/log4j"
```

## run-schema-registry Command Line Arguments

When you run the `run-schema-registry` script, you must provide exactly one of the following pairs of arguments:

*   `--zookeeper-eni-tag`: The name and value of a tag, in the format `name=value`, that can be used to find ZooKeeper
    server ENI IPs.

*   `--zookeeper-connect`: A comma-separated list of the IPs of ZooKeeper nodes to connect to.

In addition, you will most likely want to explicitly specify the following optional arguments:

*   `--config-path`: The path to the Schema Registry config file. Default: `/opt/schema-registry/config/schema-registry.properties`

*   `--log4j-config-path`: The path to the Log4j config file. If you modify this value, make sure to update `--log4j-opts accordingly`.
    Default: `/opt/schema-registry/config/log4j.properties`"

Although the above arguments are optional, in practice, a single server often contains configuration files for many
environments (e.g. dev, stage, prod), and you can use these arguments to specify exactly which environment's configuration
file should be used.

To see all other parameters excpted by `run-schema-registry`, run the script with the `--help` flag. Alos, see the
[Schema Registry config docs](#schema-registry-config) below for the highlights.

## Schema Registry Config

The `run-schema-registry` script dynamically fills in the most important values in a [Schema Registry configuration
file](https://docs.confluent.io/4.0.0/schema-registry/docs/config.html). The script focuses primarily on values that
differ from environment to environment (i.e., stage and prod), so to see how to set other values, see
[other settings](#other-settings).

Here are the key items to pay attention to:

*   [ZooKeeper IPs](#zookeeper-ips)
*   [Host Name](#host-name)
*   [JVM memory settings](#jvm-memory-settings)
*   [SSL settings](#ssl-settings)

## Other Settings

Schema Registry has [many, many configuration settings](https://docs.confluent.io/4.0.0/schema-registry/docs/config.html).
The `run-schema-registry` script gives you a convenient way to set just a few of the most important ones, and especially
those that may differ from environment to environment. To set other types of settings, your best bet is to put them into
a custom `schema-registries.properties` file and to install that file using the [install.sh script](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/install.sh) that
installs the `run-schema-registry` script by setting the `--config-path` argument.

The default `schema-registry.properties` file is as follows:

```
listeners=http://0.0.0.0:8081
kafkastore.connection.url=localhost:2181
kafkastore.topic=_schemas
debug=false
```

Note that the `run-schema-registry` script does a simple search and replace using `sed` to fill in run-time properties,
so it will replace or add settings to your custom `schema-registry.properties` at run time. In particular, both `listeners`
and `kafkastore.connection.url` will be overwritten, but feel free to add any other properties you wish.


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "f34cecec7511049e68f01f488f4e5833"
}
##DOCS-SOURCER-END -->
