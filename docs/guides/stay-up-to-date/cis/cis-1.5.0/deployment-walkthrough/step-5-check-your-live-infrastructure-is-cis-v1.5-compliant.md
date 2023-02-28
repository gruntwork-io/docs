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


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "28ae482671e475e42d5a6194c5d12cd6"
}
##DOCS-SOURCER-END -->
