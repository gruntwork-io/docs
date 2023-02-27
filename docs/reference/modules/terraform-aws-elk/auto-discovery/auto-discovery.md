---
title: "Auto Discovery Script"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules%2Fauto-discovery" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-elk/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# Auto Discovery Script

This folder contains a script that allows auto discovery of nodes in a cluster. This script has been tested on the following operating systems:

*   Ubuntu 18.04
*   Ubuntu 20.04
*   CentOS 7
*   Amazon Linux 2

## Usage

Run `auto-discovery --help` to see all available arguments

```
Usage: auto-discovery [options]

This script can run on a scheduled basis to (a) automatically discover the IPs of other EC2 Instances (b) write these IPs to a config file, (c) restart the service using that config file.

Options:

  --tag					      The tag key and value on the instances.
  --port				      The port on which the server nodes listen on for connections.
  --aws-region			  The AWS region where the instances are deployed.
  --use-public-ips    Set to true to use public IPs and false to use private IPs. Default: true
  --config-file			  The path to a configuration file.
  --service-name		  The name of the systemd service to restart after updating the specified configuration file.
  --pattern				    Regex pattern used to identify where to update in the specified configuration file.
  --schedule				  A cron expression specifying the schedule this script will run with otherwise script will run only once.
  --user			      	The user to schedule the cron job for. Defaults to the user that executes the script
  --help				      Show this help text and exit.

Example:

  auto-discovery --tag 'Name=instance-0' --port 5044 --aws-region 'us-east-1' --config-file ./filebeat.yml --pattern 'hosts:.*' --service-name 'filebeat'
```

### How it works

The `auto-discovery` script works in the following steps:

1.  Makes a request to AWS to retrive all `pending` or `running` instances with a specific tag set to a the specified value.
2.  Retrieves the public or private IP addresses of the returned instances depending on the value of the `--use-public-ips` flag.
3.  Replaces a portion of the specified configuration file with a comma separated list of IP and port pairs (e.g `"52.72.28.213:8065", "54.210.77.143:8065"`) using the specified regex pattern as a marker
4.  Restarts the specified systemd service, which presumbly uses the just updated configuration file and needs to reload it.
5.  If `--schedule` is set, this script schedules itself with cron to be run on the specified schedule.

**LIMITATION:** Unfortunately, the approach described above can't work if the application for which we are doing discovery
is configured to do full SSL certificate verification (ie: hostname verification). Since our approach looks up randomly
assigned IP addresses, there's no way we could generate an SSL certificate that encapsulates all of the possible IP addresses
that may be found. For this reason, we have to disable SSL hostname verification when using this module.

### Future Improvements

To work around the limitation described above, we will be making changes that will update local `/etc/hosts` or run a
local instance of [Dnsmasq](http://www.thekelleys.org.uk/dnsmasq/doc.html) in order to make seamless updates to the DNS
instead of updating an application's config file and then needing to restart that application.


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/modules%2Fauto-discovery%2Freadme.md",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/modules%2Fauto-discovery%2Fvariables.tf",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/modules%2Fauto-discovery%2Foutputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "148d2363ae4eeb2cc17ad1aec1216fa0"
}
##DOCS-SOURCER-END -->
