import React from "react"
import styles from "./CenterLayout.module.css"

/**
 * When using this layout, you should set the following parameters in
 * your front matter:
 *
 * ---
 * hide_table_of_contents: true
 * hide_title: true
 * ---
 * */

export const CenterLayout: React.FunctionComponent<any> = ({ children }) => {
  return <div className={styles.center}>{children}</div>
}

export default CenterLayout
