# Try out the cluster

At this point, you can start interacting with your EKS cluster using `kubectl`. First, configure `kubectl` to
authenticate to the cluster. Here’s an example of how to do that using
[kubergrunt](https://github.com/gruntwork-io/kubergrunt):

```bash
kubergrunt eks configure --eks-cluster-arn <EKS_CLUSTER_ARN>
```

You’ll need to replace `EKS_CLUSTER_ARN` with the ARN of the EKS cluster, which is one of the outputs you’ll get at the
end of the `terragrunt apply`.

Now you can start running typical `kubectl` commands:

```bash
kubectl get nodes
```


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "ce3e3dd28d904805638be7b3e6cf7bd9"
}
##DOCS-SOURCER-END -->
