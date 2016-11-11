package docfile

import (
	"fmt"
	"regexp"
)

// The DocFile interface represents a Gruntwork documentation file
type DocFile interface {
	// IsMatch returns true if the DocFile's properties make it a valid instance of the given DocFile type.
	IsMatch() bool

	// Copy writes a document file to the appropriate location relative to the outputPathRoot on the local filesystem.
	Copy(outputPathRoot string) error
}

func CreateAllDocFileTypes(absPath string, relPath string) []DocFile {
	docTypes := []DocFile{
		NewGlobalDoc(absPath, relPath),
		NewGlobalImageDoc(absPath, relPath),
		NewModuleDoc(absPath, relPath),
		NewModuleExampleDoc(absPath, relPath),
		NewModuleExampleOverviewDoc(absPath, relPath),
		NewModuleImageDoc(absPath, relPath),
		NewModuleOverviewDoc(absPath, relPath),
		NewPackageDoc(absPath, relPath),
		NewPackageOverviewDoc(absPath, relPath),
	}

	return docTypes
}

// Check whether the given path matches the given RegEx. We panic if there's an error (versus returning a bool and an
// error) to keep the if-else statements throughout the code simpler.
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

type WrongNumberOfCaptureGroupsFound struct {
	docTypeName string
	path string
	regEx string
}
func (err WrongNumberOfCaptureGroupsFound) Error() string {
	return fmt.Sprintf("The wrong number of capture groups was found. This may be because the path did not match the RegEx.\ndocType = %s\npath = %s\nRegEx = %s", err.docTypeName	, err.path, err.regEx)
}
