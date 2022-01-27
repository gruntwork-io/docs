# The root account

At the top of the design, you have the root account of your AWS organization. This account is not used to run any
infrastructure, and only one or a small number of trusted admins should have IAM users in this account, using it
solely to create and manage child accounts and billing.

Do NOT attach any IAM policies directly to the IAM users; instead, create a set of IAM groups, with specific IAM
policies attached to each group, and assign all of your users to the appropriate groups. The exact set of IAM groups
you need depends on your company’s requirements, but for most companies, the root account contains solely a
`full-access` IAM group that gives the handful of trusted users in that account admin permissions, plus a `billing`
IAM group that gives the finance team access to the billing details.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"1121dc71681544ba526d79d51610b718"}
##DOCS-SOURCER-END -->
