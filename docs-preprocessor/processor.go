package main

import (
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"reflect"
	"runtime"
)

// This function will walk all the files specified in opt.InputPath and relocate them to their desired folder location
func ProcessDocs(opts *Opts) error {
	return filepath.Walk(opts.InputPath, func(path string, info os.FileInfo, err error) error {
		relPath, err := GetPathRelativeTo(path, opts.InputPath)
		if err != nil {
			return err
		} else if shouldSkipPath(relPath, opts) {
			fmt.Printf("Skipping path %s\n", relPath)
			return nil
		} else {
			funcs := []func(string, *Opts) (bool, error){
				isModuleDoc,
				isModuleOverview,
				isModuleExampleDoc,
				isModuleExampleOverview,
				isPackageDoc,
				isPackageOverview,
			}
			for key, f := range funcs {
				result, err := f(relPath, opts)
				if err != nil {
					return WithStackTrace(err)
				}
				if result {
					fmt.Printf("%v: %s\n", GetFunctionName(funcs[key]), relPath)
				}
			}

			return nil
		}
	})
}

// Return true if this is a file or folder we should skip completely in the processing step.
func shouldSkipPath(path string, opts *Opts) bool {
	return path == opts.InputPath || MatchesGlobs(path, opts.Excludes)
}

// Produce a function that matches a string against a RegEx.
func getRegexCheckFunc(regexStr string) func(string, *Opts) (bool, error) {
	return func(path string, opts *Opts) (bool, error) {
		var isMatch bool

		regex, err := regexp.Compile(regexStr)
		if err != nil {
			return isMatch, WithStackTrace(FailedToCompileRegEx(regexStr))
		}

		isMatch = regex.MatchString(path)
		return isMatch, nil
	}
}

// Return true if the path is a markdown doc in a module.
func isModuleDoc(path string, opts *Opts) (bool, error) {
	return getRegexCheckFunc(`^packages/.*/modules/.*/.*\.[markdown|mdown|mkdn|mkd|md]$`)(path, opts)
}

// Return true if the path is a module's overview markdown doc.
func isModuleOverview(path string, opts *Opts) (bool, error) {
	return getRegexCheckFunc(`^packages/.*/modules/.*/README.md$`)(path, opts)
}

// Return true if the path is a module example's overview markdown doc.
func isModuleExampleOverview(path string, opts *Opts) (bool, error) {
	return getRegexCheckFunc(`^packages/.*/examples/.*/README.md$`)(path, opts)
}

// Return true if the path is a markdown doc in a module example.
func isModuleExampleDoc(path string, opts *Opts) (bool, error) {
	return getRegexCheckFunc(`^packages/.*/examples/.*/.*\.[markdown|mdown|mkdn|mkd|md]$`)(path, opts)
}

// Return true if the path is a module example's overview markdown doc.
func isPackageOverview(path string, opts *Opts) (bool, error) {
	return getRegexCheckFunc(`^packages/.*/README.md$`)(path, opts)
}

// Return true if the path is a markdown doc in a module example.
func isPackageDoc(path string, opts *Opts) (bool, error) {
	return getRegexCheckFunc(`^packages/.*/modules/_docs/.*\.[markdown|mdown|mkdn|mkd|md]$`)(path, opts)
}

func getNewModuleDocPath(path string) string {
	regex, err := regexp.Compile(regexStr)
	if err != nil {
		return isMatch, WithStackTrace(FailedToCompileRegEx(regexStr))
	}

}

func GetFunctionName(i interface{}) string {
	return runtime.FuncForPC(reflect.ValueOf(i).Pointer()).Name()
}

// // Generate the documentation output for the given file into opts.OutputPath. If file is a documentation file, this will
// // copy the file largely unchanged, other than some placeholder text prepended and some URL tweaks. If file is a
// // non-documentation file, its contents will be replaced completely by placeholder text.
// func generateDocsForFile(file string, info os.FileInfo, opts *Opts) error {
// 	var contents []byte
// 	var err error
// 	var outPath = path.Join(opts.OutputPath, file)

// 	if MatchesGlobs(file, opts.DocPatterns) {
// 		Logger.Printf("Copying documentation file %s to %s without changes, except module-XXX URLs will be replaced with module-XXX-public.", file, outPath)
// 		contents, err = getContentsForDocumentationFile(file, opts)
// 	} else {
// 		Logger.Printf("Copying non-documentation file %s to %s and replacing its contents with placeholder text.", file, outPath)
// 		contents, err = getContentsForNonDocumentationFile(file, opts)
// 	}

// 	if err != nil {
// 		return err
// 	} else {
// 		return writeFileWithSamePermissions(outPath, contents, info)
// 	}
// }

// // Write the given contents to the given file path with the permissions in the given FileInfo
// func writeFileWithSamePermissions(file string, contents []byte, info os.FileInfo) error {
// 	return WithStackTrace(ioutil.WriteFile(file, contents, info.Mode()))
// }

// // Get the contents for a documentation file. These contents should be unchanged from the original, other than:
// //
// // 1. We prepend some placeholder text explaining where this file comes from
// // 2. In Markdown files, we replace any URLs to private module-XXX repos with URLs to the equivalent module-XXX-public
// //    repos
// func getContentsForDocumentationFile(file string, opts *Opts) ([]byte, error) {
// 	fullPath := path.Join(opts.InputPath, file)

// 	bytes, err := ioutil.ReadFile(fullPath)
// 	if err != nil {
// 		return []byte{}, WithStackTrace(err)
// 	}

// 	isText, err := IsTextFile(fullPath)
// 	if err != nil {
// 		return []byte{}, WithStackTrace(err)
// 	}

// 	// Return binaries, such as images, unchanged
// 	if !isText {
// 		return bytes, nil
// 	}

// 	// contents := string(bytes)
// 	// if path.Ext(file) == ".md" {
// 	// 	contents = ReplacePrivateGitHubUrlsWithPublicUrlsInMarkdown(contents)
// 	// }

// 	// text := CreatePlaceholderTextForFile(file, opts)
// 	// if len(contents) > 0 {
// 	// 	text = text + "\n\n" + contents
// 	// }

// 	//return []byte(text), nil
// 	return bytes, nil
// }

// // Get the contents for a non-documentation file. We replace the contents of source files entirely with placeholder
// // text.
// func getContentsForNonDocumentationFile(file string, opts *Opts) ([]byte, error) {
// 	return []byte(CreatePlaceholderTextForFile(file, opts)), nil
// }

// custom error types

type FailedToCompileRegEx string

func (regex FailedToCompileRegEx) Error() string {
	return fmt.Sprintf("Regular Expression \"%s\" failed to compile.", string(regex))
}
