# Reference Architecture Prerequisites Guide

Gruntwork accelerates your infrastructure with our [Reference Architecture](https://gruntwork.io/reference-architecture/). This acceleration allows you to treat your infrastructure like you do your application: as code, complete with pull requests and peer reviews. The Reference Architecture requires skills to maintain it and customize it to your needs over time. Here's what we think you should bring to the table.

<details>

  <summary>Knowledge of Terraform</summary>
    <div>

Our modules are all built using [Terraform](https://www.terraform.io/), and the Reference Architecture uses our modules to build out your infrastructure. You should be comfortable using Terraform for Infrastructure as Code.
</div>
</details>

<details>
  <summary>Knowledge of Terragrunt or willingness to learn</summary>
    <div>

The Reference Architecture is delivered in [Terragrunt](https://terragrunt.gruntwork.io/), our open source wrapper around Terraform which allows you to

1. Separate your monolithic terraform state files into smaller ones to speed up your plans and applies
2. Keep your infrastructure code DRY

See [How to Manage Multiple Environments with Terraform](https://blog.gruntwork.io/how-to-manage-multiple-environments-with-terraform-32c7bc5d692) and our [Terragrunt Quick start](https://terragrunt.gruntwork.io/docs/getting-started/quick-start/) documentation for more details.
</div>
</details>

<details>
  <summary>Knowledge of git and GitHub</summary>    
    <div>

Our Reference Architecture and the modules that it consumes are all stored in Git repositories in GitHub. You must have a working knowledge of Git via SSH (`add`, `commit`, `pull`, branches, et cetera) and GitHub (Pull requests, issues, et cetera) in order to interface with the Reference Architecture and our code library.
</div>
</details>
    
<details>
  <summary>Knowledge of AWS and its services</summary>
    <div>

The Reference Architecture is provisioned in [AWS](https://aws.amazon.com/). To be successful with the infrastructure provisioned by us, you must have a decent working knowledge of AWS, its permissions schemes ([IAM](https://aws.amazon.com/iam/)), services, and APIs. While having AWS certification is not required, it is certainly helpful. Since Gruntwork is an accelerator for your AWS infrastructure and not an abstraction layer in front of AWS, knowledge of AWS and the services you intend to use is required.
</div>
</details>

<details>
  <summary>Knowledge of Gruntwork’s Limitations</summary>    
    <div>

During the process of setting up the AWS accounts for your reference architecture, our tooling will automatically submit quota increase requests to AWS as a support ticket. These AWS quota increases are required to install the components of the Reference Architecture. Often, AWS will approve these requests quickly. Sometimes these support tickets will take some time for AWS to resolve. Unfortunately, some of these requests may be denied by AWS’s support team. Gruntwork can work with you to get these requests approved, but this can take some time, and that time is mostly out of our control. 

Gruntwork focuses on helping you launch and maintain your infrastructure as code. Understanding and using the AWS services that our code provisioned is up to you. Since Gruntwork is an accelerator for your AWS infrastructure and not an abstraction layer in front of AWS, knowledge of AWS and the services you intend to use is required.
</div>
</details>
    
<details>
  <summary>Knowledge of Go, Shell, and Python</summary>    
    <div>

Some of the modules we have leverage Go, Shell scripting and Python. To customize these to suit your needs, you may need to dive in and make changes. In addition, all of our automated testing is written in Go, so familiarity with Go is highly recommended.
</div>
</details>
    
<details>
  <summary>Knowledge of containerization tools like Docker and Packer</summary>    
    <div>

We create Docker containers throughout our code library, and use them heavily in our [Gruntwork Pipelines](https://gruntwork.io/pipelines/) product, an important piece of the Reference Architecture. Containerization is an important part of helping many companies scale in the cloud, and we’re no exception. Familiarity with creating docker images and pushing and pulling them from repositories is required. Likewise, we use Packer to build AMIs. Understanding Packer will enable you to build your own AMIs for your own infrastructure and make modifications to the infrastructure we provision for you.
</div>
</details>
    
<details>
  <summary>Brand new AWS accounts</summary>    
    <div>

With our Gruntwork Wizard, we help you create new AWS accounts, which we’ll then use to build your Reference Architecture. All accounts must be completely empty. At this time we do not support “brown field” deployments of the Reference Architecture.
</div>
</details>
    
<details>
  <summary>Time to learn</summary>    
    <div>

Gruntwork accelerates you down the road towards having your entire AWS cloud infrastructure captured as Infrastructure as Code. The Reference Architecture will set you up with a solid foundation with our [Landing Zone](https://gruntwork.io/landing-zone-for-aws/) and help you regularly modify your infrastructure with [Gruntwork Pipelines](https://gruntwork.io/pipelines/). Infrastructure and Infrastructure as Code is complex, and while we strive to make it as easy as possible for you, you will need time to understand the twists and turns of your infrastructure in order to tune it to fully suit your needs.
</div>
</details>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "309ccb6e82e90aa929aac6cb8604af98"
}
##DOCS-SOURCER-END -->
