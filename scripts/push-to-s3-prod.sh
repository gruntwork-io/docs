#!/bin/bash

set -e

yarn && yarn build

aws s3 cp --recursive build/ s3://[PUT_THIS_IN_WHEN_READY]
