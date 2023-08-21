const sidebar = [
  {
    "label": "Gruntwork Patcher",
    "type": "category",
    "link": {
      "type": "doc",
      "id": "patcher/index"
    },
    "items": [
      {
        "Getting Started": [
          {
            "label": "Getting Started",
            "type": "category",
            "link": {
              "type": "doc",
              "id": "patcher/getting-started/index"
            },
            "items": [
              "patcher/getting-started/telemetry",
              "patcher/getting-started/update-strategies"
            ]
          }
        ]
      },
      {
        "Running Patcher": [
          "patcher/running-patcher/report",
          "patcher/running-patcher/update",
          "patcher/running-patcher/upgrade"
        ]
      }
    ]
  }
]

module.exports = sidebar
