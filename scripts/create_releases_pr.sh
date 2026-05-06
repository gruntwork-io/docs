#!/bin/bash

set -e

export DOCS_SITE_BASE_DIR="."
export GITHUB_ORG_NAME=gruntwork-io
export CONFIGURE_GIT=${CONFIGURE_GIT:=1}
export GH_TOKEN=${GITHUB_OAUTH_TOKEN} # required to use 'gh'

function set_release_date() {
  unameOut="$(uname -s)"

  # Handling running this on linux or mac. UTC-anchored to match
  # docs-sourcer's UTC date parsing and avoid timezone drift near month
  # boundaries when the script is run outside UTC.
  if [ ${unameOut} = "Linux" ]; then
    # Equivalent of a return statement
    echo $(date -u -d "$(date -u +"%Y-%m-01") - 1 day" +"%F")
  elif [ ${unameOut} = "Darwin" ]; then
    # Equivalent of a return statement
    echo $(TZ=UTC date -v1d -v-1d +%Y-%m-%d)
  else
    echo "Unknown uname ${unameOut}, exiting"
    exit 1
  fi
}

# First day of the current month, used as the exclusive upper bound for the
# releases plugin filter. docs-sourcer parses date-only strings as midnight
# UTC, so passing "last day of previous month" misses releases published
# after 00:00 UTC on that day. Passing "first day of current month" instead
# captures everything from the previous month regardless of UTC time.
function set_cutoff_date() {
  unameOut="$(uname -s)"

  if [ ${unameOut} = "Linux" ]; then
    echo $(date -u +"%Y-%m-01")
  elif [ ${unameOut} = "Darwin" ]; then
    echo $(TZ=UTC date -v1d +%Y-%m-%d)
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
  local -r release_date=$1

  # The equivalent of return for bash functions
  echo "automation/update-releases-as-of-$release_date"
}

function assert_envvar_not_empty() {
  local -r varname="$1"
  if [[ -z ${!varname} ]]; then
    echo "ERROR: this script requires that the $1 environment variable is set"
    exit 1
  fi
}

function generate_release_data() {
  local -r cutoff_date=$1

  # The 'releases' plugin requires this env var to be set to limit releases to before this date
  RELEASES_PLUGIN_BEFORE_DATE="$cutoff_date" yarn regenerate --plugins releases
}

function create_branch() {
  local -r branch=$1

  git checkout -b $branch
}

function add_and_commit_changes() {
  local -r release_date=$1

  git add docs/guides/stay-up-to-date/
  git commit -m "Update Gruntwork releases as of $release_date"
}

function push_branch() {
  local -r branch=$1

  git push --set-upstream origin "$branch"
}

function create_pull_request() {
  local -r release_date=$1

  gh pr create --base main \
  -t "Update Gruntwork Releases as of $release_date" \
  --body "Update Gruntwork releases as of $release_date"
}

function main() {
  if [ ${CONFIGURE_GIT} -eq 0 ]; then
    echo "Configuring git..."
    assert_envvar_not_empty "GITHUB_USER_NAME"
    assert_envvar_not_empty "GITHUB_USER_EMAIL"

    configure_git "${GITHUB_USER_NAME}" "${GITHUB_USER_EMAIL}"
  fi

  assert_envvar_not_empty "GITHUB_OAUTH_TOKEN"

  local -r RELEASE_DATE=$(set_release_date)
  local -r CUTOFF_DATE=$(set_cutoff_date)
  local -r BRANCH_NAME=$(set_branch_name $RELEASE_DATE)

  create_branch $BRANCH_NAME
  generate_release_data $CUTOFF_DATE
  add_and_commit_changes $RELEASE_DATE
  push_branch $BRANCH_NAME
  create_pull_request $RELEASE_DATE
}

main
