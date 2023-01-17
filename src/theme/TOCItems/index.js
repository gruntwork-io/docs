import React from "react"
import TOCItems from "@theme-original/TOCItems"

/**
 * This is a wrapper component for the TOCItems components.
 * Docusaurus supports wrapping a component when "swizzling" in order to reduce
 * the amount of Docusaurus code that we copy and maintain. See https://docusaurus.io/docs/swizzling#wrapping
 *
 * `yarn swizzle @docusaurus/theme-classic TOCItems --wrap`
 *
 * We are swizzling the TOCItems component specifically to avoid displaying a
 * table of content when there are fewer than 2 items hence the if block on
 * lines 20-22. Docusaurus version at the time of swizzling was v2.2.0
 *
 * @export
 * @param {*} props
 * @return {*}
 */
export default function TOCItemsWrapper(props) {
  if (!props.toc || props.toc.length < 2) {
    return null
  }

  return (
    <>
      <TOCItems {...props} />
    </>
  )
}
