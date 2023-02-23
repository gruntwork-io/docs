---
title: "Elasticsearch Cluster Restore"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem} from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules%2Felasticsearch-cluster-restore" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-elk/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# Elasticsearch Cluster Restore

This folder contains a [Terraform](https://www.terraform.io/) module to restore backups of an [Elasticsearch](https://www.elastic.co/products/kibana) cluster from snapshots saved in S3. The module is a lambda function that calls the Elasticsearch API to perform cluster restore tasks documented [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-snapshots.html);

## Restoring snapshots

All the above section does, is deploy the Lambda function that contains the cluster restore code. You'll need to actually invoke that function with the right snapshot ID to perform a restore. The backup module generates an ID for each snapshot it saves to S3 and this can be located in its CloudWatch logs; grep for string `"Saving snapshot: <SNAPSHOT>"`. Snapshot index files stored along side the backup data in S3 also contain this information.

Performing a restore is quite straightforward at this point, it involves manually invoking the Lambda function via the [web interface](https://us-east-2.console.aws.amazon.com/lambda/home) or [AWS CLI](https://docs.aws.amazon.com/lambda/latest/dg/with-on-demand-custom-android-example-upload-deployment-pkg.html#walkthrough-on-demand-custom-android-events-adminuser-create-test-function-upload-zip-test-manual-invoke). The ID of the snapshot to restore is specified in the event data passed to the Lambda:

```json
{
  "snapshotId": "<SNAPSHOT>"
}
```

### Restoring to a different cluster

Snapshots created from a cluster can be restored to a completely different cluster, this module will transparently setup a backup repository (backed by the S3 cluster containing the snapshots) on the new cluster and the standard restore process described above will work.

You should be mindful of the difference in versions of the Elasticsearch cluster the snapshots were created with and the cluster it's being restored to. The [documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-snapshots.html#modules-snapshots) contains more information on the compatiblity matrix and how to upgrade snapshots created with older versions of Elasticsearch.

### Restore Notification

The time it takes to restore a snapshot is dependent on the volume of data within that snapshot. However, since the restore module is implemened as a Lambda function which has a maximum execution time of 5 minutes a separate notification Lambda is kicked off. The notification Lambda will check the status of the restore operation and re-invoke itself until the operation is complete. The notification Lambda continiously logs the status of the restore operation to Cloudwatch.




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="name" requirement="required" type="string">
<HclListItemDescription>

The name of the Lambda function. Used to namespace all resources created by this module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="elasticsearch_dns" requirement="required" type="string">
<HclListItemDescription>

The DNS to the Load Balancer in front of the Elasticsearch cluster

</HclListItemDescription>
</HclListItem>

<HclListItem name="repository" requirement="required" type="string">
<HclListItemDescription>

The name of the repository that will be associated with the created snapshots

</HclListItemDescription>
</HclListItem>

<HclListItem name="bucket" requirement="required" type="string">
<HclListItemDescription>

The S3 bucket that the specified repository will be associated with and where all snapshots will be stored

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="elasticsearch_port" requirement="optional" type="number">
<HclListItemDescription>

The port on which the API requests will be made to the Elasticsearch cluster

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="9200"/>
</HclListItem>

<HclListItem name="protocol" requirement="optional" type="string">
<HclListItemDescription>

Specifies the protocol to use when making the request to the Elasticsearch cluster. Possible values are HTTP or HTTPS

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;http&quot;"/>
</HclListItem>

<HclListItem name="run_in_vpc" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to give your Lambda function access to resources within a VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="vpc_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the VPC the Lambda function should be able to access. Only used if <a href="#run_in_vpc"><code>run_in_vpc</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of subnet IDs the Lambda function should be able to access within your VPC. Only used if <a href="#run_in_vpc"><code>run_in_vpc</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="lambda_runtime" requirement="optional" type="string">
<HclListItemDescription>

The runtime to use for the Lambda function. Should be a Node.js runtime.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;nodejs14.x&quot;"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="lambda_name">
</HclListItem>

<HclListItem name="lambda_arn">
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "1099d83a6267a7573bfe84862136abe5"
}
##DOCS-SOURCER-END -->
