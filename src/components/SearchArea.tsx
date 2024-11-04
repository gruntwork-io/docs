import React, { PropsWithChildren, useEffect, useRef, useState } from "react"
import Select from "react-select"

import { Card } from "./Card"
import { CardGroup } from "./CardGroup"
import styles from "./SearchArea.module.css"
import Grid from "./Grid"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import { algoliasearch } from "algoliasearch"

interface SearchAreaProps {
  name: string
  requirement?: "required" | "optional"
  type: string
}

function ResultCardGroup(hits: any) {
  return (
    <CardGroup cols={3}>
      {hits.map((hit: any) => {
        return (
          <Card
            title={hit.rawModuleName}
            key={hit.moduleName}
            href={hit.docsRelativeUrl}
            tags={[hit.mainRepoTitle]}
            className={styles.card_container_max_width}
          >
            <div
              className={styles.card_result}
              dangerouslySetInnerHTML={{
                __html: hit.moduleDescription as string,
              }}
            ></div>
          </Card>
        )
      })}
    </CardGroup>
  )
}

function NoResults() {
  return (
    <div className={styles.NoResultsContainer}>
      <p className={styles.NoResults}>
        No results found, please try another search
      </p>
    </div>
  )
}

function CustomHits(hits: any[]) {
  let newHits = hits["hits"]["searchHits"]

  if (newHits.length === 0) {
    return NoResults()
  }

  /*
  Don't display search results where the module has been deprecated. We prefix the friendly name for these
  modules with [DEPRECATED], so we filter for all hits where there is not a match for the prefix.
  */
  const activeHits = newHits.filter(
    (hit: any) => !hit.moduleName.startsWith("[DEPRECATED]")
  )

  /*
  Don't display modules where the description contains a note.
  These modules all state they are not intended to be used directly, and the module description breaks out of the card
  */
  const onlyUseableModules = activeHits.filter(
    (hit: any) => hit.moduleDescription.toLowerCase().indexOf("note") === -1
  )

  return onlyUseableModules.length > 0
    ? ResultCardGroup(onlyUseableModules)
    : NoResults()
}

const selectStyles = {
  placeholder: (base) => {
    return {
      ...base,
      color: "#969faf",
    }
  },
  control: (base, state) => ({
    ...base,
    fontSize: "16px",
    borderColor: state.isFocused ? "#6f5bd7" : "#CCCCCC",
    boxShadow: state.isFocused ? "0 0 0 1px #6f5bd7" : "#CCCCCC",
    "&:hover": {
      borderColor: state.isFocused ? "#6f5bd7" : "#CCCCCC",
      boxShadow: state.isFocused ? "0 0 0 1px #6f5bd7" : "#CCCCCC",
    },
  }),
}

export const SearchArea: React.FunctionComponent<
  PropsWithChildren<SearchAreaProps>
> = ({ name, requirement, type, children }) => {
  const { siteConfig } = useDocusaurusContext()

  const algoliaAppId: string = siteConfig.themeConfig.algolia.appId
  // This key is for search only. It is safe to check in.
  const algoliaSearchKey: string = "a976ea48057ceaa662656ec8f4f591af"
  const indexName: string = siteConfig.themeConfig.algolia.libraryIndexName

  const searchClient = algoliasearch(algoliaAppId, algoliaSearchKey)

  const [searchTerm, setSearchTerm] = useState("")
  const [facetFilters, setFacetFilters] = useState([])

  const [searchHits, setSearchHits] = useState([])
  const [searchTypeFacets, setSearchTypeFacets] = useState([])

  const [isLoading, setIsLoading] = useState(true)

  const handleSearchFacets = (facets: {}): Object[] => {
    const facetArray = []

    for (const k in facets) {
      let v = facets[k]
      facetArray.push({ key: k, value: v })
    }

    return facetArray
  }

  const loadSearchHits = async () => {
    setIsLoading(true)

    await searchClient.searchSingleIndex({
      indexName, searchParams: {
        query: searchTerm,
        facets: ["type"],
        facetFilters: facetFilters,
        hitsPerPage: 300,
      }
    })
      .then((resp) => {
        setSearchHits(resp["hits"])

        // Only load the facets once - when the page loads
        if (searchTypeFacets.length == 0) {
          setSearchTypeFacets(handleSearchFacets(resp["facets"]["type"]))
        }
      })
  }

  useEffect(() => {
    loadSearchHits()
  }, [])

  useEffect(() => {
    setIsLoading(false)
  }, [searchHits])

  useEffect(() => {
    const timeOutId = setTimeout(() => loadSearchHits(), 200)
    return () => clearTimeout(timeOutId)
  }, [searchTerm])

  useEffect(() => {
    loadSearchHits()
  }, [facetFilters])

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const selectRepoTitleFacet = (type: any) => {
    if (!type) {
      // Unset - we always want to be scoped to modules
      setFacetFilters([])
    } else {
      setFacetFilters([`type:${type.value}`])
    }
  }

  const inputElement = useRef(null);
  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);


  return (
    <div className={styles.container}>
      <Grid cols={3}>
        <div className={styles.SearchContainerItem}>
          <p className={styles.SearchContainerItemHeader}>SEARCH</p>
          <div className={styles.SearchInputContainer}>
            <input
              type="text"
              ref={inputElement}
              onChange={onSearch}
              className={styles.SearchInput}
              placeholder="Try searching for VPC or EKS..."
              autoFocus
            />
          </div>
        </div>
        <div className={styles.SearchContainerItem} id="sme-area">
          <p className={styles.SearchContainerItemHeader}>TYPE</p>
          <div className={styles.FacetListContainer}>
            <Select
              className={styles.SearchContainerDropdown}
              onChange={(value) => selectRepoTitleFacet(value)}
              isClearable={true}
              isSearchable={true}
              options={searchTypeFacets.map((f) => {
                return { value: f["key"], label: f["key"] }
              })}
              placeholder="Any"
              styles={selectStyles}
            />
          </div>
        </div>
      </Grid>
      {isLoading && searchHits.length === 0 ? <div /> : <CustomHits hits={{ searchHits }} />}
    </div>
  )
}

export default SearchArea
