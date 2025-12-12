---
title: "OS Hardening"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="1.2.0" lastModifiedVersion="1.2.0"/>

# OS Hardening

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v1.2.0/modules/os-hardening" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v1.2.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This is a Gruntwork Script Module meant to be used with [Packer](http://packer.io) to build an AMI of a hardened Linux
OS. At present, the only supported Linux distribution is Amazon Linux. If you wish to add another distribution, please
contact support@gruntwork.io.

Our OS hardening is based primarily on the guidelines described in in the [Center for Internet Security Benchmarks](https://benchmarks.cisecurity.org/downloads/benchmarks/), which are freely downloadable. For Amazon Linux, we used the
**CIS Amazon Linux Benchmark, v2.0.0 06-02-2016**.

Note that we have not yet implemented the entire CIS Benchmark. At present, the primary implemented OS hardening feature
is mounting multiple partitions. We hope to implement more CIS recommendations over time.

## Main Components of this Module

There are two major components to this module:

*   [ami-builder](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.2.0/modules/os-hardening/ami-builder): This is a Terraform template that launches an EC2 Instance with Packer pre-installed.
*   [partition-scripts](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.2.0/modules/os-hardening/partition-scripts): This is a set of bash scripts that create multiple disk partitions, format them
    as ext4, and mount them to various paths with various mount options such as `noexec` or `nosuid`. These scripts are
    meant to be run in a Packer template that uses the Packer [amazon-chroot](https://www.packer.io/docs/builders/amazon-chroot.html)
    builder.

Fundamentally, to generate an AMI you must:

1.  Create a Packer template `amazon-linux.json` that uses the partition-scripts.
2.  Launch the ami-builder EC2 Instance.
3.  Copy your Packer template onto the ami-builder EC2 Instance (e.g. with `scp`).
4.  SSH into the ami-builder EC2 Instance and run `packer build amazon-linux.json` to build the AMI.
5.  Terminate the ami-builder EC2 Instance.

We recognize that is a lot of manual steps to build a single AMI, so check out the [os-hardening example](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.2.0/examples/os-hardening)
for a pre-built Packer template plus a script (`packer-build.sh`) that will automate all the above steps.

### Why do I need to launch a separate EC2 Instance to run Packer?

This is because we're using the Packer [amazon-chroot](https://www.packer.io/docs/builders/amazon-chroot.html) builder.
See below for additional details on what this is and how to use it.

## How to Use this Module

**The best way to use this module is to substantially copy the [os-hardening example code](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.2.0/examples/os-hardening).
Unlike most Gruntwork examples, the example for this module contains a full Packer build file plus a wrapper script to
create the AMI with a single command and may be viewed as a "canonical" way to instantiate the os-hardening modules.**

### How to Set Your EBS Volume Size and Configure The File System Partitions You Want

Before building the AMI with Packer, you may wish to customize the particular file systems and partitions that your
hardened OS will use. Follow these steps:

1.  Set the value of the `ebs_volume_size` variable in the example Packer Template (e.g. `amazon-linux.json`) to the
    desired EBS Volume size (in GB).

2.  Edit the Packer Template so that the following scripts specify the desired partition paths
    and sizes:

    *   `partition-volume`: For each desired partition, add an argument like `--partition '/home:4G'`. For additional
        details see [partition-volume](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.2.0/modules/os-hardening/partition-scripts/bin/partition-volume). Note that for the last `--partition` entry only,
        you may specify `*` for the size to tell the script to create the largest possible partition based on remaining
        disk space. Also, make sure your partition sizes don't exceed the space available on your EBS Volume!
    *   `cleanup-volume`: For each desired partition, add an argument like `--mount-point '/home'`. For additional details see
        [cleanup-volume](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.2.0/modules/os-hardening/partition-scripts/bin/cleanup-volume)

    Note that you will redundantly pass the same list of partition paths to each of the above scripts, but only
    `partition-volume` needs both the mount point *and* the desired partition size.

3.  Edit the `files/etc/fstab` file to match the partitions from the previous step. Specify any mount options as desired.

That's it! The Packer template will take care of the rest.

### How to Build the AMI with Packer

Now we're ready to build the actual AMI. Note: The [os-hardening example](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.2.0/examples/os-hardening) contains a script
that automates all these steps, but, for the sake of understanding, we'll describe them individually below:

1.  Launch the [ami-builder](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.2.0/modules/os-hardening/ami-builder) EC2 Instance. We will execute Packer from this EC2 Instance.

2.  On your local machine run `rsync` so that your local directory is continually synced to the ami-builder:

    ```
    while true; do rsync -azv ./packer-templates/ ec2-user@54.212.196.166:~/ami-builder; sleep 1; done
    ```

    Be sure to replace the IP address above with the IP address of your EC2 Instance.

3.  From the ami-builder EC2 Instance, run Packer:

    ```
    cd /home/ec2-user/ami-builder
    sudo su
    packer build amazon-linux.json
    ```

    Note that it is important to actually use `sudo su` versus just `sudo` since the $PATH variables are different for
    the `root` user versus the `ec2-user` user.

    The AMI will now build.

4.  When finished, terminate the ami-builder EC2 Instance.

### How to Launch an AMI with an Encrypted EBS Volume

As of Packer 0.12.3, Packer supports the `encrypt_boot` property for the amazon-chroot builder! See  [Pull Request #4584](https://github.com/mitchellh/packer/pull/4584).
This will allow us to build an AMI as above, except that once the AMI is ready, Packer will automatically copy the
unencrypted [Snapshot](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSSnapshots.html) as an encrypted Snapshot,
create a new AMI based on the encrypted Snapshot, and delete the original AMI and its underlying unecncrypted Snapshot.

Until Packer 0.12.3 is released, you can still set `encrypt_boot` to true and earlier versions of Packer will simply
ignore this property. In the meantime, consider running an EC2 Instance with the root volume unencrypted, but with
additional volumes mounted as encrypted volumes.

### Using Your Hardened OS as a "Base AMI"

A best practice we encourage is to first build your hardened OS Image using these modules and the [os-hardening example](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.2.0/examples/os-hardening).
You can now view this AMI as your "base AMI", and all other Packer builds can be built on top of this AMI. For example,
you might have:

*   Base AMI: Hardened OS (built from stock Amazon Linux)
*   Bastion Host: Built from Base AMI
*   MongoDB Host: Built from Base AMI

In the above example, the Bastion Host and MongoDB Host Packer builds will "just work" with a single exception: By default,
Packer uploads all scripts defined in the [Remote Shell Provisioner](https://www.packer.io/docs/provisioners/shell.html)
to `/tmp` and then executes them. But our hardened OS most likely has the `noexec` option set for the `/tmp` file system,
which means that no code can be executed from `/tmp` by design!

To fix this, you must set the [remote_folder](https://www.packer.io/docs/provisioners/shell.html#remote_folder) property,
to a folder that *is* executable. For example, here we set `remote_folder` to `/home/ec2-user`:

```json
"provisioners": [{
    "type": "shell",
    "remote_folder": "/home/ec2-user",
    "inline": [
      "sudo yum update -y"
    ]
}]
```

## How this Module Works

Much of the design for this module is motivated by our need to support multiple [partitions](http://www.tldp.org/LDP/intro-linux/html/sect\_03\_01.html)
on a single volume, an OS hardening best practice.

### The Packer amazon-ebs builder

Almost all Packer builds for AWS use the [amazon-ebs](https://www.packer.io/docs/builders/amazon-ebs.html) builder. Packer
templates that use this builder work as follows:

1.  Packer launches a brand new EC2 Instance and waits to SSH in.
2.  Packer executes a series of provisioners (e.g. upload files, run shell scripts).
3.  When finished, Packer shuts down the EC2 instance.
4.  Packer takes a snapshot.
5.  When the snapshot is complete, Packer creates an AMI and terminates the EC2 Instance.

The primary advantage of the amazon-ebs Packer builder is simplicity and isolation. Each Packer build launches a completely
fresh EC2 Instance. The primary downsides are (1) Packer builds are slow because you have to launch a completely new
EC2 instance for each build, and (2) it is not possible to make any file system changes to the root partition because
you can't unmount the very partition on which the OS itself is running.

### The Packer amazon-chroot builder

To address the shortcomings of the amazon-ebs builder, Packer also has the [amazon-chroot](https://www.packer.io/docs/builders/amazon-chroot.html)
builder. Packer templates that use this builder work as follows:

1.  Out-of-band from Packer, someone launches an EC2 Instance (the "host system").
2.  From the host system, run `packer build <packer-template-file>`.
3.  Packer creates an EBS Volume based on the Snapshot that's part of the source AMI specified in the Packer template,
    attaches it to the host system, and mounts it.
4.  Packer executes the `chroot` command against the path where the EBS Volume has been mounted, which starts a process
    that now sees `/path/to/ebs-volume` as the `/` directory.
5.  Packer executes any provisioners in the Packer template. Because most provisioners are running in the `chroot`
    environment, they will execute directly on the EBS Volume.
6.  When all provisioners are complete, Packer detaches the volume, takes a snapshot, and creates an AMI from the snapshot.

#### The Packer Remote Shell Provisioner

Most Packer builds use the [remote-shell](https://www.packer.io/docs/provisioners/shell.html) provisioner to apply
configuration. It's called the remote shell provisioner because it executes shell commands on the "remote" EC2 Instance.
When using the amazon-ebs builder, that means the newly launched EC2 Instance runs the shell commands. When using the
amazon-chroot builder, that means the commands are run from within the `chroot` environment.

That is, Packer will first run `chroot /path/to/ebs-volume` and *then* execute all commands. An individual program has no
knowledge that it's running in a special environment. It will simply access the typical file system paths. But we, the
omniscient operator know that in reality what this program thinks is `/` is actually `/path/to/ebs-volume`.

This way, we can configure our EC2 Instance as we typically do in a Packer build, except that all configuration commands
are actually modifying the attached EBS Volume, not our root file system.

#### The Packer Local Shell Provisioner

The Packer [local-shell](https://www.packer.io/docs/provisioners/shell-local.html) provisioner executes shell commands
from your "local" machine.

When using the amazon-ebs builder, that means shell commands run from your local machine.

When using the amazon-chroot builder, that means the commands are run from the EC2 Instance where you launched Packer.
This is significant because it means we can execute Packer commands from the host system against the attached EBS Volume.
This allows us to, for example, delete partitions from the attached EBS Volume and add new partitions. It is the only way
to use Packer to create an AMI with multiple partitions.

## Module Design Decisions

This section discusses some design decisions made when creating this module.

### Which Tool We Used to Partition the Disks

Our choice of tooling was influenced in large part by whether EBS Volumes were originally partitioned to support the
legacy "MBR" format, or the newer GUID Partition Table (GPT) format.

The partition format of a block device refers to how the first few blocks on the disk are structured and where the boot
loader code resides. Historically, the MBR format has been in wide use, but its primary limitation is that it does not
permit a disk size greater than 2 TB. For this reason, a newer partition table format, GPT, was invented that supports
up to 9.4 Zetabytes! Because Amazon EBS Volumes sometimes need to exceed 2 TB, the GPT format was a natural choice and
is what all modern AMIs use for their underlying EBS Volumes.

But it turns out that not all Linux disk partition management tools support the GPT format. For example, the venerable
`fdisk` has only "experimental" support for GPT. For that reason, we opted to use the newer `gdisk`.

But `gdisk` works with an interactive prompt, whereas we want to execute full commands as part of our Packer build. For
this reason, we use `sgdisk`, which implements all the same functionality of `gdisk` but as a pure command-line tool
and not an interactive tool.

### Managing Partitions with `gdisk` vs. LVM

Initially, we experimented with using the LVM (Logical Volume Manager) tool to manage our partitions. LVM is a software
tool that applies a unique file system format to a large disk partition and then allows software-based management of LVM
partitions. The primary benefit to using a layer like LVM is that you can dynamically resize disk partitions (including
root!) without taking your disk offline.

This approach was originally inspired by the presentation [OS Hardening and Packer](https://www.youtube.com/watch?v=8h_Y-L1Q8xI\&t=1165s),
where the speaker makes extensive use of LVM with RHEL and the Packer amazon-chroot builder.

But LVM requires that the `/boot` directory be mounted to a separate file system, which in turn requires that `/` and
`/boot` be on separate disk partitions. Since the default boot loader configuration for the Amazon Linux EBS Volume
expects both `/` and `/boot` on a single partition (partition #1, to be exact), separating these two directories meant
that we needed to reload the boot loader.

However, this proved unworkable. Amazon Linux uses an older version of GRUB for its boot loader, and GRUB was unable to find
the "BIOS partition" of the disk where it should write part of the boot loader configuration. After many attempts, we
eventually gave up on this direction and instead settled for using traditional "on disk" volumes formatted with `gdisk`.

It's likely that these issues are specific to Amazon Linux. Also, the only practical consequence of this is that disk
partitions on EBS Volumes cannot be dynamically resized without stopping the instance and separately mounting the EBS
Volume. But since we anticipate most users will use an immutable infrastructure anyway, we felt that asking users who
needed additional space to build a new AMI was not unreasonable.

## Gotchas

*   Per the [Packer docs for the amazon-chroot builder](https://www.packer.io/docs/builders/amazon-chroot.html), your
    provisioning scripts must not leave any processes running or Packer will be unable to unmount the filesystem.

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.2.0/modules/os-hardening/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.2.0/modules/os-hardening/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.2.0/modules/os-hardening/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "275f24317470dc026522872d6bf5b2f5"
}
##DOCS-SOURCER-END -->
