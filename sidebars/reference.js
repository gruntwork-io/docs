const libraryReference = require("./library-reference")

const sidebar = [
  {
    type: "html",
    value: "Developer Reference",
    className: "sidebar-header",
  },
  {
    type: "doc",
    id: "2.0/reference/index",
    label: "Introduction",
  },
  {
    type: "html",
    value: "Gruntwork Library",
    className: "sidebar-header",
  },
  ...libraryReference,
  {
    type: "html",
    value: "Gruntwork Pipelines",
    className: "sidebar-header",
  },
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
    type: "category",
    items: [
      {
        type: "doc",
        label: "Concepts",
        id: "2.0/reference/pipelines/configurations-as-code/index",
      },
      {
        type: "doc",
        label: "Reference",
        id: "2.0/reference/pipelines/configurations-as-code/api",
      },
    ],
  },
  {
    value: "Gruntwork Patcher",
    type: "html",
    className: "sidebar-header",
  },
  {
    label: "Patcher CLI",
    type: "doc",
    id: "2.0/reference/patcher/index",
  },
  {
    type: "html",
    value: "Account Factory",
    className: "sidebar-header",
  },
  {
    label: "Configurations",
    type: "doc",
    id: "2.0/reference/accountfactory/configurations",
  },
]

module.exports = sidebar
