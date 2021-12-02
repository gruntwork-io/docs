import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Gruntwork Access

Grant the Gruntwork team access to one of your AWS accounts so we can deploy a Reference Architecture for you or help with troubleshooting!

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/landingzone/gruntwork-access" className="link-button">View on GitHub</a>

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
        <td><a name="grant_security_account_access" href="#grant_security_account_access" className="snap-top"><code>grant_security_account_access</code></a></td>
        <td>Set to true to grant your security account, with the account ID specified in var.security_account_id, access to the IAM role. This is required for deploying a Reference Architecture.</td>
    </tr><tr>
        <td><a name="gruntwork_aws_account_id" href="#gruntwork_aws_account_id" className="snap-top"><code>gruntwork_aws_account_id</code></a></td>
        <td>The ID of the AWS account that will be allowed to assume the IAM role.</td>
    </tr><tr>
        <td><a name="iam_role_name" href="#iam_role_name" className="snap-top"><code>iam_role_name</code></a></td>
        <td>The name to use for the IAM role</td>
    </tr><tr>
        <td><a name="managed_policy_name" href="#managed_policy_name" className="snap-top"><code>managed_policy_name</code></a></td>
        <td>The name of the AWS Managed Policy to attach to the IAM role. To deploy a Reference Architecture, the Gruntwork team needs AdministratorAccess, so this is the default.</td>
    </tr><tr>
        <td><a name="require_mfa" href="#require_mfa" className="snap-top"><code>require_mfa</code></a></td>
        <td>If set to true, require MFA to assume the IAM role from the Gruntwork account.</td>
    </tr><tr>
        <td><a name="security_account_id" href="#security_account_id" className="snap-top"><code>security_account_id</code></a></td>
        <td>The ID of your security account (where IAM users are defined). Required for deploying a Reference Architecture, as the Gruntwork team deploys an EC2 instance in the security account, and that instance assumes this IAM role to get access to all the other child accounts and bootstrap the deployment process.</td>
    </tr><tr>
        <td><a name="tags" href="#tags" className="snap-top"><code>tags</code></a></td>
        <td>Tags to apply to all resources created by this module</td>
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
        <td><a name="iam_role_arn" href="#iam_role_arn" className="snap-top"><code>iam_role_arn</code></a></td>
        <td>The ARN of the IAM role</td>
    </tr><tr>
        <td><a name="iam_role_name" href="#iam_role_name" className="snap-top"><code>iam_role_name</code></a></td>
        <td>The name of the IAM role</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"23f618ef5ad121363cacf0a6a30e6b18"}
##DOCS-SOURCER-END -->
