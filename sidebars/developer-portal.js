const developerPortalKnowledgeBaseDiscussions =
  "https://github.com/orgs/gruntwork-io/discussions?discussions_q=" +
  // filter by discussions with the label "s:dev-portal" & sort by top voted discussions first
  encodeURIComponent("label:s:dev-portal sort:top")

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
