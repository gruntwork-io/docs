import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Amazon ECS Fargate Cluster

Deploy an Amazon ECS Cluster optimized for Fargate only usage.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/ecs-fargate-cluster" className="link-button">View on GitHub</a>

### Reference 

<Tabs>
  <TabItem value="inputs" label="Inputs" default>
    <table>
        <thead>
            <tr>
                <td><b>Variable name</b></td>
                <td><b>Description</b></td>
            </tr>
        </thead>
        <tbody>
            <tr>
        <td><a name="cluster_name" href="#cluster_name" className="snap-top"><code>cluster_name</code></a></td>
        <td>The name of the ECS cluster</td>
    </tr><tr>
        <td><a name="custom_tags" href="#custom_tags" className="snap-top"><code>custom_tags</code></a></td>
        <td>A map of custom tags to apply to the ECS Cluster. The key is the tag name and the value is the tag value.</td>
    </tr><tr>
        <td><a name="enable_container_insights" href="#enable_container_insights" className="snap-top"><code>enable_container_insights</code></a></td>
        <td>Whether or not to enable container insights monitoring on the ECS cluster.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
  <TabItem value="outputs" label="Outputs">
    <table>
        <thead>
            <tr>
              <td><b>Variable name</b></td>
              <td><b>Description</b></td>
            </tr>
        </thead>
        <tbody>
            <tr>
        <td><a name="arn" href="#arn" className="snap-top"><code>arn</code></a></td>
        <td>ARN of the ECS cluster that was created.</td>
    </tr><tr>
        <td><a name="name" href="#name" className="snap-top"><code>name</code></a></td>
        <td>The name of the ECS cluster.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"f2356932fbe3cf7c7c65b5c992c82bc9"}
##DOCS-SOURCER-END -->
