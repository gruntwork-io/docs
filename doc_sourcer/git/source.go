package git

import (
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"

	"github.com/gruntwork-io/gruntwork-cli/errors"
	"github.com/gruntwork-io/gruntwork-cli/shell"
	"gopkg.in/src-d/go-git.v4"
	"gopkg.in/src-d/go-git.v4/plumbing"

	"github.com/gruntwork-io/docs/doc_sourcer/config"
)

func SourceRepo(repoURL string, repoBranch string, repoGruntyDocsRootPath string) error {
	workspacePath, err := ioutil.TempDir("", "")
	if err != nil {
		return errors.WithStackTrace(err)
	}
	defer os.RemoveAll(workspacePath)

	err = cloneRepo(workspacePath, repoURL, repoBranch)
	if err != nil {
		return errors.WithStackTrace(err)
	}

	workspacePath = filepath.Join(workspacePath, repoGruntyDocsRootPath)
	gruntyDocsConfig, err := config.LoadGruntyDocs(workspacePath)
	if err != nil {
		return errors.WithStackTrace(err)
	}

	err = buildDocsForRepo(workspacePath, gruntyDocsConfig)
	if err != nil {
		return errors.WithStackTrace(err)
	}

	return copyArtifact(workspacePath, gruntyDocsConfig)
}

func cloneRepo(workspacePath string, repoURL string, repoBranch string) error {
	_, err := git.PlainClone(
		workspacePath,
		false,
		&git.CloneOptions{
			URL:           repoURL,
			ReferenceName: plumbing.NewBranchReferenceName(repoBranch),
			SingleBranch:  true,
			Depth:         1,
			Progress:      os.Stdout,
		},
	)
	return err
}

func buildDocsForRepo(workspacePath string, gruntyDocsConfig config.GruntyDocs) error {
	options := shell.NewShellOptions()
	options.WorkingDir = workspacePath
	return shell.RunShellCommand(options, "bash", "-c", gruntyDocsConfig.Builder)
}

func copyArtifact(workspacePath string, gruntyDocsConfig config.GruntyDocs) error {
	options := shell.NewShellOptions()
	for _, target := range gruntyDocsConfig.Targets {
		srcPath := filepath.Join(workspacePath, target)
		srcPath = fmt.Sprintf("%s/.", srcPath)
		err := shell.RunShellCommand(options, "rsync", "--progress", "-r", srcPath, "./content")
		if err != nil {
			return err
		}
	}
	return nil
}
