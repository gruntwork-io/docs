package docfile

import (
	"fmt"
	"regexp"
	"errors"
)

const IS_PACKAGE_DOC_REGEX = `^packages/([\w -]+)/modules/_docs/([\w -/]+\.md)$`
const IS_PACKAGE_DOC_REGEX_NUM_CAPTURE_GROUPS = 2

// Represents a non-overview document that's part of a specific module.
type PackageDoc struct {
	relPath string
	absPath string
}

func NewPackageDoc(absPath string, relPath string) (*PackageDoc, error) {
	if checkRegex(relPath, IS_PACKAGE_DOC_REGEX) {
		return &PackageDoc { absPath: absPath, relPath: relPath }, nil
	} else {
		return nil, InvalidPathForThisDocType("PackageDoc")
	}
}
func (d *PackageDoc) Copy(outputPathRoot string) error {
	outRelPath, err := d.getRelOutputPath()
	if err != nil {
		return err
	}

	fmt.Printf("Copying PACKAGE-DOC file %s to %s/%s...\n", d.relPath, outputPathRoot, outRelPath)
	return nil
}

func (d *PackageDoc) getRelOutputPath() (string, error) {
	var outputPath string

	regex := regexp.MustCompile(IS_PACKAGE_DOC_REGEX)
	submatches := regex.FindAllStringSubmatch(d.relPath, -1)

	if len(submatches) == 0 || len(submatches[0]) != IS_PACKAGE_DOC_REGEX_NUM_CAPTURE_GROUPS + 1 {
		return outputPath, errors.New("Package Documents must exist in the path packages/<package-name>/modules/_docs/<doc-name>.md.")
	}

	// If we were parsing d.relPath = packages/package-vpc/modules/_docs/doc-name.md...
	packageName := submatches[0][1] // = package-vpc
	docName := submatches[0][2] 	// = doc-name.md

	return fmt.Sprintf("packages/%s/%s", packageName, docName), nil
}