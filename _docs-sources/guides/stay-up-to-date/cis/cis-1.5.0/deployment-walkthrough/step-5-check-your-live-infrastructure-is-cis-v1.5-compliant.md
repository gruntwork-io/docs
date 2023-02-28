---
sidebar_label: Check your live infrastructure is CIS v1.5 compliant
---

# Step 5: Check your live infrastructure is CIS v1.5 compliant

We suggest you now run the [Steampipe CIS v1.5.0](https://hub.steampipe.io/mods/turbot/aws_compliance/controls/benchmark.cis_v150)
check against your infrastructure.

If you configured Steampipe in [step 1](step-1-check-your-live-infrastructure-is-cis-v1.4-compliant) then you can run the check:

```
cd steampipe-mod-aws-compliance
steampipe check aws_compliance.benchmark.cis_v150
```

If some checks are failing you should check the [Manual steps](/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/manual-steps) section, that contains extra steps to achieve CIS compliance.
