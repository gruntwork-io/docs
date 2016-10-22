package main

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

// This function will walk all the files specified in opt.InputPath and process them into opts.OutputPath
func ProcessDocs(opts *Opts) error {
	return filepath.Walk(opts.InputPath, func(path string, info os.FileInfo, err error) error {
		relPath, err := GetPathRelativeTo(path, opts.InputPath)
		if err != nil {
			return err
		} else if shouldSkipPath(relPath, opts) {
			fmt.Printf("Skipping path %s\n", relPath)
			return nil
		} else if isModuleDoc(relPath, opts) {
			fmt.Printf("ModuleDoc: %s\n", relPath)
			return nil
		} else {
			//fmt.Printf("Path %s\n", relPath)
			return nil
		}

		//fmt.Println(relPath)
		//return nil

		// if err != nil {
		// 	return err
		// } else if shouldSkipPath(relPath, opts) {
		// 	Logger.Printf("Skipping path %s", relPath)
		// 	return nil
		// } else if info.IsDir() {
		// 	return CreateDir(relPath, opts.OutputPath)
		// } else {
		// 	return generateDocsForFile(relPath, info, opts)
		// }
	})
}

// Return true if this is a file or folder we should skip completely in the processing step
func shouldSkipPath(path string, opts *Opts) bool {
	return path == opts.InputPath || MatchesGlobs(path, opts.Excludes)
}

// Return true if the path is of the form packages/<package-name>/modules/*.md
func isModuleDoc(path string, opts *Opts) bool {
	subpaths := strings.Split(path, "/")

	var fileName string
	if len(subpaths) > 3 {
		fileName = subpaths[len(subpaths)-1]
	} else {
		return false
	}

	return subpaths[0] == "packages" &&
		subpaths[2] == "modules" &&
		isMarkdownFile(fileName)
}

// Return true if the given filename is a Markdown file
func isMarkdownFile(filename string) bool {
	validFileExtensions := []string{"markdown", "mdown", "mkdn", "mkd", "md"}
	fileExtension := strings.Split(filename, ".")[1]
	return strSliceContains(validFileExtensions, fileExtension)
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
