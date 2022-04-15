# Key CI / CD features

## Defined as code

The CI / CD pipeline itself should be defined as code too. That means you shouldn't use a UI to configure the pipeline, but instead, every step and every configuration in your pipeline should be defined in files that are checked into version control somewhere.

## GitOps-driven

The CI / CD pipeline should be triggered in response to events in your version control system—e.g., new commits, new tags, etc—an approach sometimes referred to as *GitOps-driven*, as Git is by far the most popular version control system these days. This way, you can pass every single commit (every single change to your code) through an automated build process that includes static analysis, automated testing, policy checks, and so on. Since the Service Catalog and CI / CD pipeline are the only route to prod, and as both are defined as code, then modifying that code is the only way to get anything to prod, which means that every change, every build, and every deploy in your company will be tracked in your version control history, which is a very powerful tool to have for debugging and auditing.

## Tests

As described in the previous section, all the code in the Service Catalog should have a variety of automated tests. The CI / CD pipeline is what executes those tests on a regular basis: in most cases, after every single commit, as per the GitOps model. This leads to a profound change in most companies (hat tip to the book *Continuous Delivery*): without automated testing in a CI / CD pipeline, the default state of your code is that it's broken, and before each release, you must do a bunch of manual testing to prove it's in a working state; with automated testing in a CI / CD pipeline, the default state of your code is that it's working (assuming the tests are passing), which means you can release & deploy at any time you want.

## Preview environments

When a developer makes some code changes and opens a pull request, the CI / CD system should not only run tests, but, where appropriate, spin up a new preview environment that shows the updated code actually running. For example, if the developer made a change to a Ruby on Rails app, the CI / CD system would spin up a copy of that app in some preview environment, and update the pull request with the preview URL everyone can use to see those code changes in action. That way, team members can review not only the code changes, but also see what impact those changes had on a real, running system.

## Promotion workflows

The recommended way to deploy code is to package it in an *immutable, versioned artifact*—e.g., for Java code, that might be a `.jar` file with a specific version, whereas for Terraform code, that might be a specific Git tag on a specific repo—and to *promote* that artifact from one environment to another: e.g., `dev` → `stage` → `prod`. That way, you are deploying the *exact* same code in each environment, so if it works in one place (e.g., `stage`), it's more likely to work in another (e.g., `prod`). Moreover, if you hit any problems, you should be able to go back to any previous version of an artifact just as easily ("rollback").

## Approval workflows

Deployments to sensitive environments (e.g., `prod`) and in regulated environments (e.g., PCI compliance) can require approvals from specific team members. Those team members would get a notification by email or chat (e.g., Slack), can review the request (including what is being deployed and by whom), and then approve or deny the deployment.

## Deployment workflows

Depending on what you're deploying, you'll want your tools to support different deployment workflows and strategies, such as blue/green deployments, rolling deployments, and canary deployments. You'll also want to make use of [feature toggles](https://martinfowler.com/articles/feature-toggles.html) to be able to separate deployment from release, do dark launches, ramp up new features, and do bucket testing.

## Application and infrastructure code

The CI / CD pipeline needs to work with both application code (e.g., a web service written in Java, Ruby, Go, or Python) and infrastructure code (e.g., Terraform, CloudFormation). These two types of pipelines have slightly different requirements. For a detailed side-by-side look at application and infrastructure pipelines, check out [How to Use Terraform as a Team](https://blog.gruntwork.io/how-to-use-terraform-as-a-team-251bc1104973).

## Example

For a concrete example of a CI / CD Pipeline for AWS, see [Set up a CI/CD Pipeline for
AWS](https://docs.gruntwork.io/docs/guides/build-it-yourself/landing-zone/).


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"be59b854b7665f188f7878b449f542e7"}
##DOCS-SOURCER-END -->
