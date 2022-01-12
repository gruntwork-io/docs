# Reset the root user password in each child account

When creating the child accounts, you may have noticed that you provided an email address for each root user, but
confusingly, not a password. So how do you login as the root user then? It’s not obvious, but the answer is that you
[reset the root user password](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys_retrieve.html#reset-root-password),
using the "Forgot your password?" prompt on the [root user login page](https://console.aws.amazon.com/). AWS will email
you a reset link, which you can click to go to a page that will allow you to configure a password for the root user.
Use this process to reset the password for the root user of each child account you created.




