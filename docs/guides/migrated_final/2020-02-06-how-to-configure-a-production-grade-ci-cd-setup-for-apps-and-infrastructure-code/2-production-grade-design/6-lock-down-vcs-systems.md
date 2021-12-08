# Lock down VCS systems

It is a good practice to define and store the deployment pipeline as code in the same repo that it is used. For example,
you should define the CI/CD deployment pipeline for your infrastructure code in the `modules` and `live` repositories.
However, this means that anyone with access to those repositories could modify the pipeline, _even on feature
branches_. This can be exploited to skip any approval process you have defined in the pipeline by creating a new branch
that overwrites the pipeline configuration.

This is not a concern if only admin users had access to the infrastructure code. Typically, however, many operations
teams want contributions to the infrastructure code from developers as well, and having any developer have the ability to
deploy arbitrary infrastructure to production without any review can be undesirable. To mitigate these concerns, you
should lock down your VCS systems:



<div className="dlist">

#### Only deploy from protected branches

In most git hosting platforms, there is a concept of protected branches (see
[GitHub docs](https://help.github.com/en/github/administering-a-repository/about-protected-branches) for example).
Protected branches allow you to implement policies for controlling what code can be merged in. For most platforms, you
can protect a branch such that: (a) it can never be force pushed, (b) it can never be merged to or commit to from the
cli, (c) merges require status checks to pass, (d) merges require approval from N reviewers. By only building CI
pipelines from protected branches, you can add checks and balances to ensure a review of potentially harmful
infrastructure actions.

#### Consider a forking based workflow for pull requests

When exposing your repository to a wider audience for contribution, you can consider implementing a forking based
workflow. In this model, you only allow your trusted admins to have access to the main infrastructure repo, but anyone
on the team can read and fork the code. When non-admins want to implement changes, instead of branching from the repo,
they will fork the repo, implement changes on their fork, and then open a PR from the fork. The advantage of this
approach is that many CI platforms do not automatically run builds from a fork for security reasons. Instead, admins
manually trigger a build by pushing the forked branch to an internal branch. While this is an inconvenience to devs as
you won’t automatically see the `plan`, it prevents unwanted access to secrets by modifying the CI pipeline to log
internal environment variables or show infrastructure secrets using external data sources.


</div>



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"28b74b41a338fbba55864423e4a466b1"}
##DOCS-SOURCER-END -->
