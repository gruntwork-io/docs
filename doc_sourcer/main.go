package main

import (
	"github.com/gruntwork-io/gruntwork-cli/entrypoint"
	"github.com/gruntwork-io/gruntwork-cli/errors"
	"github.com/gruntwork-io/gruntwork-cli/logging"
	"github.com/sirupsen/logrus"
	"github.com/urfave/cli"

	"github.com/gruntwork-io/docs/doc_sourcer/config"
	"github.com/gruntwork-io/docs/doc_sourcer/git"
)

var (
	logLevelFlag = cli.StringFlag{
		Name:  "loglevel",
		Value: logrus.InfoLevel.String(),
	}
)

// initCli initializes the CLI app before any command is actually executed. This function will handle all the setup
// code, such as setting up the logger with the appropriate log level.
func initCli(cliContext *cli.Context) error {
	// Set logging level
	logLevel := cliContext.String(logLevelFlag.Name)
	level, err := logrus.ParseLevel(logLevel)
	if err != nil {
		return errors.WithStackTrace(err)
	}
	logging.SetGlobalLogLevel(level)
	return nil
}

// main should only setup the CLI flags and help texts.
func main() {
	app := entrypoint.NewApp()

	app.Name = "doc-sourcer"
	app.Author = "Gruntwork <www.gruntwork.io>"

	app.Before = initCli

	app.Flags = []cli.Flag{
		logLevelFlag,
	}

	app.Action = func(cliContext *cli.Context) error {
		gruntyRepos, err := config.LoadGruntyRepos()
		if err != nil {
			return err
		}

		for _, repo := range gruntyRepos.Repos {
			err := git.SourceRepo(repo.URL, repo.Branch, repo.GruntyDocsRoot)
			if err != nil {
				return err
			}
		}
		return nil
	}

	entrypoint.RunApp(app)
}
