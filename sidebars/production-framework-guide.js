const sidebar = [
  {
    label: "Production Framework Guide",
    type: "category",
    link: {
      type: "doc",
      id: "guides/production-framework/index",
    },
    items: [
      {
        label: "Ingredients",
        type: "category",
        link: {
          type: "doc",
          id: "guides/production-framework/ingredients/index",
        },
        items: [
          {
            label: "Service Catalog",
            type: "category",
            link: {
              type: "doc",
              id: "guides/production-framework/ingredients/service-catalog/index",
            },
            items: [
              "guides/production-framework/ingredients/service-catalog/modern-service-catalog",
              "guides/production-framework/ingredients/service-catalog/infrastructure-templates",
              "guides/production-framework/ingredients/service-catalog/application-templates",
            ],
          },
          {
            label: "Landing Zone",
            type: "category",
            link: {
              type: "doc",
              id: "guides/production-framework/ingredients/landing-zone/index",
            },
            items: [
              "guides/production-framework/ingredients/landing-zone/what-landing-zone-should-include",
              "guides/production-framework/ingredients/landing-zone/account-vending-machine",
            ],
          },
          {
            label: "CI / CD Pipeline",
            type: "category",
            link: {
              type: "doc",
              id: "guides/production-framework/ingredients/ci-cd-pipeline/index",
            },
            items: [
              "guides/production-framework/ingredients/ci-cd-pipeline/ci-cd-only-path-to-prod",
              "guides/production-framework/ingredients/ci-cd-pipeline/ci-cd-features",
            ],
          },
          {
            label: "Self-Service",
            type: "category",
            link: {
              type: "doc",
              id: "guides/production-framework/ingredients/self-service/index",
            },
            items: [
              "guides/production-framework/ingredients/self-service/how-self-service-should-work",
              "guides/production-framework/ingredients/self-service/common-self-service-use-cases",
            ],
          },
          {
            label: "Automatic Updates",
            type: "category",
            link: {
              type: "doc",
              id: "guides/production-framework/ingredients/automatic-updates/index",
            },
            items: [
              "guides/production-framework/ingredients/automatic-updates/how-auto-update-should-work",
              "guides/production-framework/ingredients/automatic-updates/auto-update-features",
            ],
          },
          {
            label: "Other Ingredients",
            type: "doc",
            id: "guides/production-framework/ingredients/other-ingredients/index",
          },
        ],
      },
      {
        label: "Recipes",
        type: "category",
        link: {
          type: "doc",
          id: "guides/production-framework/recipes/index",
        },
        items: [
          "guides/production-framework/recipes/dev-team-experience",
          "guides/production-framework/recipes/ops-team-experience",
        ],
      },
      {
        label: "How Gruntwork can help",
        type: "doc",
        id: "guides/production-framework/gruntwork-solutions/index",
      },
    ],
  },
]

module.exports = sidebar
