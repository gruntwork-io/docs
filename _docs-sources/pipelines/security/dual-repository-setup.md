# Dual-repository Setup

Some paragraph about using two different repositories and the security benefits...

## Separating infrastructure definitions from deployment mechanisms

Some intro paragraph...

### infrastructure-pipelines

- AWS access only from this repo
- write access limited to infra-admins only
- read access to infra-collaborators
- Workflows run in this repository only on code that is in the main branch

### infrastructure-live

- define AWS code
- write access to infra admins and infra collaborator

## Using GitHub teams to delegate access

- Access to the repositories is limited to three teams
    - infrastructure-administrators
    - infrastructure-collaborators
    - ci-code-read-only
- See access control
