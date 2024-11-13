# Accessing the code

Gruntwork provides all code included in your subscription to the Infrastructure as Code (IaC) library through GitHub. To gain access to the IaC Library, you must first [create an account in the Developer Portal](/2.0/docs/overview/getting-started/create-account). Once you have an account, you must [link your GitHub ID](/2.0/docs/overview/getting-started/link-github-id) to your Developer Portal account to gain access to the IaC Library.

## Accessing Modules and Services in the IaC library

Once you have gained access to the Gruntwork IaC library, you can view the source code for our modules and services in [GitHub](https://github.com/orgs/gruntwork-io/repositories). For a full list of modules and services, check the [Library Reference](/library/reference).

In GitHub, each IaC repository is prefixed with `terraform-aws-` then a high level description of the modules it contains. For example, Amazon SNS, SQS, MSK, and Kinesis are located in the `terraform-aws-messaging` repository. In each repository, the modules are located in the `modules` directory. Example usage and tests are provided for each module in the `examples` and `tests` directories, respectively.

## Accessing modules SSH vs. HTTPS

Gruntwork modules internally reference each other using the SSH.  For example:

```hcl
source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-cluster-control-plane?ref=v0.58.0"
```

(This is in contrast to using https, e.g. `source = "git::https://github.com/...`.)

### Why use SSH?

The modules use SSH as, historically and still to a large extent to the present, SSH authentication is more universal and requires less configuration and logistics to "just work".

### Can I use HTTPS?

Unfortunately, because the modules reference each other via SSH, even if you initially reference a module with HTTPS, it may then pull in other modules over SSH, so it is not possible to use HTTPS exclusively with the Library.

### What if I can't use SSH?

If you're unable to use SSH, for example because your corporate network blocks outbound access to port 22, you will be unable to use the public-internet github-hosted version of the library.  We do, however, offer an option to [self-host](/2.0/docs/library/guides/self-hosting) the library using [repo-copier](https://github.com/gruntwork-io/repo-copier). A self-hosted version of the library internal to your corporate network likely will satisfy most enterprise network restrictions.
