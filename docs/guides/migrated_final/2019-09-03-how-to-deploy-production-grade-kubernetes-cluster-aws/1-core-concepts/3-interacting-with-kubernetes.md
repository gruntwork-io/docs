## Interacting with Kubernetes

Once you have a Kubernetes cluster up and running, there are a number of ways to interact with it. This section will
go through a few of the most common ones, including the API, `kubectl`, the Web UI, and Terraform.

### API

Under the hood, any Kubernetes tool you use will be talking to the
[Kubernetes API](https://kubernetes.io/docs/reference/using-api/api-overview/). However, it’s relatively rare for you to
have to make API calls directly (if you do have to, see the
[API client libraries](https://kubernetes.io/docs/reference/#api-client-libraries)), so let’s quickly move on to the
other tools that build on top of the API.

### kubectl

[kubectl](https://kubernetes.io/docs/reference/kubectl/overview/) is the official command-line interface (CLI) for
working with Kubernetes. For example, to deploy the [training/webapp](https://hub.docker.com/r/training/webapp) Docker
container (a simple "Hello, World" webapp) and have it listen on port 5000, you could run:

```bash
kubectl run webapp \
  --image=training/webapp:latest \
  --port 5000 \
  --generator=run-pod/v1
```

And to see the pods running in your cluster, you could run:

```bash
kubectl get pods
```

To be able to authenticate to different EKS clusters or as different users, you can create one or more `kubectl`
configuration files, which are typically called _kubeconfig files_ (note, the files do not actually need to be called
`kubeconfig`). In a kubeconfig file, you can define one or more _contexts_, where each context specifies a cluster to
connect to and a user to use for authentication. You can then use the `kubectl config use-context` command to quickly
switch between contexts—and therefore, different clusters and users.

### Web UI (Dashboard)

![The Kubernetes Dashboard](/assets/img/guides/eks/kubernetes-dashboard.png)

The _[Kubernetes Dashboard](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/)_ is a
web-based interface you can use to manage your Kubernetes cluster. The dashboard is not enabled by default in most
Kubernetes distributions. Check out
[Deploying the Dashboard UI](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/#deploying-the-dashboard-ui)
and
[Accessing the Dashboard UI](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/#accessing-the-dashboard-ui)
for instructions.

### Terraform

Terraform has a [Kubernetes provider](https://www.terraform.io/docs/providers/kubernetes/index.html) that allows you to
write Terraform code that, under the hood, calls the Kubernetes API. This allows you to manage all your
infrastructure—including your VPCs, databases, Kubernetes clusters, and Kubernetes services—using the same language and
workflow. The downside is that the Terraform Kubernetes provider seems to lag behind considerably, and is missing
some of the features you need for effectively working with Kubernetes, which often requires you to go outside of
Terraform code anyway (e.g., execute a script).



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"093b388811c43ce777c6dd0309405265"}
##DOCS-SOURCER-END -->
