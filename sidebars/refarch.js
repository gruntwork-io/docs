const sidebar = [
  {
    label: "Reference Architecture",
    type: "category",
    collapsible: false,
    items: [
      {
        label: "Overview",
        type: "category",
        collapsible: false,
        items: [
          "refarch/whats-this/index",
          "refarch/whats-this/what-is-a-reference-architecture",
          "refarch/whats-this/how-does-the-gruntwork-reference-architecture-differ",
        ]
      },
      {
        label: "Bootstrapping Your Reference Architecture",
        type: "category",
        collapsible: false,
        items: [
          "refarch/bootstrapping/index",
          "refarch/bootstrapping/configuring-your-refarch-for-delivery/index",
          "refarch/bootstrapping/configuring-your-refarch-for-delivery/path1",
          "refarch/bootstrapping/configuring-your-refarch-for-delivery/path2",
        ],
      },
      {
        label: "Usage",
        type: "category",
        collapsible: false,
        items: [
          "refarch/usage/maintain-your-refarch/index",
          "refarch/usage/getting-help/index",
          "refarch/usage/pipelines-integration/index",
        ],
      },
      {
        label: "Support",
        type: "category",
        collapsible: false,
        items: [
        ]
      },
    ],
  },
]

module.exports = sidebar
