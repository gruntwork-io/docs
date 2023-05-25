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
          "refarch/whats-this/what-is-a-reference-architecture",
          "refarch/whats-this/how-does-the-gruntwork-reference-architecture-differ",
          "refarch/whats-this/understanding-the-deployment-process",
        ],
      },
      {
        label: "Configuration",
        type: "category",
        collapsible: false,
        items: [
          "refarch/bootstrapping/configuring-your-refarch-for-delivery/index",
          "refarch/bootstrapping/configuring-your-refarch-for-delivery/path1",
          "refarch/bootstrapping/configuring-your-refarch-for-delivery/preflight-checks",
          "refarch/bootstrapping/configuring-your-refarch-for-delivery/provision-accounts",
          "refarch/bootstrapping/configuring-your-refarch-for-delivery/setup-quotas",
          "refarch/bootstrapping/configuring-your-refarch-for-delivery/route53",
        ],
      },
      {
        label: "Access",
        type: "category",
        collapsible: false,
        items: [
          "refarch/access/setup-auth/index",
          "refarch/access/how-to-auth-vpn/index",
          "refarch/access/how-to-auth-aws/index",
        ],
      },
      {
        label: "Usage",
        type: "category",
        collapsible: false,
        items: [
          "refarch/usage/maintain-your-refarch/deploying-your-apps",
          "refarch/usage/maintain-your-refarch/monitoring",
          "refarch/usage/maintain-your-refarch/adding-new-account",
          "refarch/usage/maintain-your-refarch/staying-up-to-date",
          "refarch/usage/maintain-your-refarch/extending",
          "refarch/usage/pipelines-integration/index",
          "refarch/usage/maintain-your-refarch/undeploying",
        ],
      },
    ],
  },
]

module.exports = sidebar
