#!/bin/bash

set -e

export CONFIG_SITE_URL="https://docs.gruntwork.io"

export CONFIG_GOOGLE_ANALYTICS_TRACKING_ID="GTM-5TTJJGTL"

export ALGOLIA_INDEX_NAME="docs_site_prod"
export ALGOLIA_API_KEY="49a495ba4c210780a28feed306d05522" # This is a search only key. It is safe to check in.

export CONFIG_POSTHOG_API_KEY="phc_zJYg43ctbPl1BzsnODjop1op9KSsctiGm6DNNt3zHZT"

yarn && yarn build

aws s3 sync build/ s3://docs.gruntwork.io --delete # Delete option ensures deleted files get removed from the bucket
