# Worker nodes

While EKS will run the control plane for you, it’s up to you to create the worker nodes. Here are the key
considerations:

<div className="dlist">

#### Auto Scaling Group

We recommend using an [Auto Scaling Group](https://docs.aws.amazon.com/autoscaling/ec2/userguide/AutoScalingGroup.html)
to run your worker nodes. This way, failed nodes will be automatically replaced, and you can use auto scaling
policies to automatically scale the number of nodes up and down in response to load.

#### Tags

EKS requires that all worker node EC2 instances have a tag with the key `kubernetes.io/cluster/<CLUSTER_NAME>` and
value `owned`.

#### Subnets

We strongly recommend running the Auto Scaling Group for your worker nodes in private subnets that are NOT directly
accessible from the public Internet. See
[How to deploy a production-grade VPC on AWS](../../2-vpc/0-intro/0-what-youll-learn-in-this-guide.md) for more
info.

#### AMI

Each worker node will need Docker, kubelet,
[AWS IAM Authenticator](https://github.com/kubernetes-sigs/aws-iam-authenticator), and a
[bootstrap script](https://docs.aws.amazon.com/eks/latest/userguide/launch-workers.html) installed. We recommend
using the
[Amazon EKS-Optimized AMI](https://docs.aws.amazon.com/eks/latest/userguide/eks-optimized-ami.html) or one of the
[EKS partner AMIs](https://docs.aws.amazon.com/eks/latest/userguide/eks-partner-amis.html) (e.g., there is an Ubuntu
AMI), as these already have all the necessary software installed.

#### User Data

Each worker node must register itself to the Kubernetes API. This can be done using a
[bootstrap script](https://docs.aws.amazon.com/eks/latest/userguide/launch-workers.html) that is bundled with the EKS
optimized AMI. We recommend running this bootstrap script as part of
[User Data](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html) so that it executes when the EC2
instance is booting.

#### IAM role

In order for the kubelet on each worker node to be able to make API calls, each
[worker node must have an IAM role](https://docs.aws.amazon.com/eks/latest/userguide/worker_node_IAM_role.html) with
the following managed IAM policies: `AmazonEKSWorkerNodePolicy`, `AmazonEKS_CNI_Policy`,
`AmazonEC2ContainerRegistryReadOnly`.

#### Security group

You should define a security group that controls what traffic can go in and out of each worker node. The worker
nodes must be able to talk to the control plane and vice versa: see
[Cluster Security Group Considerations](https://docs.aws.amazon.com/eks/latest/userguide/sec-group-reqs.html) for the
ports you should open up between them.

#### Server hardening

There are a number of server-hardening techniques that you should apply to each worker node. This includes
a secure base image (e.g., CIS hardened images), intrusion prevention (e.g., `fail2ban`), file integrity monitoring
(e.g., Tripwire), anti-virus (e.g., Sophos), automatically installing critical security updates (e.g.,
`unattended-upgrades` for Ubuntu), locking down EC2 metadata (e.g., `ip-lockdown`), and so on.

</div>
