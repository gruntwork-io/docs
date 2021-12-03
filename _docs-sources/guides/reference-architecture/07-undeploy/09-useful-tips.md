# Useful tips

- **Destroy resources in groups instead of all at once.**
  - There are [known instabilities](#known-errors) with destroying many modules at once. In addition, Terragrunt is
      designed to process the modules in a graph, and will not continue on if there is an error. This means that you
      could run into situations where Terragrunt has destroyed a module, but returns an error due to Terraform bugs that
      prevent you from cleanly calling destroy twice.
  - To address these instabilities, it is recommended to destroy the resources in groups. For example, you can start
      by destroying all the services first (e.g., `stage/REGION/stage/services`), then the data stores (e.g.,
      `stage/REGION/stage/data-stores`), and finally the networking resources (e.g., `stage/REGION/stage/networking`).
  - When identifying groups to destroy, use [terragrunt
      graph-dependencies](https://terragrunt.gruntwork.io/docs/reference/cli-options/#graph-dependencies) to view the
      dependency graph so that you destroy the modules in the right order.

- **Empty + Delete S3 buckets using the web console (when destroying whole environments).**
  - As mentioned in [Pre-requisite: force_destroy on S3 buckets](#pre-requisite-force_destroy-on-s3-buckets), it is
      recommended to set `force_destroy = true` prior to running destroy so that terraform can destroy the S3 buckets.
      However, this can be cumbersome if you are destroying whole environments, as it can be difficult to flip the bit in
      every single module.
  - Instead, oftentimes it is faster and more convenient to first empty and then delete the buckets using the AWS web console prior to
      invoking `destroy` with `terragrunt`.
  - **IMPORTANT**: You should only do this if you are intending on destroying an entire environment. Otherwise, it is
      too easy to accidentally delete the wrong S3 bucket.
