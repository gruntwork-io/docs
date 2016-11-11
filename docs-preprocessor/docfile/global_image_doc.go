package docfile

import (
	"fmt"
	"regexp"
)

const IS_GLOBAL_IMAGE_DOC_REGEX = `^global/([\w -/]*_images)/([\w -]+\.(jpg|jpeg|gif|png|svg))$`
const IS_GLOBAL_IMAGE_DOC_REGEX_NUM_CAPTURE_GROUPS = 3

// Represents a non-overview document that's part of a specific module.
type GlobalImageDoc struct {
	relPath string
	absPath string
}

func NewGlobalImageDoc(absPath string, relPath string) (*GlobalImageDoc, error) {
	if checkRegex(relPath, IS_GLOBAL_IMAGE_DOC_REGEX) {
		return &GlobalImageDoc{ absPath: absPath, relPath: relPath }, nil
	} else {
		return nil, InvalidPathForThisDocType("ImageDoc")
	}
}

func (d *GlobalImageDoc) Copy(outputPathRoot string) error {
	outRelPath, err := d.getRelOutputPath()
	if err != nil {
		return err
	}

	fmt.Printf("Copying GLOBAL-IMAGE-DOC file %s to %s/%s...\n", d.relPath, outputPathRoot, outRelPath)
	return nil
}

func (d *GlobalImageDoc) getRelOutputPath() (string, error) {
	var outputPath string

	regex := regexp.MustCompile(IS_GLOBAL_IMAGE_DOC_REGEX)
	submatches := regex.FindAllStringSubmatch(d.relPath, -1)

	if len(submatches) == 0 || len(submatches[0]) != IS_GLOBAL_IMAGE_DOC_REGEX_NUM_CAPTURE_GROUPS + 1 {
		return outputPath, fmt.Errorf("The wrong number of capture groups was found. This may be because the path did not match the RegEx. RegEx = %s", IS_GLOBAL_IMAGE_DOC_REGEX)
	}

	// If we were parsing d.relPath = global/help/_images/sample.jpg...
	subfolderName := submatches[0][1] // = help/_images
	imageName := submatches[0][2] // = sample.jpg

	return fmt.Sprintf("%s/%s", subfolderName, imageName), nil
}