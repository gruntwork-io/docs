package docfile

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

const GENERATOR_TESTS_FIXTURES_PATH = "test-fixtures/generator-tests"

func TestIsGlobalDocRegEx(t *testing.T) {
	t.Parallel()

	testCases := []struct {
		path     string
		expected bool
	}{
		{"global/help/support.md", true},
		{"global/introduction/tools.md", true},
	}

	for _, testCase := range testCases {
		isMatch := checkRegex(testCase.path, IS_GLOBAL_DOC_REGEX)
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
		isMatch := checkRegex(testCase.path, IS_MODULE_EXAMPLE_OVERVIEW_DOC_REGEX)
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
		{"packages/module-vpc/examples/vpc-app/README.md", false},
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
		isMatch := checkRegex(testCase.path, IS_PACKAGE_OVERVIEW_DOC_REGEX)
		assert.Equal(t, testCase.expected, isMatch, "path = %s", testCase.path)
	}
}

func TestIsPackageDocRegEx(t *testing.T) {
	t.Parallel()

	testCases := []struct {
		path     string
		expected bool
	}{
		{"packages/module-vpc/modules/_docs/README.md", true},
		{"packages/module-vpc/modules/_docs/subfolder/README.md", true},
		{"packages/module-vpc/_docs/README.md", false},
		{"packages/module-vpc/_docs/subfolder/README.md", false},
		{"packages/module-vpc/docs/README.md", false},
		{"packages/module-vpc/README.md", false},
	}

	for _, testCase := range testCases {
		isMatch := checkRegex(testCase.path, IS_PACKAGE_DOC_REGEX)
		assert.Equal(t, testCase.expected, isMatch, "path = %s", testCase.path)
	}
}

//func TestGetGlobalDocOutputPath(t *testing.T) {
//	t.Parallel()
//
//	testCases := []struct {
//		path     string
//		expected string
//	}{
//		{"global/help/support.md", "help/support.md"},
//		{"global/introduction/Getting Started.md", "introduction/Getting Started.md"},
//		{"global/introduction/overview.md", "introduction/overview.md"},
//	}
//
//	for _, testCase := range testCases {
//		actual, err := getGlobalDocOutputPath(testCase.path)
//		assert.Nil(t, err, "Error calling getGlobalDocOutputPath where path = %s: %s", testCase.path, err)
//		assert.Equal(t, testCase.expected, actual, "path = %s, regExStr = %s", testCase.path)
//	}
//}
//
//func TestGetModuleDocOutputPath(t *testing.T) {
//	t.Parallel()
//
//	testCases := []struct {
//		path     string
//		expected string
//	}{
//		{"packages/module-vpc/modules/vpc-app/_docs/module-doc.md", "packages/module-vpc/vpc-app/module-doc.md"},
//		{"packages/module-vpc/modules/vpc-app/_docs/something.md", "packages/module-vpc/vpc-app/something.md"},
//		{"packages/module-vpc/modules/vpc-app/_docs/file_name.md", "packages/module-vpc/vpc-app/file_name.md"},
//	}
//
//	for _, testCase := range testCases {
//		actual, err := getModuleDocOutputPath(testCase.path)
//		assert.Nil(t, err, "Error calling getGlobalDocOutputPath where path = %s: %s", testCase.path, err)
//		assert.Equal(t, testCase.expected, actual, "path = %s", testCase.path)
//	}
//
//	// These test cases should generate an error
//	errorTestCases := []struct {
//		path string
//	}{
//		{"packages/module-vpc/modules/vpc-app/_docs/subfolder/file_name.md"},
//	}
//
//	for _, testCase := range errorTestCases {
//		_, err := getModuleDocOutputPath(testCase.path)
//		assert.NotNil(t, err, "Expected the path %s would return a non-Nil error", testCase.path)
//	}
//}
//
//func TestCopyFile(t *testing.T) {
//	t.Parallel()
//
//	// Create a tempFile
//	file, err := ioutil.TempFile("", "docs-preprocessor")
//	if err != nil {
//		t.Fatal("Failed to create temp file.")
//	}
//
//	// Add random characters to distinguish the new file from the original
//	srcPath := file.Name()
//	dstPath := srcPath + "xyz"
//
//	copyFile(srcPath, dstPath)
//
//	assert.True(t, isFileExist(dstPath), "Expected %s to exist, but no file found at that path.", dstPath)
//}

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
