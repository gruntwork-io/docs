package docfile

import (
	"fmt"
	"regexp"
	"io/ioutil"
	"os"
	"github.com/gruntwork-io/docs/docs-preprocessor/errors"
	"path/filepath"
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
	} else if doc, err := NewModuleImageDoc(absPath, relPath); err == nil {
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

// Copy the given file. If a file already exists at dstPath, return an error.
func copyFile(srcPath, dstPath string) error {
	containingDir := getContainingDirectory(dstPath)

	err := mkDirRecursive(containingDir)
	if err != nil {
		return errors.WithStackTrace(fmt.Errorf("Error while making directory %s", containingDir))
	}

	if isFileExist(dstPath) {
		return errors.WithStackTrace(fmt.Errorf("A file already exists at the path %s. Overwriting existing files is not permiitted to ensure no previously file gets overwritten.\n", dstPath))
	}

	bytes, err := ioutil.ReadFile(srcPath)
	if err != nil {
		return errors.WithStackTrace(err)
	}

	err = ioutil.WriteFile(dstPath, bytes, os.ModePerm)
	if err != nil {
		return errors.WithStackTrace(err)
	}

	return nil
}

// Return true if the file at the given path exists
func isFileExist(path string) bool {
	_, err := os.Stat(path)
	return err == nil
}

func getContainingDirectory(path string) string {
	return filepath.Dir(path)
}

func mkDirRecursive(path string) error {
	return os.MkdirAll(path, os.ModePerm)
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
