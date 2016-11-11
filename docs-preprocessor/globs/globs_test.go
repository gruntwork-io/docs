package globs

import (
	"testing"

	"github.com/gobwas/glob"
	"github.com/stretchr/testify/assert"
)

func TestMatchesGlob(t *testing.T) {
	t.Parallel()

	testCases := []struct {
		path     string
		pattern  string
		expected bool
	}{
		{"some/path", "", false},
		{"some/path", "other/path", false},
		{"some/path", "some/path", true},
		{"some/path", "*", true},
		{"some/path", "some/*", true},
		{"some/path", "some/**", true},
		{"some/much/longer/path", "some/**", true},
		{"some/path", "*/path", true},
		{"file.txt", "file.txt", true},
		{"file.txt", "other.txt", false},
		{"file.txt", "*.foo", false},
		{"file.txt", "*.txt", true},
		{"file.txt", "*.*", true},
		{"file.md", "*.not-a-real-extension", false},
		{"some/path/file.txt", "*.foo", false},
		{"some/path/file.txt", "*.txt", true},
		{"some/path/file.txt", "*.*", true},
		{"some/path/file.txt", "**/*", true},
		{"some/path/file.txt", "**/*.*", true},
		{"some/long/path/file.txt", "some/**/file.txt", true},
		{"some/long/path/file.txt", "some/**/other.txt", false},
		{"some/long/path", "*.*", false},
	}

	for _, testCase := range testCases {
		glob, err := glob.Compile(testCase.pattern)
		assert.Nil(t, err, "Failed to compile glob pattern %s", testCase.pattern)

		actual := MatchesGlob(testCase.path, glob)
		assert.Equal(t, testCase.expected, actual, "path = %s, glob = %s", testCase.path, testCase.pattern)
	}
}
