# Adding Collaborators to Delegated Repositories

:::note
Delegated Repositories are only available to AWS Accelerator Enterprise customers.
:::

## Introduction

When creating new delegated repositories, you can configure a list of GitHub collaborators and their permissions to be added to the repository.

## Understanding collaborator settings

GitHub collaborators are defined in the [account-factory configuration](/2.0/reference/accountfactory/configurations#github-collaborators).

Each collaborator entry consists of a **Team Name** and a **Permission**.

#### Team name

Teams must exist within the GitHub organization where Account Factory is running.

To locate a Team Name, navigate to your GitHub organization and select the "Teams" tab. The Team Name is the unique identifier for each team.

![Screenshot of Team Settings showing Team Name](/img/accountfactory/team-name.png)

In the example above, the Team Name is `platform-team`.

#### Permission

Permissions correspond to the <span class="external-link"><a href="https://docs.github.com/en/rest/teams/teams?apiVersion=2022-11-28#add-or-update-team-repository-permissions">GitHub Teams API</a></span>. 

Available options include `pull`, `triage`, `push`, `maintain`, `admin`, or a custom repository role name if defined by your organization.

## Adding collaborators

To add a team to new delegated repositories, include a new entry in the `collaborators` block of your Account Factory configuration.

Collaborators for each account type are automatically added to the corresponding repositories when they are created. To give a team access to multiple repository types, add them to the configuration for each type.

A common practice is to create an administrative team with access to all repositories, along with separate teams for each delegated repository.

For example, consider an organization with an administrative team called `platform-admins` and two account types, `foo` and `bar`. For each account type, you might create development teams with push access to their respective repositories, such as `foo-devs` and `bar-devs`.

The Account Factory configuration would look like this:

```yml title="./.gruntwork/config.yml"

pipelines:
  account-vending:
    foo:
      collaborators:
        - team: platform-admins
          permission: admin
        - team: foo-devs
          permission: push
    bar:
      collaborators:
        - team: platform-admins
          permission: admin
        - team: bar-devs
          permission: push
```

## Updating existing repositories

To update existing repositories, you must manually modify the repository settings.

Refer to the <span class="external-link"><a href="https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/managing-teams-and-people-with-access-to-your-repository">GitHub documentation</a></span> for detailed instructions.
