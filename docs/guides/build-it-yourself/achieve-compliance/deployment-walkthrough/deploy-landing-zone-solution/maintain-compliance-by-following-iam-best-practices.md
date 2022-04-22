# Maintaining compliance by following IAM best practices

We conclude the IAM section with a few parting words of wisdom for maintaining compliance over time:

1. Do not attach any policies without requiring MFA.

2. Never use the `AdministratorAccess` AWS managed policy with any users, groups, or roles.

3. Refrain from granting inline permissions or attaching managed policies directly to IAM users. Permissions
    should be granted exclusively via IAM groups and roles.

4. Never use static IAM user access keys to allow an application to access AWS, whether that application is hosted on an EC2 instance or anywhere else!

5. Avoid logging in as the root user. Unfortunately, there is nothing built-in to AWS to prevent use of the
    root user. It cannot be locked or removed from the account. In fact, there are
    [several tasks that require
    the use of root](https://docs.aws.amazon.com/general/latest/gr/aws_tasks-that-require-root.html). Fortunately, most of these activities are rare, so usage of the root account can be kept to
    a minimum.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "eb60c65580aa8aea2e2209212c54e24f"
}
##DOCS-SOURCER-END -->
