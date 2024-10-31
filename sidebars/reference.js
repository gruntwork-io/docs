
const libraryReference = require('./library-reference');

const sidebar = [
  {
    // label: "Developer Reference",
    // type: "category",
    // link: { type: 'generated-index', title: "Gruntwork Developer Reference", slug: "2.0/reference" },
    // collapsible: false,
    label: "Developer Reference",
    type: "category",
    link: {
      type: "generated-index",
      title: "Gruntwork How-To Guides",
      slug: "2.0/reference",
    },
    collapsible: false,
    items: [
      {
        label: "Gruntwork Library",
        type: "category",
        collapsed: true,
        link: {
          type: "generated-index",
          title: "Library reference",
          slug: "2.0/reference/library/index",
        },
        items: libraryReference,
      },
      {
        label: "Gruntwork Pipelines",
        type: "category",
        collapsed: true,
        link: {
          type: "generated-index",
          title: "Pipelines reference",
          slug: "2.0/reference/pipelines",
        },
        items: [
          {
            label: "Overview",
            type: "doc",
            id: "2.0/reference/pipelines/index",
          },
          {
            label: "Configurations",
            type: "doc",
            id: "2.0/reference/pipelines/configurations",
          },
          {
            label: "Configurations as Code (Beta)",
            type: "doc",
            id: "2.0/reference/pipelines/configurations-as-code",
          },
        ],
      },
      {
        label: "Gruntwork Patcher",
        type: "category",
        collapsed: true,
        items: [
          {
            label: "Overview",
            type: "doc",
            id: "2.0/reference/patcher/index",
          },
        ],
      },
      {
        label: "Account Factory",
        type: "category",
        collapsed: true,
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
