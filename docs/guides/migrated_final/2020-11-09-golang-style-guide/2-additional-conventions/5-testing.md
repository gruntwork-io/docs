# Testing

In terms of testing, we don’t necessarily aim for 100% test coverage. Rather, our goal is to have enough testing to give
us confidence that our code works and allow us to update it quickly. When adding tests, keep in mind these factors:

1.  The likelihood of bugs: some code is harder to get right than others, and merits correspondingly more tests.

2.  The cost of bugs: some bugs are much more costly than others — e.g., bugs in payment systems or security functionality —
    so it makes sense to invest more in testing there.

3.  The cost of tests: some types of tests are cheap and easy to write and maintain, whereas others are very costly and brittle.

Unless there’s a reason not to, tests should run in parallel. This is done by including a call to `t.Parallel` in the test function.

## Setup and Teardown pattern

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



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"66fcb887e00ddc553fc87e015d6dd319"}
##DOCS-SOURCER-END -->
