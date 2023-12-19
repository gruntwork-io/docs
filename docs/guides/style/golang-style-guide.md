---
category: Style Guides
excerpt: The style guide for the Go programming language that is used by all Gruntwork-owned code repositories that contain Go code.
tags: ["go", "golang", "code", "style"]
---

# Go Style Guide

This is Gruntwork’s style guide for the Go programming language. It aims to help us ensure that the code we write is
clear, readable, idiomatic Go code. The conventions detailed in this guide are our preferences and should be thought of
as guidelines rather than hard rules.

## Starting point

We use the excellent [Effective Go](https://golang.org/doc/effective_go.html) guide as the starting point for our style
guide. **Unless explicitly mentioned otherwise, we default to following the conventions outlined in Effective Go.**

Another helpful resource is the [CodeReviewComments](https://github.com/golang/go/wiki/CodeReviewComments) section of the
Go GitHub wiki page.

Below you will find the list of conventions that differ from the above mentioned documents, either because they are
specific to Gruntwork, or because we consciously chose to go against what Effective Go and CodeReviewComments recommend.

## Additional conventions

### General

Before committing any Go code, run `go fmt`. We run this as part of the CI build, so this will prevent your build from failing.

### Comments

Every public function `Foo` should have a `//` comment of the style `Foo <explanation>`,
where explanation says what `Foo` does, and more importantly, why it does that, what assumptions it makes, and other
aspects not obvious from the function name.

### Control structures

When possible, avoid nesting `if`/`else` statements. (Of course, a single, non-nested `if`/`else` is perfectly fine.)
Prefer multiple `return` statements over nested code. This makes the code more readable and avoids complexity.

E.g:

```go
// Do this
if something {
        doThis()
        return this
}
if orOther {
        return that
}
return theOther
```

```go
// Don't do this
if something {
        doThis()
} else {
        if orOther {
                return that
        }
}
```

### Error handling

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

### Pointer usage

Prefer using value type over pointers, unless necessary. Generally speaking, there are only a few cases where pointer
usage would be justified:

1.  You have very large structs containing lots of data. Instead of copying these around, passing pointers may be more
    efficient.

2.  You need to mutate a variable you passed to a function. Generally speaking, you should avoid this anyway (see the
    section on immutability below), but sometimes it is necessary (think "rename" methods, etc).

3.  You need to return `nil` as the default zero value (the default zero value for pointers is `nil`, as opposed to other data
    types that have non-nil default zero values).

### Testing

In terms of testing, we don’t necessarily aim for 100% test coverage. Rather, our goal is to have enough testing to give
us confidence that our code works and allow us to update it quickly. When adding tests, keep in mind these factors:

1.  The likelihood of bugs: some code is harder to get right than others, and merits correspondingly more tests.

2.  The cost of bugs: some bugs are much more costly than others — e.g., bugs in payment systems or security functionality —
    so it makes sense to invest more in testing there.

3.  The cost of tests: some types of tests are cheap and easy to write and maintain, whereas others are very costly and brittle.

Unless there’s a reason not to, tests should run in parallel. This is done by including a call to `t.Parallel` in the test function.

#### Setup and Teardown pattern

In some cases you will want to write a group of tests that use a common resource, such as a Docker image or VPC.
In this case, you will want to setup the common resource once, run a bunch of tests, and then teardown the resource.
To achieve this, you can follow [the subtest pattern](https://blog.golang.org/subtests) of Go.

Always use [table driven tests](https://dave.cheney.net/2019/05/07/prefer-table-driven-tests) where possible to make the
subtest routines maintainable. Briefly, this means that you group your test cases using a test struct that reflects
the unique parameters of the test cases. Then you can conveniently loop over the test cases in parallel, taking advantage
of uniformity and speed.

Note that the subtest pattern has gotchas when running tests in parallel:

- The main test function will not wait for the subtest to run if it uses `t.Parallel`. To avoid this, you need to wrap
  the parallel subtests in a synchronous, blocking subtest. In the example below, the `group` subtest is synchronous
  (no call to `t.Parallel`) and thus the main function will wait until that test finishes. The `group` test does not
  finish until all the subtests it spawns are finished, even if they are non-blocking and parallel, and thus the
  `tearDownVPC` call does not happen until all subtests are done.

- If you are using table driven tests, the range variable will be updated to the next iteration before it is used within
  the subtest. That is, in the example below, if we did not have the `testCase := testCase` line in the range block,
  the `testCase` reference used in the subtest after the `t.Parallel` call will correspond to the last `testCase` in the
  `testCases` list. To avoid this, we create a new variable in the scope of the range block so that it does not get
  updated during the loop.

Example:

```go
func TestECS(t *testing.T) {
    t.Parallel()

    defer tearDownVPC()
    deployVPC()

    // Wrap the parallel tests in a synchronous test group to
    // ensure that the main test function (the one calling
    // `tearDownVPC` and `deployVPC`) waits until all the
    // subtests are done before running the deferred function.
    t.Run("group", func(t *testing.T) {
        for _, testCase := range testCases {
            // To avoid the range variable from getting updated in the
                // parallel tests, we bind a new name that is within the
                // scope of the for block.
            testCase := testCase
            t.Run(testCase.name, func(t *testing.T) {
                t.Parallel()
                testCase.testCode()
            })
        }
    })
}
```

### Naming things

Prefer descriptive names over short ones. In particular, avoid one-letter variable names, other than in case of very well
known and widely understood conventions, such as `i` for `index` (e.g. in a loop). A more descriptive name helps with
code understanding and maintenance, at very little cost, given the auto-complete feature in most IDEs and editors.

If a name contains an acronym, only capitalize the first letter of the acronym. E.g. use `someEksCluster` rather than
`someEKSCluster`. We go against the [recommendation](https://github.com/golang/go/wiki/CodeReviewComments#initialisms)
here in order to follow the convention already in use by some third party packages we heavily rely on (e.g. `aws-sdk-go`).

#### Constants

Since many languages use `ALL_CAPS` for constants, it is worth calling out explicitly that
[Effective Go](https://golang.org/doc/effective_go.html#mixed-caps) recommends using `MixedCaps` for all names, including constants.
Therefore, `region` or `testRegion` for private constants and `Region` or `TestRegion` for public ones is preferred over
`REGION` or `TEST_REGION`.


### Using packages

A common Go pattern is creating new packages under the `pkg` or `internal` directories. If you are unsure about which
one to use, follow this simple litmus test:

- The `internal` directory contains code that we don't want to be consumed by other clients.
  - Telemetry is a great example, as it is typically app-specific and may have a private DSN.
  - It would be unfortunate for another CLI app to import this package and inadvertently emit events.
- The `pkg` directory contains all packages that we want to make exportable to other clients.
  - Most of our code should generally live under `pkg`, except for very particular private methods.

A good primer on this layout is available in the following [blog post](https://stackoverflow.com/questions/73007657/go-internal-and-pkg-packages-sharing-same-name).

### Functional programming practices

#### Immutability

Prefer returning a new value rather than mutating an existing one.

```go
// Don't do this
var result int = 0

func main() {
    add(1, 1, &result)
    fmt.Println(result)
}

func add(a, b int, result *int) {
    *result = a + b
}
```

```go
// Do this instead
func main() {
    fmt.Println(add(1, 1))
}

func add(a, b int) int {
    return a + b
}
```

#### Pure functions

Prefer functions that take all their inputs as function parameters, instead of reading those inputs via side effects
(e.g., reading from disk or the network or global vars), and whose entire behavior is to return values
(note: errors are values too!), rather than performing side effects (e.g. by writing to disk or the network or global
vars). Of course, you can’t avoid side effects forever if you want your code to do something useful, but try to do as
much of your logic with pure functions as you can, try to pass everything around as explicit parameters and return
everything as explicit values, and centralize the side effecting code to a few isolated places.

#### Composition

Build your code out of small, reusable, named functions, that you compose together.

```go
// Don't do this
func main() {
    fmt.Println(mulOfSums(1, 1))
}

func mulOfSums(a, b int) int {
    return (a + b) * (a + b)
}
```

```go
// Do this instead
func main() {
    fmt.Println(mul(add(1, 1), add(1, 1)))
}

func add(a, b int) int {
    return a + b
}

func mul(a, b int) int {
    return a * b
}
```

#### Functional options pattern

This pattern can be easily summarized using code:

```go
// Instead of instantiating a struct with many arguments:
patcher, err := patcher.New(opts, true, true)
```

```go
// Use functional options instead:
patcher, err := patcher.New(opts, options.WithResolveDependencies(), options.WithApplyPatches())
```

Be sure to read this [blog post](https://golang.cafe/blog/golang-functional-options-pattern.html) for more information
on this pattern.

### Repo-specific conventions

#### terratest

Note the existence of methods in terratest which are suffixed with the letter `E`, e.g.
[GetAccountIdE](https://github.com/gruntwork-io/terratest/blob/master/modules/aws/account.go#L23). Methods that have the
suffix `E` return an error as the last return value; methods without `E` mark the test as failed
(e.g., via calling `t.Fail()`) instead of returning an error.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "e93b40d9d95beb59343da5673e66b29c"
}
##DOCS-SOURCER-END -->
