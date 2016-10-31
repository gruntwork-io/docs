package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

const GENERATOR_TESTS_FIXTURES_PATH = "test-fixtures/generator-tests"

func TestShouldSkipPath(t *testing.T) {
	t.Parallel()

	testCases := []struct {
		path      string
		inputPath string
		excludes  []string
		expected  bool
	}{
		{"", "", []string{}, true},
		{".", ".", []string{}, true},
		{"foo/bar/baz", "foo/bar/baz", []string{}, true},
		{"foo/bar/baz/blah", "foo/bar/baz", []string{}, false},
		{"foo/bar/baz/blah", "foo/bar", []string{"*"}, true},
		{"foo/bar/baz/blah", "foo/bar", []string{"**"}, true},
		{"foo/bar/baz/blah", "foo/bar", []string{"*.*"}, false},
		{"foo/bar/baz/blah", "foo/bar", []string{"some/other/path"}, false},
		{"foo/bar/baz/blah", "foo/bar", []string{"foo/**/blah"}, true},
		{"foo/bar/baz/blah", "foo/bar", []string{"foo/**/abc"}, false},
	}

	for _, testCase := range testCases {
		globs, err := ToGlobs(testCase.excludes)
		assert.Nil(t, err, "Failed to compile glob patterns: %s", testCase.excludes)

		actual := shouldSkipPath(testCase.path, &Opts{InputPath: testCase.inputPath, Excludes: globs})
		assert.Equal(t, testCase.expected, actual, "path = %s, inputPath = %s, excludes = %s", testCase.path, testCase.inputPath, testCase.excludes)
	}
}

func TestIsPackageOverviewRegEx(t *testing.T) {
	t.Parallel()

	testCases := []struct {
		path     string
		expected bool
	}{
		{"packages/module-vpc/README.md", true},
		{"packages/module-vpc/examples/README.md", false},
		{"packages/module-vpc/examples/vpc-app/README.md", false},
		{"packages/module-vpc/overview.md", false},
		{"packages/package-vpc/README.md", true},
		{"packages/package-_.vpc/overview.md", false},
	}

	for _, testCase := range testCases {
		isMatch := checkRegex(testCase.path, IS_PACKAGE_OVERVIEW_REGEX)
		assert.Equal(t, testCase.expected, isMatch, "path = %s", testCase.path)
	}
}

func TestIsImageRegEx(t *testing.T) {
	t.Parallel()

	testCases := []struct {
		path     string
		expected bool
	}{
		{"global/help/images/sample.jpg", true},
		{"global/help/images/sample.png", true},
		{"global/help/images/sample.gif", true},
		{"global/help/sample.gif", true},
		{"global/sample.png", true},
		{"global/help/images/sample.doc", false},
	}

	for _, testCase := range testCases {
		isMatch := checkRegex(testCase.path, IS_IMAGE_REGEX)
		assert.Equal(t, testCase.expected, isMatch, "path = %s", testCase.path)
	}
}

func TestIsModuleExampleOverviewRegEx(t *testing.T) {
	t.Parallel()

	testCases := []struct {
		path     string
		expected bool
	}{
		{"packages/module-vpc/examples/vpc-app/README.md", true},
		{"packages/package-vpc/examples/vpc-app/README.md", true},
		{"packages/something_else/examples/some_module_name/README.md", true},
		{"packages/something_else/examples/some_module_name/overview.md", false},
		{"packages/package-name/some_module_name/README.md", false},
	}

	for _, testCase := range testCases {
		isMatch := checkRegex(testCase.path, IS_MODULE_EXAMPLE_OVERVIEW_REGEX)
		assert.Equal(t, testCase.expected, isMatch, "path = %s", testCase.path)
	}
}

func TestIsModuleOverviewRegEx(t *testing.T) {
	t.Parallel()

	testCases := []struct {
		path     string
		expected bool
	}{
		{"packages/module-vpc/modules/vpc-mgmt-network-acls/README.md", true},
		{"packages/module-vpc/modules/vpc-peering/README.md", true},
	}

	for _, testCase := range testCases {
		isMatch := checkRegex(testCase.path, IS_MODULE_OVERVIEW_REGEX)
		assert.Equal(t, testCase.expected, isMatch, "path = %s", testCase.path)
	}
}

func TestIsModuleExampleDocRegEx(t *testing.T) {
	t.Parallel()

	testCases := []struct {
		path     string
		expected bool
	}{
		{"packages/module-vpc/examples/vpc-app/Example.md", true},
		{"packages/module-vpc/examples/vpc-app/_docs/Example.md", true},
		{"packages/module-vpc/examples/vpc-app/docs/Example.md", true},
		{"packages/module-vpc/examples/vpc-app/docs/Example.txt", false},
		{"packages/module-vpc/examples/vpc-app/Example.txt", false},
		{"packages/module-vpc/examples/Example.txt", false},
	}

	for _, testCase := range testCases {
		isMatch := checkRegex(testCase.path, IS_MODULE_EXAMPLE_DOC_REGEX)
		assert.Equal(t, testCase.expected, isMatch, "path = %s", testCase.path)
	}
}


// func TestProcessDocumentationFile(t *testing.T) {
// 	t.Parallel()

// 	testCases := []struct {
// 		inputFixturePath          string
// 		expectedOutputFixturePath string
// 	}{
// 		{"documentation.txt", "documentation-output.txt"},
// 		{"documentation-no-urls.md", "documentation-no-urls-output.md"},
// 		{"documentation-with-urls.md", "documentation-with-urls-output.md"},
// 		{"logo.png", "logo-output.png"},
// 	}

// 	for _, testCase := range testCases {
// 		actual, err := getContentsForDocumentationFile(testCase.inputFixturePath, &Opts{InputPath: GENERATOR_TESTS_FIXTURES_PATH})
// 		assert.Nil(t, err, "Error processing file %s: %v", testCase.inputFixturePath, err)

// 		expected := readProcessorTestsFixturesFile(t, testCase.expectedOutputFixturePath)
// 		assert.Equal(t, expected, actual, "inputFixturePath = %s, expectedOutputFixturePath = %s.\nExpected:\n%s\nActual:\n%s", testCase.inputFixturePath, testCase.expectedOutputFixturePath, string(expected), string(actual))
// 	}
// }

// func readProcessorTestsFixturesFile(t *testing.T, file string) []byte {
// 	bytes, err := ioutil.ReadFile(path.Join(GENERATOR_TESTS_FIXTURES_PATH, file))
// 	if err != nil {
// 		t.Fatal(err)
// 	}
// 	return bytes
// }
