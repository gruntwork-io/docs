# IAM roles for services

In addition to the IAM roles you create for users, you will also need to create IAM roles for services, applications,
and automated users in your child accounts. The exact set of IAM roles you need depends on your company’s
requirements, but here are some common ones:

<div className="dlist">

#### allow-auto-deploy-access-from-other-accounts

This is an IAM role that grants permissions for automatically deploying (e.g., as part of a CI / CD pipeline)
some specific service. For example, this role may have a trust policy that allows it to be assumed by a Jenkins
server in the shared-services account, and gives that server permissions to deploy EC2 Instances and Auto Scaling
Groups. Note that anyone who has to your CI server (e.g., anyone who can create/modify/execute Jenkins jobs) can
effectively make use of all the permissions in this IAM role, so be very thoughtful about what this role can do.

#### allow-ssh-grunt-access-from-other-accounts

This is an IAM role that grants permission to look up IAM group membership and the public SSH keys of IAM user
accounts. Typically, you’d have this role in your security account to allow the EC2 instances in other accounts to
authenticate SSH attempts using
[ssh-grunt](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/ssh-grunt).

</div>

:::caution

You must be a <span className="js-subscribe-cta">Gruntwork subscriber</span> to access `ssh-grunt` in
[terraform-aws-security](https://github.com/gruntwork-io/terraform-aws-security/).

:::

<div className="dlist">

#### Service roles

Most EC2 instances, Lambda functions, and other AWS services you launch will have an IAM role that gives that service
the permissions it needs to function. For example, the IAM role for the
[Consul cluster](https://github.com/hashicorp/terraform-aws-consul/tree/master/modules) gives the EC2 instances in that
cluster `ec2:DescribeInstances`, `ec2:DescribeTags`, and `autoscaling:DescribeAutoScalingGroups` permissions so that
the instances can look up instance, tag, and auto scaling group information to automatically discover and connect
to the other instances in the cluster.

</div>

A few important notes on IAM roles for services:

<div className="dlist">

#### No MFA

The trust policy in service IAM roles cannot require MFA, as automated services can’t use MFA devices. That means you
need to take extra care in terms of who can assume this IAM role, what permissions the role has, and locking down the
services. For example, if you have Jenkins running on an EC2 instance, and you give that EC2 instance access to an
IAM role so it can deploy your apps, you should do your best to minimize the permissions that IAM role has (e.g.,
to just `ecs` permissions if deploying to ECS) and you should ensure that your Jenkins instance runs in private
subnets so that it is NOT accessible from the public Internet (see [How to deploy a production-grade VPC on AWS](/docs/guides/build-it-yourself/vpc/)).

#### Use the right Principal

The trust policy in service IAM roles will need to specify the appropriate `Principal` to allow an AWS service to
assume it. For example, if you’re running Jenkins on an EC2 instance, and you want that EC2 instance to be able to
assume an IAM role to get specific permissions (e.g., to get permissions to deploy some code in one of your child
accounts), you’ll need a trust policy that looks like this:

</div>

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "sts:AssumeRole",
      "Principal": { "Service": "ec2.amazonaws.com" }
    }
  ]
}
```

Notice that the `Principal` is set to `"Service": "ec2.amazonaws.com"`, whereas previous IAM roles you saw (those
intended for IAM users) used the format `"AWS": "<ARN>"`. Each AWS service has its own `Principal`: e.g., if you
want an IAM role that can be assumed by a Lambda function, the `Principal` will be `"lambda.amazonaws.com"`.

<div className="dlist">

#### Protecting IAM roles

While IAM roles offer a convenient way to give an EC2 instance permissions to make API calls without having to
manually copy credentials to the EC2 instance, the default security configuration for them is not particularly secure.
That’s because the IAM role is exposed to the code on the EC2 instance through
[EC2 instance metadata](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ecinstance-metadata.html#instancedata-data-retrieval),
which is an http endpoint (`\http://169.254.169.254`) that _anyone_ on the EC2 instance can access. That means that
any compromise of that EC2 instance instantly gives an attacker access to all the permissions in that IAM role. We
**strongly** recommend mitigating this by limiting access to the endpoint solely to specific OS users (e.g., solely to
the root user), e.g., by using `iptables`. You can do this automatically using
[ip-lockdown](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/ip-lockdown)

</div>

```bash
# Make EC2 instance metadata only accessible to the root user
ip-lockdown "169.254.169.254" "root"
```

:::caution

You must be a <span className="js-subscribe-cta">Gruntwork subscriber</span> to access `ip-lockdown` in
[terraform-aws-security](https://github.com/gruntwork-io/terraform-aws-security).

:::

<div className="dlist">

#### Machine users

If you need to give something outside of your AWS account access to your AWS account—for example, if you’re using
CircleCi as your CI server and need to give it a way to deploy code into your AWS accounts—then you will need to
create a _machine user_. This is an IAM user designed for use solely by an automated service. You create the IAM user
in the security account, add the user to specific IAM groups that grant the user the permissions it needs, generate
access keys for the user, and provide those access keys to the external system (e.g., by storing the access keys as
the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` environment variables in CircleCi). Note that you cannot require
MFA for a machine user, so before giving credentials to an external system, think very carefully if that system is
worth trusting with access to your AWS account, and limit the machine user’s permissions as much as possible.

</div>

:::info

When you come across a 3rd party service that requires you to create an IAM machine user, you should think of
that as a red flag. Just about all vendors these days should support using IAM roles instead, as creating an IAM role
and giving the vendor permissions to assume that role is significantly more secure than manually copying around
sensitive machine user access keys.

:::
