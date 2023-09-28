const kbLink =
  "https://github.com/orgs/gruntwork-io/discussions?discussions_q=" +
  // filter by discussions with the label s:CI/Pipelines & sort by top voted discussions first
  encodeURIComponent("label:s:CI/Pipelines sort:top")

const sidebar = [
  {
    label: "Gruntwork Pipelines",
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
            id: "pipelines/overview/index",
          },
          {
            label: "Architecture",
            type: "doc",
            id: "pipelines/architecture/index",
          },
          {
            label: "Actions",
            type: "doc",
            id: "pipelines/overview/actions",
          },
          {
            label: "Usage Data",
            type: "doc",
            id: "pipelines/data-collection/index",
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
            id: "pipelines/hello-world/index",
          },
          {
            label: "Allowing Pipelines Actions",
            type: "doc",
            id: "pipelines/hello-world/github-enterprise",
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
            id: "pipelines/security/controls",
          },
          {
            label: "Audit Logs",
            type: "doc",
            id: "pipelines/security/audit-log",
          },
          {
            label: "Repository Access",
            type: "doc",
            id: "pipelines/security/repository-access",
          },
          {
            label: "Branch Protection",
            type: "doc",
            id: "pipelines/security/branch-protection",
          },
          {
            label: "Multiple Infrastructure-Live Repos",
            type: "doc",
            id: "pipelines/security/multi-account",
          },
        ]
      },
      // TODO write these docs once we identify common cases
      // {
      //   label: "Maintain Pipelines",
      //   type: "category",
      //   collapsed: false,
      //   items: ["pipelines/maintain/updating", "pipelines/maintain/extending"],
      // },
      {
        label: "Previous Versions",
        type: "category",
        collapsible: false,
        items: [
          {
            label: "Upgrading from ECS Deploy Runner",
            type: "doc",
            id: "pipelines/upgrading/index"
          },
          {
            label: "ECS Deploy Runner",
            type: "link",
            // Use a fully qualified URL to trigger the "external link" SVG here
            href: "https://docs.gruntwork.io/ecs-deploy-runner/overview",
          },
        ],
      },
      {
        label: "Community",
        type: "category",
        collapsible: false,
        items: [
          {
            type: "link",
            label: "Knowledge Base",
            href: kbLink
          },
        ]
      }
    ],
  },
]

module.exports = sidebar
