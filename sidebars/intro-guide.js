const sidebar = [
  {
    Overview: [
      "intro/overview/intro-to-gruntwork",
      "intro/overview/how-it-works",
      "intro/overview/reference-architecture-prerequisites-guide",
      "intro/overview/shared-responsibility-model",
      // Temporarily hiding the unfinished sections from the sidebar We'll put
      // them back shortly and don't want to delete the pages as we know we're
      // going to have these sections within a few days.
      // "intro/overview/gruntwork-production-framework",
      // "intro/overview/use-cases",
      // "intro/overview/gruntwork-vs-other",
      "intro/overview/getting-started",
    ],
  },
  {
    "Core Concepts": [
      "intro/core-concepts/production-framework",
      "intro/core-concepts/infrastructure-as-code",
      "intro/core-concepts/immutable-infrastructure",
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
    "Setting Up Your Environment": [
      "intro/environment-setup/recommended_tools",
    ],
  },
  {
    "Tool Fundamentals": [
      "intro/tool-fundamentals/docker",
      "intro/tool-fundamentals/packer",
      "intro/tool-fundamentals/terraform",
      "intro/tool-fundamentals/terragrunt",
    ],
  },
  {
    "Deploy Your First Module": [
      "intro/first-deployment/using-terraform-modules",
      "intro/first-deployment/testing",
      "intro/first-deployment/deploy",
    ],
  },
  {
    type: "doc",
    id: "intro/next-steps",
  },
]

module.exports = sidebar
