import React from "react"
import styles from "./VersionBadge.module.css"

type VersionBadgeProps = {
  version: string
  repoTitle?:string;
  lastModifiedVersion?: string
}

const VersionBadge: React.FunctionComponent<VersionBadgeProps> = ({
  version,
  repoTitle = "Service Catalog Version",
  lastModifiedVersion,
}) => {
  return (
    <>
      <span className={styles.versionBadge}>
        {repoTitle} {version}
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
