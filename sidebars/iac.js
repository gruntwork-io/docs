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
          "iac/whats-this/index",
          "iac/whats-this/modules",
          "iac/whats-this/services",
        ]
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
        label: "Working with Modules",
        type: "category",
        collapsible: false,
        items: [
          "iac/usage/using-a-module",
          "iac/usage/using-a-service",
          "iac/usage/customizing-modules",
          "iac/usage/composing-your-own-service",
        ],
      },
      {
        label: "Staying up to date",
        type: "category",
        collapsible: false,
        items: [
          "iac/usage/versioning",
          "iac/usage/stay-up-to-date",
        ],
      },
      {
        label: "Support",
        type: "category",
        collapsible: false,
        items: [
          "iac/support/issues",
          "iac/support/contributing",
        ]
      },
    ],
  },
]

module.exports = sidebar
