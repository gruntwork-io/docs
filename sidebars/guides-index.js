const sidebar = [
  {
    label: "Foundations",
    type: "doc",
    id: "guides/index",
  },
  {
    label: "Reference Architecture",
    type: "doc",
    id: "guides/reference-architecture/index",
  },
  {
    label: "Build Your Own Architecture",
    type: "doc",
    id: "guides/build-it-yourself/index",
  },
  {
    label: "Update Guides",
    type: "doc",
    id: "guides/stay-up-to-date/index",
  },
  {
    label: "Style Guides",
    type: "doc",
    id: "guides/style/index",
  },
  {
    label: "Working with our code",
    type: "category",
    items: [
      "guides/working-with-code/using-modules",
      "guides/working-with-code/tfc-integration",
      "guides/working-with-code/versioning",
      "guides/working-with-code/contributing",
      "guides/working-with-code/forking",
    ],
  },
  {
    label: "Tools",
    type: "category",
    items: [
      {
        label: "Gruntwork Installer",
        type: "link",
        href: "https://github.com/gruntwork-io/gruntwork-installer",
      },
      {
        label: "Terragrunt",
        type: "link",
        href: "https://terragrunt.gruntwork.io",
      },
      {
        label: "Terratest",
        type: "link",
        href: "https://terratest.gruntwork.io",
      },
      {
        label: "Repo Copier",
        type: "link",
        href: "https://github.com/gruntwork-io/repo-copier",
      },
    ],
  },
]

module.exports = sidebar
