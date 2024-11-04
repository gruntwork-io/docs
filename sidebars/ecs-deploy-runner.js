const kbLink =
  "https://github.com/orgs/gruntwork-io/discussions?discussions_q=" +
  // filter by discussions with the label s:CI/Pipelines & sort by top voted discussions first
  encodeURIComponent("label:s:CI/Pipelines sort:top")

const sidebar = [
  {
    label: "ECS Deploy Runner",
    type: "category",
    collapsible: false,
    items: [
      {
        label: "Overview",
        type: "category",
        collapsible: false,
        items: [
          {
            label: "What is ECS Deploy Runner?",
            type: "doc",
            id: "ecs-deploy-runner/overview/index",
          },
          {
            label: "How it works",
            type: "doc",
            id: "ecs-deploy-runner/how-it-works/index",
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
            id: "ecs-deploy-runner/tutorial/index",
          },
        ],
      },
      {
        label: "Maintain ECS Deploy Runner",
        type: "category",
        collapsible: false,
        items: ["ecs-deploy-runner/maintain/updating", "ecs-deploy-runner/maintain/extending"],
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
