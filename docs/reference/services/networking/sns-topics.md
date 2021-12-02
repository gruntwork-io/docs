import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# SNS Topics

Create Amazon Simple Notification Service topics

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/networking/sns-topics" className="link-button">View on GitHub</a>

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
        <td><a name="allow_publish_accounts" href="#allow_publish_accounts" className="snap-top"><code>allow_publish_accounts</code></a></td>
        <td>A list of IAM ARNs that will be given the rights to publish to the SNS topic.</td>
    </tr><tr>
        <td><a name="allow_publish_services" href="#allow_publish_services" className="snap-top"><code>allow_publish_services</code></a></td>
        <td>A list of AWS services that will be given the rights to publish to the SNS topic.</td>
    </tr><tr>
        <td><a name="allow_subscribe_accounts" href="#allow_subscribe_accounts" className="snap-top"><code>allow_subscribe_accounts</code></a></td>
        <td>A list of IAM ARNs that will be given the rights to subscribe to the SNS topic.</td>
    </tr><tr>
        <td><a name="allow_subscribe_protocols" href="#allow_subscribe_protocols" className="snap-top"><code>allow_subscribe_protocols</code></a></td>
        <td>A list of protocols that can be used to subscribe to the SNS topic.</td>
    </tr><tr>
        <td><a name="create_resources" href="#create_resources" className="snap-top"><code>create_resources</code></a></td>
        <td>Set to false to have this module create no resources. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack to allow you to conditionally decide if the resources should be created or not.</td>
    </tr><tr>
        <td><a name="display_name" href="#display_name" className="snap-top"><code>display_name</code></a></td>
        <td>The display name of the SNS topic</td>
    </tr><tr>
        <td><a name="kms_master_key_id" href="#kms_master_key_id" className="snap-top"><code>kms_master_key_id</code></a></td>
        <td>The ID of an AWS-managed customer master key (CMK) for Amazon SNS or a custom CMK</td>
    </tr><tr>
        <td><a name="name" href="#name" className="snap-top"><code>name</code></a></td>
        <td>The name of the SNS topic</td>
    </tr><tr>
        <td><a name="slack_webhook_url" href="#slack_webhook_url" className="snap-top"><code>slack_webhook_url</code></a></td>
        <td>Send topic notifications to this Slack Webhook URL (e.g., https://hooks.slack.com/services/FOO/BAR/BAZ).</td>
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
        <td><a name="topic_arn" href="#topic_arn" className="snap-top"><code>topic_arn</code></a></td>
        <td>The ARN of the SNS topic.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"6a09c225434a44e5c6c26941f089c0b5"}
##DOCS-SOURCER-END -->
