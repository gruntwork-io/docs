import React from "react"
import styles from "./HclListItem.module.css"
import parse from "html-react-parser"
import cl from "classnames"

interface HclListItemProps {
  name: string
  description?: string
  requirement: "required" | "optional"
  defaultValue: string | number | boolean
  type: string
  typeDetails?: string
}

export const HclListItem: React.FunctionComponent<HclListItemProps> = ({
  name,
  requirement,
  description,
  type,
  typeDetails,
  defaultValue,
}: HclListItemProps) => {
  return (
    <div className={styles.container}>
      <div>
        <a href={`#${name}`} className="snap-top">
          <strong>
            <code>{name}</code>
          </strong>
        </a>
        <em className={styles.meta}>{type}</em>
        <em className={styles.meta}>({requirement})</em>
      </div>

      <div className={styles.body}>
        {!!description && (
          <p className={styles.description}>{parse(description)}</p>
        )}
        <div
          className={cl({
            [styles.detailsContainer]: !!typeDetails || !!defaultValue,
          })}
        >
          {!!typeDetails && (
            <>
              <label className={styles.label}>Type Details</label>
              <pre className={styles.pre}>
                <code>{typeDetails}</code>
              </pre>
            </>
          )}
          {!!defaultValue && (
            <>
              <label className={styles.inlineLabel}>Default:</label>
              <code className={styles.code}>{defaultValue}</code>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default HclListItem
