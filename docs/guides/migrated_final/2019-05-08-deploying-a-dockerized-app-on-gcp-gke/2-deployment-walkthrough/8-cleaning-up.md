## Cleaning Up

Once you’re done testing, you may want to clean up all the infrastructure you’ve deployed so GCP doesn’t charge you
money for it.

First, delete the Kubernetes Service:

```bash
kubectl delete service simple-web-app-deploy
```

This will destroy the Load Balancer created during the previous step.

Next, to destroy the GKE cluster, run the `terraform destroy` command:

```bash
terraform destroy
```

This is a destructive command that will forcibly terminate and destroy your GKE cluster!



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"ae4dece380b3fc859bac7004cf9d5ede"}
##DOCS-SOURCER-END -->
