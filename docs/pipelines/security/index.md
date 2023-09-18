# Controls

Some paragraph about controls...

## Defense in depth

Some intro paragraph...

### Token strategy

- Three tokens
- Exploiting tokens

### Apply guards

- Apply can only be run on code that exists on main

### Destroy guards

- Destroy can only be run on code that exists in a previous commit on main but _no longer_ exists on main

## AWS Credentials

Some intro paragraph...

### GitHub OIDC

- Identity Providers in AWS
- Trust policies

### No long lived credentials

- STS tokens are scoped to 1 hour by default

### Accessing AWS resources

- Code that can access AWS resources can only be run on `main` from workflows from the `infrastructure-pipelines` repository.
- See dual-repo setup page for more info


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "3efd74a6a969b9bfc664e57425b722d7"
}
##DOCS-SOURCER-END -->
