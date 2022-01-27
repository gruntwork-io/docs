# Regions and availability zones

![AWS regions and availability zones](/img/guides/build-it-yourself/vpc/aws-regions.png)

AWS has data centers all over the world, grouped into regions and availability zones. An _AWS region_ is a separate
geographic area, such as `us-east-2` (Ohio), `eu-west-1` (Ireland), and `ap-southeast-2` (Sydney). Within each region,
there are multiple data centers known as _availability zones_, such as `us-east-2a`, `us-east-2b`, and so on.

Each availability zone in the same region is isolated, but connected via low-latency links, so AWS makes it easy to
deploy your infrastructure across multiple availability zones as if it was all in one big data center, such as running
a cluster of EC2 instances, with the instances distributed across `us-east-2a`, `us-east-2b`, and `us-east-2c`. This
makes your infrastructure resilient to the outage of an entire data center.

If you want to be resilient to the outage of an entire region (e.g., all data centers in `us-east-2` going down), you
can deploy your infrastructure across multiple regions, but this tends to be more difficult. Latency between regions
is significantly higher, and as AWS treats regions completely independently, there isn’t much tooling for multi-region
deployments built-in. You’ll need to replicate your infrastructure and data and solve multi-region latency and eventual
consistency issues: check out
[Architecting Multi-Region SaaS Solutions on AWS](https://aws.amazon.com/blogs/apn/architecting-multi-region-saas-solutions-on-aws/) and
[How to build a multi-region active-active architecture on AWS](https://read.acloud.guru/why-and-how-do-we-build-a-multi-region-active-active-architecture-6d81acb7d208)
as starting points.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"b9de64a86c71d7442fc242dad729d910"}
##DOCS-SOURCER-END -->
