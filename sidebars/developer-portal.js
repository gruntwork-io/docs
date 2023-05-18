const developerPortalKnowledgeBaseDiscussions =
  "https://github.com/orgs/gruntwork-io/discussions?" +
  encodeURIComponent("discussions_q=label:s:dev-portal")

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
        href: developerPortalKnowledgeBaseDiscussions,
      },
    ],
  },
]

module.exports = sidebar
