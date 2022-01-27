import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Amazon ECS Fargate Cluster

Deploy an Amazon ECS Cluster optimized for Fargate only usage.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/ecs-fargate-cluster" className="link-button">View on GitHub</a>

### Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<a name="cluster_name" className="snap-top"></a>

* [**`cluster_name`**](#cluster_name) &mdash; The name of the ECS cluster

<a name="custom_tags" className="snap-top"></a>

* [**`custom_tags`**](#custom_tags) &mdash; A map of custom tags to apply to the ECS Cluster. The key is the tag name and the value is the tag value.

<a name="enable_container_insights" className="snap-top"></a>

* [**`enable_container_insights`**](#enable_container_insights) &mdash; Whether or not to enable container insights monitoring on the ECS cluster.

</TabItem>
<TabItem value="outputs" label="Outputs">

<a name="arn" className="snap-top"></a>

* [**`arn`**](#arn) &mdash; ARN of the ECS cluster that was created.

<a name="name" className="snap-top"></a>

* [**`name`**](#name) &mdash; The name of the ECS cluster.

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"570b2ae5d734e54f37ec19630f8153fa"}
##DOCS-SOURCER-END -->
