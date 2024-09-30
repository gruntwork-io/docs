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
        label: "Grunty GitHub App",
        type: "category",
        collapsible: false,
        items: [
          {
            label: "Overview",
            type: "doc",
            id: "foundations/grunty/index",
          },
          "foundations/grunty/setup",
          "foundations/grunty/configuration",
        ]
      },
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
          "foundations/overview/setup-order"
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
            id: "foundations/landing-zone/index",
          },
          "foundations/landing-zone/prerequisites",
          "foundations/landing-zone/enable-control-tower",
          "foundations/landing-zone/add-aws-account",
          "foundations/landing-zone/manage-accounts",
          "foundations/landing-zone/logging",
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
            id: "foundations/iac-foundations/index",
          },
          "foundations/iac-foundations/initial-setup",
          "foundations/iac-foundations/architecture",
          "foundations/iac-foundations/folder-structure",
          "foundations/iac-foundations/labels-tags",
          {
            label: "Module Defaults",
            type: "category",
            collapsible: true,
            items: [
              {
                label: "What are Module Defaults?",
                type: "doc",
                id: "foundations/iac-foundations/module_defaults/index",
              },
              {
                label: "Defining Module Defaults",
                type: "doc",
                id: "foundations/iac-foundations/module_defaults/defining",
              },
              {
                label: "Using Module Defaults",
                type: "doc",
                id: "foundations/iac-foundations/module_defaults/usage",
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
            label: "Overview",
            type: "doc",
            id: "foundations/pipelines/index",
          },
          "foundations/pipelines/aws-authentication"
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
      {
        label: "Running Apps",
        type: "category",
        collapsed: false,
        items: [
          {
            label: "Overview",
            type: "doc",
            id: "foundations/running-apps/index",
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
