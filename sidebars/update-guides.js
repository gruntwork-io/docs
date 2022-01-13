const updateGuideSidebars = {
  cis130: [
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
    {
      type: "autogenerated",
      dirName: "guides/stay-up-to-date/terraform/terraform-14",
    },
  ],
  terraform15: [
    {
      type: "autogenerated",
      dirName: "guides/stay-up-to-date/terraform/terraform-15",
    },
  ],
  terraform1x: [
    {
      type: "autogenerated",
      dirName: "guides/stay-up-to-date/terraform/terraform-1.x",
    },
  ],
  terraformServiceProviderV3: [
    {
      type: "autogenerated",
      dirName: "guides/stay-up-to-date/terraform/aws-provider-v3",
    },
  ],
  dryRefArch: [
    {
      type: "autogenerated",
      dirName:
        "guides/stay-up-to-date/terraform/how-to-dry-your-reference-architecture",
    },
  ],
}

module.exports = updateGuideSidebars
