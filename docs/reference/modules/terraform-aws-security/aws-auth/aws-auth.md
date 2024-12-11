---
title: "AWS Auth Helper"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="0.74.6" lastModifiedVersion="0.65.9"/>

# AWS Auth Helper

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v0.74.6/modules/aws-auth" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.65.9" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module is a small wrapper script for the [AWS CLI](https://aws.amazon.com/cli/) that makes it much easier to
authenticate to AWS when:

1.  [Multi-factor authentication (MFA)](https://aws.amazon.com/premiumsupport/knowledge-center/authenticate-mfa-cli/) is
    enabled, and/or
2.  [You want to assume an IAM Role](http://docs.aws.amazon.com/cli/latest/reference/sts/assume-role.html), such as an
    IAM role that gives you access to another AWS account.

## Motivation

Normally, if MFA is enabled, setting up your credentials as environment variables is a multi-step process. First, you
make the call to fetch the temporary STS credentials:

```bash
aws sts get-session-token --serial-number arn:aws:iam::123456789011:mfa/jondoe --token-code 123456
```

Which returns a blob of JSON:

```json
{
  "Credentials": {
    "AccessKeyId": "AAA",
    "SecretAccessKey": "BBB",
    "SessionToken": "CCC",
    "Expiration": "DDD"
  }
}
```

Next, you have to copy and paste each part of that JSON output into the proper environment variable:

```bash
export AWS_ACCESS_KEY_ID='AAA'
export AWS_SECRET_ACCESS_KEY='BBB'
export AWS_SESSION_TOKEN='CCC'
export AWS_SESSION_EXPIRATION='DDD'
```

If you want to assume an IAM role, you have to make another API call:

```bash
aws sts assume-role --role-arn arn:aws:iam::123456789011:role/my-role --role-session-name my-name 
```

Which returns another blob of JSON:

```json
{
  "Credentials": {
    "AccessKeyId": "EEE",
    "SecretAccessKey": "FFF",
    "SessionToken": "GGG",
    "Expiration": "HHH"
  }
}
```

Which you again have to copy into the proper environment variable:

```bash
export AWS_ACCESS_KEY_ID='EEE'
export AWS_SECRET_ACCESS_KEY='FFF'
export AWS_SESSION_TOKEN='GGG'
export AWS_SESSION_EXPIRATION='HHH'
```

With this script, all of this can be done in a single command!

## Quick start

### Install aws-auth

To install the script, you can either copy it manually to a location on your `PATH` or use the
[gruntwork-install](https://github.com/gruntwork-io/gruntwork-installer) command:

```bash
gruntwork-install --module-name 'aws-auth' --repo 'https://github.com/gruntwork-io/terraform-aws-security' --tag 'v0.6.5'
```

### Usage

*WARNING! Before running the following commands, authenticate to the AWS account that contains your IAM User using your
static API Access Key ID and Secret Key.*

*We strongly recommend using a password manager like [1Password](https://1password.com/) or [pass](https://www.passwordstore.org/) to store any static credentials so they don't sit unencrypted on your local disk.
Internally, the Grunts at Gruntwork use pass with a unique GPG Key for each set of secrets.*

#### Authenticate to an AWS Account using MFA

```bash
aws-auth --serial-number arn:aws:iam::123456789011:mfa/jondoe --token-code 123456
```

Find the Serial Number ARN by viewing your IAM User profile in the AWS web console.

#### Authenticate to an AWS Account using MFA and Assume an IAM Role in another Account

```bash
aws-auth --serial-number arn:aws:iam::123456789011:mfa/jondoe --token-code 123456 --role-arn arn:aws:iam::123456789011:role/my-role
```

#### Assume an IAM Role in another Account and configure the credentials to not expire for 12 hours

```bash
aws-auth --serial-number arn:aws:iam::123456789011:mfa/jondoe --token-code 123456 --role-arn arn:aws:iam::123456789011:role/my-role --role-duration-seconds 43200
```

#### Required IAM Policy

You must have the `iam:AssumeRole` permission on the "primary" AWS account in order to assume an IAM Role in a "secondary"
AWS account. Furthermore, you must have the `iam:AssumeRole` permission on the specific IAM Role you wish to assume or
on all resources (`*`).

#### Wrap the output in `eval()`

When finished running, the `aws-auth` script will write a series of `export XXX=YYY` statements to `stdout`:

```bash
aws-auth --serial-number arn:aws:iam::123456789011:mfa/jondoe --token-code 123456

export AWS_ACCESS_KEY_ID='AAA'
export AWS_SECRET_ACCESS_KEY='BBB'
export AWS_SESSION_TOKEN='CCC'
export AWS_SESSION_EXPIRATION='DDD'
```

**NOTE**: `AWS_SESSION_EXPIRATION` environment variable is not used by any official libraries (i.e. aws cli, boto, etc.). It's only exported for your convenience, for example a wrapper that renews once expired.

To setup your AWS environment variables in one command, all you have to do is eval the result!

```bash
eval "$(aws-auth --serial-number arn:aws:iam::123456789011:mfa/jondoe --token-code 123456)"
```

#### Switching Between multiple accounts

A typical account switching workflow might be:

1.  Authenticate to "primary" AWS account using static credentials
2.  Use `aws-auth` to authenticate to "dev" account.
3.  Authenticate to "primary" AWS account using static credentials
4.  Use `aws-auth` to authenticate to "prod" account.

Notice that you must re-authenticate to the "primary" AWS account before you can use `aws-auth` again.

## Combining it with password managers

To be fair, using `aws-auth` isn't *really* a one-liner, since you have to set your permanent AWS credentials first:

```bash
export AWS_ACCESS_KEY_ID='<PERMANENT_ACCESS_KEY>'
export AWS_SECRET_ACCESS_KEY='<PERMANENT_SECRET_KEY>'
eval $(aws-auth --serial-number arn:aws:iam::123456789011:mfa/jondoe --token-code 123456)
```

If you store your secrets in a CLI-friendly password manager, such as [pass](https://www.passwordstore.org/),
[lpass](https://github.com/lastpass/lastpass-cli) or
[1Password CLI](https://support.1password.com/command-line-getting-started/), then you can reduce this even further! Instructions on how to set this up for Lastpass / `lpass` can be found [here](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.74.6/modules/aws-auth/AWS-AUTH-LASTPASS.md) and 1Password / `op` [here](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.74.6/modules/aws-auth/AWS-AUTH-1PASSWORD.md).

First, store your permanent AWS credentials in `pass`:

```
pass insert aws-access-key-id
Enter password for aws-access-key-id: <PERMANENT_ACCESS_KEY>

pass insert aws-secret-access-key
Enter password for aws-secret-access-key: <PERMANENT_SECRET_KEY>
```

Next, store your MFA ARN in `pass` as well:

```
pass insert aws-mfa-arn
Enter password for aws-mfa-arn: arn:aws:iam::123456789011:mfa/jondoe
```

If you will be assuming an IAM Role ARN, put that in `pass` too:

```
pass insert aws-iam-role-arn
Enter password for aws-iam-role-arn: arn:aws:iam::123456789011:role/my-role
```

Now, you can store a script in `pass` that ties all of this together. Run the `insert` command with the `-m` parameter
so you can enter multiple lines:

```
pass insert -m aws-sts-env-vars
Enter contents of aws-sts-env-vars and press Ctrl+D when finished:
```

And now enter the following script:

```bash
read -p "Enter your MFA token: " token
eval $(AWS_ACCESS_KEY_ID=$(pass aws-access-key-id) AWS_SECRET_ACCESS_KEY=$(pass aws-secret-access-key) aws-auth --serial-number $(pass aws-mfa-arn) --token-code "$token")
```

*Using [Fish Shell](https://fishshell.com/)? Use the following modified script instead:*

```fish
# For Fish Shell users only
echo "Enter your token:";
read -p "" token;
eval (export AWS_ACCESS_KEY_ID=(pass aws-access-key-id); export AWS_SECRET_ACCESS_KEY=(pass lotus/aws-secret-access-key); aws-auth --serial-number (pass aws-mfa-arn) --token-code "$token")
```

If you want the script to assume an IAM role, just add the `--iam-role` parameter at the end:

```bash
read -p "Enter your MFA token: " token
eval $(AWS_ACCESS_KEY_ID=$(pass aws-access-key-id) AWS_SECRET_ACCESS_KEY=$(pass aws-secret-access-key) aws-auth --serial-number $(pass aws-mfa-arn) --token-code "$token" --role-arn $(pass aws-iam-role-arn))
```

Now, to setup your temporary STS credentials is *truly* a one-liner!

```bash
eval "$(pass aws-sts-env-vars)"
```

*Note: the double quotes around the `$()` are required.*

## Running the script with a cronjob

If you you need to run `aws-auth` with a cronjob, you may want to set the `$USER` env variable to your local user:

*   e.g. set the `$USER` variable like so: `  05 10 * * * env USER=$USERNAME /path/to-your-script/script `

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.74.6/modules/aws-auth/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.74.6/modules/aws-auth/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.74.6/modules/aws-auth/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "c5f8aca6fe5216790ec72e35a9f8c552"
}
##DOCS-SOURCER-END -->
