---
title: "Kubernetes CircleCI Helpers"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="CI Modules" version="1.0.1" lastModifiedVersion="0.53.0"/>

# Kubernetes CircleCI Helpers

<a href="https://github.com/gruntwork-io/terraform-aws-ci/tree/v1.0.1/modules/kubernetes-circleci-helpers" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.53.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module contains helper scripts that can setup Kubernetes tools for use in a CircleCI job, including:

*   `setup-minikube`: This script will install and setup [`minikube`](https://kubernetes.io/docs/setup/minikube/) in a way
    that is compatible with CircleCI. In addition, this script will install
    [`kubectl`](https://kubernetes.io/docs/tasks/tools/install-kubectl/), setup to talk to the `minikube` cluster. Note
    that this MUST be run on a job that is using the machine executor with the ubuntu 20.04 image
    (e.g., `ubuntu-2004:202111-02`).

## Installing the helpers

You can install the helpers using the [Gruntwork Installer](https://github.com/gruntwork-io/gruntwork-installer):

```bash
gruntwork-install --module-name "kubernetes-circleci-helpers" --repo "https://github.com/gruntwork-io/terraform-aws-ci" --tag "0.0.1"
```

We recommend running this command in one of the jobs for CircleCI:

```yaml
job:
  setup:
    # Note: Since minikube uses Docker, we need to run on the machine executor to avoid complications with
    # Docker-in-Docker.
    machine:
      enabled: true
      image: "ubuntu-2004:202111-02"
    steps:
      - run:
        command: |
          # Install the Gruntwork Installer
          curl -Ls https://raw.githubusercontent.com/gruntwork-io/gruntwork-installer/main/bootstrap-gruntwork-installer.sh | bash /dev/stdin --version 0.0.22

          # Use the Gruntwork Installer to install the kubernetes-circleci-helpers module
          gruntwork-install --module-name "kubernetes-circleci-helpers" --repo "https://github.com/gruntwork-io/terraform-aws-ci" --tag "0.13.12"
```

## Using the setup-minikube helper

The `setup-minikube` script will do the following:

1.  Mark the root directory as rshared so that it is available to `minikube` (see
    https://github.com/kubernetes/kubernetes/issues/61058 for more info).
2.  Install `kubectl` into `/usr/local/bin`. You can use the `--k8s-version` flag to customize the version that is
    installed. Note that the installed Kubernetes version will also reflect this, so that both `kubectl` and the
    available Kubernetes APIs are in sync.
3.  Install [`cri-dockerd`](https://github.com/Mirantis/cri-dockerd) into `/usr/bin`. This is required for Kubernetes `>= 1.24`. You can use the `--cri-dockerd-version` flag to customize the version that is installed.
4.  Install `minikube` into `/usr/local/bin`. You can use the `--minikube-version` flag to customize the version that is
    installed.
5.  Start `minikube` and wait for it to come up. You can use the `--k8s-version`
    flag to configure which version of Kubernetes to run.
6.  Disable the `dashboard` addon, while enabling the `ingress` addon so that it is available, and ensure the `ingress`
    addon gets deployed correctly.

A few things to note about the way `minikube` is installed:

*   Disable VM drivers so that it runs directly.
*   RBAC is turned on.
*   The nginx ingress controller is turned on with SSL disabled.
*   The default `ServiceAccount` in the `kube-system` namespace inherits cluster admin status.

You can call this as a step in your job:

```yaml
job:
  setup:
    steps:
      - run:
        command: |
          # Install the Gruntwork Installer
          curl -Ls https://raw.githubusercontent.com/gruntwork-io/gruntwork-installer/main/bootstrap-gruntwork-installer.sh | bash /dev/stdin --version 0.0.9

          # Use the Gruntwork Installer to install the kubernetes-circleci-helpers module
          gruntwork-install --module-name "kubernetes-circleci-helpers" --repo "https://github.com/gruntwork-io/terraform-aws-ci" --tag "0.0.5"

      - run:
        command: setup-minikube
```

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v1.0.1/modules/kubernetes-circleci-helpers/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v1.0.1/modules/kubernetes-circleci-helpers/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v1.0.1/modules/kubernetes-circleci-helpers/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "d28502fbe94904d80177a5e95553dc61"
}
##DOCS-SOURCER-END -->
