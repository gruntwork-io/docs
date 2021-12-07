# Error handling

Prefer using the `errors` standard library package for handling single errors. For operations that can produce multiple
errors, leverage the [`MultiError`](https://github.com/gruntwork-io/terragrunt/blob/master/errors/multierror.go)
package by [accumulating
all the errors into a single `MultiError` and returning that](https://github.com/gruntwork-io/terragrunt/blob/cb369119bf5c6f3031e914e8554ffe056dcf9e22/cli/hclfmt.go#L62), rather than returning every error individually as it comes up.

[Don’t panic](https://github.com/golang/go/wiki/CodeReviewComments#dont-panic) (_hat tip, Douglas Adams_). Any method that
can have an error should return that error as its final value. This should be passed up through each layer, which can
decide what to do with it, all the way up to the very entrypoint of the app (or `main`) if necessary.
You should almost NEVER use `panic`.

Use custom error types. Create your own types that implement the `error` interface so that error messages are clear
and have well-defined types you can check against. For some examples of this, see e.g. the custom errors in the
[aws](https://github.com/gruntwork-io/terratest/blob/master/modules/aws/errors.go) package of `terratest`.

Include stack traces. In most of our code, we have to wrap errors with
[`errors.WithStackTrace(e)`](https://github.com/gruntwork-io/gruntwork-cli/blob/master/errors/errors.go#L22) to add the stack trace.
Go annoyingly doesn’t do this by default, but without it, sorting out an error can be very tricky.



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"b9fcb2701eb476faaa32fe51b3483551"}
##DOCS-SOURCER-END -->
