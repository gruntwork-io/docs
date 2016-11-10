package docfile

import "fmt"

const IS_PACKAGE_DOC_OVERVIEW_REGEX = `^packages/[\s\w-]*/README.md$`

// Represents a non-overview document that's part of a specific module.
type PackageDocOverview struct {
	relPath string
	absPath string
}

func NewPackageDocOverview(absPath string, relPath string) (*PackageDocOverview, error) {
	if checkRegex(relPath, IS_PACKAGE_DOC_OVERVIEW_REGEX) {
		return &PackageDocOverview { absPath: absPath, relPath: relPath }, nil
	} else {
		return nil, InvalidPathForThisDoctype("PackageDocOverview")
	}
}

func (d *PackageDocOverview) Copy(outputPathRoot string) error {
	fmt.Printf("Copying PACKAGE-OVERVIEW-DOC file %s to %s...\n", d.relPath, outputPathRoot)
	return nil
}