#!/bin/bash

set -e

export CONFIG_SITE_URL="https://docs.dogfood-stage.com"

export CONFIG_GOOGLE_ANALYTICS_TRACKING_ID="GTM-WPZJH6M"

export ALGOLIA_INDEX_NAME="docs_site_stage"
export ALGOLIA_API_KEY="8487ee2b8a8d59dfd7597854d562a38b" # This is a search only key. It is safe to check in.

yarn && yarn build

# Publish via the shared helper, which serializes the upload behind a bucket
# lock and skips publishing if a newer commit has already superseded this build,
# so concurrent deploys can't clobber each other or publish stale content.
source "$(dirname "$0")/s3-deploy-lib.sh"
deploy_to_s3 "docs.dogfood-stage.com"
