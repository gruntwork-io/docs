import { HclListItem, HclListItemExample, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '/src/components/HclListItem.tsx';

# Account Factory Configurations

Account factory configurations are located under the `pipelines` key in `.gruntwork/config.yml`

## Enterprise Options

### account-vending

<HclListItem name="account-vending" requirement="required" type="sequence(mapping)">
<HclListItemDescription>
A sequence of account types mapped to their configurations [see below](#account-type-configuration).
Valid types are `sandbox` and `sdlc`.
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  account-vending:
    sandbox:
      account-identifiers:
        - sandbox
    sdlc:
      account-identifiers:
        - dev
        - stage
        - prod
```

</HclListItemExample>
</HclListItem>

## Account Type Configuration

### account-identifiers

<HclListItem name="account-identifiers" requirement="required" type="sequence(string)">
<HclListItemDescription>
Sequence of account identifiers.
**Alphanumeric account identifiers only.** On account requests, an account will be created for each specified identifier & the account name will include the identifier. e.g. "&lt;ACCOUNT-FAMILY&gt;-dev"
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  account-vending:
    sdlc:
      account-identifiers:
        - dev
        - stage
        - prod
```

</HclListItemExample>
</HclListItem>

### catalog-repositories

<HclListItem name="catalog-repositories" requirement="optional" type="sequence(string)">
<HclListItemDescription>
Sequence of repositories that contain infrastructure modules that can be easily leveraged as a catalog by delegated repositories vended by the infrastructure-root repository.
For more information, see <span class="external-link"><a href="https://terragrunt.gruntwork.io/docs/features/catalog/">Terragrunt Catalog</a></span>
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  account-vending:
    sdlc:
      catalog-repositories:
        - "github.com/acmecorp/infrastructure-modules//."
```

</HclListItemExample>
</HclListItem>

### github-collaborators

<HclListItem name="github-collaborators" requirement="optional" type="sequence(mapping)">
<HclListItemDescription>
Sequence of GitHub teams and their permissions automatically added to delegated repositories vended by the infrastructure-root repository.
Valid permissions are: pull, triage, push, maintain and admin (in addition to custom roles if any exist)
See <span class="external-link"><a href="https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/repository-roles-for-an-organization#permissions-for-each-role">GitHub Repository Roles</a></span>
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  account-vending:
    sandbox:
      github-collaborators:
        - team: 'team-name'
          permission: pull
```

</HclListItemExample>
</HclListItem>