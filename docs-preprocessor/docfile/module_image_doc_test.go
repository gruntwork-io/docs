package docfile

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestIsModuleImageRegEx(t *testing.T) {
	t.Parallel()

	testCases := []struct {
		path     string
		expected bool
	}{
		{"packages/package-vpc/modules/_images/sample.jpg", true},
	}

	for _, testCase := range testCases {
		isMatch := checkRegex(testCase.path, IS_MODULE_IMAGE_DOC_REGEX)
		assert.Equal(t, testCase.expected, isMatch, "path = %s", testCase.path)
	}
}

func TestGetModuleImageRelOutputPath(t *testing.T) {
	t.Parallel()

	testCases := []struct {
		moduleImageDoc *ModuleImageDoc
		expected       string
	}{
		{ &ModuleImageDoc{ relPath: "packages/package-vpc/modules/_images/sample.jpg" }, "packages/package-vpc/_images/sample.jpg" },
	}

	for _, testCase := range testCases {
		actual, err := testCase.moduleImageDoc.getRelOutputPath()
		assert.Nil(t, err, "relPath = %s", testCase.moduleImageDoc.relPath)
		assert.Equal(t, testCase.expected, actual, "relPath = %s", testCase.moduleImageDoc.relPath)
	}
}