package docfile

import "fmt"

const IS_MODULE_EXAMPLE_DOC_REGEX = `^packages/[\s\w-]*/examples/[\s\w-]*/.*[^README].md$`

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
	fmt.Printf("Copying MOD-EXAMPLE file %s to %s...\n", d.relPath, outputPathRoot)
	return nil
}