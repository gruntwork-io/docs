# Kubernetes resources

Using one of the previously mentioned tools, you can create one or more _resources_ within your Kubernetes cluster,
such as pods, controllers, namespaces, services, and configuration.

## Pods

With Kubernetes, you don’t run containers directly. Instead, the basic building block in Kubernetes is a
_[pod](https://kubernetes.io/docs/concepts/workloads/pods/pod/)_, which is a group of one or more related containers that
are always deployed together. For example, you could have a pod with just a single container, such as a container that
runs a Node.js app, or a pod with several related containers, such as one container that runs a Node.js app, another
container that runs a logs and metrics agent for the Node.js app, and a third container that runs nginx as a reverse
proxy for the Node.js app.

Here are the key ideas to keep in mind when thinking about pods:

<div className="dlist">

#### How pods are deployed

Whenever you tell Kubernetes to deploy a pod (e.g., using `kubectl`, which we’ll discuss below), the scheduler will
pick a worker node for that pod, and the kubelet on that worker node will deploy all the containers for that pod
together.

#### A pod is like a logical machine

All the containers in a pod run in the same Linux namespace and can talk to each other over localhost (note: this
implies the containers in a pod must all listen on different ports), so it can be helpful to think of each pod as a
_logical machine_, with its own IP address and processes that are separate from all other pods.

#### Sidecars

Pods offer a nice format for combining and composing multiple processes together, even if the processes are built
with totally different technologies, as each process can be encapsulated in its own container. For example, a common
pattern is to define pods with one main container (e.g., a web service you wrote with Node.js/Javascript) and one or
more _sidecars_: that is, containers that provide supporting functionality, such as a proxy sidecar (e.g., Envoy
proxy, which is written in Go) and a log aggregation sidecar (e.g., Fluentd, which is written in Ruby).

#### Pods are ephemeral

Pods (and for that matter, containers) are relatively _ephemeral_: that is, they can be shut down and replaced at any
time. This might happen because a node crashes or because you’re deploying a new version of the pod or a number of
other reasons. This is a critical idea to keep in mind as you design your system, especially when thinking about
fault tolerance, replication, and state.

</div>

## Controllers

Pods are the basic building blocks of Kubernetes, but you typically don’t deploy them directly either. A single pod on
a single worker node is a single point of failure: the kubelet on that node can restart the pod if it crashes, but
if the entire node crashes, or if you want to run multiple pods for high availability and scalability, you need a
higher level construct. This is where controllers come in. Controllers allow you to manage multiple pods across
multiple nodes.

The most common controller you’re likely to use is the
[Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/), which allows you to specify:

- What pod to deploy.

- How many _replicas_ (copies) of that pod you want running.

- How to roll out updates to the replicas whenever you make a change.

The Deployment will deploy your replicas, constantly monitor them, and automatically replace any replicas that fail.
When you apply a change to your Deployment—e.g., change the Docker image tag—the Deployment will automatically roll
that change out using one of several built-in strategies, such as rolling deployment and canary deployment.

## Namespaces

_[Namespaces](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/)_ allow you to logically
partition your Kubernetes cluster into multiple virtual clusters. Every command you issue to the Kubernetes API Server
(e.g., via `kubectl`) and almost every resource you create in Kubernetes (e.g., every pod) runs within a namespace; if
you don’t specify a namespace, the `default` namespace is used. By granting users access only to specific namespaces
and by configuring your cluster to only allow connectivity between resources in the same namespace, you can use
namespaces as a lightweight way to group applications and provide some isolation between them.

## Services and Service Discovery

Every pod in Kubernetes gets an IP address, but this IP could change every time the pod is redeployed. Moreover, you
typically don’t want the IP of a single pod, but some way to talk to all the related pods that make up a logical
service: e.g., if you have 3 replicas of your Node.js pod, what you really want is some way to have requests
load balanced across all of these pods, even as the IPs of the individual pods or the number of pods changes.

To do this, you can create a Kubernetes _[service](https://kubernetes.io/docs/concepts/services-networking/service/)_,
which can provide a single endpoint in front of a set of pods, and automatically load balance and route traffic to the
right destinations, even as the underlying pods change and move around. Your apps can then discover other services
(_service discovery_) by getting the endpoint IP from an environment variable and/or via DNS (the latter is typically
provided by a Kubernetes cluster add-on). For example, if your Node.js pods need to talk to some pods running a Java
backend, you could configure a service called `backend` in front of the Java pods, and the Node.js apps will be able to
talk to the backend by sending requests to `backend.<NAMESPACE>.svc.cluster.local`, where `<NAMESPACE>` is the name of
your Kubernetes namespace.

## Configuration and secrets

To allow you to use the same container in different environments with different settings (e.g., dev, stage, prod), you
can use a _[ConfigMap](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/)_, which is a
map of key/value pairs where the values can be strings or even entire files. Kubernetes stores ConfigMaps in etcd and
can expose specific key/value pairs or the contents of the entire ConfigMap to your containers as either
[environment variables](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/#define-container-environment-variables-using-configmap-data)
or
[files mounted in a volume](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/#add-configmap-data-to-a-volume).

If you need to pass sensitive information to your containers (e.g., credentials or API keys), you can instead use a
_[Kubernetes Secret](https://kubernetes.io/docs/concepts/configuration/secret/)_. Secrets work more or less the same
way as ConfigMaps—i.e., they contain key/value pairs and can be exposed to containers as environment variables or
files—with the main difference being that:

- When exposing a secret to your containers, Kubernetes ensures the secret is only ever stored in memory. If you’re
  exposing the secret as a file mounted in a volume, Kubernetes will use a volume backed by
  [tmpfs, a RAM-backed filesystem](https://kubernetes.io/docs/concepts/storage/volumes/#secret), to ensure the secret is
  never written to disk.

- Kubernetes stores Secrets in an encrypted form in etcd.

:::info

[etcd encryption](https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/) is only available as of
Kubernetes 1.13 and not available out of the box on all Kubernetes platforms (older versions of Kubernetes stored
secrets unencrypted!).

:::


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"515b338cb8b99a1ad5127df1aa98c187"}
##DOCS-SOURCER-END -->
