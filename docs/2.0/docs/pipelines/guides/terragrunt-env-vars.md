# Leveraging advanced Terragrunt Features

## Introduction

When Pipelines detects changes to IaC in your infrastructure repositories it will invoke `terragrunt` with a specific set of command line arguments for the detected change. For example for a change to a single unit in a pull request pipelines will `chdir` into the unit directory and invoke `terragrunt plan --terragrunt-non-interactive`.

You can inspect the specific command in different scenarios by viewing the logs for a Pipelines workflow run.

In some cases you may find that you need to pass additional options to terragrunt to meet your specific needs. All cli options for Terragrunt also have a corresponding Environment Variable that if populated will change Terragrunt behavior.

See the full list of available options <span class="external-link"><a href="https://terragrunt.gruntwork.io/docs/reference/cli-options/#cli-options">in the Terragrunt documentation</a></span>.

## Adding Environment Variables

:::note
For security reasons GitHub workflows do not automatically pass environment variables from the workflows in your repository into the included workflows in Gruntwork repositories, and you will need to add them to the Pipelines configuration file for them to propagate to Terragrunt executions.
:::

Pipelines can be configured to pass additional Environment Variables to Terragrunt via the [env configuration option](/2.0/reference/pipelines/configurations#env) in `.gruntwork/config.yml`.

Each item in the env sequence corresponds to an Environment Variable name and value.

For example you may want to add the flag `---terragrunt-strict-include` to your Pipelines Terragrunt runs. To do so you would set the environment variable `TERRAGRUNT_STRICT_INCLUDE` to `true` in your Pipelines configuration.

E.g.
```yml title=".gruntwork/config.yml"
pipelines:
    env:
    - name: TERRAGRUNT_STRICT_INCLUDE
      value: true
```

On the next workflow run you can inspect the workflow logs and look for an env: block on the action executing Terragrunt. If everything is configured correctly you will see your addtional Environment Variable has been passed through to the action.

![Screenshot of addtional Environment Variable](/img/pipelines/guides/custom-env-var.png)
