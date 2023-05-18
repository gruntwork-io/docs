const sidebar = [
  {
    label: "Developer Portal",
    type: "category",
    collapsible: false,
    items: [
      "developer-portal/create-account",
      "developer-portal/invite-team",
      "developer-portal/link-github-id",
      {
        type: "link",
        label: "FAQ",
        href: "https://github.com/orgs/gruntwork-io/discussions?discussions_q=label%3As%3Adev-portal",
      },
    ],
  },
]

module.exports = sidebar
