import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# SNS Topics

Create Amazon Simple Notification Service topics

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/networking/sns-topics" class="link-button">View on GitHub</a>

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
        <td>allow_publish_accounts</td>
        <td>A list of IAM ARNs that will be given the rights to publish to the SNS topic.</td>
    </tr><tr>
        <td>allow_publish_services</td>
        <td>A list of AWS services that will be given the rights to publish to the SNS topic.</td>
    </tr><tr>
        <td>allow_subscribe_accounts</td>
        <td>A list of IAM ARNs that will be given the rights to subscribe to the SNS topic.</td>
    </tr><tr>
        <td>allow_subscribe_protocols</td>
        <td>A list of protocols that can be used to subscribe to the SNS topic.</td>
    </tr><tr>
        <td>create_resources</td>
        <td>Set to false to have this module create no resources. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack to allow you to conditionally decide if the resources should be created or not.</td>
    </tr><tr>
        <td>display_name</td>
        <td>The display name of the SNS topic</td>
    </tr><tr>
        <td>kms_master_key_id</td>
        <td>The ID of an AWS-managed customer master key (CMK) for Amazon SNS or a custom CMK</td>
    </tr><tr>
        <td>name</td>
        <td>The name of the SNS topic</td>
    </tr><tr>
        <td>slack_webhook_url</td>
        <td>Send topic notifications to this Slack Webhook URL (e.g., https://hooks.slack.com/services/FOO/BAR/BAZ).</td>
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
        <td>topic_arn</td>
        <td>The ARN of the SNS topic.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"a47cf97d0aa6d0a974a0a0ae9a6f9eae"}
##DOCS-SOURCER-END -->
