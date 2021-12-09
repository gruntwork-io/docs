/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  introSidebar: [
    {
      Overview: [
        "intro/overview/world-class-devops",
        "intro/overview/account-baselines",
        "intro/overview/service-catalog",
        "intro/overview/app-catalog",
        "intro/overview/iac-pipeline",
        "intro/overview/self-service",
        "intro/overview/auto-updates",
      ],
    },
    {
      "Accessing the Dev Portal": [
        "intro/dev-portal/create-account",
        "intro/dev-portal/invite-team",
        "intro/dev-portal/link-github-id",
      ],
    },
    {
      "Setting Up Your Environmant": ["intro/environment-setup/stub"],
    },
    {
      "Tool Fundamentals": ["intro/tool-fundamentals/stub"],
    },
    {
      "Deploying A Service Module": ["intro/first-deployment/stub"],
    },
    {
      type: "doc",
      id: "intro/next-steps",
    },
  ],
  guidesSidebar: [
    {
      type: "doc",
      id: "guides/welcome",
    },
    {
      "The Gruntwork Reference Architecture": [
        "guides/reference-architecture/overview/overview",
        {
          Authentication: [
            {
              type: "autogenerated",
              dirName: "guides/reference-architecture/02-authenticate",
            },
          ],
        },
        {
          "Deploying Your Apps": [
            {
              type: "autogenerated",
              dirName: "guides/reference-architecture/03-deploy-apps",
            },
          ],
        },
        {
          "Configure Gruntwork Pipelines": [
            {
              type: "autogenerated",
              dirName:
                "guides/reference-architecture/04-configure-gw-pipelines",
            },
          ],
        },
        {
          "Monitoring, Alerting & Logging": [
            {
              type: "autogenerated",
              dirName:
                "guides/reference-architecture/05-monitoring-alerting-logging",
            },
          ],
        },
        {
          "Adding a New Account": [
            {
              type: "autogenerated",
              dirName: "guides/reference-architecture/06-adding-a-new-account",
            },
          ],
        },
        {
          "Undeploying Your Architecture": [
            {
              type: "autogenerated",
              dirName: "guides/reference-architecture/07-undeploy",
            },
          ],
        },
      ],
    },
    {
      "Build it Yourself": [
        {
          type: "autogenerated",
          dirName: "guides/build-it-yourself",
        },
      ],
    },
    {
      "Staying Up to Date": ["guides/staying-up-to-date/stub"],
    },
    {
      type: "doc",
      id: "guides/support",
    },
  ],
  referenceSidebar: [
    {
      type: "doc",
      id: "reference/intro",
    },
    {
      type: "ref",
      label: "Service APIs",
      id: "reference/services/intro",
    },
    {
      type: "ref",
      label: "Module APIs",
      id: "reference/modules/stub",
    },
    {
      type: "ref",
      label: "Tools",
      id: "reference/tools/stub",
    },
  ],

  modulesSidebar: [{ type: "autogenerated", dirName: "reference/modules" }],
  servicesSidebar: [
    "reference/services/intro",
    {
      "App Orchestration": [
        {
          type: "autogenerated",
          dirName: "reference/services/app-orchestration",
        },
      ],
    },
    {
      "CI/CD Pipeline": [
        { type: "autogenerated", dirName: "reference/services/ci-cd-pipeline" },
      ],
    },
    {
      "Data Storage": [
        { type: "autogenerated", dirName: "reference/services/data-storage" },
      ],
    },
    {
      "Landing Zone": [
        { type: "autogenerated", dirName: "reference/services/landing-zone" },
      ],
    },
    {
      Networking: [
        { type: "autogenerated", dirName: "reference/services/networking" },
      ],
    },
    {
      Security: [
        { type: "autogenerated", dirName: "reference/services/security" },
      ],
    },
  ],
  toolsSidebar: [{ type: "autogenerated", dirName: "reference/tools" }],
}

module.exports = sidebars
