# Federated auth

If you are using federated auth—that is, you are going to access AWS using an existing IdP such as Google, Active
Directory, or Okta—you should use the same account structure, but with a few changes:


<div className="dlist">

#### No IAM users or groups

Since all of your users will be managed in the IdP, you do not need to create any IAM users or IAM groups (other than
the handful of IAM users in the root account).

#### Different IAM role trust policies

With federated auth, you will be granting your IdP users access to specific IAM roles in specific accounts.
Therefore, your child accounts will need more or less all the same basic IAM roles described earlier. However, the
trust policy on those IAM roles will be quite different. For example, if you are using federated auth with SAML,
the `Action` you allow will be `sts:AssumeRoleWithSAML` rather than `sts:AssumeRole` and the `Principal` will be your
SAML provider:


</div>

``` json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "sts:AssumeRoleWithSAML",
      "Principal": {
        "Federated": "arn:aws:iam::111122223333:saml-provider/<YOUR_SAML_PROVIDER>"
      }
    }
  ]
}
```


<div className="dlist">

#### MFA enforced by IdP, not AWS

One other big difference with IAM roles for federated auth is that these IAM roles should NOT require an MFA token.
That’s because the MFA token check in AWS IAM policies only works with AWS MFA tokens, and not whatever MFA
configuration you have with your IdP. With federated auth, AWS fully trusts the IdP to figure out all auth details,
so if you want to require MFA, you need to do that in the IdP itself (i.e., in Google, Active Directory, or Okta).


</div>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"faac25bb0d3743a5cbbacf88bd4a50de"}
##DOCS-SOURCER-END -->
