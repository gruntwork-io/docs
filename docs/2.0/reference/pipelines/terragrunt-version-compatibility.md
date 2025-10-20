import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Terragrunt Version Compatibility

<Tabs groupId="platform">
<TabItem value="github" label="GitHub" default>

| Type | Terragrunt Ver | Pipelines Ver | Comments |
| ---- | -------------- | ------------- | -------- |
| Minimum | 0.86.3 | v4.y.z | This is the absolute minimum version of Terragrunt for Pipelines v4 |
| Maximum | 0.84.z | v3.y.z | Pipelines v3.y.z is not compatible with Terragrunt 0.85.0 and above. Future major versions will be compatible. |
| Recommended | 0.77.11 | v3.y.z | Pipelines is actively tested with this version of Terragrunt |
| | 0.71.3+ | v3.y.z | Pipelines automatically supports [Terragrunt Stacks](/2.0/docs/pipelines/guides/stacks) |
| | 0.68.13+ | v3.y.z | Pipelines uses new features in Terragrunt to provide enhanced logging, and the [File Dependency](https://docs.gruntwork.io/2.0/docs/pipelines/guides/file-dependencies) feature |
| Minimum | 0.59.7 | v3.y.z | This is the absolute minimum version of Terragrunt for pipelines v3 |
| Minimum | 0.59.7 | v2.y.z | |
</TabItem>
<TabItem value="gitlab" label="GitLab">
| Type | Terragrunt Ver | Pipelines Ver | Comments |
| ---- | -------------- | ------------- | -------- |
| Minimum | 0.86.3 | v2.y.z | This is the absolute minimum version of Terragrunt for Pipelines v2 |
| Minimum | 0.59.7 | v1.y.z | This is the absolute minimum version of Terragrunt for Pipelines v1 |

</TabItem>
</Tabs>
