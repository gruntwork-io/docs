# Known errors

There are a few reasons your call to `destroy` may fail:

1. **Terraform bugs**: Terraform has a couple bugs ([18197](https://github.com/hashicorp/terraform/issues/18197) and
   [17862](https://github.com/hashicorp/terraform/issues/17862)) that may give the following error when you run
   `destroy`:

    ```bash
    variable "xxx" is nil, but no error was reported
    ```

    This usually happens when the module already had `destroy` called on it previously and you re-run `destroy`. In
    this case, your best bet is to skip over that module with the `--terragrunt-exclude-dir` (as shown in the previous)
    section.

1. **Missing dependencies**: If you delete modules in the wrong order, as discussed in the [Pre-requisite: understand
   module dependencies](pre-requisite-understand-module-dependencies) section, then when you try to `destroy` on a
   module that's missing one of its dependencies, you'll get an error about a `data` source being unable to find the
   data it's looking for. Unfortunately, there are no good solutions in this scenario, just a few nasty workarounds:

    1. Run `apply` to temporarily bring back the dependencies.
    1. Update the code to temporarily remove the dependencies and replace them with some mock data.
