# Docker

[Docker](https://www.docker.com) is an open source tool you can use to run _containers_ and define _container images_ as
code. A container is a bit like a lightweight VM, except instead of virtualizing all the hardware and the entire
operating system, containers virtualize solely user space, which gives you many of the isolation benefits of a VM
(each container is isolated in terms of memory, CPU, networking, hard drive, etc), but with much less memory, CPU, and
start-up time overhead. For example, here is how you can define an Ubuntu 18.04 Docker image that has Node.js installed:

```dockerfile title="Dockerfile"
FROM ubuntu:18.04

RUN curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash - && \
    sudo apt-get update -y && \
    sudo apt-get install -y nodejs
```

You can run `docker build -t example-image .` to build a Docker image from this code, push the image to a Docker
Registry (e.g., ECR or Docker Hub), and then deploy the Docker image using other tools. For example, the Gruntwork
Infrastructure as Code Library contains a number of modules for running _container orchestration tools_ such as Kubernetes, ECS, and
Nomad that you can use to deploy and manage Docker images.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"ac4aef92859a42de2010069751aa1766"}
##DOCS-SOURCER-END -->
