# IAM roles

An _[IAM role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html)_ is a standalone IAM entity that (a) allows
you to attach IAM policies to it, (b) specify which other IAM entities to trust, and then (c) those other IAM entities
can _assume_ the IAM role to be temporarily get access to the permissions in those IAM policies. The two most common
use cases for IAM roles are:

Service roles  
Whereas an IAM user allows a human being to access AWS resources, one of the most common use cases for an IAM role is
to allow a service—e.g., one of your applications, a CI server, or an AWS service—to access specific resources in
your AWS account. For example, you could create an IAM role that gives access to a specific S3 bucket and allow that
role to be assumed by one of your EC2 instances. The code running on that EC2 instance will then be able to access
that S3 bucket without you having to manually copy AWS credentials (i.e., access keys) onto that instance.

Cross account access  
Another common use case for IAM roles is to grant an IAM entity in one AWS account access to specific resources in
another AWS account. For example, if you have an IAM user in account `A`, then by default, that IAM user cannot
access anything in account `B`. However, you could create an IAM role in account `B` that gives access to a specific
S3 bucket in account `B` and allow that role to be assumed by an IAM user in account `A`. That IAM user will then be
able to access the contents of the S3 bucket by assuming the IAM role in account `B`. This ability to assume IAM
roles across different AWS accounts is the critical glue that truly makes a multi AWS account structure possible.

Here are some more details on how IAM roles work:

IAM policies  
Just as you can attach IAM policies to an IAM user and IAM group, you can attach IAM policies to an IAM role.

Trust policy  
You must define a _trust policy_ for each IAM role, which is a JSON document (very similar to an IAM policy) that
specifies who can assume this IAM role. For example, here is a trust policy that allows this IAM role to be assumed
by an IAM user named `Bob` in AWS account `111122223333`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "sts:AssumeRole",
      "Principal": { "AWS": "arn:aws:iam::111122223333:user/Bob" }
    }
  ]
}
```

Note that a trust policy alone does NOT automatically give Bob the ability to assume this IAM role. Cross-account
access always requires permissions in _both_ accounts. So, if Bob is in AWS account `111122223333` and you want him to
have access to an IAM role called `foo` in account `444455556666`, then you need to configure permissions in both
accounts: first, in account `444455556666`, the `foo` IAM role must have a trust policy that gives `sts:AssumeRole`
permissions to account `111122223333`, as shown above; second, in account `111122223333`, you also need to attach an
IAM policy to Bob’s IAM user that allows him to assume the `foo` IAM role, which might look like this:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "sts:AssumeRole",
      "Resource": "arn:aws:iam::444455556666:role/foo"
    }
  ]
}
```

Assuming an IAM role  
IAM roles do not have a user name, password, or permanent access keys. To use an IAM role, you must _assume_ it by
making an `AssumeRole` API call (see the
[AssumeRole API](https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html) and
[assume-role CLI command](https://docs.aws.amazon.com/cli/latest/reference/sts/assume-role.html)), which will return
_temporary access keys_ you can use in follow-up API calls to authenticate as the IAM role. The temporary access keys
will be valid for 1-12 hours, depending on IAM role settings, after which you must call `AssumeRole` again to fetch
new keys. Note that to make the `AssumeRole` API call, you must first authenticate to AWS using some other
mechanism. For example, for an IAM user to assume an IAM role, the workflow looks like this:

![The process for assuming an IAM role](/assets/img/guides/aws-account/assume-iam-role.png)

The basic steps are:

1.  Authenticate using the IAM user’s permanent AWS access keys

2.  Make the `AssumeRole` API call

3.  AWS sends back temporary access keys

4.  You authenticate using those temporary access keys

5.  Now all of your subsequent API calls will be on behalf of the assumed IAM role, with access to whatever permissions
    are attached to that role

IAM roles and AWS services  
Most AWS services have native support built-in for assuming IAM roles. For example, you can associate an IAM role
directly with an EC2 instance, and that instance will automatically assume the IAM role every few hours, making the
temporary credentials available in
_[EC2 instance metadata](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html#instancedata-data-retrieval)_.
Just about every AWS CLI and SDK tool knows how to read and periodically update temporary credentials from EC2
instance metadata, so in practice, as soon as you attach an IAM role to an EC2 instance, any code running on that EC2
instance can automatically make API calls on behalf of that IAM role, with whatever permissions are attached to that
role. This allows you to give code on your EC2 instances IAM permissions without having to manually figure out how to
copy credentials (access keys) onto that instance. The same strategy works with many other AWS services: e.g., you
use IAM roles as a secure way to give your Lambda functions, ECS services, Step Functions, and many other AWS
services permissions to access specific resources in your AWS account.



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"4e0865782a0adbe9a52db25eb2e868de"}
##DOCS-SOURCER-END -->
