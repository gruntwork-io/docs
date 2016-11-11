package docfile

import (
	"strings"
	"github.com/gruntwork-io/docs/docs-preprocessor/logger"
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
		return nil, InvalidPathForThisDocType("GlobalImageDoc")
	}
}

func (d *GlobalDoc) Copy(outputPathRoot string) error {
	outRelPath := d.getRelOutputPath()

	logger.Logger.Printf("Copying GLOBAL-DOC file %s to %s/%s\n", d.absPath, outputPathRoot, outRelPath)
	err := copyFile(d.absPath, outRelPath)
	if err != nil {
		return err
	}

	return nil
}

func (d *GlobalDoc) getRelOutputPath() string {
	return strings.Replace(d.relPath, "global/", "", -1)
}