# Dual-repository Setup

- Two repos -that separate infra definitions from deployment mechanisms
    - infrastructure-pipelines
        - AWS access only from this repo, which has write access limited to infra-admins only
        - Workflows run in this repository only on code that is in the main branch
    - infrastructure-live
        - define AWS code, write access to infra admins and infra collaborator
- Access to the repositories is limited to three teams
    - infrastructure-administrators
    - infrastructure-collaborators
    - ci-code-read-only
    - See access control
