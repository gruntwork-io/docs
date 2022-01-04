# Deploy a VPC

The first step is to deploy a VPC. Follow the instructions in
[How to deploy a production-grade VPC on AWS](../../4-vpc/0-intro/0-what-youll-learn-in-this-guide.md) to use
`module-vpc` to create a VPC setup that looks like this:

![A production-grade VPC setup deployed using module-vpc from the Gruntwork Infrastructure as Code Library](/img/guides/build-it-yourself/pipelines/vpc-diagram.png)
_A production-grade VPC setup deployed using module-vpc from the Gruntwork Infrastructure as Code Library_

We will use the Mgmt VPC to deploy our infrastructure deployment CD platform, since the infrastructure deployment
platform is a management infrastructure that is designed to deploy to multiple environments.

After following this guide, you should have a `vpc-mgmt` wrapper module in your `infrastructure-modules` repo:

```bash
infrastructure-modules
  └ networking
    └ vpc-mgmt
      └ main.tf
      └ outputs.tf
      └ variables.tf
```

You should also have a corresponding live configuration in your `infrastructure-live` repo to deploy the VPC. For
example, for your production environment, there should be a folder called `production` in the `infrastructure-live` repo
that looks as follows:

```bash
infrastructure-live
  └ production
    └ terragrunt.hcl
    └ us-east-2
      └ prod
        └ networking
          └ vpc-mgmt
            └ terragrunt.hcl
```


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"d1830e373953d458538590ab52aa3f6c"}
##DOCS-SOURCER-END -->
