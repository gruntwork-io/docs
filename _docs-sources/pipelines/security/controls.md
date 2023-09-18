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

### OpenID Connect

- Identity Providers in AWS
- Trust policies to allow role assumption from workflow in pipelines on main

### No long lived credentials

- STS tokens are scoped to 1 hour by default

### Accessing AWS resources

- Code that can access AWS resources can only be run on `main` from workflows from the `infrastructure-pipelines` repository.
- See dual-repo setup page for more info
