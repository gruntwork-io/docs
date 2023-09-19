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
        label: "DevOps Components",
        type: "category",
        collapsed: false,
        items: [
          {
            label: "Overview",
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
        label: "IaC Foundations",
        type: "category",
        collapsed: false,
        items: [
          {
            label: "Overview",
            type: "doc",
            id: "foundations/iac/index",
          },
          "foundations/iac/folder_structure",
          {
            label: "Module Defaults",
            type: "category",
            collapsible: true,
            items: [
              {
                label: "What are Module Defaults?",
                type: "doc",
                id: "foundations/iac/module_defaults/index",
              },
              {
                label: "Defining Module Defaults",
                type: "doc",
                id: "foundations/iac/module_defaults/defining",
              },
              {
                label: "Using Module Defaults",
                type: "doc",
                id: "foundations/iac/module_defaults/usage",
              },
            ],
          },
        ],
      },
      {
        label: "CI/CD Foundations",
        type: "category",
        collapsed: false,
        items: [
          {
            label: "Overview",
            type: "doc",
            id: "foundations/ci-cd/index",
          },
        ]
      },
      {
        label: "Network Topology",
        type: "category",
        collapsed: false,
        items: [
          {
            label: "Overview",
            type: "doc",
            id: "foundations/network-topology/index",
          },
        ]
      },
      // TODO: Disabling for now until it's an offering
      // {
      //   label: "Maintenance Foundations",
      //   type: "category",
      //   collapsed: false,
      //   items: ["foundations/maintenance/index"],
      // },
      // {
      //   type: "link",
      //   label: "Knowledge Base",
      //   href: kbLink,
      // },
    ],
  },
]

module.exports = sidebar
