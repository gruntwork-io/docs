const pipelineGuide = [
  {
    label: "Build Your Own Architecture",
    type: "link",
    href: "/guides/build-it-yourself",
    className: "back-button",
  },
  {
    label: "Pipelines Guide",
    type: "category",
    link: {
      type: "doc",
      id: "guides/build-it-yourself/pipelines/index",
    },
    items: [
      {
        "Core Concepts": [
          "guides/build-it-yourself/pipelines/core-concepts/what-is-continuous-integration-and-continuous-delivery",
          "guides/build-it-yourself/pipelines/core-concepts/why-is-it-important-to-have-ci-cd",
          "guides/build-it-yourself/pipelines/core-concepts/trunk-based-development-model",
          "guides/build-it-yourself/pipelines/core-concepts/types-of-infrastructure-code",
          "guides/build-it-yourself/pipelines/core-concepts/ci-cd-workflows",
          "guides/build-it-yourself/pipelines/core-concepts/threat-model-of-ci-cd",
          "guides/build-it-yourself/pipelines/core-concepts/ci-cd-platforms",
        ],
      },
      {
        "Production Grade Design": [
          "guides/build-it-yourself/pipelines/production-grade-design/intro",
          "guides/build-it-yourself/pipelines/production-grade-design/use-generic-ci-cd-platforms-as-a-workflow-engine-but-run-infrastructure-deployments-from-within-your-account",
          "guides/build-it-yourself/pipelines/production-grade-design/options-for-deploy-server",
          "guides/build-it-yourself/pipelines/production-grade-design/limit-triggers-for-deploy-server",
          "guides/build-it-yourself/pipelines/production-grade-design/use-a-vpc-to-lock-down-deploy-server",
          "guides/build-it-yourself/pipelines/production-grade-design/use-minimal-iam-permissions-for-a-deployment",
          "guides/build-it-yourself/pipelines/production-grade-design/use-approval-flows",
          "guides/build-it-yourself/pipelines/production-grade-design/lock-down-vcs-systems",
          "guides/build-it-yourself/pipelines/production-grade-design/summary-of-mitigations",
          "guides/build-it-yourself/pipelines/production-grade-design/summary-of-deployment-sequence",
        ],
      },
      {
        "Deployment walkthrough": [
          "guides/build-it-yourself/pipelines/deployment-walkthrough/pre-requisites",
          "guides/build-it-yourself/pipelines/deployment-walkthrough/deploy-a-vpc",
          "guides/build-it-yourself/pipelines/deployment-walkthrough/deploy-the-ecs-deploy-runner",
          "guides/build-it-yourself/pipelines/deployment-walkthrough/try-out-the-ecs-deploy-runner",
          "guides/build-it-yourself/pipelines/deployment-walkthrough/define-pipeline-as-code",
          "guides/build-it-yourself/pipelines/deployment-walkthrough/configure-ci-server",
        ],
      },
      "guides/build-it-yourself/pipelines/next-steps",
    ],
  },
]

module.exports = pipelineGuide
