# Docs Sourcer

**This app is just getting off the ground**. We know it's not finished or polished.

Docs Sourcer gathers document content from GitHub repos and renders that content
into MarkDown files that can then be copied to the `docs` repo.

## Running in Dev

You can run the main executable with the following command:

```bash
yarn dev
```

### Building the code

You can build the code with the following command:

```bash
yarn build
```

The code will be compiled into the `dist/` folder.

## Deployment

This app is intended to run in a docker container. The current plan is to
execute this app as a service in our EKS cluster.

The `Dockerfile` and `docker-compose.yml` files are responsible for building the docker image.
There is currently no CI/CD pipeline that handles building or deploying this application.

## Run Package in Docs Site

After installing the package, run the command below to regenerate all possible content:

```bash
yarn docs-sourcer
```

To get other usage options, run:

```bash
yarn docs-sourcer --help
```


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"docs-sourcer-readme","hash":"269aba5724aa5a85442badfb92838b6a"}
##DOCS-SOURCER-END -->
