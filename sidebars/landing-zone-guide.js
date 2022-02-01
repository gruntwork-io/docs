const sidebar = [
  {
    label: "Build Your Own Architecture",
    type: "link",
    href: "/guides/build-it-yourself",
    className: "back-button",
  },
  {
    label: "Landing Zone Guide",
    type: "category",
    link: {
      type: "doc",
      id: "guides/build-it-yourself/landing-zone/index",
    },
    items: [
      {
        "Core Concepts": [
          "guides/build-it-yourself/landing-zone/core-concepts/what-is-an-aws-account-structure",
          "guides/build-it-yourself/landing-zone/core-concepts/aws-account",
          "guides/build-it-yourself/landing-zone/core-concepts/root-user",
          "guides/build-it-yourself/landing-zone/core-concepts/iam-users",
          "guides/build-it-yourself/landing-zone/core-concepts/iam-policies",
          "guides/build-it-yourself/landing-zone/core-concepts/iam-groups",
          "guides/build-it-yourself/landing-zone/core-concepts/iam-roles",
          "guides/build-it-yourself/landing-zone/core-concepts/federated-authentication",
          "guides/build-it-yourself/landing-zone/core-concepts/aws-organizations",
          "guides/build-it-yourself/landing-zone/core-concepts/cloud-trail",
          "guides/build-it-yourself/landing-zone/core-concepts/aws-config",
          "guides/build-it-yourself/landing-zone/core-concepts/guard-duty",
        ],
      },
      {
        "Production Grade Design": [
          "guides/build-it-yourself/landing-zone/production-grade-design/intro",
          "guides/build-it-yourself/landing-zone/production-grade-design/the-root-account",
          "guides/build-it-yourself/landing-zone/production-grade-design/child-accounts",
          "guides/build-it-yourself/landing-zone/production-grade-design/iam-roles-for-users",
          "guides/build-it-yourself/landing-zone/production-grade-design/iam-users-and-groups",
          "guides/build-it-yourself/landing-zone/production-grade-design/mfa-policy",
          "guides/build-it-yourself/landing-zone/production-grade-design/password-policy",
          "guides/build-it-yourself/landing-zone/production-grade-design/iam-roles-for-services",
          "guides/build-it-yourself/landing-zone/production-grade-design/cloud-trail",
          "guides/build-it-yourself/landing-zone/production-grade-design/aws-config",
          "guides/build-it-yourself/landing-zone/production-grade-design/guard-duty",
          "guides/build-it-yourself/landing-zone/production-grade-design/federated-auth",
        ],
      },
      {
        "Deployment walkthrough": [
          "guides/build-it-yourself/landing-zone/deployment-walkthrough/pre-requisites",
          "guides/build-it-yourself/landing-zone/deployment-walkthrough/prepare-your-infrastructure-live-repository",
          "guides/build-it-yourself/landing-zone/deployment-walkthrough/create-the-root-account",
          "guides/build-it-yourself/landing-zone/deployment-walkthrough/lock-down-the-root-user",
          "guides/build-it-yourself/landing-zone/deployment-walkthrough/create-an-iam-user-in-the-root-account",
          "guides/build-it-yourself/landing-zone/deployment-walkthrough/lock-down-the-root-account-iam-users",
          "guides/build-it-yourself/landing-zone/deployment-walkthrough/configure-the-security-baseline-for-the-root-account",
          "guides/build-it-yourself/landing-zone/deployment-walkthrough/import-existing-resources-from-the-root-account-into-terraform-state",
          "guides/build-it-yourself/landing-zone/deployment-walkthrough/apply-the-security-baseline-to-the-root-account",
          "guides/build-it-yourself/landing-zone/deployment-walkthrough/reset-the-root-user-password-in-each-child-account",
          "guides/build-it-yourself/landing-zone/deployment-walkthrough/lock-down-the-root-user-in-the-child-accounts",
          "guides/build-it-yourself/landing-zone/deployment-walkthrough/apply-the-security-baseline-to-the-logs-account",
          "guides/build-it-yourself/landing-zone/deployment-walkthrough/apply-the-security-baseline-to-the-security-account",
          "guides/build-it-yourself/landing-zone/deployment-walkthrough/apply-the-security-baseline-to-the-other-child-accounts",
          "guides/build-it-yourself/landing-zone/deployment-walkthrough/try-authenticating-as-an-iam-user-to-the-child-accounts",
        ],
      },
      "guides/build-it-yourself/landing-zone/next-steps",
    ],
  },
]

module.exports = sidebar
