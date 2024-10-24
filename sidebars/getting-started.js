const kbLink =
  "https://github.com/orgs/gruntwork-io/discussions?discussions_q=" +
  // filter by discussions with the label s:CI/Pipelines & sort by top voted discussions first
  encodeURIComponent("label:s:CI/Pipelines sort:top")

const sidebar = [
  {
    label: "Getting Started",
    type: "category",
    collapsible: false,
    items: [
      {
        label: "The Gruntwork Methodology",
        type: "category",
        collapsed: false,
        items: [
          {
            label: "Concepts",
            type: "doc",
            id: "2.0/getting-started/index",
          },
        ],
      },
      {
        label: "Gruntwork Pipelines",
        type: "category",
        collapsed: false,
        items: [
          {
            label: "Concepts",
            type: "doc",
            id: "2.0/getting-started/index",
          },
          {
            label: "Architecture",
            type: "doc",
            id: "2.0/getting-started/index",
          },
        ],
      },
      {
        label: "Gruntwork Patcher",
        type: "category",
        collapsed: false,
        items: [
          {
            label: "Concepts",
            type: "doc",
            id: "2.0/getting-started/index",
          },
          {
            label: "Architecture",
            type: "doc",
            id: "2.0/getting-started/index",
          },
        ],
      },
      {
        label: "Account Factory",
        type: "category",
        collapsed: false,
        items: [
          {
            label: "Concepts",
            type: "doc",
            id: "2.0/getting-started/index",
          },
          {
            label: "Architecture",
            type: "doc",
            id: "2.0/getting-started/index",
          },
        ],
      },
    ],
  },
]

module.exports = sidebar
