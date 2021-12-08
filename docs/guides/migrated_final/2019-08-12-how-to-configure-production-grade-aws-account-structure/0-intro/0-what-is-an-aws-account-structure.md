# What is an AWS account structure?

To use AWS, you sign up for an AWS account. An _AWS account structure_ is an organized collection of inter-connected
AWS accounts designed to run production workloads.

Configuring an AWS account structure serves three primary purposes:



<div className="dlist">

#### Isolation (AKA compartmentalization)

You use separate AWS accounts to isolate different environments from each other and to limit the "blast radius" when
things go wrong. For example, putting your staging and production environments in separate AWS accounts ensures that
if an attacker manages to break into staging, they still have no access whatsoever to production. Likewise, this
isolation ensures a developer making changes in staging is less likely to accidentally break something in production.

#### Authentication and authorization

If you configure your AWS account structure correctly, you’ll be able to manage all user accounts in one place, making
it easier to enforce password policies, multi-factor authentication, key rotation, and other security requirements.
Using multiple AWS accounts also makes it easier to have fine-grained control over what permissions each developer
gets in each environment.

#### Auditing and reporting

A properly configured AWS account structure will allow you to maintain an audit trail of all the changes happening in
all your environments, check if you’re adhering to compliance requirements, and detect anomalies. Moreover, you’ll be
able to have consolidated billing, with all the charges for all of your AWS accounts in one place, including cost
breakdowns by account, service, tag, etc.


</div>



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"36f90fdbbdd88736c04780359e46117c"}
##DOCS-SOURCER-END -->
