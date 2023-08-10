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
        label: "Overview",
        type: "category",
        collapsed: false,
        items: [
          {
            label: "Elements of DevOps Foundations",
            type: "doc",
            id: "foundations/overview/index",
          },
        ],
      },
      {
        label: "AWS Account Foundations",
        type: "category",
        collapsed: false,
        items: [
          "foundations/accounts/index",
          "foundations/accounts/add-account",
        ],
      },
      {
        label: "Terraform Foundations",
        type: "category",
        collapsed: false,
        items: ["foundations/terraform/index"],
      },
      {
        label: "CI/CD Foundations",
        type: "category",
        collapsed: false,
        items: ["foundations/ci-cd/index"],
      },
      {
        label: "Maintenance Foundations",
        type: "category",
        collapsed: false,
        items: ["foundations/maintenance/index"],
      },
      // {
      //   type: "link",
      //   label: "Knowledge Base",
      //   href: kbLink,
      // },
    ],
  },
]

module.exports = sidebar
