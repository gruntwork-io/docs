package docfile

import (
	"fmt"
	"regexp"
	"errors"
)

const IS_MODULE_DOC_OVERVIEW_REGEX = `^packages/([\s\w -]+)/modules/([\s\w -]+)/README.md$`
const IS_MODULE_DOC_OVERVIEW_REGEX_NUM_CAPTURE_GROUPS = 2

// Represents a non-overview document that's part of a specific module.
type ModuleDocOverview struct {
	relPath string
	absPath string
}

func NewModuleDocOverview(absPath string, relPath string) (*ModuleDocOverview, error) {
	if checkRegex(relPath, IS_MODULE_DOC_OVERVIEW_REGEX) {
		return &ModuleDocOverview{ absPath: absPath, relPath: relPath}, nil
	} else {
		return nil, InvalidPathForThisDoctype("ModuleOverviewDoc")
	}
}

func (d *ModuleDocOverview) Copy(outputPathRoot string) error {
	outRelPath, err := d.getRelOutputPath()
	if err != nil {
		return err
	}

	fmt.Printf("Copying MODULE-DOC-OVERVIEW file %s to %s/%s...\n", d.relPath, outputPathRoot, outRelPath)
	return nil
}

func (d *ModuleDocOverview) getRelOutputPath() (string, error) {
	var outputPath string

	regex := regexp.MustCompile(IS_MODULE_DOC_OVERVIEW_REGEX)
	submatches := regex.FindAllStringSubmatch(d.relPath, -1)

	if len(submatches[0]) != IS_MODULE_DOC_OVERVIEW_REGEX_NUM_CAPTURE_GROUPS + 1 {
		return outputPath, errors.New("Module Overview Documents must exist in the path /packages/<package-name>/modules/<module-name>README.md.")
	}

	// If we were parsing d.relPath = packages/module-vpc/modules/vpc-app/README.md...
	packageName := submatches[0][1] // = module-vpc
	moduleName := submatches[0][2] 	// = vpc-app

	return fmt.Sprintf("packages/%s/%s/overview.md", packageName, moduleName), nil
}