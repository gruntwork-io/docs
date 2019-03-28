package config

import (
	"io/ioutil"

	"gopkg.in/yaml.v2"
)

const ExpectedGruntyReposFilename = "gruntyrepos.yml"

type Repo struct {
	URL            string `yaml:"url"`
	Branch         string `yaml:"branch"`
	GruntyDocsRoot string `yaml:"gruntyDocsRoot"`
}

type GruntyRepos struct {
	Repos []Repo `yaml:"repos"`
}

func LoadGruntyRepos() (GruntyRepos, error) {
	var gruntyReposConfig GruntyRepos

	data, err := ioutil.ReadFile(ExpectedGruntyReposFilename)
	if err != nil {
		return gruntyReposConfig, err
	}

	err = yaml.Unmarshal(data, &gruntyReposConfig)
	return gruntyReposConfig, err
}
