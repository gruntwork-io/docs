package docfile

import "fmt"

const IS_PACKAGE_OVERVIEW_DOC_REGEX = `^packages/[\s\w-]*/README.md$`

// Represents a non-overview document that's part of a specific module.
type PackageDocOverview struct {
	relPath string
	absPath string
}

func NewPackageOverviewDoc(absPath string, relPath string) (*PackageDocOverview, error) {
	if checkRegex(relPath, IS_PACKAGE_OVERVIEW_DOC_REGEX) {
		return &PackageDocOverview { absPath: absPath, relPath: relPath }, nil
	} else {
		return nil, InvalidPathForThisDocType("PackageDocOverview")
	}
}

func (d *PackageDocOverview) Copy(outputPathRoot string) error {
	fmt.Printf("Copying PACKAGE-OVERVIEW-DOC file %s to %s...\n", d.relPath, outputPathRoot)
	return nil
}