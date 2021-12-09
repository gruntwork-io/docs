# Cleaning Up

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

:::caution

This is a destructive command that will forcibly terminate and destroy your GKE cluster!

:::

<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"3c7e82b34cf57fb0f8e8b652c30a93d6"}
##DOCS-SOURCER-END -->
