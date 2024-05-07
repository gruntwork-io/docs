const kbLink =
  "https://github.com/orgs/gruntwork-io/discussions?discussions_q=" +
  // filter by discussions with the label s:CI/Pipelines & sort by top voted discussions first
  encodeURIComponent("label:s:CI/Pipelines sort:top")

const sidebar = [
  {
    label: "Infrastructure Pipelines",
    type: "category",
    collapsible: false,
    items: [
      {
        label: "Overview",
        type: "category",
        collapsed: false,
        items: [
          {
            label: "What is Gruntwork Pipelines?",
            type: "doc",
            id: "infrastructure-pipelines/overview/index",
          },
          {
            label: "Architecture",
            type: "doc",
            id: "infrastructure-pipelines/architecture/index",
          },
          {
            label: "Actions",
            type: "doc",
            id: "infrastructure-pipelines/overview/actions",
          },
          {
            label: "Usage Data",
            type: "doc",
            id: "infrastructure-pipelines/data-collection/index",
          },
          {
            label: "Deprecation",
            type: "doc",
            id: "infrastructure-pipelines/overview/deprecation",
          },
        ],
      },
      {
        label: "Getting Started",
        type: "category",
        collapsed: false,
        items: [
          {
            label: "Hello World",
            type: "doc",
            id: "infrastructure-pipelines/hello-world/index",
          },
          {
            label: "Allowing Pipelines Actions",
            type: "doc",
            id: "infrastructure-pipelines/hello-world/github-enterprise",
          },
        ],
      },
      {
        label: "Security",
        type: "category",
        collapsible: false,
        items: [
          {
            label: "Controls",
            type: "doc",
            id: "infrastructure-pipelines/security/controls",
          },
          {
            label: "Audit Logs",
            type: "doc",
            id: "infrastructure-pipelines/security/audit-log",
          },
          {
            label: "Repository Access",
            type: "doc",
            id: "infrastructure-pipelines/security/repository-access",
          },
          {
            label: "Branch Protection",
            type: "doc",
            id: "infrastructure-pipelines/security/branch-protection",
          },
          {
            label: "Machine Users",
            type: "doc",
            id: "infrastructure-pipelines/security/machine-users",
          },
          {
            label: "Multiple Infrastructure-Live Repos",
            type: "doc",
            id: "infrastructure-pipelines/security/multi-account",
          },
        ],
      },
      // TODO write these docs once we identify common cases
      // {
      //   label: "Maintain Pipelines",
      //   type: "category",
      //   collapsed: false,
      //   items: ["infrastructure-pipelines/maintain/updating", "infrastructure-pipelines/maintain/extending"],
      // },
      {
        label: "Community",
        type: "category",
        collapsible: false,
        items: [
          {
            type: "link",
            label: "Knowledge Base",
            href: kbLink,
          },
        ],
      },
    ],
  },
]

module.exports = sidebar
