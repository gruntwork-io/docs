# Maintaining compliance by following Storage best practices

## S3 Buckets

To make sure your S3 buckets are compliant with the benchmark, use the
[`private-s3-bucket` module](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/private-sbucket)
to create and manage all of your S3 buckets. This module blocks public access and enforces encryption by default. Note
that all Gruntwork modules that create S3 buckets use this module under the hood.

You can either use the `private-s3-bucket` module in your own modules, or, if you wish to deploy a standalone S3 bucket,
use the [`s3-bucket` service](https://github.com/gruntwork-io/terraform-aws-service-catalog/blob/master/modules/data-stores/sbucket/)
from the Gruntwork Service Catalog.

To ensure that all the data in your S3 buckets has been discovered, classified and secured, use the
[`macie` module](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/tree/master/modules/security/macie)
to monitor all your S3 buckets. Note that all the Gruntwork account baseline modules include the `macie` module under
the hood.
