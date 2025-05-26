---
title: "Persistent EBS Volume Scripts"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Module Server" version="1.0.0" lastModifiedVersion="0.15.3"/>

# Persistent EBS Volume Scripts

<a href="https://github.com/gruntwork-io/terraform-aws-server/tree/v1.0.0/modules/persistent-ebs-volume" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.15.3" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This folder contains scripts you can use to work with EBS Volumes that persist between redeploys of an EC2 instance:

1.  `mount-ebs-volume`: This script can be run on an EC2 instance to attach and mount a persistent EBS volume. It uses
    the AWS API to attach the volume, creates a file system on it (if it doesn't have one already), and mounts it at a
    specified mount point. If you're mounting volumes dynamically, such as with instances in an Auto Scaling Group, you
    can pass in multiple volume ids and this script will try to attach each one until it finds one in the same
    availability zone that is unattached.
2.  `unmount-ebs-volume`: This script can be run on an EC2 instance to unmount and detach a persistent EBS volume. It
    unmounts the volume at the specified mount point and then uses the AWS API to detach the volume.

Why not use the `aws_ebs_volume` and `aws_volume_attachment` resources in Terraform to do this for us? Because:

1.  [Due to a bug](https://github.com/hashicorp/terraform/issues/2957#issuecomment-150613677), the
    `aws_volume_attachment` resource does not work correctly and cannot currently be used.
2.  The `aws_volume_attachment` resource does not work for dynamically attaching volumes, such as with an Auto Scaling
    Group.

A persistent EBS volume is useful for servers that persist data to the local hard disk and need that data to still be
available after a redeploy, such as a database like MySQL, CI server like Jenkins, or CMS like WordPress. Note, an EBS
volume can only be associated with a single EC2 Instance, so if you need the data on the disk to be shared amongst
multiple servers, check out the [Amazon Elastic File System](https://aws.amazon.com/efs/), which provides a service
built on top of NFS.

Check out the [persistent-ebs-volume example](https://github.com/gruntwork-io/terraform-aws-server/tree/v1.0.0/examples/persistent-ebs-volume) for how to use these scripts with
Terraform.

## Installing the scripts

You can install these scripts using the [Gruntwork Installer](https://github.com/gruntwork-io/gruntwork-installer):

```bash
gruntwork-install --module-name "persistent-ebs-volume" --repo "https://github.com/gruntwork-io/terraform-aws-server" --tag "0.0.3"
```

## Using the scripts

The scripts have the following prerequisites:

1.  They must be run as root
2.  They must be run on an EC2 instance
3.  The EC2 instance must have an IAM role with permissions to list, attach, and detach volumes (see the
    [persistent-ebs-volume example](https://github.com/gruntwork-io/terraform-aws-server/tree/v1.0.0/examples/persistent-ebs-volume))
4.  The EC2 instance must have the AWS CLI and jq installed

Run the `mount-ebs-volume` script in the User Data of your EC2 instances so it mounts the volume at boot. Run the
`unmount-ebs-volume` script just before your instance shuts down (make sure nothing is writing to the volume when
running this script).

Here is an example usage:

```bash
mount-ebs-volume --aws-region us-east-1 --volume-id vol-123456 --device-name /dev/xvdf --mount-point /data --owner ubuntu
```

This will attach volume `vol-123456` as device `/dev/xvdf` and then mount it at the path `/data` (see [Device Naming on
Linux Instances](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/device_naming.html) for an explanation of why we
chose `/dev/xvdf`). For dynamic setups where you don't have a static mapping of instances to volumes, such as in an
Auto Scaling Group, you can specify the `--volume-id` parameter multiple times:

```bash
mount-ebs-volume --aws-region us-east-1 --volume-id vol-123456 --volume-id vol-7891011 --volume-id vol-12131415 --device-name /dev/xvdf --mount-point /data --owner ubuntu
```

This tells the script to try each volume until it finds one that it can attach. Run `mount-ebs-volume --help` to see
all the options.

## How do you use this on Nitro based instances with NVMe block devices?

If you are using [a Nitro based EC2
instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html#ec2-nitro-instances), the EBS volumes
will be exposed as NVMe block devices. These devices behave differently when compared to non-NVMe based EBS block
devices. The scripts in this module support NVMe block devices, but have a few caveats around device naming.

### Prerequisites

For NVMe block devices, the scripts in this module depend on the `nvme` command line utility to function. You can
install this using the following commands:

**Debian / Ubuntu**:

```
apt-get install nvme-cli
```

**Amazon Linux 2 / Amazon Linux / RHEL**:

```
yum install nvme-cli
```

### Background: How NVMe devices are named

When attaching an EBS volume to an EC2 instance, you need to provide AWS with a device name for the volume. This mapping
between EBS volumes and device names are used by EC2 to help ensure a consistent name for the device that can be used to
identify the EBS volume on the host OS. AWS restricts these block device names for the mapping when attaching the volume
to the instance. You can refer to [the official
documentation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/device_naming.html) for the available volume device
names.

On non-NVMe block devices, the device name on the OS will be the same as the device name you select when attaching the
volume. However, for NVMe block devices, the OS drivers will automatically rename the device name to be of the form
`/dev/nvme[0-26]n1`. Note how this form of the name is not a valid name when selecting the device name during attachment
of the EBS volume. Because this is managed by the OS driver and not AWS, the remapped name is not consistent. E.g
between instance reboots, a volume that was named as `/dev/xvdh` in the block device mapping, may be named
`/dev/nvme1n1` in one boot, while it might be named to `/dev/nvme2n1` in another boot. To ensure the correct device is
discoverable for mounting, AWS will tag the volume with the EBS volume ID and block device mapping name. You can read
more about how to identify the right volume in [the official
documentation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/nvme-ebs-volumes.html#identify-nvme-ebs-device).

### What name to use for the persistent-ebs-volume scripts

Because the remapped name (`/dev/nvme[0-26]n1`) is inconsistent, you can not rely on that name when mounting and
unmounting the block device, as you may end up mounting the wrong volume at the specified location. To handle this,
both `mount-ebs-volume` and `unmount-ebs-volume` expect the name used in the block device mapping (`/dev/sd[f-p]`)
instead of the NVMe name, which will be consistent across reboots. The scripts will then search for the correct block
device that is tagged with this device name, and correctly mount the device using the remapped name.

So for example, suppose you had a volume in region `us-east-1` with id `vol-123456` that you want to attach to the
instance using the block device mapping name `/dev/sdf` and mount to the directory `/data`. Here is the call to
`mount-ebs-volume` to do this:

```bash
mount-ebs-volume --aws-region us-east-1 --volume-id vol-123456 --device-name /dev/sdf --mount-point /data --owner ubuntu
```

Like non-NVMe devices, this will attach volume `vol-123456` to the EC2 instance using the name `/dev/sdf`. However, when
mounting, instead of using the device name directly, the script will first identify which block device on the file
system maps to the block device mapping name `/dev/sdf`. Then, it will use the actual device name when mounting to
`/data`.

When you run this, you might see output similar to below in the logs:

```
2019-02-20 04:35:23 [INFO] [mount-ebs-volume] Searching for EBS volumes with ids: vol-123456
2019-02-20 04:35:27 [INFO] [mount-ebs-volume] Filtering EBS volumes for those that are in us-east-1f and are unattached
2019-02-20 04:35:27 [INFO] [mount-ebs-volume] Attempting to attach volume vol-123456 with device name /dev/sdf
{
    "AttachTime": "2019-02-20T04:35:27.974Z",
    "InstanceId": "i-123456",
    "VolumeId": "vol-123456",
    "State": "attaching",
    "Device": "/dev/sdf"
}
2019-02-20 04:35:28 [INFO] [mount-ebs-volume] Volume vol-123456 is now mounted.
2019-02-20 04:35:28 [INFO] [mount-ebs-volume] Waiting for volume sdf to be attached...
2019-02-20 04:35:28 [INFO] [mount-ebs-volume] Volume sdf is still not attached. Will retry after 10 seconds...
2019-02-20 04:35:38 [INFO] [mount-ebs-volume] Volume <b>nvme1n1</b> is now attached.
2019-02-20 04:35:38 [INFO] [mount-ebs-volume] Creating ext4 file system on <b>/dev/nvme1n1</b>...
mke2fs 1.42.13 (17-May-2015)
Creating filesystem with 1310720 4k blocks and 327680 inodes
Filesystem UUID: f920e310-b7d4-4e47-98db-14246acf63aa
Superblock backups stored on blocks:
        32768, 98304, 163840, 229376, 294912, 819200, 884736

Allocating group tables: done
Writing inode tables: done
Creating journal (32768 blocks): done
Writing superblocks and filesystem accounting information: done

2019-02-20 04:35:48 [INFO] [mount-ebs-volume] Creating mount point /data...
2019-02-20 04:35:48 [INFO] [mount-ebs-volume] <b>Adding device /dev/nvme1n1 to /etc/fstab, using the UUID: UUID=f920e310-b7d4-4e47-98db-14246acf63aa with mount point /data...</b>
2019-02-20 04:35:48 [INFO] [mount-ebs-volume] Mounting volumes...
2019-02-20 04:35:48 [INFO] [mount-ebs-volume] Changing ownership of /data to ubuntu...
2019-02-20 04:35:48 [INFO] [mount-ebs-volume] Success! Volume mounted with the following details:
2019-02-20 04:35:48 [INFO] [mount-ebs-volume] <b>device_name=/dev/nvme1n1</b>
2019-02-20 04:35:48 [INFO] [mount-ebs-volume] mount_point=/data
```

Note how the volume name changes from `sdf` to `nvme1n1` part way through the logs (bolded for your convenience). This
is because after the volume is attached, the script identifies the name used by the OS and continues its steps to mount
the device using that name.

Similarly, to unmount the device, you can use:

```bash
unmount-ebs-volume --aws-region us-east-1 --volume-id vol-123456 --device-name /dev/sdf --mount-point /data
```

Like the `mount-ebs-volume` script, `unmount-ebs-volume` expects the device name used in the mapping when mounting the
device and not the remapped name.

When you run this, it will produce output similar to below:

```
2019-02-20 04:36:52 [INFO] [unmount-ebs-volume] Unmounting <b>/dev/nvme1n1</b> at /data...
2019-02-20 04:36:52 [INFO] [unmount-ebs-volume] Using AWS CLI to detach volume vol-123456 with device name /dev/sdf from instance i-123456 in us-east-1...
{
    "AttachTime": "2019-02-20T04:35:27.000Z",
    "InstanceId": "i-123456",
    "VolumeId": "vol-123456",
    "State": "detaching",
    "Device": "/dev/sdf"
}
2019-02-20 04:36:53 [INFO] [unmount-ebs-volume] Success! Volume vol-0a47d0c5bcb074299 has been unmounted from /data and detached from device /dev/sdf.
```

Note how the script uses the device name `/dev/nvme1n1` when unmounting the device, but switches to `/dev/sdf` when
detaching the device.

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-server/tree/v1.0.0/modules/persistent-ebs-volume/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-server/tree/v1.0.0/modules/persistent-ebs-volume/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-server/tree/v1.0.0/modules/persistent-ebs-volume/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "5601d0b3696545f737292a3d6713296c"
}
##DOCS-SOURCER-END -->
