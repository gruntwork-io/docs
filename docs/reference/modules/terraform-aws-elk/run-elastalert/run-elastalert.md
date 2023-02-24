---
title: "Run Elastalert Script"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules%2Frun-elastalert" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-elk/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# Run Elastalert Script

This folder contains a script for configuring and running [ElastAlert](https://github.com/Yelp/elastalert) on an AWS server. This script has been tested on the following operating systems:

*   Ubuntu 18.04
*   Ubuntu 20.04
*   Amazon Linux 2
*   CentOS 7

There is a good chance it will work on other flavors of Debian, CentOS, and RHEL as well.

## What is ElastAlert?

ElastAlert is a simple framework for alerting on anomalies, spikes, or other patterns of interest from data in Elasticsearch. Note that it's not an [Elasticsearch plugin](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-plugins.html), just a Python service that connects to the ElasticSearch API. However, there is a separate [ElastAlert Kibana Plugin](https://github.com/bitsensor/elastalert-kibana-plugin) that exposes ElastAlert functionality in Kibana.

The key idea is that you define an Elasticsearch query as part of a **rule**, which is of some **rule type** that specifies when that query should trigger an **alert,** which is of some **alert type**.

For example, you might use the `frequency` rule type ("Match where there are at least X events in Y time") to define a rule that triggers an alert of type `Slack` so that a Slack message appears when the rule is triggered.

## Quick start

This script depends on [bash-commons](https://github.com/gruntwork-io/bash-commons), so you must install that project
first as documented in its README.

This script also assumes you installed ElastAlert using the [install-elastalert module](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/install-elastalert), and are already running a live Elasticsearch cluster (most likely from using the [run-elasticsearch module](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/run-elasticsearch)).

1.  Review the `config.yaml` file in `/opt/elastalert/config/config.yaml` and make sure the `rules_folder` property specifies the folder that contains all the ElastAlert rule definitions.

2.  Review the [example rules](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/examples/elk-amis/elastalert/elastalert-rules). As a quick start, use the `sns` alert type by making sure the example rule contains the following and no other `alert` definitions:

```yaml
alert:
- "sns"

aws_region: "fill-this-in"
sns_topic_arn: "fill-this-in"
```

1.  Now start ElastAlert by executing the `run-elastalsert` script as follows:

    ```bash
    /opt/elastalert/bin/run-elastalert --config /opt/elastalert/config/config.yaml
    ```

    This will begin querying data in Elasticsearch starting from right this moment.

2.  Finally, send some data into the Elasticsearch cluster and confirm that you've received an email (TODO: How best to send data to cluster?)

## Command line Arguments

Run `run-elastalsert --help` to see all available arguments, or just check out the [run-elastalert source code](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/run-elastalert/bin/run-elastalert).

## Alternatives

### Elastalert vs. X-Pack

[X-Pack](https://www.elastic.co/guide/en/x-pack/6.2/xpack-introduction.html) is a full-featured, commercial plugin maintained by
elastic.co that includes the following features:

*   **Security.** Lock down elasticsearch nodes to certain IPs or require authentication via LDAP, Active Directory, or
    basic authentication.
*   **Monitoring.** Monitor the components of the Elasticsearch cluster: Elasticsearch, Logstash, and Kibana.
*   **Alerting and Notifications.** Define a query and a condition under which its results should trigger a notification.
*   **Reports.** You can download Kibana reports as PDFs optimized for printing.
*   **Query Relationships Between Data.** Explore how different attributes of a table connecto to each other with visual graph renderings.
*   **Machine Learning.** Perform "Time Series Anomaly Detection" to automatically alert on unusual changes.

By contrast, Elastalert is limited to alerting and notifications. We chose Elastalert over X-Package because, as an alerting plugin, Elastalert compares favorably to X-Pack, and it's open source. However, if you require other features of X-Pack, you may prefer to use X-Pack for alerting and notifications as well.


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "dfdc0115814028b711fb268115688dc6"
}
##DOCS-SOURCER-END -->
