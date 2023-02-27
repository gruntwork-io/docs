---
title: undefined
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules%2Frun-kafka" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-kafka/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# [Other settings](#other-settings)

### ZooKeeper IPs

Kafka uses ZooKeeper cluster for coordination. You can provide the IPs of the ZooKeeper nodes manually using the
`--zookeeper-connect` argument, or you can allow the `run-kafka` script to discover them automatically. To use the
automatic version, you specify the `--zookeeper-eni-tag` argument with the name and value, in the format `name=value`,
of a tag used on ZooKeeper ENIs. The latter option is based on the assumption that the ZooKeeper cluster is deployed
using [terraform-aws-zookeeper](https://github.com/gruntwork-io/terraform-aws-zookeeper), which uses the [server-group
module](https://github.com/gruntwork-io/terraform-aws-asg/tree/master/modules/server-group) under the hood, which assigns
an ENI to each ZooKeeper server with special tags. See [Server IPs and
IDs](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/master/modules/run-exhibitor#server-ips-and-ids) for more
info.

### Broker ID

Every Kafka broker needs a unique ID. By default, the `run-kafka` script automatically figures out the Broker ID by
looking up the `ServerGroupIndex` tag for the current server. This tag is set by the [server-group
module](https://github.com/gruntwork-io/terraform-aws-asg/tree/master/modules/server-group) to a unique integer for each
server in the server group. You can override this value with a custom broker ID by specifying the `--broker-id`
argument.

### Number of partitions

Every topic in Kafka consists of one or more partitions, which is one of the most important settings for determining
the throughput, availability, and end-to-end latency for that topic. See [How to choose the number of topics/partitions
in a Kafka cluster?](https://www.confluent.io/blog/how-to-choose-the-number-of-topicspartitions-in-a-kafka-cluster/)
for more info.

You specify the number of partitions when creating a topic (e.g., by using the `kafka-topics.sh` script). You can
also use the `--num-partitions` argument in the `run-kafka` script to configure the default number of partitions for
automatically created topics (i.e., topics that are created when a producer first tries to write to them).

### Replication

The main way Kafka achieves durability and availability for your data is to replicate that data across multiple Kafka
brokers. Therefore, if one broker goes down, the data is still available in the other brokers.

You specify replication settings when creating a topic (e.g., by using the `kafka-topics.sh` script). You can also
specify the following replication settings using the `run-kafka` script:

*   `--replication-factor`: The default replication factor for auto-created topics.
*   `--offsets-replication-factor`: The replication factor for the internal `__consumer_offsets topic`.
*   `--transaction-state-replication-factor`: The replication factor for the internal `__transaction_state` topic.

In production, you typically want to set all of these to > 1 to ensure data isn't lost if a single broker dies.

### Availability

The number of brokers you are running and the replication settings for your topics will be the biggest influence on
your Kafka cluster's availability in the face of outages. There are also two other important settings you can set via
the `run-kafka` script:

*   `--min-in-sync-replicas`: The number of replicas that must be in-sync when a producer sets `acks` to `all`. For
    example, if you have 3 replicas, and you set this setting to 2, the producer will wait for 2 of the replicas to
    acknowledge they received the write before the producer considers the write successful. Setting this to a higher
    value (e.g., 3 for a topic with 3 replicas) reduces the chance of data loss, but it also reduces availability, as
    even a single broker going down means writes will fail. Setting this to 2 for a replication factor of 3 is common.

*   `--unclean-leader-election`: If set to true, an out-of-sync replica will be elected as leader when there is no live
    in-sync replica (ISR). This preserves the availability of the partition, but there is a chance of data loss. If set
    to false and there are no live in-sync replicas, Kafka returns an error and the partition will be unavailable. In
    general, if you're optimizing for availability, set this setting to true; if you're optimizing for reducing data
    loss, set this setting to false.

### JVM memory settings

By default, we configure Kafka to run with `6g` of memory. You can override this with the `  --memory ` argument. If you
wish to override all JVM settings for Kafka, you can use the `--jvm-opts` argument.

### SSL settings

By default, Kafka brokers communicate over plaintext. If you wish to enable SSL, set the `--enable-ssl` argument to
`true`. For SSL to work, you need the following:

*   A Key Store that contains an SSL certificate and a Trust Store that contains the the CA that signed that SSL
    certificate. You can use the [generate-key-stores](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/generate-key-stores) module to generate the Key Store and
    Trust Store and you can install them on your server by passing the `--key-store-path` and `--trust-store-path`
    arguments, respectively, to the [install-kafka module](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/install-kafka).

*   You must use the `--key-store-password` argument to provide the `run-kafka` script with the password you used when
    creating the Key Store.

*   You must use the `--trust-store-password` argument to provide the `run-kafka` script with the password you used when
    creating the Trust Store.

### Log directories

By default, the `run-kafka` script will configure Kafka to logs in `/opt/kafka/kafka-logs/data`. We strongly
recommend mounting a separate EBS Volume at `/opt/kafka/kafka-logs`, as every write to Kafka gets persisted to disk,
and you get much better performance if there is no contention for the hard drive from other processes.

You can override the log directories via the `--log-dirs` argument.

## Quick start

The easiest way to install the run-kafka script is with the [Gruntwork
Installer](https://github.com/gruntwork-io/gruntwork-installer):

```bash
gruntwork-install \
  --module-name "run-kafka" \
  --repo "https://github.com/gruntwork-io/terraform-aws-kafka" \
  --tag "v0.0.4"
```

We recommend running this module, as well as [install-kafka](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/install-kafka), as part of a
[Packer](https://www.packer.io/) template to create an [Amazon Machine Image
(AMI)](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html) (see the [kafka-ami
example](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/examples/kafka-ami) for a fully-working sample code).

## Install Command Line Arguments

You can install the `run-kafka` script by running the [install.sh](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/run-kafka/install.sh)
file in the `run-kafka` module folder. The `install.sh` script requires the following arguments:

*   `--config-dir-src`: The directory containing the Kafka config files to copy.
*   `--log4j-config-dir-src`: The directory containing the Log4j config files to copy.

In addition, the following optional arguments are accepted:

*   `--install-dir`: The directory where the `run-kafka` files should be installed. Default: `/opt/kafka`.
*   `--user`: The user who will be set as the owner of `--install-dir`. Default: `kafka`.

Run `install.sh` with the `--help` option or see the source code to see all additional arguments. If you wish to use SSL
with Kafka, see the [SSL Settings](#ssl-settings) section below for additional arguments that are accepted.

If you're using `gruntwork-install` to install this module, you can pass these arguments using `--module-param` arguments.
Example:

```bash
gruntwork-install \
  --module-name "run-kafka" \
  --repo "https://github.com/gruntwork-io/terraform-aws-kafka" \
  --tag "v0.0.4" \
  --module-param "config-dir-src=/tmp/config/kafka/config" \
  --module-param "log4j-config-dir-src=/tmp/config/kafka/log4j"
```

## run-kafka command line arguments

When you run the `run-kafka` script, you must provide exactly one of the following arguments:

*   `--zookeeper-eni-tag`: The name and value of a tag, in the format `name=value`, that can be used to find ZooKeeper
    server ENI IPs.

*   `--zookeeper-connect`: A comma-separated list of the IPs of ZooKeeper nodes to connect to.

The script also accepts a number of optional parameters to customize Kafka's behavior. Run the script with the
`--help` flag to see all available options. See the [Kafka config docs](#kafka-config) below for the highlights.

In addition, you will most likely want to explicitly specify the following optional arguments:

*   `--config-path`: The path to the Kafka config file. Default: `/opt/kafka/config/dev.kafka.properties`

*   `--log4j-config-path`: The path to the Log4j config file. Default: `/opt/kafka/config/dev.log4j.properties`"

Although the above arguments are optional, in practice, a single server often contains configuration files for many
environments (e.g. dev, stage, prod), and you can use these arguments to specify exactly which environment's configuration
file should be used.

To see all other parameters excpted by `run-kafka`, run the script with the `--help` flag. Also, see the
[Kafka config docs](#kafka-config) below for the highlights.

## Kafka config

The `run-kafka` script dynamically fills in the most important values in a [Kafka configuration
file](https://kafka.apache.org/documentation/#configuration). The script focuses primarily on values that differ from
environment to environment (i.e., stage and prod), so to see how to set other values, see
[other settings](#other-settings).

Here are the key items to pay attention to:

*   [ZooKeeper IPs](#zookeeper-ips)
*   [Broker ID](#broker-id)
*   [Number of partitions](#number-of-partitions)
*   [Replication](#replication)
*   [Availability](#availability)
*   [JVM memory settings](#jvm-memory-settings)
*   [SSL settings](#ssl-settings)
*   [Log directories](#log-directories)

## Other settings

Kafka has [many, many configuration settings](https://kafka.apache.org/documentation/#configuration). The `run-kafka`
script gives you a convenient way to set just a few of the most important ones, and especially those that may differ
from environment to environment. To set other types of settings, your best bet is to put them into a custom
`server.properties` file and to install that file using the [install-kafka module](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/install-kafka) by setting
the `--config` argument. You can find the default `server.properties` file used by `install-kafka`
[here](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/run-kafka/config/kafka).

Please note that the `run-kafka` script does a simple search and replace using `sed` to fill in run-time properties,
so it will replace or add settings to your custom `server.properties` at run time.


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/modules%2Frun-kafka%2Freadme.md",
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/modules%2Frun-kafka%2Fvariables.tf",
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/modules%2Frun-kafka%2Foutputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "67fa6a0119f63b513998ce3aef35b9d4"
}
##DOCS-SOURCER-END -->
