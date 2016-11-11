package docfile

import (
	"fmt"
	"regexp"
)

const IS_MODULE_EXAMPLE_DOC_REGEX = `^packages/([\s\w- ]+)/examples/([\s\w -]+)/(.*[^README].md)$`
const IS_MODULE_EXAMPLE_DOC_REGEX_NUM_CAPTURE_GROUPS = 3

// Represents a non-overview document that's part of a specific module.
type ModuleExampleDoc struct {
	relPath string
	absPath string
}

func NewModuleExampleDoc(absPath string, relPath string) (*ModuleExampleDoc, error) {
	if checkRegex(relPath, IS_MODULE_EXAMPLE_DOC_REGEX) {
		return &ModuleExampleDoc { absPath: absPath, relPath: relPath }, nil
	} else {
		return nil, InvalidPathForThisDocType("ModuleExampleDoc")
	}
}

func (d *ModuleExampleDoc) Copy(outputPathRoot string) error {
	outRelPath, err := d.getRelOutputPath()
	if err != nil {
		return err
	}

	fmt.Printf("Copying MODULE-EXAMPLE-DOC file %s to %s/%s...\n", d.relPath, outputPathRoot, outRelPath)
	return nil
}

func (d *ModuleExampleDoc) getRelOutputPath() (string, error) {
	var outputPath string

	regex := regexp.MustCompile(IS_MODULE_EXAMPLE_DOC_REGEX)
	submatches := regex.FindAllStringSubmatch(d.relPath, -1)

	if len(submatches) == 0 || len(submatches[0]) != IS_MODULE_EXAMPLE_DOC_REGEX_NUM_CAPTURE_GROUPS + 1 {
		return outputPath, &WrongNumberOfCaptureGroupsFound{ docTypeName: "ModuleExampleDoc", path: d.relPath, regEx: IS_MODULE_EXAMPLE_DOC_REGEX }
	}

	// If we were parsing d.relPath = packages/module-vpc/examples/vpc-app/example-doc.md...
	packageName := submatches[0][1] // = module-vpc
	moduleName := submatches[0][2] 	// = vpc-app
	docName := submatches[0][3] 	// = example-doc.md

	return fmt.Sprintf("packages/%s/%s/%s", packageName, moduleName, docName), nil
}