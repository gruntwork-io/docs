package docfile

import "fmt"

const IS_MODULE_DOC_OVERVIEW_REGEX = `^packages/[\s\w-]*/modules/[\s\w-]*/README.md$`

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
	fmt.Printf("Copying MOD-OVERVIEW-DOC file %s to %s...\n", d.relPath, outputPathRoot)
	return nil
}