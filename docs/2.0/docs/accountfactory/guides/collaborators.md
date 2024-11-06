# Adding Collaborators to Delegated Repositories

:::note
Delegated Repositories are only available to DevOps Foundations Enterprise customers.
:::

## Introduction

When vending new delegated repositories you can configure a list of GitHub collaborators and permissions that will be added to the new repository.

## Understanding collaborator settings

GitHub collaborators can be defined in [account-factory configuration](/2.0/reference/accountfactory/configurations#github-collaborators).

Each object in the sequence is a pair of **Team Name** and **Permission**.

#### Team Name

Teams must exist within your GitHub Organization where Account Factory is running.

To find a Team Name navigate to your Organization, and select the Teams tab. The Team Name is the unique identifier for each team.

![Screenshot of Team Settings showing Team Name](/img/account-factory/team-name.png)

In the above screenshot the Team Name is `platform-team`.

#### Permission

Permissions directly map to the <span class="external-link"><a href="https://docs.github.com/en/rest/teams/teams?apiVersion=2022-11-28#add-or-update-team-repository-permissions">GitHub Teams API</a></span>

The options are `pull`, `triage`, `push`, `maintain`, `admin`, or a custom repository role name, if the your organization has defined any.

## Adding collaborators

To add a team to new delegated repositories add a new item to the collaborators block in your account factory configuration.

All collaborators in each account type will be added to new repositories of that type when the repository is createde. If you want to add a team to vended repositories of different types you will need to add them in multiple places.

A common scenario is to create a team for administration that is granted access everywhere, and individual teams for each delegated repository.

For example you might have the existing team `platform-admins`, and two account types `foo` and `bar`. For each account type you would then create a development team that should be granted push access to the repository `foo-devs` and `bar-devs`.

Your Account Factory configuration would look something like:

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

To update existing repositories you will need to manually make changes to the repository settings.

See the <span class="external-link"><a href="https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/managing-teams-and-people-with-access-to-your-repository">documentation on GitHub</a></span> for more information.