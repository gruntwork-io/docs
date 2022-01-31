import Card from "/src/components/Card"
import { CardList } from "/src/components/CardGroup"

# The Gruntwork Production Framework

In this guide, we are going to share our opinionated, step-by-step framework for successfully going to production on
the public cloud. At Gruntwork, we've had the privilege to work with everything from tiny startups to massive Fortune
50 companies to some of the world's largest government agencies, and this document captures the common patterns we've
seen that actually worked.

<div style={{maxWidth: "640px", margin: "auto", marginTop: "3rem"}}>

## The Elements of the Gruntwork Production Framework

<CardList style={{marginTop: 0}}>

<Card
  title="Service Catalog"
  href="./ingredients/service-catalog"
  icon="/img/icons/service-catalog.svg">
Your company's vetted, tested, reusable, off-the-shelf solutions for infrastructure and appliactions.
</Card>
<Card
  title="Landing Zone"
  href="./ingredients/landing-zone"
  icon="/img/icons/landing-zone.svg">
The basic structure for your cloud accounts, including auth, guard rails, and other scaffolding.
</Card>
<Card
  title="CI / CD"
  href="./ingredients/ci-cd-pipeline"
  icon="/img/icons/ci-cd.svg">
A Continuous Integration / Continuous Delivery pipeline to automate builds, tests, and deployments.
</Card>
<Card
  title="Self-service"
  href="./ingredients/self-service"
  icon="/img/icons/self-service.svg">
Allow developers to deploy and manage their own apps and infrastructure.
</Card>
<Card
  title="Automatic Updates"
  href="./ingredients/automatic-updates"
  icon="/img/icons/auto-update.svg">
Kepp all your application and infrastructure dependencies up to date, automatically.
</Card>

</CardList>

</div>

This is not another high-level, vague "cloud operating model" document that is heavy on buzzwords but light on
actionable content. Instead, you'll find a clear mental model of how to think about cloud usage, plus a set of
concrete, opinionated set of steps you can follow to make better use of the cloud at your company. Think of this as a
concrete description of the cloud setup you should be aiming for—the "right way" to do things.

## Why you need a framework

The cloud changes everything.

In the past, if you wanted to build a software company, you'd also have to manage a lot of hardware, including setting
up a data center with lots of servers, racks, wiring, cooling, and so on. As a result, most companies were split
between the folks that wrote the software ("Devs") and the folks that managed the hardware ("Ops"). Nowadays, instead
of managing data centers, the vast majority of companies are moving to the cloud, and running their software on Amazon
Web Services (AWS), Azure, and Google Cloud Platform (GCP).

This has a huge impact on how a software company works. Instead of racking hardware, your Ops team now spends most of
its time working with software tools such as Terraform, Packer, Docker, and Kubernetes. And instead of your Dev team
writing code and "tossing it over the wall" to Ops, Devs want to be self-sufficient, deploying and managing everything
they need themselves without being bottlenecked by Ops team.

In other words, the distinction between Dev and Ops teams is blurring: this is where the term _DevOps_ comes from.
There's no widely agreed-upon definition for DevOps, but for the purposes of this article, we'll think of it as a
movement which has the goal of _making software delivery vastly more efficient_. And the one thing you can be certain
of is that trying to port the "old way" of doing things to the cloud will _not_ be efficient. The shift to the cloud
and DevOps brings a huge number of changes:

|                                 | Before                                          | After                                                  |
| ------------------------------- | ----------------------------------------------- | ------------------------------------------------------ |
| **Teams**                       | Devs write code, "toss it over the wall" to Ops | Devs &amp; Ops work together on cross-functional teams |
| **Servers**                     | Dedicated physical servers                      | Elastic virtual servers                                |
| **Connectivity**                | Static IPs                                      | Dynamic IPs, service discovery                         |
| **Security**                    | Physical, strong perimeter, high trust interior | Virtual, end-to-end, zero trust                        |
| **Infrastructure provisioning** | Manual                                          | Infrastructure as Code (IaC) tools                     |
| **Server configuration**        | Manual                                          | Configuration management tools                         |
| **Testing**                     | Manual                                          | Automated testing                                      |
| **Deployments**                 | Manual                                          | Automated                                              |
| **Deployment cadence**          | Weeks or months                                 | Many times per day                                     |
| **Change process**              | Change request tickets                          | Self-service                                           |
| **Change cadence**              | Weeks or months                                 | Minutes                                                |

## Who the framework is for

