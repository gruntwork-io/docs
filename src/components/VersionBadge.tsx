import React from "react"
import styles from "./VersionBadge.module.css"

type VersionBadgeProps = {
  version: string
}

const VersionBadge: React.FunctionComponent<VersionBadgeProps> = ({
  version,
}) => {
  return (
    <span className={styles.versionBadge}>
      Service Catalog Version {version}
    </span>
  )
}

export default VersionBadge
