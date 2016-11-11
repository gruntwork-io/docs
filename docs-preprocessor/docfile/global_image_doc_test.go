package docfile

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestIsGlobalImageRegEx(t *testing.T) {
	t.Parallel()

	testCases := []struct {
		path     string
		expected bool
	}{
		{"global/help/_images/sample.jpg", true},
		{"global/help/_images/sample.png", true},
		{"global/help/_images/sample.gif", true},
		{"global/help/sample.gif", false},
		{"packages/module-vpc/modules/_docs/images/sample.jpg", false},
		{"packages/module-vpc/modules/_docs/images/sample.md", false},
		{"global/sample.png", false},
		{"global/help/images/sample.doc", false},
		{"global/_images/sample.jpg", true},
	}

	for _, testCase := range testCases {
		isMatch := checkRegex(testCase.path, IS_GLOBAL_IMAGE_DOC_REGEX)
		assert.Equal(t, testCase.expected, isMatch, "path = %s", testCase.path)
	}
}

func TestGetGlobalImageRelOutputPath(t *testing.T) {
	t.Parallel()

	testCases := []struct {
		globalImageDoc *GlobalImageDoc
		expected       string
	}{
		{ &GlobalImageDoc{ relPath: "global/help/_images/sample.jpg" }, "help/_images/sample.jpg" },
		{ &GlobalImageDoc{ relPath: "global/subfolder/_images/hello.png" }, "subfolder/_images/hello.png" },
		{ &GlobalImageDoc{ relPath: "global/_images/hello.png" }, "_images/hello.png" },
	}

	for _, testCase := range testCases {
		actual, err := testCase.globalImageDoc.getRelOutputPath()
		assert.Nil(t, err, "relPath = %s", testCase.globalImageDoc.relPath)
		assert.Equal(t, testCase.expected, actual, "relPath = %s", testCase.globalImageDoc.relPath)
	}
}