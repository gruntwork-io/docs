import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Amazon ECR Repositories

Create and manage multiple Amazon Elastic Container Repository (ECR) Repositories that can be used to store your Docker images.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/data-stores/ecr-repos" class="link-button">View on GitHub</a>

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
        <td>default_automatic_image_scanning</td>
        <td>Whether or not to enable image scanning on all the repos. Can be overridden on a per repo basis by the enable_automatic_image_scanning property in the repositories map.</td>
    </tr><tr>
        <td>default_encryption_config</td>
        <td>The default encryption configuration to apply to the created ECR repository. When null, the images in the ECR repo will not be encrypted at rest. Can be overridden on a per repo basis by the encryption_config property in the repositories map.</td>
    </tr><tr>
        <td>default_external_account_ids_with_read_access</td>
        <td>The default list of AWS account IDs for external AWS accounts that should be able to pull images from these ECR repos. Can be overridden on a per repo basis by the external_account_ids_with_read_access property in the repositories map.</td>
    </tr><tr>
        <td>default_external_account_ids_with_write_access</td>
        <td>The default list of AWS account IDs for external AWS accounts that should be able to pull and push images to these ECR repos. Can be overridden on a per repo basis by the external_account_ids_with_write_access property in the repositories map.</td>
    </tr><tr>
        <td>default_image_tag_mutability</td>
        <td>The tag mutability setting for all the repos. Must be one of: MUTABLE or IMMUTABLE. Can be overridden on a per repo basis by the image_tag_mutability property in the repositories map.</td>
    </tr><tr>
        <td>global_tags</td>
        <td>A map of tags (where the key and value correspond to tag keys and values) that should be assigned to all ECR repositories.</td>
    </tr><tr>
        <td>repositories</td>
        <td>A map of repo names to configurations for that repository.</td>
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
        <td>ecr_read_policy_actions</td>
        <td>A list of IAM policy actions necessary for ECR read access.</td>
    </tr><tr>
        <td>ecr_repo_arns</td>
        <td>A map of repository name to its ECR ARN.</td>
    </tr><tr>
        <td>ecr_repo_urls</td>
        <td>A map of repository name to its URL.</td>
    </tr><tr>
        <td>ecr_write_policy_actions</td>
        <td>A list of IAM policy actions necessary for ECR write access.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"0a82595d32387ee161a07b658c55eb23"}
##DOCS-SOURCER-END -->
