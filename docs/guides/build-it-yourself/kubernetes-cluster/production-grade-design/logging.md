# Logging

We recommend enabling the following logging to help with debugging and troubleshooting:



<div className="dlist">

#### Control plane logging

We recommend enabling [control plane logging](https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html)
in EKS, at least for the API server logs, audit logs, and authenticator logs, as these are critical for debugging and
auditing. You may wish to enable controller manager and scheduler logs too.

#### Worker node logging

We recommend installing [fluentd-cloudwatch](https://github.com/helm/charts/tree/master/incubator/fluentd-cloudwatch)
in the EKS cluster. This will run [fluentd](https://www.fluentd.org/) on each worker node and configure it to send all
the logs from the worker nodes (including all the pods on them) to CloudWatch.


</div>






<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "345e40c904372f680deb43eb3be26cd4"
}
##DOCS-SOURCER-END -->
