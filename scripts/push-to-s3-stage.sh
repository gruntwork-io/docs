#!/bin/bash

set -e

yarn --ignore-optional && yarn build

aws s3 cp --recursive build/ s3://docs.dogfood-stage.com
