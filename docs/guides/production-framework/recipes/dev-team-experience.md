# Dev team experience

Let's imagine that you've started a team with two developers, Ann and Bob. The two of them are starting a brand new app. This app will be a web service called `search` that your customers will be able to access at `https://search.your-company.com`. Here is how Ann and Bob can bring this app to life:

## Scaffold the app

1. First, Ann browses your company's Service Catalog to see what languages and frameworks you support for web services. She sees a list that includes:
    1. Java on Spring Boot.
    2. Ruby on Rails.
2. Ann and Bob are both familiar with Ruby on Rails, so Ann picks that, enters `search` as the name, and clicks "Create new Ruby on Rails app". The Service Catalog then:
    1. Creates a new repo called `search` in your company's GitHub org.
    2. Generates the scaffolding for the Ruby on Rails app and commits the code to the `search` repo. The scaffolding includes all the basic libraries, packaging tools, monitoring code, automated test scaffolding, and everything else a web service needs to have to meet your company's requirements.
    3. Configures a CI / CD pipeline for the `search` repo so that you get automatic builds and tests (but not yet deployment) for the app.
    4. Configures required code reviews for every merge to the `main` branch.
    5. Provides Ann with instructions on how to check out the repo and get started.

## Run the app

1. Ann follows the instructions to `git clone` the repo.
2. Inside, she finds a `README` with further instructions.
3. Following the `README`, she runs `docker-compose up` to fire up the app.
4. Now she can code locally and use `localhost:3000` to test manually.
5. The app scaffold includes tests, so Ann can use `rails test` to test automatically.

## Scaffold new features in the app

1. Occasionally, Ann will come back to the Service Catalog to look up how to accomplish common tasks in the Ruby on Rails app.
2. Example #1: The `search` service may need to read a secret, such as a database password. Secrets management should be one of the core use cases in your Service Catalog, so when Ann looks it up, the Service Catalog generates some example code for her showing, for example, how to read secrets from HashiCorp Vault while the app is booting, and checks that example code directly into a branch of the `search` repo for Ann to build on top of.
3. Example #2: While Ann is working on the `search` service, she realizes that the service should only be accessible to logged in users, so she browses the Service Catalog for how to handle auth. The Service Catalog generates and checks in some code that shows Ann how to make API calls to your company's `auth` service, how to extract data from the response, and how to redirect the user to a login page if they aren't logged in.

## Deploy the infrastructure

1. Meanwhile, Bob heads over to the Service Catalog to set up the infrastructure for the new app. First, he sees the clouds your company uses:
    1. AWS
    2. Azure
2. Due to the way the ACLs are setup in your Service Catalog, the organization Ann and Bob are in only has access to AWS, so that's what Bob picks.
3. Next, he sees a list of services available:
    1. App deployment (EKS)
    2. Database (RDS)
    3. Cache (ElastiCache)
    4. (... etc ...)
4. Bob wants to deploy just their app for now, so he picks "App deployment (EKS)".
5. The Service Catalog prompts him to enter some information, such as:
    1. The name of the app.
    2. The repo the app's code is in.
    3. How many replicas to run.
    4. How much CPU and memory the app needs.
    5. What domain name to configure for the app.
    6. Who the service owners are.
6. Bob enters all this info and clicks "create."
7. Let's assume your company uses Terraform and Terragrunt to manage your infrastructure. At this point, the Service Catalog does the following:
    1. Deploys a new EKS cluster in each environment. Under the hood, this could be done by going into the `infrastructure-live` repo and creating a new `terragrunt.hcl` to deploy an EKS cluster in each of the `dev`, `stage`, and `prod` environments. The EKS cluster would be deployed using an `eks-cluster` module in the Service Catalog that has been tested to meet all your company's requirements out-of-the-box: e.g., it's configured with Istio as a service mesh, uses self-managed, hardened EC2 instances as worker nodes, has pod and network security policies built in, and so on.
    2. Creates a new ECR repo to store the Docker image for the app. Under the hood, this could be done by going into the `infrastructure-live` repo, adding `search` to the list of repos in `ecr-repos/terragrunt.hcl` in the `shared` environment, committing the changes to `main`, and allowing the CI / CD pipeline to run `terragrunt apply`.
    3. Creates the code to deploy the app in each environment. Under the hood, this could be done by going into the `infrastructure-live` repo and creating a new `terragrunt.hcl` as a thin wrapper around a Helm chart, in each of the `dev`, `stage`, and `prod` environments to deploy the Docker image into the EKS cluster.
    4. Updates the CI / CD configuration for the app to automatically deploy it into this EKS cluster. Under the hood, this could be done by going into the `search` repo and updating the CI / CD config to build a Docker image, push it to the new ECR repo, and deploy it to the EKS cluster in the proper environment based on the branch and tags.

## Iterate on the app

1. Ann makes some changes to the `search` app.
2. She commits those changes to a branch.
3. Ann opens a pull request (PR).
4. The CI / CD pipeline runs the automated tests and updates the PR with the results.
5. The CI / CD pipeline deploys the app into a preview environment (e.g., `dev`).
6. Bob reviews the code, and if everything looks good, gives it the "ship it!"
7. Ann merges the PR to `main`.
8. The CI / CD pipeline deploys the changes to `stage`.
9. Ann, Bob, and other team members test in `stage`.
10. If everything looks good, Ann creates a `release-xxx` tag in the `search` repo.
11. The CI / CD pipeline deploys the app to `prod`.
12. The deployment is fully automated, handled via Kubernetes, and configured via the Helm chart to do a rolling, zero-downtime deployment.

## Maintain the app

1. One day, Bob gets an alert that the `search` app is down, and jumps in to debug the issue.
2. The alert that notified Bob comes from CloudWatch, which was configured by the Helm chart, out-of-the-box, to notify service owners if the health check suddenly starts failing.
3. To figure out what's going on, Bob logs into the company's AWS accounts using his Google account. This is possible because those AWS accounts were set up with an account baseline from the Service Catalog that configured Single Sign-On (SSO) with Google as the Identity Provider (IdP).
4. Bob is able to find the metrics and logs for the `search` app in CloudWatch, as the Rails app scaffolding and the Helm chart were configured to send all logs and metrics there.
5. Using the logs, Bob is able to figure out what the error is, and get it fixed.

## Automatically update the app

1. Over the next few months, maintainers release new versions of the code Ann and Bob depend on.
2. Example #1: The maintainer of the Ruby on Rails app scaffold and libraries releases a new version of the authentication code with a critical bug fix.
    1. Immediately, a new PR is automatically opened in the `search` repo.
    2. The CI / CD pipeline runs the tests, which pass.
    3. The repo is configured to auto-merge critical security patch and minor releases, so the PR merges to `main` automatically.
    4. The CI / CD pipeline automatically builds a Docker image and deploys it to `dev`.
    5. Smoke tests run in the `dev` environment and pass.
    6. The CI / CD pipeline automatically deploys to `stage`.
    7. Ann and Bob review what happened and create a new `release-nov-12-2021` tag to trigger a deploy to prod.
3. Example #2: The maintainer of the Helm chart Ann and Bob use releases a few new versions with minor new features.
    1. Once per month, the auto-update system opens a PR to update the `search` app to use the new version of the Helm chart.
    2. The changes go through the same release process as above.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "6f688e879fc6b7981c52a0c651d4781a"
}
##DOCS-SOURCER-END -->
