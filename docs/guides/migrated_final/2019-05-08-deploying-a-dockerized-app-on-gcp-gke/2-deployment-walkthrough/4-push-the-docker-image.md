# Push the Docker image

So far you’ve successfully built a Docker image on your local computer. Now it’s time to push the image to your private
[Google Container Registry](https://cloud.google.com/container-registry/), so it can be deployed from other locations,
such as GKE.

First, configure your local Docker client to be able to authenticate to Container Registry (note: you’ll only need to
do this step once):

``` bash
export PROJECT_ID="$(gcloud config get-value project -q)"
gcloud auth configure-docker
```

Next, tag the local Docker image for uploading:

``` bash
docker tag simple-web-app:latest "gcr.io/${PROJECT_ID}/simple-web-app:v1"
```

Finally, push the Docker image to your private Container Registry:

``` bash
docker push "gcr.io/${PROJECT_ID}/simple-web-app:v1"
```



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"5cc19687bba6e2866eb19dd9ca4c98b2"}
##DOCS-SOURCER-END -->
