# VPC Endpoints

Something that catches many AWS users off guard is that if you have some code running in AWS, and that code makes an
API call to AWS (e.g., you’re writing data to S3 or deploying an EC2 instance), that request will be routed outside of
your AWS account and through the public Internet, before finally making its way back to AWS. That’s because, under the
hood, AWS API calls are HTTPS requests to a domain like `<API>.<REGION>.amazonaws.com` (e.g.,
`s3.us-east-1.amazonaws.com`), which, by default, will be resolved and routed via public DNS and Internet
infrastructure just like all other requests, even if you’re making that request from within an AWS account. These
API calls are encrypted with TLS, so attackers shouldn’t be able to read them, but having potentially sensitive data
traverse the public Internet completely unnecessarily is not optimal from a security perspective.

To keep your traffic completely within your own AWS account, you can use
_[VPC Endpoints](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-endpoints.html)_. Endpoints are virtual devices
that can route traffic to specific AWS services without that traffic ever having to leave your AWS account. When you
create an endpoint, you can have AWS configure private DNS entries within your VPC so that requests to the various AWS
domain names (e.g., `s3.us-east-1.amazonaws.com`) automatically route to these endpoints instead of the public Internet.

There are two types of endpoints, each of which support different AWS services:

Gateway endpoints  
This is an older type of endpoint that is free, but only support S3 and DynamoDB.

Interface endpoints  
This is a new type of endpoint that is backed by [PrivateLink](https://aws.amazon.com/privatelink/), which is
a paid service, and includes support for CloudTrail, Secrets Manager, EC2, SNS, and many other services
([full list](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-endpoints.html)).



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"70c7c23b850be75f69e628089d4bda6a"}
##DOCS-SOURCER-END -->
