# Multiple AWS accounts

The first layer of defense is to define each environment (e.g., dev, stage, prod) in a completely separate AWS account.
The reason you want separate AWS accounts is that isolating resources within a single account leads to a nightmare of
complicated IAM policies as you try to allow users within that account access to some resources, but not others. It
is very difficult, for example, to grant minimal IAM privileges in a single AWS account such that you can create IAM
roles and permissions for a particular environment but not another environment. It’s all too easy to get the
permissions wrong, which increases your exposure to attackers (e.g., an attacker who gets access to a pre-prod
environment may find it easier to get access to prod) and to accidental error (e.g., a developer may accidentally
change something in prod rather than pre-prod).

Therefore, your best bet is to put pre-production environments and production environments in completely separate AWS
accounts. This makes it easy to, for example, grant relatively lax permissions in pre-prod environments, but very
strict permissions in production. Check out the [Production Grade AWS Account Structure](/guides/build-it-yourself/landing-zone/)
guide for instructions.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"c17c05c07c1d9b5d5a89d0d4b54bee60"}
##DOCS-SOURCER-END -->
