---
title: "Run Elasticsearch Script"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="ELK AWS Module" version="0.11.1" />

# Run Elasticsearch Script

<a href="https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/run-elasticsearch" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-elk/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

This folder contains a script for configuring and running [Elasticsearch](https://www.elastic.co/products/elasticsearch)

This script has been tested on the following operating systems:

*   Ubuntu 18.04
*   Ubuntu 20.04
*   Amazon Linux 2
*   CentOS 7

## Quick start

This module depends on [bash-commons](https://github.com/gruntwork-io/bash-commons), so you must install that project
first as documented in its README.

The easiest way to use this module is with the [Gruntwork Installer](https://github.com/gruntwork-io/gruntwork-installer):

```bash
gruntwork-install \
  --module-name "run-elasticsearch" \
  --repo "https://github.com/gruntwork-io/terraform-aws-elk" \
  --tag "<VERSION>"
```

Checkout the [releases](https://github.com/gruntwork-io/terraform-aws-elk/releases) to find the latest version.

## Command line Arguments

Run `run-elasticsearch --help` to see all available arguments.

```
  Usage: run-elasticsearch [OPTIONS]

  This script can be used to configure and run Elasticsearch.
  
  Optional arguments:
  
    --auto-fill-endpoint    VALUE should be aws_region. Value will be converted to aws_endpoint. KEY in Elasticsearch config file will be replaced with aws_endpoint. Only needed if running with ec2 discovery plugin.
    --auto-fill KEY=VALUE   Search the Elasticsearch config file for KEY and replace it with VALUE. May be repeated.
    --auto-fill-jvm KEY=VALUE   Search the Elasticsearch JVM config file for KEY and replace it with VALUE. May be repeated.
  
  Example:
  
    install.sh
      --auto-fill "<__CLUSTER_NAME__>=the-cluster-name" --auto-fill-jvm "<__XMS__>=4g"
```

## How it works

The `run-elasticsearch` script:

*   Replace `<__KEY_NAME__>` with `VALUE` that you specify as part of your `--auto-fill` arguments in the Elasticsearch config file located in: `/etc/elasticsearch/elasticsearch.yml`
*   Replace `<__KEY_NAME__>` with `VALUE` that you specify as part of your `--auto-fill-jvm` arguments in the JVM config file located in: `/etc/elasticsearch/jvm.options`

## Enabling SSL

In order to use Elasticsearch with SSL we use the [ReadonlyREST](https://github.com/sscarduzio/elasticsearch-readonlyrest-plugin) plugin.
A complete setup will require the following steps:

1.  [Generating Java Keystore](#generating-java-key-store)
2.  [Create a `readonlyrest.yml` config file](#create-readonlyrest-config-file)
3.  [Create an Elasticsearch AMI with ReadonlyREST plugin installed](#creating-elasticsearch-ami-with-readonlyrest-plugin)

### Generating Java Key Store

We use the [generate-key-stores](https://github.com/gruntwork-io/terraform-aws-kafka/tree/main/modules/generate-key-stores#quick-start)
script in order to create the Java Keystore that ReadonlyREST will use to store certificates.

Under the hood, we are using keytool to create the Key Store and Trust Store and openssl to sign the certificate.

*Note:* It is important to generate the Java Key Store first because we will then include this keystore in the AMI/Docker Image
that we create in the next step. See [this Packer Template](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/examples/elk-amis/elasticsearch/elasticsearch.json) for a concrete
example of how we are including the Java Key Store in the AMI/Docker Image.

### Create ReadonlyREST config file

You will need to create a file called `readonlyrest.yml`. It should look something like this:

```yml
readonlyrest:
    ssl:
      # put the keystore in the same dir with elasticsearch.yml
      keystore_file: "elasticsearch.server.keystore.jks"
      keystore_pass: <__KEYSTORE_PASS__>
      key_pass: <__KEY_PASS__>
      key_alias: localhost
```

See [this Packer Template](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/examples/elk-amis/elasticsearch/elasticsearch.json) for a concrete
example of where we create this file and how we then make sure this file is included in the AMI/Docker Image we create.

*Note:* You should *not* hard code Java Key Store passwords or key passwords in this (or any) config file!
Instead, encrypt the password using something like KMS or Vault and at run time (e.g., in User Data)
decrypt it and use the `--auto-fill-ror` param of `run-elasticsearch` script to fill it into this file,
which can only be accessed by the root or the `elasticsearch` user.

Complete documentation for the `readonlyrest.yml` can be found
[here](https://github.com/beshu-tech/readonlyrest-docs/blob/e56b62f/elasticsearch.md#overview)

### Creating Elasticsearch AMI with ReadonlyREST plugin

The first thing we will need to do is build an AMI that has Elasticsearch installed and also has the ReadonlyREST plugin installed.
See [this example](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/examples/elk-amis/elasticsearch#local-ssl-testing) that goes through generating either an Elasticsearch docker image or AMI
with ReadonlyREST plugin installed.

*Note:* There's currently no way to easily download the plugin from <https://readonlyrest.com> as the site
requires you to submit your email in order to get a custom download link. We are currently hosting one particular version of the plugin
that we are using in our examples. If you need a different/new version then you will have to download it and host it locally/provide it to the
`elasticsearch-install` module.


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/run-elasticsearch/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/run-elasticsearch/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/run-elasticsearch/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "4f4669511dd4bf64ddd3f6b97bb8d03e"
}
##DOCS-SOURCER-END -->
