package main

import "os"

// This variable is set at build time using -ldflags parameters. For more info, see:
// http://stackoverflow.com/a/11355611/483528
var VERSION string

// The main entrypoint
func main() {
	app := CreateCli(VERSION)
	err := app.Run(os.Args)

	if err != nil {
		printError(err)
		os.Exit(1)
	}
}

// Display the given error in the console
func printError(err error) {
	if os.Getenv("DOCS_PREPROCESSOR_DEBUG") != "" {
		Logger.Println(PrintErrorWithStackTrace(err))
	} else {
		Logger.Println(err)
	}
}
