import React from "react"
import clsx from "clsx"
import styles from "./Course.module.css"
import Card from "./Card"

type CourseProps = {
  title: string
  icon: string
  href: string
  description: JSX.Element
  author: string
  authorImg: string
  videos: number
  duration: number
}

export const Course: React.FunctionComponent<CourseProps> = ({
  title,
  icon,
  description,
  href,
  author,
  authorImg,
  videos,
  duration,
}) => {
  return (
    <Card title={title} icon={icon} href={href}>
      <p>{description}</p>
      <p className={styles.author}>
        <img src={authorImg} className="no-zoom" />
        <span>{author}</span>
      </p>
      <p>
        <span className={clsx(styles.videos, styles.metadata)}>
          {videos} micro videos
        </span>
        <span className={clsx(styles.duration, styles.metadata)}>
          {duration} minutes
        </span>
      </p>
    </Card>
  )
}

export default Course
