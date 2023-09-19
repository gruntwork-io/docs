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
            label: "Architecture",
            type: "doc",
            id: "pipelines/architecture/index",
          },
          {
            label: "Access Control",
            type: "doc",
            id: "pipelines/access-control/index",
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
        collapsible: false,
        items: [
          {
            label: "Single Account Tutorial",
            type: "doc",
            id: "pipelines/tutorial/index",
          },
        ],
      },
      {
        label: "Maintain Pipelines",
        type: "category",
        collapsible: false,
        items: ["pipelines/maintain/updating", "pipelines/maintain/extending"],
      },
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
