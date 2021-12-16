# Lock down the root account IAM users

Although IAM users don’t have the same powers as a root user, having an IAM user account compromised can still be a
huge problem for your company (especially if that IAM user had admin permissions), so it’s still critical to lock down
IAM user accounts as much as possible:

<div className="dlist">

#### Use a secrets manager

Do NOT store the root user’s password, or secrets of any kind, in plain text. Instead, always use a secrets manager
such as [1Password](https://1password.com), [LastPass](https://www.lastpass.com), or [pass](https://www.passwordstore.org)
to store the credentials in an encrypted format.

#### Use a strong, generated password

Do NOT re-use passwords from other websites, or any password that you can remember at all. Instead, generate a random,
cryptographically secure, long password (20+ characters). All the password managers mentioned above can generate and
store passwords for you in one step, so use them!

#### Enable MFA

Always make sure to
[enable MFA for your IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable.html).
Feel free to use a virtual or hardware MFA device—whichever is easier or required by your company—as either one
dramatically improves the security of your IAM user. Note that using SMS (text messages) for MFA is
[no longer recommended by NIST](https://www.schneier.com/blog/archives/2016/08/nist_is_no_long.html) due to known
[vulnerabilities with the cellular system](https://www.theverge.com/2017/9/18/16328172/sms-two-factor-authentication-hack-password-bitcoin),
so using a virtual or hardware MFA device is preferable; that said, MFA with SMS is still better than no MFA at all.

</div>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"e0e6d5a424416b59aff4c05e685cc5e9"}
##DOCS-SOURCER-END -->
