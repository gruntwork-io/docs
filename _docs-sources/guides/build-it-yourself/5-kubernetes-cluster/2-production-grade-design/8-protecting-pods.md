# Protecting pods

There are several policies you may want to enable to protect the pods in your cluster:

<div className="dlist">

#### PodSecurityPolicy

You can use a _[PodSecurityPolicy](https://kubernetes.io/docs/concepts/policy/pod-security-policy/)_ to define what
security-related features users can or can’t use in their pods. For example, you can specify if pods can run
`privileged` containers, which ports a container can bind to, which kernel capabilities can be added to a container,
what user IDs a container can run as, and so on. Follow the
[principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege) and provide pods with as few
permissions as possible. You can also use RBAC to assign a different PodSecurityPolicy to different users or roles
(e.g., give admins a less restrictive PodSecurityPolicy than other users).

#### NetworkPolicy

You can use a _[NetworkPolicy](https://kubernetes.io/docs/concepts/services-networking/network-policies/)_ to define
the inbound and outbound networking rules for your pods. We recommend adding a default NetworkPolicy that denies all
inbound and outbound traffic (again, principle of least privilege) and then adding a NetworkPolicy for each pod that
gives it permissions to talk solely to the other pods it should be able to access.

</div>

:::info

`NetworkPolicy` is not supported out of the box by EKS unless you use a custom networking engine such as
[calico](https://docs.projectcalico.org/v3.9/introduction/) or [istio](https://istio.io).

:::


