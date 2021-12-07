## Testing: Terratest

Gruntwork uses [Terratest](https://terratest.gruntwork.io) to write tests for Terraform modules. Terratest is a Go
library that provides patterns and helper functions for testing infrastructure code.

### Terratest best practices

Follow all the best practices listed in [Terratest best practices](https://terratest.gruntwork.io/docs/#testing-best-practices).

The rest of the items below are additional conventions on top of the documented best practices that Gruntwork follows
when writing tests using Terratest for terraform modules.

### Code formatting

Terratest is a Go library, so each test will be written in Go. All Go source files should be formatted using `goimports`
and `go fmt`.

### `examples` and `tests`

In many cases the individual modules in the `modules` folder are narrowly focused to a specific subset of the overall
infrastructure. This means that in many cases you will need to provide dependent resources externally to the module in
order to actually deploy them. The Terraform modules in the `examples` folder serves this purpose, specifying test
resources that are injected as dependencies to the modules.

As such, the tests should be written against the `examples` folder, as opposed to the `modules` folder directly. In
other words:

- Every module in `modules` should have a corresponding example module in `examples` that calls it. (NOTE: you can have
  a single example call multiple modules).

- Every example should have at least one test that calls it.

- Tests should not directly call modules in the `modules` folder. Always go through the `examples`.

### Parallel

Every test should have the `t.Parallel` call in the test function unless there is a specific need to run tests serially,
e.g. manipulating process global resources, like environment variables. This is so that tests run as quickly as possible.

To facilitate this, every reference to a terraform example should use
[test_structure.CopyTerraformFolderToTemp](https://pkg.go.dev/github.com/gruntwork-io/terratest/modules/test-structure#CopyTerraformFolderToTemp)
to create a copy of the example module in a temp directory. Then as the test runs, any stateful changes to the example
module directory are isolated across tests, so that there’s no conflict on parallel runs.

### Use TestStages for faster development

Use [test stages](https://terratest.gruntwork.io/docs/testing-best-practices/iterating-locally-using-test-stages/)
in the test code, unless you only have 1 or 2 steps in the test code (e.g. a `plan` verification test).

It’s very tedious to build and deploy resources over and over when you only want to tweak a validation step. TestStages
make it flexible and convenient to skip stages, making development much faster.

For each test stage you introduce, add a commented out series of `os.Setenv` calls to make it convenient to skip stages
as you develop.

```go
func TestJenkins(t *testing.T) {
        t.Parallel()

        // Uncomment the items below to skip certain parts of the test
        //os.Setenv("SKIP_build_ami", "true")
        //os.Setenv("SKIP_deploy_terraform", "true")
        //os.Setenv("SKIP_validate", "true")
        //os.Setenv("SKIP_cleanup", "true")
        //os.Setenv("SKIP_cleanup_ami", "true")

        defer test_structure.RunTestStage(t, "cleanup_ami", deleteAMI)
        defer test_structure.RunTestStage(t, "cleanup", destroyInfra)
        test_structure.RunTestStage(t, "build_ami", buildAMI)
        test_structure.RunTestStage(t, "deploy_terraform", deployInfra)
        test_structure.RunTestStage(t, "validate", validateInfra)
}
```

To use the stages, here’s an example workflow. The first time you run the test, you’ll want to skip only the `cleanup`
stages:

```go
// Uncomment the items below to skip certain parts of the test
//os.Setenv("SKIP_build_ami", "true")
//os.Setenv("SKIP_deploy_terraform", "true")
//os.Setenv("SKIP_validate", "true")
os.Setenv("SKIP_cleanup", "true")
os.Setenv("SKIP_cleanup_ami", "true")
```

Let’s say building and deploying were successful, but validation failed. Since resources were not cleaned up, we can run
only the `validate` stage. We skip the resource and time intensive `build` and `deploy` stages, and also continue to
skip the `cleanup` stages.:

```go
// Uncomment the items below to skip certain parts of the test
os.Setenv("SKIP_build_ami", "true")
os.Setenv("SKIP_deploy_terraform", "true")
//os.Setenv("SKIP_validate", "true")
os.Setenv("SKIP_cleanup", "true")
os.Setenv("SKIP_cleanup_ami", "true")
```

Once you’ve established that validation works, you can then run only the `cleanup` stages as below. Your workflow may vary.

```go
// Uncomment the items below to skip certain parts of the test
os.Setenv("SKIP_build_ami", "true")
os.Setenv("SKIP_deploy_terraform", "true")
os.Setenv("SKIP_validate", "true")
//os.Setenv("SKIP_cleanup", "true")
//os.Setenv("SKIP_cleanup_ami", "true")
```

When committing the final version of the test, all should be commented out so all stages run.

```go
// Uncomment the items below to skip certain parts of the test
//os.Setenv("SKIP_build_ami", "true")
//os.Setenv("SKIP_deploy_terraform", "true")
//os.Setenv("SKIP_validate", "true")
//os.Setenv("SKIP_cleanup", "true")
//os.Setenv("SKIP_cleanup_ami", "true")
```

### Setup and Teardown pattern

In some cases you will want to write a group of tests that use a common resource, such as a Docker image or VPC. In this
case, you will want to setup the common resource once, run a bunch of tests, and then teardown the resource. To achieve
this, you can follow [the subtest pattern](https://blog.golang.org/subtests) of Go.

Use [table driven tests](https://dave.cheney.net/2019/05/07/prefer-table-driven-tests) where possible to make
the subtest routines maintainable. Briefly, this means that you group your test cases using a test struct that reflects
the unique parameters of the test cases. Then you can conveniently loop over the test cases in parallel, taking
advantage of uniformity and speed.

Note that the subtest pattern has gotchas when running tests in parallel:

- The main test function will not wait for the subtest to run if it uses `t.Parallel`. To avoid this, you need to wrap
  the parallel subtests in a synchronous, blocking subtest. In the example below, the `group` subtest is synchronous (no
  call to `t.Parallel`) and thus the main function will wait until that test finishes. The `group` test does not finish
  until all the subtests it spawns are finished, even if they are non-blocking and parallel, and thus the `tearDownVPC`
  call does not happen until all subtests are done.

- If you are using table driven tests, the range variable will be updated to the next iteration before it is used within
  the subtest. That is, in the example below, if we did not have the `testCase := testCase` line in the range block, the
  `testCase` reference used in the subtest after the `t.Parallel` call will correspond to the last `testCase` in the
  `testCases` list. To avoid this, we create a new variable in the scope of the range block so that it does not get
  updated during the loop.

Example:

```go
func TestECS(t *testing.T) {
    t.Parallel()

    defer tearDownVPC()
    deployVPC()

    // Wrap the parallel tests in a synchronous test group to ensure that the main test function (the one calling
    // `tearDownVPC` and `deployVPC`) waits until all the subtests are done before running the deferred function.
    t.Run("group", func(t *testing.T) {
        for _, testCase := range testCases {
            // To avoid the range variable from getting updated in the parallel tests, we bind a new name that is within
            // the scope of the for block.
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
{"sourcePlugin":"Service Catalog Reference","hash":"50b251ba2026f8f531005ebad28a1a4d"}
##DOCS-SOURCER-END -->
