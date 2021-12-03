# CI / CD pipeline for app code

The Reference Architecture also includes configuration files for setting up a CI / CD pipeline for your application code.
You can find configurations for application CI / CD in the folder `_ci/app-templates`:

```bash
_ci/app-templates
└── scripts
    ├── build-docker-image.sh
    ├── constants.sh
    ├── deploy-docker-image.sh
    └── install.sh
```

- `scripts`: Helper bash scripts used to drive the CI / CD pipeline.
  - `constants.sh`: Environment variables that are shared across all the scripts
  - `install.sh`: Installer script to configure the CI runtime with necessary dependencies for running the deployment
      scripts.
  - `build-docker-image.sh`: Script used by the CI runtime to build a new docker image for the application.
  - `deploy-docker-image.sh`: Script used by the CI runtime to deploy a prebuilt docker image for the application.

This sample pipeline configures the following workflow:

- For any commit on any branch, build a new docker image using the commit SHA.
- For commits to `main`, deploy the built image to the dev environment by updating the `infrastructure-live`
  configuration for the `dev` environment.
- For release tags, deploy the built image to the stage environment by updating the `infrastructure-live` configuration
  for the `stage` environment.

In this guide, we will walk through how to setup the CI / CD pipeline for your application code.

## Dockerize your app

To deploy your app on ECS or EKS, you will first need to dockerize it. If you are not familiar with the basics of
docker, check out our "Crash Course on Docker and Packer" from the [Gruntwork Training
Library](https://training.gruntwork.io/p/a-crash-course-on-docker-packer).

**Once your app is dockerized, make note of the path from the root of your application repo to the `Dockerfile`.** This value will be used in your `_ci/scripts/constants.sh` as `DOCKER_CONTEXT_PATH`.

## Create infrastructure code to deploy your app

If you've already followed the previous guide [How to deploy your apps into the Reference
Architecture](../deploy-apps/intro), you should already have your module defined in the `infrastructure-live` repository
to deploy the app.

**Make note of the path from the account folder to the service configuration.** An example path is `"dev/us-east-1/dev/services/application`. These values will be used your `.circleci/config.yml` for `DEV_DEPLOY_PATH` and `STAGE_DEPLOY_PATH`.

## Enable access to your application repo from ECS deploy runner

Now you need to explicitly enable the ECS deploy runner to access your application repo.

Because the ECS deploy runner has defacto _admin_ credentials to your AWS accounts, it is locked down so that users
cannot deploy arbitrary code into your environments.

To allow the ECS deploy runner to start building and deploying your application:

1. Open this file for editing: `shared/us-west-2/mgmt/ecs-deploy-runner/terragrunt.hcl`.
1. Update `docker_image_builder_config.allowed_repos` to include the HTTPS Git URL of the application repo.
1. Save and commit the change.
1. Deploy the change using `terragrunt apply`.

## Install CI / CD Configuration

Once the branch is merged, updates to the `main` branch will trigger a build job in CircleCI.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"1d2c1cc566705c76d4c4c7d1bb444a8c"}
##DOCS-SOURCER-END -->
