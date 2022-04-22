# CI/CD platforms

Over the years, as practices for CI/CD for application code developed, many platforms emerged to support CI/CD workflows
triggered from source control. Here we will list out a few of the major CI/CD platforms that exist to support these
workflows. Note that this isn’t an exhaustive list or an endorsement of the platforms that are listed here. The goal of
this section is to give a few examples of existing platforms and solutions, and cover the trade offs that you should
consider when selecting a platform to implement your workflow on. The production-grade design that we cover in the guide
is compatible with almost any generic CI/CD platform that you select, but is an alternative to the specialized platforms
for infrastructure code.

In general, CI/CD platforms fit one of two categories: self-hosted or SaaS. Self-hosted CI/CD platforms are designed as
infrastructure that you run in your data center and cloud for managing the infrastructure in your account, while SaaS
CI/CD platforms are hosted by the vendor that provides the platform. In most cases, SaaS platforms are preferred to
self-hosted platforms to avoid the overhead of maintaining additional infrastructure to enable developer workflows,
which not only cost money but also time from your operations team to maintain the infrastructure with patches, upgrades,
uptime, etc. However, in certain fields with strict compliance requirements, it is unavoidable to have self-hosted CI/CD
platforms due to the threat model and the amount of permissions that are granted to the platform to ensure the software
can be deployed. These fields manage sensitive data that make it hard to entrust third-party platforms that are publicly
accessible with the "keys to the kingdom" that hold that data.

Additionally, CI/CD platforms can be further divided into generic platforms for any code, and specialized platforms for
application code or infrastructure code. Depending on your use case, it may be desirable to use a specialized platform
that accelerates the implementation of specific workflows as opposed to configuring a generic platform.

Here are a few examples of well-known platforms, the general category that they fit in, major features that the platform
provides, as well as how they mitigate the threat model that we cover:

<table>
<colgroup>
<col />
<col />
<col />
<col />
<col />
<col />
<col />
</colgroup>
<tbody>
<tr className="odd">
<td><p><strong></strong></p></td>
<td><p><a href="https://jenkins.io/">Jenkins</a></p></td>
<td><p><a href="https://circleci.com/">CircleCI</a></p></td>
<td><p><a href="https://buildkite.com/">BuildKite</a></p></td>
<td><p><a href="https://gitlab.com/">GitLab</a></p></td>
<td><p><a href="https://www.runatlantis.io">Atlantis</a></p></td>
<td><p><a href="https://www.hashicorp.com/products/terraform/">TFE and TFC</a></p></td>
</tr>
<tr className="even">
<td><p><strong>Hosting</strong></p></td>
<td><p>Self-hosted</p></td>
<td><p>SaaS</p></td>
<td><p>Hybrid (SaaS control plane, Self-hosted workers)</p></td>
<td><p>SaaS or Self-hosted</p></td>
<td><p>Self-hosted</p></td>
<td><p>SaaS or Self-hosted</p></td>
</tr>
<tr className="odd">
<td><p><strong>Purpose</strong></p></td>
<td><p>Generic CI/CD tool</p></td>
<td><p>Generic CI/CD tool</p></td>
<td><p>Generic CI/CD tool</p></td>
<td><p>Generic CI/CD tool</p></td>
<td><p>Specialized to terraform</p></td>
<td><p>Specialized to terraform</p></td>
</tr>
<tr className="even">
<td><p><strong>VCS integration</strong></p></td>
<td><p>Yes, with plugins</p></td>
<td><p>Yes</p></td>
<td><p>Yes</p></td>
<td><p>Yes</p></td>
<td><p>Yes</p></td>
<td><p>Yes</p></td>
</tr>
<tr className="odd">
<td><p><strong>Provides static IP addresses for IP whitelisting</strong></p></td>
<td><p>Yes</p></td>
<td><p>No</p></td>
<td><p>Yes (for workers)</p></td>
<td><p>Yes (self-hosted)</p></td>
<td><p>Yes</p></td>
<td><p>Yes (TFE)</p></td>
</tr>
<tr className="even">
<td><p><strong>Built-in workflows</strong></p></td>
<td><p>None</p></td>
<td><p>None</p></td>
<td><p>None</p></td>
<td><p>Kubernetes Workflows</p></td>
<td><p>Terraform Workflows</p></td>
<td><p>Terraform Workflows</p></td>
</tr>
<tr className="odd">
<td><p><strong>Custom workflows</strong></p></td>
<td><p>Yes</p></td>
<td><p>Yes</p></td>
<td><p>Yes</p></td>
<td><p>Yes</p></td>
<td><p>No (Only supports a fixed Terraform-based workflow)</p></td>
<td><p>No (Only supports a fixed Terraform-based workflow)</p></td>
</tr>
<tr className="even">
<td><p><strong>Credentials storage</strong></p></td>
<td><p>Managed by you</p></td>
<td><p>Shared with 3rd party</p></td>
<td><p>Managed by you</p></td>
<td><p>Shared with 3rd party (SaaS); Managed by you (Self-hosted)</p></td>
<td><p>Managed by you</p></td>
<td><p>Shared with 3rd party (TFC); Managed by you (TFE)</p></td>
</tr>
<tr className="odd">
<td><p><strong>Update commit statuses</strong></p></td>
<td><p>Yes</p></td>
<td><p>Yes</p></td>
<td><p>Yes</p></td>
<td><p>Yes</p></td>
<td><p>Yes</p></td>
<td><p>Yes</p></td>
</tr>
<tr className="even">
<td><p><strong>Annotate pull requests</strong></p></td>
<td><p>Requires custom scripting</p></td>
<td><p>Requires custom scripting</p></td>
<td><p>Requires custom scripting</p></td>
<td><p>Yes</p></td>
<td><p>Yes</p></td>
<td><p>Supports multiple infrastructure tools</p></td>
</tr>
</tbody>
</table>


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "c728900868ee40f23042497e3d1c64f2"
}
##DOCS-SOURCER-END -->
