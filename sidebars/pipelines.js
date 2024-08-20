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
            label: "Configurations",
            type: "doc",
            id: "pipelines/overview/configurations",
          },
          {
            label: "Configurations as Code (Beta)",
            type: "doc",
            id: "pipelines/overview/configurations-as-code",
          },
          {
            label: "Usage Data",
            type: "doc",
            id: "pipelines/data-collection/index",
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
            label: "Machine Users",
            type: "doc",
            id: "pipelines/security/machine-users",
          },
          {
            label: "Secrets",
            type: "doc",
            id: "pipelines/security/secrets",
          }
        ],
      },
      {
        label: "Maintain Pipelines",
        type: "category",
        collapsed: false,
        items: [
          "pipelines/maintain/updating",
          "pipelines/maintain/extending",
          "pipelines/maintain/drift-detection",
        ],
      },
      {
        label: "Previous Versions",
        type: "category",
        collapsible: false,
        items: [
          {
            label: "Infrastructure Pipelines",
            type: "link",
            // Use a fully qualified URL to trigger the "external link" SVG here
            href: "https://docs.gruntwork.io/infrastructure-pipelines/overview",
          },
          {
            label: "Upgrading from Infrastructure-Pipelines",
            type: "doc",
            id: "pipelines/upgrading/upgrading-from-infrastructure-pipelines",
          },
          {
            label: "ECS Deploy Runner",
            type: "link",
            // Use a fully qualified URL to trigger the "external link" SVG here
            href: "https://docs.gruntwork.io/ecs-deploy-runner/overview",
          },
          {
            label: "Upgrading from ECS Deploy Runner",
            type: "doc",
            id: "pipelines/upgrading/upgrading-from-ecs-deploy-runner",
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
            href: kbLink,
          },
        ],
      },
    ],
  },
]

module.exports = sidebar
