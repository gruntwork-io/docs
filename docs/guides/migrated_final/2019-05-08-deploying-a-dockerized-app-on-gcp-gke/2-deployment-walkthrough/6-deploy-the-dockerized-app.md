## Deploy the Dockerized App

To deploy our Dockerized App on the GKE cluster, you can use the `kubectl` CLI tool to create a
[Kubernetes Pod](https://kubernetes.io/docs/concepts/workloads/pods/pod-overview/). A pod is the smallest deployable
object in the Kubernetes object model and will contain only your `simple-web-app` Docker image.

First, configure `kubectl` to use the newly created cluster:

```bash
gcloud container clusters get-credentials <YOUR_CLUSTER_NAME> --region europe-west3
```

Be sure to substitute `<YOUR_CLUSTER_NAME>` with the name of your GKE cluster and use either `--region` or
`--zone` to specify the location.

Use the `kubectl create` command to create a
[Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) named `simple-web-app-deploy` on your
cluster:

```bash
kubectl create deployment simple-web-app-deploy --image=gcr.io/${PROJECT_ID}/simple-web-app:v1
```

To see the Pod created by the last command, you can run:

```bash
kubectl get pods
```

The output should look similar to the following:

    NAME                                     READY     STATUS             RESTARTS   AGE
    simple-web-app-deploy-7fb787c449-vgtf6   0/1       ContainerCreating  0          7s

Now you need to expose the app to the public Internet.



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"37604026e4a88de092e2161808ca2ede"}
##DOCS-SOURCER-END -->
