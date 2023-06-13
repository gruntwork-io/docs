#!/bin/bash

set -e

export DOCS_SITE_BASE_DIR="."
export GITHUB_ORG_NAME=gruntwork-io

export RELEASES_PLUGIN_BEFORE_DATE=
export BRANCH_NAME=
export CONFIGURE_GIT=${CONFIGURE_GIT:=1}

function set_release_date() {
  unameOut="$(uname -s)"

  # Handling running this on linux or mac
  if [ ${unameOut} = "Linux" ]; then
    RELEASES_PLUGIN_BEFORE_DATE=$(date -d "$(date +"%Y-%m-01") - 1 day" +"%F")
  elif [ ${unameOut} = "Darwin" ]; then
    RELEASES_PLUGIN_BEFORE_DATE=$(date -v1d -v-1d +%Y-%m-%d)
  else
    echo "Unknown uname ${unameOut}, exiting"
    exit 1
  fi
}

function configure_git {
  local -r git_username="$1"
  local -r git_email="$2"
  git config --global user.name "$git_username"
  git config --global user.email "$git_email"
  git config --global pull.rebase false
}

function set_branch_name() {
  RELEASE_DATE=$1

  BRANCH_NAME="automation/update-releases-as-of-${RELEASE_DATE}"
}

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

function create_branch() {
  BRANCH=$1

  git checkout -b ${BRANCH}
}

function add_and_commit_changes() {
  RELEASE_DATE=$1

  git add docs/guides/stay-up-to-date/
  git commit -m "Update Gruntwork releases as of ${RELEASE_DATE}"
}

function push_branch() {
  BRANCH=$1

  git push --set-upstream origin ${BRANCH}
}

function create_pull_request() {
  RELEASE_DATE=$1

  gh pr create --base master \
  -t "Update Gruntwork Releases as of ${RELEASE_DATE}" \
  --body "Update Gruntwork releases as of ${RELEASE_DATE}"
}

function main() {
  if [ ${CONFIGURE_GIT} -eq 0 ]; then
    echo "Configuring git..."
    assert_envvar_not_empty "GITHUB_USER_NAME"
    assert_envvar_not_empty "GITHUB_USER_EMAIL"

    configure_git "${GITHUB_USER_NAME}" "${GITHUB_USER_EMAIL}"
  fi

  assert_envvar_not_empty "GITHUB_OAUTH_TOKEN"

  set_release_date
  set_branch_name $RELEASES_PLUGIN_BEFORE_DATE

  create_branch $BRANCH_NAME
  generate_release_data
  add_and_commit_changes $RELEASES_PLUGIN_BEFORE_DATE
  push_branch $BRANCH_NAME
  create_pull_request $RELEASES_PLUGIN_BEFORE_DATE
}

main
