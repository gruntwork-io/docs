import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# S3 Bucket

Deploy an S3 bucket for data storage, with support for access logging, versioning and replication.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/data-stores/s3-bucket" className="link-button">View on GitHub</a>

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
        <td><a name="access_logging_bucket" href="#access_logging_bucket" className="snap-top"><code>access_logging_bucket</code></a></td>
        <td>The S3 bucket where access logs for this bucket should be stored. Set to null to disable access logging.</td>
    </tr><tr>
        <td><a name="access_logging_bucket_ownership" href="#access_logging_bucket_ownership" className="snap-top"><code>access_logging_bucket_ownership</code></a></td>
        <td>Configure who will be the default owner of objects uploaded to the access logs S3 bucket: must be one of BucketOwnerPreferred (the bucket owner owns objects), ObjectWriter (the writer of each object owns that object), or null (don't configure this feature). Note that this setting only takes effect if the object is uploaded with the bucket-owner-full-control canned ACL. See https://docs.aws.amazon.com/AmazonS3/latest/dev/about-object-ownership.html for more info.</td>
    </tr><tr>
        <td><a name="access_logging_bucket_policy_statements" href="#access_logging_bucket_policy_statements" className="snap-top"><code>access_logging_bucket_policy_statements</code></a></td>
        <td>The IAM policy to apply to the S3 bucket used to store access logs. You can use this to grant read/write access. This should be a map, where each key is a unique statement ID (SID), and each value is an object that contains the parameters defined in the comment above.</td>
    </tr><tr>
        <td><a name="access_logging_prefix" href="#access_logging_prefix" className="snap-top"><code>access_logging_prefix</code></a></td>
        <td>A prefix (i.e., folder path) to use for all access logs stored in access_logging_bucket. Only used if access_logging_bucket is specified.</td>
    </tr><tr>
        <td><a name="bucket_ownership" href="#bucket_ownership" className="snap-top"><code>bucket_ownership</code></a></td>
        <td>Configure who will be the default owner of objects uploaded to this S3 bucket: must be one of BucketOwnerPreferred (the bucket owner owns objects), ObjectWriter (the writer of each object owns that object), or null (don't configure this feature). Note that this setting only takes effect if the object is uploaded with the bucket-owner-full-control canned ACL. See https://docs.aws.amazon.com/AmazonS3/latest/dev/about-object-ownership.html for more info.</td>
    </tr><tr>
        <td><a name="bucket_policy_statements" href="#bucket_policy_statements" className="snap-top"><code>bucket_policy_statements</code></a></td>
        <td>The IAM policy to apply to this S3 bucket. You can use this to grant read/write access. This should be a map, where each key is a unique statement ID (SID), and each value is an object that contains the parameters defined in the comment above.</td>
    </tr><tr>
        <td><a name="bucket_sse_algorithm" href="#bucket_sse_algorithm" className="snap-top"><code>bucket_sse_algorithm</code></a></td>
        <td>The server-side encryption algorithm to use on the bucket. Valid values are AES256 and aws:kms. To disable server-side encryption, set var.enable_sse to false.</td>
    </tr><tr>
        <td><a name="cors_rules" href="#cors_rules" className="snap-top"><code>cors_rules</code></a></td>
        <td>CORS rules to set on this S3 bucket</td>
    </tr><tr>
        <td><a name="enable_sse" href="#enable_sse" className="snap-top"><code>enable_sse</code></a></td>
        <td>Set to true to enable server-side encryption for this bucket. You can control the algorithm using var.sse_algorithm.</td>
    </tr><tr>
        <td><a name="enable_versioning" href="#enable_versioning" className="snap-top"><code>enable_versioning</code></a></td>
        <td>Set to true to enable versioning for this bucket. If enabled, instead of overriding objects, the S3 bucket will always create a new version of each object, so all the old values are retained.</td>
    </tr><tr>
        <td><a name="force_destroy_logs" href="#force_destroy_logs" className="snap-top"><code>force_destroy_logs</code></a></td>
        <td>If set to true, when you run 'terraform destroy', delete all objects from the logs bucket so that the bucket can be destroyed without error. Warning: these objects are not recoverable so only use this if you're absolutely sure you want to permanently delete everything!</td>
    </tr><tr>
        <td><a name="force_destroy_primary" href="#force_destroy_primary" className="snap-top"><code>force_destroy_primary</code></a></td>
        <td>If set to true, when you run 'terraform destroy', delete all objects from the primary bucket so that the bucket can be destroyed without error. Warning: these objects are not recoverable so only use this if you're absolutely sure you want to permanently delete everything!</td>
    </tr><tr>
        <td><a name="force_destroy_replica" href="#force_destroy_replica" className="snap-top"><code>force_destroy_replica</code></a></td>
        <td>If set to true, when you run 'terraform destroy', delete all objects from the replica bucket so that the bucket can be destroyed without error. Warning: these objects are not recoverable so only use this if you're absolutely sure you want to permanently delete everything!</td>
    </tr><tr>
        <td><a name="mfa_delete" href="#mfa_delete" className="snap-top"><code>mfa_delete</code></a></td>
        <td>Enable MFA delete for either 'Change the versioning state of your bucket' or 'Permanently delete an object version'. This cannot be used to toggle this setting but is available to allow managed buckets to reflect the state in AWS. Only used if enable_versioning is true. For instructions on how to enable MFA Delete, check out the README from the terraform-aws-security/private-s3-bucket module.</td>
    </tr><tr>
        <td><a name="primary_bucket" href="#primary_bucket" className="snap-top"><code>primary_bucket</code></a></td>
        <td>What to name the S3 bucket. Note that S3 bucket names must be globally unique across all AWS users!</td>
    </tr><tr>
        <td><a name="replica_bucket" href="#replica_bucket" className="snap-top"><code>replica_bucket</code></a></td>
        <td>The S3 bucket that will be the replica of this bucket. Set to null to disable replication.</td>
    </tr><tr>
        <td><a name="replica_bucket_already_exists" href="#replica_bucket_already_exists" className="snap-top"><code>replica_bucket_already_exists</code></a></td>
        <td>If set to true, replica bucket will be expected to already exist.</td>
    </tr><tr>
        <td><a name="replica_bucket_ownership" href="#replica_bucket_ownership" className="snap-top"><code>replica_bucket_ownership</code></a></td>
        <td>Configure who will be the default owner of objects uploaded to the replica S3 bucket: must be one of BucketOwnerPreferred (the bucket owner owns objects), ObjectWriter (the writer of each object owns that object), or null (don't configure this feature). Note that this setting only takes effect if the object is uploaded with the bucket-owner-full-control canned ACL. See https://docs.aws.amazon.com/AmazonS3/latest/dev/about-object-ownership.html for more info.</td>
    </tr><tr>
        <td><a name="replica_bucket_policy_statements" href="#replica_bucket_policy_statements" className="snap-top"><code>replica_bucket_policy_statements</code></a></td>
        <td>The IAM policy to apply to the replica S3 bucket. You can use this to grant read/write access. This should be a map, where each key is a unique statement ID (SID), and each value is an object that contains the parameters defined in the comment above.</td>
    </tr><tr>
        <td><a name="replica_enable_sse" href="#replica_enable_sse" className="snap-top"><code>replica_enable_sse</code></a></td>
        <td>Set to true to enable server-side encryption for the replica bucket. You can control the algorithm using var.replica_sse_algorithm.</td>
    </tr><tr>
        <td><a name="replica_region" href="#replica_region" className="snap-top"><code>replica_region</code></a></td>
        <td>The AWS region for the replica bucket.</td>
    </tr><tr>
        <td><a name="replica_sse_algorithm" href="#replica_sse_algorithm" className="snap-top"><code>replica_sse_algorithm</code></a></td>
        <td>The server-side encryption algorithm to use on the replica bucket. Valid values are AES256 and aws:kms. To disable server-side encryption, set var.replica_enable_sse to false.</td>
    </tr><tr>
        <td><a name="replication_role" href="#replication_role" className="snap-top"><code>replication_role</code></a></td>
        <td>The ARN of the IAM role for Amazon S3 to assume when replicating objects. Only used if replication_bucket is specified.</td>
    </tr><tr>
        <td><a name="replication_rules" href="#replication_rules" className="snap-top"><code>replication_rules</code></a></td>
        <td>The rules for managing replication. Only used if replication_bucket is specified. This should be a map, where the key is a unique ID for each replication rule and the value is an object of the form explained in a comment above.</td>
    </tr><tr>
        <td><a name="tags" href="#tags" className="snap-top"><code>tags</code></a></td>
        <td>A map of tags to apply to the S3 Bucket. These tags will also be applied to the access logging and replica buckets (if any). The key is the tag name and the value is the tag value.</td>
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
        <td><a name="access_logging_bucket_name" href="#access_logging_bucket_name" className="snap-top"><code>access_logging_bucket_name</code></a></td>
        <td>The name of the access logging S3 bucket.</td>
    </tr><tr>
        <td><a name="hosted_zone_id" href="#hosted_zone_id" className="snap-top"><code>hosted_zone_id</code></a></td>
        <td>The Route 53 Hosted Zone ID for this bucket's region.</td>
    </tr><tr>
        <td><a name="primary_bucket_arn" href="#primary_bucket_arn" className="snap-top"><code>primary_bucket_arn</code></a></td>
        <td>The ARN of the S3 bucket.</td>
    </tr><tr>
        <td><a name="primary_bucket_domain_name" href="#primary_bucket_domain_name" className="snap-top"><code>primary_bucket_domain_name</code></a></td>
        <td>The bucket domain name. Will be of format bucketname.s3.amazonaws.com.</td>
    </tr><tr>
        <td><a name="primary_bucket_name" href="#primary_bucket_name" className="snap-top"><code>primary_bucket_name</code></a></td>
        <td>The name of the primary S3 bucket.</td>
    </tr><tr>
        <td><a name="primary_bucket_regional_domain_name" href="#primary_bucket_regional_domain_name" className="snap-top"><code>primary_bucket_regional_domain_name</code></a></td>
        <td>The bucket region-specific domain name. The bucket domain name including the region name, please refer here for format. Note: The AWS CloudFront allows specifying S3 region-specific endpoint when creating S3 origin, it will prevent redirect issues from CloudFront to S3 Origin URL.</td>
    </tr><tr>
        <td><a name="replica_bucket_name" href="#replica_bucket_name" className="snap-top"><code>replica_bucket_name</code></a></td>
        <td>The name of the replica S3 bucket.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"18a2e5d2703fe99d1e070f69f12c4e80"}
##DOCS-SOURCER-END -->
