# AWS Config

You’ll want to enable AWS Config in every one of your AWS accounts, plus any AWS Config Rules that are relevant to your
company, so that you can track AWS resource configuration changes over time and enforce company policy. Note that you
should enable AWS Config in every AWS region, and not just the region(s) you’re using for the rest of your infrastructure.
That way, if an employee (perhaps accidentally), or even worse, an attacker, runs something in a region you don’t typically
use, it’ll still be recorded in AWS Config, and your rules will still be enforced.

We typically recommend that you aggregate AWS Config data in the logs account. To do this, you:

1. Create an S3 bucket in the logs account and grant the AWS Config service in all accounts write access to this
    bucket.

2. Enable AWS Config in all accounts, configuring them to send data to the S3 bucket in the logs account.

3. Create an SNS topic in each region of the logs account, and set up AWS Config in each region of each account to send SNS notifications to the topic in the corresponding region of the logs account. This is because Config cannot send notifications to topics in other regions.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"fe326f40c8b8ed46a200d6adef9a1f2b"}
##DOCS-SOURCER-END -->
