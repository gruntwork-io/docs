package docfile

import (
	"strings"
	"github.com/gruntwork-io/docs/docs-preprocessor/logger"
	"github.com/gruntwork-io/docs/docs-preprocessor/file"
	"fmt"
	"github.com/gruntwork-io/docs/docs-preprocessor/errors"
)

const IS_GLOBAL_DOC_REGEX = `^global/(.*\.md)$`

// Represents a non-overview document that's part of a specific module.
type GlobalDoc struct {
	relPath string
	absPath string
}

func NewGlobalDoc(absPath string, relPath string) *GlobalDoc {
	return &GlobalDoc { absPath: absPath, relPath: relPath }
}

func (d *GlobalDoc) IsMatch() bool {
	return checkRegex(d.relPath, IS_GLOBAL_DOC_REGEX)
}

func (d *GlobalDoc) Copy(outputPathRoot string) error {
	outRelPath := d.getRelOutputPath()
	outAbsPath := fmt.Sprintf("%s/%s", outputPathRoot, outRelPath)

	logger.Logger.Printf("Copying GLOBAL-DOC file %s to %s\n", d.absPath, outAbsPath)
	err := file.CopyFile(d.absPath, outAbsPath)
	if err != nil {
		return errors.WithStackTrace(err)
	}

	return nil
}

func (d *GlobalDoc) getRelOutputPath() string {
	return strings.Replace(d.relPath, "global/", "", -1)
}