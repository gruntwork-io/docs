package docfile

import (
	"fmt"
	"strings"
)

const IS_GLOBAL_DOC_REGEX = `^global/(.*\.md)$`

// Represents a non-overview document that's part of a specific module.
type GlobalDoc struct {
	relPath string
	absPath string
}

func NewGlobalDoc(absPath string, relPath string) (*GlobalDoc, error) {
	if checkRegex(relPath, IS_GLOBAL_DOC_REGEX) {
		return &GlobalDoc { absPath: absPath, relPath: relPath }, nil
	} else {
		return nil, InvalidPathForThisDocType("GlobalDoc")
	}
}

func (d *GlobalDoc) Copy(outputPathRoot string) error {
	outRelPath := d.getRelOutputPath()
	fmt.Printf("Copying GLOBAL-DOC file %s to %s/%s...\n", d.relPath, outputPathRoot, outRelPath)
	return nil
}

func (d *GlobalDoc) getRelOutputPath() string {
	return strings.Replace(d.relPath, "global/", "", -1)
}