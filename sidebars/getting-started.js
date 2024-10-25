const sidebar = [
  {
    label: "Getting Started",
    type: "category",
    link: { type: 'generated-index', title: "Library Guides", slug: "2.0/getting-started" },
    collapsible: false,
    items: [
      {
        label: "Concepts",
        type: "category",
        collapsed: false,
        link: { type: 'generated-index', title: "Gruntwork Concepts", slug: "2.0/getting-started/gruntworkmethodology" },
        items: [
          {
            label: "Devops Foundations",
            type: "doc",
            id: "2.0/getting-started/gruntworkmethodology/concepts/devopsfoundations",
          }
        ]
      },

      {
        label: "Gruntwork Pipelines",
        type: "category",
        collapsed: true,
        link: { type: 'generated-index', title: "Getting Started with Gruntwork Pipelines", slug: "2.0/getting-started/pipelines" },
        items: [
          {
            label: "Concepts",
            type: "category",
            collapsed: true,
            link: { type: 'generated-index', title: "Gruntwork Pipelines Concepts", slug: "2.0/getting-started/pipelines/concepts/" },
            items: [
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
            link: { type: 'generated-index', title: "Gruntwork Pipelines Architecture", slug: "2.0/getting-started/pipelines/concepts2/" },
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
            link: { type: 'generated-index', title: "Setting up and Installing Gruntwork Pipelines", slug: "2.0/getting-started/pipelines/installation/" },
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
                link: { type: 'generated-index', title: "Gruntwork Pipelines Configuration", slug: "2.0/getting-started/pipelines/configuration/" },
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
            link: { type: 'generated-index', title: "Gruntwork Pipelines Tutorials", slug: "2.0/getting-started/pipelines/tutorials/" },
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
            type: "link",
            className: 'external-link',
            href: '/2.0/guides/pipelines',
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
        link: { type: 'generated-index', title: "Getting Started with Gruntwork Account Factory", slug: "2.0/getting-started/accountfactory" },
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
            type: "link",
            className: 'external-link',
            href: '/2.0/guides/accountfactory',
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
        label: "Gruntwork Patcher",
        type: "category",
        link: { type: 'generated-index', title: "Getting Started with Gruntwork Patcher", slug: "2.0/getting-started/patcher" },
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
            type: "link",
            className: 'external-link',
            href: '/2.0/guides/patcher',
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
        label: "Gruntwork Library",
        type: "category",
        collapsed: true,
        link: { type: 'generated-index', title: "Getting Started with the Gruntwork Library", slug: "2.0/getting-started/library" },
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
            link: { type: 'generated-index', title: "Library Guides", slug: "2.0/getting-started/library/architecture" },
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
            link: { type: 'generated-index', title: "Library Guides", slug: "2.0/getting-started/library/setup" },
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
            type: "link",
            className: 'external-link',
            href: '/2.0/guides/library',
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
        type: "ref",
        id: "tools",
        className: 'external-link',
      },
    ],
  },

]

module.exports = sidebar
