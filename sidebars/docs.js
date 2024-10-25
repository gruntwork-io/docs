const sidebar = [
  {
    label: "Gruntwork Documentation",
    type: "category",
    link: { type: 'generated-index', title: "Library Guides", slug: "2.0/docs" },
    collapsible: false,
    items: [
      {
        label: "Overview",
        type: "category",
        collapsed: false,
        link: { type: 'generated-index', title: "Concepts", slug: "2.0/docs/gruntworkmethodology" },
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
        link: { type: 'generated-index', title: "Getting Started with Pipelines", slug: "2.0/docs/pipelines" },
        items: [
          {
            label: "Concepts",
            type: "category",
            collapsed: true,
            link: { type: 'generated-index', title: "Pipelines Concepts", slug: "2.0/docs/pipelines/concepts/" },
            items: [
              {
                label: 'Overview',
                type: 'doc',
                id: '2.0/docs/pipelines/concepts/cicd-for-infrastructure',
              },
              {
                label: 'CI/CD for Infrastructure',
                type: 'doc',
                id: '2.0/docs/pipelines/concepts/cicd-for-infrastructure',
              },
              {
                label: 'Security',
                type: 'doc',
                id: '2.0/docs/pipelines/concepts/security',
              },
              {
                label: 'Drift Detection',
                type: 'doc',
                id: '2.0/docs/pipelines/concepts/driftdetection',
              }
            ]
          },
          {
            label: "Architecture",
            type: "category",
            collapsed: true,
            link: { type: 'generated-index', title: "Pipelines Architecture", slug: "2.0/docs/pipelines/concepts2/" },
            items: [
              {
                label: 'Overview',
                type: 'doc',
                id: "2.0/docs/pipelines/architecture",
              }
            ]
          },
          {
            label: "Setup & Installation",
            type: "category",
            collapsed: true,
            link: { type: 'generated-index', title: "Setting up and Installing Pipelines", slug: "2.0/docs/pipelines/installation/" },
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
                    id: "2.0/docs/pipelines/installation/viagithubapp",
                  },
                  {
                    label: "Auth via Machine Users",
                    type: "doc",
                    id: "2.0/docs/pipelines/installation/viamachineusers",
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
                    id: "2.0/docs/pipelines/installation/addingnewrepo",
                  },
                  {
                    label: "Adding Pipelines to an Existing Repository",
                    type: "doc",
                    id: "2.0/docs/pipelines/installation/addingexistingrepo",
                  },
                ]
              },
              {
                label: "Configuration",
                type: "category",
                collapsed: false,
                link: { type: 'generated-index', title: "Pipelines Configuration", slug: "2.0/docs/pipelines/configuration/" },
                items: [
                  {
                    label: "Setting up Drift Detection",
                    type: "doc",
                    id: "2.0/docs/pipelines/configuration/driftdetection",
                  },
                  {
                    label: "Customizing & Extending Pipelines",
                    type: "doc",
                    id: "2.0/docs/pipelines/configuration/customizing",
                  },
                ]
              }
            ]
          },
          {
            label: "Tutorials",
            type: "category",
            collapsed: true,
            link: { type: 'generated-index', title: "Pipelines Tutorials", slug: "2.0/docs/pipelines/tutorials/" },
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
              }
            ]
          },
          {
            label: "Guides",
            type: "category",
            collapsed: true,
            link: { type: 'generated-index', title: "Pipelines Guides", slug: "2.0/docs/pipelines/guides/" },
            items: [
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
        link: { type: 'generated-index', title: "Getting Started with Account Factory", slug: "2.0/docs/accountfactory" },
        type: "category",
        collapsed: true,
        items: [
          {
            label: "Concepts",
            type: "category",
            collapsed: true,
            link: { type: 'generated-index', title: "Account Factory Concepts", slug: "2.0/docs/accountfactory/concepts" },
            items: [
              {
                label: "Overview",
                type: "doc",
                id: "2.0/docs/accountfactory/concepts/index",
              }
            ]
          },
          {
            label: "Architecture",
            type: "category",
            collapsed: true,
            link: { type: 'generated-index', title: "Account Factory Architecture", slug: "2.0/docs/accountfactory/architecture" },
            items: [
              {
                label: "Overview",
                type: "doc",
                id: "2.0/docs/accountfactory/architecture/index",
              }
            ]
          },
          {
            label: "Setup & Installation",
            type: "category",
            collapsed: true,
            link: { type: 'generated-index', title: "Account Factory Setup & Installation", slug: "2.0/docs/accountfactory/installation" },
            items: [
              {
                label: "Overview",
                type: "doc",
                id: "2.0/docs/accountfactory/installation/index",
              }
            ]
          },
          {
            label: "Guides",
            type: "category",
            collapsed: true,
            link: { type: 'generated-index', title: "Account Factory Guides", slug: "2.0/docs/accountfactory/guides" },
            items: [
              {
                label: "Customizing something",
                type: "doc",
                id: "2.0/docs/accountfactory/guides/index",
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
        link: { type: 'generated-index', title: "Getting Started with Patcher", slug: "2.0/docs/patcher" },
        collapsed: true,
        items: [
          {
            label: "Concepts",
            type: "category",
            collapsed: true,
            link: { type: 'generated-index', title: "Patcher Concepts", slug: "2.0/docs/patcher/concepts" },
            items: [
              {
                label: "Overview",
                type: "doc",
                id: "2.0/docs/patcher/concepts/index",
              }
            ]
          },
          {
            label: "Architecture",
            type: "category",
            collapsed: true,
            link: { type: 'generated-index', title: "Patcher Architecture", slug: "2.0/docs/patcher/architecture" },
            items: [
              {
                label: "Overview",
                type: "doc",
                id: "2.0/docs/patcher/architecture/index",
              }
            ]
          },
          {
            label: "Setup & Installation",
            type: "category",
            collapsed: true,
            link: { type: 'generated-index', title: "Patcher Setup & Installation", slug: "2.0/docs/patcher/installation" },
            items: [
              {
                label: "Overview",
                type: "doc",
                id: "2.0/docs/patcher/installation/index",
              }
            ]
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
              }
            ]
          },
          {
            label: "Guides",
            type: "category",
            collapsed: true,
            link: { type: 'generated-index', title: "Patcher Guides", slug: "2.0/docs/patcher/guides" },
            items: [
              {
                label: "Setting up Promotion Workflows",
                type: "doc",
                id: "2.0/docs/patcher/guides/promotion-workflows",
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
        link: { type: 'generated-index', title: "Getting Started with the Library", slug: "2.0/docs/library" },
        items: [
          {
            label: "Concepts",
            type: "category",
            collapsed: true,
            link: { type: 'generated-index', title: "Library Guides", slug: "2.0/docs/library/concepts" },
            items: [
              {
                label: "Service Modules",
                type: "doc",
                id: "2.0/docs/library/concepts/servicemodules",
              }
            ]
          },
          {
            label: "Architecture",
            type: "category",
            collapsed: true,
            link: { type: 'generated-index', title: "Library Architecture", slug: "2.0/docs/library/architecture" },
            items: [
              {
                label: "Overview",
                type: "doc",
                id: "2.0/docs/library/architecture/overview",
              }
            ]
          },
          {
            label: "Setup & Installation",
            type: "category",
            collapsed: true,
            link: { type: 'generated-index', title: "Library Setup & Installation", slug: "2.0/docs/library/setup" },
            items: [
              {
                label: "Overview",
                type: "doc",
                id: "2.0/docs/library/setup/overview",
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
                id: "2.0/docs/library/tutorials/deploying-your-first-gruntwork-module",
              }
            ]
          },
          {
            label: "Guides",
            type: "category",
            collapsed: true,
            link: { type: 'generated-index', title: "Library Guides", slug: "2.0/docs/library/guides" },
            items: [
              {
                label: "Create your own Service Module",
                type: "doc",
                id: "2.0/docs/library/guides/create-service-module",
              },
              {
                label: "Customize a Module",
                type: "doc",
                id: "2.0/docs/library/guides/customize-module",
              },
              {
                label: "Integrate with Terraform Cloud",
                type: "doc",
                id: "2.0/docs/library/guides/integrate-tfc",
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
                label: "Updating a module to a newer version",
                type: "doc",
                id: "2.0/docs/library/guides/updating-modules",
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
