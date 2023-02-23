# CloudTrail

You’ll want to enable CloudTrail in every single AWS account so that you have an audit log of the major activity
happening in the account. We typically recommend that you aggregate these logs in the logs account. To do this, you:

1. Create an S3 bucket in the logs account, and grant the CloudTrail service in all accounts permissions to write
    to this bucket.

2. Create a KMS Customer Master Key (CMK) in the logs account and grant the CloudTrail service in all accounts
    permissions to encrypt data with this CMK.

3. Enable CloudTrail in all accounts, configuring it to encrypt data with the CMK in the logs account and write data
    to the S3 bucket in the logs account.

4. (Optional) Configure CloudTrail to also send logs to CloudWatch Logs within each account. This gives you an
    additional way to quickly view recent CloudTrail data for an account in the account itself, without having to login
    to the logs account.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"4ef96ebe041d1549530790269f1c7dff"}
##DOCS-SOURCER-END -->
