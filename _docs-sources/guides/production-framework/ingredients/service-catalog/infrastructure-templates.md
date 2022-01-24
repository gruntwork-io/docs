# Infrastructure templates

Your Service Catalog will need to include off-the-shelf solutions for _infrastructure_: e.g., servers, data stores,
networking, etc. Here's a starting list of the type of infrastructure you'll need to build out:

## Account baselines ("Landing Zone")

Enforce a secure baseline for each of your cloud accounts, including:

1. **Authentication**: e.g., IAM users, SSO, MFA.
2. **Authorization**: e.g., IAM groups, IAM roles.
3. **Audit logging**: e.g., CloudTrail, AWS Config.
4. **Guard rails**: e.g., SCPs.
5. **Security scanning**: e.g., GuardDuty, Macie, Shield, ECR scanning of images.
6. **Account-wide defaults**: e.g., encryption by default.

We'll discuss Landing Zones more in a dedicated section later on.

## Networking

Configure networking within your cloud, including:

1. **Virtual Private Clouds (VPCs)**: manage IP, subnets, routing, NAT.
2. **Firewalls**: control which ports and protocols are allowed in and out.
3. **Client VPN**: connect to your cloud account from workstations.
4. **Site-to-site VPN**: connect to your cloud account from offices and data centers.
5. **SSH and RDP**: connect to servers remotely; bastion hosts.
6. **DNS**: register domain names and configure DNS entries.
7. **Load balancing and service mesh**: route traffic to your apps.

## Monitoring

Give your team visibility into what's happening within your cloud, including:

1. **Metrics**: gather metrics from your apps (e.g., Prometheus, DataDog, CloudWatch).
2. **Logs**: aggregate logs from your apps (e.g., Elastic, Sumo Logic, Loggly).
3. **Dashboards**: display and slice and dice metrics and logs in a web UI (e.g., Grafana).
4. **Alerts**: set up automated alerts and an on-call rotation (e.g., PagerDuty).
5. **Observability**: store and slice and dice event data (e.g., Honeycomb).
6. **Tracing**: track requests across all your apps, microservices, etc (e.g., X-Ray).

## Security

Think through security at every layer of the stack. Aim for *defense in depth*, where you have multiple layers of
security, a bit like a castle: e.g., moat, walls, gate, keep, guards, etc. This way, you're never just one mistake away
from disaster. This includes:

1. **Secrets management**: secret stores (e.g., Vault), password management (e.g., 1Password), key management (e.g., KMS).
2. **Encryption**: encrypt all data in transit (e.g., TLS, self-signed certs, private CA, service mesh) and at rest (e.g., disk encryption, KMS).
3. **Server hardening**: intrusion detection (e.g., TripWire, fail2ban), antivirus, file integrity monitoring, sandboxing (e.g., SELinux, AppArmor), limited OS users and permissions, etc.
4. **Network hardening**: server firewalls, network firewalls, web application firewalls (WAF).
5. **Policy as code**: define and enforce company and legal policies as code using tools such as Open Policy Agent (OPA).

## Application orchestration

Deploy and manage your application workloads, including:

1. **Virtual servers**: EC2 instances, Google Compute instances, Azure Virtual Machines.
2. **Docker containers**: Kubernetes (including EKS, GKE, AKS), ECS, Fargate.
3. **Serverless**: Lambda, API Gateway, Cloud Functions, Azure Functions.

## Data storage

Set up data stores, including:

1. **Relational databases**: MySQL, PostgreSQL, SQL Server.
2. **Caches**: Redis, Memcached.
3. **Search indices**: Elasticsearch.
4. **Document stores**: MongoDB, DynamoDB.
5. **Streams and queues**: Kafka, SQS, SNS.
6. **File stores**: S3, GCS, Azure Storage.
7. **Docker registries**: ECR, GCP Container Registry, Azure Container Registry.

## CI / CD

Configure CI / CD tools, including:

1. **CI / CD platform**: Jenkins, GitLab, GitHub Actions, CircleCi, Argo CD.
2. **CI / CD pipeline**: for builds, tests, app deploys, and infrastructure deploys.

We'll discuss CI / CD more in a dedicated section later on.
