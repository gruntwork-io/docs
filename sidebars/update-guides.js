const sidebar = [
  {
    label: "CIS 1.3.0 Update Guide",
    type: "category",
    link: {
      type: "doc",
      id: "guides/stay-up-to-date/cis/cis-1.3.0/index",
    },
    items: [
      "guides/stay-up-to-date/cis/cis-1.3.0/core-concepts",
      {
        "Deployment Walkthrough": [
          "guides/stay-up-to-date/cis/cis-1.3.0/deployment-walkthrough/step-1-update-references-to-the-gruntwork-infrastructure-as-code-library",
          "guides/stay-up-to-date/cis/cis-1.3.0/deployment-walkthrough/step-2-manual-steps",
          "guides/stay-up-to-date/cis/cis-1.3.0/deployment-walkthrough/step-3-deploy-new-modules",
        ],
      },
    ],
  },
  {
    label: "CIS 1.4.0 Update Guide",
    type: "category",
    link: {
      type: "doc",
      id: "guides/stay-up-to-date/cis/cis-1.4.0/index",
    },
    items: [
      "guides/stay-up-to-date/cis/cis-1.4.0/core-concepts",
      {
        "Deployment Walkthrough": [
          "guides/stay-up-to-date/cis/cis-1.4.0/deployment-walkthrough/step-1-update-references-to-the-gruntwork-infrastructure-as-code-library",
          "guides/stay-up-to-date/cis/cis-1.4.0/deployment-walkthrough/step-2-update-the-account-baseline-modules",
          "guides/stay-up-to-date/cis/cis-1.4.0/deployment-walkthrough/step-3-manual-steps",
        ],
      },
      "guides/stay-up-to-date/cis/cis-1.4.0/finally",
    ],
  },
  {
    label: "CIS 1.5.0 Update Guide",
    type: "category",
    link: {
      type: "doc",
      id: "guides/stay-up-to-date/cis/cis-1.5.0/index",
    },
    items: [
      "guides/stay-up-to-date/cis/cis-1.5.0/core-concepts",
      {
        "Deployment Walkthrough": [
          "guides/stay-up-to-date/cis/cis-1.5.0/deployment-walkthrough/step-1-check-your-live-infrastructure-is-cis-v1.4-compliant",
          "guides/stay-up-to-date/cis/cis-1.5.0/deployment-walkthrough/step-2-update-references-to-the-gruntwork-infrastructure-as-code-library",
          "guides/stay-up-to-date/cis/cis-1.5.0/deployment-walkthrough/step-3-update-the-account-baseline-modules",
          "guides/stay-up-to-date/cis/cis-1.5.0/deployment-walkthrough/step-4-verify-the-code-changes",
          "guides/stay-up-to-date/cis/cis-1.5.0/deployment-walkthrough/step-5-check-your-live-infrastructure-is-cis-v1.5-compliant",
        ],
      },
      "guides/stay-up-to-date/cis/cis-1.5.0/finally",
    ],
  },

  {
    label: "Update to Terraform 12",
    type: "category",
    link: {
      type: "doc",
      id: "guides/stay-up-to-date/terraform/terraform-12/index",
    },
    items: [
      "guides/stay-up-to-date/terraform/terraform-12/deployment-walkthrough",
      "guides/stay-up-to-date/terraform/terraform-12/version-compatibility-table",
    ],
  },

  {
    label: "Update to Terraform 13",
    type: "category",
    link: {
      type: "doc",
      id: "guides/stay-up-to-date/terraform/terraform-13/index",
    },
    items: [
      "guides/stay-up-to-date/terraform/terraform-13/core-concepts",
      {
        "Deployment Walkthrough": [
          "guides/stay-up-to-date/terraform/terraform-13/deployment-walkthrough/step-1-update-your-code-to-be-compatible-with-terraform-0-12",
          "guides/stay-up-to-date/terraform/terraform-13/deployment-walkthrough/step-2-update-your-code-to-be-compatible-with-terraform-0-13",
          "guides/stay-up-to-date/terraform/terraform-13/deployment-walkthrough/step-3-update-references-to-the-gruntwork-infrastructure-as-code-library",
          "guides/stay-up-to-date/terraform/terraform-13/deployment-walkthrough/step-4-update-provider-sources",
          "guides/stay-up-to-date/terraform/terraform-13/deployment-walkthrough/updating-the-gruntwork-reference-architecture-to-terraform-0-13",
        ],
      },
    ],
  },

  {
    label: "Update to Terraform 14",
    type: "category",
    link: {
      type: "doc",
      id: "guides/stay-up-to-date/terraform/terraform-14/index",
    },
    items: [
      "guides/stay-up-to-date/terraform/terraform-14/core-concepts",
      {
        "Deployment Walkthrough": [
          "guides/stay-up-to-date/terraform/terraform-14/deployment-walkthrough/step-1-update-your-code-to-be-compatible-with-terraform-0-13",
          "guides/stay-up-to-date/terraform/terraform-14/deployment-walkthrough/step-2-update-your-code-to-be-compatible-with-terraform-0-14",
          "guides/stay-up-to-date/terraform/terraform-14/deployment-walkthrough/step-3-update-references-to-the-gruntwork-infrastructure-as-code-library",
          "guides/stay-up-to-date/terraform/terraform-14/deployment-walkthrough/step-4-start-using-lock-files",
        ],
      },
    ],
  },

  {
    label: "Update to Terraform 15",
    type: "category",
    link: {
      type: "doc",
      id: "guides/stay-up-to-date/terraform/terraform-15/index",
    },
    items: [
      "guides/stay-up-to-date/terraform/terraform-15/core-concepts",
      {
        "Deployment Walkthrough": [
          "guides/stay-up-to-date/terraform/terraform-15/deployment-walkthrough/step-1-update-your-code-to-be-compatible-with-terraform-0-14",
          "guides/stay-up-to-date/terraform/terraform-15/deployment-walkthrough/step-2-update-your-code-to-be-compatible-with-terraform-0-15",
          "guides/stay-up-to-date/terraform/terraform-15/deployment-walkthrough/step-3-update-references-to-the-gruntwork-infrastructure-as-code-library",
        ],
      },
    ],
  },

  {
    label: "Update to Terraform 1.X",
    type: "category",
    link: {
      type: "doc",
      id: "guides/stay-up-to-date/terraform/terraform-1.x/index",
    },
    items: [
      "guides/stay-up-to-date/terraform/terraform-1.x/core-concepts",
      {
        "Deployment Walkthrough": [
          "guides/stay-up-to-date/terraform/terraform-1.x/deployment-walkthrough/step-1-update-your-code-to-be-compatible-with-terraform-0-15",
          "guides/stay-up-to-date/terraform/terraform-1.x/deployment-walkthrough/step-2-update-references-to-the-gruntwork-infrastructure-as-code-library",
        ],
      },
    ],
  },

  {
    "label": "Terraform 1.1",
    "type": "category",
    "link": {
      "type": "doc",
      "id": "guides/stay-up-to-date/terraform/terraform-1.1/index"
    },
    "items": [
      "guides/stay-up-to-date/terraform/terraform-1.1/core-concepts",
      {
        "Deployment Walkthrough": [
          "guides/stay-up-to-date/terraform/terraform-1.1/deployment-walkthrough/step-1-update-your-code-to-be-compatible-with-terraform-1-x",
          "guides/stay-up-to-date/terraform/terraform-1.1/deployment-walkthrough/step-2-update-references-to-the-gruntwork-infrastructure-as-code-library"
        ]
      }
    ]
  },
  {
    label: "Update to AWS Provider v3",
    type: "category",
    link: {
      type: "doc",
      id: "guides/stay-up-to-date/terraform/how-to-update-to-aws-provider-v3/index",
    },
    items: [
      "guides/stay-up-to-date/terraform/how-to-update-to-aws-provider-v3/core-concepts",
      "guides/stay-up-to-date/terraform/how-to-update-to-aws-provider-v3/deployment-walkthrough",
    ],
  },
  {
    label: "Update to AWS Provider v4",
    type: "category",
    link: {
      type: "doc",
      id: "guides/stay-up-to-date/terraform/how-to-update-to-aws-provider-v4/index",
    },
    items: [
      "guides/stay-up-to-date/terraform/how-to-update-to-aws-provider-v4/core-concepts",
      "guides/stay-up-to-date/terraform/how-to-update-to-aws-provider-v4/deployment-walkthrough",
    ],
  }
]

module.exports = sidebar;