package main

import (
	"fmt"
	"os"
	"path/filepath"
	//"regexp"
	//"strings"
	//"io/ioutil"
	//"errors"
	"github.com/gruntwork-io/docs/docs-preprocessor/docfile"
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
			doc, err := docfile.NewDocFile(path, relPath)
			if _, ok := err.(docfile.NoDocCouldBeCreatedFromGivenRelPath); ok {
				//Logger.Printf("Ignoring %s\n", relPath)
				return nil
			} else if err != nil {
				return err
			}

			err = doc.Copy(opts.OutputPath)
			if err != nil {
				return err
			}

			return nil
		}
	})
}

// Return true if this is a file or folder we should skip completely in the processing step.
func shouldSkipPath(path string, opts *Opts) bool {
	return path == opts.InputPath || MatchesGlobs(path, opts.Excludes)
}

//
//// Check whether the given path matches the given RegEx. We panic if there's an error (versus returning a bool and an
//// error) to keep the if-else statement in ProcessDocs simpler.
//func checkRegex(path string, regexStr string) bool {
//	regex := regexp.MustCompile(regexStr)
//	return regex.MatchString(path)
//}
//
//// Return the output path for a GlobalDoc file. See TestGetGlobalDocOutputPath for expected output.
//func getGlobalDocOutputPath(path string) (string, error) {
//	var outputPath string
//
//	regex := regexp.MustCompile(IS_GLOBAL_DOC_REGEX)
//	submatches := regex.FindAllStringSubmatch(path, -1)
//
//	if len(submatches) != 1 || len(submatches[0]) != 2 {
//		return outputPath, WithStackTrace(RegExReturnedUnexpectedNumberOfMatches(IS_GLOBAL_DOC_REGEX))
//	}
//
//	outputPath = submatches[0][1]
//
//	return outputPath, nil
//}
//
//// Return the output path for a ModuleDoc file. See TestGetModuleDocExampleOutputPath for expected output.
//func getModuleDocOutputPath(path string) (string, error) {
//	var outputPath string
//
//	regex := regexp.MustCompile(IS_MODULE_DOC_REGEX)
//	submatches := regex.FindAllStringSubmatch(path, -1)
//
//	if len(submatches) != 1 || len(submatches[0]) != 3 {
//		return outputPath, errors.New("Module documents must exist in the path /packages/<package-name>/modules/<module-name>/_docs/. Any subfolders in /_docs will generate an error.")
//	}
//
//	// Full string: packages/module-vpc/modules/vpc-app/module-doc.md
//	// This part: packages/module-vpc/modules/vpc-app
//	modulePath := submatches[0][1]
//	modulePath = strings.Replace(modulePath, "modules/", "", 1)
//
//	// Full string: packages/module-vpc/modules/vpc-app/module-doc.md
//	// This part: module-doc.md
//	fileName := submatches[0][2]
//
//	return modulePath + "/" + fileName, nil
//}
//
//// Copy the given file. If a file already exists at newPath, return an error.
//func copyFile(srcPath, dstPath string) error {
//	if isFileExist(dstPath) {
//		return errors.New("A file already exists at the path %s. Overwriting existing files is not permiitted to ensure no previously file gets overwritten.")
//	}
//
//	bytes, err := ioutil.ReadFile(srcPath)
//	if err != nil {
//		return WithStackTrace(err)
//	}
//
//	err = ioutil.WriteFile(dstPath, bytes, os.ModePerm)
//	if err != nil {
//		return WithStackTrace(err)
//	}
//
//	return nil
//}
//
//// Return true if the file at the given path exists
//func isFileExist(path string) bool {
//	_, err := os.Stat(path)
//	return err == nil
//}

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

type RegExReturnedUnexpectedNumberOfMatches string
func (regex RegExReturnedUnexpectedNumberOfMatches) Error() string {
	return fmt.Sprintf("The Regular Expression \"%s\" returned a different number of matches than we expected.\n", string(regex))
}