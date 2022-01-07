#!/bin/bash

set -e

readonly BASH_COMMONS_DIR="/opt/gruntwork/bash-commons"

if [[ ! -d "$BASH_COMMONS_DIR" ]]; then
  echo "ERROR: this script requires that bash-commons is installed in $BASH_COMMONS_DIR. See https://github.com/gruntwork-io/bash-commons for more info."
  exit 1
fi

source "$BASH_COMMONS_DIR/log.sh"
source "$BASH_COMMONS_DIR/assert.sh"

readonly ALGOLIA_APP_ID="7AWZHGNJE2"

function print_usage() {
  echo
  echo "Usage: update-search-index.sh [OPTIONS]"
  echo
  echo "This script will run a docker image containing an applicaation that will crawl the website specified in 'docsearch.json' and will upload the resulting index to Algolia."
  echo
  echo "Options:"
  echo
  echo -e "  --api-key\t\t\t[Required] The Algolia API key."
  echo -e "  --config\t\t\t[Optional] Path to 'docsearch.json'. Defaults to 'docsearch.json' in current folder."
  echo
  echo "Example:"
  echo
  echo "  update-search-index.sh \\"
  echo "    --api-key \"999c52aGb817fakeKEY5b692140f3999\" \\"
  echo "    --config \"docsearch.json\" \\"
}

function assert_envvar_not_empty() {
  local -r varname="$1"
  if [[ -z ${!varname} ]]; then
    echo "ERROR: this script requires that the $1 environment variable is set"
    exit 1
  fi
}

function index_docs() {
  local api_key
  local config="docsearch.json"

  while [[ $# -gt 0 ]]; do
    local key="$1"

    case "$key" in
    --api-key)
      api_key="$2"
      shift
      ;;
    --config)
      config="$2"
      shift
      ;;
    --help)
      pwd
      print_usage
      exit
      ;;
    *)
      log_error "Unrecognized argument: $key"
      print_usage
      exit 1
      ;;
    esac

    shift
  done

  #Verify parameters
  assert_not_empty "--api-key" "$api_key"

  docker run \
    --env ALGOLIA_APP_ID="$ALGOLIA_APP_ID" \
    --env ALGOLIA_API_KEY="$api_key" \
    --env "CONFIG=$(cat $config | jq -r tostring)" \
    algolia/docsearch-scraper
}

index_docs "$@"
