# Naming things

Prefer descriptive names over short ones. In particular, avoid one-letter variable names, other than in case of very well
known and widely understood conventions, such as `i` for `index` (e.g. in a loop). A more descriptive name helps with
code understanding and maintenance, at very little cost, given the auto-complete feature in most IDEs and editors.

If a name contains an acronym, only capitalize the first letter of the acronym. E.g. use `someEksCluster` rather than
`someEKSCluster`. We go against the [recommendation](https://github.com/golang/go/wiki/CodeReviewComments#initialisms)
here in order to follow the convention already in use by some third party packages we heavily rely on (e.g. `aws-sdk-go`).

## Constants

Since many languages use `ALL_CAPS` for constants, it is worth calling out explicitly that
[Effective Go](https://golang.org/doc/effective_go.html#mixed-caps) recommends using `MixedCaps` for all names, including constants.
Therefore, `region` or `testRegion` for private constants and `Region` or `TestRegion` for public ones is preferred over
`REGION` or `TEST_REGION`.



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"d597f93501c76bf0373d5d54a57f0e4e"}
##DOCS-SOURCER-END -->
