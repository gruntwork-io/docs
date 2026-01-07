import refarchSidebar from "./refarch"
import ecsDeployRunnerSidebar from "./ecs-deploy-runner"
import infrastructurePipelinesSidebar from "./infrastructure-pipelines"

// Collapse these categories by default
refarchSidebar[0].collapsible = true
refarchSidebar[0].collapsed = true
ecsDeployRunnerSidebar[0].collapsible = true
ecsDeployRunnerSidebar[0].collapsed = true
infrastructurePipelinesSidebar[0].collapsible = true
infrastructurePipelinesSidebar[0].collapsed = true

const developerPortalKBLink =
  "https://github.com/orgs/gruntwork-io/discussions?discussions_q=" +
  // filter by discussions with the label "s:dev-portal" & sort by top voted discussions first
  encodeURIComponent("label:s:dev-portal sort:top")
const pipelinesKBLink =
  "https://github.com/orgs/gruntwork-io/discussions?discussions_q=" +
  // filter by discussions with the label s:CI/Pipelines & sort by top voted discussions first
  encodeURIComponent("label:s:CI/Pipelines sort:top")

const complianceSidebar = require("./compliance-guide")
const updateGuideSidebars = require("./update-guides.js")

const sidebar = [
  {
    type: "html",
    value: "Welcome to Gruntwork",
    className: "sidebar-header emoji-rocket",
  },
  {
    type: "doc",
    id: "index",
    className: "hidden",
  },
  {
    label: "Gruntwork Platform",
    type: "doc",
    id: "2.0/docs/overview/concepts/gruntworkplatform",
  },
  {
    type: "category",
    label: "IaC Best Practices",
    collapsed: true,
    items: [
      {
        label: "Infrastructure Live",
        type: "doc",
        id: "2.0/docs/overview/concepts/infrastructure-live",
      },
      {
        label: "Labels and Tags",
        type: "doc",
        id: "2.0/docs/overview/concepts/labels-tags",
      },
      {
        label: "Developer Self-Service",
        type: "doc",
        id: "2.0/docs/overview/concepts/developer-self-service",
      },
      {
        label: "IaC Platform Choice",
        type: "doc",
        id: "2.0/docs/overview/concepts/iac-platform",
      },
      {
        label: "Prebuilt IaC Modules",
        type: "doc",
        id: "2.0/docs/overview/concepts/iac-modules",
      },
    ],
  },
  complianceSidebar,
  {
    label: "Staying up to Date Guides",
    type: "category",
    items: updateGuideSidebars,
  },
  {
    label: "Support",
    type: "doc",
    id: "support",
  },
  {
    label: "SLO Policy",
    type: "doc",
    id: "slo-policy",
  },
  {
    value: "Getting Started",
    type: "html",
    className: "sidebar-header emoji-rocket",
  },
  {
    label: "Setup Checklist",
    type: "doc",
    id: "2.0/docs/overview/getting-started/index",
  },
  {
    label: "Activating your Gruntwork Account",
    type: "doc",
    id: "2.0/docs/overview/getting-started/create-account",
  },
  {
    label: "Inviting Team Members",
    type: "doc",
    id: "2.0/docs/overview/getting-started/invite-team",
  },
  {
    label: "Linking GitHub to Gruntwork",
    type: "doc",
    id: "2.0/docs/overview/getting-started/link-github-id",
  },
  {
    type: "html",
    value: "Gruntwork Pipelines",
    className: "sidebar-header emoji-rocket",
  },
  {
    label: "Concepts",
    type: "category",
    collapsed: true,
    link: {
      type: "doc",
      id: "2.0/docs/pipelines/concepts/overview",
    },
    items: [
      {
        label: "Authenticating to the Cloud",
        type: "category",
        collapsed: false,
        items: [
          {
            label: "Overview",
            type: "doc",
            id: "2.0/docs/pipelines/concepts/cloud-auth/index",
          },
          {
            label: "AWS",
            type: "doc",
            id: "2.0/docs/pipelines/concepts/cloud-auth/aws",
          },
          {
            label: "Azure",
            type: "doc",
            id: "2.0/docs/pipelines/concepts/cloud-auth/azure",
          },
          {
            label: "Custom",
            type: "doc",
            id: "2.0/docs/pipelines/concepts/cloud-auth/custom",
          },
        ],
      },
      {
        label: "Drift Detection",
        type: "doc",
        id: "2.0/docs/pipelines/concepts/drift-detection",
      },
      {
        label: "The HCL Language",
        type: "doc",
        id: "2.0/docs/pipelines/concepts/hcl-config-language",
      },
    ],
  },
  {
    label: "Architecture",
    type: "category",
    collapsed: true,
    link: {
      type: "doc",
      id: "2.0/docs/pipelines/architecture/index",
    },
    items: [
      {
        label: "Execution flow",
        type: "doc",
        id: "2.0/docs/pipelines/architecture/execution-flow",
      },
      {
        label: "Actions",
        type: "doc",
        id: "2.0/docs/pipelines/architecture/actions",
      },
      {
        label: "Pull Request Behaviors",
        type: "doc",
        id: "2.0/docs/pipelines/architecture/change-types",
      },
      {
        label: "Security Controls",
        type: "doc",
        id: "2.0/docs/pipelines/architecture/security-controls",
      },
      {
        label: "Audit Logs",
        type: "doc",
        id: "2.0/docs/pipelines/architecture/audit-logs",
      },
      {
        label: "CI Workflows",
        type: "doc",
        id: "2.0/docs/pipelines/architecture/ci-workflows",
      },
      {
        label: "Usage Data",
        type: "doc",
        id: "2.0/docs/pipelines/architecture/usage-data",
      },
    ],
  },
  {
    label: "Setup & Installation",
    type: "category",
    collapsed: true,
    link: {
      type: "doc",
      id: "2.0/docs/pipelines/installation/overview",
    },
    items: [
      {
        label: "Platform Differences",
        type: "doc",
        id: "2.0/docs/pipelines/installation/scm-comparison",
      },
      {
        type: "category",
        label: "Set up SCM Authentication",
        collapsed: false,
        items: [
          {
            label: "Overview",
            type: "doc",
            id: "2.0/docs/pipelines/installation/authoverview",
          },
          {
            label: "GitHub App",
            type: "doc",
            id: "2.0/docs/pipelines/installation/viagithubapp",
          },
          {
            label: "Machine Users",
            type: "doc",
            id: "2.0/docs/pipelines/installation/viamachineusers",
          },
        ],
      },
      {
        type: "category",
        label: "Setting up a Repository with Pipelines",
        collapsed: false,
        items: [
          {
            type: "category",
            label: "GitHub",
            collapsed: false,
            items: [
              {
                label: "Bootstrap Pipelines in a New GitHub Repository",
                type: "doc",
                id: "2.0/docs/pipelines/installation/addingnewrepo",
              },
              {
                label: "Bootstrap Pipelines in an Existing GitHub Repository",
                type: "doc",
                id: "2.0/docs/pipelines/installation/addingexistingrepo",
              },
              {
                label: "Adding Branch Protection to a GitHub Repository",
                type: "doc",
                id: "2.0/docs/pipelines/installation/branch-protection",
              },
            ],
          },
          {
            type: "category",
            label: "GitLab",
            collapsed: false,
            items: [
              {
                label: "Bootstrap Pipelines in a new GitLab Project",
                type: "doc",
                id: "2.0/docs/pipelines/installation/addinggitlabrepo",
              },
              {
                label: "Bootstrap Pipelines in an Existing GitLab Project",
                type: "doc",
                id: "2.0/docs/pipelines/installation/addingexistinggitlabrepo",
              },
              {
                label: "Adding Branch Protection to a GitLab Project",
                type: "doc",
                id: "2.0/docs/pipelines/installation/gitlab-branch-protection",
              },
            ],
          },
        ],
      },
      {
        label: "Configuration",
        type: "category",
        collapsed: false,
        items: [
          {
            label: "Settings",
            type: "doc",
            id: "2.0/docs/pipelines/configuration/settings",
          },
          {
            label: "Setting up Drift Detection",
            type: "doc",
            id: "2.0/docs/pipelines/configuration/driftdetection",
          },
        ],
      },
    ],
  },
  {
    label: "Tutorials",
    type: "category",
    collapsed: true,
    items: [
      {
        label: "Deploy your first infrastructure change with Pipelines",
        type: "doc",
        id: "2.0/docs/pipelines/tutorials/deploying-your-first-infrastructure-change",
      },
      {
        label: "Destroying infrastructure with Pipelines",
        type: "doc",
        id: "2.0/docs/pipelines/tutorials/destroying-infrastructure",
      },
      {
        label: "Deploying to AWS GovCloud",
        type: "doc",
        id: "2.0/docs/pipelines/tutorials/deploying-to-aws-gov-cloud",
      },
    ],
  },
  {
    label: "Guides",
    type: "category",
    collapsed: true,
    items: [
      {
        label: "Running Plan/Apply",
        type: "doc",
        id: "2.0/docs/pipelines/guides/running-plan-apply",
      },
      {
        label: "Managing Secrets in your Pipelines",
        type: "doc",
        id: "2.0/docs/pipelines/guides/managing-secrets",
      },
      {
        label: "Updating Pipelines",
        type: "doc",
        id: "2.0/docs/pipelines/guides/updating-pipelines",
      },
      {
        label: "Extending Pipelines",
        type: "doc",
        id: "2.0/docs/pipelines/guides/extending-pipelines",
      },
      {
        label: "Installing Drift Detection",
        type: "doc",
        id: "2.0/docs/pipelines/guides/installing-drift-detection",
      },
      {
        label: "Running Drift Detection",
        type: "doc",
        id: "2.0/docs/pipelines/guides/running-drift-detection",
      },
      {
        label: "File Dependencies",
        type: "doc",
        id: "2.0/docs/pipelines/guides/file-dependencies",
      },
      {
        label: "Leveraging advanced Terragrunt Features",
        type: "doc",
        id: "2.0/docs/pipelines/guides/terragrunt-env-vars",
      },
      {
        label: "Handling Broken IaC",
        type: "doc",
        id: "2.0/docs/pipelines/guides/handling-broken-iac",
      },
      {
        label: "Using Terragrunt Stacks",
        type: "doc",
        id: "2.0/docs/pipelines/guides/stacks",
      },
      {
        label: "Ignoring Files & Directories",
        type: "doc",
        id: "2.0/docs/pipelines/guides/ignore-files-directories",
      },
      {
        label: "Unlocking State Locks",
        type: "doc",
        id: "2.0/docs/pipelines/guides/unlock",
      },
    ],
  },
  {
    label: "Previous Versions",
    type: "category",
    items: [
      {
        label: "Upgrading from Pipelines GitHub Workflows v3 to v4",
        type: "doc",
        id: "2.0/docs/pipelines/previous-versions/upgrading-github-v3-to-v4",
      },
      {
        label: "Upgrading from Pipelines GitLab Workflows v1 to v2",
        type: "doc",
        id: "2.0/docs/pipelines/previous-versions/upgrading-gitlab-v1-to-v2",
      },
      {
        label: "Upgrading from Infrastructure-Pipelines",
        type: "doc",
        id: "2.0/docs/pipelines/previous-versions/upgrading-from-infrastructure-pipelines",
      },
      {
        label: "Upgrading from ECS Deploy Runner",
        type: "doc",
        id: "2.0/docs/pipelines/previous-versions/upgrading-from-ecs-deploy-runner",
      },
    ],
  },
  {
    label: "Configuration Reference",
    type: "link",
    className: "external-link",
    href: "/2.0/reference/pipelines",
  },
  {
    label: "Knowledge Base",
    type: "link",
    href: pipelinesKBLink,
  },
  {
    value: "AWS Account Factory",
    className: "sidebar-header emoji-rocket",
    type: "html",
  },
  {
    label: "Concepts",
    type: "category",
    collapsed: true,
    items: [
      {
        label: "Overview",
        type: "doc",
        id: "2.0/docs/accountfactory/concepts/index",
      },
      {
        label: "Delegated Repositories",
        type: "doc",
        id: "2.0/docs/accountfactory/concepts/delegated-repositories",
      },
    ],
  },
  {
    label: "Architecture",
    type: "category",
    collapsed: true,
    link: {
      type: "doc",
      id: "2.0/docs/accountfactory/architecture/index",
    },
    items: [
      {
        label: "Logging",
        type: "doc",
        id: "2.0/docs/accountfactory/architecture/logging",
      },
      {
        label: "Network Topology",
        type: "doc",
        id: "2.0/docs/accountfactory/architecture/network-topology",
      },
      {
        label: "Repository Topology",
        type: "doc",
        id: "2.0/docs/accountfactory/architecture/repository-topology",
      },
    ],
  },
  {
    label: "Prerequisites",
    type: "category",
    collapsed: false,
    items: [
      {
        label: "AWS Landing Zone",
        type: "doc",
        id: "2.0/docs/accountfactory/prerequisites/awslandingzone",
      },
    ],
  },
  {
    label: "Setup & Installation",
    type: "category",
    collapsed: true,
    link: {
      type: "doc",
      id: "2.0/docs/accountfactory/installation/index",
    },
    items: [
      {
        label: "Adding Account Factory to a new repository",
        type: "doc",
        id: "2.0/docs/accountfactory/installation/addingnewrepo",
      },
    ],
  },
  {
    label: "Guides",
    type: "category",
    collapsed: true,
    items: [
      {
        label: "Vending a new AWS Account",
        type: "doc",
        id: "2.0/docs/accountfactory/guides/vend-aws-account",
      },
      {
        label: "Modify an AWS Account",
        type: "doc",
        id: "2.0/docs/accountfactory/tutorials/modify-account",
      },
      {
        label: "Remove an AWS Account",
        type: "doc",
        id: "2.0/docs/accountfactory/tutorials/remove-account",
      },
      {
        label: "Vending Delegated Repositories",
        type: "doc",
        id: "2.0/docs/accountfactory/guides/delegated-repositories",
      },
      {
        label: "Setup a Delegated Repository",
        type: "doc",
        id: "2.0/docs/accountfactory/guides/setup-delegated-repo",
      },
      {
        label: "Adding Collaborators to Delegated Repositories",
        type: "doc",
        id: "2.0/docs/accountfactory/guides/collaborators",
      },
      {
        label: "Adding IAM Permissions To Delegated Repositories",
        type: "doc",
        id: "2.0/docs/accountfactory/guides/iam-roles",
      },
      {
        label:
          "Automatically Remediate AWS Control Tower Drift with Async Multi-Account Factory Module",
        type: "doc",
        id: "2.0/docs/accountfactory/guides/drift-remediation-with-async-module",
      },
    ],
  },
  {
    label: "Configuration Reference",
    type: "link",
    className: "external-link",
    href: "/2.0/reference/accountfactory/configurations",
  },
  {
    value: "Patcher",
    type: "html",
    className: "sidebar-header emoji-rocket",
  },
  {
    label: "Concepts",
    type: "category",
    collapsed: true,
    link: {
      type: "doc",
      id: "2.0/docs/patcher/concepts/index",
    },
    items: [
      {
        label: "Patches",
        type: "doc",
        id: "2.0/docs/patcher/concepts/patches",
      },
      {
        label: "Update Grouping & PR Strategy",
        type: "doc",
        id: "2.0/docs/patcher/concepts/grouping",
      },
      {
        label: "Promotion Workflows",
        type: "doc",
        id: "2.0/docs/patcher/concepts/promotion-workflows",
      },
      {
        label: "Update Strategies",
        type: "doc",
        id: "2.0/docs/patcher/concepts/update-strategies",
      },
    ],
  },
  {
    label: "Architecture",
    type: "doc",
    id: "2.0/docs/patcher/architecture/index",
  },
  {
    label: "Setup & Installation",
    type: "doc",
    id: "2.0/docs/patcher/installation/index",
  },
  {
    label: "Tutorials",
    type: "category",
    collapsed: true,
    items: [
      {
        label: "Applying your first patch",
        type: "doc",
        id: "2.0/docs/patcher/tutorials/applying-first-patch",
      },
      {
        label: "Authoring your first patch",
        type: "doc",
        id: "2.0/docs/patcher/tutorials/authoring-first-patch",
      },
    ],
  },
  {
    label: "Guides",
    type: "category",
    collapsed: true,
    items: [
      {
        label: "Ongoing Updates",
        type: "doc",
        id: "2.0/docs/patcher/guides/ongoing-updates",
      },
      {
        label: "Setting up Promotion Workflows",
        type: "doc",
        id: "2.0/docs/patcher/guides/promotion-workflows",
      },
      {
        label: "Using Patcher Report",
        type: "doc",
        id: "2.0/docs/patcher/guides/report",
      },
      {
        label: "Using Patcher Update",
        type: "doc",
        id: "2.0/docs/patcher/guides/update",
      },
      {
        label: "Using Patcher Upgrade",
        type: "doc",
        id: "2.0/docs/patcher/guides/upgrade",
      },
      {
        label: "Self-hosting Patcher",
        type: "doc",
        id: "2.0/docs/patcher/guides/self-hosting",
      },
      {
        label: "Disable Telemetry",
        type: "doc",
        id: "2.0/docs/patcher/guides/telemetry",
      },
    ],
  },
  {
    label: "Configuration Reference",
    type: "link",
    className: "external-link",
    href: "/2.0/reference/patcher",
  },
  {
    value: "AWS IaC Library",
    type: "html",
    className: "sidebar-header",
  },
  {
    label: "Concepts",
    type: "category",
    collapsed: true,
    link: {
      type: "doc",
      id: "2.0/docs/library/concepts/overview",
    },
    items: [
      {
        label: "Modules",
        type: "doc",
        id: "2.0/docs/library/concepts/modules",
      },
      {
        label: "Service Modules",
        type: "doc",
        id: "2.0/docs/library/concepts/service-modules",
      },
      {
        label: "Module Defaults",
        type: "doc",
        id: "2.0/docs/library/concepts/module-defaults",
      },
      {
        label: "Principles",
        type: "category",
        collapsed: true,
        link: {
          type: "doc",
          id: "2.0/docs/library/concepts/principles/overview",
        },
        items: [
          {
            label: "Control Provider Usage",
            type: "doc",
            id: "2.0/docs/library/concepts/principles/control-provider-usage",
          },
          {
            label: "Be Judicious with New Features",
            type: "doc",
            id: "2.0/docs/library/concepts/principles/be-judicious-with-new-features",
          },
          {
            label: "Quality In Depth",
            type: "doc",
            id: "2.0/docs/library/concepts/principles/quality-in-depth",
          },
          {
            label: "Support Smooth OpenTofu Adoption",
            type: "doc",
            id: "2.0/docs/library/concepts/principles/opentofu-adoption",
          },
        ],
      },
    ],
  },
  {
    label: "Architecture",
    type: "category",
    collapsed: true,
    link: {
      type: "doc",
      id: "2.0/docs/library/architecture/overview",
    },
    items: [
      {
        label: "OpenTofu & Terraform Compatibility",
        type: "doc",
        id: "2.0/docs/library/architecture/opentofu-terraform-compatibility",
      },
    ],
  },
  {
    label: "Setup & Installation",
    type: "category",
    collapsed: true,
    items: [
      {
        label: "Setting Up",
        type: "doc",
        id: "2.0/docs/library/setup/setting-up",
      },
      {
        label: "Accessing The Code",
        type: "doc",
        id: "2.0/docs/library/setup/accessing-the-code",
      },
    ],
  },
  {
    label: "Tutorials",
    type: "category",
    collapsed: true,
    items: [
      {
        label: "Deploying your first Gruntwork Module",
        type: "doc",
        id: "2.0/docs/library/tutorials/deploying-your-first-gruntwork-module",
      },
      {
        label: "Defining and using Module Defaults",
        type: "doc",
        id: "2.0/docs/library/tutorials/module-defaults",
      },
      {
        label: "Creating your own Service Module",
        type: "doc",
        id: "2.0/docs/library/tutorials/creating-service-module",
      },
      {
        label: "Customizing Modules",
        type: "doc",
        id: "2.0/docs/library/tutorials/customizing-modules",
      },
    ],
  },
  {
    label: "Guides",
    type: "category",
    collapsed: true,
    items: [
      {
        label: "Using Versioned Modules",
        type: "doc",
        id: "2.0/docs/library/guides/versioning",
      },
      {
        label: "Updating Versioned Modules",
        type: "doc",
        id: "2.0/docs/library/guides/updating-modules",
      },
      {
        label: "Contributing to the Library",
        type: "doc",
        id: "2.0/docs/library/guides/contributing",
      },
      {
        label: "Self-Hosting the Library",
        type: "doc",
        id: "2.0/docs/library/guides/self-hosting",
      },
      {
        label: "Running Apps",
        type: "doc",
        id: "2.0/docs/library/guides/running-apps",
      },
      {
        label: "Integrate with Terraform Cloud",
        type: "doc",
        id: "2.0/docs/library/guides/integrate-tfc",
      },
    ],
  },
  {
    label: "Module Reference",
    type: "link",
    className: "external-link",
    href: "/library/reference",
  },
  {
    label: "Legacy Products",
    type: "category",
    items: [
      refarchSidebar,
      infrastructurePipelinesSidebar,
      ecsDeployRunnerSidebar,
    ],
  },
  {
    label: "Tools",
    type: "doc",
    id: "tools",
  },
  {
    label: "Training",
    type: "doc",
    id: "courses",
  },
]

module.exports = sidebar
