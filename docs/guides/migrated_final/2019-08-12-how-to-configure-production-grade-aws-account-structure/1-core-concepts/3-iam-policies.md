# IAM policies

You can use _[IAM policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html)_ to define permissions
in your AWS account.

IAM policy basics  
Each IAM policy is a JSON document that consists of one or more _statements_, where each statement can allow or deny
specific _principals_ (e.g., IAM users) to perform specific _actions_ (e.g., `ec2:StartInstances`, `s3:GetObject`) on
specific _resources_ (e.g., EC2 instances, S3 buckets). Here’s an example IAM policy that allows an IAM user named
`Bob` to perform `s3:GetObject` on an S3 bucket called `examplebucket`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "AWS": ["arn:aws:iam::111122223333:user/Bob"] },
      "Action": ["s3:GetObject"],
      "Resource": "arn:aws:s3:::examplebucket/*"
    }
  ]
}
```

Managed policies  
Each AWS account comes with a number of
_[managed policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html)_, which
are pre-defined IAM policies created and maintained by AWS. These included policies such as `AdministratorAccess`
(full access to everything in an AWS account), `ReadOnlyAccess` (read-only access to everything in an AWS account),
`AmazonEC2ReadOnlyAccess` (read-only access to solely EC2 resources in an AWS account), and many others. AWS managed
policies are owned by AWS and cannot be modified or removed.

Customer-managed policies  
While managed policies give you coarse-grained, generic permissions, to get more fine-grained, custom permissions,
you can create custom IAM policies (known as _customer-managed policies_).

Standalone policies  
A _standalone policy_ is an IAM policy that exists by itself and can be attached to other IAM entities. For example,
you could create a single policy that gives access to a specific S3 bucket and _attach_ that policy to several IAM
users so they all get the same permissions.

Inline policies  
An _inline policy_ is a policy that’s embedded within an IAM entity, and only affects that single entity. For
example, you could create a policy embedded within an IAM user that gives solely that one user access to a specific
S3 bucket.



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"2bfe4a399c9ea768352a01ee7ae4060d"}
##DOCS-SOURCER-END -->
