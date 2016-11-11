package logger

import (
	"log"
	"os"
)

// A simple logger we can use to get consistent log formatting through out the app
var Logger = log.New(os.Stdout, "[docs-preprocessor] ", log.LstdFlags)
