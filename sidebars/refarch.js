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
          "refarch/whats-this/understanding-the-deployment-process"
        ]
      },
      {
        label: "Configuration",
        type: "category",
        collapsible: false,
        items: [
          "refarch/configuration/index",
          "refarch/configuration/run-the-bootstrap-script",
          "refarch/configuration/preflight-checks",
          "refarch/configuration/provision-accounts",
          "refarch/configuration/setup-quotas",
          "refarch/configuration/route53",
          "refarch/configuration/use-the-gruntwork-cli"
        ],
      },
      {
        label: "Access",
        type: "category",
        collapsible: false,
        items: [
          "refarch/access/setup-auth/index",
          "refarch/access/how-to-auth-vpn/index",
          "refarch/access/how-to-auth-ec2/index",
        ],
      },
      {
        label: "Usage",
        type: "category",
        collapsible: false,
        items: [
          "refarch/usage/maintain-your-refarch/index",
          "refarch/usage/maintain-your-refarch/add-new-account",
          "refarch/usage/maintain-your-refarch/undeploy",
          "refarch/usage/maintain-your-refarch/stay-up-to-date",
          "refarch/usage/maintain-your-refarch/upgrade-terraform",
          "refarch/usage/maintain-your-refarch/extending",
          "refarch/usage/pipelines-integration/index",
        ],
      },
    ],
  },
]

module.exports = sidebar
