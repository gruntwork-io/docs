# Infrastructure templates your Service Catalog should include

Your Service Catalog will need to include off-the-shelf solutions for _infrastructure_: e.g., servers, data stores,
networking, etc. Here's a starting list of the type of infrastructure you'll need to build out:

1. **Account baselines ("Landing Zone")**: enforce a baseline for each of your cloud accounts.  We'll discuss this more in a dedicated section later on.
   1. **Authentication**: e.g., IAM users, SSO, MFA.
   2. **Authorization**: e.g., IAM groups, IAM roles.
   3. **Audit logging**: e.g., CloudTrail, AWS Config.
   4. **Guard rails**: e.g., SCPs.
   5. **Security scanning**: e.g., GuardDuty, Macie, Shield, ECR scanning of images.
   6. **Account-wide defaults**: e.g., encryption by default.
2. **Networking**: configure the networking within your cloud, including:
   1. **Virtual Private Clouds (VPCs)**: manage IP, subnets, routing, NAT.
   2. **Firewalls**: control which ports and protocols are allowed in and out.
   3. **Client VPN**: connect to your cloud account from workstations.
   4. **Site-to-site VPN**: connect to your cloud account from offices and data centers.
   5. **SSH and RDP**: connect to servers remotely; bastion hosts.
   6. **DNS**: register domain names and configure DNS entries.
   7. **Load balancing and service mesh**: route traffic to your apps.
3. **Monitoring**: give your team visibility into what's happening within your cloud, including:
   1. **Metrics**: gather metrics from your apps (e.g., Prometheus, DataDog, CloudWatch).
   2. **Logs**: aggregate logs from your apps (e.g., Elastic, Sumo Logic, Loggly).
   3. **Dashboards**: display and slice and dice metrics and logs in a web UI (e.g., Grafana).
   4. **Alerts**: set up automated alerts and an on-call rotation (e.g., PagerDuty).
   5. **Observability**: store and slice and dice event data (e.g., Honeycomb).
   6. **Tracing**: track requests across all your apps, microservices, etc (e.g., X-Ray).
4. **Security**: set up defense-in-depth, including:
   1. **Secrets management**: secret stores (e.g., Vault), password management (e.g., 1Password), key management (e.g., KMS).
   2. **Encryption**: encrypt all data in transit (e.g., TLS, self-signed certs, private CA, service mesh) and at rest (e.g., disk encryption, KMS).
   3. **Server hardening**: intrusion detection (e.g., TripWire, fail2ban), antivirus, file integrity monitoring, sandboxing (e.g., SELinux, AppArmor), limited OS users and permissions, etc.
   4. **Network hardening**: server firewalls, network firewalls, web application firewalls (WAF).
5. **Application orchestration**: deploy your apps on top of virtual servers, Kubernetes, serverless architectures, etc.
6. **Data storage**: set up data stores such as relational databases (MySQL, PostgreSQL), caches (Redis, Memcached), search indices (Elasticsearch), file stores (S3), Docker registries (ECR), queues (SQS), streams (Kafka), etc.
7. **CI / CD**: configure CI / CD tools such as Jenkins, GitLab, GitHub Actions, CircleCi, Argo CD, etc. We'll discuss this more in a dedicated section later on.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"44791f8462f15eb7022f5bd032a0ae7a"}
##DOCS-SOURCER-END -->
