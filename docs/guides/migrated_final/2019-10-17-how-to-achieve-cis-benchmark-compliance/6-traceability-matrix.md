# Traceability matrix

Use the table below as a quick reference to map the CIS AWS Foundations Benchmark recommendations to the
sections above.

<table>
<colgroup>
<col />
</colgroup>
<tbody>
<tr className="odd">
<td><p>#;Section;Description
1.1;<a href="#security_questions">Answer security questions and complete contact details</a>;Complete the contact details on the AWS account page
1.2;<a href="#security_questions">Answer security questions and complete contact details</a>;Complete the security contact information on the AWS account page
1.3;<a href="#security_questions">Answer security questions and complete contact details</a>;Answer the security questions on the AWS account page
1.4;<a href="#apply_account_baseline_root">Apply the baseline to the root account</a>, <a href="#apply_account_baseline_security">Apply the to the security account</a>, <a href="#apply_account_baseline_logs">Apply the to the logs account</a>;Use the <code>account-baseline-*</code> modules to set up your accounts. This will ensure that the Security Hub service is enabled, which will notify you if the root user has access keys set
1.5;<a href="#root_mfa">Enable MFA for the root account</a>;Manually configure MFA for the root user
1.6;<a href="#root_mfa">Enable MFA for the root account</a>;Use a Yubikey (or other hardware MFA) for the root user
1.7;<a href="#manual_steps_iam">Manual steps</a>;Take manual steps to complete this recommendation
1.8-9;<a href="#apply_account_baseline_security">Apply the to the security account</a>;Use the <code>account-baseline-security</code> module to set up the IAM password policy
1.10;<a href="#configure_authentication">Configure authentication</a>;Configure authentication using SAML or IAM
1.11;<a href="#apply_account_baseline_security">Apply the to the security account</a>;Use the <code>account-baseline-security</code> module to create users
1.12;<a href="#apply_account_baseline_root">Apply the baseline to the root account</a>, <a href="#apply_account_baseline_security">Apply the to the security account</a>, <a href="#apply_account_baseline_logs">Apply the to the logs account</a>;Use the <code>account-baseline-*</code> modules to set up your accounts. This will ensure that there are no unused credentials
1.13;<a href="#apply_account_baseline_root">Apply the baseline to the root account</a>, <a href="#apply_account_baseline_security">Apply the to the security account</a>, <a href="#apply_account_baseline_logs">Apply the to the logs account</a>;Use the <code>account-baseline-*</code> modules to set up your accounts. This will ensure that there are no extra access keys
1.14;<a href="#apply_account_baseline_root">Apply the baseline to the root account</a>, <a href="#apply_account_baseline_security">Apply the to the security account</a>, <a href="#apply_account_baseline_logs">Apply the to the logs account</a>;Use the <code>account-baseline-*</code> modules to set up your accounts. This will ensure that there are no unused access keys
1.15;<a href="#apply_account_baseline_security">Apply the to the security account</a>;Use the <code>account-baseline-security</code> module to create users and groups
1.16;<a href="#apply_account_baseline_security">Apply the to the security account</a>;Use the <code>account-baseline-security</code> module to ensure no full-access policies are attached to any groups or users
1.17;<a href="#apply_account_baseline_security">Apply the to the security account</a>;Use the <code>account-baseline-security</code> module to create a support group
1.18;<a href="#iam_roles_for_instances">Use IAM roles for EC2 instances</a>;Use Gruntwork modules to ensure EC2 instances use roles for access
1.19;<a href="#cleanup_expired_certs">Cleanup Expired SSL/TLS certificates</a>;Use Gruntwork modules to automatically remove expired certificates from IAM
1.20;<a href="#iam_access_analyzer">IAM Access Analyzer</a>;Use Gruntwork modules to enable IAM Access Analyzer across regions
1.21;<a href="#apply_account_baseline_root">Apply the baseline to the root account</a>, <a href="#apply_account_baseline_security">Apply the to the security account</a>, <a href="#apply_account_baseline_logs">Apply the to the logs account</a>;Use the <code>account-baseline-*</code> modules to set up your accounts. This will ensure IAM users are managed centrally through the user of AWS Organizations.
2.1.1-2.1.2;<a href="#s3_buckets_deployment">S3 Buckets</a>;Use the <code>private-s3-bucket</code> module
2.1.3;<a href="#s3_buckets_deployment">S3 Buckets</a>;Use the <code>private-s3-bucket</code> module and follow the instructions in the README
2.1.4;<a href="#apply_account_baseline_root">Apply the baseline to the root account</a>, <a href="#apply_account_baseline_security">Apply the to the security account</a>, <a href="#apply_account_baseline_logs">Apply the to the logs account</a>;Use the <code>account-baseline-*</code> modules to set up your accounts. This will ensure Amazon Macie is enabled.
2.1.5;<a href="#s3_buckets_deployment">S3 Buckets</a>;Use the <code>private-s3-bucket</code> module
2.2.1;<a href="#configure_ebs_encryption">Configure EBS Encryption</a>;Use Gruntwork modules to configure AWS EBS encryption
2.3.1;<a href="#configure_rds_encryption">Configure RDS Encryption</a>;Use Gruntwork modules to configure AWS RDS encryption
3.1-3.4;<a href="#apply_account_baseline_logs">Apply the to the logs account</a>;Use the <code>account-baseline-*</code> modules to ensure CloudTrail is enabled and configured in all regions
3.5;<a href="#apply_account_baseline_security">Apply the to the security account</a>;Use the <code>account-baseline-security</code> module to ensure AWS Config is enabled in all regions
3.6;<a href="#apply_account_baseline_logs">Apply the to the logs account</a>;Use the <code>account-baseline-*</code> modules to ensure CloudTrail S3 bucket has access logging enabled
3.7;<a href="#apply_account_baseline_logs">Apply the to the logs account</a>;Use the <code>account-baseline-*</code> modules to ensure CloudTrail logs are encrypted at rest using KMS CMKs
3.8;<a href="#enable_key_rotation_for_kms">Enable key rotation for KMS keys</a>;Use the KMS module
3.9;<a href="#vpc_flow_logs">Create VPC flow logs</a>;Use the Gruntwork CIS-compliant <code>vpc</code> service to provision VPCs with flow logs enabled
3.10-3.11;<a href="#apply_account_baseline_logs">Apply the to the logs account</a>;Use the <code>account-baseline-*</code> modules to ensure Object-level logging is enabled for S3 buckets for read and write events
4.1-4.15;<a href="#maintain_compliance_monitoring">Maintaining compliance by following Monitoring best practices</a>;The CloudWatch Logs metrics filters wrapper module will satisfy each recommendation
5.1;<a href="#maintain_compliance_networking">Maintaining compliance by following Networking best practices</a>;Use the Gruntwork CIS-compliant <code>vpc</code> service to ensure there is no public remote access
5.2;<a href="#maintain_compliance_networking">Maintaining compliance by following Networking best practices</a>;Use the Gruntwork CIS-compliant <code>vpc</code> service for a secure network configuration
5.3;<a href="#maintain_compliance_networking">Maintaining compliance by following Networking best practices</a>;Use the <code>cloud-nuke</code> tool to remove all default security groups
5.4;<a href="#maintain_compliance_networking">Maintaining compliance by following Networking best practices</a>;Use the Gruntwork CIS-compliant <code>vpc</code> service to configure least-privilege routing by default</p></td>
</tr>
</tbody>
</table>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"b93afba774aafe90569b82531fa11f1d"}
##DOCS-SOURCER-END -->