This framework is for companies who wish to adopt the public cloud (e.g., Amazon Web Services, Microsoft Azure, Google
Cloud Platform) for _production and mission-critical use cases._ We're talking about use cases where you're betting
your company on the reliability and security of the cloud: you're betting that your infrastructure won't fall over if
there's a traffic spike; you're betting that you won't lose data if there's an outage; you're betting that hackers
won't be able to break in and compromise your data; and if these bets don’t work out, your company may go out of
business. That’s what’s at stake here.

## Prerequisites

There are a couple prerequisites to using the framework:

1. Define your requirements in writing
2. Implement your requirements in code

### Define your requirements in writing

Here's a fun experiment to try at your company: go around to 5 different teams, and ask them, "what do I have to do to
put a new app in prod?" In most companies, you'll get 5 (or sometimes even 6!) completely different answers. One team
might talk about packaging your app using Docker; another may talk about configuring monitoring, logging, and alerting;
another team will focus on what compliance and regulatory requirements you must meet; yet another team will dive into
the details of your scalability and high availability requirements.

As Yogi Berra said, if you don't know where you are going, you'll end up someplace else. Something similar is true of
the cloud: if you don't know _exactly_ what your cloud requirements are, you won't meet them. Trying to backfill
security, compliance, monitoring, availability, and other requirements _after_ your team has been running wild in the
cloud for months is much harder.

Therefore, it's essential to get your requirements down in writing, ideally in the form of a checklist (see also:
_The Checklist Manifesto_). This will give you a real sense of the work involved: seeing a long list of requirements,
in front of you, on (digital) paper, makes the scope of the work much more visible, which is particularly useful in the
face of bosses who blindly demand "we must be 100% in the cloud by _&lt;unrealistic timeline&gt;_!!!" with zero context
on just how much work is involved. You can use the list of requirements to coordinate the work and track progress
towards. You can use this list not only for an initial launch, but for all new deployments in the future too. You can
of course include diagrams and images too. And when you put it all together, you'll finally have a single, canonical,
written answer to "what do I have to do to put a new app in prod?"

There are many types of requirements to take into consideration:

| Requirement                   | Examples                                       |
| ----------------------------- | ---------------------------------------------- |
| Infrastructure                | Servers, databases, load balancers, etc.       |
| Compliance                    | SOC 2, ISO 27001, HIPAA, PCI, CIS, etc.        |
| Observability                 | Metrics, logging, alerting, audit trails, etc. |
| Governance                    | Operations, access control, data mgmt, etc.    |
| Security                      | Encryption, secrets management, auth, etc.     |
| Scalability                   | Load, throughput, response time, etc.          |
| Availability &amp; resiliency | SLAs, backup, replication, etc.                |
| Cost                          | Budget, cost tracking, cost optimization, etc. |

This list is just a starting point; depending on your company's needs, there may be other requirements to take into
account. The good news is that once you start getting these down systematically, in writing, you'll realize what else
you need to think through as well.

### Implement your requirements in code

In the past, doing this requirements analysis, capturing it in writing in checklists and policy documents, and training
your org to enforce these requirements might have been enough. But in the era of elastic, self-service,
instantly-available cloud environments, it's not enough to have a bunch of written documents and manual processes. You
can no longer rely on manual deployments, manual security checks, or manual responses to outages. You must go one step
further and capture and enforce requirements _as code_.

Let's extend the table of requirements from the previous section with examples of how you can implement each one using
different types of code:

| Requirement                   | Examples                                       | Code examples                                                  |
| ----------------------------- | ---------------------------------------------- | -------------------------------------------------------------- |
| Infrastructure                | Servers, databases, load balancers, etc.       | Infrastructure as Code (IaC) tools: Terraform, CloudFormation. |
| Compliance                    | SOC 2, ISO 27001, HIPAA, PCI, CIS, etc.        | Continuous testing tools: Terratest, Open Policy Agent (OPA).  |
| Observability                 | Metrics, logging, alerting, audit trails, etc. | Monitoring tools: CloudWatch, DataDog, Prometheus.             |
| Governance                    | Operations, access control, data mgmt, etc.    | CI / CD tools: Jenkins, GitLab, GitHub Actions.                |
| Security                      | Encryption, secrets management, auth, etc.     | Server &amp; network hardening tools: Packer, Istio.           |
| Scalability                   | Load, throughput, response time, etc.          | Auto scaling tools: e.g., Kubernetes, Fargate.                 |
| Availability &amp; resiliency | SLAs, backup, replication, etc.                | Replication &amp; backup tools: AWS Backup, S3 replication.    |
| Cost                          | Budget, cost tracking, cost optimization, etc. | Cost management enforcement tools: Terraform, OPA.             |

