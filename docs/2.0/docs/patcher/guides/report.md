# Patcher Report

Starting in `0.4.2`, Patcher supports two modes: **interactive mode** and **non-interactive mode**.

In interactive mode, the user can browse the discovered module dependencies.

In non-interactive mode, Patcher outputs a list of module dependencies in JSON format.

## Interactive Mode (Default)
Example usage:
```
patcher report prod
```

The `patcher report` command is a read-only version of Patcher that shows the changelog per module and its usages.

After scanning for dependencies, Patcher will show you the 'Modules View', similar to the screenshot below.

![Patcher report screenshot](/img/guides/stay-up-to-date/patcher/patcher-report-overview-futd.png)

### Navigation commands

1. While in the modules view, press `u` to see the usages. It shows all places where module is being used:

![Patcher usages screenshot](/img/guides/stay-up-to-date/patcher/patcher-report-usages.png)

2. While in the modules view, press `v` to see the changelogs from a module. Press `o` to open the page in the browser.

![Patcher changelogs screenshot](/img/guides/stay-up-to-date/patcher/patcher-report-changelog.png)

Some modules including third party modules may not have a CHANGELOGS.md file. In this case, press `o` to open the releases page for that repository.

![Patcher no changelogs screenshot](/img/guides/stay-up-to-date/patcher/patcher-report-no-changelog.png)

## Non-Interactive Mode
Example usage:
```
patcher report --non-interactive prod
```

The report command outpust a list of module dependencies in JSON format to `stdout`, for example:
```json
[
   "gruntwork-io/terraform-aws-monitoring/logs/load-balancer-access-logs",
   "gruntwork-io/terraform-aws-service-catalog/services/k8s-service",
   "gruntwork-io/terraform-aws-messaging/sqs",
   "gruntwork-io/terraform-aws-service-catalog/services/k8s-namespace",
   "gruntwork-io/terraform-aws-cis-service-catalog/networking/vpc",
   "gruntwork-io/terraform-aws-security/custom-iam-entity",
   "gruntwork-io/terraform-aws-utilities/request-quota-increase",
   "gruntwork-io/terraform-aws-service-catalog/networking/sns-topics",
   "gruntwork-io/terraform-aws-cis-service-catalog/landingzone/account-baseline-app",
   "gruntwork-io/terraform-aws-service-catalog/networking/route53"
]
```
