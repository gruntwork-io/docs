import React from "react"
import clsx from "clsx"
import styles from "./Grid.module.css"

export type GridProps = {
  cols?: number
  gap?: number | string
  colGap?: number | string
  rowGap?: number | string
  equalHeightRows?: boolean
  stacked?: boolean
  style?: any
  children?: JSX.Element | JSX.Element[]
}

export const Grid: React.FunctionComponent<GridProps> = ({
  cols = 3,
  gap = "2rem",
  colGap,
  rowGap,
  equalHeightRows = true,
  stacked = false,
  style,
  children,
}) => {
  const classes = clsx(
    styles.grid,
    cols == 1 && styles.col1,
    cols == 2 && styles.col2,
    cols == 3 && styles.col3,
    cols == 4 && styles.col4,
    cols == 5 && styles.col5
  )

  colGap = colGap || gap
  rowGap = rowGap || gap

  return (
    <div
      className={classes}
      style={{
        gridColumnGap: Number.isInteger(colGap) ? `${colGap}px` : colGap,
        gridRowGap: Number.isInteger(rowGap) ? `${rowGap}px` : rowGap,
        gridAutoRows: equalHeightRows ? "1fr" : "inherit",
        margin: stacked
          ? Number.isInteger(rowGap)
            ? `${rowGap}px 0`
            : `${rowGap} 0`
          : "3rem 0",
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export default Grid
