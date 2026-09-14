import React from "react"
import Link from "@docusaurus/Link"
import {
  useCurrentSidebarCategory,
  findFirstSidebarItemLink,
  filterDocCardListItems,
} from "@docusaurus/plugin-content-docs/client"
import type { Hook } from "./hooks"

// Declared here because the repo carries no @types/webpack-env.
declare const require: {
  context(
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp
  ): { (key: string): Hook; keys(): string[] }
}

const HOOKS = require.context(
  "@site/docs/2.0/docs/pipelines/guides/hooks/gruntwork-provided",
  true,
  /_hook\.json$/
)

/** Each hook's description, keyed by its path under gruntwork-provided. */
const DESCRIPTIONS = new Map(
  HOOKS.keys().map((key) => [
    key.replace(/^\.\/|\/_hook\.json$/g, ""),
    HOOKS(key).description,
  ])
)

/**
 * The hooks in this page's sidebar category, linked, each with the description its _hook.json
 * carries. Taken from the sidebar, so a newly released hook appears without an edit here.
 */
const HookList: React.FunctionComponent = () => {
  const category = useCurrentSidebarCategory()

  return (
    <ul>
      {filterDocCardListItems(category.items).map((item) => {
        const href = findFirstSidebarItemLink(item)

        // Only an html item reaches here without a link.
        if (item.type === "html" || !href) {
          return null
        }

        const description = DESCRIPTIONS.get(
          href.replace(/^.*\/gruntwork-provided\/|\/$/g, "")
        )

        return (
          <li key={href}>
            <Link to={href}>{item.label}</Link>
            {description && ` - ${description}`}
          </li>
        )
      })}
    </ul>
  )
}

export default HookList
