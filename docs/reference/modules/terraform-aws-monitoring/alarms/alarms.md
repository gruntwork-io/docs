---
title: "Alarm modules"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="AWS Monitoring Modules" version="0.36.27" lastModifiedVersion="0.36.25"/>

# Alarm modules

<a href="https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v0.36.27/modules/alarms" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.25" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This folder contains modules that configure [CloudWatch
Alarms](http://docs.aws.amazon.com/AmazonCloudWatch/latest/DeveloperGuide/AlarmThatSendsEmail.html) to go off and
email or SMS you when something is going wrong. The modules are:

*   [asg-cpu-alarms](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v0.36.27/modules/alarms/asg-cpu-alarms): An alarm that goes off if CPU usage in an Auto Scaling Group (ASG) is too high.
*   [asg-disk-alarms](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v0.36.27/modules/alarms/asg-disk-alarms): An alarm that goes off if disk usage in an Auto Scaling Group (ASG) is too high.
*   [asg-memory-alarms](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v0.36.27/modules/alarms/asg-memory-alarms): An alarm that goes off if memory usage in an Auto Scaling Group (ASG) is
    too high.
*   [ec2-cpu-alarms](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v0.36.27/modules/alarms/ec2-cpu-alarms): An alarm that goes off if CPU usage for an EC2 Instance is too high.
*   [ec2-disk-alarms](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v0.36.27/modules/alarms/ec2-disk-alarms): An alarm that goes off if disk usage for an EC2 Instance is too high.
*   [ec2-memory-alarms](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v0.36.27/modules/alarms/ec2-memory-alarms): An alarm that goes off if memory usage for an EC2 Instance is too high.
*   [ecs-cluster-alamrs](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v0.36.27/modules/alarms/ecs-cluster-alarms): Alarms for an ECS cluster that go off if CPU or memory usage is too high
    across the cluster.
*   [ecs-service-alamrs](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v0.36.27/modules/alarms/ecs-cluster-alarms): Alarms for an ECS service that go off if CPU or memory usage is too high
    for this service.
*   [elb-alarms](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v0.36.27/modules/alarms/elb-alarms): A set of ELB alarms that go off if the latency gets too high, or there are
    too many 5xx errors, or too few requests are coming in.
*   [lambda-alarms](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v0.36.27/modules/alarms/lambda-alarms): An alarm that goes off when a lambda function breaches an associated metric.
*   [rds-alarms](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v0.36.27/modules/alarms/rds-alarms): A set of RDS alarms that go off if the CPU usage, number of connections, or latency gets
    too high or if the available memory or disk space gets too low.
*   [route53-health-check-alarms](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v0.36.27/modules/alarms/route53-health-check-alarms): Monitor a given domain (e.g. example.com) using Route
    53 and trigger an alarm if that domain is down or unresponsive.
*   [scheduled-job-alarm](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v0.36.27/modules/alarms/scheduled-job-alarm): An alarm that goes off if a scheduled job (e.g. a cron job) fails to
    run.
*   [sqs-alarms](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v0.36.27/modules/alarms/sqs-alarms): Alarms that go off if the number of visible messages is too high or age of oldest message surpasses the threshold.

Click on each module above to see its documentation. Head over to the [examples folder](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v0.36.27/examples) for examples.

## Information regarding tags for metric alarms

Currently you can view tags related to metric alarms only with AWS CLI by using:

```
aws cloudwatch list-tags-for-resource --resource-arn alarm_arn
```

Tags associated with a metric alarm are not propagated with the alarm payload when the alarm is triggered.

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v0.36.27/modules/alarms/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v0.36.27/modules/alarms/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v0.36.27/modules/alarms/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "da09808f22d20ecccb310496bb5b5e72"
}
##DOCS-SOURCER-END -->
