package docfile

import (
	"testing"
	"github.com/stretchr/testify/assert"
)

func TestIsPackageDocRegEx(t *testing.T) {
	t.Parallel()

	testCases := []struct {
		path     string
		expected bool
	}{
		{"packages/module-vpc/modules/_docs/README.md", true},
		{"packages/module-vpc/modules/_docs/doc-name.md", true},
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

func TestGetPackageDocRelOutputPath(t *testing.T) {
	t.Parallel()

	testCases := []struct {
		packageDoc *PackageDoc
		expected string
	}{
		{ &PackageDoc{ relPath: "packages/package-vpc/modules/_docs/doc-name.md" }, "packages/package-vpc/doc-name.md" },
		{ &PackageDoc{ relPath: "packages/package-vpc/modules/_docs/subfolder/doc-name.md" }, "packages/package-vpc/subfolder/doc-name.md" },
	}

	for _, testCase := range testCases {
		actual, err := testCase.packageDoc.getRelOutputPath()
		assert.Nil(t, err, "relPath = %s", testCase.packageDoc.relPath)
		assert.Equal(t, testCase.expected, actual, "relPath = %s", testCase.packageDoc.relPath)
	}
}