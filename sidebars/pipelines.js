const sidebar = [
    {
        label: "Gruntwork Pipelines",
        type: "category",
        collapsible: false,
        items: [
            {
                label: "What is Gruntwork Pipelines?",
                type: "doc",
                id: "pipelines/what-is-it/index"
            },
            {
              label: "Getting Started",
              type: "category",
              collapsible: false,
              items: [
                {
                  label: "How it works",
                  type: "doc",
                  id: "pipelines/how-it-works/index",
                },
                {
                  label: "Tutorial",
                  type: "doc",
                  id: "pipelines/tutorial/index",
                },
                {
                  label: "Deploying Multi-Account Pipelines",
                  type: "doc",
                  id: "pipelines/multi-account/index",
                },
              ]
            },
            {
              label: "Maintain Pipelines",
              type: "category",
              collapsible: false,
              items: ["pipelines/maintain/updating", "pipelines/maintain/extending"],
            },
        ]
    }
]

module.exports = sidebar
