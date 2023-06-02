import algoliasearch from "algoliasearch/lite"
import React, { PropsWithChildren } from "react"
import {
  Configure,
  InstantSearch,
  RefinementList,
  SearchBox,
  UseHitsProps,
  useHits
} from "react-instantsearch-hooks-web"
import { Card } from "./Card"
import { CardGroup } from "./CardGroup"

import styles from "./SearchArea.module.css"
import Grid from "./Grid"

interface SearchAreaProps {
  name: string
  requirement?: "required" | "optional"
  type: string
}

function ResultCardGroup(hits: any) {
  return (<CardGroup cols={3}>
      {hits.map((hit: any) => {
        return (
          <Card
            title={hit.moduleFriendlyName}
            key={hit.moduleFriendlyName}
            href={hit.docsRelativeUrl}
            tags={[hit.mainRepoTitle]}
            className={styles.card_container_max_width}
          >
            <div
              className={styles.card_result}
              dangerouslySetInnerHTML={{ __html: (hit.moduleDescription as string).substring(3,  (hit.moduleDescription as string).length - 3) }}
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
      <p className={styles.NoResults}>No results found, please try another search</p>
    </div>
  )
}

function CustomHits(props: UseHitsProps) {
  const { hits, results, sendEvent } = useHits(props)

  /*
  Don't display search results where the module has been deprecated. We prefix the friendly name for these
  modules with [DEPRECATED], so we filter for all hits where there is not a match for the prefix.
  */
  const activeHits = hits.filter((hit: any) => !hit.moduleFriendlyName.startsWith('[DEPRECATED]'))

  /*
  Don't display modules where the description contains a note.
  These modules all state they are not intended to be used directly, and the module description breaks out of the card
  */
  const onlyUseableModules = activeHits.filter((hit: any) => hit.moduleDescription.toLowerCase().indexOf("note") === -1)

  return (
    onlyUseableModules.length > 0 ? ResultCardGroup(onlyUseableModules) : NoResults()
  )
}

export const SearchArea: React.FunctionComponent<
  PropsWithChildren<SearchAreaProps>
> = ({ name, requirement, type, children }) => {
  const algoliaAppId: string = "7AWZHGNJE2"
  // This key is for search only. It is safe to check in.
  const algoliaSearchKey: string = "a976ea48057ceaa662656ec8f4f591af"

  const searchClient = algoliasearch(algoliaAppId, algoliaSearchKey)

  return (
    <div className={styles.container}>
      <InstantSearch
        searchClient={searchClient}
        indexName="dev_docs_sourcer-modules"
      >
        <Configure facetFilters={["type:module"]} hitsPerPage={28} restrictSearchableAttributes={["mainRepoTitle", "moduleFriendlyName", "rawModuleName"]} />

        <Grid cols={3}>
          <div className={styles.SearchContainerItem}>
            <p className={styles.SearchContainerItemHeader}>SEARCH</p>
            <SearchBox placeholder="Try searching for VPC or EKS..." classNames={{input: styles.SearchInput, submit:styles.SearchSubmit, reset: styles.SearchReset}} />
          </div>
          <div className={styles.SearchContainerItem} id="sme-area">
            <p className={styles.SearchContainerItemHeader}>TOPIC</p>
            <RefinementList attribute="mainRepoTitle" searchable={false} className={styles.FacetListInput} />
          </div>
          <div className={styles.SearchContainerItem} id="type">
            <p className={styles.SearchContainerItemHeader}>TYPE</p>
            <RefinementList attribute="type" searchable={false} className={styles.FacetListInput} />
          </div>
        </Grid>
        <CustomHits />
      </InstantSearch>
    </div>
  )
}

export default SearchArea
