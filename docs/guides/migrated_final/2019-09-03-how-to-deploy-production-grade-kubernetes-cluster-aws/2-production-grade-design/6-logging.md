# Logging

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
{"sourcePlugin":"Service Catalog Reference","hash":"9ae3fa4c090ba93b8aeea55ed69613b3"}
##DOCS-SOURCER-END -->
