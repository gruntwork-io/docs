## IAM users and groups

In the security account, you will need to create all the IAM users for your team. Do NOT attach any IAM policies
directly to users; instead, create a set of IAM groups, with specific IAM policies attached to each group, and assign
all of your users to the appropriate groups. The exact set of IAM groups you need depends on your company’s
requirements, but here are some common ones:

full-access  
This IAM group gives users full access to everything in the security account. It should only be used for a small
number of trusted admins who need to manage the users and groups within this account.

\_account-&lt;ACCOUNT>-&lt;ROLE>  
These IAM groups are how you grant IAM users in the security account access to other child accounts. For each AWS
account `<ACCOUNT>`, and each IAM role `<ROLE>` in that account, you have a group that grants `sts:AssumeRole`
permissions for that role: e.g., users you add to the `_account-dev-full-access` group will get `sts:AssumeRole`
permissions to the `allow-full-access-from-other-accounts` IAM role in the `dev` account (so they will have full
access to that account) and users you add to the `_account-prod-read-only` group will get `sts:AssumeRole` permissions
to the `allow-read-only-access-from-other-accounts` IAM role in the `prod` account (so they will have read-only
access to that account).

ssh-grunt-users and ssh-grunt-sudo-users  
These IAM groups don’t grant any IAM permissions, but instead are used by
[ssh-grunt](https://github.com/gruntwork-io/module-security/tree/master/modules/ssh-grunt) to determine who is allowed
to SSH to your EC2 instances. Each EC2 instance you launch can configure `ssh-grunt` with the names of the IAM
group(s) that will be allowed to SSH to the instance, with or without sudo permissions. The group names are
completely up to you, so you could have many such groups, with whatever names you pick. Once you add an IAM user to
that group, that user will be able to SSH to the corresponding EC2 instances using their own IAM user name and the
[SSH key associated with their IAM user account](https://docs.aws.amazon.com/codecommit/latest/userguide/setting-up-ssh-unixes.html#setting-up-ssh-unixes-keys).

You must be a <span class="js-subscribe-cta">Gruntwork subscriber</span> to access `ssh-grunt` in
[terraform-aws-security](https://github.com/gruntwork-io/terraform-aws-security/).



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"e02c893b1f8ed69b0a4ae68f2e916025"}
##DOCS-SOURCER-END -->
