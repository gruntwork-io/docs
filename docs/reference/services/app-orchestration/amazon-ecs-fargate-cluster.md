import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Amazon ECS Fargate Cluster

Deploy an Amazon ECS Cluster optimized for Fargate only usage.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/ecs-fargate-cluster" class="link-button">View on GitHub</a>

### Reference 
              
<Tabs>
  <TabItem value="inputs" label="Inputs" default>
    <table>
        <thead>
            <tr>
                <td>Variable name</td>
                <td>Description</td>
            </tr>
        </thead>
        <tbody>
            <tr>
        <td>cluster_name</td>
        <td>The name of the ECS cluster</td>
    </tr><tr>
        <td>custom_tags</td>
        <td>A map of custom tags to apply to the ECS Cluster. The key is the tag name and the value is the tag value.</td>
    </tr><tr>
        <td>enable_container_insights</td>
        <td>Whether or not to enable container insights monitoring on the ECS cluster.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
  <TabItem value="outputs" label="Outputs">
    <table>
        <thead>
            <tr>
                <td>Variable name</td>
                <td>Description</td>
            </tr>
        </thead>
        <tbody>
            <tr>
        <td>arn</td>
        <td>ARN of the ECS cluster that was created.</td>
    </tr><tr>
        <td>name</td>
        <td>The name of the ECS cluster.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"6f3bea305301015a3b11f451fd08aeda"}
##DOCS-SOURCER-END -->
