# How Self-Service should work

## Service Catalog UI

Your dev team should be able to use a web UI to see the contents of your Service Catalog. There are a variety of tools you can use to build this, such as the Terraform Registry, Backstage, GitHub, Jenkins, or even a totally custom app. The key idea is that there is an easy way to discover and browse everything that's available.

## GitOps-driven

Although the experience can start in a web UI, under the hood, everything should actually operate via commits to version control. For example, if the developer browses the Service Catalog UI, finds a service for deploying an EKS cluster, and clicks to deploy it, under the hood, the UI should commit code to the version control system: e.g., if you're using Terragrunt, you might generate a `terragrunt.hcl` file that is configured to deploy a Kubernetes cluster module from your Service Catalog, and commit that file to Git. This way, the whole process naturally ties into your code review and testing workflow, ensures that all changes and deployments are captured in version control history, and allows your CI / CD pipeline to do the actual deployment.

## Access controls

Not all services in the Service Catalog can be deployed by any developer. For example, perhaps setting up new cloud accounts and the networking for them (e.g., VPCs, VPNs, etc) is only exposed to your SysOps or NetOps teams. Once those account and networking basics are in place, other teams could then use other services—e.g., a Kubernetes cluster—on top of those pieces. Moreover, not only do you need access controls around the services, but also the environments those services can be deployed into: for example, certain accounts, networks, clusters, or data stores may belong to specific teams, and only those teams should be able to deploy any changes to them.

## Designed to meet your company's requirements

Many Ops teams get nervous with the idea of self-service: what if the developers get it wrong? What if they deploy something that doesn't meet our security, compliance, or regulatory requirements? Well, you can rest easy. If you followed the framework so far, then the only thing developers can deploy are services from your Service Catalog, which is managed and vetted by the Ops team to ensure everything meets your requirements, and as that deployment happens via a CI / CD pipeline that is also managed and vetted by the Ops team, you can have enough tests and checks in place to ensure those requirements are still being met. The hard part is in writing the code in the Service Catalog and CI / CD pipelines in the first place; but once you've done that, you can expose it to your dev team, and be confident that things will work as expected.



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"77f527c693abd32b67e88ea9a77fe6f4"}
##DOCS-SOURCER-END -->
