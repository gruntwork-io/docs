# Create an IAM user in the root account

As the last action you do as the root user, you MUST create an IAM user. This is not only a better practice from a
security standpoint, but also, the `account-baseline-xxx` modules we will use below assume IAM roles, which does not
work with a root user. Later on, we’ll create and manage all IAM users as code, but you should create this very first
IAM user manually by
[following these instructions](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html#id_users_create_console):

- Enter a username for your IAM user.
- Select both "programmatic access" and "AWS Management Console access."
- On the next page, click "Attach existing policies to user directly" and attach the `AdministratorAccess` policy.
- Click next a few more times to create the IAM user.
- In a secrets manager, save the IAM sign-in URL, your IAM user’s username, the password, and your Access Keys.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "4d6487d6c1c3be7d2da2e166f24c93e0"
}
##DOCS-SOURCER-END -->
