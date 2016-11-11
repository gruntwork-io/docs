#!/bin/bash
#
# Copy the contents of the specified content folder, and fetch the specified git repo URLs using Fetch 
# (http://github.com/gruntwork-io/fetch) to combine them all into a single folder.
#
# This is useful so that other tools can operate on a single folder that represents content pulled from multiple sources.
#

set -e

function print_usage {
    echo
    echo "Usage: docs-fetcher.sh [OPTIONS]"
    echo
    echo "Copy the contents of the specified content folder, and fetch the specified git repo URLs using Fetch" 
    echo "(http://github.com/gruntwork-io/fetch) to combine them all into a single folder."
    echo
    echo "Options:"
    echo
    echo -e "  --content-path\tRequired. The path whose contents will be copied to the --output-path."
    echo -e "  --output-path\t\tRequired. The path where all files will be output."
    echo -e "  --repo-url\t\tOptional. A GitHub repo whose contents will be copied to the --output-path. May be specified more than once."
    echo -e "  --help\t\tShow this help text and exit."
    echo
    echo "Example:"
    echo
    echo "  docs-fetchers.sh --content-path /content --output-path /output --repo-url https://github.com/gruntwork-io/module-vpc"
}

function get_script_name {
    echo $(basename "$0")
}

function assert_env_var_not_empty {
    local readonly var_name="$1"
    local readonly var_value="${!var_name}"

    if [[ -z "$var_value" ]]; then
        echo "ERROR: Required environment variable $var_name not set."
        exit 1
    fi
}

function assert_not_empty {
  local readonly arg_name="$1"
  local readonly arg_value="$2"

  if [[ -z "$arg_value" ]]; then
    echo "ERROR: The value for '$arg_name' cannot be empty"
    print_usage
    exit 1
  fi
}

function assert_is_installed {
    local readonly name="$1"

    if [[ ! $(command -v ${name}) ]]; then
        echo "ERROR: The binary '$name' is required by this script but is not installed or in the system's PATH."
        exit 1
    fi
}

# Takes input "foo" from stdin and outputs it as "prefixfoo" for all lines in stdin
function echo_with_prefix {
    local readonly prefix="$1"

    sed -e "s/^/$prefix/"
}

function copy_folder {
    local readonly content_path="$1"
    local readonly output_path="$2"

    echo "Copying $content_path/* to $output_path..."

    if ! [[ -d "$content_path" ]]; then
        echo "ERROR: Directory \"$content_path\" does not exist."
        exit 1
    fi

    mkdir -p "$output_path"
    cp -R "$content_path/." "$output_path" 
}

function fetch_github_repo {
    local readonly repo_url="$1"
    local readonly output_path="$2"

    local readonly full_output_path="$output_path/$(get_repo_name $repo_url)"

    echo "Copying files from $repo_url to $full_output_path..."
    fetch --repo "$repo_url" --branch "master" --source-path "/" "$full_output_path" 2>&1 | echo_with_prefix "==> Fetch: "
}

# Given https://github.com/gruntwork-io/module-vpc, return "module-vpc"
function get_repo_name {
    local readonly repo_url="$1"

    echo "$repo_url" | sed "s/.*\//\\n/g" | tail -n 1
}

function docs_fetcher {
    local content_path=""
    local output_path=""
    local repo_urls=()

    while [[ $# > 0 ]]; do
        local key="$1"

        case "$key" in
          --content-path)
            content_path="$2"
            shift
            ;;
          --output-path)
            output_path="$2"
            shift
            ;;
          --repo-url)
            repo_urls+=("$2")
            shift
            ;;
          --help)
            print_usage
            exit 0
            ;;
          *)
            echo "ERROR: Unrecognized argument: $key"
            echo "Run $(get_script_name) --help to see usage information."
            exit 1
            ;;
        esac

        shift
    done

    assert_not_empty "content-path" "$content_path"
    assert_not_empty "output-path" "$output_path"

    assert_is_installed "fetch"

    assert_env_var_not_empty "GITHUB_OAUTH_TOKEN"

    copy_folder "$content_path" "$output_path/global"

    for repo_url in "${repo_urls[@]}"; do
        fetch_github_repo "$repo_url" "$output_path/packages" 
    done

    echo "Success!"
}

docs_fetcher "$@"