---
toc_max_heading_level: 2
---

import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"

# Deploying your apps

In this guide, we'll walk you through deploying a Dockerized app to the App Orchestration cluster (ECS or EKS) running in
your Reference Architecture.

## What's already deployed

When Gruntwork initially deploys the Reference Architecture, we deploy the
[aws-sample-app](https://github.com/gruntwork-io/aws-sample-app/) into it, configured both as a frontend (i.e.,
user-facing app that returns HTML) and as a backend (i.e., an app that's only accessible internally and returns JSON).
We recommend checking out the [aws-sample-app](https://github.com/gruntwork-io/aws-sample-app/) as it is designed to
deploy seamlessly into the Reference Architecture and demonstrates many important patterns you may wish to follow in
your own apps, such as how to package your app using Docker or Packer, do service discovery for microservices and data
stores in a way that works in dev and prod, securely manage secrets such as database credentials and self-signed TLS
certificates, automatically apply schema migrations to a database, and so on.

However, for the purposes of this guide, we will create a much simpler app from scratch so you can see how all the
pieces fit together. Start with this simple app, and then, when you're ready, start adopting the more advanced
practices from [aws-sample-app](https://github.com/gruntwork-io/aws-sample-app/).

## Deploying another app

For this guide, we'll use a simple Node.js app as an example, but the same principles can be applied to any app.
Below is a classic, "Hello World" starter app that listens for requests on port `8080`. For this example
walkthrough, save this file as `server.js`.

```js title="server.js"
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

Since we need to pull in the dependencies (like ExpressJS) to run this app, we will also need a corresponding `package.json`. Please save this file along side `server.js`.

```js title="package.json"
{
  "name": "docker_web_app",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.17.2"
  }
}
```

## Dockerizing

In order to deploy the app, we need to Dockerize the app. If you are not familiar with the basics of Docker, we
recommend you check out our "Crash Course on Docker and Packer" from the [Gruntwork Training
Library](https://training.gruntwork.io/p/a-crash-course-on-docker-packer).

For this guide, we will use the following `Dockerfile` to package our app into a container (see [Docker
samples](https://docs.docker.com/samples/) for how to Dockerize many popular app formats):

```docker
FROM node:14

# Create app directory
WORKDIR /usr/app

COPY package*.json ./

RUN npm install
COPY . .

# Ensure that our Docker image is configured to `EXPOSE`
# the port that our app is going to need for external communication.
EXPOSE 8080
CMD [ "npm", "start" ]
```

The folder structure of our sample app looks like this:

```shell
├── server.js
├── Dockerfile
└── package.json
```

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

```
> docker_web_app@1.0.0 start /usr/app
> node server.js

Running on http://0.0.0.0:8080
```

You should now be able to hit the app by opening `localhost:8080/simple-web-app` in your browser. Try it out to verify
you get the `"Hello world"` message from the server.

## Publishing your Docker image

Next, let's publish those images to an [ECR repo](https://aws.amazon.com/ecr/). All ECR repos are managed in the
`shared-services` AWS account in your Reference Architecture.

First, you'll need to create the new ECR repository.

Create a new branch on your infrastructure-live repository:

```bash
git checkout -b simple-web-app-repo
```

Open `repos.yml` in `shared/us-west-2/_regional/ecr-repos` and add the desired repository name of your app. For the
purposes of our example, let's call ours `simple-web-app`:

```yaml
simple-web-app:
external_account_ids_with_read_access:
  # NOTE: we have to comment out the directives so that the python based data merger (see the `merge-data` hook under
  # blueprints in this repository) can parse this yaml file. This still works when feeding through templatefile, as it
  # will interleave blank comments with the list items, which yaml handles gracefully.
  # %{ for account_id in account_ids }
  - "${account_id}"
# %{ endfor }
external_account_ids_with_write_access: []
tags: {}
enable_automatic_image_scanning: true
```

Commit and push the change:

```bash
git add shared/us-west-2/shared/data-stores/ecr-repos/terragrunt.hcl && git commit -m 'Added simple-web-app repo' && git push
```

Now open a pull request on the `simple-web-app-repo` branch.

This will cause the ECS deploy runner pipeline to run a `terragrunt plan` and append the plan output to the body of the PR you opened. If the plan output looks correct with no errors, somebody can review and approve the PR. Once approved, you can merge, which will kick off a `terragrunt apply` on the deploy runner, creating the repo. Follow the progress through your CI server. For example, you can go to GitHub actions workflows page and tail the logs from the ECS deploy runner there.

Once the repository exists, you can use it with the Docker image. Each repo in ECR has a URL of the format `<ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com/<REPO_NAME>`. For example, an ECR repo in `us-west-2`, and an app called `simple-web-app`, the registry URL would be:

```
<YOUR_ACCOUNT_ID>.dkr.ecr.us-west-2.amazonaws.com/simple-web-app
```

You can create a Docker image for this repo, with a `v1` label, as follows:

```bash
docker tag simple-web-app:latest <YOUR_ACCOUNT_ID>.dkr.ecr.us-west-2.amazonaws.com/simple-web-app:v1
```

Next, authenticate your Docker client with ECR in the shared-services account:

```bash
aws ecr get-login-password --region "us-west-2"  | docker login --username AWS --password-stdin <YOUR_ACCOUNT_ID>.dkr.ecr.us-west-2.amazonaws.com
```

And finally, push your newly tagged image to publish it:

```bash
docker push <YOUR_ACCOUNT_ID>.dkr.ecr.us-west-2.amazonaws.com/simple-web-app:v1
```

## Deploying your app

<Tabs>

<TabItem value="ecs" label="Deploy on ECS">

Now that you have the Docker image of your app published, the next step is to deploy it to your ECS Cluster that was
set up as part of your reference architecture deployment.

### Setting up the Application Load Balancer

The first step is to create an [Application Load Balancer (ALB)](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html) for the app. The ALB will be exposed to the Internet and will route incoming traffic to the app. It's possible to use a single ALB with multiple applications, but for this example, we'll create a new ALB in addition to the ALB used by the aws-sample-app.

To set up a new ALB, you'll need to create a `terragrunt.hcl` in each app environment (that is, in dev, stage, and prod). For example, for the `stage` environment, create an `alb-simple-web-app` folder in `stage/us-west-2/networking/`. Next, you can copy over the contents of the alb `terragrunt.hcl` so you have something to start with.

With the `terragrunt.hcl` file open, update the following parameters:

- Set `alb_name` to your desired name: e.g., `alb-simple-web-app-stage`
- Set `domain_names` to a desired DNS name: e.g., `domain_names = ["simple-web-app-stage.example.com"]`
- Note that your domain is available in an account-level `local` variable, `local.account_vars.locals.domain_name.name`. You can thus use a string interpolation to avoid hardcoding the domain name: `domain_names = ["simple-web-app-stage.${local.account_vars.locals.domain_name.name}"]`

That's it!

### Setting up the ECS service

The next step is to create a `terragrunt.hcl` file to deploy your app in each app environment (i.e. in dev, stage,
prod). To do this, we will first need to define the common inputs for deploying the `simple-web-app` service.

Copy the file `_envcommon/services/ecs-sample-app-frontend.hcl` into a new file
`_envcommon/services/ecs-simple-web-app.hcl`.

Next, update the following in the new `ecs-simple-web-app.hcl` configuration file:

- Locate the `dependency "alb"` block and modify it to point to the new ALB configuration you just defined. That is, change the `config_path` to the relative path to your new ALB. e.g., `config_path = "../../networking/alb-simple-web-app"`
- Set the `service_name` local to your desired name: e.g., `simple-web-app-stage`.
- Update `ecs_node_port_mappings` to only have a map value for port 8080
- In the `container_definitions` object, set `image` to the repo url of the just published Docker image: e.g., `<YOUR_ACCOUNT_ID>.dkr.ecr.us-west-2.amazonaws.com/simple-web-app`
- Set `cpu` and `memory` to a low value like 256 and 512
- Remove all the `environment` variables, leaving only an empty list, e.g. `environment = []`
- Remove port 8443 from the `portMappings`
- Remove the unnecessary `linuxParameters` parameter
- Remove the `iam_role_name` and `iam_policy` parameters since this simple web app doesn't need any IAM permissions

Once the envcommon file is created, you can create the `terragrunt.hcl` file to deploy it in a specific environment.
For the purpose of this example, we will assume we want to deploy the simple web app into the `dev` account first.

1. Create a `simple-web-app` folder in `dev/us-west-2/dev/services`.
1. Copy over the contents of the `sample-app-frontend terragrunt.hcl`.
1. Update the include path for `envcommon` to reference the new `ecs-simple-web-app.hcl` envcommon file you created
   above.
1. Remove the unneeded `service_environment_variables`, `tls_secrets_manager_arn`, and `db_secrets_manager_arn` local
   variables, as well as all usage of it in the file.
1. Update the `tag` local variable to reference the Docker image tag we created earlier.

### Deploying your configuration

The above are the minimum set of configurations that you need to deploy the app. You can take a look at [`variables.tf`
of `ecs-service`](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/main/modules/services/ecs-service)
for all the options.

Once you've verified that everything looks fine, change to the new ALB directory you created, and run:

```bash
terragrunt apply
```

This will show you the plan for adding the new ALB. Verify the plan looks correct, and then approve it to apply your ALB
configuration to create a new ALB.

Now change to the new `services/simple-web-app` folder, and run

```bash
terragrunt apply
```

Similar to applying the ALB configuration, this will show you the plan for adding the new service. Verify and approve
the plan to apply your application configuration, which will create a new ECS service along with a target group that
connects the ALB to the service.

### Monitoring your deployment progress

Due to the asynchronous nature of ECS deployments, a successful `terragrunt apply` does not always mean your app
was deployed successfully. The following commands will help you examine the ECS cluster from the CLI.

First, you can find the available ECS clusters:

```bash
aws --region us-west-2 ecs list-clusters
```

Armed with the available clusters, you can list the available ECS services on a cluster by running:

```bash
aws --region us-west-2 ecs list-services --cluster <cluster-name>
```

The list of services should include the new `simple-web-app` service you created. You can get more information about the service by describing it:

```
aws --region us-west-2 ecs describe-services --cluster <cluster-name> --services <service-name>
```

A healthy service should show `"status": "ACTIVE"` in the output. You can also review the list of `events` to see what has happened with the service recently. If the `status` shows something else, it's time to start debugging.

### Debugging errors

Sometimes, things don't go as planned. And when that happens, it's always beneficial to know how to locate the
source of the problem.

By default, all the container logs from a `service` (`stdout` and `stderr`) are sent to CloudWatch Logs. This is ideal for
debugging situations where the container starts successfully but the service doesn't work as expected. Let's assume our
`simple-web-app` containers started successfully (which they did!) but for some reason our requests to those containers
are timing out or returning wrong content.

1. Go to the "Logs" section of the [Cloudwatch Management Console](https://console.aws.amazon.com/cloudwatch/), click on Log groups, and look for the service in the list. For example: `/stage/ecs/simple-web-app-stage`.

1. Click on the entry. You should be presented with a real-time log stream of the container. If your app logs to `stdout`, its logs will show up here. You can export the logs and analyze it in your preferred tool or use [CloudWatch Log Insights](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html) to query the logs directly
   in the AWS web console.

</TabItem>

<TabItem value="eks" label="Deploy on EKS">

Now that you have the Docker image of your app published, the next step is to deploy it to your EKS Cluster that was
set up as part of your reference architecture deployment.

### Setting up the Kubernetes Service

The next step is to create a `terragrunt.hcl` file to deploy your app in each app environment (i.e. in dev, stage,
prod). To do this, we will first need to define the common inputs for deploying the `simple-web-app` service.

Copy the file `_envcommon/services/k8s-sample-app-frontend.hcl` into a new file
`_envcommon/services/k8s-simple-web-app.hcl`.

Next, update the following in the new `k8s-simple-web-app.hcl` configuration file:

- Set the `service_name` local to your desired name: e.g., `simple-web-app-stage`.
- In the `container_image` object, set `repository` to the repo url of the just published Docker image: e.g., `<YOUR_AWS_ACCOUNT_ID>.dkr.ecr.us-west-2.amazonaws.com/simple-web-app`.
- Update the `domain_name` to configure a DNS entry for the service: e.g., `simple-web-app.${local.account_vars.local.domain_name.name}`.
- Remove the `scratch_paths` configuration, as our simple web app does not pull in secrets dynamically.
- Remove all environment variables, leaving only an empty map: e.g. `env_vars = {}`.
- Update health check paths to reflect our new service:

  - `alb_health_check_path`
  - `liveness_probe_path`
  - `readiness_probe_path`

- Remove configurations for IAM Role service account binding, as our app won't be communicating with AWS:
  - `service_account_name`
  - `iam_role_name`
  - `eks_iam_role_for_service_accounts_config`
  - `iam_role_exists`
  - `iam_policy`

Once the envcommon file is created, you can create the `terragrunt.hcl` file to deploy it in a specific environment.
For the purpose of this example, we will assume we want to deploy the simple web app into the `dev` account first.

1. Create a `simple-web-app` folder in `dev/us-west-2/dev/services`.
1. Copy over the contents of the `k8s-sample-app-frontend terragrunt.hcl`.
1. Update the include path for `envcommon` to reference the new `ecs-simple-web-app.hcl` envcommon file you created
   above.
1. Remove the unneeded `tls_secrets_manager_arn` local variables, as well as all usage of it in the file.
1. Update the `tag` input variable to reference the Docker image tag we created earlier.

### Deploying your configuration

The above are the minimum set of configurations that you need to deploy the app. You can take a look at [`variables.tf`
of `k8s-service`](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/main/modules/services/k8s-service)
for all the available options.

Once you've verified that everything looks fine, change to the new `services/simple-web-app` folder, and run

```bash
terragrunt apply
```

This will show you the plan for deploying your new service. Verify the plan looks correct, and then approvie it to apply
your application configuration, which will create a new Kubernetes Deployment to schedule the Pods. In the process,
Kubernetes will allocate:

- A `Service` resource to expose the Pods under a static IP within the Kubernetes cluster.
- An `Ingress` resource to expose the Pods externally under an ALB.
- A Route 53 Subdomain that binds to the ALB endpoint.

Once the service is fully deployed, you can hit the configured DNS entry to reach your service.

### Monitoring your deployment progress

Due to the asynchronous nature of Kubernetes deployments, a successful `terragrunt apply` does not always mean your app
was deployed successfully. The following commands will help you examine the deployment progress from the CLI.

First, if you haven't done so already, configure your `kubectl` client to access the EKS cluster. You can follow the
instructions [in this section of the
docs](https://github.com/gruntwork-io/terraform-aws-eks/blob/main/core-concepts.md#how-do-i-authenticate-kubectl-to-the-eks-cluster)
to configure `kubectl`. For this guide, we will use [kubergrunt](https://github.com/gruntwork-io/kubergrunt):

```
kubergrunt eks configure --eks-cluster-arn ARN_OF_EKS_CLUSTER
```

Once `kubectl` is configured, you can query the list of deployments:

```
kubectl get deployments --namespace applications
```

The list of deployments should include the new `simple-web-app` service you created. This will show you basic status
info of the deployment:

```
NAME             DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
simple-web-app   3         3         3            3           5m
```

A stable deployment is indicated by all statuses showing the same counts. You can get more detailed information about a
deployment using the `describe deployments` command if the numbers are not aligned:

```
kubectl describe deployments simple-web-app --namespace applications
```

See the [How do I check the status of a
rollout?](https://github.com/gruntwork-io/helm-kubernetes-services/blob/main/charts/k8s-service/README.md#how-do-i-check-the-status-of-the-rollout)
documentation for more information on getting detailed information about Kubernetes Deployments.

### Debugging errors

Sometimes, things don't go as planned. And when that happens, it's always beneficial to know how to locate the
source of the problem. There are two places you can look for information about a failed Pod.

### Using kubectl

The `kubectl` CLI is a powerful tool that helps you investigate problems with your `Pods`.

The first step is to obtain the metadata and status of the `Pods`. To lookup information about a `Pod`, retrieve them
using `kubectl`:

```bash
kubectl get pods \
    -l "app.kubernetes.io/name=simple-web-app,app.kubernetes.io/instance=simple-web-app" \
    --all-namespaces
```

This will list out all the associated `Pods` with the deployment you just made. Note that this will show you a minimal
set of information about the `Pod`. However, this is a useful way to quickly scan the scope of the damage:

- How many `Pods` are available? Are all of them failing or just a small few?
- Are the `Pods` in a crash loop? Have they booted up successfully?
- Are the `Pods` passing health checks?

Once you can locate your failing `Pods`, you can dig deeper by using `describe pod` to get more information about a
single `Pod`. To do this, you will first need to obtain the `Namespace` and name for the `Pod`. This information should
be available in the previous command. Using that information, you can run:

```bash
kubectl describe pod $POD_NAME -n $POD_NAMESPACE
```

to output the detailed information. This includes the event logs, which indicate additional information about any
failures that has happened to the `Pod`.

You can also retrieve logs from a `Pod` (`stdout` and `stderr`) using `kubectl`:

```
kubectl logs $POD_NAME -n $POD_NAMESPACE
```

Most cluster level issues (e.g if there is not enough capacity to schedule the `Pod`) can be triaged with this
information. However, if there are issues booting up the `Pod` or if the problems lie in your application code, you will
need to dig into the logs.

### CloudWatch Logs

By default, all the container logs from a `Pod` (`stdout` and `stderr`) are sent to CloudWatch Logs. This is ideal for
debugging situations where the container starts successfully but the service doesn't work as expected. Let's assume our
`simple-web-app` containers started successfully (which they did!) but for some reason our requests to those containers
are timing out or returning wrong content.

1. Go to the "Logs" section of the [Cloudwatch Management Console](https://console.aws.amazon.com/cloudwatch/) and look for the name of the EKS cluster in the table.

1. Clicking it should take you to a new page that displays a list of entries. Each of these correspond to a `Pod` in the
   cluster, and contain the `Pod` name. Look for the one that corresponds to the failing `Pod` and click it.

1. You should be presented with a real-time log stream of the container. If your app logs to STDOUT, its logs will show
   up here. You can export the logs and analyze it in your preferred tool or use [CloudWatch Log
   Insights](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html) to query the logs directly
   in the AWS web console.

</TabItem>

</Tabs>
