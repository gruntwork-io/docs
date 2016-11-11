package docfile

import (
	"testing"
	"github.com/stretchr/testify/assert"
)

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


func TestGetModuleExampleOverviewDocRelOutputPath(t *testing.T) {
	t.Parallel()

	testCases := []struct {
		moduleExampleOverviewDoc *ModuleExampleOverviewDoc
		expected string
	}{
		{ &ModuleExampleOverviewDoc{ relPath: "packages/module-vpc/examples/vpc-app/README.md" }, "packages/module-vpc/vpc-app/examples.md" },
		{ &ModuleExampleOverviewDoc{ relPath: "packages/package-vpc/examples/network-acl-inbound/README.md" }, "packages/package-vpc/network-acl-inbound/examples.md" },
	}

	for _, testCase := range testCases {
		actual, err := testCase.moduleExampleOverviewDoc.getRelOutputPath()
		assert.Nil(t, err, "relPath = %s", testCase.moduleExampleOverviewDoc.relPath)
		assert.Equal(t, testCase.expected, actual, "relPath = %s", testCase.moduleExampleOverviewDoc.relPath)
	}
}