# IAM role mapping and RBAC

You’ve seen that to determine _who_ the user is (authentication), EKS uses IAM. The next step is to determine _what_
the user can do (authorization). Kubernetes uses its own roles and RBAC for authorization, so the question is, how does
EKS know which IAM entities (that is, IAM users or roles) are associated with which Kubernetes roles?

The answer is that EKS expects you to define a ConfigMap called `aws-auth` that defines the mapping from IAM entities
to Kubernetes roles. When you first provision an EKS cluster, the IAM user or role that you used to authenticate is
automatically granted admin level permissions (the `system:master` role). You can use this role to add additional role
mappings in the `aws-auth` ConfigMap.

Here’s an example `aws-auth` ConfigMap:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: aws-auth
  namespace: kube-system
data:
  mapRoles: |
    - rolearn: arn:aws:iam::11122223333:role/example-role
      username: system:node:{{EC2PrivateDNSName}}
      groups:
        - system:bootstrappers
        - system:nodes
  mapUsers: |
    - userarn: arn:aws:iam::11122223333:user/example-user
      username: example-user
      groups:
        - system:masters
```

This ConfigMap tells EKS that anyone who authenticates as the IAM role called `example-role` should automatically get
the permissions in the `system:bootstrappers` and `system:nodes` Kubernetes roles, and anyone who authenticates with as
the IAM user `example-user` should automatically get the permissions in the `system:masters` Kubernetes role. Note that
when users authenticate using an IAM role or IAM user, they are mapped to a Kubernetes user with the `username` you
specify in the `aws-auth` ConfigMap (i.e., that’s the username that will show up in the Kubernetes audit log).

Note that, as of September, 2019, the `aws-auth` ConfigMap supports mapping IAM roles and IAM users, but not IAM groups
(see [Managing Users or IAM Roles for your EKS Cluster](https://docs.aws.amazon.com/en_pv/eks/latest/userguide/add-user-role.html)).
Mapping every individual user in your organization is most likely difficult to manage, so we instead recommend creating
IAM roles, mapping those IAM roles to Kubernetes roles in `aws-auth`, and allowing IAM users in specific IAM groups to
assume those roles.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"ff384b3108de45dc98d77a4b652db03c"}
##DOCS-SOURCER-END -->
