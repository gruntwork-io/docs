import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# S3 Bucket

Deploy an S3 bucket for data storage, with support for access logging, versioning and replication.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/data-stores/s3-bucket" class="link-button">View on GitHub</a>

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
        <td>access_logging_bucket</td>
        <td>The S3 bucket where access logs for this bucket should be stored. Set to null to disable access logging.</td>
    </tr><tr>
        <td>access_logging_bucket_ownership</td>
        <td>Configure who will be the default owner of objects uploaded to the access logs S3 bucket: must be one of BucketOwnerPreferred (the bucket owner owns objects), ObjectWriter (the writer of each object owns that object), or null (don't configure this feature). Note that this setting only takes effect if the object is uploaded with the bucket-owner-full-control canned ACL. See https://docs.aws.amazon.com/AmazonS3/latest/dev/about-object-ownership.html for more info.</td>
    </tr><tr>
        <td>access_logging_bucket_policy_statements</td>
        <td>The IAM policy to apply to the S3 bucket used to store access logs. You can use this to grant read/write access. This should be a map, where each key is a unique statement ID (SID), and each value is an object that contains the parameters defined in the comment above.</td>
    </tr><tr>
        <td>access_logging_prefix</td>
        <td>A prefix (i.e., folder path) to use for all access logs stored in access_logging_bucket. Only used if access_logging_bucket is specified.</td>
    </tr><tr>
        <td>bucket_ownership</td>
        <td>Configure who will be the default owner of objects uploaded to this S3 bucket: must be one of BucketOwnerPreferred (the bucket owner owns objects), ObjectWriter (the writer of each object owns that object), or null (don't configure this feature). Note that this setting only takes effect if the object is uploaded with the bucket-owner-full-control canned ACL. See https://docs.aws.amazon.com/AmazonS3/latest/dev/about-object-ownership.html for more info.</td>
    </tr><tr>
        <td>bucket_policy_statements</td>
        <td>The IAM policy to apply to this S3 bucket. You can use this to grant read/write access. This should be a map, where each key is a unique statement ID (SID), and each value is an object that contains the parameters defined in the comment above.</td>
    </tr><tr>
        <td>bucket_sse_algorithm</td>
        <td>The server-side encryption algorithm to use on the bucket. Valid values are AES256 and aws:kms. To disable server-side encryption, set var.enable_sse to false.</td>
    </tr><tr>
        <td>cors_rules</td>
        <td>CORS rules to set on this S3 bucket</td>
    </tr><tr>
        <td>enable_sse</td>
        <td>Set to true to enable server-side encryption for this bucket. You can control the algorithm using var.sse_algorithm.</td>
    </tr><tr>
        <td>enable_versioning</td>
        <td>Set to true to enable versioning for this bucket. If enabled, instead of overriding objects, the S3 bucket will always create a new version of each object, so all the old values are retained.</td>
    </tr><tr>
        <td>force_destroy_logs</td>
        <td>If set to true, when you run 'terraform destroy', delete all objects from the logs bucket so that the bucket can be destroyed without error. Warning: these objects are not recoverable so only use this if you're absolutely sure you want to permanently delete everything!</td>
    </tr><tr>
        <td>force_destroy_primary</td>
        <td>If set to true, when you run 'terraform destroy', delete all objects from the primary bucket so that the bucket can be destroyed without error. Warning: these objects are not recoverable so only use this if you're absolutely sure you want to permanently delete everything!</td>
    </tr><tr>
        <td>force_destroy_replica</td>
        <td>If set to true, when you run 'terraform destroy', delete all objects from the replica bucket so that the bucket can be destroyed without error. Warning: these objects are not recoverable so only use this if you're absolutely sure you want to permanently delete everything!</td>
    </tr><tr>
        <td>mfa_delete</td>
        <td>Enable MFA delete for either 'Change the versioning state of your bucket' or 'Permanently delete an object version'. This cannot be used to toggle this setting but is available to allow managed buckets to reflect the state in AWS. Only used if enable_versioning is true. For instructions on how to enable MFA Delete, check out the README from the terraform-aws-security/private-s3-bucket module.</td>
    </tr><tr>
        <td>primary_bucket</td>
        <td>What to name the S3 bucket. Note that S3 bucket names must be globally unique across all AWS users!</td>
    </tr><tr>
        <td>replica_bucket</td>
        <td>The S3 bucket that will be the replica of this bucket. Set to null to disable replication.</td>
    </tr><tr>
        <td>replica_bucket_already_exists</td>
        <td>If set to true, replica bucket will be expected to already exist.</td>
    </tr><tr>
        <td>replica_bucket_ownership</td>
        <td>Configure who will be the default owner of objects uploaded to the replica S3 bucket: must be one of BucketOwnerPreferred (the bucket owner owns objects), ObjectWriter (the writer of each object owns that object), or null (don't configure this feature). Note that this setting only takes effect if the object is uploaded with the bucket-owner-full-control canned ACL. See https://docs.aws.amazon.com/AmazonS3/latest/dev/about-object-ownership.html for more info.</td>
    </tr><tr>
        <td>replica_bucket_policy_statements</td>
        <td>The IAM policy to apply to the replica S3 bucket. You can use this to grant read/write access. This should be a map, where each key is a unique statement ID (SID), and each value is an object that contains the parameters defined in the comment above.</td>
    </tr><tr>
        <td>replica_enable_sse</td>
        <td>Set to true to enable server-side encryption for the replica bucket. You can control the algorithm using var.replica_sse_algorithm.</td>
    </tr><tr>
        <td>replica_region</td>
        <td>The AWS region for the replica bucket.</td>
    </tr><tr>
        <td>replica_sse_algorithm</td>
        <td>The server-side encryption algorithm to use on the replica bucket. Valid values are AES256 and aws:kms. To disable server-side encryption, set var.replica_enable_sse to false.</td>
    </tr><tr>
        <td>replication_role</td>
        <td>The ARN of the IAM role for Amazon S3 to assume when replicating objects. Only used if replication_bucket is specified.</td>
    </tr><tr>
        <td>replication_rules</td>
        <td>The rules for managing replication. Only used if replication_bucket is specified. This should be a map, where the key is a unique ID for each replication rule and the value is an object of the form explained in a comment above.</td>
    </tr><tr>
        <td>tags</td>
        <td>A map of tags to apply to the S3 Bucket. These tags will also be applied to the access logging and replica buckets (if any). The key is the tag name and the value is the tag value.</td>
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
        <td>access_logging_bucket_name</td>
        <td>The name of the access logging S3 bucket.</td>
    </tr><tr>
        <td>hosted_zone_id</td>
        <td>The Route 53 Hosted Zone ID for this bucket's region.</td>
    </tr><tr>
        <td>primary_bucket_arn</td>
        <td>The ARN of the S3 bucket.</td>
    </tr><tr>
        <td>primary_bucket_domain_name</td>
        <td>The bucket domain name. Will be of format bucketname.s3.amazonaws.com.</td>
    </tr><tr>
        <td>primary_bucket_name</td>
        <td>The name of the primary S3 bucket.</td>
    </tr><tr>
        <td>primary_bucket_regional_domain_name</td>
        <td>The bucket region-specific domain name. The bucket domain name including the region name, please refer here for format. Note: The AWS CloudFront allows specifying S3 region-specific endpoint when creating S3 origin, it will prevent redirect issues from CloudFront to S3 Origin URL.</td>
    </tr><tr>
        <td>replica_bucket_name</td>
        <td>The name of the replica S3 bucket.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"dd27af5eda8f811ff4a3e6426fb127dd"}
##DOCS-SOURCER-END -->
