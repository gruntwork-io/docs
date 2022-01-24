# Ops team experience

On the Ops side, Carol and Daniel are responsible for maintaining your Service Catalog and CI / CD pipeline:

## Update a module in the Service Catalog

1. Carol decides to update the `eks-cluster` module used by all your app developers to run EKS clusters.
2. Carol opens up the `infrastructure-modules` repo where the Terraform code for `eks-cluster` is stored, makes some changes, commits them to a branch, and opens a pull request (PR).
3. The CI / CD pipeline automatically runs tests for the PR, including:
    1. Static analysis checks such as `tflint` and `terraform fmt`.
    2. Functional tests written with Terratest. These use the `eks-cluster` module to deploy deploy real EKS clusters in a variety of configurations into an AWS account, make sure they work as expected, and then undeploy them at the end of the test.
    3. Compliance tests written with Open Policy Agent (OPA). These validate the `eks-cluster` module meets your company's security and compliance requirements, such as locking down access to ports, encrypting all volumes, limiting SSH access to solely the bastion host, and so on.
4. Daniel reviews the PR and test output, and if everything looks good, gives it the "ship it!"
5. Carlo merges the PR and releases a new version of the Service Catalog by creating a new Git tag.

## The Service Catalog update rolls out automatically

1. The auto-update system automatically discovers all users of the `eks-cluster` module and opens pull requests to update them to the new version of the `eks-cluster` module.
2. If the changes in `eks-cluster` were timely (e.g., critical security fix), the pull request will be automatically merged and deployed if tests pass.
3. For other types of changes, the pull request will be reviewed by the owners of those services, and merged and deployed according to their own schedule.

##  The Service Catalog itself is updated automatically

1. The Service Catalog itself may have dependencies: e.g., on the version of Terraform you're using or the version of a module from a 3rd party you rely on.
2. When a maintainer releases a new version of one of these dependencies, the auto-update system automatically opens a pull request in your `infrastructure-modules` repo to update to the new version.
3. The CI / CD system runs tests against this pull request.
4. Daniel reviews the changes and the test results, and if everything looks good, merges the pull request and releases a new version of the Service Catalog.
5. At this point, the auto-update system rolls out the new version of the Service Catalog to all users, just as in the previous section.
