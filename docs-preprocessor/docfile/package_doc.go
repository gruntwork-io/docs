package docfile

import "fmt"

const IS_PACKAGE_DOC_REGEX = `^packages/[\w -]+/modules/_docs/[\w -/]+\.md$`

// Represents a non-overview document that's part of a specific module.
type PackageDoc struct {
	relPath string
	absPath string
}

func NewPackageDoc(absPath string, relPath string) (*PackageDoc, error) {
	if checkRegex(relPath, IS_PACKAGE_DOC_REGEX) {
		return &PackageDoc { absPath: absPath, relPath: relPath }, nil
	} else {
		return nil, InvalidPathForThisDoctype("PackageDoc")
	}
}

func (d *PackageDoc) Copy(outputPathRoot string) error {
	fmt.Printf("Copying MOD-DOC file %s to %s...\n", d.relPath, outputPathRoot)
	return nil
}