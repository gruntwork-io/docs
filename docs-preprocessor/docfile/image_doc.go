package docfile

import "fmt"

const IS_IMAGE_DOC_REGEX = `^.*\.jpg|jpeg|gif|png|svg$`

// Represents a non-overview document that's part of a specific module.
type ImageDoc struct {
	relPath string
	absPath string
}

func NewImageDoc(absPath string, relPath string) (*ImageDoc, error) {
	if checkRegex(relPath, IS_IMAGE_DOC_REGEX) {
		return &ImageDoc { absPath: absPath, relPath: relPath }, nil
	} else {
		return nil, InvalidPathForThisDoctype("ImageDoc")
	}
}

func (d *ImageDoc) Copy(outputPathRoot string) error {
	fmt.Printf("Copying IMAGE-DOC file %s to %s...\n", d.relPath, outputPathRoot)
	return nil
}