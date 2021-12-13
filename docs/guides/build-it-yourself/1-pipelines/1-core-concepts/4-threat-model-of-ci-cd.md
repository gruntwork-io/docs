# Threat model of CI/CD

The threat model of CI/CD is different between application code, infrastructure modules, and live infrastructure config.
This largely stems from the amount of permissions required to implement each workflow. For a limited deployment workflow
like application code, you only need a limited set of permissions to the infrastructure environments to conduct a
deployment. However, for infrastructure modules and live infrastructure config, where you handle arbitrary
infrastructure changes (including permissions changes, like a new AWS IAM role), you will need full access to all the
environments, including production.

Given the potential consequences of leaked credentials from CI/CD, it is important to evaluate the threats and
mitigation tactics for those threats. This is where threat modeling helps.

A threat model explicitly covers what attacks are taken into consideration in the design, as well as what attacks are
_not_ considered. The goal of the threat model is to be realistic about the threats that are addressable with the
tools available. By explicitly focusing attention on more likely and realistic threats, we can avoid over-engineering and
compromising the usability of the solution against threats that are unlikely to exist (e.g., a 5 person startup with 100
end users is unlikely to be the subject of a targeted attack by a government agency).

In this guide, the following threat assumptions are made:

- Attackers' goals are to gain access to an environment that they do not already have access to. Access to an
  environment includes but is not limited to:

  - The ability to read secrets that grant access to potentially sensitive data (e.g., the database in prod
    environment).

  - Full access over all resources to cause damage to the business (e.g., ability to delete the database and all its
    backups in prod).

- Attackers can originate from both external and internal sources (in relation to the organization).

- External attacks are limited to those that can get full access to a CI environment, but not the underlying source
  code. Note that _any_ CI/CD solution can likely be compromised if an attacker has access to your source code.

- Internal attackers are limited to those with restricted access to the environments. This means that the threat model
  does not consider highly trusted insiders who abuse their privileges with malicious intent (e.g
  internal ops admin with full access to the prod environment). However, an internal attacker with permissions in the
  dev environment trying to elevate their access to the prod environment is considered.

- Similarly, internal attackers are limited to those with restricted access in the CI environment and git repository. A
  threat where the internal attackers can bypass admin approval in a CI pipeline or can force push deployment branches
  is not considered.

- Internal attackers can have (limited) access to the CI environment and the underlying code of the infrastructure (e.g
  the git repository).

With this threat model in mind, let’s take a look at the different CI/CD platforms.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"0405627489307382892291a16e5ecc7b"}
##DOCS-SOURCER-END -->
