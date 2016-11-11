package docfile

import (
	"fmt"
	"regexp"
	"errors"
	//"strings"
)

const IS_MODULE_DOC_REGEX = `^packages/([\w -]+)/modules/([\w -]+)/_docs/([\w -]+\.md)$`
const IS_MODULE_DOC_REGEX_NUM_CAPTURE_GROUPS = 3

// Represents a non-overview document that's part of a specific module.
type ModuleDoc struct {
	relPath string
	absPath string
}

func NewModuleDoc(absPath string, relPath string) (*ModuleDoc, error) {
	if checkRegex(relPath, IS_MODULE_DOC_REGEX) {
		return &ModuleDoc{absPath: absPath, relPath: relPath }, nil
	} else {
		return nil, InvalidPathForThisDocType("ModuleDoc")
	}
}

func (d *ModuleDoc) Copy(outputPathRoot string) error {
	outRelPath, err := d.getRelOutputPath()
	if err != nil {
		return err
	}

	fmt.Printf("Copying MODULE-DOC file %s to %s/%s...\n", d.relPath, outputPathRoot, outRelPath)
	return nil
}

func (d *ModuleDoc) getRelOutputPath() (string, error) {
	var outputPath string

	regex := regexp.MustCompile(IS_MODULE_DOC_REGEX)
	submatches := regex.FindAllStringSubmatch(d.relPath, -1)

	if len(submatches[0]) != IS_MODULE_DOC_REGEX_NUM_CAPTURE_GROUPS + 1 {
		return outputPath, errors.New("Module Documents must exist in the path /packages/<package-name>/modules/<module-name>/_docs/<doc-name>.md Any subfolders in /_docs will generate an error.")
	}

	// If we were parsing d.relPath = packages/module-vpc/modules/vpc-app/module-doc.md...
	packageName := submatches[0][1] // = module-vpc
	moduleName := submatches[0][2] 	// = vpc-app
	docName := submatches[0][3] 	// = module-doc.md

	return fmt.Sprintf("packages/%s/%s/%s", packageName, moduleName, docName), nil
}