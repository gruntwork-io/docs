# Accessing the code  

Gruntwork provides access to all code included in your Infrastructure as Code (IaC) library subscription through GitHub. To access the IaC Library, you must first [create an account in the Developer Portal](/2.0/docs/overview/getting-started/create-account). Once your account is set up, [link your GitHub ID](/2.0/docs/overview/getting-started/link-github-id) to your Developer Portal account to gain access.  

## Accessing modules and services in the IaC Library  

Once you can access the Gruntwork IaC library, you can view the source code for all modules and services in [GitHub](https://github.com/orgs/gruntwork-io/repositories). Refer to the [Library Reference](/library/reference) for a complete list of available modules and services.  

In GitHub, each IaC repository follows a naming convention: the prefix `terraform-aws-` followed by a description of the modules it contains. For example, Amazon SNS, SQS, MSK, and Kinesis modules reside in the `terraform-aws-messaging` repository. Within each repository:  
- Modules are located in the `modules` directory.  
- Example usage and tests are provided in the `examples` and `tests` directories, respectively.  

## Accessing modules: SSH vs. HTTPS  

Gruntwork modules reference each other internally using SSH. For example:  
```hcl
source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-cluster-control-plane?ref=v0.58.0"
```

(This is in contrast to using https, e.g. `source = "git::https://github.com/...`.)

### Why use SSH?  

Gruntwork modules use SSH because it has historically been more universal and requires minimal configuration or logistics to "just work" across various systems.  

### Can I use HTTPS?  

Unfortunately, the modules reference each other via SSH. Even if you initially reference a module using HTTPS, it may pull in other modules over SSH. As a result, it is not possible to use HTTPS exclusively with the IaC Library.  

### What if I can't Use SSH?  

If you are unable to use SSH, for example, due to corporate network restrictions that block outbound access to port 22, you will not be able to use the GitHub-hosted version of the library. However, we offer an option to [self-host](/2.0/docs/library/guides/self-hosting) the library using [repo-copier](https://github.com/gruntwork-io/repo-copier).  

A self-hosted version of the library within your corporate network can typically accommodate most enterprise network restrictions.  

