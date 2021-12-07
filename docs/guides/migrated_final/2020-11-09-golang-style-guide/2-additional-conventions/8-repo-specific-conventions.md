## Repo-specific conventions

### terratest

Note the existence of methods in terratest which are suffixed with the letter `E`, e.g.
[GetAccountIdE](https://github.com/gruntwork-io/terratest/blob/master/modules/aws/account.go#L23). Methods that have the
suffix `E` return an error as the last return value; methods without `E` mark the test as failed
(e.g., via calling `t.Fail()`) instead of returning an error.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"8babafee14d5aa42adf8138f4635aa91"}
##DOCS-SOURCER-END -->
