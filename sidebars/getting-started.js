

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
        label: "Welcome to Gruntwork",
        type: "doc",
        id: "2.0/getting-started/welcome",
      },
      {
        label: "The Gruntwork Methodology",
        type: "category",
        collapsed: true,
        items: [
          {
            label: "Concepts",
            type: "doc",
            id: "2.0/getting-started/gruntworkmethodology/concepts",
          },
          {
            label: "Tools",
            type: "doc",
            id: "2.0/getting-started/gruntworkmethodology/tools",
          },
        ],
      },
      {
        label: "Gruntwork Library",
        type: "category",
        collapsed: true,
        items: [
          {
            label: "Concepts",
            type: "doc",
            id: "2.0/getting-started/library/concepts",
          },
          {
            label: "Architecture",
            type: "doc",
            id: "2.0/getting-started/library/architecture",
          },
        ],
      },
      {
        label: "Gruntwork Pipelines",
        type: "category",
        collapsed: true,
        items: [
          {
            label: "Concepts",
            type: "category",
            collapsed: false,
            items: [
              {
                label: 'CI/CD for Infrastructure',
                type: 'doc',
                id: '2.0/getting-started/pipelines/concepts/cicd-for-infrastructure',
              },
              {
                label: 'Security',
                type: 'doc',
                id: '2.0/getting-started/pipelines/concepts/security',
              },
              {
                label: 'Drift Detection',
                type: 'doc',
                id: '2.0/getting-started/pipelines/concepts/driftdetection',
              }
            ]
          },
          {
            label: "Architecture",
            type: "doc",
            id: "2.0/getting-started/pipelines/architecture",
          },
        ],
      },
      {
        label: "Gruntwork Patcher",
        type: "category",
        collapsed: true,
        items: [
          {
            label: "Concepts",
            type: "doc",
            id: "2.0/getting-started/patcher/concepts",
          },
          {
            label: "Architecture",
            type: "doc",
            id: "2.0/getting-started/patcher/architecture",
          },
        ],
      },
      {
        label: "Account Factory",
        type: "category",
        collapsed: true,
        items: [
          {
            label: "Concepts",
            type: "doc",
            id: "2.0/getting-started/accountfactory/concepts",
          },
          {
            label: "Architecture",
            type: "doc",
            id: "2.0/getting-started/accountfactory/architecture",
          },
        ],
      },
    ],
  },
]

module.exports = sidebar
