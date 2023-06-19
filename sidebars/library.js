const sidebar = [
  {
    label: "Library",
    type: "category",
    collapsible: false,
    items: [
      {
        label: "Overview",
        type: "category",
        collapsible: false,
        items: [
          "library/overview/index",
          "library/overview/modules",
          "library/overview/services",
        ],
      },
      {
        label: "Getting Started",
        type: "category",
        collapsible: false,
        items: [
          "library/getting-started/setting-up",
          "library/getting-started/accessing-the-code",
          "library/getting-started/deploying-a-module",
        ],
      },
      {
        label: "Working with Library",
        type: "category",
        collapsible: false,
        items: [
          "library/usage/using-the-library",
          "library/usage/composing-your-own-service",
          "library/usage/customizing-modules",
          "guides/working-with-code/tfc-integration",
          "library/usage/contributing",
          "library/usage/self-hosting",
        ],
      },
      {
        label: "Staying up to date",
        type: "category",
        collapsible: false,
        items: [
          "library/stay-up-to-date/versioning",
          "library/stay-up-to-date/updating",
        ],
      },
    ],
  },
]

module.exports = sidebar
