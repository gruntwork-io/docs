const sidebar = [
  {
    label: "Gruntwork Patcher",
    type: "category",
    collapsible: false,
    items: [
      {
        label: "Overview",
        type: "category",
        collapsible: false,
        items: [
          {
            label: "What is Gruntwork Patcher?",
            type: "doc",
            id: "patcher/index"
          },
          {
            label: "Update Strategies",
            type: "doc",
            id: "patcher/update-strategies"
          },
        ]
      },
      {
        label: "Getting Started",
        type: "category",
        collapsible: false,
        items: [
          {
            label: "Installing Patcher",
            type: "doc",
            id: "patcher/getting-started/index"
          },
          {
            label: "Promotion Workflows",
            type: "doc",
            id: "patcher/getting-started/promotion-workflows"
          },
          {
            label: "Telemetry",
            type: "doc",
            id: "patcher/getting-started/telemetry"
          }
        ]
      },
      {
        label: "Running Patcher",
        type: "category",
        collapsible: false,
        items: [
          "patcher/running-patcher/report",
          "patcher/running-patcher/update",
          "patcher/running-patcher/upgrade"
        ]
      }
    ]
  }
]

module.exports = sidebar
