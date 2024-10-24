const sidebar = [
  {
    // label: "Developer Reference",
    // type: "category",
    // link: { type: 'generated-index', title: "Gruntwork Developer Reference", slug: "2.0/reference" },
    // collapsible: false,
    label: "Developer Reference",
    type: "category",
    link: { type: 'generated-index', title: "Gruntwork How-To Guides", slug: "2.0/reference" },
    collapsible: false,
    items: [
      {
        label: "Gruntwork Library",
        type: "category",
        collapsed: true,
        link: { type: 'generated-index', title: "Library reference", slug: "2.0/reference/library/index" },
        items: [
          {
            label: "Stuff",
            type: "doc",
            id: "2.0/reference/library/index",
          },
        ],
      },
      {
        label: "Gruntwork Pipelines",
        type: "category",
        collapsed: true,
        link: { type: 'generated-index', title: "Pipelines reference", slug: "2.0/reference/pipelines" },
        items: [
          {
            label: "Stuff",
            type: "doc",
            id: "2.0/reference/pipelines/index",
          },
        ],
      },
      {
        label: "Gruntwork Patcher",
        type: "category",
        collapsed: true,
        link: { type: 'generated-index', title: "Patcher reference", slug: "2.0/reference/patcher" },
        items: [
          {
            label: "Stuff",
            type: "doc",
            id: "2.0/reference/patcher/index",
          },
        ],
      },
      {
        label: "Account Factory",
        type: "category",
        collapsed: true,
        link: { type: 'generated-index', title: "Patcher reference", slug: "2.0/reference/accountfactory" },
        items: [
          {
            label: "Stuff",
            type: "doc",
            id: "2.0/reference/accountfactory/index",
          },
        ],
      },
    ],
  },
]

module.exports = sidebar
