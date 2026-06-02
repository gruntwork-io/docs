#!/bin/bash
# Shared helpers for publishing the built site to an S3 bucket safely when
# more than one CI build may be running at the same time (e.g. two quick pushes
# to main both kick off a prod deploy).
#
# Concurrency model:
#   1. A lock object in the target bucket serializes the `aws s3 sync`, so two
#      builds never write to the bucket simultaneously (interleaved syncs can
#      leave the site in a corrupt, half-updated state). The lock is acquired
#      with an S3 conditional write, which is atomic and needs no extra
#      infrastructure (DynamoDB, etc.) or credentials beyond the bucket write
#      access the deploy already has.
#   2. After acquiring the lock we re-check that the commit we built is still the
#      tip of its branch. If a newer commit has landed, we skip publishing and
#      let that newer build do it. Without this, a lock alone would just trade
#      "corruption" for "last finisher wins" -- an older build that grabs the
#      lock second would happily overwrite prod with stale content.

set -euo pipefail

# Lock object key. Kept under a dedicated prefix and excluded from the sync so
# `--delete` can't remove it mid-deploy. Contents are just the holder's commit
# SHA, build URL, and a timestamp (nothing sensitive).
readonly LOCK_KEY="_deploy-locks/deploy.lock"
readonly LOCK_TTL_SECONDS=900    # Treat a lock older than this as abandoned.
readonly LOCK_POLL_SECONDS=5

# acquire_lock <bucket>
# Blocks until this build owns the lock. Takeover is governed solely by the TTL:
# a lock is only ever evicted once it is older than LOCK_TTL_SECONDS (i.e. its
# holder has crashed or stalled), so an active holder is never displaced.
acquire_lock() {
  local bucket="$1"
  local body tmp lock_ts now age

  while true; do
    # Stamp a fresh timestamp on every attempt: a build that waits before
    # winning must write a current ts, otherwise the next waiter could
    # immediately misjudge this brand-new lock as stale.
    body="$(printf '{"sha":"%s","build_url":"%s","ts":%s}' \
      "${CIRCLE_SHA1:-unknown}" "${CIRCLE_BUILD_URL:-unknown}" "$(date +%s)")"
    tmp="$(mktemp)"
    printf '%s' "$body" > "$tmp"

    # --if-none-match '*' makes the PUT succeed only if the object does not yet
    # exist, i.e. only one concurrent build can win this call.
    if aws s3api put-object --bucket "$bucket" --key "$LOCK_KEY" \
        --if-none-match '*' --body "$tmp" >/dev/null 2>&1; then
      rm -f "$tmp"
      echo "Acquired deploy lock for ${bucket}"
      return 0
    fi
    rm -f "$tmp"

    # Someone else holds the lock. Take it over only if it's older than the TTL
    # (holder crashed/stalled); otherwise keep waiting for an active holder.
    lock_ts="$(aws s3api get-object --bucket "$bucket" --key "$LOCK_KEY" /dev/stdout 2>/dev/null \
      | jq -r '.ts // 0' 2>/dev/null || echo 0)"
    now="$(date +%s)"
    age=$(( now - lock_ts ))

    if (( lock_ts == 0 || age > LOCK_TTL_SECONDS )); then
      echo "Existing deploy lock looks stale (age ${age}s); taking it over"
      aws s3api delete-object --bucket "$bucket" --key "$LOCK_KEY" >/dev/null 2>&1 || true
      continue
    fi

    echo "Deploy lock held by another build; retrying in ${LOCK_POLL_SECONDS}s..."
    sleep "$LOCK_POLL_SECONDS"
  done
}

# release_lock <bucket>
release_lock() {
  local bucket="$1"
  aws s3api delete-object --bucket "$bucket" --key "$LOCK_KEY" >/dev/null 2>&1 || true
  echo "Released deploy lock for ${bucket}"
}

# is_latest_commit
# Returns 0 if the commit we built is still the tip of its branch. Outside CI
# (no CIRCLE_BRANCH) there is nothing to guard against, so returns 0.
is_latest_commit() {
  local branch="${CIRCLE_BRANCH:-}"
  [[ -z "$branch" ]] && return 0
  # If we can't reach the remote, fail open and let the deploy proceed.
  git fetch --quiet origin "$branch" 2>/dev/null || return 0
  [[ "$(git rev-parse FETCH_HEAD)" == "${CIRCLE_SHA1:-}" ]]
}

# deploy_to_s3 <bucket>
# Expects the site to already be built into ./build. Serializes the sync behind
# the bucket lock and skips publishing if a newer commit has superseded this one.
deploy_to_s3() {
  local bucket="$1"

  acquire_lock "$bucket"
  # Always release the lock, even if the sync fails or we exit early.
  trap 'release_lock "'"$bucket"'"' EXIT

  if ! is_latest_commit; then
    echo "Commit ${CIRCLE_SHA1:-} is no longer the tip of ${CIRCLE_BRANCH:-its branch}; a newer build will publish. Skipping deploy."
    return 0
  fi

  echo "Publishing build/ to s3://${bucket}"
  # --delete removes files that no longer exist; --exclude keeps the sync from
  # deleting (and thus prematurely releasing) our own lock object.
  aws s3 sync build/ "s3://${bucket}" --delete --exclude "_deploy-locks/*"
}
