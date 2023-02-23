# Options for running Kubernetes in AWS

There are a number of different options for running Kubernetes in AWS:

<div className="dlist">

#### Deploy it yourself

You could try to follow the [Kubernetes documentation](https://kubernetes.io/docs/home/) and
[Kubernetes the hard way](https://github.com/kelseyhightower/kubernetes-the-hard-way) to create a Kubernetes cluster
from scratch on top of EC2 instances. This gives you full control over every aspect of your Kubernetes cluster, but
it is a considerable amount of work (3-6 months to get something production-grade, minimum) and puts the full burden
of maintenance, scalability, high availability, disaster recovery, and updates on you.

#### Kubernetes deployment tools

There are a number of Kubernetes tools that can automatically spin up a cluster for you, including
[eksctl](https://eksctl.io) (the official tool from AWS), [kops](https://github.com/kubernetes/kops),
[kubespray](https://kubespray.io/), and [kubeadm](https://github.com/kubernetes/kubeadm). These tools allow you to get a
reasonable cluster up and running in a few commands, significantly reducing the amount of work compared to doing it
from scratch. However, it’s typically hard to customize and manage those clusters, as you don’t have the
infrastructure defined as code (note: `kops` can generate Terraform code, but it’s probably not the way you’d write
the code yourself and if you modify that code, it’s not clear if you can still use `kops`), and most importantly,
these tools put the full burden of maintenance, scalability, high availability, disaster recovery, and updates on
you (except `eksctl`, which spins up an EKS cluster).

#### Amazon Elastic Kubernetes Service

[Amazon EKS](https://aws.amazon.com/eks/) is a managed service in AWS for using Kubernetes. It runs the entire control
plane for you, with first-class integration with other AWS services (e.g., VPCs, IAM, etc). That means you can get
EKS running quickly, manage everything as code, and benefit from AWS handling all the maintenance, scalability,
high availability, disaster recovery, and updates of the control plane for you. The main drawbacks is that EKS is
still fairly new, so some functionality is missing or more complicated to use than it should be.

</div>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"014ad817a0f78576ebd997277ebec6a2"}
##DOCS-SOURCER-END -->
