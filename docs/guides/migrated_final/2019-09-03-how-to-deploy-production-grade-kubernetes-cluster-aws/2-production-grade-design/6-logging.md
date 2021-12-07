## Logging

We recommend enabling the following logging to help with debugging and troubleshooting:

Control plane logging  
We recommend enabling [control plane logging](https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html)
in EKS, at least for the API server logs, audit logs, and authenticator logs, as these are critical for debugging and
auditing. You may wish to enable controller manager and scheduler logs too.

Worker node logging  
We recommend installing [fluentd-cloudwatch](https://github.com/helm/charts/tree/master/incubator/fluentd-cloudwatch)
in the EKS cluster. This will run [fluentd](https://www.fluentd.org/) on each worker node and configure it to send all
the logs from the worker nodes (including all the pods on them) to CloudWatch.



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"0e027cdc7188ca2ce3c7e4476011573b"}
##DOCS-SOURCER-END -->
