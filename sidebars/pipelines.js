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
        items: [
          {
            label: "Updating your pipeline",
            type: "doc",
            id: "pipelines/maintain/updating"
          },
          {
            label: "Extending your pipeline",
            type: "doc",
            id: "pipelines/maintain/extending"
          },
          {
            label: "Adding AWS accounts",
            type: "doc",
            id: "pipelines/maintain/adding-aws-accounts"
          }
        ]
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
