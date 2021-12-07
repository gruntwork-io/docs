# Dockerfile Tips

Some things to note when writing up your `Dockerfile` and building your app:

- Ensure your `Dockerfile` starts your app in the foreground so the container doesn’t shutdown after app startup.

- Your app should log to `stdout`/`stderr` to aid in debugging it after deployment to GKE.



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"114d3ae4fad79365d133b2f8bd25cedd"}
##DOCS-SOURCER-END -->
