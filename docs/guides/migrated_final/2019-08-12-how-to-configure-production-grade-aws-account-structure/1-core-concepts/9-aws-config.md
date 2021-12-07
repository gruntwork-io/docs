# AWS Config

_[AWS Config](https://aws.amazon.com/config/)_ is a service that enables you to assess, audit, and evaluate the configurations of
your [AWS resources](https://docs.aws.amazon.com/config/latest/developerguide/resource-config-reference.html). You can use AWS
Config to ensure that AWS resources are configured in a manner that is in compliance with your company policies or regulatory
requirements. This enables you to simplify compliance auditing, security analysis, change management, and operational
troubleshooting.

The way you specify your company’s policies is by using
[AWS Config Rules](https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config.html) which are expressions of a desired
configuration state, written in code and executed as Lambda functions. When a resource configuration changes, AWS Config fires the
relevant Lambda functions to evaluate whether the configuration changes the state of compliance with the desired configuration. AWS
has developed a set of pre-written rules called [AWS Config Managed Rules](https://docs.aws.amazon.com/config/latest/developerguide/managed-rules-by-aws-config.html),
but you can also author your own [custom rules](https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_develop-rules_nodejs.html).



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"ae439c83d438ed23983f5d2c9c8a63df"}
##DOCS-SOURCER-END -->
