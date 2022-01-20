# Implement requirements in code

In the past, doing this requirements analysis, capturing it in writing in checklists and policy documents, and training
your org to enforce these requirements might have been enough. But in the era of elastic, self-service,
instantly-available cloud environments, it's not enough to have a bunch of written documents and manual processes. You
can no longer rely on manual deployments, manual security checks, or manual responses to outages. You must go one step
further and capture and enforce requirements *as code*.

Let's extend the table of requirements from the previous section with examples of how you can implement each one using
different types of code:

| Requirement                   | Examples                                       | Code examples                                                  |
|-------------------------------|------------------------------------------------|----------------------------------------------------------------|
| Infrastructure                | Servers, databases, load balancers, etc.       | Infrastructure as Code (IaC) tools: Terraform, CloudFormation. |
| Compliance                    | SOC 2, ISO 27001, HIPAA, PCI, CIS, etc.        | Continuous testing tools: Terratest, Open Policy Agent (OPA).  |
| Observability                 | Metrics, logging, alerting, audit trails, etc. | Monitoring tools: CloudWatch, DataDog, Prometheus.             |
| Governance                    | Operations, access control, data mgmt, etc.    | CI / CD tools: Jenkins, GitLab, GitHub Actions.                |
| Security                      | Encryption, secrets management, auth, etc.     | Server &amp; network hardening tools: Packer, Istio.           |
| Scalability                   | Load, throughput, response time, etc.          | Auto scaling tools: e.g., Kubernetes, Fargate.                 |
| Availability &amp; resiliency | SLAs, backup, replication, etc.                | Replication &amp; backup tools: AWS Backup, S3 replication.    |
| Cost                          | Budget, cost tracking, cost optimization, etc. | Cost management tools: AWS Cost Explorer, Harness.             |

The list above is just an example of some of the tools you use. There are plenty of other options available, and it's
less important which tool you pick, so long as that tool lets you manage everything as code.

Why code? We've found that companies that successfully use the cloud almost always capture and enforce their
requirements not only in software (rather than manual processes), but specifically as *software managed with code*.
Software managed manually with a web UI—e.g., setting up infrastructure by manually clicking around the AWS Web Console
("ClickOps"*)—*is not enough, as there are a number of benefits that you only get when you manage your requirements with
code:

1. **Customization**. Every company's requirements are a bit different. With a web UI, it's all or nothing: either the web UI lets you customize things as you need them, or it doesn't. With code, you can typically configure things exactly as you need it. Well-designed code is flexible, modular, and expressive.
2. **Speed, safety, consistency**. Computers are exceptionally good at doing the same thing, again and again, exactly the same way, at extreme speeds. Humans are not. Compared to do anything manually, capturing your requirements as code means you'll be able to meet and enforce those requirements in a way that is far faster, more consistent, and less error prone.
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

So how do you capture all your requirements as code? That's what we'll be discussing in the next section.
