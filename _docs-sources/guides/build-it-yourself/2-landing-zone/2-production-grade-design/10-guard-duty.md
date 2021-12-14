# GuardDuty

You’ll want to enable GuardDuty in every one of your AWS accounts, so that you can protect both your accounts and workloads
against malicious activity and unauthorized behavior. Note that you should enable GuardDuty in every AWS region, and not just
the region(s) you’re using for the rest of your infrastructure. That way, if an employee (perhaps accidentally), or even worse,
an attacker, runs something in a region you don’t typically use, you’ll still be notified by GuardDuty. We typically recommend
publishing GuardDuty’s findings to a dedicated Amazon SNS topic.
