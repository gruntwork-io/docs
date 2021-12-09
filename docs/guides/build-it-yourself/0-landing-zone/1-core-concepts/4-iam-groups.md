# IAM groups

An _[IAM group](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_groups.html)_ is a collection of IAM users. You can
attach IAM policies to an IAM group and all the users in that group will inherit the permissions from that policy.
Instead of managing permissions by attaching multiple IAM policies directly to each IAM user—which can become very hard
to maintain as the number of policies and users grows and your organization changes—you can create a relatively fixed
number of groups that represent your company’s structure and permissions (e.g., `developers`, `admins`, and `billing`)
and assign each IAM user to the appropriate IAM groups.






<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"6ed6987baac0556cbd72538586818a92"}
##DOCS-SOURCER-END -->
