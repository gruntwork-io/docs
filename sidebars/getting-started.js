const sidebar = [
  {
    label: "Getting Started",
    type: "category",
    collapsible: false,
    items: [
      {
        label: "The Gruntwork Methodology",
        type: "category",
        collapsed: true,
        link: {type: 'doc', id: '2.0/getting-started/welcome'},
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
        items: [
          {
            label: "Concepts",
            type: "doc",
            id: "2.0/getting-started/library/concepts",
          },
          {
            label: "Architecture",
            type: "doc",
            id: "2.0/getting-started/library/architecture",
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
          }
        ],
      },
      {
        label: "Gruntwork Pipelines",
        type: "category",
        collapsed: true,
        items: [
          {
            label: "Concepts",
            type: "category",
            collapsed: true,
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
            type: "ref",
            className: 'external-link',
            id: '2.0/guides/pipelines/index',
          },
          {
            label: "Guides2.0",
            type: "link",

            href: 'http://google.com',
          }
        ],
      },
      {
        label: "Gruntwork Patcher",
        type: "category",
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
          }
        ],
      },
      {
        label: "Account Factory",
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
        ],
      },
    ],
  },
]

module.exports = sidebar
