import React, { ReactNode } from "react"
import clsx from "clsx"
import styles from "./Card.module.css"

export type CardProps = {
  title: string
  description?: JSX.Element
  href?: string
  icon?: string
  number?: number
  tags?: string[]
  orientation?: "horizontal" | "vertical"
  appearance?: "float" | "flush" | "invisible"
  padding?: number | string
  className?: string
  children?: ReactNode
}

export const Card: React.FunctionComponent<CardProps> = ({
  title,
  description,
  href,
  icon,
  number,
  tags,
  orientation = "vertical",
  appearance = "float",
  padding,
  className,
  children,
}) => {
  const body = (
    <div
      className={clsx(
        styles.card,
        orientation === "horizontal" && styles.horizontal,
        orientation === "vertical" && styles.vertical,
        appearance === "float" && styles.float,
        appearance === "flush" && styles.flush,
        appearance === "invisible" && styles.invisible,
        className
      )}
      style={{
        padding: padding !== undefined ? padding : "",
      }}
    >
      <div>
        {number && <span className={styles.num}>{number}</span>}
        {icon && !number && (
          <img className={styles.icon} alt={title} src={icon} />
        )}
      </div>
      <div>
        <h3 className={styles.title}>{title}</h3>
        {(children || description) && (
          <div className={styles.description}>{children || description}</div>
        )}
        {tags && (
          <ul className={styles.tags}>
            {tags.map((tag, idx) => (
              <li key={idx}>{tag}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )

  return !href ? (
    body
  ) : (
    <a href={href} className={styles.cardlink}>
      {body}
    </a>
  )
}

export default Card
