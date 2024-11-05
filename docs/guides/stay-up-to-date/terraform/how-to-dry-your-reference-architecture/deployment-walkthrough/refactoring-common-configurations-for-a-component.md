# Refactoring common configurations for a component

The rest of this guide will cover how to identify and extract the common configurations for a single arbitrary component
in your Reference Architecture. These steps can be used to refactor any component that is deployed in multiple
accounts or environments in your Reference Architecture.

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} />

## Step 1: Identify the component

The first step is to decide which component you would like to refactor. A component in this context is a single
Terraform module that is deployed by Terragrunt.

Once you identify the component that you want to update, take an inventory of the list of Terragrunt configurations that
deploy that component across your environments. We will use this inventory to identify the common configuration across
all the deployments.

Example inventory:

- `vpc`

  - `dev/us-west-2/dev/networking/vpc`
  - `stage/us-west-2/stage/networking/vpc`
  - `prod/us-west-2/prod/networking/vpc`

- `openvpn-server`

  - `dev/us-west-2/dev/networking/openvpn-server`
  - `stage/us-west-2/stage/networking/openvpn-server`
  - `prod/us-west-2/prod/networking/openvpn-server`

- `ecs-deploy-runner`
  - `dev/us-west-2/mgmt/ecs-deploy-runner`
  - `stage/us-west-2/mgmt/ecs-deploy-runner`
  - `prod/us-west-2/mgmt/ecs-deploy-runner`
  - `shared/us-west-2/mgmt/ecs-deploy-runner`
  - `logs/us-west-2/mgmt/ecs-deploy-runner`
  - `security/us-west-2/mgmt/ecs-deploy-runner`

As mentioned in the [Background](../core-concepts.md#background), the changes will be isolated to Terragrunt configuration files (syntactic changes vs
semantic changes) and there will be no need to roll out the changes using `terraform`. Given that, the order in which
the components are updated does not matter. You can update the components in whatever order you would like.

## Step 2: Identify common configurations

Once you know which component is being updated and which Terragrunt configuration files deploy that component, the next
step is to identify the common configuration across the deployments. To do this, we will run through a diff utility to
compare each configuration against a single reference configuration.

The reason we only need to run the diff utility against a single reference point is because we are only looking for
configurations that are common across ALL environments. Therefore, a difference in a single comparison is enough to rule
out that configuration as a common config.

Start off by choosing a reference config and generating an initial set of candidate common configurations. This
reference point will be used to create a starting point for the list of blocks and attributes that can be common across
all deployments of the component. As we compare with each other configuration, we will find the blocks and attributes
that are different across the environments, and hence cross off from the list so that we end up with the list of blocks
and attributes that are common across ALL environments.

To construct this initial list, follow these steps:

1.  Choose one of the Terragrunt configurations as your reference point. This can be arbitrary, but we recommend using `dev` as the reference point.

