---
date: "2019-04-24"
title: "Deploying a Dockerized app on GCP/GKE"
tags: ["gcp", "gke", "docker"]
author: "robmorgan"
---

This guide walks you through deploying a dockerized app to a GKE cluster running on Google Cloud Platform.

## Launching a GKE Cluster

Here we want to show users how to deploy a production-grade GKE cluster.

## Getting Started

Install:

- Terraform
- gcloud
- Docker

A basic understanding of Node.js is also recommended.

## Creating a Basic App

Before we can deploy a Dockerized App, we need to first create one. For the purposes of this guide we will create
a basic Node.js app that responds to requests on port `8080`.

Start by creating a file called `server.js` and paste in the following source code:

```javascript
const express = require("express")

// Constants
const PORT = 8080
const HOST = "0.0.0.0"

// App
const app = express()
app.get("/simple-web-app", (req, res) => {
  res.send("Hello world\n")
})

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)
```

Next, we need a few NPM dependences to make this work properly, so create a `package.json` file:

```json
{
  "name": "docker_web_app",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.16.1"
  }
}
```

## Dockerizing the App

Before we can deploy the App to GKE, we need to first Dockerize it. If you are not familiar with the basics of Docker, we recommend
you check out our "[Crash Course on Docker and Packer](https://training.gruntwork.io/p/a-crash-course-on-docker-packer)" from the Gruntwork Training Library.

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

```bash
├── server.js
├── Dockerfile
└── package.json
```

**Note:** Your actual app will definitely be way more complicated than this but the main point to take from here, is that
we need to ensure our Docker image is configured to EXPOSE the port that our app is going to need for external
communication. See [examples](https://docs.docker.com/samples/) of how to dockerize many popular app formats.

To build this a docker image from the Dockerfile, run:

```bash
$ docker build -t simple-web-app:latest .
```

Now we can test our container to see if it is working:

```bash
$ docker run --rm -p 8080:8080 simple-web-app:latest
```

This starts the newly built container and links port 8080 on your machine to the container's port 8080. You should see
output like below when you run this command:

```bash
> docker_web_app@1.0.0 start /usr/app
> node server.js

Running on http://0.0.0.0:8080
```

You should now be able to hit the app by opening `localhost:8080` in your browser. Try it out to verify you get the
"Hello world" message from the server.

Some things to note when writing up your Dockerfile and building your app:

- Ensure your Dockerfile starts your app in the foreground so the container doesn't shutdown after app startup.
- Your app should log to stdout/stderr to aid in debugging it after deployment to GKE

First, configure Docker command-line tool to authenticate to Container Registry (you need to run this only once):

```bash
$ gcloud auth configure-docker
```

```bash
$ brew update
$ brew install go
```

## Deploying a Dockerized App

## Hooking up a Load Balancer

## Hooking up a DNS entry

## The underlying VPC stuff

## Hooking up a DB

The easiest way to install Hashicorp [Terraform](https://www.terraform.io) and [Packer](https://www.packer.io/) on your Mac
is by using [Homebrew](https://brew.sh/). Simply run:

    $ brew install packer terraform awscli jq awslogs git

To install them and a few other useful tools for AWS cloud development.

You can verify your installation using the `-v` parameter:

    $ terraform -v
    Terraform v0.11.7
    $ packer -v
    1.2.3
