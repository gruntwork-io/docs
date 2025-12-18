---
sidebar_position: 4
title: Embrace immutable infrastructure
---

# Embrace immutable infrastructure

It is perhaps a brutal metaphor, but many DevOps practitioners capture the idea of immutable infrastructure by recommending that we treat our infrastructure resources such as servers and databases "like cattle, not pets." The idea is that instead of carefully nurturing individual servers with unique configurations and histories, you should treat them as interchangeable and replaceable. When something needs to change, you don't modify the existing resource—you replace it entirely with a new one.

You can think of "pet" infrastructure management like editing a document: you SSH into a server, install an update, modify a configuration file, and restart a service. Over time, each environment accumulates unique changes. Production has patches that staging doesn't. Servers that were provisioned at different times have different configurations. Troubleshooting requires understanding each system's individual history.

Immutable infrastructure takes a different approach. Rather than modifying running resources, you replace them with new versions. Instead of SSHing into a server to patch it, you build a new server image with the patch and replace the old server. Instead of updating a Lambda function in place, you deploy a new version and cut over to it.

For example, instead of manually configuring a server, the immutable approach involves building an Amazon Machine Image (AMI) using a tool like [Packer](https://github.com/hashicorp/packer) or [EC2 Image Builder](https://aws.amazon.com/image-builder/) to capture your base server configuration as code. You then make sure that any running EC2 instance is using the latest version of your AMI, and that future server configuration changes are reflected in a new AMI version (or a new set of instructions to execute after the EC2 instance launches).

Embracing immutable infrastructure gives you consistency across environments because production, staging, and development all run identical builds of your infrastructure, just with different configuration parameters. It also makes configuration rollbacks straightforward because you can easily switch back to the previous version.

As we saw when you [represent all patterns as code](/docs/way/principles/technical-foundations/represent-all-patterns-as-code), it _is_ more work upfront to create immutable infrastructure than to manually configure a resource. And just as before, [the platform is a balancing act](/docs/way/principles/core-philosophy/the-platform-is-a-balancing-act), so sometimes you may not have time to create a fully immutable artifact. But once again, not working with immutable artifacts is a form of debt, and investing in creating them upfront will enable better velocity, governance and maintainability over time.

