/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useRef, useCallback, useMemo } from "react"
import { createPortal } from "react-dom"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import { useHistory } from "@docusaurus/router"
import { useBaseUrlUtils } from "@docusaurus/useBaseUrl"
import Link from "@docusaurus/Link"
import Head from "@docusaurus/Head"
import useSearchQuery from "@theme/hooks/useSearchQuery"
import { isRegexpStringMatch } from "@docusaurus/theme-common"
import { DocSearchButton, useDocSearchKeyboardEvents } from "@docsearch/react"
import useAlgoliaContextualFacetFilters from "@theme/hooks/useAlgoliaContextualFacetFilters"
import { translate } from "@docusaurus/Translate"
import styles from "./styles.module.css"

let DocSearchModal = null

function getTitle(hit) {
  if (!hit?.hierarchy) {
    return ""
  }

  const { lvl1, lvl2, lvl3, lvl4, lvl5, lvl6 } = hit.hierarchy
  // return lvl6 || lvl5 || lvl4 || lvl3 || lvl2 || lvl1 || ""

  let breadcrumb = lvl1 || ""

  if (lvl2) {
    breadcrumb += ` > ${lvl2}`
  }

  if (lvl3) {
    breadcrumb += ` > ${lvl3}`
  }

  if (lvl4) {
    breadcrumb += ` > ${lvl4}`
  }

  if (lvl5) {
    breadcrumb += ` > ${lvl5}`
  }

  if (lvl6) {
    breadcrumb += ` > ${lvl6}`
  }

  return breadcrumb
}

function Hit({ hit, children }) {
  console.log(`Hit: %o`, hit)
  return (
    <Link to={hit.url}>
      {/* <div className="DocSearch-Hit-Container">
        <div className="DocSearch-Hit-content-wrapper">
          <span className="DocSearch-Hit-title">{getTitle(hit)}</span>
          <div
            className="DocSearch-Hit-path"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            dangerouslySetInnerHTML={{
              __html: hit._highlightResult.content.value,
            }}
          ></div>
        </div>
      </div> */}
      {children}
    </Link>
  )
}

function ResultsFooter({ state, onClose }) {
  const { generateSearchPageLink } = useSearchQuery()

  return (
    <Link to={generateSearchPageLink(state.query)} onClick={onClose}>
      See all {state.context.nbHits} results
    </Link>
  )
}

function DocSearch({ contextualSearch, externalUrlRegex, ...props }) {
  const { siteMetadata } = useDocusaurusContext()

  const contextualSearchFacetFilters = useAlgoliaContextualFacetFilters()

  const configFacetFilters = props.searchParameters?.facetFilters ?? []

  const facetFilters = contextualSearch
    ? // Merge contextual search filters with config filters
      [...contextualSearchFacetFilters, ...configFacetFilters]
    : // ... or use config facetFilters
      configFacetFilters

  // we let user override default searchParameters if he wants to
  const searchParameters = {
    ...props.searchParameters,
    facetFilters,
  }

  const { withBaseUrl } = useBaseUrlUtils()
  const history = useHistory()
  const searchContainer = useRef(null)
  const searchButtonRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [initialQuery, setInitialQuery] = useState(null)

  const importDocSearchModalIfNeeded = useCallback(() => {
    if (DocSearchModal) {
      return Promise.resolve()
    }

    return Promise.all([
      import("@docsearch/react/modal"),
      import("@docsearch/react/style"),
      import("./styles.css"),
    ]).then(([{ DocSearchModal: Modal }]) => {
      DocSearchModal = Modal
    })
  }, [])

  const onOpen = useCallback(() => {
    importDocSearchModalIfNeeded().then(() => {
      searchContainer.current = document.createElement("div")
      document.body.insertBefore(
        searchContainer.current,
        document.body.firstChild
      )
      setIsOpen(true)
    })
  }, [importDocSearchModalIfNeeded, setIsOpen])

  const onClose = useCallback(() => {
    setIsOpen(false)
    searchContainer.current.remove()
  }, [setIsOpen])

  const onInput = useCallback(
    (event) => {
      importDocSearchModalIfNeeded().then(() => {
        setIsOpen(true)
        setInitialQuery(event.key)
      })
    },
    [importDocSearchModalIfNeeded, setIsOpen, setInitialQuery]
  )

  const navigator = useRef({
    navigate({ itemUrl }) {
      // Algolia results could contain URL's from other domains which cannot
      // be served through history and should navigate with window.location
      if (isRegexpStringMatch(externalUrlRegex, itemUrl)) {
        window.location.href = itemUrl
      } else {
        history.push(itemUrl)
      }
    },
  }).current

  const transformItems = useRef((items) => {
    return items.map((item) => {
      // If Algolia contains a external domain, we should navigate without relative URL
      if (isRegexpStringMatch(externalUrlRegex, item.url)) {
        return item
      }

      // We transform the absolute URL into a relative URL.
      const url = new URL(item.url)
      return {
        ...item,
        url: withBaseUrl(`${url.pathname}${url.hash}`),
      }
    })
  }).current

  const resultsFooterComponent = useMemo(
    () => (footerProps) => <ResultsFooter {...footerProps} onClose={onClose} />,
    [onClose]
  )

  const transformSearchClient = useCallback(
    (searchClient) => {
      searchClient.addAlgoliaAgent("docusaurus", siteMetadata.docusaurusVersion)

      return searchClient
    },
    [siteMetadata.docusaurusVersion]
  )

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef,
  })

  const translatedSearchLabel = translate({
    id: "theme.SearchBar.label",
    message: "Search",
    description: "The ARIA label and placeholder for search button",
  })

  return (
    <>
      <Head>
        {/* This hints the browser that the website will load data from Algolia,
        and allows it to preconnect to the DocSearch cluster. It makes the first
        query faster, especially on mobile. */}
        <link
          rel="preconnect"
          href={`https://${props.appId}-dsn.algolia.net`}
          crossOrigin="anonymous"
        />
      </Head>

      <div className={styles.searchBox}>
        <DocSearchButton
          onTouchStart={importDocSearchModalIfNeeded}
          onFocus={importDocSearchModalIfNeeded}
          onMouseOver={importDocSearchModalIfNeeded}
          onClick={onOpen}
          ref={searchButtonRef}
          translations={{
            buttonText: translatedSearchLabel,
            buttonAriaLabel: translatedSearchLabel,
          }}
        />
      </div>

      {isOpen &&
        createPortal(
          <DocSearchModal
            onClose={onClose}
            initialScrollY={window.scrollY}
            initialQuery={initialQuery}
            navigator={navigator}
            transformItems={transformItems}
            hitComponent={Hit}
            resultsFooterComponent={resultsFooterComponent}
            transformSearchClient={transformSearchClient}
            {...props}
            searchParameters={searchParameters}
          />,
          searchContainer.current
        )}
    </>
  )
}

function SearchBar() {
  const { siteConfig } = useDocusaurusContext()
  return <DocSearch {...siteConfig.themeConfig.algolia} />
}

export default SearchBar
