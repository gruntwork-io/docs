#!/bin/bash

set -e

export CONFIG_SITE_URL="https://docs.dogfood-stage.com"

export CONFIG_GOOGLE_ANALYTICS_TRACKING_ID="UA-154792164-2"

export ALGOLIA_INDEX_NAME="docs_site_stage"
export ALGOLIA_API_KEY="8487ee2b8a8d59dfd7597854d562a38b" # This is a search only key. It is safe to check in.

yarn --ignore-optional && yarn build

aws s3 rm s3://docs.dogfood-stage.com --recursive # This is how we ensure deleted files get removed from the bucket

aws s3 cp --recursive build/ s3://docs.dogfood-stage.com
