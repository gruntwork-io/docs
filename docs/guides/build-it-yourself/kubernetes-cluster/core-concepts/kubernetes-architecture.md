# Kubernetes architecture

Let’s start by looking at Kubernetes from a very high level, and then gradually zoom in. When starting at this high
level, a simple way to think about Kubernetes is as an operating system for your data center.

![Kubernetes is like an operating system for your data center, abstracting away the underlying hardware behind its API](/img/guides/build-it-yourself/kubernetes-cluster/kubernetes-simple.png)

<div className="dlist">

#### Operating system for a single computer

On a single computer, the operating system (e.g., Windows, Linux, macOS) abstracts away all the low-level hardware
details so that as a developer, you can build apps against a high-level, consistent, safe API (the _Kernel API_),
without having to worry too much about the differences between many types of hardware (i.e., the many types of CPU,
RAM, hard drive, etc) or about managing any of the applications running on that hardware (i.e., the OS handles device
drivers, time sharing, memory management, process isolation, etc).

#### Operating system for a data center

In a data center, an orchestration tool like Kubernetes also abstracts away all the hardware details, but it does it
for multiple computers (multiple servers), so that as a developer, you can deploy your applications using a
high-level, consistent, safe API (the _Kubernetes API_), without having to worry too much about the differences
between the servers or about managing any of the applications running on those servers (i.e., the orchestration tool
handles deploying applications, restarting them if they fail, allowing them to communicate over the network, etc.).


</div>

To use the Kernel API, your application makes system calls. To use the Kubernetes API, you make HTTPS calls, typically
by using the official command-line utility for Kubernetes,
[kubectl](https://kubernetes.io/docs/reference/kubectl/overview/). When working with the Kubernetes API, you express
_what_ you want to deploy—i.e., which Docker containers, how many of them, what CPU, memory, and ports they need,
etc—in a YAML file, use `kubectl` to send that YAML file to Kubernetes via an API call, and Kubernetes will
figure out _how_ to make that happen, including picking the best servers to handle the requirements in your YAML file,
deploying the containers on those servers, monitoring and restarting the containers if they crash, scaling the number
of containers up and down with load, and so on.

If you zoom in a bit further on the Kubernetes architecture, it looks something like this:

![Kubernetes architecture](/img/guides/build-it-yourself/kubernetes-cluster/kubernetes-architecture.png)

Kubernetes consists of two main pieces: the control plane and worker nodes. Each of these will be discussed next.

## Control plane

The _[control plane](https://kubernetes.io/docs/concepts/#kubernetes-control-plane)_ is responsible for managing the
entire cluster. It consists of one or more master nodes (typically 3 master nodes for high availability), where each
master node runs several components:

<div className="dlist">

#### Kubernetes API Server

The _[Kubernetes API Server](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/)_ is the
endpoint you’re talking to when you use the Kubernetes API (e.g., via `kubectl`).

#### Scheduler

The _[scheduler](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-scheduler/)_ is responsible for
figuring out which of the worker nodes to use to run your container(s). It tries to pick the "best" worker node based
on a number of factors, such as high availability (try to run copies of the same container on different nodes so a
failure in one node doesn’t take them all down), resource utilization (try to run the container on the least utilized
node), container requirements (try to find nodes that meet the container’s requirements in terms of CPU, memory, port
numbers, etc), and so on.

#### Controller Manager

The _[controller manager](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/)_
runs all the _controllers_, each of which is a control loop that continuously watches the state of the cluster and
makes changes to move the cluster towards the desired state (you define the desired state via API calls). For
example, the _node controller_ watches worker nodes and tries to ensure the requested number of Nodes is always
running and the _replication controller_ watches containers and tries to ensure the requested number of containers is
always running.

#### etcd

_[etcd](https://etcd.io)_ is a distributed key-value store that the master nodes use as a persistent way to store the
cluster configuration.


</div>

## Worker nodes

The _[worker nodes](https://kubernetes.io/docs/concepts/architecture/nodes/)_ (or just _nodes_, for short) are the
servers that run your containers. Each worker node runs several components:

<div className="dlist">

#### Kubelet

The _[kubelet](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/)_ is the primary agent that
you run on each worker node. It is responsible for talking to the Kubernetes API Server, figuring out the containers
that are supposed to be on its worker node, and deploying those containers, monitoring them, and restarting any
containers that are unhealthy.

#### kube-proxy

The _[Kubernetes Service Proxy (kube-proxy)](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-proxy/)_
also runs on each worker node. It is responsible for talking to the Kubernetes API Server, figuring out which
containers live at which IPs, and proxying requests from containers on the same worker node to those IPs. This is
used for Service Discovery within Kubernetes, a topic we’ll discuss later.


</div>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"42caae9827cb7b64f4c5e0b6e9d7c00d"}
##DOCS-SOURCER-END -->
