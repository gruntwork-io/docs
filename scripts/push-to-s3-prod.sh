#!/bin/bash

set -e

export CONFIG_SITE_URL="https://docs.gruntwork.io"
export ALGOLIA_INDEX_NAME="docs_site_prod"
export ALGOLIA_API_KEY="49a495ba4c210780a28feed306d05522" # This is a search only key. It is safe to check in.

yarn --ignore-optional && yarn build

aws s3 cp --recursive build/ s3://docs.gruntwork.io
