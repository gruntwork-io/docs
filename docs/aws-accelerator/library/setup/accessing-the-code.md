# Accessing the Code

Gruntwork provides access to all code included in your Infrastructure as Code (IaC) library subscription through GitHub. To access the IaC Library, first create an account in the Developer Portal. After setting up your account, link your GitHub ID to your Developer Portal account to gain access.

## Accessing modules and services in the IaC Library

Once you can access the Gruntwork IaC library, you can view the source code for all modules and services in [GitHub](https://github.com/orgs/gruntwork-io/repositories). Refer to the [Library Reference](https://library.gruntwork.io) for a complete list of available modules and services.

In GitHub, each IaC repository adheres to a naming convention: it begins with the prefix `terraform-aws-`, followed by a description of the modules it contains. For example, Amazon SNS, SQS, MSK, and Kinesis modules reside in the `terraform-aws-messaging` repository. 

Within each repository:  
- Modules are located in the `modules` directory.  
- Example usage and tests are provided in the `examples` and `tests` directories, respectively.  

## Accessing modules: SSH vs. HTTPS

Gruntwork modules reference each other internally using SSH. For example:  
```hcl
source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-cluster-control-plane?ref=v0.58.0"
```

(This is in contrast to using https, e.g. `source = "git::https://github.com/...`.)

### Why use SSH?

Gruntwork modules rely on SSH due to its widespread compatibility and minimal configuration requirements, making it a reliable choice that works seamlessly across diverse systems.

### Can I use HTTPS?

The modules in the IaC Library reference each other via SSH. While you can initially reference a module using HTTPS, it may still pull in dependencies over SSH. As a result, exclusive use of HTTPS is not supported.

### What if I can't use SSH?  

If you cannot use SSH—such as in cases where corporate network restrictions block outbound access to port 22—you won’t be able to access the GitHub-hosted version of the library. However, you can [self-host](/docs/aws-accelerator/library/guides/self-hosting) the library using [repo-copier](https://github.com/gruntwork-io/repo-copier) as an alternative.

A self-hosted version of the library within your corporate network can typically accommodate most enterprise network restrictions.  

