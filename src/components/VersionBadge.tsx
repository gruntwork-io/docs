import React from "react"
import styles from "./VersionBadge.module.css"

type VersionBadgeProps = {
  version: string
  releaseNotesURL: string
}

export const VersionBadge: React.FunctionComponent<VersionBadgeProps> = ({
  version,
  releaseNotesURL,
}) => {
  return <span className={styles.versionBadge}>Version {version}</span>
}

export default VersionBadge