The list above is just an example of some of the tools you use. There are plenty of other options available, and it's
less important which tool you pick, so long as that tool lets you manage everything as code.

Why code? We've found that companies that successfully use the cloud almost always capture and enforce their
requirements not only in software (rather than manual processes), but specifically as _software managed with code_.
Software managed manually with a web UI—e.g., setting up infrastructure by manually clicking around the AWS Web Console
("ClickOps"*)—*is not enough, as there are a number of benefits that you only get when you manage your requirements with
code:

1. **Customization**. Every company's requirements are a bit different. With a web UI, it's all or nothing: either the web UI lets you customize things as you need them, or it doesn't. With code, you can typically configure things exactly as you need it. Well-designed code is flexible, modular, and expressive.
2. **Speed, safety, consistency**. Computers are exceptionally good at doing the same thing, again and again, exactly the same way, at extreme speeds. Humans are not. Compared to doing anything manually, capturing your requirements as code means you'll be able to meet and enforce those requirements in a way that is far faster, more consistent, and less error prone.
3. **Documentation**. Instead of the state of your infrastructure being locked away in a single sysadmin’s head, you can represent the state of your infrastructure in source files that
   anyone can read. In other words, code acts as documentation, allowing everyone
   in the organization to understand how things work, even if the sysadmin goes on
   vacation. You can even generate diagrams from your code (e.g., using CloudCraft), dependency graphs, and do various other types of analysis to better understand how your infrastructure is configure
4. **Versioning**. You can store your your code in version control, which means that the
   entire history of changes is now captured in the commit log. This becomes a powerful tool for debugging issues, because any time a problem pops up, your first step will be to check the commit log and find out what changed, and your second step might be to resolve the problem by simply reverting back to a previous, known-good version of your code.
5. **Validation**. If you manage everything as code code, then for every single change, you can perform a code review, run a suite of automated tests, and pass the code through static analysis tools—all practices that are known to significantly reduce the chance of defects.
6. **Reuse**. Instead of doing everything manually, from scratch, every time, code allows you to build on top of known, documented, battle-tested pieces. For example, once your team has figured out how you want to set up your networking (e.g., VPCs, subnets, route tables, NAT gateways, etc), you can capture that as code, and reuse it in all your future projects, rather than figuring it out from scratch every time.
7. **Happiness**. There is one other very important, and often overlooked, reason for why you
   should use code: happiness. Human beings don't like doing manual, repetitive processes. There's no room for creativity, no challenge, and no recognition. You could deploy code manually for months without issues, and no one will take notice—until that one day when you mess it up. That creates a stressful and unpleasant environment. Code offers a better alternative that allows computers to do what they do best (automation) and people to do what they do best (creativity).

So, as you go through this framework, keep in mind that the goal is to define and manage each part of the framework
in code.

## Let's get started

So how do you accomplish all of this? How do you allow your Dev teams to be highly productive and self-sufficient,
while still allowing your Ops team to control what's happening under the hood and ensure all your business, security,
and legal requirements are met?

The goal of the Gruntwork Production Framework is to help you answer these questions. First, we'll define the basic
_ingredients_: the raw primitives your company will need to put in place to use the cloud successfully. Then, we'll
take a look at some _recipes_: a walkthrough of one way you could put all those ingredients together into an end-to-end
experience for your Dev and Ops teams. Finally, we'll talk about the off-the-shelf _solutions_ we have available at
Gruntwork to help you implement this framework.

1. **Ingredients**
   1. [Service Catalog](ingredients/service-catalog/index.md)
   1. [Landing Zone](ingredients/landing-zone/index.md)
   1. [CI / CD Pipeline](ingredients/ci-cd-pipeline/index.md)
   1. [Self-Service](ingredients/self-service/index.md)
   1. [Automatic Updates](ingredients/automatic-updates/index.md)
   1. [Other Ingredients](ingredients/other-ingredients/index.md)
2. **Recipes**
   1. [Intro](recipes/index.md)
   1. [The Dev team experience](recipes/dev-team-experience.md)
   1. [The Ops team experience](recipes/ops-team-experience.md)
3. **Solutions**
   1. [How Gruntwork can help](gruntwork-solutions/index.md)


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"8e70078144f75a63e78b504b6c04e253"}
##DOCS-SOURCER-END -->
