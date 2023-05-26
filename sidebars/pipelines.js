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
            label: "How it works",
            type: "doc",
            id: "pipelines/how-it-works/index",
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
        collapsible: false,
        items: ["pipelines/maintain/updating", "pipelines/maintain/extending"],
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
