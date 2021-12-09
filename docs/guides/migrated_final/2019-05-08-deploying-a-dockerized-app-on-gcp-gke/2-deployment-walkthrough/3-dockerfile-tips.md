# Dockerfile Tips

Some things to note when writing up your `Dockerfile` and building your app:

-   Ensure your `Dockerfile` starts your app in the foreground so the container doesn’t shutdown after app startup.

-   Your app should log to `stdout`/`stderr` to aid in debugging it after deployment to GKE.



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"c121ac93f85d2c3b89477dd0aae0e320"}
##DOCS-SOURCER-END -->
