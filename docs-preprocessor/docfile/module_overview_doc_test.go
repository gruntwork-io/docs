package docfile

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestIsModuleOverviewDocRegEx(t *testing.T) {
	t.Parallel()

	testCases := []struct {
		path     string
		expected bool
	}{
		{"packages/module-vpc/modules/vpc-mgmt-network-acls/README.md", true},
		{"packages/module-vpc/modules/vpc-peering/README.md", true},
	}

	for _, testCase := range testCases {
		isMatch := checkRegex(testCase.path, IS_MODULE_OVERVIEW_DOC_REGEX)
		assert.Equal(t, testCase.expected, isMatch, "path = %s", testCase.path)
	}
}

func TestGetModuleOverviewDocRelOutputPath(t *testing.T) {
	t.Parallel()

	testCases := []struct {
		moduleDocOverview *ModuleOverviewDoc
		expected string
	}{
		{ &ModuleOverviewDoc{ relPath: "packages/module-vpc/modules/vpc-app/README.md" }, "packages/module-vpc/vpc-app/overview.md" },
		{ &ModuleOverviewDoc{ relPath: "packages/package-vpc/modules/vpc-peering/README.md" }, "packages/package-vpc/vpc-peering/overview.md" },
	}

	for _, testCase := range testCases {
		actual, err := testCase.moduleDocOverview.getRelOutputPath()
		assert.Nil(t, err, "relPath = %s", testCase.moduleDocOverview.relPath)
		assert.Equal(t, testCase.expected, actual, "relPath = %s", testCase.moduleDocOverview.relPath)
	}
}