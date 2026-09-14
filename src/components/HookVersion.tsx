import React from "react"
import VersionBadge from "./VersionBadge"
import type { Hook } from "./hooks"

/**
 * The released version of a hook, linked to its release notes. Renders nothing without a name or
 * version, and the badge unlinked without a release, so an older _hook.json still builds.
 */
const HookVersion: React.FunctionComponent<Hook> = ({
  name,
  version,
  release,
}) => {
  if (!name || !version) {
    return null
  }

  const badge = <VersionBadge repoTitle={name} version={version} />

  return <p>Latest release {release ? <a href={release}>{badge}</a> : badge}</p>
}

export default HookVersion
