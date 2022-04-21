# Pre-requisite: force_destroy on S3 buckets

By default, if your Terraform code includes an S3 bucket, when you run `terraform destroy`, if that bucket contains
any content, Terraform will _not_ delete the bucket and instead will give you an error like this:

```
bucketNotEmpty: The bucket you tried to delete is not empty. You must delete all versions in the bucket.
```

This is a safety mechanism to ensure that you don't accidentally delete your data.

*If you are absolutely sure you want to delete the contents of an S3 bucket* (remember, there's no undo!!!), all the
services that use S3 buckets expose a `force_destroy` setting that you can set to `true` in your `terragrunt.hcl`
files to tell that service to delete the contents of the bucket when you run `destroy`. Here's a partial list of
services that expose this variable (note, you may not have all of these in your Reference Architecture!):

* `networking/alb`
* `mgmt/openvpn-server`
* `landingzone/account-baseline-app`
* `services/k8s-service`


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "ee44dc198c327e0255356257c89b1b77"
}
##DOCS-SOURCER-END -->
