const kbLink =
  "https://github.com/orgs/gruntwork-io/discussions?discussions_q=" +
  // filter by discussions with the label s:CI/Pipelines & sort by top voted discussions first
  encodeURIComponent("label:s:CI/Pipelines sort:top")

const sidebar = [
  {
    label: "How To Guides",
    type: "category",
    collapsible: false,
    items: [
      {
        type: "doc",
        label: "Gruntwork Guides",
        id: "2.0/guides/index",
      },
      {
        label: "Gruntwork Library",
        type: "category",
        collapsed: true,
        items: [
          {
            label: "Create your own Service Module",
            type: "doc",
            id: "2.0/guides/library/create-service-module",
          },
          {
            label: "Customize a Module",
            type: "doc",
            id: "2.0/guides/library/customize-module",
          },
          {
            label: "Integrate with Terraform Cloud",
            type: "doc",
            id: "2.0/guides/library/integrate-tfc",
          },
          {
            label: "Contributing to the Library",
            type: "doc",
            id: "2.0/guides/library/contributing",
          },
          {
            label: "Self-Hosting the Library",
            type: "doc",
            id: "2.0/guides/library/self-hosting",
          },
          {
            label: "Updating a module to a newer version",
            type: "doc",
            id: "2.0/guides/library/updating-modules",
          },
        ],
      },
      {
        label: "Gruntwork Pipelines",
        type: "category",
        collapsed: true,
        link: { type: 'doc', id: '2.0/guides/pipelines/index' },
        items: [
          {
            label: "Managing Secrets in your Pipelines",
            type: "doc",
            id: "2.0/guides/pipelines/managing-secrets",
          },
          {
            label: "Updating Pipelines",
            type: "doc",
            id: "2.0/guides/pipelines/updating-pipelines",
          },
        ],
      },
      {
        label: "Gruntwork Patcher",
        type: "category",
        collapsed: true,
        items: [
          {
            label: "Setting up Promotion Workflows",
            type: "doc",
            id: "2.0/guides/patcher/promotion-workflows",
          },
        ],
      },
    ],
  },
]

module.exports = sidebar
