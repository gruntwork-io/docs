package docfile

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestIsModuleDocOverviewRegEx(t *testing.T) {
	t.Parallel()

	testCases := []struct {
		path     string
		expected bool
	}{
		{"packages/module-vpc/modules/vpc-mgmt-network-acls/README.md", true},
		{"packages/module-vpc/modules/vpc-peering/README.md", true},
	}

	for _, testCase := range testCases {
		isMatch := checkRegex(testCase.path, IS_MODULE_DOC_OVERVIEW_REGEX)
		assert.Equal(t, testCase.expected, isMatch, "path = %s", testCase.path)
	}
}

func TestGetModuleDocOverviewRelOutputPath(t *testing.T) {
	t.Parallel()

	testCases := []struct {
		moduleDocOverview *ModuleDocOverview
		expected string
	}{
		{ &ModuleDocOverview{ relPath: "packages/module-vpc/modules/vpc-app/README.md" }, "packages/module-vpc/vpc-app/overview.md" },
		{ &ModuleDocOverview{ relPath: "packages/package-vpc/modules/vpc-peering/README.md" }, "packages/package-vpc/vpc-peering/overview.md" },
	}

	for _, testCase := range testCases {
		actual, err := testCase.moduleDocOverview.getRelOutputPath()
		assert.Nil(t, err, "relPath = %s", testCase.moduleDocOverview.relPath)
		assert.Equal(t, testCase.expected, actual, "relPath = %s", testCase.moduleDocOverview.relPath)
	}
}