// const kbLink =
//   "https://github.com/orgs/gruntwork-io/discussions?discussions_q=" +
//   // filter by discussions with the label s:CI/Pipelines & sort by top voted discussions first
//   encodeURIComponent("label:s:CI/Pipelines sort:top")

const sidebar = [
  {
    label: "DevOps Foundations",
    type: "category",
    collapsible: false,
    items: [
      {
        label: "Overview",
        type: "category",
        collapsed: false,
        items: [
          {
            label: "Elements of DevOps Foundations",
            type: "doc",
            id: "foundations/overview/index",
          },
        ],
      },
      {
        label: "AWS Account Foundations",
        type: "category",
        collapsed: false,
        items: [
          "foundations/accounts/prerequisites",
          "foundations/accounts/enable-control-tower",
          "foundations/accounts/add-account",
          "foundations/accounts/manage-accounts",
        ],
      },
      {
        label: "Terraform Foundations",
        type: "category",
        collapsed: false,
        items: [
          "foundations/terraform/index",
          "foundations/terraform/folder_structure",
          {
            label: "Module Defaults",
            type: "category",
            collapsible: true,
            items: [
              {
                label: "What are Module Defaults?",
                type: "doc",
                id: "foundations/terraform/module_defaults/index",
              },
              {
                label: "Defining Module Defaults",
                type: "doc",
                id: "foundations/terraform/module_defaults/defining",
              },
              {
                label: "Using Module Defaults",
                type: "doc",
                id: "foundations/terraform/module_defaults/usage",
              },
            ],
          },
        ],
      },
      {
        label: "CI/CD Foundations",
        type: "category",
        collapsed: false,
        items: ["foundations/ci-cd/index"],
      },
      {
        label: "Maintenance Foundations",
        type: "category",
        collapsed: false,
        items: ["foundations/maintenance/index"],
      },
      // {
      //   type: "link",
      //   label: "Knowledge Base",
      //   href: kbLink,
      // },
    ],
  },
]

module.exports = sidebar
