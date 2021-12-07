## What this guide will not cover

CI/CD for infrastructure code is a large topic and a single guide cannot cover everything. There
are several items that this guide will not cover, including:

A pipeline for setting up new environments  
This guide will focus on a CI/CD workflow for making changes to infrastructure in an environment that is already set
up. In other words, the design and implementation of the pipeline covered in this guide intentionally does not solve
the use case of infrastructure code for setting up an environment from scratch. Setting up new environments typically
require complex deployment orders and permissions modeling that complicate the task. This makes it hard to automate in
a reasonable fashion that still respects the threat model we cover here.

Automated testing and feature toggling strategies for infrastructure code  
An important factor of CI/CD pipelines is the existence of automated testing and feature toggles. Automated tests give
you confidence in the code before it is deployed to production. Similarly, feature toggles allow you to partially
integrate and deploy code for a feature without enabling it. By doing so, you are able to continuously integrate new
developments over time. This guide will briefly introduce automated testing and feature toggles for infrastructure
code, but will not do a deep dive on the subject. You can learn more about best practices for automated testing in our
talk
[Automated
testing for Terraform, Docker, Packer, Kubernetes, and More](https://blog.gruntwork.io/new-talk-automated-testing-for-terraform-docker-packer-kubernetes-and-more-cba312171aa6) and blog post
[Agility requires safety](https://www.ybrikman.com/writing/2016/02/14/agility-requires-safety/).



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"0ce56aacbf281fc54c17042cccfa20d2"}
##DOCS-SOURCER-END -->
