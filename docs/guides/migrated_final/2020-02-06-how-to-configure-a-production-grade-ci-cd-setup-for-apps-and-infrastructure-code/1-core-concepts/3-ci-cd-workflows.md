# CI/CD workflows

Now that we have gone over what, why, and how CI/CD works, let’s take a look at a more concrete example walking through
the workflow.

The following covers the steps of a typical CI/CD workflow. Most code will go through this workflow, whether it be for
infrastructure code or application code. However, the details of the steps may differ significantly due to the
properties of infrastructure code.

In this section, we will compare each step of the workflow for application code, infrastructure modules, and live
infrastructure config side by side. Application code refers to code to run an application written in a general purpose
programming language (e.g., Ruby, Java, Python, etc), while infrastructure modules and live infrastructure config refer to
infrastructure code (e.g., Terraform, CloudFormation, Ansible, etc) organized as described in the previous section. CI/CD
for application code is well understood in the industry, so we show it side by side with infrastructure code here
as a reference point to make it easier to understand the workflow for infrastructure code.

For the purposes of illustrating this workflow, we will assume the following:

- The code lives in version control.

- We are using a trunk-based development model.

- The code has already been in development for a while and there is a version running in production.

Here are the steps:

1.  [Clone a copy of the source code and create a new branch](#clone_a_copy_of_the_source_code)

2.  [Run the code locally](#run_the_code_locally)

3.  [Make code changes](#make_code_changes)

4.  [Submit changes for review](#submit_changes_for_review)

5.  [Run automated tests](#run_automated_tests)

6.  [Merge and release](#merge_and_release)

7.  [Deploy](#deploy)

## Clone a copy of the source code and create a new branch

Typically the first step in making changes to any code base is to clone the repository locally and begin development on
a new branch. Having a local copy makes it easier to iterate on the changes, and using an isolated branch allows you to
push code back to the central repository without breaking the main line of code (trunk) that everyone else is working
on.

If you are using `git`, this step translates to:

    git clone $REPO_URL
    git checkout -b $NEW_BRANCH_NAME

Whether you are developing application code, infrastructure modules, or live infrastructure config, making changes on a
separate branch is a good idea. However, what you do to test that code will be vastly different, as we’ll cover in the
next section.

## Run the code locally

Before making any code changes, you want to make sure that you are working off of a clean slate. If you start off of
broken code, you won’t know if the feature isn’t working because of a bug in the trunk, or if it is your code. It is
always a good idea to run the code locally to sanity check the current state of trunk to make sure you are starting from
working code.

How to run the code locally will be very different depending on the type of code you are working with:

Application Code  
You can typically spin up a local environment for application code to test it out. For example, if you had a simple
web server written in a general purpose programming language such as Ruby, you can run the server code to bring up a
local copy of the application that you can interact with (e.g., `ruby web-server.rb`). You can then manually test it by
loading the web server in the browser. Alternatively, you could run the automated test suite associated with your
application (e.g., `ruby web-server-test.rb`). The point is that (almost) everything can be done locally for fast
iteration.

Infrastructure Modules  
You will need to bring up real infrastructure to test infrastructure code. Unlike with application code, there is no
way to have a true and complete local copy of a cloud. Therefore, the only way to know for sure your infrastructure
code works is by making the actual API calls to the cloud to deploy it. With infrastructure modules, this involves
deploying the module into a sandbox environment. For example, to test a terraform module, you can define example code
that sets up the necessary resource dependencies that the module needs, and then deploy that into your sandbox with
`terraform apply`. You can then inspect the deployed resources to make sure they are functioning as expected. For
convenience, this process could be captured in an automated test using a framework such as
[Terratest](https://terratest.gruntwork.io/).

Live Infrastructure Config  
Locally testing live infrastructure config is more difficult than either application code or infrastructure modules.
Unlike with infrastructure modules, it is difficult to deploy the live infrastructure config temporarily as the code
is tied to a specific live environment by nature of the code. After all, this is the configuration to manage live
infrastructure.  
To illustrate this point, consider a scenario where you are working on updating the cross account IAM
roles to access your environments, and you are at the point of reflecting your changes to prod. Would you want to
deploy that code to your live production environment off of an unreviewed branch?  
The only real test you can do for live infrastructure config is to do a dry run of your infrastructure code. Most
Infrastructure as Code tools support a dry run of the code to check what it would do against your environment. For
example, with Terraform, you could run `terraform plan` to sanity check the planned actions Terraform will take. This
is especially useful for sanity checking a fresh clone of the code. The trunk should be a true reflection of the live
environment, so you should expect there to be no changes to make on a fresh clone of trunk.

## Make code changes

Now that you have a working local copy, you can start to make changes to the code. This process is done iteratively
while checking for validity of the changes along the way with manual or automated testing. It is important to invest
some time and effort in making the feedback cycle short, as it directly translates to your development speed. The faster
you can iterate, the more tests you can run, and the better your code will be.

How you make changes to the code will be largely the same for the three flavors of code we covered, although how you
test your changes and the test cycles will be different. Typically, testing application code can be done in seconds
(because everything is local), and testing live infrastructure config can be done in minutes (because you are only doing
a dry run). However, testing infrastructure modules can take a long time since you need to deploy infrastructure (on the
order of 10s of minutes). For ideas on how to improve the test cycles for infrastructure modules, take a look at
[Iterating locally using
test stages](https://terratest.gruntwork.io/docs/testing-best-practices/iterating-locally-using-test-stages/) in the Terratest documentation.

## Submit changes for review

Once the code implementation is done and the testing passes, the next step is to submit it for review. You want to focus
your review process on things that are hard to check through automated testing, such as checking security flaws,
reviewing general code design, enforcing style guides, or identifying potential performance issues on larger data sets.
Code review processes are also a great way to share knowledge across the team. The reviewer will oftentimes share
valuable insights on the code that you might not have thought of.

## Run automated tests

To help with code review, you should also set up a CI server (such as Jenkins or CircleCI) with commit hooks that
automatically trigger testing of any branch that is submitted for review. Running the automated tests in this fashion
not only ensures that the code passes all the tests, but also ensures that you can have a consistent build process on a
repeatable and isolated platform. This is also a good way to run an extensive test suite that takes a long time to run.
Most developers will run a subset of the tests that relate to the feature work being done, as it leads to faster
feedback cycles.

The tests that the CI server runs will be different across the three flavors of code:

Application Code  
The CI server should run the entire automated test suite for the application code, and report the results as a
summary. Since automated testing has clear results (whether it failed or passed), you can usually summarize the report
down to a single icon (a green check mark to indicate success or a red "X" for failure). For reporting failures, most
CI servers has first class support for consuming the results of the test framework to display cleanly in the UI.

Infrastructure Modules  
Like with application code, the CI server should run automated tests for infrastructure modules. However, since
tests for infrastructure modules can cost money and can take a long time to run, it is recommended to only run the
tests for the modules that changed instead of doing a regression test for all the modules on every commit. You can run
a nightly build that runs the whole suite on a regular interval that is less frequent than developers updating the
code. Like with application code, automated infrastructure testing is also very clear when it comes to results so
you can use the same reporting mechanisms to share results back to the PR.

Live Infrastructure Config  
For live infrastructure config, the CI server should perform the dry run of the infrastructure and post the entire
log of the run. Analyzing a plan is hard to automate since the rules surrounding what changes are ok and what changes
are not is potentially limitless. Therefore, the only way to review the results is by looking at the entire dry run.
Note that this has potential security issues as the logs for a dry run would typically include secrets. You will want
to be sensitive to who has access to the logs, and potentially encrypt the results before it is posted.

## Merge and release

Once the code passes automated checks and goes through the review process, it is ready to be integrated into the trunk.
Once you merge the code into trunk, you will also want to generate a new,
immutable, versioned release artifact that can be deployed (see
[Mutable
infrastructure vs Immutable infrastructure](https://blog.gruntwork.io/why-we-use-terraform-and-not-chef-puppet-ansible-saltstack-or-cloudformation-7989dad2865c#b264:)). What the release artifact looks
like depends on the type of code you are working with:

Application Code  
The release artifact will vary widely from project to project for application code. This could be anything from a
source file tarball or a `jar` file executable to a docker image or a VM image. Whatever format the artifact is in,
make sure the artifact is immutable (i.e., you never change it), and that it has a unique version number (so you can
distinguish this artifact from all the others).

Infrastructure Modules  
Infrastructure modules are typically consumed as a library in the tool. Most infrastructure as code tools consume
libraries directly from a Git repository. For example, with Terraform you can consume modules through module blocks
that reference a Git repository (see
[the official documentation](https://www.terraform.io/docs/configuration/modules.html) for more details). In this case,
using a Git tag to mark a revision with a human friendly name is sufficient to generate the release artifact.

Live Infrastructure Config  
For live infrastructure config, there is typically no release artifact. Live infrastructure code doesn’t need to be
packaged to deploy as it is directly consumable. For example, for Terraform or Terragrunt live config, you can
directly run `terraform apply` or `terragrunt apply` on the repo. In general, it is not necessary to tag your commits
for live infrastructure config because in practice you will end up deploying every commit off trunk.

It is worth expanding a bit on the reason why live infrastructure config does not have any release artifact. To
understand this, consider what it means to have a working trunk on live infrastructure config. If you
recall from [Run the code locally](#run_the_code_locally), the only way to test live infrastructure config is by doing a dry run of the code.
If the only way to test live infrastructure config is with dry runs, then you would want to make sure that there are no
new changes to make to the live environments when you start. This is so that you get an accurate representation of the
changes that are being introduced, since you don’t want to be differentiating between existing changes that will be
applied from trunk and the changes that will be applied with your new code.

Given that, the definition of a "clean build" for the trunk with live infrastructure config is that a dry run returns no
changes to make. This in turn means that the latest state of trunk that you are working off of should be a
representation of what is actually deployed in your environments. Therefore, to ensure the trunk is clean, you will need
to make sure that you continuously deploy and apply the trunk as new code is merged in.

This leads to what we call _The Golden Rule of Infrastructure Code:_

**_The master branch of the live repository should be a 1:1 representation of what’s actually deployed._**

You will want to do everything that is in your power to maintain this representation to streamline your development.

## Deploy

Now that you have a release artifact, the final stage of the process is to deploy the code.

What it means to "deploy the code" is significantly different across the three flavors. In fact, deploying your
application code and infrastructure modules require changing and deploying live infrastructure config. After all, your
live infrastructure config is a reflection of what’s actually deployed, so deploying application or infrastructure
changes require updating the live infrastructure config.

Let’s take a look at how to deploy each flavor of code:

Application Code  
Deploying the release artifact to your environment depends on how the code is packaged. If it is a library, then it
will be deployed when the application that consumes it updates the library version. In this case, nothing needs to be
done to deploy it to the application. For services, you would need to deploy the application onto live servers so that
it is running. For docker images, this might mean updating your service definitions for the docker cluster (e.g., ECS or
Kubernetes). For machine images, this might mean updating your autoscaling group to deploy instances with the new
image. Regardless of how your application is deployed, it is important to reflect the changes in your live
infrastructure config to perform the deployment. Note that there are various strategies for deploying application
code, such as canary and blue-green deployments. We will not get into details here, but you can refer to our post
[How to use Terraform as a team](https://blog.gruntwork.io/how-to-use-terraform-as-a-team-251bc1104973#7dd3) for an
overview of various rollout strategies. In terms of automation, you should be able to automate the entire deployment
as the surface area of each change should be fairly small and localized to just the application.

Infrastructure Modules  
To deploy your infrastructure modules, you need to create or update references to the modules in your live
infrastructure config. If the module is already deployed, this may be as simple as bumping the ref tag in your live
config. However, if the module is being deployed for the first time, then this will require creating a new
configuration in your live infrastructure config to deploy the module. In either case, the only way to deploy
infrastructure modules is by making the corresponding edits to the live infrastructure config to roll out the changes
across your environments. In terms of automation, an automated deployment of infrastructure modules may be risky as a
simple change could destroy your database.  
With that said, it is not practical to always manually roll out deployments even for infrastructure modules, and in
some circumstances that can be more risky from a security perspective (e.g., increasing attack surface by passing out
admin credentials to all your developers). To handle this, we impose human verification to the automated steps of the
workflow. That is, we do automated deployments like with application code, but include a human approval step of the
`plan` before proceeding.

Live Infrastructure Config  
For live infrastructure config, deploying the code is the act of applying the code to the live environment. This
depends on the tool. For example, your terraform code can be applied with `terraform apply` or `terragrunt apply`,
while Kubernetes manifests require `kubectl apply`. In terms of automation, since live infrastructure config changes
include both modules and application code, what you automate should depend on the nature of the change. Which
deployments to automated depend on the nature of the change, so typically the pipeline differs based on which
configurations were updated.

## Summary

To summarize, here is a table highlighting each step of a typical CI/CD workflow and how it is implemented with each
flavor of code:

<table>
<caption>Typical CI/CD workflow for application code, infrastructure modules, and live infrastructure config.</caption>
<colgroup>
<col/>
<col/>
<col/>
<col/>
</colgroup>
<tbody>
<tr className="odd">
<td><p><strong>Workflow Step</strong></p></td>
<td><p>Application Code</p></td>
<td><p>Infrastructure Modules</p></td>
<td><p>Live Infrastructure Config</p></td>
</tr>
<tr className="even">
<td><p><strong>Clone local copy</strong></p></td>
<td><pre><code>git clone $REPO
git checkout -b $NAME</code></pre>
<p> <br />
</p></td>
<td><pre><code>git clone $REPO
git checkout -b $NAME</code></pre>
<p> <br />
</p></td>
<td><pre><code>git clone $REPO
git checkout -b $NAME</code></pre>
<p> <br />
</p></td>
</tr>
<tr className="odd">
<td><p><strong>Run the code locally</strong></p></td>
<td><ul>
<li><p>Run on localhost:<br />
<code>ruby web-server.rb</code></p></li>
<li><p>Run automated tests:<br />
<code>ruby web-server-test.rb</code></p></li>
</ul></td>
<td><ul>
<li><p>Run in a sandbox environment:<br />
<code>terraform apply</code></p></li>
<li><p>Run automated tests:<br />
<code>go test</code></p></li>
</ul></td>
<td><ul>
<li><p>Dry run:<br />
<code>terraform plan</code></p></li>
</ul></td>
</tr>
<tr className="even">
<td><p><strong>Make code changes</strong></p></td>
<td><ul>
<li><p>Change the code</p></li>
<li><p>Test manually</p></li>
<li><p>Run automated tests</p></li>
</ul></td>
<td><ul>
<li><p>Change the code</p></li>
<li><p>Test manually</p></li>
<li><p>Run automated tests</p></li>
<li><p>Use test stages for faster iteration</p></li>
</ul></td>
<td><ul>
<li><p>Change the code</p></li>
<li><p>Dry run to check changes</p></li>
</ul></td>
</tr>
<tr className="odd">
<td><p><strong>Submit changes for review</strong></p></td>
<td><ul>
<li><p>Submit a pull request</p></li>
<li><p>Enforce coding guidelines</p></li>
</ul></td>
<td><ul>
<li><p>Submit a pull request</p></li>
<li><p>Enforce coding guidelines</p></li>
</ul></td>
<td><ul>
<li><p>Submit a pull request</p></li>
<li><p>Enforce coding guidelines</p></li>
<li><p>Review plan</p></li>
</ul></td>
</tr>
<tr className="even">
<td><p><strong>Run automated tests</strong></p></td>
<td><ul>
<li><p>Tests run on CI server</p></li>
<li><p>Local environment on CI server</p></li>
<li><p>Tests:</p>
<ul>
<li><p>Unit tests</p></li>
<li><p>Integration tests</p></li>
<li><p>End-to-end tests</p></li>
<li><p>Static analysis</p></li>
</ul></li>
<li><p>Summary results</p></li>
</ul></td>
<td><ul>
<li><p>Tests run on CI server</p></li>
<li><p>Sandbox environment</p></li>
<li><p>Tests:</p>
<ul>
<li><p>Unit tests</p></li>
<li><p>Integration tests</p></li>
<li><p>Static analysis</p></li>
</ul></li>
<li><p>Summary results</p></li>
</ul></td>
<td><ul>
<li><p>Dry run changes from CI server</p></li>
<li><p>Live environments</p></li>
<li><p>Tests:</p>
<ul>
<li><p>Static analysis</p></li>
</ul></li>
<li><p>Full plan output</p></li>
</ul></td>
</tr>
<tr className="odd">
<td><p><strong>Merge and release</strong></p></td>
<td><ul>
<li><p><code>git tag</code></p></li>
<li><p>Create versioned, immutable artifact:</p>
<ul>
<li><p><code>docker build</code></p></li>
<li><p><code>packer build</code></p></li>
</ul></li>
</ul></td>
<td><ul>
<li><p><code>git tag</code></p></li>
</ul></td>
<td><p>No release artifact</p></td>
</tr>
<tr className="even">
<td><p><strong>Deploy</strong></p></td>
<td><ul>
<li><p>Automatically update Live Infrastructure Config with new image.</p></li>
<li><p>Many strategies: canary, blue-green, rolling deployment.</p></li>
<li><p>Promote immutable, versioned artifacts across environments.</p></li>
</ul></td>
<td><ul>
<li><p>Manually update Live Infrastructure Config with new ref tag.</p></li>
<li><p>Limited deployment strategies.</p></li>
<li><p>Promote immutable, versioned artifacts across environments.</p></li>
</ul></td>
<td><ul>
<li><p>Continuously deploy directly from master (with approval workflow).</p></li>
<li><p>Only one deployment strategy.</p></li>
</ul></td>
</tr>
</tbody>
</table>

Typical CI/CD workflow for application code, infrastructure modules, and live infrastructure config.

The rest of the document will discuss how we can implement the automated pieces of the workflow in a secure manner that
is ready for production.

To start, let’s take a step back and define a threat model for CI/CD. This threat model will help us ensure that we
implement the necessary security controls in these CI/CD pipelines so that we cover the common types of attack vectors
for this type of workflow.



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"439ca093f2258cb0abf14d57296ee10f"}
##DOCS-SOURCER-END -->
