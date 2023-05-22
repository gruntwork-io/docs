# Understanding the Deployment Process

The Gruntwork Reference Architecture has three deployment phases.

### 1. Configuration

Configuration of the Gruntwork Reference Architecture is primarily the customer's responsibility.

- We deliver a templated `infrastructure-live-${COMPANY_NAME}` repository to you in our GitHub organization
- You access the repo in GitHub via invitation in the [Gruntwork Dev Portal](https://app.gruntwork.io)
- You use the Gruntwork CLI wizard to create accounts and set config options
- Pre-flight checks run via Github Actions to determine when the repo is ready for deployment
- Your accounts should be empty at conclusion of this phase
- You merge the PR to the `main` branch to initiate the deployment phase

### 2. Deployment

The deployment phase is primarily Gruntwork's responsibility.

- We monitor the deployment and fix any errors that occur as needed
- In some cases, back-and-forth with you may be required to resolve issues (e.g. AWS quota problems)
- Deployment is completed and the `infrastructure-live-${COMPANY_NAME}` repo is populated
- You should not touch accounts during this phase
- You receive an email notification when the deployment is complete

### 3. Adoption

The adoption phase is primarily the customer's responsibility.

- You complete “last mile” configuration following our handoff docs, including final Pipelines integrations with your CI/CD of choice
- You migrate the `infrastructure-live-${COMPANY_NAME}`repo to your own Version Control System or Github Organization
- You revoke Gruntwork access to your AWS account
- Your accounts are once again fully in your control
- From this point forward, we expect you to self-serve, with assistance from Gruntwork Support, as needed

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "0492cf9bd48be8490de3a42558e5c147"
}
##DOCS-SOURCER-END -->
