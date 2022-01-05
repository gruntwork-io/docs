#!/bin/bash

set -e

# Cicle CI sets Google Analytics env variables. We want to unset them for stage
# as they are meant only for prod use. We don't track Google Analytics in stage.
unset CONFIG_GOOGLE_ANALYTICS_TRACKING_ID
unset CONFIG_GOOGLE_ANALYTICS_ANONYMIZE_IP

export CONFIG_SITE_URL="https://docs.dogfood-stage.com"

yarn --ignore-optional && yarn build

aws s3 cp --recursive build/ s3://docs.dogfood-stage.com
