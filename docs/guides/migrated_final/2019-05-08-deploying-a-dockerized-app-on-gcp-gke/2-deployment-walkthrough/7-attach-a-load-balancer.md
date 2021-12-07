# Attach a Load Balancer

So far you’ve deployed the Dockerized app, but it is not currently accessible from the public Internet. This is because
you have not assigned an external IP address or load balancer to the Pod. To fix this, run the following command:

```bash
kubectl expose deployment simple-web-app-deploy --type=LoadBalancer --port 80 --target-port 8080
```

This will take approximately 1 minute to assign an external IP address to the service. You can follow the progress by
running:

```bash
kubectl get services -w
```

Once this is done, you can open the external IP address in your web browser:

```bash
open http://<EXTERNAL_IP_ADDRESS>
```

If the service has been exposed correctly and the DNS has propagated you should see _Hello World!_. Congratulations!



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"0afceff8c9a31d6ebdfc622c1bf87472"}
##DOCS-SOURCER-END -->
