# Publishing your docker image

Once you've verified that you can build your app's docker image without any errors, the next step is to publish those
images to an [ECR repo](https://aws.amazon.com/ecr/). All ECR repos are managed in the `shared-services` AWS account.

First, you'll need to create the new ECR repository.

1. Create a new branch on your infrastructure-live repository: `git checkout -b simple-web-app-repo`.
1. Open [`repos.yml` in
`shared/us-west-2/_regional/ecr-repos`](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-production/infrastructure-live/shared/us-west-2/_regional/ecr-repos/repos.yml) and
add the desired repository name of your app. For the purposes of our example, let's call
ours `simple-web-app`:

```yaml
simple-web-app:
  external_account_ids_with_read_access:
  # NOTE: we have to comment out the directives so that the python based data merger (see the `merge-data` hook under
  # blueprints in this repository) can parse this yaml file. This still works when feeding through templatefile, as it
  # will interleave blank comments with the list items, which yaml handles gracefully.
  # %{ for account in accounts }
  - '${account}'
  # %{ endfor }
  external_account_ids_with_write_access: []
  tags: {}
  enable_automatic_image_scanning: true
```

1. Commit and push the change:

```bash
git add shared/us-west-2/shared/data-stores/ecr-repos/terragrunt.hcl && git commit -m 'Added simple-web-app repo' && git push
```

1. Now open a pull request on the `simple-web-app-repo` branch.

This will cause the ECS deploy runner pipeline to run a `terragrunt plan`. If the plan output looks correct with no errors, somebody can review and approve the PR. Once approved, you can merge, which will kick off a `terragrunt apply` on the deploy runner, creating the repo. Follow the progress through your CI server.

Once the repository exists, you can use it with the Docker image.Each repo in ECR has a URL of the format `<ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com/<REPO_NAME>`. For example, for the `shared-services` account
with ID `234567890123`, an ECR repo in `us-west-2`, and an app called `simple-web-app`, the registry URL would be:

```bash
234567890123.dkr.ecr.us-west-2.amazonaws.com/simple-web-app
```

You can create a Docker image for this repo, with a `v1` label, as follows:

```bash
docker tag simple-web-app:latest 234567890123.dkr.ecr.us-west-2.amazonaws.com/simple-web-app:v1
```

Next, authenticate your Docker client with ECR in the shared-services account:

```bash
aws ecr get-login-password --region "us-west-2"  | docker login --username AWS --password-stdin 234567890123.dkr.ecr.us-east-1.amazonaws.com
```

And finally, push your newly tagged image to publish it:

```bash
docker push 234567890123.dkr.ecr.us-west-2.amazonaws.com/simple-web-app:v1
```