2.  Note all the top level blocks and attributes in the reference configuration, except for the `include` block. Terragrunt currently doesn’t support nested `include` blocks, so we can’t have the `include` block in the common file (note that this list will ultimately be the list of blocks and attributes that go in the common file).

    - For example, in the file [dev/us-west-2/dev/networking/vpc/terragrunt.hcl](https://github.com/gruntwork-io/terraform-aws-service-catalog/blob/6ca162dd1a8d8d6b7cf05e6a22bc4ac7bf01215f/examples/for-production/infrastructure-live/dev/us-west-2/dev/networking/vpc/terragrunt.hcl), the list would be:

      - `terraform`
      - `locals`
      - `inputs`

3.  Next, note all the top level keys in the `inputs` attribute in the reference configuration. `inputs` need special treatment because it will contain a mix of items that are common and different across environments, so to maximize the DRY potential, we need to look at each `input` element separately.

    - In the same example file, the list would be:

      - `vpc_name`
      - `num_nat_gateways`
      - `cidr_block`
      - `kms_key_user_iam_arns`
      - `eks_cluster_names`
      - `tag_for_use_with_eks`

Once you have the candidate configurations, you will want to run through a diff utility to cross off any that are
identified as different across environments.

There are a couple ways to go about this depending on how complex the underlying configuration files are, and how much
customization has been made since the deployment of the Reference Architecture.

### Using `diff` to identify raw differences

If you haven’t made many modifications to the component since the Reference Architecture was deployed, we recommend
using `diff` to identify the differences. For each other Terragrunt configuration, run through `diff` against the
reference point to identify differences.

For example, if we were updating the `vpc` component, we can choose `dev/us-west-2/dev/networking/vpc` as the reference
point and run the `diff` utility between it and the other environments:

    diff dev/us-west-2/dev/networking/vpc stage/us-west-2/stage/networking/vpc
    diff dev/us-west-2/dev/networking/vpc prod/us-west-2/prod/networking/vpc

Once you have the diff, cross off any blocks, attributes, and input keys from the initial list that are different based
on the output, except for `locals`. `locals` blocks are not inherited across the `include` chain, so it is hard to keep
track of which `locals` will be necessary in the parent and child configurations. Therefore, always copy over all
`locals`. We will use a different heuristic to cull down the `locals` to only those that are in use.

Note that you should mark off the block/attribute if any sub block or nested attribute is different. Pay careful
attention to nested attributes, as the diff may only show differences at a sub level.

### Using JSON rendering to identify semantic differences

If you have made many changes to the component since the Reference Architecture deployment, there is a strong chance
that you will have many non-semantic syntactic differences across the environments. For example, you may have extra
whitespace, or comments that make the `diff` output harder to parse. In this case, using `diff` is counter productive to
identifying the common configuration across the environments. Instead, you want to use the JSON rendering of the
Terragrunt configuration and semantically compare the JSON outputs.

1.  Install [hcl2json](https://github.com/tmccombs/hcl2json) and [jd](https://github.com/josephburnett/jd). `hcl2json` will be used to convert the Terragrunt configurations to `json`, and `jd` will be used to create a semantic diff between the two.

2.  For each Terragrunt configuration, convert the `terragrunt.hcl` file to `json` using `hcl2json`:

    - `hcl2json dev/us-west-2/dev/networking/vpc/terragrunt.hcl > dev/us-west-2/dev/networking/vpc/terragrunt.hcl.json`

3.  For Terragrunt configuration, run through `jd` against the reference point to identify differences in the json file.

    - `jd -set dev/us-west-2/dev/networking/vpc/terragrunt.hcl.json stage/us-west-2/stage/networking/vpc/terragrunt.hcl.json`

We use `-set` mode to make it easier to understand which blocks and attributes are different. In `set` mode, `jd` will output each diff in the following format:

    @ [KEYS,TO,ITEM]
    - REMOVED
    + ADDED

Each element in the list after `@` indicates the index to the item that is different. For example, in the following, the
first diff represents a difference in the `Title` attribute of the movie object that is in the 67th position of the
`Movies` list:

    @ ["Movies",67,"Title"]
    - "Dr. Strangelove"
    + "Dr. Evil Love"
    @ ["Movies",67,"Actors","Dr. Strangelove"]
    - "Peter Sellers"
    + "Mike Myers"
    @ ["Movies",102]
    + \{"Title":"Austin Powers","Actors":\{"Austin Powers":"Mike Myers"\}\}

Like with `diff`, cross off any blocks, attributes, and input keys from the initial list that are different based
on the output, except for `locals`. In the `jd` output, this would be the first element in each `@` entry, or the second
element of each `@` list that has `input` as the first element.

## Step 3: Extract common configurations

Once you have identified the list of common blocks, attributes, and input keys, the next step is to create a common
Terragrunt configuration that includes these values.

1.  Create a new file to house the common configuration. This should be placed somewhere that can be easily linked to
    from the root of the repository. We recommend using the following folder structure:

        .
        ├── terragrunt.hcl
        └── \_envcommon
        └── CATEGORY
        └── RESOURCE.hcl

    Where the common configuration files are placed in `_envcommon/CATEGORY/RESOURCE.hcl`. `CATEGORY` and `RESOURCE` should
    mimic the base folder structure of the Reference Architecture:

        .
        └── ACCOUNT
        ├── REGION
        │ ├── ENVIRONMENT
        │ │ └── CATEGORY
        │ │ └── RESOURCE
        │ └── \_regional
        │ └── RESOURCE
        └── \_global
        └── RESOURCE

    For example, for the `vpc` component, the `CATEGORY` will be `networking`, and the `RESOURCE` will be `vpc`, resulting
    in a common configuration file located at `_envcommon/networking/vpc.hcl`.

1.  Once you have the common configuration, copy over all the blocks,
    attributes, and input keys that you identified as common in [Step 2:
    Identify common configurations](#step-2-identify-common-configurations) from the reference configuration
    into the common configuration. You should also copy any relevant comment
    blocks as well so you can keep the comment references. Be sure to copy over
    the `locals` block as well.

1.  Update all relative paths to use `${get_terragrunt_dir()}`. This ensures
    that the relative paths would still be based off of the original child
    configuration path, and not the new path where the common configuration is
    located. For example, if you had the following `dependency` block:

    ```hcl
    dependency "vpc" {
    config_path = "../../networking/vpc"
    }
    ```

    Prepend `${get_terragrunt_dir()}` to the `config_path` attribute:

    ```hcl
    dependency "vpc" {
    config_path = "${get_terragrunt_dir()}../../networking/vpc"
    }
    ```

1.  For each variable in `locals`, check if the local variable is used in the configuration. If you find no references for the given
    local, remove it from the block.

At this point, you should have a Terragrunt configuration file in the `_envcommon` folder that only includes the
configuration values that are common across all the environments. The next and final step of the process is to update
the child configuration to import and merge the common configuration.

## Step 4: Update child configurations

Now that you have a common configuration file, it is time to update the child
configuration to point to the new common file. For each child Terragrunt
configuration:

1.  Before making any changes, use the `render-json` command (`terragrunt render-json --terragrunt-json-out original.terragrunt.hcl.json`) to snapshot
    a copy of the current configuration with all the blocks and attributes
    rendered. The output of `render-json` is different from the one generated
    with `hcl2json` because it represents the effective Terragrunt
    configuration, with all expressions evaluated. We will use this to sanity
    check the refactored version.

2.  Remove all the blocks, attributes, and input keys you identified in [Step 2:
    Identify common configurations](#step-2-identify-common-configurations).

3.  For each remaining variable in `locals`, check if the local variable is used
    in the configuration. If you find no references for the given local, remove
    it from the block.

4.  Add an `include` block to import the common configuration for the component.
    To do this, you will want to use the relative path from the root Terragrunt
    configuration:

    ```hcl
    include "envcommon" {
    # Get to the root dir of the project by taking the directory of the root Terragrunt configuration found using
    # find_in_parent_folders().
    path = "${dirname(find_in_parent_folders())}_envcommon/networking/vpc.hcl"
    }
    ```

5.  Update the root `include` block with a label, if it doesn’t have one. E.g., if you had:

    ```hcl
    include {
    path = find_in_parent_folders()
    }
    ```

    Add the label `"root"` to the block:

    ```hcl
    include "root" {
    path = find_in_parent_folders()
    }
    ```

6.  Sanity check the resulting Terragrunt configuration by regenerating the json output (`terragrunt render-json --terragrunt-json-out updated.terragrunt.hcl.json`). This should be semantically equivalent to the original snapshot you
    created. Use [jd](https://github.com/josephburnett/jd) to verify that the json files are semantically equivalent.

7.  Run through a final sanity check of the resulting Terragrunt configuration by running `terragrunt validate` and
    `terragrunt plan`. There should be no differences resulting from configuration drift.

At this point, your child Terragrunt configuration should be significantly smaller, with the bulk of the logic being
moved to the common component configuration.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "9df724247b43d94d4d9a0241e8513b6b"
}
##DOCS-SOURCER-END -->
