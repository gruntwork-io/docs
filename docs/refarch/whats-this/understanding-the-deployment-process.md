# Understanding the Deployment Process

The Gruntwork Reference Architecture has three deployment phases.

### Configuration

Configuration of the Gruntwork Reference Architecture is primarily your responsibility.

- We deliver a templated `infrastructure-live-${YOUR_COMPANY_NAME}` repository to you in our GitHub organization
- You access the repo in GitHub via invitation in the [Gruntwork Dev Portal](https://app.gruntwork.io)
- You use the Gruntwork CLI wizard to create accounts and set config options
- Pre-flight checks run via Github Actions to determine when the repo is ready for deployment
- The AWS accounts you are deploying the Reference Architecture to should be empty at conclusion of this phase
- You merge the PR to the `main` branch to initiate the deployment phase

### Deployment

The deployment phase is primarily our responsibility..

- We monitor the deployment and fix any errors that occur as needed
- In some cases, we may need to communicate with you to resolve issues (e.g. AWS quota problems)
- Deployment is completed and the `infrastructure-live-${YOUR_COMPANY_NAME}` repo is populated
- During the deployment phase, you should not attempt to modify resources in or respond to any automated notifications from your AWS accounts
- Once the deployment is complete, you will receive an email

### Adoption

The adoption phase is primarily your responsibility.

- You complete “last mile” configuration following our handoff docs, including final Pipelines integrations with your CI/CD of choice
- You migrate the `infrastructure-live-${YOUR_COMPANY_NAME}` repo to your own Version Control System or Github Organization
- You revoke Gruntwork access to your AWS account
- At this points, your AWS accounts are fully in your control
- From this point forward, we expect you to self-serve, with assistance from Gruntwork Support, as needed


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "cf6753f76e4c398473341c8de87bebbd"
}
##DOCS-SOURCER-END -->
