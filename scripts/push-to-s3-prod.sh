#!/bin/bash

set -e

export CONFIG_SITE_URL="https://docs.gruntwork.io"
export ALGOLIA_INDEX_NAME="docs_site_prod"

yarn --ignore-optional && yarn build

aws s3 cp --recursive build/ s3://docs.gruntwork.io
