
export const redirects = [
    // BEGIN - Deleted / Moved Content
    {
        from: '/docs/guides/build-it-yourself/landing-zone',
        to: '/reference/services/landing-zone/aws-app-account-baseline-wrapper/'
    },
    {
        from: '/reference/services/intro/overview',
        to: '/2.0/docs/library/concepts/service-modules'
    },
    {
        from: '/foundations/github-app',
        to: '/2.0/docs/pipelines/installation/viagithubapp'
    },
    {
        to: '/2.0/docs/pipelines/architecture/audit-logs',
        from: '/pipelines/security/audit-log'
    },
    {
        to: "/2.0/docs/overview/getting-started/invite-team",
        from: "/developer-portal/invite-team"
    },
    {
        to: "/2.0/docs/overview/getting-started/create-account",
        from: "/developer-portal/create-account"
    },
    {
        to: "/2.0/docs/overview/getting-started/link-github-id",
        from: "/developer-portal/link-github-id"
    },
    {
        to: "/2.0/docs/pipelines/architecture/components",
        from: "/pipelines/architecture/index"
    },
    {
        to: "/2.0/docs/pipelines/architecture/components",
        from: "/pipelines/architecture"
    },
    {
        to: "/2.0/docs/pipelines/previous-versions/upgrading-from-ecs-deploy-runner",
        from: "/pipelines/upgrading/upgrading-from-infrastructure-pipelines"
    },
    {
        to: "/2.0/docs/pipelines/previous-versions/upgrading-from-infrastructure-pipelines",
        from: "/pipelines/upgrading/upgrading-from-ecs-deploy-runner"
    },
    {
        to: "/2.0/docs/pipelines/guides/extending-pipelines",
        from: "/pipelines/maintain/extending"
    },
    {
        to: "/2.0/docs/pipelines/guides/updating-pipelines",
        from: "/pipelines/maintain/updating"
    },
    {
        to: "/2.0/docs/pipelines/concepts/drift-detection",
        from: "/pipelines/maintain/drift-detection"
    },
    {
        to: "/2.0/docs/pipelines/architecture/actions",
        from: "/pipelines/overview/actions"
    },
    {
        to: "/2.0/docs/pipelines/concepts/overview",
        from: "/pipelines/overview/index"
    },
    {
        to: "/2.0/reference/pipelines/configurations-as-code",
        from: "/pipelines/overview/configurations-as-code"
    },
    {
        to: "/2.0/reference/pipelines/configurations",
        from: "/pipelines/overview/configurations"
    },
    {
        to: "/2.0/docs/pipelines/installation/branch-protection",
        from: "/pipelines/security/branch-protection"
    },
    {
        to: "/2.0/docs/pipelines/installation/viamachineusers#repository-access",
        from: "/pipelines/security/repository-access"
    },
    {
        to: "/2.0/docs/pipelines/architecture/security-controls",
        from: "/pipelines/security/controls"
    },
    {
        to: "/2.0/docs/pipelines/installation/viamachineusers#creating-machine-users",
        from: "/pipelines/security/machine-users"
    },
    {
        to: "/2.0/docs/pipelines/guides/managing-secrets",
        from: "/pipelines/security/secrets"
    },
    {
        to: "/2.0/docs/pipelines/architecture/usage-data",
        from: "/pipelines/data-collection/index"
    },
    {
        to: "/2.0/docs/pipelines/architecture/usage-data",
        from: "/pipelines/data-collection"
    },
    {
        to: "/2.0/docs/overview/concepts/devopsfoundations",
        from: "/foundations/overview/index"
    },
    {
        to: "/2.0/docs/overview/concepts/devopsfoundations",
        from: "/foundations/overview"
    },
    {
        to: "/2.0/docs/pipelines/concepts/cloud-auth/aws",
        from: "/foundations/pipelines/aws-authentication"
    },
    {
        to: "/2.0/docs/pipelines/concepts/overview",
        from: "/foundations/pipelines/"
    },
    {
        to: "/2.0/docs/accountfactory/architecture/network-topology",
        from: "/foundations/network-topology/index"
    },
    {
        to: "/2.0/docs/accountfactory/architecture/network-topology",
        from: "/foundations/network-topology"
    },
    {
        to: "/2.0/docs/pipelines/installation/viagithubapp",
        from: "/foundations/github-app/configuration"
    },
    {
        to: "/2.0/docs/pipelines/installation/viagithubapp",
        from: "/foundations/github-app/availability"
    },
    {
        to: "/2.0/docs/pipelines/installation/viagithubapp",
        from: "/foundations/github-app/architecture"
    },
    {
        to: "/2.0/docs/pipelines/installation/viagithubapp",
        from: "/foundations/github-app/setup"
    },
    {
        to: "/2.0/docs/pipelines/installation/viagithubapp",
        from: "/foundations/github-app/faq"
    },
    {
        to: "/2.0/docs/library/guides/running-apps",
        from: "/foundations/running-apps/index"
    },
    {
        to: "/2.0/docs/library/guides/running-apps",
        from: "/foundations/running-apps"
    },
    {
        to: "/2.0/docs/pipelines/installation/prerequisites/awslandingzone#prerequisites",
        from: "/foundations/landing-zone/prerequisites"
    },
    {
        to: "/2.0/docs/pipelines/installation/prerequisites/awslandingzone",
        from: "/foundations/landing-zone/index"
    },
    {
        to: "/2.0/docs/pipelines/installation/prerequisites/awslandingzone",
        from: "/foundations/landing-zone"
    },
    {
        to: "/2.0/docs/accountfactory/guides/vend-aws-account",
        from: "/foundations/landing-zone/add-aws-account"
    },
    {
        to: "/2.0/docs/pipelines/installation/prerequisites/awslandingzone#configure-control-tower",
        from: "/foundations/landing-zone/enable-control-tower"
    },
    {
        to: "/2.0/docs/accountfactory/architecture/logging",
        from: "/foundations/landing-zone/logging"
    },
    {
        to: "/2.0/docs/accountfactory/tutorials/remove-account",
        from: "/foundations/landing-zone/manage-accounts"
    },
    {
        to: "/2.0/docs/overview/concepts/labels-tags",
        from: "/foundations/iac-foundations/labels-tags"
    },
    {
        to: "/2.0/docs/overview/concepts/infrastructure-live",
        from: "/foundations/iac-foundations/index"
    },
    {
        to: "/2.0/docs/pipelines/architecture",
        from: "/foundations/iac-foundations/architecture"
    },
    {
        to: "/2.0/docs/overview/concepts/infrastructure-live",
        from: "/foundations/iac-foundations/folder-structure"
    },
    {
        to: "/2.0/docs/pipelines/installation/addingnewrepo",
        from: "/foundations/iac-foundations/initial-setup"
    },
    {
        to: "/2.0/docs/pipelines/installation/addingnewrepo",
        from: "/foundations/iac-foundations"
    },
    {
        to: "/2.0/docs/library/concepts/module-defaults",
        from: "/foundations/iac-foundations/module_defaults/index"
    },
    {
        to: "/2.0/docs/library/concepts/module-defaults",
        from: "/foundations/iac-foundations/module_defaults"
    },
    {
        to: "/2.0/docs/library/tutorials/module-defaults#using-module-defaults",
        from: "/foundations/iac-foundations/module_defaults/usage"
    },
    {
        to: "/2.0/docs/library/tutorials/module-defaults#defining-module-defaults",
        from: "/foundations/iac-foundations/module_defaults/defining"
    },
    {
        to: "/2.0/docs/patcher/concepts/",
        from: "/patcher"
    },
    {
        to: "/2.0/docs/patcher/concepts/update-strategies",
        from: "/patcher/update-strategies"
    },
    {
        to: "/2.0/docs/patcher/installation/",
        from: "/patcher/getting-started"
    },
    {
        to: "/2.0/docs/patcher/guides/promotion-workflows",
        from: "/patcher/getting-started/promotion-workflows"
    },
    {
        to: "/2.0/docs/patcher/guides/telemetry",
        from: "/patcher/getting-started/telemetry"
    },
    {
        to: "/2.0/docs/patcher/guides/update",
        from: "/patcher/running-patcher/update"
    },
    {
        to: "/2.0/docs/patcher/guides/report",
        from: "/patcher/running-patcher/report"
    },
    {
        to: "/2.0/docs/patcher/guides/upgrade",
        from: "/patcher/running-patcher/upgrade"
    },
    {
        to: "/2.0/docs/library/tutorials/deploying-your-first-gruntwork-module",
        from: "/library/getting-started/deploying-a-module"
    },
    {
        to: "/2.0/docs/library/setup/setting-up",
        from: "/library/getting-started/setting-up"
    },
    {
        to: "/2.0/docs/library/setup/accessing-the-code",
        from: "/library/getting-started/accessing-the-code"
    },
    {
        to: "/2.0/docs/library/concepts/service-modules",
        from: "/library/overview/services"
    },
    {
        to: "/2.0/docs/library/concepts/overview",
        from: "/library/overview"
    },
    {
        to: "/2.0/docs/library/concepts/modules",
        from: "/library/overview/modules"
    },
    {
        to: "/2.0/docs/library/guides/updating-modules",
        from: "/library/stay-up-to-date/updating"
    },
    {
        to: "/2.0/docs/library/guides/versioning",
        from: "/library/stay-up-to-date/versioning"
    },
    {
        to: "/2.0/docs/library/concepts/principles/be-judicious-with-new-features",
        from: "/library/principles/be-judicious-with-new-features"
    },
    {
        to: "/2.0/docs/library/concepts/principles/control-provider-usage",
        from: "/library/principles/control-provider-usage"
    },
    {
        to: "/2.0/docs/library/concepts/principles/quality-in-depth",
        from: "/library/principles/quality-in-depth"
    },
    {
        to: "/2.0/docs/library/concepts/principles/overview",
        from: "/library/principles/overview"
    },
    {
        to: "/2.0/docs/library/tutorials/customizing-modules",
        from: "/library/usage/customizing-modules"
    },
    {
        to: "/2.0/docs/library/guides/integrate-tfc",
        from: "/library/usage/tfc-integration"
    },
    {
        to: "/2.0/docs/library/guides/contributing",
        from: "/library/usage/contributing"
    },
    {
        to: "/2.0/docs/library/tutorials/creating-service-module",
        from: "/library/usage/composing-your-own-service"
    },
    {
        to: "/2.0/docs/library/architecture/opentofu-terraform-compatibility",
        from: "/library/usage/opentofu-terraform-compatibility"
    },
    {
        to: "/2.0/docs/library/guides/self-hosting",
        from: "/library/usage/self-hosting"
    },
    {
        to: "/2.0/docs/library/tutorials/deploying-your-first-gruntwork-module",
        from: "/library/usage/using-the-library"
    },
    {
        to: "/2.0/docs/library/tutorials/deploying-your-first-gruntwork-module",
        from: "/reference/services/intro/deploy-new-infrastructure"
    },
    {
        from: '/guides',
        to: 'index',
    },
    {
        from: '/intro/overview/getting-started',
        to: '/2.0/docs/overview/concepts/devopsfoundations'
    },
    {
        from: '/intro/overview/intro-to-gruntwork',
        to: '/2.0/docs/overview/concepts/devopsfoundations'
    },
    {
        from: '/intro/overview/prerequisites',
        to: '/2.0/docs/overview/concepts/devopsfoundations'
    },
    {
        from: '/intro/overview/what-you-provide',
        to: '/2.0/docs/overview/concepts/devopsfoundations'
    },
    {
        from: '/intro/overview/what-we-provide',
        to: '/2.0/docs/overview/concepts/devopsfoundations'
    },
    {
        from: '/2.0/docs/accountfactory/tutorials/vend-aws-account',
        to: '/2.0/docs/accountfactory/guides/vend-aws-account'
    },
    {
        from: '/guides/index',
        to: '/'
    },
    {
        from: '/2.0/docs/pipelines/architecture/github-workflows',
        to: '/2.0/docs/pipelines/architecture/ci-workflows'
    }
]
