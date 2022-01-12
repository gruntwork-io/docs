# Authenticate

EKS manages authentication via AWS IAM, which is not an authentication method natively supported by most Kubernetes
tooling, including `kubectl`. Therefore, before using `kubectl`, you have to use one of the following utilities to
authenticate:

<div className="dlist">

#### [AWS CLI](https://aws.amazon.com/cli/)

AWS now has first-class support for authenticating to EKS built directly into the `aws` CLI (minimum version:
`1.16.232`). See [Installing the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) for
setup instructions. To use it, you fist run the `update-kubeconfig` command:

</div>

``` bash
aws eks update-kubeconfig --region <AWS_REGION> --name <EKS_CLUSTER_NAME>
```

This will update your kubeconfig so that `kubectl` will automatically call `aws eks get-token` for authentication; the
`aws eks get-token` command will, in turn, use the standard
[AWS CLI mechanisms to authenticate to AWS](https://blog.gruntwork.io/a-comprehensive-guide-to-authenticating-to-aws-on-the-command-line-63656a686799):
i.e., the credentials file at `~/.aws/credentials`, environment variables, etc.

<div className="dlist">

#### [eksctl](https://eksctl.io)

`eksctl` is the official CLI tool for EKS. It’s primary purpose is to deploy and manage the EKS cluster itself, but
you can also use it to authenticate to a cluster. To install `eksctl`, check out
[these instructions](https://eksctl.io/introduction/installation/). To authenticate with `eksctl`, you run the
`eksctl utils write-kubeconfig` command:

</div>

``` bash
eksctl utils write-kubeconfig --region <AWS_REGION> --name=<EKS_CLUSTER_NAME>
```

This will update your kubeconfig so that `kubectl` will automatically call either the AWS CLI or AWS IAM Authenticator
for authentication.

<div className="dlist">

#### [kubergrunt](https://github.com/gruntwork-io/kubergrunt)

A CLI tool maintained by Gruntwork that supports authentication to EKS, as well as several other important utilities,
such as tools for doing zero-downtime rolling deployments of EKS worker nodes and managing TLS certificates in
Kubernetes. The easiest way to install it is to use one of the pre-built binaries from the
[kubergrunt releases](https://github.com/gruntwork-io/kubergrunt/releases) page. To authenticate with `kubergrunt`, you
run `kubergrunt eks configure`:

</div>

``` bash
kubergrunt eks configure --eks-cluster-arn <EKS_CLUSTER_ARN>
```

This will update your kubeconfig to use `kubergrunt eks token` for authentication.

<div className="dlist">

#### [AWS IAM Authenticator for Kubernetes](https://github.com/kubernetes-sigs/aws-iam-authenticator)

A CLI tool maintained by the Heptio and Amazon EKS teams. This was the main tool AWS recommended for authenticating
to EKS until first-class support was added directly to the AWS CLI. At this point, there is no reason to install
this tool separately, so we are just recording this here for historical reasons.

</div>
