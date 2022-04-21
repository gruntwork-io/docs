---
sidebar_label: Use the Service Catalog (optional)
---

# Update to the Service Catalog based Reference Architecture

:::note

This step is optional, but recommended.

:::

If you haven’t already, it is recommended to [update your Reference Architecture
to the Service Catalog based
version](https://gruntwork.io/guides/upgrades/how-to-update-your-ref-arch/).
This is not strictly necessary to leverage the DRY configurations. However, the
Service Catalog based version utilizes constructs that are more friendly to DRY
across environments. By switching to the Service Catalog based version, you will
see more common configuration across your environments, allowing you to DRY your
configuration further.

An additional consideration is that the Service Catalog upgrade guide assumes
the original Reference Architecture, and not the DRY version. If you update to
the DRY version first, then the guide will no longer be compatible with your
Reference Architecture, complicating a later migration to the Service Catalog.
Updating to the Service Catalog from a DRY Reference Architecture version is not
fully supported by Gruntwork.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "0375aad45a4e44290040bdf324035ce2"
}
##DOCS-SOURCER-END -->
