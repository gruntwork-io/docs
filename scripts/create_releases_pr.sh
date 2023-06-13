#!/bin/bash

set -e

export DOCS_SITE_BASE_DIR="."
export RELEASES_PLUGIN_BEFORE_DATE=$(date -v1d -v-1d +%Y-%m-%d)
export GITHUB_ORG_NAME=gruntwork-io

function assert_envvar_not_empty() {
  local -r varname="$1"
  if [[ -z ${!varname} ]]; then
    echo "ERROR: this script requires that the $1 environment variable is set"
    exit 1
  fi
}

function generate_release_data() {
    yarn regenerate --plugins releases
}

function add_and_commit_changes() {
    git add docs/guides/stay-up-to-date/
    git commit -m "Update releases as of ${RELEASE_PLUGIN_BEFORE_DATE}"
}

function create_pull_request() {
    gh pr create --base master \
    -t "Update Gruntwork Releases as of ${RELEASE_PLUGIN_BEFORE_DATE}" \
    --body "Update Gruntwork releases as of ${RELEASE_PLUGIN_BEFORE_DATE}"
}

function main() {
    assert_envvar_not_empty "GITHUB_OAUTH_TOKEN"

    generate_release_data
    add_and_commit_changes
    create_pull_request
}

main
