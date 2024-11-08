const libraryReference = require("./library-reference")

const sidebar = [
  {
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
          type: "doc",
          id: "library/reference/index",
        },
        items: libraryReference,
      },
      {
        label: "Gruntwork Pipelines",
        type: "category",
        collapsed: true,
        items: [
          {
            label: "Overview",
            type: "doc",
            id: "2.0/reference/pipelines/index",
          },
          {
            label: "Configurations (YAML)",
            type: "doc",
            id: "2.0/reference/pipelines/configurations",
          },
          {
            label: "Configurations as Code (HCL - Beta)",
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
        link: {
          type: "generated-index",
          title: "Account Factory reference",
          slug: "2.0/reference/accountfactory",
        },
        items: [
          {
            label: "Overview",
            type: "doc",
            id: "2.0/reference/accountfactory/index",
          },
          {
            label: "Configurations",
            type: "doc",
            id: "2.0/reference/accountfactory/configurations",
          },
        ],
      },
    ],
  },
]

module.exports = sidebar
