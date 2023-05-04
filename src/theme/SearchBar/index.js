import React from "react"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"

import { MyDocSearch } from "../../components/MyDocSearch"

export default function SearchBar() {
  const { siteConfig } = useDocusaurusContext()
  return <MyDocSearch {...siteConfig.themeConfig.algolia} />
}
