# Use the Gruntwork CLI

Visit and install [the Gruntwork command line interface (CLI)](https://github.com/gruntwork-io/gruntwork)

## Installation options 

There are several ways you can install the latest Gruntwork CLI tool:

### Install from releases

Visit [https://github.com/gruntwork-io/gruntwork/releases](https://github.com/gruntwork-io/gruntwork/releases) and download the correct release for your system.

### Install using the Gruntwork installer

You can use our [Gruntwork installer tool](https://github.com/gruntwork-io/gruntwork-installer) to install any Gruntwork binary tool or terraform module. 

After installing the Gruntwork installer, you can look up the latest Gruntwork CLI release at [https://github.com/gruntwork-io/gruntwork/releases](https://github.com/gruntwork-io/gruntwork/releases) and then run the following command: 

`gruntwork-install --binary-name 'gruntwork' --repo 'https://github.com/gruntwork-io/gruntwork' --tag '<latest-tag>'`

### Build from source
This requires a working [Go installation](https://go.dev/doc/install).

`git clone git@github.com:gruntwork-io/gruntwork.git`

`cd gruntwork`

`go build`

## Run the Gruntwork CLI wizard

The Gruntwork CLI features a wizard designed to assist you in completing your Reference Architecture setup **actions**. To commence the wizard, first authenticate to AWS on the command line, then run 

`gruntwork wizard`


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "71ba0441c6ec2511a8f51deed5c555a4"
}
##DOCS-SOURCER-END -->
