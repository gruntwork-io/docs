package docfile

import (
	"testing"
	"github.com/stretchr/testify/assert"
)

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

func TestGetPackageOverviewDocRelOutputPath(t *testing.T) {
	t.Parallel()

	testCases := []struct {
		packageOverviewDoc *PackageOverviewDoc
		expected string
	}{
		{ &PackageOverviewDoc{ relPath: "packages/package-vpc/README.md" }, "packages/package-vpc/overview.md" },
	}

	for _, testCase := range testCases {
		actual, err := testCase.packageOverviewDoc.getRelOutputPath()
		assert.Nil(t, err, "relPath = %s", testCase.packageOverviewDoc.relPath)
		assert.Equal(t, testCase.expected, actual, "relPath = %s", testCase.packageOverviewDoc.relPath)
	}
}