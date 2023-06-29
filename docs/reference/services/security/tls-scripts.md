---
type: "service"
name: "TLS Scripts"
description: "Create TLS certificates, download CA certs for RDS, and generate JVM trust stores."
category: "tools"
cloud: "aws"
tags: ["TLS","SSL","certificates","certificate-authority","trust-store","key-store"]
license: "gruntwork"
built-with: "terraform, bash, docker"
title: "TLS Scripts"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.104.14" lastModifiedVersion="0.100.0"/>

# TLS Scripts

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/tls-scripts" className="link-button" title="View the source code for this service in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=tls-scripts" className="link-button" title="Release notes for only versions which impacted this service.">Release Notes</a>

## Overview

This service contains scripts that simplify the process of creating and managing TLS certificates, JVM key stores and
trust stores, and RDS CA certificates.

## Features

Bash scripts that simplify working with TLS certificates. You will typically only need
these scripts to configure end-to-end encryption in your Reference Architecture.

*   Simplify creating self-signed TLS certificates
*   Encrypt TLS certificates using KMS
*   Upload TLS certificates to AWS for use with ELBs
*   Download CA public keys for validating RDS TLS connections
*   Simplify creating key stores and trust stores to manage TLS certificates for JVM apps
*   Run from a Docker container so you don’t need to install any dependencies locally

## Learn

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

### About TLS

*   [How does TLS/SSL work?](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/tls-scripts/core-concepts.md#how-does-tlsssl-work)
*   [What are commercial or public Certificate Authorities?](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/tls-scripts/core-concepts.md#what-are-commercial-or-public-certificate-authorities)
*   [How does Gruntwork generate a TLS cert for private services?](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/tls-scripts/core-concepts.md#how-does-gruntwork-generate-a-tls-cert-for-private-services)

### About the scripts specifically

*   [How does create-tls-cert work?](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/tls-scripts/core-concepts.md#how-does-create-tls-cert-work)
*   [How does download-rds-ca-certs work?](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/tls-scripts/core-concepts.md#how-does-download-rds-ca-certs-work)
*   [How does generate-trust-stores work?](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/tls-scripts/core-concepts.md#how-does-generate-trust-stores-work)

## Deploy

### Running

*   [How do I run these scripts using Docker?](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/tls-scripts/core-concepts.md#how-do-i-run-these-scripts-using-docker)
*   [How do I create self-signed TLS certs?](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/tls-scripts/core-concepts.md#how-do-i-create-self-signed-tls-certs)
*   [Should I store certs in AWS Secrets Manager or Amazon Certificate Manager?](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/tls-scripts/core-concepts.md#should-i-store-certs-in-aws-secrets-manager-or-amazon-certificate-manager)
*   [Generating self-signed certs for local dev and testing](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/tls-scripts/core-concepts.md#generating-self-signed-certs-for-local-dev-and-testing)
*   [Generating self-signed certs for prod, encrypting certs locally with KMS](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/tls-scripts/core-concepts.md#generating-self-signed-certs-for-prod-encrypting-certs-locally-with-kms)
*   [Generating self-signed certs for prod, using AWS Secrets Manager for storage](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/tls-scripts/core-concepts.md#generating-self-signed-certs-for-prod-using-aws-secrets-manager-for-storage)
*   [Generating self-signed certs for prod, using Amazon Certificate Manager for storage](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/tls-scripts/core-concepts.md#generating-self-signed-certs-for-prod-using-amazon-certificate-manager-for-storage)
*   [How do I download CA public keys for validating RDS TLS connections?](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/tls-scripts/core-concepts.md#how-do-i-download-CA-public-keys-for-validating-rds-tls-connections)
*   [How do I generate key stores and trust stores to manage TLS certificates for JVM apps?](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/tls-scripts/core-concepts.md#how-do-i-generate-key-stores-and-trust-stores-to-manage-tls-certificates-for-jvm-apps)

### Testing

*   [How do I test these scripts using Docker?](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/tls-scripts/core-concepts.md#how-do-i-test-these-scripts-using-docker)





## Reference


<Tabs>
<TabItem value="inputs" label="Inputs" default>



</TabItem>
<TabItem value="outputs" label="Outputs">



</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/tls-scripts/README.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/tls-scripts/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/tls-scripts/outputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "e0e9db4ed63e40c0def7bf51f128da72"
}
##DOCS-SOURCER-END -->
