import React, { PropsWithChildren } from "react"
import styles from "./HclListItem.module.css"

interface HclListItemProps {
  name: string
  requirement?: "required" | "optional"
  type: string
}

export const HclListItem: React.FunctionComponent<
  PropsWithChildren<HclListItemProps>
> = ({ name, requirement, type, children }) => {
  return (
    <div className={styles.container}>
      <div>
        <a href={`#${name}`} name={name} className="snap-top">
          <strong>
            <code>{name}</code>
          </strong>
        </a>
        <em className={styles.meta}>{type}</em>
        {!!requirement && <span className={styles.meta}>{requirement}</span>}
      </div>

      <div className={styles.body}>{!!children && children}</div>
    </div>
  )
}

export const HclListItemDescription: React.FunctionComponent = ({
  children,
}) => {
  return <div className={styles.description}>{children}</div>
}



export const HclListItemExample: React.FunctionComponent = ({
  children,
}) => {
  return <div className={styles.description} style={{ marginTop: '10px' }}>
    <details>
      <summary>Example</summary>
      {children}
    </details>
  </div>
}

export const HclGeneralListItem: React.FunctionComponent<PropsWithChildren<{ title: string }>> = ({
  title,
  children,
}) => {
  return (
    <div className={styles.detail}>
      <label className={styles.label}>{title}</label>
      {children}
    </div>
  )
}

export const HclListItemTypeDetails: React.FunctionComponent = ({
  children,
}) => {
  return (
    <HclGeneralListItem title="Type Details" children={children} />
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
          <code>{defaultValue}</code>
        </>
      )}
    </div>
  )
}

export default HclListItem
