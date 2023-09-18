# Repository Settings

- Branch protection

![Branch Protection Rule](/img/pipelines/security/branch_protection_rule.png)

- Add a CODEOWNERS file

```
.github/*   @infrastructure-administrators
*.hcl       @infrastructure-administrators
*.tf        @infrastructure-administrators
*.yml       @infrastructure-administrators
*.json      @infrastructure-administrators
```

- Ignoring changes to GitHub Actions Workflows
    - Done by default, but this only applies to commits where _all_ changes match the path-ignore filter.
        - see See https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#example-excluding-paths
