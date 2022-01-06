# Recommended Tools

* [AWS CLI](https://aws.amazon.com/cli/) – The AWS CLI is a powerful tool that lets perform most of the actions that you can do via the AWS Console.
* [AWS Vault](https://github.com/99designs/aws-vault#installing) – AWS Vault is a slick tool that allows you to easily use different sets of AWS credentials to run commands (`aws`, `terragrunt`, `packer`, et cetera). Once you've gone beyond a single AWS account, a tool like AWS vault is immensely helpful.
* [Docker](https://www.docker.com/get-started) – Run applications in a container that contains everything needed to run the application without affecting the host environment.
* [Golang](https://go.dev/dl/) – Golang is an exciting language that has taken the DevOps / infrastructure world by storm. Terraform, Terragrunt, and Terratest are all written in Go.
* [Kubectl](https://kubernetes.io/docs/tasks/tools/) – If you need to control your Kubernetes cluster, `kubectl` is at the operational core.
* [Packer](https://www.packer.io/downloads) – Packer lets you build a variety of images, including AWS AMIs and Docker containers. Those images are defined via code for repeatability.
* [Terraform](https://www.terraform.io/downloads) – Terraform's declarative nature describes your infrastructure as code. If you're using Gruntwork's products, you're using Terraform.
* [Terragrunt](https://terragrunt.gruntwork.io/docs/getting-started/install/) – Terragrunt is our layer on top of Terraform to enable a highly DRY code base.
* [Terratest](https://github.com/gruntwork-io/terratest) – If you want to test your infrastructure, Terratest enables you to write those tests for manual testing or integration with a CI/CD pipeline.
* [tfenv](https://github.com/tfutils/tfenv#installation) – `tfenv` was inspired by a similar tool `rbenv` for Ruby versions. The tool is a set of bash scripts that provide a workflow for managing and using multiple versions of Terraform.
* [tgswitch](https://github.com/warrensbox/tgswitch) – `tgswitch` is a tool for versioning Terragrunt written in golang that offers similar features as `tfenv`, including managing the versions to use in a version file.

## Installation

If you would like to run the tools natively on your computer, the links provided above give installation instructions. If you are a user of [brew](https://brew.sh/), then in many cases, a `brew install <TOOL>` will work.

## Tools via Docker

You can use a docker container with all of the tooling built in. If you would prefer to not install all of the tooling locally, then this route is for you.

Save following to a `Dockerfile`:

```dockerfile title="Dockerfile"
FROM ubuntu:latest

RUN apt-get update && apt-get install -y wget unzip curl git

# Packer
ARG PACKER_VERSION=1.7.3
RUN wget -q https://releases.hashicorp.com/packer/${PACKER_VERSION}/packer_${PACKER_VERSION}_linux_amd64.zip && unzip packer_${PACKER_VERSION}_linux_amd64.zip && mv packer /usr/local/bin

# Terraform
ARG TERRAFORM_VERSION=1.0.10
RUN wget -q https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_linux_amd64.zip && unzip terraform_${TERRAFORM_VERSION}_linux_amd64.zip && mv terraform /usr/local/bin

# Terragrunt
ARG TERRAGRUNT_VERSION=0.31.0
RUN wget -q https://github.com/gruntwork-io/terragrunt/releases/download/v${TERRAGRUNT_VERSION}/terragrunt_linux_amd64 && chmod 0755 terragrunt_linux_amd64 && mv terragrunt_linux_amd64 /usr/local/bin/terragrunt

# aws-vault
ARG AWS_VAULT_VERSION=6.3.1
RUN wget -q https://github.com/99designs/aws-vault/releases/download/v${AWS_VAULT_VERSION}/aws-vault-linux-amd64 && chmod 0755 aws-vault-linux-amd64 && mv aws-vault-linux-amd64 /usr/local/bin/aws-vault

# AWS cli
RUN curl -s https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip -o aws_cli.zip && unzip aws_cli.zip && ./aws/install

# kubectl
ARG KUBECTL_VERSION=1.22.3
RUN curl -LO https://dl.k8s.io/release/v${KUBECTL_VERSION}/bin/linux/amd64/kubectl
RUN install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# Golang
ARG GOLANG_VERSION=1.17.2
ARG GOPATH='/root/go'
RUN curl -L -s https://golang.org/dl/go${GOLANG_VERSION}.linux-amd64.tar.gz -o go.tar.gz && rm -rf /usr/local/go && tar -C /usr/local -xzf go.tar.gz
RUN echo 'export PATH=$PATH:/usr/local/go/bin' >> /root/.profile
RUN echo 'export GOPATH=/root/go' >> /root/.profile

# Terratest
ARG TERRATEST_VERSION=0.38.2
RUN GOPATH=/root/go /usr/local/go/bin/go get github.com/gruntwork-io/terratest@v${TERRATEST_VERSION}
```

Build the container:

```bash
# Build the docker container named gruntwork
docker build . -t gruntwork
```

If you need to change the version of any of the binaries, you can pass those variables in as `--build-arg` parameters:

```bash
# Build the docker container with specific tool versions
docker build . --build-arg TERRAFORM_VERSION=1.0.2 --build-arg TERRAGRUNT_VERSION=0.31.0 -t gruntwork
```

Once the container has been built, you can run the container, mounting the current directory to `/work`:

```bash
# Run the container, mounting the current directory at /work
docker run -it -v $(pwd):/work gruntwork /bin/bash
```


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"f4bb8e80ecea20726805aff623a16d05"}
##DOCS-SOURCER-END -->
