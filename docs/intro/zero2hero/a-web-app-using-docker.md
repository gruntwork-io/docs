# A web app using Docker

## Prerequisites

In this section, we will be running commands locally on your development machine, _not_ inside the Docker container created in the previous chapter.

## Build the container

Let's start with the simple web front end. First, we'll build the container:

```bash
cd src/web && docker build . -t web && cd -
```

<!--include:: -->

## Run the container

Now, we'll run the container, directing the container's traffic on port 8081 to our local port 8081:

```bash
docker run -p 8081:8081 web
```

You'll see something that looks like this:

```bash
$ docker run -p 8081:8081 web
time="2021-07-13T18:43:48Z" level=info msg="Starting web server on :8081 connecting to API at http://localhost:8080/"
```

Don't worry, there's no API for it to connect to. Try opening your browser to [http://localhost:8081] and you should see a message:

```bash
Unable to get counter information
```

You can also use `curl` from another terminal window to get the same results:

```bash
$ curl localhost:8081
Unable to get counter information
```

You will see warning messages eminating from the web application. This is fine for now.

```bash
time="2021-07-13T18:44:05Z" level=warning msg="Error getting response from http://localhost:8080/: Get \"http://localhost:8080/\": dial tcp 127.0.0.1:8080: connect: connection refused"
```

When done, use `Ctrl-C` to shut down your docker container and the web application inside it.

## Build and run all three containers

Use `docker-compose` to build run the web app, the API, and the PostgreSQL backend.

```bash
docker-compose build
docker-compose up
```

Give it a little time for all three containers to fully launch. Then, point your browser at [http://localhost:8081] again, or use `curl`:

```bash
$ curl localhost:8081
Counter: 1
```

Great! We now have a minimalistic "counter" web application that uses an internal API that talks to a persistent database.

When you're done, destroy `docker-compose` with `Ctrl-C`, and then clean up:

```bash
docker-compose down
```

We've provided some helper scripts in the scripts directory to facilitate the bringing up and down of the stack.

Run `scripts/up.sh` to bring everything up, and `scripts/down.sh` to destroy everything. Note that the counter value will persist after bringing the stack down and then back up.
If you want the counter to reset, you can run `scripts/up.sh clean`.

---

[Table of Contents](zero-to-hero)

Next Section: [Create an ECR Repository with Terraform](create-an-ecr-repository-with-terraform)


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"032fcd9c67a72080a8c5b0d0eb30b58d"}
##DOCS-SOURCER-END -->
