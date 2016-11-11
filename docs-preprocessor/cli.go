package main

import (
	"fmt"
	"strings"

	"github.com/gobwas/glob"
	"github.com/urfave/cli"
	"github.com/gruntwork-io/docs/docs-preprocessor/errors"
	"github.com/gruntwork-io/docs/docs-preprocessor/logger"
	"github.com/gruntwork-io/docs/docs-preprocessor/globs"
)

// Customize the --help text for the app so we don't show extraneous info
const CUSTOM_HELP_TEXT = `NAME:
   {{.Name}} - {{.Usage}}
   
USAGE:
   {{if .UsageText}}{{.UsageText}}{{else}}{{.HelpName}} {{if .VisibleFlags}}[global options]{{end}}{{if .Commands}} command [command options]{{end}} {{if .ArgsUsage}}{{.ArgsUsage}}{{else}}[arguments...]{{end}}{{end}}
   {{if .VisibleFlags}}
OPTIONS:
   {{range .VisibleFlags}}
   {{.}}
   {{end}}{{end}}{{if len .Authors}}
   {{if .Version}}{{if not .HideVersion}}
VERSION:
   {{.Version}}
   {{end}}{{end}}
AUTHOR(S):
   {{range .Authors}}{{.}}{{end}}
   {{end}}{{if .Copyright}}
COPYRIGHT:
   {{.Copyright}}
   {{end}}
`

const OPT_INPUT_PATH = "input-path"
const OPT_OUTPUT_PATH = "output-path"
const OPT_DOC_PATTERN = "doc-pattern"
const OPT_EXCLUDE_PATTERN = "exclude-pattern"

var DEFAULT_DOC_PATTERNS = []string{"*.md", "*.txt", "*.jpg", "*.png", "*.gif"}
var DEFAULT_EXCLUDES = []string{".git*", "vendor", "vendor/*", "test/vendor", "test/vendor/*"}

type Opts struct {
	InputPath   string
	OutputPath  string
	DocPatterns []glob.Glob
	Excludes    []glob.Glob
}

func CreateCli(version string) *cli.App {
	// Override the exiter to do nothing, since we want our own code to handle errors
	cli.OsExiter = func(code int) {}
	cli.AppHelpTemplate = CUSTOM_HELP_TEXT

	app := cli.NewApp()

	app.Name = "docs-preprocessor"
	app.Author = "Gruntwork <www.gruntwork.io>"
	app.Usage = `Transforms the existing folder structure of a collection of repos into one more suitable for a public documentation website.`
	app.UsageText = "docs-preprocessor [OPTIONS]"
	app.Version = version
	app.Action = runApp

	app.Flags = []cli.Flag{
		cli.StringFlag{
			Name:  OPT_INPUT_PATH,
			Usage: "Generate documentation from the files and folders in `PATH`.",
		},
		cli.StringFlag{
			Name:  OPT_OUTPUT_PATH,
			Usage: "Write the output to `PATH`.",
		},
		cli.StringSliceFlag{
			Name: OPT_DOC_PATTERN,
			Usage: fmt.Sprintf(`Copy files that match the PATTERN to the output path, unchanged. 
	Supports standard file patterns (e.g. *.txt, foo/**/bar). Make sure 
	to quote PATTERN so bash doesn't expand it. May be specified more 
	than once. Default: %s`, strings.Join(DEFAULT_DOC_PATTERNS, " ")),
		},
		cli.StringSliceFlag{
			Name:  OPT_EXCLUDE_PATTERN,
			Usage: fmt.Sprintf(`A PATTERN to exclude while copying to the output path. Supports 
	standard file patterns (e.g. *.tf, foo/**/bar). Make sure to quote 
	PATTERN so bash doesn't expand it. May be specified more than once. 
	Default: %s`, strings.Join(DEFAULT_EXCLUDES, " ")),
		},
	}

	return app
}

// When you run the CLI, this is the action function that gets called
func runApp(cliContext *cli.Context) error {
	if !cliContext.Args().Present() && cliContext.NumFlags() == 0 {
		cli.ShowAppHelp(cliContext)
		return nil
	}

	opts, err := parseOpts(cliContext)
	if err != nil {
		return err
	}

	logger.Logger.Printf("* * * Starting to pre-process %s into %s * * *", opts.InputPath, opts.OutputPath)
	if err := PreprocessDocs(opts); err != nil {
		return err
	}
	logger.Logger.Printf("* * * Pre-processing step complete! * * *")



	return nil
}

func parseOpts(cliContext *cli.Context) (*Opts, error) {
	inputPath := cliContext.String(OPT_INPUT_PATH)
	if inputPath == "" {
		return nil, errors.WithStackTrace(MissingParam(OPT_INPUT_PATH))
	}

	outputPath := cliContext.String(OPT_OUTPUT_PATH)
	if outputPath == "" {
		return nil, errors.WithStackTrace(MissingParam(OPT_OUTPUT_PATH))
	}

	docPatterns := cliContext.StringSlice(OPT_DOC_PATTERN)
	if len(docPatterns) == 0 {
		docPatterns = DEFAULT_DOC_PATTERNS
	}
	docGlobs, err := globs.ToGlobs(docPatterns)
	if err != nil {
		return nil, err
	}

	excludePatterns := cliContext.StringSlice(OPT_EXCLUDE_PATTERN)
	if len(excludePatterns) == 0 {
		excludePatterns = DEFAULT_EXCLUDES
	}
	excludeGlobs, err := globs.ToGlobs(excludePatterns)
	if err != nil {
		return nil, err
	}

	return &Opts{
		InputPath:   inputPath,
		OutputPath:  outputPath,
		DocPatterns: docGlobs,
		Excludes:    excludeGlobs,
	}, nil
}

// Custom error types
type MissingParam string

func (paramName MissingParam) Error() string {
	return fmt.Sprintf("Required parameter --%s cannot be empty", string(paramName))
}
