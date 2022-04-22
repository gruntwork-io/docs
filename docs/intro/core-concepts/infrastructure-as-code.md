# Infrastructure as code

Everything in the Gruntwork Infrastructure as Code Library is designed to allow you to define your _infrastructure as code (IaC)_.
That is, instead of deploying infrastructure _manually_ (e.g., by clicking around a web page), the idea behind IaC is
to write code to define, provision, and manage your infrastructure. This has a number of benefits:

<div className="dlist">

#### Self-service

Most teams that deploy code manually have a small number of sysadmins (often, just one) who are the only ones who
know all the magic incantations to make the deployment work and are the only ones with access to production. This
becomes a major bottleneck as the company grows. If your infrastructure is defined in code, then the entire
deployment process can be automated, and developers can kick off their own deployments whenever necessary.

#### Speed and safety

If the deployment process is automated, it’ll be significantly faster, since a computer can carry out the deployment
steps far faster than a person; and safer, since an automated process will be more consistent, more repeatable, and
not prone to manual error.

#### Documentation

Instead of the state of your infrastructure being locked away in a single sysadmin’s head, you can represent the
state of your infrastructure in source files that anyone can read. In other words, IaC acts as documentation,
allowing everyone in the organization to understand how things work, even if the sysadmin goes on vacation.

#### Version control

You can store your IaC source files in version control, which means the entire history of your infrastructure is now
captured in the commit log. This becomes a powerful tool for debugging issues, as any time a problem pops up, your
first step will be to check the commit log and find out what changed in your infrastructure, and your second step may
be to resolve the problem by simply reverting back to a previous, known-good version of your IaC code.

#### Validation

If the state of your infrastructure is defined in code, then for every single change, you can perform a code review,
run a suite of automated tests, and pass the code through static analysis tools, all practices that are known to
significantly reduce the chance of defects.

#### Happiness

Deploying code and managing infrastructure manually is repetitive and tedious. Developers and sysadmins resent this
type of work, as it involves no creativity, no challenge, and no recognition. You could deploy code perfectly for
months, and no one will take notice—until that one day when you mess it up. That creates a stressful and unpleasant
environment. IaC offers a better alternative that allows computers to do what they do best (automation) and
developers to do what they do best (coding).

#### Reuse

You can package your infrastructure into reusable modules, so that instead of doing every deployment for every
product in every environment from scratch, you can build on top of known, documented, battle-tested pieces. You
can build these reusable modules yourself or use an existing collection of modules, such as the Gruntwork
Infrastructure as Code Library.

Some of the main IaC tools you’ll see used and referenced in the Gruntwork Infrastructure as Code Library are Terraform, Terragrunt,
Packer, Docker, and Helm, each of which we’ll discuss in the next several sections.

</div>


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "e29d1b09112e97f7f9908267a676c308"
}
##DOCS-SOURCER-END -->
