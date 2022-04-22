# AWS Organizations

_[AWS Organizations](https://aws.amazon.com/organizations/)_ gives you a central way to manage multiple AWS accounts. As
you’ll see in [Production-grade design](../production-grade-design/intro.md), it’s a good idea to use multiple separate AWS accounts to manage separate
environments, and AWS organizations is the best way to create and manage all of those accounts.

<div className="dlist">

#### Root account

The first AWS account you create is the _root account_ (sometimes also called the _master account_). This will be the
parent account for your organization. This account has powerful permissions over all child accounts, so you should
strictly limit access to this account to a small number of trusted admins.

#### Child account

You can use AWS Organizations to create one or more _child accounts_ beneath the root account.

#### Organization unit

You can group child accounts into one or more _organization units_. This gives you a logical way to group accounts:
for example, if your company has multiple business units, then each business unit could be represented by one
organization unit, and each organization unit can contain multiple child accounts that can be accessed solely by
members of that business unit.

#### Consolidated billing

All of the billing from the child accounts rolls up to the root account. This allows you to manage all payment
details in a single account and to get a breakdown of cost by organization unit, child account, service type, etc.

#### IAM roles

When creating a child account, you can configure AWS Organizations to create an IAM role within that account that
allow users from the root account to access the child account. This allows you to manage the child accounts from the
parent account without having to create an IAM user in every single child account.

#### Service control policies

You can use
_[Service control policies (SCPs)](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scp.html)_
to define the maximum available permissions for a child account, overriding any permissions defined in the child
account itself. For example, you could use SCPs to completely block a child account from using specific AWS regions
(e.g., block all regions outside of Europe) or AWS services (e.g., Redshift or Amazon Elasticsearch), perhaps because
those regions or services do not meet your company’s compliance requirements (e.g., PCI, HIPAA, GDPR, etc).

</div>


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "82ac4c70419f79af31d32ad9d227017f"
}
##DOCS-SOURCER-END -->
