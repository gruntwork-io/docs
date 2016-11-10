package docfile

import "fmt"

const IS_MODULE_DOC_REGEX = `^(packages/[\w -]+/modules/[\w -]+)/_docs/([\w -]+\.md)$`

// Represents a non-overview document that's part of a specific module.
type ModuleDoc struct {
	relPath string
	absPath string
}

func NewModuleDoc(absPath string, relPath string) (*ModuleDoc, error) {
	if checkRegex(relPath, IS_MODULE_DOC_REGEX) {
		return &ModuleDoc { absPath: absPath, relPath: relPath }, nil
	} else {
		return nil, InvalidPathForThisDoctype("ModuleDoc")
	}
}

func (d *ModuleDoc) Copy(outputPathRoot string) error {
	fmt.Printf("Copying MOD-DOC file %s to %s...\n", d.relPath, outputPathRoot)
	return nil
}