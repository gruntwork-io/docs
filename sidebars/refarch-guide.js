const refarchSidebar = [
  {
    label: "Reference Architecture Guides",
    type: "link",
    href: "/docs/guides/reference-architecture-index",
    className: "back-button",
  },
  {
    label: "Reference Architecture Guide",
    type: "category",
    link: {
      type: "doc",
      id: "guides/reference-architecture/index",
    },
    items: [
      {
        Authentication: [
          "guides/reference-architecture/authenticate/intro",
          "guides/reference-architecture/authenticate/setting-up-initial-access",
          "guides/reference-architecture/authenticate/authenticate-to-the-aws-web-console",
          "guides/reference-architecture/authenticate/authenticate-to-aws-via-the-cli",
          "guides/reference-architecture/authenticate/authenticate-to-ec2-instances-via-ssh",
          "guides/reference-architecture/authenticate/authenticate-to-the-vpn-server",
        ],
      },
      {
        "Deploying Your Apps": [
          "guides/reference-architecture/deploy-apps/intro",
          "guides/reference-architecture/deploy-apps/what-is-already-deployed",
          "guides/reference-architecture/deploy-apps/the-app",
          "guides/reference-architecture/deploy-apps/dockerizing",
          "guides/reference-architecture/deploy-apps/publish-docker-image",
        ],
      },
      {
        "Configure Gruntwork Pipelines": [
          "guides/reference-architecture/configure-gw-pipelines/intro",
          "guides/reference-architecture/configure-gw-pipelines/ci--cd-pipeline-for-infrastructure-code",
          "guides/reference-architecture/configure-gw-pipelines/ci--cd-pipeline-for-app-code",
          "guides/reference-architecture/configure-gw-pipelines/update-the-ci--cd-pipeline-itself",
        ],
      },
      {
        "Monitoring, Alerting & Logging": [
          "guides/reference-architecture/monitoring-alerting-logging/intro",
          "guides/reference-architecture/monitoring-alerting-logging/metrics",
          "guides/reference-architecture/monitoring-alerting-logging/alerts",
          "guides/reference-architecture/monitoring-alerting-logging/logs",
        ],
      },
      {
        "Adding a New Account": [
          "guides/reference-architecture/adding-a-new-account/intro",
          "guides/reference-architecture/adding-a-new-account/create-new-account-in-your-aws-org",
          "guides/reference-architecture/adding-a-new-account/update-logs-security-shared-accounts-to-allow-cross-account-access",
          "guides/reference-architecture/adding-a-new-account/deploy-the-security-baseline",
          "guides/reference-architecture/adding-a-new-account/deploy-the-ecs-deploy-runner",
        ],
      },
      {
        "Undeploying Your Architecture": [
          "guides/reference-architecture/undeploy/intro",
          "guides/reference-architecture/undeploy/before-you-get-started",
          "guides/reference-architecture/undeploy/pre-requisite-force-destroy-on-s3-buckets",
          "guides/reference-architecture/undeploy/pre-requisite-understand-module-dependencies",
          "guides/reference-architecture/undeploy/manually-undeploying-a-single-module",
          "guides/reference-architecture/undeploy/manually-undeploying-multiple-modules-or-an-entire-environment",
          "guides/reference-architecture/undeploy/removing-the-terraform-state",
          "guides/reference-architecture/undeploy/useful-tips",
          "guides/reference-architecture/undeploy/known-errors",
        ],
      },
    ],
  },
]

module.exports = refarchSidebar
