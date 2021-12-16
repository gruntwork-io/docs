import React from "react"
import clsx from "clsx"
import styles from "./CenterLayout.module.css"

/**
 * When using this layout, you should set the following parameters in
 * your front matter:
 *
 * ---
 * hide_table_of_contents: true
 * hide_title: true
 * ---
 *
 * You should then wrap _all_ content on the page between <CenterLayout> tags:
 *
 * <CenterLayout>
 *
 * # Page Title
 *
 * Content…
 *
 * </CenterLayout>
 *
 * Also note: The "markdown" class being applied is essential to preserve
 * default styles applied by the theme e.g. with `.markdown > h2` selectors
 *
 * */

export const CenterLayout: React.FunctionComponent<any> = ({ children }) => {
  return <div className={clsx(styles.center, "markdown")}>{children}</div>
}

export default CenterLayout
