package docfile

import (
	"fmt"
	"regexp"
	"github.com/gruntwork-io/docs/docs-preprocessor/errors"
	"github.com/gruntwork-io/docs/docs-preprocessor/file"
	"github.com/gruntwork-io/docs/docs-preprocessor/logger"
)

const IS_GLOBAL_IMAGE_DOC_REGEX = `^global/([\w -/]*_images)/([\w -]+\.(jpg|jpeg|gif|png|svg))$`
const IS_GLOBAL_IMAGE_DOC_REGEX_NUM_CAPTURE_GROUPS = 3

// Represents a non-overview document that's part of a specific module.
type GlobalImageDoc struct {
	relPath string
	absPath string
}

func NewGlobalImageDoc(absPath string, relPath string) *GlobalImageDoc {
	return &GlobalImageDoc{ absPath: absPath, relPath: relPath }
}

func (d *GlobalImageDoc) IsMatch() bool {
	return checkRegex(d.relPath, IS_GLOBAL_IMAGE_DOC_REGEX)
}

func (d *GlobalImageDoc) Copy(outputPathRoot string) error {
	outRelPath, err := d.getRelOutputPath()
	if err != nil {
		return errors.WithStackTrace(err)
	}

	outAbsPath := fmt.Sprintf("%s/%s", outputPathRoot, outRelPath)

	logger.Logger.Printf("Copying GLOBAL-IMAGE-DOC file %s to %s\n", d.absPath, outAbsPath)
	err = file.CopyFile(d.absPath, outAbsPath)
	if err != nil {
		return errors.WithStackTrace(err)
	}

	return nil
}

func (d *GlobalImageDoc) getRelOutputPath() (string, error) {
	var outputPath string

	regex := regexp.MustCompile(IS_GLOBAL_IMAGE_DOC_REGEX)
	submatches := regex.FindAllStringSubmatch(d.relPath, -1)

	if len(submatches) == 0 || len(submatches[0]) != IS_GLOBAL_IMAGE_DOC_REGEX_NUM_CAPTURE_GROUPS + 1 {
		return outputPath, errors.WithStackTrace(&WrongNumberOfCaptureGroupsFound{ docTypeName: "GlobalImageDoc", path: d.relPath, regEx: IS_GLOBAL_IMAGE_DOC_REGEX })
	}

	// If we were parsing d.relPath = global/help/_images/sample.jpg...
	subfolderName := submatches[0][1] // = help/_images
	imageName := submatches[0][2] // = sample.jpg

	return fmt.Sprintf("%s/%s", subfolderName, imageName), nil
}