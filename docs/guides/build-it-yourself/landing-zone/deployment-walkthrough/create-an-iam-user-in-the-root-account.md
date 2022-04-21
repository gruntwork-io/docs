# Create an IAM user in the root account

As the last action you do as the root user, you MUST create an IAM user. This is not only a better practice from a
security standpoint, but also, the `account-baseline-xxx` modules we will use below assume IAM roles, which does not
work with a root user. Later on, we’ll create and manage all IAM users as code, but you should create this very first
IAM user manually by
[following these instructions](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html#id_users_create_console):

1. Enter a username for your IAM user.

2. Select both "programmatic access" and "AWS Management Console access."

3. On the next page, click "Attach existing policies to user directly" and attach the `AdministratorAccess` policy.

4. Click next a few more times to create the IAM user.

5. In a secrets manager, save the IAM sign-in URL, your IAM user’s username, the password, and your Access Keys.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "a101684204db60a27bcace52b801c84b"
}
##DOCS-SOURCER-END -->
