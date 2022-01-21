# Removing the terraform state

**NOTE: Deleting state means that you lose the ability to manage your current terraform resources! Be sure to only
delete once you have confirmed all resources are destroyed.**

Once all the resources for an environment have been destroyed, you can remove the state objects managed by `terragrunt`.
The reference architecture manages state for each environment in an S3 bucket in each environment's AWS account.
Additionally, to prevent concurrent access to the state, it also utilizes a DynamoDB table to manage locks.

To delete the state objects, login to the console and look for the S3 bucket in the environment you wish to undeploy. It
should begin with your company's name and end with `terraform-state`. Also look for a DynamoDB
table named `terraform-locks`. You can safely remove both **once you have confirmed all the resources have been
destroyed successfully**.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"9c3adf3f67ede26bb4c92a2567125676"}
##DOCS-SOURCER-END -->
