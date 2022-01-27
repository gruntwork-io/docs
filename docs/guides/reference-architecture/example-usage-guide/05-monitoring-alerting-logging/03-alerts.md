# Alerts

A number of alerts have been configured using the [alarms modules in
`terraform-aws-monitoring`](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/alarms) to notify you
in case of problems, such as a service running out of disk space or a load balancer seeing too many 5xx errors.

- You can find all the alerts in the [CloudWatch Alarms
  Page](https://console.aws.amazon.com/cloudwatch/home?#alarm:alarmFilter=ANY).

- You can also find [Route 53 Health Checks on this page](https://console.aws.amazon.com/route53/healthchecks/home#/).
  These health checks test your public endpoints from all over the globe and notify you if your services are unreachable.

That said, you probably don't want to wait for someone to check that page before realizing something is wrong, so
instead, you should subscribe to alerts via email or text message. Go to the [SNS Topics
Page](https://console.aws.amazon.com/sns/v2/home?#/topics), select the `cloudwatch-alarms` topic, and click "Actions ->
Subscribe to topic."

If you'd like alarm notifications to go to a Slack channel, check out the [`sns-to-slack`
module](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/alarms/sns-to-slack).


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"584b4a2ae80caff18e9aabc951d9878d"}
##DOCS-SOURCER-END -->
