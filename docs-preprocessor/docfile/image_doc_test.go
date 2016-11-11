package docfile

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestIsImageRegEx(t *testing.T) {
	t.Parallel()

	testCases := []struct {
		path     string
		expected bool
	}{
		{"global/help/images/sample.jpg", true},
		{"global/help/images/sample.png", true},
		{"global/help/images/sample.gif", true},
		{"global/help/sample.gif", true},
		{"packages/module-vpc/modules/_docs/images/sample.jpg", true},
		{"packages/module-vpc/modules/_docs/images/sample.md", false},
		{"global/sample.png", true},
		{"global/help/images/sample.doc", false},
	}

	for _, testCase := range testCases {
		isMatch := checkRegex(testCase.path, IS_IMAGE_DOC_REGEX)
		assert.Equal(t, testCase.expected, isMatch, "path = %s", testCase.path)
	}
}

func TestGetImageOutputPath(t *testing.T) {
	t.Parallel()

	testCases := []struct {
		imageDoc *ImageDoc
		expected string
	}{
		{ &ImageDoc{ relPath: "global/help/images/sample.jpg" }, "help/images/sample.jpg" },
	}

	for _, testCase := range testCases {
		actual := testCase.imageDoc.getRelOutputPath()
		assert.Equal(t, testCase.expected, actual, "relPath = %s", testCase.imageDoc.relPath)
	}
}