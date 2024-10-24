const sidebar = [
  {
    label: "Getting Started",
    type: "category",
    link: { type: 'generated-index', title: "Library Guides", slug: "2.0/getting-started"},
    collapsible: false,
    items: [
      {
        label: "The Gruntwork Methodology",
        type: "category",
        collapsed: false,
        link: { type: 'doc', id: '2.0/getting-started/welcome' },
        items: [
          {
            label: "Concepts",
            type: "doc",
            id: "2.0/getting-started/gruntworkmethodology/concepts",
          },
          {
            label: "Tools",
            type: "doc",
            id: "2.0/getting-started/gruntworkmethodology/tools",
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
            type: "doc",
            id: "2.0/getting-started/library/setup",
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
                label: "Installation",
                type: "category",
                collapsed: false,
                items: [
                  {
                    label: "Installation via GitHub App",
                    type: "doc",
                    id: "2.0/getting-started/pipelines/installation/viagithubapp",
                  },
                  {
                    label: "Installation via Machine Users",
                    type: "doc",
                    id: "2.0/getting-started/pipelines/installation/viamachineusers",
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
    ],
  },
]

module.exports = sidebar
