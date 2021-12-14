import React from "react"
import styles from "./Card.module.css"

type CardProps = {
  title: string
  icon?: string
  href?: string
  description?: JSX.Element
  children?: JSX.Element | string
}

export default function Card({
  title,
  icon,
  description,
  href,
  children,
}: CardProps): JSX.Element {
  const body = (
    <div className={styles.card}>
      {icon && <img className={styles.icon} alt={title} src={icon} />}
      <h3>{title}</h3>
      <p>{children || description}</p>
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
