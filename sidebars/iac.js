const sidebar = [
  {
    label: "Infrastructure as Code",
    type: "category",
    collapsible: false,
    items: [
      {
        label: "Overview",
        type: "category",
        collapsible: false,
        items: [
          "iac/overview/index",
          "iac/overview/modules",
          "iac/overview/services",
        ],
      },
      {
        label: "Getting Started",
        type: "category",
        collapsible: false,
        items: [
          "iac/getting-started/setting-up",
          "iac/getting-started/accessing-the-code",
          "iac/getting-started/deploying-a-module",
        ],
      },
      {
        label: "Working with the Library",
        type: "category",
        collapsible: false,
        items: [
          // "iac/usage/using-a-module",
          // "iac/usage/using-a-service",
          // "iac/usage/customizing-modules",
          "iac/usage/composing-your-own-service",
          "iac/usage/customizing-modules",
          "guides/working-with-code/using-modules",
          "iac/usage/customizing-modules",
          "guides/working-with-code/tfc-integration",
          "iac/usage/contributing",
        ],
      },
      {
        label: "Staying up to date",
        type: "category",
        collapsible: false,
        items: [
          "iac/stay-up-to-date/versioning",
          "iac/stay-up-to-date/updating",
        ],
      },
    ],
  },
]

module.exports = sidebar
