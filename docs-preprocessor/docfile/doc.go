package docfile

import (
	"fmt"
	"regexp"
)

// The DocFile interface represents a Gruntwork documentation file
type DocFile interface {
	// Copy writes a document file to the appropriate location relative to the outputPathRoot on the local filesystem.
	Copy(outputPathRoot string) error
}

func NewDocFile(absPath string, relPath string) (DocFile, error) {
	if doc, err := NewGlobalDoc(absPath, relPath); err == nil {
		return doc, nil
	} else if doc, err := NewModuleDoc(absPath, relPath); err == nil {
		return doc, nil
	} else if doc, err := NewModuleOverviewDoc(absPath, relPath); err == nil {
		return doc, nil
	} else if doc, err := NewModuleExampleDoc(absPath, relPath); err == nil {
		return doc, nil
	} else if doc, err := NewModuleExampleOverviewDoc(absPath, relPath); err == nil {
		return doc, nil
	} else if doc, err := NewPackageDoc(absPath, relPath); err == nil {
		return doc, nil
	} else if doc, err := NewPackageOverviewDoc(absPath, relPath); err == nil {
		return doc, nil
	} else if doc, err := NewGlobalImageDoc(absPath, relPath); err == nil {
		return doc, nil
	} else {
		return nil, NoDocCouldBeCreatedFromGivenRelPath(relPath)
	}
}

// Check whether the given path matches the given RegEx. We panic if there's an error (versus returning a bool and an
// error) to keep the if-else statement in ProcessDocs simpler.
func checkRegex(path string, regexStr string) bool {
	regex := regexp.MustCompile(regexStr)
	return regex.MatchString(path)
}

// Custom errors

type InvalidPathForThisDocType string
func (docType InvalidPathForThisDocType) Error() string {
	return fmt.Sprintf("The given path is not valid for a doc of type %s\n", docType)
}

type NoDocCouldBeCreatedFromGivenRelPath string
func (path NoDocCouldBeCreatedFromGivenRelPath) Error() string {
	return fmt.Sprintf("No doc could be created for the path \"%s\"\n", path)
}