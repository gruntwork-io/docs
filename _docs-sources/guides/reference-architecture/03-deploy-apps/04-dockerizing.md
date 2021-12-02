# Dockerizing

In order to deploy the app on ECS, we need to dockerize the app. If you are not familiar with the basics of docker, we
recommend you check out our "Crash Course on Docker and Packer" from the [Gruntwork Training
Library](https://training.gruntwork.io/p/a-crash-course-on-docker-packer).

For this guide, we will use the following `Dockerfile` to package our app into a container (see [Docker
samples](https://docs.docker.com/samples/) for how to Dockerize many popular app formats):

```docker
FROM node:8

# Create app directory
WORKDIR /usr/app

COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]
```

The folder structure of our sample app looks like this:

```shell
├── server.js
├── Dockerfile
└── package.json
```

Your actual app will be more complicated than this, but the main point to take from here is that we need to ensure our
Docker image is configured to `EXPOSE` the port that our app is going to need for external communication.

To build this Docker image from the `Dockerfile`, run:

```bash
docker build -t simple-web-app:latest .
```

Now you can test the container to see if it is working:

```bash
docker run --rm -p 8080:8080 simple-web-app:latest
```

This starts the newly built container and links port `8080` on your machine to the container's port `8080`. You should
see output like below when you run this command:

```bash
> docker_web_app@1.0.0 start /usr/app
> node server.js

Running on http://0.0.0.0:8080
```

You should now be able to hit the app by opening `localhost:8080` in your browser. Try it out to verify you get the
"Hello world" message from the server.

Some things to note when writing up your `Dockerfile` and building your app:

* Ensure your `Dockerfile` starts your app in the foreground so the container doesn't shutdown after app startup.
* Your app should log to `stdout` / `stderr` to aid in [debugging](#debugging-errors) it after deployment to AWS.
