const refarchUsageSidebar = [
  {
    label: "Reference Architecture Guides",
    type: "link",
    href: "/guides/reference-architecture",
    className: "back-button",
  },
  {
    label: "Reference Architecture Usage",
    type: "category",
    link: {
      type: "doc",
      id: "guides/reference-architecture/example-usage-guide/index",
    },
    items: [
      {
        Authentication: [
          "guides/reference-architecture/example-usage-guide/authenticate/intro",
          "guides/reference-architecture/example-usage-guide/authenticate/setting-up-initial-access",
          "guides/reference-architecture/example-usage-guide/authenticate/authenticate-to-the-aws-web-console",
          "guides/reference-architecture/example-usage-guide/authenticate/authenticate-to-aws-via-the-cli",
          "guides/reference-architecture/example-usage-guide/authenticate/authenticate-to-ec2-instances-via-ssh",
          "guides/reference-architecture/example-usage-guide/authenticate/authenticate-to-the-vpn-server",
        ],
      },
      {
        "Deploying Your Apps": [
          "guides/reference-architecture/example-usage-guide/deploy-apps/intro",
          "guides/reference-architecture/example-usage-guide/deploy-apps/what-is-already-deployed",
          "guides/reference-architecture/example-usage-guide/deploy-apps/the-app",
          "guides/reference-architecture/example-usage-guide/deploy-apps/dockerizing",
          "guides/reference-architecture/example-usage-guide/deploy-apps/publish-docker-image",
        ],
      },
      {
        "Configure Gruntwork Pipelines": [
          "guides/reference-architecture/example-usage-guide/configure-gw-pipelines/intro",
          "guides/reference-architecture/example-usage-guide/configure-gw-pipelines/ci--cd-pipeline-for-infrastructure-code",
          "guides/reference-architecture/example-usage-guide/configure-gw-pipelines/ci--cd-pipeline-for-app-code",
          "guides/reference-architecture/example-usage-guide/configure-gw-pipelines/update-the-ci--cd-pipeline-itself",
        ],
      },
      {
        "Monitoring, Alerting & Logging": [
          "guides/reference-architecture/example-usage-guide/monitoring-alerting-logging/intro",
          "guides/reference-architecture/example-usage-guide/monitoring-alerting-logging/metrics",
          "guides/reference-architecture/example-usage-guide/monitoring-alerting-logging/alerts",
          "guides/reference-architecture/example-usage-guide/monitoring-alerting-logging/logs",
        ],
      },
      {
        "Adding a New Account": [
          "guides/reference-architecture/example-usage-guide/adding-a-new-account/intro",
          "guides/reference-architecture/example-usage-guide/adding-a-new-account/create-new-account-in-your-aws-org",
          "guides/reference-architecture/example-usage-guide/adding-a-new-account/update-logs-security-shared-accounts-to-allow-cross-account-access",
          "guides/reference-architecture/example-usage-guide/adding-a-new-account/deploy-the-security-baseline",
          "guides/reference-architecture/example-usage-guide/adding-a-new-account/deploy-the-ecs-deploy-runner",
        ],
      },
      {
        "Undeploying Your Architecture": [
          "guides/reference-architecture/example-usage-guide/undeploy/intro",
          "guides/reference-architecture/example-usage-guide/undeploy/before-you-get-started",
          "guides/reference-architecture/example-usage-guide/undeploy/pre-requisite-force-destroy-on-s3-buckets",
          "guides/reference-architecture/example-usage-guide/undeploy/pre-requisite-understand-module-dependencies",
          "guides/reference-architecture/example-usage-guide/undeploy/manually-undeploying-a-single-module",
          "guides/reference-architecture/example-usage-guide/undeploy/manually-undeploying-multiple-modules-or-an-entire-environment",
          "guides/reference-architecture/example-usage-guide/undeploy/removing-the-terraform-state",
          "guides/reference-architecture/example-usage-guide/undeploy/useful-tips",
          "guides/reference-architecture/example-usage-guide/undeploy/known-errors",
        ],
      },
    ],
  },
]

module.exports = refarchUsageSidebar
