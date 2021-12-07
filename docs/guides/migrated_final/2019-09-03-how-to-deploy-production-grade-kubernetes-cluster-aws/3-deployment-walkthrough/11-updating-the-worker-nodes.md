# Updating the worker nodes

Deploying the cluster initially is a start. In the future, you’ll also need a way to roll out updates:

Updating the control plane  
EKS has built-in support for updating the control plane; the `eks-cluster-control-plane` module has built-in support
for updating the plugins EKS uses, such as `aws-vpc-cni`, `coredns`, and `kube-proxy`. So, if you bump your Kubernetes
version and run `terragrunt apply`, EKS will automatically roll out new master nodes with the new version installed,
and the `eks-cluster-control-plane` module will automatically execute a Python script that will update all the plugin
versions as described in the
[official upgrade guide](https://docs.aws.amazon.com/eks/latest/userguide/update-cluster.html).

AWS warns that you may "experience minor service interruptions during an update." See
[Updating an Amazon EKS Cluster Kubernetes Version](https://docs.aws.amazon.com/eks/latest/userguide/update-cluster.html)
for more info.

Updating the worker nodes  
EKS does not have a built-in way to update the worker nodes without downtime. If you need to update the worker
nodes—e.g., roll out a new AMI—your best bet is to use the
[kubergrunt deploy](https://github.com/gruntwork-io/kubergrunt#deploy) command, which can do a zero-downtime rolling
deployment of the worker node Auto Scaling Group:

```bash
kubergrunt eks deploy --region <AWS_REGION> --asg-name <AUTO_SCALING_GROUP_NAME>
```



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"5636e9edf38cccc6e5355185e257b14a"}
##DOCS-SOURCER-END -->
