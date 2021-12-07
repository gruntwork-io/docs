# Federated authentication

_[Federation](https://aws.amazon.com/identity/federation/)_ allows you to authenticate to your AWS account using an
existing _identity provider (IdP)_, such as Google, Active Directory, or Okta, rather than IAM users. Since just about
every single company already has all their user accounts defined in an IdP, this allows you to avoid having to:

- Duplicate all those user accounts in the form of IAM users

- Maintain and update user accounts in multiple places (e.g., when someone changes teams or leaves the company)

- Manage multiple sets of credentials

There are several ways to configure your AWS account to support _single sign-on (SSO)_, allowing you to authenticate
using the users and credentials from your IdP:

AWS Single Sign-On  
[AWS Single Sign-On](https://aws.amazon.com/single-sign-on/) is a managed service that allows you to configure SSO for
IdPs that support SAML, such as Active Directory and Google. It provides a simple SSO experience for the AWS web
console, although
[signing in on the command line](https://aws.amazon.com/blogs/security/aws-single-sign-on-now-enables-command-line-interface-access-for-aws-accounts-using-corporate-credentials/)
requires multiple steps, including manually copy/pasting credentials.



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"a5dbfadb0de17efda39bc0f22cd697f7"}
##DOCS-SOURCER-END -->
