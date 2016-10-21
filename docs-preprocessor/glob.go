package main

import (
	"github.com/gobwas/glob"
)

func MatchesGlobs(path string, globs []glob.Glob) bool {
	for _, glob := range globs {
		if MatchesGlob(path, glob) {
			return true
		}
	}

	return false
}

func MatchesGlob(path string, glob glob.Glob) bool {
	return glob.Match(path)
}

func ToGlobs(patterns []string) ([]glob.Glob, error) {
	globs := []glob.Glob{}

	for _, pattern := range patterns {
		compiled, err := glob.Compile(pattern)
		if err != nil {
			return []glob.Glob{}, WithStackTrace(err)
		}
		globs = append(globs, compiled)
	}

	return globs, nil
}
