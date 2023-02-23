# IAM roles for users

Whereas you’ll create IAM users within the security account (something we’ll discuss shortly), in all the other child
accounts, you’ll solely create IAM roles that have a trust policy that allows these IAM roles to be assumed from the
security account.

The exact set of IAM roles you need in each account depends on your company’s requirements, but here are some common
ones:


<div className="dlist">

#### OrganizationAccountAccessRole

When creating a new child account using AWS Organizations, this is a role you create automatically that allows the
admin users in the root account to have admin access to the new child account. This role is useful for initial setup
of the new child account (e.g., to create other roles in the account) and as a backup in case you somehow lose access
to the child account (e.g., someone accidentally deletes the other IAM roles in the account). Note that the name of
this role is configurable, though we generally recommend sticking to a known default such as
`OrganizationAccountAccessRole`.

#### allow-full-access-from-other-accounts

This IAM role grants full access to everything in the child account. These are essentially admin permissions, so be
very thoughtful about who has access to this IAM role.

#### allow-read-only-access-from-other-accounts

This IAM role grants read-only access to everything in the child account.

#### allow-dev-access-from-other-accounts

This IAM role grants "developer" access in the child account. The exact permissions your developers need depends
completely on the use case and the account: e.g., in pre-prod environments, you might give developers full access
to EC2, ELB, and RDS resources, whereas in prod, you might limit that solely to EC2 resources. For larger teams, you
will likely have multiple such roles, designing them for specific teams or tasks: e.g.,
`allow-search-team-access-from-other-accounts`, `allow-frontend-team-access-from-other-accounts`,
`allow-dba-access-from-other-accounts`, etc.

#### openvpn-allow-certificate-xxx-for-external-accounts

:::caution

This role only applies to <span className="js-subscribe-cta">Gruntwork subscribers</span> who have access to
[package-openvpn](https://github.com/gruntwork-io/package-openvpn/).

:::

</div>

The `openvpn-allow-certificate-requests-for-external-accounts` and
`openvpn-allow-certificate-revocations-for-external-accounts` IAM roles allows users to request and revoke VPN
certificates, respectively, for an OpenVPN server running in the child account. This is part of the Gruntwork
[package-openvpn](https://github.com/gruntwork-io/package-openvpn/) code, which deploys a production-grade OpenVPN
server and allows developers with access to these IAM roles to request VPN certificates (self-service).


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"f159d5c23afaa110863cab6ea08681f6"}
##DOCS-SOURCER-END -->
