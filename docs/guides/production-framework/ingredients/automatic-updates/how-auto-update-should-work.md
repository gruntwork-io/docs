# How Automatic Updates should work

## Automation-driven

The key to keeping dependencies up to date and security vulnerabilities patched is to ensure that the process is automated. If you have to rely on a human being having to remember to keep things up to date, then it's just a matter of time before that person gets busy, forgets, and suddenly, you're running an ancient version of Kubernetes or Terraform that's no longer supported and nearly impossible to update. With automated updates, you can ensure that you stay up to date on a regular cadence, so that each step is small and easy to incorporate, and you never fall too far behind.

## GitOps-driven

Just as with all the other ingredients in the list, your automatic update solution should be based on commits to version control. Whenever a maintainer releases a new version of one of your dependencies, a pull request is opened automatically in your repos to update those repos to use the new version of that dependency.

## Tested

Since the updates are driven via commits to version control, the whole process naturally ties into your code review and testing workflow. The CI / CD pipeline will automatically run tests against the update, the results of those tests will be visible in the pull request, and your developers can review the code and test results, and if everything looks good, confidently merge in the changes.

## Deployed

Once the update is merged, the CI / CD pipeline again kicks in, and automatically deploys the updates. This ensures that the changes are tested immediately, so if there's a problem, you find out early on—very shortly after the new version of the dependency came out—rather than weeks or months later, when the issue is much harder to track down and fix.



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"1d9283d627bcec9be8c17049eab3ad3a"}
##DOCS-SOURCER-END -->
