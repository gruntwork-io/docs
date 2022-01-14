# Clean up Default VPCs and Security Groups

In each of your production accounts, use [cloud-nuke](https://github.com/gruntwork-io/cloud-nuke) to remove the Default
VPC and Default Security Group rules:

```bash
cloud-nuke defaults-aws
```
