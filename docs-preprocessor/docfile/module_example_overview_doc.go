package docfile

import "fmt"

const IS_MODULE_EXAMPLE_OVERVIEW_DOC_REGEX = `^packages/[\s\w-]*/examples/[\s\w-]*/README.md$`

// Represents a non-overview document that's part of a specific module.
type ModuleExampleOverviewDoc struct {
	relPath string
	absPath string
}

func NewModuleExampleOverviewDoc(absPath string, relPath string) (*ModuleExampleOverviewDoc, error) {
	if checkRegex(relPath, IS_MODULE_EXAMPLE_OVERVIEW_DOC_REGEX) {
		return &ModuleExampleOverviewDoc { absPath: absPath, relPath: relPath }, nil
	} else {
		return nil, InvalidPathForThisDocType("ModuleExampleOverviewDoc")
	}
}

func (d *ModuleExampleOverviewDoc) Copy(outputPathRoot string) error {
	fmt.Printf("Copying MOD-EXAMPLE-OVERVIEW-DOC file %s to %s...\n", d.relPath, outputPathRoot)
	return nil
}