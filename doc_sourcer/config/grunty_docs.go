package config

import (
	"io/ioutil"
	"path/filepath"

	"gopkg.in/yaml.v2"
)

const ExpectedGruntyDocsFilename = "gruntydocs.yml"

type GruntyDocs struct {
	Builder string   `yaml:"builder"`
	Targets []string `yaml:"targets"`
}

func LoadGruntyDocs(basePath string) (GruntyDocs, error) {
	var gruntyDocsConfig GruntyDocs

	data, err := ioutil.ReadFile(filepath.Join(basePath, ExpectedGruntyDocsFilename))
	if err != nil {
		return gruntyDocsConfig, err
	}

	err = yaml.Unmarshal(data, &gruntyDocsConfig)
	return gruntyDocsConfig, err
}
