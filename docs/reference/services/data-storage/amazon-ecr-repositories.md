import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Amazon ECR Repositories

Create and manage multiple Amazon Elastic Container Repository (ECR) Repositories that can be used to store your Docker images.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/data-stores/ecr-repos" className="link-button">View on GitHub</a>

### Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<a name="default_automatic_image_scanning" className="snap-top"></a>

* [**`default_automatic_image_scanning`**](#default_automatic_image_scanning) &mdash; Whether or not to enable image scanning on all the repos. Can be overridden on a per repo basis by the [`enable_automatic_image_scanning`](#enable_automatic_image_scanning) property in the repositories map.

<a name="default_encryption_config" className="snap-top"></a>

* [**`default_encryption_config`**](#default_encryption_config) &mdash; The default encryption configuration to apply to the created ECR repository. When null, the images in the ECR repo will not be encrypted at rest. Can be overridden on a per repo basis by the [`encryption_config`](#encryption_config) property in the repositories map.

<a name="default_external_account_ids_with_read_access" className="snap-top"></a>

* [**`default_external_account_ids_with_read_access`**](#default_external_account_ids_with_read_access) &mdash; The default list of AWS account IDs for external AWS accounts that should be able to pull images from these ECR repos. Can be overridden on a per repo basis by the [`external_account_ids_with_read_access`](#external_account_ids_with_read_access) property in the repositories map.

<a name="default_external_account_ids_with_write_access" className="snap-top"></a>

* [**`default_external_account_ids_with_write_access`**](#default_external_account_ids_with_write_access) &mdash; The default list of AWS account IDs for external AWS accounts that should be able to pull and push images to these ECR repos. Can be overridden on a per repo basis by the [`external_account_ids_with_write_access`](#external_account_ids_with_write_access) property in the repositories map.

<a name="default_image_tag_mutability" className="snap-top"></a>

* [**`default_image_tag_mutability`**](#default_image_tag_mutability) &mdash; The tag mutability setting for all the repos. Must be one of: MUTABLE or IMMUTABLE. Can be overridden on a per repo basis by the [`image_tag_mutability`](#image_tag_mutability) property in the repositories map.

<a name="default_lifecycle_policy_rules" className="snap-top"></a>

* [**`default_lifecycle_policy_rules`**](#default_lifecycle_policy_rules) &mdash; Add lifecycle policy to ECR repo.

<a name="global_tags" className="snap-top"></a>

* [**`global_tags`**](#global_tags) &mdash; A map of tags (where the key and value correspond to tag keys and values) that should be assigned to all ECR repositories.

<a name="replication_regions" className="snap-top"></a>

* [**`replication_regions`**](#replication_regions) &mdash; List of regions (e.g., us-east-1) to replicate the ECR repository to.

<a name="repositories" className="snap-top"></a>

* [**`repositories`**](#repositories) &mdash; A map of repo names to configurations for that repository.

</TabItem>
<TabItem value="outputs" label="Outputs">

<a name="ecr_read_policy_actions" className="snap-top"></a>

* [**`ecr_read_policy_actions`**](#ecr_read_policy_actions) &mdash; A list of IAM policy actions necessary for ECR read access.

<a name="ecr_repo_arns" className="snap-top"></a>

* [**`ecr_repo_arns`**](#ecr_repo_arns) &mdash; A map of repository name to its ECR ARN.

<a name="ecr_repo_urls" className="snap-top"></a>

* [**`ecr_repo_urls`**](#ecr_repo_urls) &mdash; A map of repository name to its URL.

<a name="ecr_write_policy_actions" className="snap-top"></a>

* [**`ecr_write_policy_actions`**](#ecr_write_policy_actions) &mdash; A list of IAM policy actions necessary for ECR write access.

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"6f96cf09810f77caa69e6c8e03f93e81"}
##DOCS-SOURCER-END -->
