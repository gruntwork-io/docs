package docfile

import (
	"testing"
	"github.com/stretchr/testify/assert"
)

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

func TestGetModuleExampleDocRelOutputPath(t *testing.T) {
	t.Parallel()

	testCases := []struct {
		moduleExampleDoc *ModuleExampleDoc
		expected string
	}{
		{ &ModuleExampleDoc{ relPath: "packages/module-vpc/examples/vpc-app/example-doc.md" }, "packages/module-vpc/vpc-app/example-doc.md" },
	}

	for _, testCase := range testCases {
		actual, err := testCase.moduleExampleDoc.getRelOutputPath()
		assert.Nil(t, err, "relPath = %s", testCase.moduleExampleDoc.relPath)
		assert.Equal(t, testCase.expected, actual, "relPath = %s", testCase.moduleExampleDoc.relPath)
	}
}