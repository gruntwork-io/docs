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
            label: "How it works",
            type: "doc",
            id: "pipelines/how-it-works/index",
          },
        ],
      },
      {
        label: "Getting Started",
        type: "category",
        collapsed: false,
        items: [
          {
            label: "Single Account Tutorial",
            type: "doc",
            id: "pipelines/tutorial/index",
          },
          // {
          //   label: "Deploying Multi-Account Pipelines",
          //   type: "doc",
          //   id: "pipelines/multi-account/index",
          // },
        ],
      },
      {
        label: "Maintain Pipelines",
        type: "category",
        collapsed: false,
        items: ["pipelines/maintain/updating", "pipelines/maintain/extending"],
      },
      {
        label: "Previous Versions",
        type: "category",
        collapsible: false,
        items: [
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
