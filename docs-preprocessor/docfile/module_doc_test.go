package docfile

import (
	"testing"
	"github.com/stretchr/testify/assert"
)

func TestIsModuleDocRegEx(t *testing.T) {
	t.Parallel()

	testCases := []struct {
		path     string
		expected bool
	}{
		{"packages/module-vpc/modules/vpc-app/_docs/example.md", true},
		{"packages/some_otherPackageName/modules/modname/_docs/README.md", true},
		{"packages5/some_otherPackageName/modules/modname/README.md", false},
		{"packages/module-vpc/modules/vpc-app/_docs", false},
		{"packages/module-vpc/modules/vpc-app/docs", false},
		{"packages/module-vpc/modules/vpc-app/docs/example.md", false},
		{"packages/module-vpc/modules/vpc-app/example.md", false},
		{"packages5/module-vpc/modules/vpc-app/example.md", false},
	}

	for _, testCase := range testCases {
		isMatch := checkRegex(testCase.path, `^packages/[\w -]+/modules/[\w -]+/_docs/[\w -]+\.(markdown|mdown|mkdn|mkd|md)$`)
		assert.Equal(t, testCase.expected, isMatch, "path = %s", testCase.path)
	}
}

func TestGetModuleDocRelOutputPath(t *testing.T) {
	t.Parallel()

	testCases := []struct {
		moduleDoc *ModuleDoc
		expected string
	}{
		{ &ModuleDoc{ relPath: "packages/module-vpc/modules/vpc-app/_docs/example.md" }, "packages/module-vpc/vpc-app/example.md" },
		{ &ModuleDoc{ relPath: "packages/package-vpc/modules/network-acls/_docs/example.md" }, "packages/package-vpc/network-acls/example.md" },
	}

	for _, testCase := range testCases {
		actual, err := testCase.moduleDoc.getRelOutputPath()
		assert.Nil(t, err, "relPath = %s", testCase.moduleDoc.relPath)
		assert.Equal(t, testCase.expected, actual, "relPath = %s", testCase.moduleDoc.relPath)
	}
}