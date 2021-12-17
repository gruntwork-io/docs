import React from "react"
import clsx from "clsx"
import { Card, CardProps } from "./Card"
import { Grid, GridProps } from "./Grid"

interface CardGroupProps extends GridProps {
  commonCardProps?: Partial<CardProps>
  numbered?: boolean
}

export const CardGroup: React.FunctionComponent<CardGroupProps> = ({
  commonCardProps,
  numbered,
  cols,
  gap,
  colGap,
  rowGap,
  equalHeightRows,
  children,
}) => {
  return (
    <Grid
      cols={cols}
      gap={gap}
      colGap={colGap}
      rowGap={rowGap}
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
      cols={1}
      commonCardProps={{
        orientation: "horizontal",
        appearance: "flush",
        ...commonCardProps,
      }}
      equalHeightRows={false}
      {...allButCommonCardProps}
      numbered
    />
  )
}

export default CardGroup
