#!/bin/bash

set -e

export CONFIG_SITE_URL="https://docs.gruntwork.io"

export CONFIG_GOOGLE_ANALYTICS_TRACKING_ID="GTM-5TTJJGTL"

export ALGOLIA_INDEX_NAME="docs_site_prod"
export ALGOLIA_API_KEY="49a495ba4c210780a28feed306d05522" # This is a search only key. It is safe to check in.

yarn && yarn build

# Publish via the shared helper, which serializes the upload behind a bucket
# lock and skips publishing if a newer commit has already superseded this build,
# so concurrent prod deploys can't clobber each other or publish stale content.
source "$(dirname "$0")/s3-deploy-lib.sh"
deploy_to_s3 "docs.gruntwork.io"
