#!/bin/bash

set -e

# Cicle CI sets Google Analytics env variables. We want to unset them for stage
# as they are meant only for prod use. We don't track Google Analytics in stage.
unset CONFIG_GOOGLE_ANALYTICS_TRACKING_ID
unset CONFIG_GOOGLE_ANALYTICS_ANONYMIZE_IP

export CONFIG_SITE_URL="https://docs.dogfood-stage.com"
export ALGOLIA_INDEX_NAME="docs_site_stage"
export ALGOLIA_API_KEY="8487ee2b8a8d59dfd7597854d562a38b" # This is a search only key. It is safe to check in.

yarn --ignore-optional && yarn build

aws s3 cp --recursive build/ s3://docs.dogfood-stage.com
