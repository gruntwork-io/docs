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
        collapsible: false,
        items: [
          {
            label: "What is Gruntwork Pipelines?",
            type: "doc",
            id: "pipelines/overview/index",
          },
          {
            label: "Core concepts",
            type: "doc",
            id: "pipelines/core-concepts/index",
          },
          {
            label: "How it works",
            type: "doc",
            id: "pipelines/how-it-works/index",
          },
          {
            label: "Supported CI systems",
            type: "doc",
            id: "pipelines/supported-ci-systems/index",
          },
          {
            label: "Supported clouds",
            type: "doc",
            id: "pipelines/supported-clouds/index",
          },
          {
            label: "Architecture",
            type: "doc",
            id: "pipelines/architecture/index",
          },
        ],
      },
      {
        label: "Getting Started",
        type: "category",
        collapsible: false,
        items: [
          {
            label: "Initial setup",
            type: "doc",
            id: "pipelines/initial-setup/index",
          },
          // {
          //   label: "Deploying Multi-Account Pipelines",
          //   type: "doc",
          //   id: "pipelines/multi-account/index",
          // },
        ],
      },
      {
        label: "Configuring Pipelines",
        type: "category",
        collapsible: false,
        items: [
          {
            label: "Access Control",
            type: "doc",
            id: "pipelines/access-control/index",
          },
          {
            label: "Pipelines Actions",
            type: "doc",
            id: "pipelines/pipelines-actions/index",
          },
        ],
      },
      {
        label: "Data & privacy",
        type: "category",
        collapsible: false,
        items: [
          {
            label: "Usage Data",
            type: "doc",
            id: "pipelines/usage-data/index",
          },
        ],
      },
      {
        label: "Previous Versions",
        type: "category",
        collapsible: false,
        items: [
          {
            label: "ECS Deploy Runner",
            type: "link",
            href: "/ecs-deploy-runner/overview"
          },
        ],
      },
      {
        type: "link",
        label: "Knowledge Base",
        href: kbLink,
      },
    ],
  },
]

module.exports = sidebar
