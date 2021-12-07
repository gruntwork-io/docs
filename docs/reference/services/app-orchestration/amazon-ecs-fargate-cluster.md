import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Amazon ECS Fargate Cluster

Deploy an Amazon ECS Cluster optimized for Fargate only usage.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/ecs-fargate-cluster" className="link-button">View on GitHub</a>

### Reference

<Tabs>
  <TabItem value="inputs" label="Inputs" default>
    <ul>
      
    <li>
      <p>
        <a name="cluster_name" href="#cluster_name" className="snap-top">
          <code>cluster_name</code>
        </a> - The name of the ECS cluster
      </p>
    </li>
    <li>
      <p>
        <a name="custom_tags" href="#custom_tags" className="snap-top">
          <code>custom_tags</code>
        </a> - A map of custom tags to apply to the ECS Cluster. The key is the tag name and the value is the tag value.
      </p>
    </li>
    <li>
      <p>
        <a name="enable_container_insights" href="#enable_container_insights" className="snap-top">
          <code>enable_container_insights</code>
        </a> - Whether or not to enable container insights monitoring on the ECS cluster.
      </p>
    </li>
    </ul>
  </TabItem>
  <TabItem value="outputs" label="Outputs">
    <ul>
      
    <li>
      <p>
        <a name="arn" href="#arn" className="snap-top">
          <code>arn</code>
        </a> - ARN of the ECS cluster that was created.
      </p>
    </li>
    <li>
      <p>
        <a name="name" href="#name" className="snap-top">
          <code>name</code>
        </a> - The name of the ECS cluster.
      </p>
    </li>
    </ul>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"aa367c880b6db855332114fe93de6b94"}
##DOCS-SOURCER-END -->
