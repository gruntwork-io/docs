# Repo-specific conventions

## terratest

Note the existence of methods in terratest which are suffixed with the letter `E`, e.g.
[GetAccountIdE](https://github.com/gruntwork-io/terratest/blob/master/modules/aws/account.go#L23). Methods that have the
suffix `E` return an error as the last return value; methods without `E` mark the test as failed
(e.g., via calling `t.Fail()`) instead of returning an error.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"90d4263ce709339e84bc8e3109f38a05"}
##DOCS-SOURCER-END -->
