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
          "foundations/overview/index",
        ],
      },
      {
        label: "Landing Zone",
        type: "category",
        collapsed: false,
        items: [
          {
            label: "Overview",
            type: "doc",
            id: "foundations/accounts/index",
          },
          "foundations/accounts/prerequisites",
          "foundations/accounts/enable-control-tower",
          "foundations/accounts/add-account",
          "foundations/accounts/manage-accounts",
        ],
      },
      {
        label: "Network Topology",
        type: "category",
        collapsed: false,
        items: [
          {
            label: "About Network Topology",
            type: "doc",
            id: "foundations/network-topology/index",
          },
        ],
      },
      {
        label: "IaC Foundations",
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
        label: "Pipelines",
        type: "category",
        collapsed: false,
        items: [
          {
            label: "About Pipelines",
            type: "doc",
            id: "foundations/ci-cd/index",
          },
          "foundations/ci-cd/pipelines-for-account-factory"
        ],
      },
      {
        label: "Running apps",
        type: "category",
        collapsed: false,
        items: [
          "foundations/running-apps/index",
        ],
      },
      {
        label: "Automatic Updates",
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
