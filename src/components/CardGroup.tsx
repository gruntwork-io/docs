import React from "react"
import clsx from "clsx"
import { Card, CardProps } from "./Card"
import { Grid, GridProps } from "./Grid"

interface CardGroupProps extends GridProps {
  commonCardProps?: Partial<CardProps>
  numbered?: boolean
  style?: any
}

export const CardGroup: React.FunctionComponent<CardGroupProps> = ({
  commonCardProps,
  numbered,
  cols,
  gap,
  colGap,
  rowGap,
  equalHeightRows,
  stacked,
  style,
  children,
}) => {
  return (
    <Grid
      cols={cols}
      gap={gap}
      colGap={colGap}
      rowGap={rowGap}
      stacked={stacked}
      style={style}
      equalHeightRows={equalHeightRows}
    >
      {React.Children.map(children || null, (child: JSX.Element, idx) => (
        <Card
          {...commonCardProps}
          {...child.props}
          number={numbered ? idx + 1 : undefined}
        />
      ))}
    </Grid>
  )
}

export const CardList: React.FunctionComponent<CardGroupProps> = (props) => {
  const { commonCardProps, ...allButCommonCardProps } = props
  return (
    <CardGroup
      style={props.style}
      cols={1}
      gap="1rem"
      commonCardProps={{
        orientation: "horizontal",
        appearance: "flush",
        padding: "1.5rem",
        ...commonCardProps,
      }}
      equalHeightRows={false}
      {...allButCommonCardProps}
      numbered
    />
  )
}

export default CardGroup
