# Use minimal IAM permissions for a deployment

Avoid having a single system with admin permissions for running a deployment. Instead, deploy specialized versions of
the deployment platforms with varying permissions for handling specific workflows. By separating out the concerns for
each pipeline, you can reduce the blast radius of the damage that can be done with each set of credentials. At a minimum,
you should have two versions of the infrastructure deployment system: one for deploying the application code, which
only has the minimal permissions necessary for deploying that application; and one for deploying infrastructure code,
which has more access to the environments.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"a4cd5ed3be343c5f6bce08340047756b"}
##DOCS-SOURCER-END -->
