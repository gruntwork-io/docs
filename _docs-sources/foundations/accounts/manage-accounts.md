# Manage Accounts

This document provides instructions for managing AWS accounts in AWS Control Tower using Gruntwork. Not all account management operations are currently available using the Gruntwork Account Factory, this document provides guidance on which operations _should_, _may_, or _must_ be managed either in the AWS Console or programmatically using Gruntwork tools using Infrastructure as Code (IaC).

## Prerequisites

- An AWS account with AWS Control Tower setup
- Access to an IAM User or Role with administrative permissions to AWS Control Tower

## Console only operations

- Creating a new AWS Organizational Unit
- Delete an account

## Infrastructure as Code only operations

- Create a new account
- Request new account
- Un-managing an account
- Update Account Access IAM Identity Center user information

## Operations that _may_ be done in the console or as code

- Moving an account to a new Organizational Unit
