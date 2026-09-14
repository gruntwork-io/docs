import React from "react"
import VersionBadge from "./VersionBadge"
import type { Hook } from "./hooks"

/**
 * The released version of a Gruntwork-provided hook, linked to its release notes.
 *
 * Renders nothing unnamed or unversioned, so a page whose _hook.json predates a field still builds.
 */
const HookVersion: React.FunctionComponent<Hook> = ({
  name,
  version,
  release,
}) => {
  if (!name || !version) {
    return null
  }

  return (
    <p>
      Latest release{" "}
      <a href={release}>
        <VersionBadge repoTitle={name} version={version} />
      </a>
    </p>
  )
}

export default HookVersion
