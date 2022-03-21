import React, { PropsWithChildren } from "react"
import styles from "./HclListItem.module.css"
import parse from "html-react-parser"

interface HclListItemProps {
  name: string
  description?: string
  requirement?: "required" | "optional"
  type: string
}

export const HclListItem: React.FunctionComponent<
  PropsWithChildren<HclListItemProps>
> = ({ name, requirement, description, type, children }) => {
  return (
    <div className={styles.container}>
      <div>
        <a href={`#${name}`} name={name} className="snap-top">
          <strong>
            <code>{name}</code>
          </strong>
        </a>
        <em className={styles.meta}>{type}</em>
        {!!requirement && <em className={styles.meta}>({requirement})</em>}
      </div>

      <div className={styles.body}>
        {!!description && (
          <p className={styles.description}>{parse(description)}</p>
        )}
        <div>{!!children && children}</div>
      </div>
    </div>
  )
}

export const HclListItemTypeDetails: React.FunctionComponent = ({
  children,
}) => {
  return (
    <div className={styles.detail}>
      <label className={styles.label}>Type Details</label>
      {children}
    </div>
  )
}

export const HclListItemDefaultValue: React.FunctionComponent<
  PropsWithChildren<{ defaultValue?: string | number | boolean }>
> = ({ defaultValue, children }) => {
  return (
    <div className={styles.detail}>
      {!!children ? (
        <>
          <label className={styles.label}>Default</label>
          {children}
        </>
      ) : (
        <>
          <label className={styles.inlineLabel}>Default:</label>
          <code>{defaultValue === "" ? `""` : defaultValue}</code>
        </>
      )}
    </div>
  )
}

export default HclListItem
