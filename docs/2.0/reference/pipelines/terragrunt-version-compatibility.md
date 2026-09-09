import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Terragrunt Version Compatibility

Pipelines reads the Terragrunt and OpenTofu versions to run from the `.mise.toml` file at the root of your repository. Pin an exact version of each tool in that file and bump it deliberately, so local runs and Pipelines use the same binary and an upgrade shows up as a reviewable change. See the [example mise configuration](/2.0/reference/pipelines/configurations#example-mise-configuration).

<Tabs groupId="platform">
<TabItem value="github" label="GitHub" default>

| Type | Terragrunt Ver | Pipelines Ver | Comments |
| ---- | -------------- | ------------- | -------- |
| Recommended | Latest 1.x | v4.y.z | Use the [latest release](https://github.com/gruntwork-io/terragrunt/releases/latest) for the most recent bug fixes and performance improvements. Terragrunt v1 releases are backwards compatible until v2. |
| | 0.93.1+ | v4.y.z | Environment auth is considerably faster on 0.93.1 and above |
| Minimum | 0.86.3 | v4.y.z | This is the absolute minimum version of Terragrunt for Pipelines v4 |
| Maximum | 0.84.z | v3.y.z | Pipelines v3.y.z is not compatible with Terragrunt 0.85.0 and above.|
| Recommended | 0.77.11 | v3.y.z | Pipelines is actively tested with this version of Terragrunt |
| | 0.71.3+ | v3.y.z | Pipelines automatically supports [Terragrunt Stacks](/2.0/docs/pipelines/guides/stacks) |
| | 0.68.13+ | v3.y.z | Pipelines uses new features in Terragrunt to provide enhanced logging, and the [File Dependency](https://docs.gruntwork.io/2.0/docs/pipelines/guides/file-dependencies) feature |
| Minimum | 0.59.7 | v3.y.z | This is the absolute minimum version of Terragrunt for pipelines v3 |
| Minimum | 0.59.7 | v2.y.z | |
</TabItem>
<TabItem value="gitlab" label="GitLab">
| Type | Terragrunt Ver | Pipelines Ver | Comments |
| ---- | -------------- | ------------- | -------- |
| Recommended | Latest 1.x | v2.y.z | Use the [latest release](https://github.com/gruntwork-io/terragrunt/releases/latest) for the most recent bug fixes and performance improvements. Terragrunt v1 releases are backwards compatible until v2. |
| | 0.93.1+ | v2.y.z | Environment auth is considerably faster on 0.93.1 and above |
| Minimum | 0.86.3 | v2.y.z | This is the absolute minimum version of Terragrunt for Pipelines v2 |
| Maximum | 0.84.z | v1.y.z | Pipelines v1.y.z is not compatible with Terragrunt 0.85.0 and above.|
| Minimum | 0.59.7 | v1.y.z | This is the absolute minimum version of Terragrunt for Pipelines v1 |

</TabItem>
</Tabs>
