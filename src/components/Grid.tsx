import React from 'react';
import styles from './Grid.module.css';

type GridProps = {
  cols?: number;
  colGap?: number | string;
  rowGap?: number | string;
  equalHeight?: boolean;
  children?: JSX.Element;
};

export default function Grid({
  cols=3,
  colGap="1rem",
  rowGap="1rem",
  equalHeight=true,
  children
}: GridProps): JSX.Element {
  return (
    <section className={styles.grid} style={{
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gridColumnGap: Number.isInteger(colGap) ? `${colGap}px` : colGap,
      gridRowGap: Number.isInteger(rowGap) ? `${rowGap}px` : rowGap,
      gridAutoRows: equalHeight ? "1fr" : "inherit"
    }}>
      {children}
    </section>
  )
}