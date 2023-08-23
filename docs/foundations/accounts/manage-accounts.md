# Manage Accounts

This document provides guidance on how account management operations should be made. The operations are sorted into categories based on whether they must be performed in IAC, in the AWS Console, or either. For operations that may be performed in either location, IAC is always preferred.

## Prerequisites

- An AWS account with AWS Control Tower setup
- Access to an IAM User or Role with administrative permissions to AWS Control Tower

## Console only operations

- Creating a new AWS Organizational Unit
- Delete an account (requires un-managing the account first)

## Infrastructure as Code only operations

- Create a new account
- Request new account
- Un-managing an account

## Operations that _may_ be done in the console or as code

- Update Account Access IAM Identity Center user information (IaC preferred)
- Moving an account to a new Organizational Unit (IaC preferred)


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "75e66466343606917f104245bb6c1043"
}
##DOCS-SOURCER-END -->
