import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# SNS Topics

Create Amazon Simple Notification Service topics

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/networking/sns-topics" className="link-button">View on GitHub</a>

### Reference

<Tabs>
  <TabItem value="inputs" label="Inputs" default>
    <ul>
      
    <li>
      <p>
        <a name="allow_publish_accounts" href="#allow_publish_accounts" className="snap-top">
          <code>allow_publish_accounts</code>
        </a> - A list of IAM ARNs that will be given the rights to publish to the SNS topic.
      </p>
    </li>
    <li>
      <p>
        <a name="allow_publish_services" href="#allow_publish_services" className="snap-top">
          <code>allow_publish_services</code>
        </a> - A list of AWS services that will be given the rights to publish to the SNS topic.
      </p>
    </li>
    <li>
      <p>
        <a name="allow_subscribe_accounts" href="#allow_subscribe_accounts" className="snap-top">
          <code>allow_subscribe_accounts</code>
        </a> - A list of IAM ARNs that will be given the rights to subscribe to the SNS topic.
      </p>
    </li>
    <li>
      <p>
        <a name="allow_subscribe_protocols" href="#allow_subscribe_protocols" className="snap-top">
          <code>allow_subscribe_protocols</code>
        </a> - A list of protocols that can be used to subscribe to the SNS topic.
      </p>
    </li>
    <li>
      <p>
        <a name="create_resources" href="#create_resources" className="snap-top">
          <code>create_resources</code>
        </a> - Set to false to have this module create no resources. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack to allow you to conditionally decide if the resources should be created or not.
      </p>
    </li>
    <li>
      <p>
        <a name="display_name" href="#display_name" className="snap-top">
          <code>display_name</code>
        </a> - The display name of the SNS topic
      </p>
    </li>
    <li>
      <p>
        <a name="kms_master_key_id" href="#kms_master_key_id" className="snap-top">
          <code>kms_master_key_id</code>
        </a> - The ID of an AWS-managed customer master key (CMK) for Amazon SNS or a custom CMK
      </p>
    </li>
    <li>
      <p>
        <a name="name" href="#name" className="snap-top">
          <code>name</code>
        </a> - The name of the SNS topic
      </p>
    </li>
    <li>
      <p>
        <a name="slack_webhook_url" href="#slack_webhook_url" className="snap-top">
          <code>slack_webhook_url</code>
        </a> - Send topic notifications to this Slack Webhook URL (e.g., https://hooks.slack.com/services/FOO/BAR/BAZ).
      </p>
    </li>
    </ul>
  </TabItem>
  <TabItem value="outputs" label="Outputs">
    <ul>
      
    <li>
      <p>
        <a name="topic_arn" href="#topic_arn" className="snap-top">
          <code>topic_arn</code>
        </a> - The ARN of the SNS topic.
      </p>
    </li>
    </ul>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"20f8d418e3b2fd96f4d8dbe0b57b6bc0"}
##DOCS-SOURCER-END -->
