const kbLink =
  "https://github.com/orgs/gruntwork-io/discussions?discussions_q=" +
  // filter by discussions with the label s:CI/Pipelines & sort by top voted discussions first
  encodeURIComponent("label:s:CI/Pipelines sort:top")

const sidebar = [
  {
    label: "Guides",
    type: "category",
    collapsible: false,
    items: [
      {
        label: "Gruntwork Pipelines",
        type: "category",
        collapsed: false,
        items: [
          {
            label: "How To ....",
            type: "doc",
            id: "2.0/guides/index",
          },
        ],
      },
      {
        label: "Gruntwork Patcher",
        type: "category",
        collapsed: false,
        items: [
          {
            label: "How To ....",
            type: "doc",
            id: "2.0/guides/index",
          },
        ],
      },
    ],
  },
]

module.exports = sidebar
