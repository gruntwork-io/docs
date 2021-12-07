## Kubernetes access control

To access your Kubernetes cluster, you have to understand Kubernetes authentication and authorization.

### Kubernetes authentication

Kubernetes uses authentication plugins to authenticate API requests. Depending on the plugins you’re using, there are
a number of supported
_[authentication strategies](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#authentication-strategies)_,
including X509 client certs, static token files, bootstrap tokens, static password files, service account tokens,
OpenID connect tokens, and more.

When you authenticate, you authenticate as one of two types of accounts:

User accounts  
_[User accounts](https://kubernetes.io/docs/reference/access-authn-authz/service-accounts-admin/#user-accounts-vs-service-accounts)_
are used by humans or other services outside of the Kubernetes cluster. For example, an admin at your
company may distribute X509 certificates to your team members, or if you’re using a Kubernetes service managed by AWS (i.e, EKS), the user accounts may be the IAM user accounts you have in AWS.

Service accounts  
_[Service accounts](https://kubernetes.io/docs/reference/access-authn-authz/service-accounts-admin/)_ are managed and
used by resources within the Kubernetes cluster itself, such as your pods.
Kubernetes creates some service accounts automatically; you can create others using the Kubernetes API. The
credentials for service accounts are stored as secrets in Kubernetes and mounted into the pods that should have
access to those service accounts.

### Kubernetes authorization

Once you’ve authenticated and the Kubernetes API Server knows _who_ you are, depending on the plugins you’re using,
it will use one of several supported
_[authorization modes](https://kubernetes.io/docs/reference/access-authn-authz/authorization/#authorization-modules)_ to
determine _what_ you can do. The standard authorization mode is
_[role-based access control (RBAC)](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)_, where you create
roles with access to specific Kubernetes APIs (e.g., the ability to call `GET` on the secrets API in a specific
namespace), and associate those roles with the specific user and service accounts that should have those permissions.



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"068c93c4a8100189a3ceb5edd18c769f"}
##DOCS-SOURCER-END -->
