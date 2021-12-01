# Setup for courses in Gruntwork Academy

## AWS

Most of the [Gruntwork Academy courses](https://github.com/gruntwork-io/gruntwork-academy) will build infrastructure in AWS. You'll need an [AWS account](https://aws.amazon.com/) and a user for that account with sufficient permissions to create and destroy infrastructure.

Note that this infrastructure will cost you some money! We will make best efforts to minimize the cost to you by leveraging low cost infrastructure and helping you destroy it afterwards. The responsibility is yours to monitor, pay for, and destroy any lingering infrastructure.

## AWS Authentication

The tools used will all need to be authorized and authenticated. See [AWS's documention](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html).

The examples in this class will assume that you are authenticated via one of the methods described.

99design's [AWS Vault](https://github.com/99designs/aws-vault) makes it easy to use multiple AWS accounts. If you set up an AWS account with the name `sand`, for example, you can do the following to run the AWS cli in that account and get a list of S3 buckets:

```bash
aws-vault exec sand -- aws s3api list-buckets
```


## CLI Tools

In order to complete these courses, you'll need some or all the following third party tools:

TODO: Make sure this list is complete and doesn't list something we don't actually need

* [Docker](https://www.docker.com/)
* [Packer](https://www.packer.io/)
* [Terraform](https://www.terraform.io/)
* [Terragrunt](https://terragrunt.gruntwork.io/)
* [AWS CLI](https://aws.amazon.com/cli/)
* [AWS Vault](https://github.com/99designs/aws-vault)

If you have these tools already installed, you can run them natively from your machine. Make sure the versions of each of the tools match what is inside the Dockerfile for best results:

```bash
# Show the current tool versions defined in the Dockerfile
$ grep 'ARG [A-Z]*_VERSION' Dockerfile | awk '{print $2}'
PACKER_VERSION=1.7.3
TERRAFORM_VERSION=1.0.2
TERRAGRUNT_VERSION=0.31.0
```

If you'd prefer, you can use Docker and the included Dockerfile to build a container with the tools installed.

From the root directory of the course (one directory up from here):

```bash
# Build the docker container named gw_academy
docker build . -t zero2hero -f 01_setup/Dockerfile
```

If you need to change the version of packer, terraform, or terragrunt, you can pass those variables in as `--build-arg`s:

```bash
# Build the docker container with specific tool versions
docker build . --build-arg PACKER_VERSION=1.7.3 --build-arg TERRAFORM_VERSION=1.0.2 --build-arg TERRAGRUNT_VERSION=0.31.0 -t zero2hero -f 01_setup/Dockerfile
```

Once the container has been built, you can run the container, mounting the current directory to `/zero2hero`:

```bash
# Run the container, mounting the course at /gw_academy
docker run -it -v $(pwd):/zero2hero zero2hero /bin/bash
```

You should see the courses mounted:

```bash
# Inside the docker container!

root@cc8ae6945307:/# ls /zero2hero
01_setup                     04_web_app_to_ecs_fargate    07_service_catalog_web_app   10_upgrade_a_module_version
02_web_app_via_docker        05_web_app_production_ready  08_data_store                README.md
03_ECR_repo                  06_gruntwork_modules_web_app 09_web_app_gruntwork_way
```

You will also have the AWS CLI, AWS Vault, aws-vault, Packer, Terraform, and Terragrunt installed:

```bash
# Inside the docker container!

root@cc8ae6945307:/# ls /usr/local/bin
aws  aws-vault  aws_completer  packer  terraform  terragrunt
```

You can run the Zero to Hero Gruntwork Academy course from inside this running container.

---
[Table of Contents](zero-to-hero)

Next Section: [A Web App via Docker](a-web-app-using-docker)


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"6113038c1e71fa3ff7d18b7db66e295d"}
##DOCS-SOURCER-END -->
