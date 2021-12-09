# Dockerize the App

Before you can deploy the app to GKE, you need to Dockerize it. You can do this by creating a `Dockerfile` in the same
folder as your `server.js` and `package.json`:

**Dockerfile**

```Dockerfile
FROM node:12

# Create app directory
WORKDIR /usr/app

COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]
```

The folder structure of the sample app should now look like this:

    ├── server.js
    ├── Dockerfile
    └── package.json

:::info

Real-world applications will be a lot more complicated than this, but the main point to take from here is that
you need to ensure your Docker image is configured to `EXPOSE` the port that your app is going to need for external
communication. See the [Docker examples](https://docs.docker.com/samples/) for more information on Dockerizing popular
app formats.

:::

To build this Docker image from the `Dockerfile`, run:

```bash
docker build -t simple-web-app:latest .
```

Now you can test you container to see if it is working:

```bash
docker run --rm -p 8080:8080 simple-web-app:latest
```

This starts the newly built container and links port 8080 on your machine to the container’s port 8080. You should see
the following output when you run the above command:

    > docker_web_app@1.0.0 start /usr/app
    > node server.js

    Running on http://0.0.0.0:8080

Next, open the app in your browser:

```bash
open http://localhost:8080
```

You should be able to see the "Hello World!" message from the server.

<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"dcfd7df1606bd287558295b44909b34b"}
##DOCS-SOURCER-END -->
