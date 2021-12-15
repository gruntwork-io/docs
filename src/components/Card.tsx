import React from "react"
import styles from "./Card.module.css"

type CardProps = {
  title: string
  icon?: string
  href?: string
  description?: JSX.Element
}

export const Card: React.FunctionComponent<CardProps> = ({
  title,
  icon,
  description,
  href,
  children,
}) => {
  const body = (
    <div className={styles.card}>
      {icon && <img className={styles.icon} alt={title} src={icon} />}
      <h3>{title}</h3>
      <div>{children || description}</div>
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
