#!/bin/bash
#
# Generate the Gruntwork docs website from scratch
#

chmod u+x docs-fetcher/docs-fetcher.sh
docs-fetcher/docs-fetcher.sh --content-path "content" --output-path "output" --repo-url "https://github.com/gruntwork-io/module-vpc"  