import React from "react"
import styles from "./VersionBadge.module.css"

type VersionBadgeProps = {
  version: string
  lastModifiedVersion?: string
}

const VersionBadge: React.FunctionComponent<VersionBadgeProps> = ({
  version,
  lastModifiedVersion,
}) => {
  return (
    <>
      <span className={styles.versionBadge}>
        Service Catalog Version {version}
      </span>
      {lastModifiedVersion && (
        <span className={styles.lastModificationLabel}>
          Last updated in version {lastModifiedVersion}
        </span>
      )}
    </>
  )
}

export default VersionBadge
