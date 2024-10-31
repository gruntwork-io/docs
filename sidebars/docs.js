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
    label: "Gruntwork Documentation",
    type: "category",
    link: {
      type: "generated-index",
      title: "Gruntwork Documentation",
      slug: "2.0/docs",
    },
    collapsible: false,
    items: [
      {
        label: "Overview",
        type: "category",
        collapsed: false,
        items: [
          {
            label: "Concepts",
            type: "category",
            collapsed: false,
            items: [
              {
                label: "Devops Foundations",
                type: "doc",
                id: "2.0/docs/overview/concepts/devopsfoundations",
              },
              {
                label: "Recommended Folder Structure: Infrastructure Live",
                type: "doc",
                id: "2.0/docs/overview/concepts/infrastructure-live",
              },
              {
                label: "Labels and Tags",
                type: "doc",
                id: "2.0/docs/overview/concepts/labels-tags",
              },
            ],
          },
          {
            label: "Getting Started",
            type: "category",
            collapsed: false,
            items: [
              {
                label: "Activating your Gruntwork Account",
                type: "doc",
                id: "2.0/docs/overview/developer-portal/create-account",
              },
              {
                label: "Inviting Team Members",
                type: "doc",
                id: "2.0/docs/overview/developer-portal/invite-team",
              },
              {
                label: "Linking GitHub to Gruntwork",
                type: "doc",
                id: "2.0/docs/overview/developer-portal/link-github-id",
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
        ],
      },
      {
        label: "Pipelines",
        type: "category",
        collapsed: true,
        items: [
          {
            label: "Concepts",
            type: "category",
            collapsed: true,
            items: [
              {
                label: "Overview",
                type: "doc",
                id: "2.0/docs/pipelines/concepts/overview",
              },
              {
                label: "Authenticating with Cloud Providers",
                type: "doc",
                id: "2.0/docs/pipelines/concepts/cloud-auth",
              },
              {
                label: "Drift Detection",
                type: "doc",
                id: "2.0/docs/pipelines/concepts/drift-detection",
              },
            ],
          },
          {
            label: "Architecture",
            type: "category",
            collapsed: true,
            items: [
              {
                label: "Overview",
                type: "doc",
                id: "2.0/docs/pipelines/architecture/index",
              },
              {
                label: "Components",
                type: "doc",
                id: "2.0/docs/pipelines/architecture/components",
              },
              {
                label: "Actions",
                type: "doc",
                id: "2.0/docs/pipelines/architecture/actions",
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
            items: [
              {
                label: "Prerequisites",
                type: "category",
                collapsed: false,
                items: [
                  {
                    label: "AWS Landing Zone",
                    type: "doc",
                    id: "2.0/docs/pipelines/installation/prerequisites/awslandingzone",
                  },
                ],
              },
              {
                type: "category",
                label: "Enable Auth for Pipelines",
                collapsed: false,
                items: [
                  {
                    label: "Auth via GitHub App",
                    type: "doc",
                    id: "2.0/docs/pipelines/installation/viagithubapp",
                  },
                  {
                    label: "Auth via Machine Users",
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
                    label: "Creating a New Repository with Pipelines",
                    type: "doc",
                    id: "2.0/docs/pipelines/installation/addingnewrepo",
                  },
                  {
                    label: "Adding Pipelines to an Existing Repository",
                    type: "doc",
                    id: "2.0/docs/pipelines/installation/addingexistingrepo",
                  },
                  {
                    label: "Adding Branch Protection to a Repository",
                    type: "doc",
                    id: "2.0/docs/pipelines/installation/branch-protection",
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
                label: "Running Drift Detection",
                type: "doc",
                id: "2.0/docs/pipelines/guides/running-drift-detection",
              },
            ],
          },
          {
            label: "Previous Versions",
            type: "category",
            items: [
              {
                label: "Infrastructure Pipelines",
                type: "link",
                className: "external-link",
                href: "/infrastructure-pipelines/overview",
              },
              {
                label: "Upgrading from Infrastructure-Pipelines",
                type: "doc",
                id: "2.0/docs/pipelines/previous-versions/upgrading-from-infrastructure-pipelines",
              },
              {
                label: "ECS Deploy Runner",
                type: "link",
                className: "external-link",
                href: "/ecs-deploy-runner/overview",
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
        ],
      },
      {
        label: "Account Factory",
        type: "category",
        collapsed: true,
        items: [
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
            ],
          },
          {
            label: "Architecture",
            type: "category",
            collapsed: true,
            items: [
              {
                label: "Overview",
                type: "doc",
                id: "2.0/docs/accountfactory/architecture/index",
              },
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
            ],
          },
          {
            label: "Setup & Installation",
            type: "category",
            collapsed: true,
            items: [
              {
                label: "Overview",
                type: "doc",
                id: "2.0/docs/accountfactory/installation/index",
              },
            ],
          },
          {
            label: "Tutorials",
            type: "category",
            collapsed: true,
            items: [
              {
                label: "Vending a new AWS Account",
                type: "doc",
                id: "2.0/docs/accountfactory/tutorials/vend-aws-account",
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
            ],
          },
          {
            label: "Guides",
            type: "category",
            collapsed: true,
            items: [
              {
                label: "Customizing something",
                type: "doc",
                id: "2.0/docs/accountfactory/guides/index",
              },
            ],
          },
          {
            label: "Configuration Reference",
            type: "link",
            className: "external-link",
            href: "/2.0/reference/accountfactory",
          },
        ],
      },
      {
        label: "Patcher",
        type: "category",
        collapsed: true,
        items: [
          {
            label: "Concepts",
            type: "category",
            collapsed: true,
            items: [
              {
                label: "Overview",
                type: "doc",
                id: "2.0/docs/patcher/concepts/index",
              },
              {
                label: "Patches",
                type: "doc",
                id: "2.0/docs/patcher/concepts/patches",
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
            type: "category",
            collapsed: true,
            items: [
              {
                label: "Overview",
                type: "doc",
                id: "2.0/docs/patcher/architecture/index",
              },
            ],
          },
          {
            label: "Setup & Installation",
            type: "category",
            collapsed: true,
            items: [
              {
                label: "Overview",
                type: "doc",
                id: "2.0/docs/patcher/installation/index",
              },
            ],
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
        ],
      },
      {
        label: "Library",
        type: "category",
        collapsed: true,
        items: [
          {
            label: "Concepts",
            type: "category",
            collapsed: true,
            items: [
              {
                label: "Overview",
                type: "doc",
                id: "2.0/docs/library/concepts/overview",
              },
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
                ],
              },
            ],
          },
          {
            label: "Architecture",
            type: "category",
            collapsed: true,
            items: [
              {
                label: "Overview",
                type: "doc",
                id: "2.0/docs/library/architecture/overview",
              },
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
            href: "/2.0/reference/library/index",
          },
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
      {
        label: "Legacy Products",
        type: "category",
        items: [
          refarchSidebar,
          infrastructurePipelinesSidebar,
          ecsDeployRunnerSidebar,
        ],
      },
    ],
  },
]

module.exports = sidebar
