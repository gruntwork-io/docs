---
date: "2019-03-26"
title: "For Startups"
tags: ["terraform", "packer"]
author: "robmorgan"
---

The easiest way to install Hashicorp [Terraform](https://www.terraform.io) and [Packer](https://www.packer.io/) on your Mac
is by using [Homebrew](https://brew.sh/). Simply run:

    $ brew install packer terraform awscli jq awslogs git

To install them and a few other useful tools for AWS cloud development.

You can verify your installation using the `-v` parameter:

    $ terraform -v
    Terraform v0.11.7
    $ packer -v
    1.2.3
