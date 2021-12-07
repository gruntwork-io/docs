import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Amazon ECR Repositories

Create and manage multiple Amazon Elastic Container Repository (ECR) Repositories that can be used to store your Docker images.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/data-stores/ecr-repos" className="link-button">View on GitHub</a>

### Reference

<Tabs>
  <TabItem value="inputs" label="Inputs" default>
    <ul>
      
    <li>
      <p>
        <a name="default_automatic_image_scanning" href="#default_automatic_image_scanning" className="snap-top">
          <code>default_automatic_image_scanning</code>
        </a> - Whether or not to enable image scanning on all the repos. Can be overridden on a per repo basis by the enable_automatic_image_scanning property in the repositories map.
      </p>
    </li>
    <li>
      <p>
        <a name="default_encryption_config" href="#default_encryption_config" className="snap-top">
          <code>default_encryption_config</code>
        </a> - The default encryption configuration to apply to the created ECR repository. When null, the images in the ECR repo will not be encrypted at rest. Can be overridden on a per repo basis by the encryption_config property in the repositories map.
      </p>
    </li>
    <li>
      <p>
        <a name="default_external_account_ids_with_read_access" href="#default_external_account_ids_with_read_access" className="snap-top">
          <code>default_external_account_ids_with_read_access</code>
        </a> - The default list of AWS account IDs for external AWS accounts that should be able to pull images from these ECR repos. Can be overridden on a per repo basis by the external_account_ids_with_read_access property in the repositories map.
      </p>
    </li>
    <li>
      <p>
        <a name="default_external_account_ids_with_write_access" href="#default_external_account_ids_with_write_access" className="snap-top">
          <code>default_external_account_ids_with_write_access</code>
        </a> - The default list of AWS account IDs for external AWS accounts that should be able to pull and push images to these ECR repos. Can be overridden on a per repo basis by the external_account_ids_with_write_access property in the repositories map.
      </p>
    </li>
    <li>
      <p>
        <a name="default_image_tag_mutability" href="#default_image_tag_mutability" className="snap-top">
          <code>default_image_tag_mutability</code>
        </a> - The tag mutability setting for all the repos. Must be one of: MUTABLE or IMMUTABLE. Can be overridden on a per repo basis by the image_tag_mutability property in the repositories map.
      </p>
    </li>
    <li>
      <p>
        <a name="global_tags" href="#global_tags" className="snap-top">
          <code>global_tags</code>
        </a> - A map of tags (where the key and value correspond to tag keys and values) that should be assigned to all ECR repositories.
      </p>
    </li>
    <li>
      <p>
        <a name="repositories" href="#repositories" className="snap-top">
          <code>repositories</code>
        </a> - A map of repo names to configurations for that repository.
      </p>
    </li>
    </ul>
  </TabItem>
  <TabItem value="outputs" label="Outputs">
    <ul>
      
    <li>
      <p>
        <a name="ecr_read_policy_actions" href="#ecr_read_policy_actions" className="snap-top">
          <code>ecr_read_policy_actions</code>
        </a> - A list of IAM policy actions necessary for ECR read access.
      </p>
    </li>
    <li>
      <p>
        <a name="ecr_repo_arns" href="#ecr_repo_arns" className="snap-top">
          <code>ecr_repo_arns</code>
        </a> - A map of repository name to its ECR ARN.
      </p>
    </li>
    <li>
      <p>
        <a name="ecr_repo_urls" href="#ecr_repo_urls" className="snap-top">
          <code>ecr_repo_urls</code>
        </a> - A map of repository name to its URL.
      </p>
    </li>
    <li>
      <p>
        <a name="ecr_write_policy_actions" href="#ecr_write_policy_actions" className="snap-top">
          <code>ecr_write_policy_actions</code>
        </a> - A list of IAM policy actions necessary for ECR write access.
      </p>
    </li>
    </ul>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"28ee2fd0c51fde30c66c6fc95cb138c9"}
##DOCS-SOURCER-END -->
