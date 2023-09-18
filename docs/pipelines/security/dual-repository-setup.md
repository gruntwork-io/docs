# Dual-repository Setup

- Two repos -that separate infra definitions from deployment mechanisms
    - infrastructure-pipelines
        - AWS access only from this repo, which has write access limited to infra-admins only
        - Workflows run in this repository only on code that is in the main branch
    - infrastructure-live
        - define AWS code, write access to infra admins and infra collaborator

- Access to the repositories is limited to three teams
    - See access control


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "0676ffb9908b93dcff877f79a4941c60"
}
##DOCS-SOURCER-END -->
