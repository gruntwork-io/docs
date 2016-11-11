package docfile

import (
	"fmt"
	"regexp"
	"github.com/gruntwork-io/docs/docs-preprocessor/errors"
	"github.com/gruntwork-io/docs/docs-preprocessor/logger"
	"github.com/gruntwork-io/docs/docs-preprocessor/file"
)

const IS_MODULE_EXAMPLE_OVERVIEW_DOC_REGEX = `^packages/([\s\w -]+)/examples/([\s\w -]+)/README.md$`
const IS_MODULE_EXAMPLE_OVERVIEW_DOC_REGEX_NUM_CAPTURE_GROUPS = 2

// Represents a non-overview document that's part of a specific module.
type ModuleExampleOverviewDoc struct {
	relPath string
	absPath string
}

func NewModuleExampleOverviewDoc(absPath string, relPath string) *ModuleExampleOverviewDoc {
	return &ModuleExampleOverviewDoc { absPath: absPath, relPath: relPath }
}

func (d *ModuleExampleOverviewDoc) IsMatch() bool {
	return checkRegex(d.relPath, IS_MODULE_EXAMPLE_OVERVIEW_DOC_REGEX)
}

func (d *ModuleExampleOverviewDoc) Copy(outputPathRoot string) error {
	outRelPath, err := d.getRelOutputPath()
	if err != nil {
		return errors.WithStackTrace(err)
	}

	outAbsPath := fmt.Sprintf("%s/%s", outputPathRoot, outRelPath)

	logger.Logger.Printf("Copying MODULE-EXAMPLE-OVERVIEW-DOC file %s to %s\n", d.absPath, outAbsPath)
	err = file.CopyFile(d.absPath, outAbsPath)
	if err != nil {
		return errors.WithStackTrace(err)
	}

	return nil
}

func (d *ModuleExampleOverviewDoc) getRelOutputPath() (string, error) {
	var outputPath string

	regex := regexp.MustCompile(IS_MODULE_EXAMPLE_OVERVIEW_DOC_REGEX)
	submatches := regex.FindAllStringSubmatch(d.relPath, -1)

	if len(submatches) == 0 || len(submatches[0]) != IS_MODULE_EXAMPLE_OVERVIEW_DOC_REGEX_NUM_CAPTURE_GROUPS + 1 {
		return outputPath, errors.WithStackTrace(&WrongNumberOfCaptureGroupsFound{ docTypeName: "ModuleExampleOverviewDoc", path: d.relPath, regEx: IS_MODULE_EXAMPLE_OVERVIEW_DOC_REGEX })
	}

	// If we were parsing d.relPath = packages/module-vpc/examples/vpc-app/README.md...
	packageName := submatches[0][1] // = module-vpc
	moduleName := submatches[0][2] 	// = vpc-app

	return fmt.Sprintf("packages/%s/%s/examples.md", packageName, moduleName), nil
}