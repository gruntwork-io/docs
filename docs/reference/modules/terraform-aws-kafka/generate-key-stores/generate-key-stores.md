---
title: "Generate Key Stores"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Kafka" version="0.11.0" />

# Generate Key Stores

<a href="https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/generate-key-stores" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-kafka/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

This folder contains a script that you can use to generate:

*   A Java Key Store: A repository used to store security certificates the current server should use to identify itself.
*   A Java Trust Store: A Key Store used to store security certificates the current server should trust.
*   A self-signed SSL certificate stored in the Key Store.

These three items can be used to configure Kafka brokers to use SSL for communication.

## Install

You can install the `generate-key-stores.sh` script using the [Gruntwork
Installer](https://github.com/gruntwork-io/gruntwork-installer):

```bash
gruntwork-install --module-name "generate-key-stores" --repo "https://github.com/gruntwork-io/terraform-aws-kafka" --tag "0.0.1"
```

## Quick start

Here is how you run the script:

```bash
export KEY_STORE_PASSWORD=(password to use for the Key Store)
export TRUST_STORE_PASSWORD=(password to use for the Trust Store)

generate-key-stores.sh \\
  --key-store-path kafka.server.keystore.jks \\
  --trust-store-path kafka.server.truststore.jks \\
  --cert-path cert \\
  --ca-path ca-cert \\
  --org Gruntwork \\
  --org-unit Engineering \\
  --city Phoenix \\
  --state Arizona \\
  --country US
```

This will generate four files:

*   `kafka.server.keystore.jks`: This is the Key Store. It will be protected with the password you specified in
    `KEY_STORE_PASSWORD`. It has a self-signed SSL certificate stored inside of it.

*   `kafka.server.truststore.jks`: This is the Trust Store. It will be protected with the password you specified in
    `TRUST_STORE_PASSWORD`.

*   `ca-cert`: This is the public key of the the CA certificate. You won't need this for use with Kafka itself, but
    you may need it to connect to Kafka from a non-Java client (i.e., a client that doesn't use a Trust Store).

*   `cert`: This is the public key of the SSL certificate stored in the Key Store. You won't need htis for use with Kafka
    itself.

Now that you have these files, here's how you use them:

1.  Pass the paths to the Key Store and Trust Store to the [install-kafka script](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/install-kafka) using the
    `--key-store-path` and `--trust-store-path` arguments, respectively. See [kafka-ami](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/examples/kafka-ami) for
    an example.

2.  When running Kafka with the [run-kafka script](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/run-kafka), set `--enable-ssl=true` and provide your
    Key Store and Trust Store passwords using the `--key-store-password` and `--trust-store-password` arguments,
    respectively. See [kafka-user-data.sh](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/examples/kafka-zookeeper-standalone-clusters/user-data/kafka-user-data.sh)
    for an example.

3.  You will also need to provide the Trust Store file (but NOT the Key Store file) to each of your Kafka clients
    (the producers and consumers) as [documented
    here](http://docs.confluent.io/current/kafka/ssl.html#configuring-kafka-clients).

## How the script works

This script implements the steps for generating a Key Store and Trust Store as described in the [Kafka Encryption and
Authentication using SSL](http://docs.confluent.io/current/kafka/ssl.html) documentation. Under the hood, we are using
[keytool](https://docs.oracle.com/javase/6/docs/technotes/tools/solaris/keytool.html) to create the Key Store and
Trust Store and [openssl](https://www.openssl.org/) to sign the certificate.

A key point about this script: we generate a CA to sign the SSL certificate and then delete the CA private key. This
ensures that no one will be able to steal the CA key and sign fake certificates with it. However, it also means that
you cannot sign any more certificates with the same CA key. If you generate other certificates in the future, you will
have to create new CAs and add those CAs to your Trust Store.

If you're new to SSL, make sure to read our [TLS/SSL background
documentation](https://github.com/gruntwork-io/private-tls-cert#background) as a primer.

## What if I want my cert to validate IP addresses and domain names?

If you have just one domain name, using the common-name (CN) field is the way to go.
If you have multiple domain names, or a domain name and some IPs, using [SAN](https://support.dnsimple.com/articles/what-is-ssl-san/)
(Subject Alternative Name) is probably the way to go.

Fortunately the `generate-key-stores` has you covered.

### Generating a self-signed certificate with domains or ip's in the SAN field

```bash
export KEY_STORE_PASSWORD=(password to use for the Key Store)
export TRUST_STORE_PASSWORD=(password to use for the Trust Store)

generate-key-stores.sh \\
  --key-store-path kafka.server.keystore.jks \\
  --trust-store-path kafka.server.truststore.jks \\
  --cert-path cert \\
  --ca-path ca-cert \\
  --org Gruntwork \\
  --org-unit Engineering \\
  --city Phoenix \\
  --state Arizona \\
  --country US \\
  --domain myexample-domain.com
  --domain another-valid-domain.io
  --ip 127.0.0.1
  --ip 192.168.2.23
```

Notes:

*   You can specify multiple `--domain` and `--ip` arguments
*   The presence of either `--domain` or `--ip` arguments will automatically create a certificate with that entry in the SAN field.
*   If you do use `--domain` or `--ip` arguments then the CN field should *NOT* include a domain name as the CN field will not be examined if a domain or IP is specified.
    For more info see the exact rules [here](https://tools.ietf.org/html/rfc6125#section-6.4.4)

Additional Info:

*   [SSL - How do Common Names (CN) and Subject Alternative Names (SAN) work together?](https://stackoverflow.com/a/5937270/991958)
*   <https://stackoverflow.com/questions/6194236/openssl-version-v3-with-subject-alternative-name>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/generate-key-stores/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/generate-key-stores/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/generate-key-stores/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "af39493fc37ce4640a68eee3b6d3a180"
}
##DOCS-SOURCER-END -->
