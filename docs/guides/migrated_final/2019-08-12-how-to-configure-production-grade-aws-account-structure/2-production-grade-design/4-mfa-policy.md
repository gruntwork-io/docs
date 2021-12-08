# MFA policy

MFA should be required to access any of your AWS accounts via the web or any API call. Unfortunately, AWS doesn’t have
an easy way to enforce MFA globally, and if you try to enforce it in a naive manner, you’ll run into issues: e.g., you
might accidentally block access for your own applications (e.g., those that use IAM roles on EC2 instance, where MFA
isn’t possible) or you might accidentally block new IAM users from accessing AWS and setting up an MFA token in the
first place.

Therefore, the best way to enforce MFA right now is as follows:



<div className="dlist">

#### IAM roles

All the IAM roles in your non-security child accounts that are meant to be assumed by users should
[require an MFA token in the trust policy](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_configure-api-require.html#MFAProtectedAPI-user-mfa).
Since these IAM roles are the only way to access those child accounts (i.e., there are no IAM users in those child
accounts), this ensures that it’s only possible to access those accounts with MFA enabled. Note: the
`OrganizationAccountAccessRole` IAM role is created automatically by AWS Organizations, so you’ll need to manually
update it in each child account to require MFA.

#### IAM users and groups

The only place you have IAM users and groups are in the root and security account. None of the user accounts should
have any IAM policies directly attached, so the only thing to think through is the policies attached to the IAM
groups. To enforce MFA, make sure that all of these policies
[require an MFA token](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_configure-api-require.html#MFAProtectedAPI-user-mfa).
Note that all of these policies also should attach "self-management" permissions that allow IAM users just enough
permissions to access their own user account without an MFA token so they can configure an MFA token in the first
place.


</div>



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"b2f712be8243616abeeed8565b3b8f30"}
##DOCS-SOURCER-END -->
