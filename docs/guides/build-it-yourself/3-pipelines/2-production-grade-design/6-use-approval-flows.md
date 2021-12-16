# Use approval flows

It is important that human review is baked into each deployment. As covered in [CI/CD workflows](../1-core-concepts/3-ci-cd-workflows.md), it is difficult to
build an automated test suite that builds enough confidence in your infrastructure code to do the right thing. This is
important, as failed infrastructure deployments could be catastrophic to your business, and there is no concept of
rollback with infrastructure deployment tools. This means that you will almost always want to have some form of approval
workflow for your infrastructure CI/CD pipeline so that you can review what is about to be deployed. Most generic CI/CD
platforms support approval workflows. For example, CircleCI supports
[approval steps in its workflow
engine](https://circleci.com/docs/2.0/workflows/#holding-a-workflow-for-a-manual-approval), in addition to [restricted contexts](https://circleci.com/docs/2.0/contexts/#restricting-a-context) to limit who
can approve the workflow.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"d325f74f841e4855de1ae04a2a4b1ff3"}
##DOCS-SOURCER-END -->
