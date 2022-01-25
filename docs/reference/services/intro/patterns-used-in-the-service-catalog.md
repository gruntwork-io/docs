# Patterns used in the Service Catalog

## How to build AMIs for the Service Catalog

Some services depend on EC2 instances to host the underlying service. For example, when deploying an ECS cluster, you
need to provision worker nodes that will run the Docker Containers of the ECS services that are deployed on the cluster.
For any service that depends on EC2 instances, the Service Catalog will provide [packer](https://www.packer.io/)
templates that can be used to build the AMIs. These packer templates define the AMIs as code, so that they can be
built from scratch in a consistent manner.

The packer templates are provided as `json` files in each service module folder, and follow the naming convention of:

```
<servertype>-<os>.json
```

For example, the packer template for ECS workers is the file
[ecs-node-al2.json](https://github.com/gruntwork-io/terraform-aws-service-catalog/blob/master/modules/services/ecs-cluster/ecs-node-al2.json),
providing an Amazon Linux 2 based AMI.

You can directly build any packer template by calling `packer` on it. The following walks through the steps for building
the ECS node AMI against Service Catalog version `v0.30.0`:

1.  If you haven't already, download and install packer from https://www.packer.io/.

1.  Clone the Service Catalog repository to a temporary directory (if you don't already have a local copy). Make sure to
    checkout the version tag of the Service Catalog repository for which you wish to base your AMI on:

         git clone git@github.com:gruntwork-io/terraform-aws-service-catalog.git
         (cd terraform-aws-service-catalog && git checkout v0.30.0)

1.  Change your working directory to the service module folder where the packer template is located:

        cd terraform-aws-service-catalog/modules/services/ecs-cluster

1.  Inspect the packer template and identify the variables you wish to configure. Define all the variables you wish to
    configure in a [packer var file](https://www.packer.io/docs/templates/legacy_json_templates/user-variables#from-a-file).

1.  Set the environment variable `GITHUB_OAUTH_TOKEN` in your shell to a [Github Personal Access
    Token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) for a user that
    has access to the Gruntwork Infrastructure as Code library.

1.  Authenticate to the AWS account where you wish to host the AMI. Refer to the post [A Comprehensive Guide to
    Authenticating to AWS on the Command
    Line](https://blog.gruntwork.io/a-comprehensive-guide-to-authenticating-to-aws-on-the-command-line-63656a686799) for
    information on how to authenticate to AWS in your shell.

1.  Once you are authenticated, invoke `packer` with your var file to build the AMI:

        packer build -var-file /path/to/var-file.json ./ecs-node-al2.json

## How to deploy newly built AMIs?

Once you build the AMI, the next step is to deploy it to your infrastructure. Each service that requires an AMI offers
two configuration inputs for selecting the AMI, and you must pick one:

- `*_ami` (e.g., the [`cluster_instance_ami` input
  variable](https://github.com/gruntwork-io/terraform-aws-service-catalog/blob/v0.29.0/modules/services/ecs-cluster/variables.tf#L26-29)
  in the `ecs-cluster` module)
- `*_ami_filters` (e.g., the [`cluster_instance_ami_filters` input
  variable](https://github.com/gruntwork-io/terraform-aws-service-catalog/blob/v0.29.0/modules/services/ecs-cluster/variables.tf#L31-44)
  in the `ecs-cluster` module)

The two approaches are mutually exclusive. When specifying both, `*_ami` is always used and the input to
`*_ami_filters` is ignored.

The `*_ami` input variable can be used to directly specify the AMI to use. When using this input, the value should be
set to the AMI ID that is returned by the packer call. It should be in the format `ami-<some_unique_hash>`.

The `*_ami_filters` input variable takes in an AMI filter expression that can be used for dynamically looking up a
prebuilt AMI. The supported filters for the lookup can be obtained from the [describe-images command
description](https://docs.aws.amazon.com/cli/latest/reference/ec2/describe-images.html) in the AWS CLI reference. The
most commonly used filters will be:

- `name`: Filter by the name of the AMI. Note that this supports unix glob expressions (e.g., `*-ecs-node` will match
  any image with the suffix `-ecs-node` in the name).
- `tag:<key>`: Filter by the given tag key. Note that `<key>` can be any tag key that is applied to the AMI. For
  example, to search for AMIs with the tag `service-catalog-module = ecs-cluster`, you can use the following filter:

        cluster_instance_ami_filters = {
          owners = ["self"]
          filters = [{
            name   = "tag:service-catalog-module"
            values = ["ecs-cluster"]
          }]
        }

  Note that tags are only visible in the account that owns the AMI. Even if you share the AMI in the packer template,
  the AMI tags will not be visible when you query it from a shared account.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"60bc3d04057a4aa59329a1e387968c0f"}
##DOCS-SOURCER-END -->
