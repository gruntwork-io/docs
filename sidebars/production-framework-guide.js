const refarchSidebar = [
  {
    label: "Production Framework Guide",
    type: "category",
    link: {
      type: "doc",
      id: "guides/production-framework/index",
    },
    items: [
      {
        "Ingredients": [
            {
              "Service Catalog": [
                "guides/production-framework/ingredients/service-catalog/intro",
                "guides/production-framework/ingredients/service-catalog/modern-service-catalog",
                "guides/production-framework/ingredients/service-catalog/infrastructure-templates-service-catalog-should-include",
                "guides/production-framework/ingredients/service-catalog/application-templates-service-catalog-should-include",
              ],
            },
            {
              "Landing Zone": [
                "guides/production-framework/ingredients/landing-zone/intro",
                "guides/production-framework/ingredients/landing-zone/what-landing-zone-should-include",
                "guides/production-framework/ingredients/landing-zone/account-vending-machine",
              ],
            },
            {
              "CI / CD Pipeline": [
                "guides/production-framework/ingredients/ci-cd-pipeline/intro",
                "guides/production-framework/ingredients/ci-cd-pipeline/ci-cd-only-path-to-prod",
                "guides/production-framework/ingredients/ci-cd-pipeline/ci-cd-features",
              ],
            },
            {
              "Self-Service": [
                "guides/production-framework/ingredients/self-service/intro",
                "guides/production-framework/ingredients/self-service/how-self-service-should-work",
                "guides/production-framework/ingredients/self-service/common-self-service-use-cases",
              ],
            },
            {
              "Automatic Updates": [
                "guides/production-framework/ingredients/automatic-updates/intro",
                "guides/production-framework/ingredients/automatic-updates/how-auto-update-should-work",
                "guides/production-framework/ingredients/automatic-updates/auto-update-features",
              ],
            },
            {
              "Other Ingredients": [
                "guides/production-framework/ingredients/other-ingredients/intro",
              ],
            },
        ]
      },
      {
        "Recipes": [
          "guides/production-framework/recipes/intro",
          "guides/production-framework/recipes/dev-team-experience",
          "guides/production-framework/recipes/ops-team-experience",
        ]
      },
      {
        "How Gruntwork can help": [
          "guides/production-framework/gruntwork-solutions/intro",
        ]
      },
    ],
  },
]

module.exports = refarchSidebar
