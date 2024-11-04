const sidebar = [
  {
    label: "CIS Benchmark Compliance Guide",
    type: "category",
    collapsed: true,
    link: {
      type: "doc",
      id: "guides/build-it-yourself/achieve-compliance/index",
    },
    items: [
      {
        "Core Concepts": [
          "guides/build-it-yourself/achieve-compliance/core-concepts/intro",
          "guides/build-it-yourself/achieve-compliance/core-concepts/recommendation-sections",
        ],
      },
      {
        "Production Grade Design": [
          "guides/build-it-yourself/achieve-compliance/production-grade-design/intro",
          "guides/build-it-yourself/achieve-compliance/production-grade-design/identity-and-access-management",
          "guides/build-it-yourself/achieve-compliance/production-grade-design/storage",
          "guides/build-it-yourself/achieve-compliance/production-grade-design/logging",
          "guides/build-it-yourself/achieve-compliance/production-grade-design/monitoring",
          "guides/build-it-yourself/achieve-compliance/production-grade-design/networking",
        ],
      },
      {
        "Deployment Walkthrough": [
          "guides/build-it-yourself/achieve-compliance/deployment-walkthrough/pre-requisites",
          "guides/build-it-yourself/achieve-compliance/deployment-walkthrough/the-gruntwork-solution",
          "guides/build-it-yourself/achieve-compliance/deployment-walkthrough/prepare-your-infrastructure-live-repository",
          "guides/build-it-yourself/achieve-compliance/deployment-walkthrough/create-the-root-account",
          "guides/build-it-yourself/achieve-compliance/deployment-walkthrough/lock-down-the-root-user",
          "guides/build-it-yourself/achieve-compliance/deployment-walkthrough/create-an-iam-user-in-the-root-account",
          "guides/build-it-yourself/achieve-compliance/deployment-walkthrough/lock-down-the-root-account-iam-users",
          "guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deployment-approach",
          {
            "Deploy Landing Zone Solution": [
              "guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-root-to-root-account",
              "guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-app-to-logs-account",
              "guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-security-to-security-account",
              "guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-app-to-other-child-accounts",
              "guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/use-iam-roles-for-ec2-instances",
              "guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/maintain-compliance-by-following-iam-best-practices",
              "guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/maintain-compliance-by-following-storage-best-practices",
              "guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/maintain-compliance-by-following-logging-best-practices",
              "guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/enable-key-rotation-for-kms-keys",
            ],
          },
          "guides/build-it-yourself/achieve-compliance/deployment-walkthrough/create-vpc-flow-logs",
          "guides/build-it-yourself/achieve-compliance/deployment-walkthrough/manual-steps",
        ],
      },
      "guides/build-it-yourself/achieve-compliance/traceability-matrix",
      "guides/build-it-yourself/achieve-compliance/next-steps",
    ],
  },
]

module.exports = sidebar
