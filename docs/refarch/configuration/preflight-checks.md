# Iterate on Preflight checks

Once you have run the bootstrap script and pushed your `ref-arch-form` branch with your changes, your `infrastructure-live` repository GitHub Actions will commence, running
preflight checks against every commit that you push up to this branch.

![Gruntwork Reference Architecture preflight checks](/img/preflight1.png)

Preflight checks can take up to 4-5 minutes to complete after you push your commit. Any errors will be
directly annotated on the exact line of your form that presents a blocking issue, so be sure to check the *Files changed* tab of your pull request to see them:

![Gruntwork Ref Arch preflight checks on your pull request](/img/preflight-error-on-pr.png)

## Fix up any errors

In most cases, the error messages included in the preflight check annotations will provide sufficient information to remediate the underlying issue. If at any point you are confused or
need assistance, please reach out to us at `support@gruntwork.io` and we'll be happy to assist you.

## Commit your form changes and push to your `ref-arch-form` branch

Once you have fixed any issues flagged by preflight checks, you can make a new commit with your latest form changes and push it up to the same branch. This will trigger a re-run of preflight
checks using your latest form data.

## Merge your pull request

Once your preflight checks pass, meaning there are no more error annotations on your pull request
and the GitHub check itself is green, you can merge your pull request to the `main` branch.

## Sit tight and wait for your deployment to commence

Merging your `ref-arch-form` pull request to the `main` branch will automatically kick off the deployment process for your Reference Architecture. There's nothing more for you to do at this point. During deployment we ask
that you please do not log into, modify or interact with your Reference Architecture AWS accounts in any way or make any modifications to your `infrastructure-live` repo once you have merged your pull request.

Your deployment is now in Gruntwork engineers' hands and we are notified of every single error your deployment encounters. We'll work behind the scenes to complete your deployment, communicating with you via email or GitHub if we need
any additional information or if we need you to perform any remediation steps to un-block your deployment.

Once your deployment completes, you'll receive an automated email with next steps and a link to your Quick Start guide that has been written to your `infrastructure-live` repository.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "48546f70af86b93fdffadd238cee2dbd"
}
##DOCS-SOURCER-END -->
