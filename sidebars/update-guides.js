const backLink = {
  label: "Update Guides",
  type: "link",
  href: "/guides/stay-up-to-date",
  className: "back-button",
}

const updateGuideSidebars = {
  cis130: [
    backLink,
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
  ],
  cis140: [
    backLink,
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
  ],
  terraform12: [
    backLink,
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
  ],
  terraform13: [
    backLink,
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
            "guides/stay-up-to-date/terraform/terraform-13/deployment-walkthrough/updating-the-gruntwork-reference-architecture-to-terraform-0-13",
          ],
        },
      ],
    },
  ],
  terraform14: [
    backLink,
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
  ],
  terraform15: [
    backLink,
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
  ],
  terraform1x: [
    backLink,
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
  ],
  terraformServiceProviderV3: [
    backLink,
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
  ],
  dryRefArch: [
    backLink,
    {
      label: "How To DRY Your Reference Architecture",
      type: "category",
      link: {
        type: "doc",
        id: "guides/stay-up-to-date/terraform/how-to-dry-your-reference-architecture/index",
      },
      items: [
        "guides/stay-up-to-date/terraform/how-to-dry-your-reference-architecture/core-concepts",
        {
          "Deployment Walkthrough": [
            "guides/stay-up-to-date/terraform/how-to-dry-your-reference-architecture/deployment-walkthrough/intro",
            "guides/stay-up-to-date/terraform/how-to-dry-your-reference-architecture/deployment-walkthrough/update-to-the-service-catalog-based-reference-architecture",
            "guides/stay-up-to-date/terraform/how-to-dry-your-reference-architecture/deployment-walkthrough/optional-even-dryer-configuration",
            "guides/stay-up-to-date/terraform/how-to-dry-your-reference-architecture/deployment-walkthrough/refactoring-common-configurations-for-a-component",
          ],
        },
      ],
    },
  ],
}

module.exports = updateGuideSidebars
