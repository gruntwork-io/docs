# Lock down the root user

After signing up for an AWS account, you’ll be logged in as the root user. The root user has unrestricted access to
just about everything in your AWS account (and any child accounts), so if an attacker compromises your root user, the
results can be catastrophic for your company. Therefore, you should lock down the root user as much as possible:

Use a secrets manager  
Do NOT store the root user’s password, or secrets of any kind, in plain text. Instead, always use a secrets manager
such as [1Password](https://1password.com), [LastPass](https://www.lastpass.com), or [pass](https://www.passwordstore.org)
to store the credentials in an encrypted format.

Use a strong, generated password  
Do NOT re-use passwords from other websites, or any password that you can remember at all. Instead, generate a random,
cryptographically secure, long password (20+ characters) for the root user. All the password managers mentioned above
can generate and store passwords for you in one step, so use them!

Add security questions to your root account  
The CIS benchmark suggests adding security questions when registering your AWS account so that when somebody contacts
AWS support, they will be required to complete a security challenge. To add security questions to the root account,
navigate in the AWS web console to `My Account` and then to the `Personal Information` page. There you should be able
to click on `Configure Security Challenge Questions` and add your questions.

Enable MFA  
Make sure to
[enable MFA for your root user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html#id_root-user_manage_mfa).
Feel free to use a virtual or hardware MFA device, whichever is more straightforward or required by your company, as either one
dramatically improves the security of your root user. It is up to your discretion to decide which option is suitable
for your use case. The CIS benchmark recommends using a dedicated or company-owned device for MFA and not a personal
one. This applies to both virtual and hardware devices.

Disable access keys  
Make sure to
[delete the root user’s access keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html#id_root-user_manage_delete-key),
so that the only way to login as the root user is via the web console, where MFA is required.

The one exception to this rule is when you enable the MFA delete feature as it requires access keys for the root user. Under these circumstances, we recommend creating a set of access keys solely to enable the MFA Delete feature and immediately remove them afterward.

Don’t use the root user again  
In the next section, you will create an IAM user in the root account with admin permissions. Once you’ve created that
IAM user, you should do everything as that IAM user, and more or less never touch the root user account again.
The only time you’ll need it is for account recovery situations (e.g., you accidentally deleted the IAM user or lost
your credentials) or for the
[small number of tasks that require root user credentials](https://docs.aws.amazon.com/general/latest/gr/aws_tasks-that-require-root.html).



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"51e932db641ed37aab720a9b7aadca53"}
##DOCS-SOURCER-END -->
