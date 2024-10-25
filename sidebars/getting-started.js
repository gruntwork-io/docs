const sidebar = [
  {
    label: "Gruntwork Documentation",
    type: "category",
    link: { type: 'generated-index', title: "Library Guides", slug: "2.0/getting-started" },
    collapsible: false,
    items: [
      {
        label: "Overview",
        type: "category",
        collapsed: false,
        link: { type: 'generated-index', title: "Concepts", slug: "2.0/getting-started/gruntworkmethodology" },
        items: [
          {
            label: "Devops Foundations",
            type: "doc",
            id: "2.0/docs/overview/devopsfoundations",
          },
          {
            label: "Getting Started",
            type: "doc",
            id: "2.0/docs/overview/gettingstarted",
          },
          {
            label: "Support",
            type: "doc",
            id: "support",
          }
        ]
      },
      {
        label: "Pipelines",
        type: "category",
        collapsed: true,
        link: { type: 'generated-index', title: "Getting Started with Pipelines", slug: "2.0/getting-started/pipelines" },
        items: [
          {
            label: "Concepts",
            type: "category",
            collapsed: true,
            link: { type: 'generated-index', title: "Pipelines Concepts", slug: "2.0/getting-started/pipelines/concepts/" },
            items: [
              {
                label: 'Overview',
                type: 'doc',
                id: '2.0/getting-started/pipelines/concepts/cicd-for-infrastructure',
              },
              {
                label: 'CI/CD for Infrastructure',
                type: 'doc',
                id: '2.0/getting-started/pipelines/concepts/cicd-for-infrastructure',
              },
              {
                label: 'Security',
                type: 'doc',
                id: '2.0/getting-started/pipelines/concepts/security',
              },
              {
                label: 'Drift Detection',
                type: 'doc',
                id: '2.0/getting-started/pipelines/concepts/driftdetection',
              }
            ]
          },
          {
            label: "Architecture",
            type: "category",
            collapsed: true,
            link: { type: 'generated-index', title: "Pipelines Architecture", slug: "2.0/getting-started/pipelines/concepts2/" },
            items: [
              {
                label: 'Overview',
                type: 'doc',
                id: "2.0/getting-started/pipelines/architecture",
              }
            ]
          },
          {
            label: "Setup & Installation",
            type: "category",
            collapsed: true,
            link: { type: 'generated-index', title: "Setting up and Installing Pipelines", slug: "2.0/getting-started/pipelines/installation/" },
            items: [

              {
                label: "Prerequisites",
                type: "category",
                collapsed: false,
                items: [
                  {
                    label: "AWS Landing Zone",
                    type: "doc",
                    id: "2.0/getting-started/pipelines/installation/prerequisites/awslandingzone",
                  },
                ]
              },
              {
                type: "category",
                label: "Enable Auth for Pipelines",
                collapsed: false,
                items: [
                  {
                    label: "Auth via GitHub App",
                    type: "doc",
                    id: "2.0/getting-started/pipelines/installation/viagithubapp",
                  },
                  {
                    label: "Auth via Machine Users",
                    type: "doc",
                    id: "2.0/getting-started/pipelines/installation/viamachineusers",
                  },
                ]
              },
              {
                type: "category",
                label: "Setting up a Repository with Pipelines",
                collapsed: false,
                items: [
                  {
                    label: "Creating a New Repository with Pipelines",
                    type: "doc",
                    id: "2.0/getting-started/pipelines/installation/addingnewrepo",
                  },
                  {
                    label: "Adding Pipelines to an Existing Repository",
                    type: "doc",
                    id: "2.0/getting-started/pipelines/installation/addingexistingrepo",
                  },
                ]
              },
              {
                label: "Configuration",
                type: "category",
                collapsed: false,
                link: { type: 'generated-index', title: "Pipelines Configuration", slug: "2.0/getting-started/pipelines/configuration/" },
                items: [
                  {
                    label: "Setting up Drift Detection",
                    type: "doc",
                    id: "2.0/getting-started/pipelines/configuration/driftdetection",
                  },
                  {
                    label: "Customizing & Extending Pipelines",
                    type: "doc",
                    id: "2.0/getting-started/pipelines/configuration/customizing",
                  },
                ]
              }
            ]
          },
          {
            label: "Tutorials",
            type: "category",
            collapsed: true,
            link: { type: 'generated-index', title: "Pipelines Tutorials", slug: "2.0/getting-started/pipelines/tutorials/" },
            items: [
              {
                label: "Deploy your first infrastructure change with Pipelines",
                type: "doc",
                id: "2.0/getting-started/pipelines/tutorials/deploying-your-first-infrastructure-change",
              },
              {
                label: "Destroying infrastructure with Pipelines",
                type: "doc",
                id: "2.0/getting-started/pipelines/tutorials/destroying-infrastructure",
              }
            ]
          },
          {
            label: "Guides",
            type: "category",
            collapsed: true,
            link: { type: 'generated-index', title: "Pipelines Guides", slug: "2.0/getting-started/pipelines/guides/" },
            items: [
              {
                label: "Managing Secrets in your Pipelines",
                type: "doc",
                id: "2.0/guides/pipelines/managing-secrets",
              },
              {
                label: "Updating Pipelines",
                type: "doc",
                id: "2.0/guides/pipelines/updating-pipelines",
              },
              {
                label: "Configuration Reference",
                type: "link",
                className: 'external-link',
                href: '/2.0/reference/pipelines',
              },
            ],
          },
          {
            label: "Configuration Reference",
            type: "link",
            className: 'external-link',
            href: '/2.0/reference/pipelines',
          },
        ],
      },
      {
        label: "Account Factory",
        link: { type: 'generated-index', title: "Getting Started with Account Factory", slug: "2.0/getting-started/accountfactory" },
        type: "category",
        collapsed: true,
        items: [
          {
            label: "Concepts",
            type: "doc",
            id: "2.0/getting-started/accountfactory/concepts",
          },
          {
            label: "Architecture",
            type: "doc",
            id: "2.0/getting-started/accountfactory/architecture",
          },
          {
            label: "Setup & Installation",
            type: "doc",
            id: "2.0/getting-started/accountfactory/setup",
          },
          {
            label: "Guides",
            type: "category",
            collapsed: true,
            link: { type: 'generated-index', title: "Account Factory Guides", slug: "2.0/guides/accountfactory" },
            items: [
              {
                label: "Customizing something",
                type: "doc",
                id: "2.0/guides/accountfactory/index",
              },
              {
                label: "Configuration Reference",
                type: "link",
                className: 'external-link',
                href: '/2.0/reference/accountfactory',
              },
            ],
          },
          {
            label: "Configuration Reference",
            type: "link",
            className: 'external-link',
            href: '/2.0/reference/accountfactory',
          },
        ],
      },
      {
        label: "Patcher",
        type: "category",
        link: { type: 'generated-index', title: "Getting Started with Patcher", slug: "2.0/getting-started/patcher" },
        collapsed: true,
        items: [
          {
            label: "Concepts",
            type: "doc",
            id: "2.0/getting-started/patcher/concepts",
          },
          {
            label: "Architecture",
            type: "doc",
            id: "2.0/getting-started/patcher/architecture",
          },
          {
            label: "Setup & Installation",
            type: "doc",
            id: "2.0/getting-started/patcher/setup",
          },
          {
            label: "Tutorials",
            type: "category",
            collapsed: true,
            items: [
              {
                label: "Applying your first patch",
                type: "doc",
                id: "2.0/getting-started/patcher/tutorials/applying-first-patch",
              },
              {
                label: "Authoring your first patch",
                type: "doc",
                id: "2.0/getting-started/patcher/tutorials/authoring-first-patch",
              }
            ]
          },
          {
            label: "Guides",
            type: "category",
            collapsed: true,
            link: { type: 'generated-index', title: "Patcher Guides", slug: "2.0/guides/patcher" },
            items: [
              {
                label: "Setting up Promotion Workflows",
                type: "doc",
                id: "2.0/guides/patcher/promotion-workflows",
              },
              {
                label: "Configuration Reference",
                type: "link",
                className: 'external-link',
                href: '/2.0/reference/patcher',
              },
            ]
          },
          {
            label: "Configuration Reference",
            type: "link",
            className: 'external-link',
            href: '/2.0/reference/patcher',
          },
        ],
      },

      {
        label: "Library",
        type: "category",
        collapsed: true,
        link: { type: 'generated-index', title: "Getting Started with the Library", slug: "2.0/getting-started/library" },
        items: [
          {
            label: "Concepts",
            type: "category",
            collapsed: true,
            link: { type: 'generated-index', title: "Library Guides", slug: "2.0/getting-started/library/concepts" },
            items: [
              {
                label: "Service Modules",
                type: "doc",
                id: "2.0/getting-started/library/concepts/servicemodules",
              }
            ]
          },
          {
            label: "Architecture",
            type: "category",
            collapsed: true,
            link: { type: 'generated-index', title: "Library Architecture", slug: "2.0/getting-started/library/architecture" },
            items: [
              {
                label: "Overview",
                type: "doc",
                id: "2.0/getting-started/library/architecture/overview",
              }
            ]
          },
          {
            label: "Setup & Installation",
            type: "category",
            collapsed: true,
            link: { type: 'generated-index', title: "Library Setup & Installation", slug: "2.0/getting-started/library/setup" },
            items: [
              {
                label: "Overview",
                type: "doc",
                id: "2.0/getting-started/library/setup/overview",
              }
            ]
          },
          {
            label: "Tutorials",
            type: "category",
            collapsed: true,
            items: [
              {
                label: "Deploying your first Gruntwork Module",
                type: "doc",
                id: "2.0/getting-started/library/tutorials/deploying-your-first-gruntwork-module",
              }
            ]
          },
          {
            label: "Guides",
            type: "category",
            collapsed: true,
            link: { type: 'generated-index', title: "Library Guides", slug: "2.0/getting-started/library/guides" },
            items: [
              {
                label: "Create your own Service Module",
                type: "doc",
                id: "2.0/guides/library/create-service-module",
              },
              {
                label: "Customize a Module",
                type: "doc",
                id: "2.0/guides/library/customize-module",
              },
              {
                label: "Integrate with Terraform Cloud",
                type: "doc",
                id: "2.0/guides/library/integrate-tfc",
              },
              {
                label: "Contributing to the Library",
                type: "doc",
                id: "2.0/guides/library/contributing",
              },
              {
                label: "Self-Hosting the Library",
                type: "doc",
                id: "2.0/guides/library/self-hosting",
              },
              {
                label: "Updating a module to a newer version",
                type: "doc",
                id: "2.0/guides/library/updating-modules",
              },
              {
                label: "Module Reference",
                type: "link",
                className: 'external-link',
                href: '/2.0/reference/library',
              },
            ],
          },
          {
            label: "Module Reference",
            type: "link",
            className: 'external-link',
            href: '/2.0/reference/library',
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
    ],
  },

]

module.exports = sidebar
