package util

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestStrSliceContains(t *testing.T) {
	t.Parallel()

	testCases := []struct {
		slice     []string
		strToFind string
		expected  bool
	}{
		{[]string{"a"}, "a", true},
		{[]string{"a", "b"}, "b", true},
		{[]string{"a", "b"}, "c", false},
		{[]string{"a", "b", "c"}, "a", true},
		{[]string{}, "a", false},
		{[]string{"josh", "jim"}, "bob", false},
		{[]string{"JOSH", "Nadaa", "Jonah"}, "josh", false},
		{[]string{"JOSH", "Nadaa", "Jonah"}, "JOSH", true},
		{[]string{"JOSH", "Nadaa", "Jonah"}, "Jonah", true},
	}

	for _, testCase := range testCases {
		actual := StrSliceContains(testCase.slice, testCase.strToFind)
		assert.Equal(t, testCase.expected, actual, "Expected %t but got %t when evaluating whether %s contains %v", testCase.expected, actual, testCase.slice, testCase.strToFind)
	}
}
