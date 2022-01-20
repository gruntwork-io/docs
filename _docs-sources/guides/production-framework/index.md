---
pagination_label: Production Framework
---

# The Gruntwork Production Framework

In this guide, we are going to share our opinionated, step-by-step framework for successfully going to production on
the public cloud. At Gruntwork, we've had the privilege to work with everything from tiny startups to massive Fortune
50 companies to some of the world's largest government agencies, and this document captures the common patterns we've
seen that actually worked.

This is not another high-level, vague "cloud operating model" document that is heavy on buzzwords but light on
actionable content. Instead, you'll find a clear mental model of how to think about cloud usage, plus a set of
concrete, opinionated set of steps you can follow to make better use of the cloud at your company. Think of this as a
concrete description of the cloud setup you should be aiming for—the "right way" to do things.

## Who the framework is for

This framework is for companies who wish to adopt the public cloud (e.g., Amazon Web Services, Microsoft Azure, Google
Cloud Platform) for *production and mission-critical use cases.* We're talking about use cases where you're betting
your company on the reliability and security of the cloud: you're betting that your infrastructure won't fall over if
there's a traffic spike; you're betting that you won't lose data if there's an outage; you're betting that hackers
won't be able to break in and compromise your data; and if these bets don’t work out, your company may go out of
business. That’s what’s at stake here.

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

In other words, the distinction between Dev and Ops teams is blurring: this is where the term *DevOps* comes from.
There's no widely agreed-upon definition for DevOps, but for the purposes of this article, we'll think of it as a
movement which has the goal of *making software delivery vastly more efficient*. And the one thing you can be certain
of is that trying to port the "old way" of doing things to the cloud will *not* be efficient. The shift to the cloud
and DevOps brings a huge number of changes:

|                                 | Before                                               | After                                                  |
|---------------------------------|------------------------------------------------------|--------------------------------------------------------|
| **Teams**                       | Devs write code, "toss it over the wall" to Ops      | Devs &amp; Ops work together on cross-functional teams |
| **Servers**                     | Dedicated physical servers                           | Elastic virtual servers                                |
| **Connectivity**                | Static IPs                                           | Dynamic IPs, service discovery                         |
| **Security**                    | Physical, strong perimeter, high trust interior      | Virtual, end-to-end, zero trust                        |
| **Infrastructure provisioning** | Manual                                               | Infrastructure as Code (IaC) tools                     |
| **Server configuration**        | Manual                                               | Configuration management tools                         |
| **Testing**                     | Manual                                               | Automated testing                                      |
| **Deployments**                 | Manual                                               | Automated                                              |
| **Deployment cadence**          | Weeks or months                                      | Many times per day                                     |
| **Change process**              | Change request tickets                               | Self-service                                           |
| **Change cadence**              | Weeks or months                                      | Minutes                                                |

## Let's get started

So how do you accomplish all of this? How do you allow your Dev teams to be highly productive and self-sufficient,
while still allowing your Ops team to control what's happening under the hood and ensure all your business, security,
and legal requirements are met?

The goal of the Gruntwork Production Framework is to help you answer these questions. First, we'll define the basic
*ingredients*: the raw primitives your company will need to put in place to use the cloud successfully. Then, we'll
take a look at a *recipe*: a walkthrough of one way you could put all those ingredients together into an end-to-end
experience for your Dev and Ops teams. Finally, we'll talk about where Gruntwork fits into this picture.

1. **The ingredients**
    1. [Requirements](01-ingredients/01-requirements/01-intro.md)
    1. [Service Catalog](01-ingredients/02-service-catalog/01-intro.md)
    1. [Application Catalog](01-ingredients/03-application-catalog/01-intro.md)
    1. [Landing Zone](01-ingredients/04-landing-zone/01-intro.md)
    1. [CI / CD Pipeline](01-ingredients/05-ci-cd-pipeline/01-intro.md)
    1. [Self-Service](01-ingredients/06-self-service/01-intro.md)
    1. [Automatic Updates](01-ingredients/07-automatic-updates/01-intro.md)
    1. [Other Ingredients](01-ingredients/08-other-ingredients/01-intro.md)
2. **The recipes**
    1. [Intro](02-recipes/01-intro.md)
    1. [The Dev team experience](02-recipes/02-dev-team-experience.md)
    1. [The Ops team experience](02-recipes/03-ops-team-experience.md)
3. **How Gruntwork can help**
    1. [Gruntwork solutions](03-gruntwork/01-intro.md)
