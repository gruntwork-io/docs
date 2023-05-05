const sidebar = [
  {
    label: "Reference Architecture",
    type: "category",
    collapsible: false,
    items: [
      {
        label: "What is all this?",
        type: "category",
        link: {
          type: "doc",
          id: "refarch/whats-this/index",
        },
        items: [],
      },
      {
        label: "Bootstrapping your Reference Architecture",
        type: "category",
        link: {
          type: "doc",
          id: "refarch/bootstrapping-your-reference-architecture/index",
        },
        items: [],
      },
      {
        label: "Usage",
        type: "category",
        link: {
          type: "doc",
          id: "refarch/usage/index",
        },
        items: [],
      },
    ],
  },
]

module.exports = sidebar
