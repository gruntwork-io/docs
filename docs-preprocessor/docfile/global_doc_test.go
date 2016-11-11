package docfile

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

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

func TestGetGlobalRelOutputPath(t *testing.T) {
	t.Parallel()

	testCases := []struct {
		globalDoc *GlobalDoc
		expected  string
	}{
		{ &GlobalDoc{ relPath: "global/help/support.md" }, "help/support.md" },
		{ &GlobalDoc{ relPath: "global/introduction/Getting Started.md" }, "introduction/Getting Started.md" },
		{ &GlobalDoc{ relPath: "global/introduction/subfolder/hello.md" }, "introduction/subfolder/hello.md" },
	}

	for _, testCase := range testCases {
		actual := testCase.globalDoc.getRelOutputPath()
		assert.Equal(t, testCase.expected, actual, "relPath = %s", testCase.globalDoc.relPath)
	}
}