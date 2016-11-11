package docfile

import (
	"fmt"
	"regexp"
	"errors"
)

const IS_MODULE_OVERVIEW_DOC_REGEX = `^packages/([\w -]+)/modules/([\w -]+)/README.md$`
const IS_MODULE_OVERVIEW_DOC_REGEX_NUM_CAPTURE_GROUPS = 2

// Represents a non-overview document that's part of a specific module.
type ModuleOverviewDoc struct {
	relPath string
	absPath string
}

func NewModuleOverviewDoc(absPath string, relPath string) (*ModuleOverviewDoc, error) {
	if checkRegex(relPath, IS_MODULE_OVERVIEW_DOC_REGEX) {
		return &ModuleOverviewDoc{ absPath: absPath, relPath: relPath}, nil
	} else {
		return nil, InvalidPathForThisDocType("ModuleOverviewDoc")
	}
}

func (d *ModuleOverviewDoc) Copy(outputPathRoot string) error {
	outRelPath, err := d.getRelOutputPath()
	if err != nil {
		return err
	}

	fmt.Printf("Copying MODULE-DOC-OVERVIEW file %s to %s/%s...\n", d.relPath, outputPathRoot, outRelPath)
	return nil
}

func (d *ModuleOverviewDoc) getRelOutputPath() (string, error) {
	var outputPath string

	regex := regexp.MustCompile(IS_MODULE_OVERVIEW_DOC_REGEX)
	submatches := regex.FindAllStringSubmatch(d.relPath, -1)

	if len(submatches[0]) != IS_MODULE_OVERVIEW_DOC_REGEX_NUM_CAPTURE_GROUPS + 1 {
		return outputPath, errors.New("Module Overview Documents must exist in the path /packages/<package-name>/modules/<module-name>README.md.")
	}

	// If we were parsing d.relPath = packages/module-vpc/modules/vpc-app/README.md...
	packageName := submatches[0][1] // = module-vpc
	moduleName := submatches[0][2] 	// = vpc-app

	return fmt.Sprintf("packages/%s/%s/overview.md", packageName, moduleName), nil
}