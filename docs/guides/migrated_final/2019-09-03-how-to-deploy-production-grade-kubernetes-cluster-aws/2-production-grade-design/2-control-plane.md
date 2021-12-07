# Control plane

To have EKS manage the control plane for you, you need to create an
_[EKS cluster](https://docs.aws.amazon.com/eks/latest/userguide/clusters.html)_. When you create an EKS cluster, behind
the scenes, AWS fires up several master nodes in a highly available configuration, complete with the Kubernetes API
Server, scheduler, controller manager, and etcd. Here are the key considerations for your EKS cluster:

Kubernetes version  
When creating your EKS cluster, you can pick which version of Kubernetes to use. For each version of Kubernetes,
EKS may have one or more _[platform versions](https://docs.aws.amazon.com/eks/latest/userguide/platform-versions.html)_
that are compatible with it. For example, Kubernetes 1.12.6 had platform versions `eks.1` and `eks.2`. AWS
automatically updates the control plane to use the latest platform version compatible with your chosen Kubernetes
minor version.

Subnets  
Your EKS cluster will run in the subnets you specify. We strongly recommend running solely in private subnets that
are NOT directly accessible from the public Internet. See
[How to deploy a production-grade VPC on AWS](/guides/networking/how-to-deploy-production-grade-vpc-aws) for more
info.

Endpoint access  
You can configure whether the [API endpoint for your EKS cluster](https://docs.aws.amazon.com/eks/latest/userguide/cluster-endpoint.html)
is accessible from (a) within the same VPC and/or (b) from the public Internet. We recommend allowing access from
within the VPC, but not from the public Internet. If you need to talk to your Kubernetes cluster from your own
computer (e.g., to issue commands via `kubectl`), use a bastion host or VPN server. See
[How to deploy a production-grade VPC on AWS](/guides/networking/how-to-deploy-production-grade-vpc-aws) for more
info.

Cluster IAM Role  
To be able to make API calls to other AWS services,
[your EKS cluster must have an IAM role](https://docs.aws.amazon.com/eks/latest/userguide/service_IAM_role.html) with
the following managed IAM policies: `AmazonEKSServicePolicy` and `AmazonEKSClusterPolicy`.

Security group  
You should define a security group that controls what traffic can go in and out of the control plane. The worker
nodes must be able to talk to the control plane and vice versa: see
[Cluster Security Group Considerations](https://docs.aws.amazon.com/eks/latest/userguide/sec-group-reqs.html) for the
ports you should open up between them.

Logging  
We recommend enabling [control plane logging](https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html)
so that the logs from the Kubernetes API server, controller manager, scheduler, and other components are sent to
CloudWatch.



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"ea014bf64cea5b942e951f7df5dd7084"}
##DOCS-SOURCER-END -->
