import algoliasearch from "algoliasearch/lite"
import React, { PropsWithChildren } from "react"
import {
  Configure,
  InstantSearch,
  SearchBox,
  UseHitsProps,
  useHits
} from "react-instantsearch-hooks-web"
import { Card } from "./Card"
import { CardGroup } from "./CardGroup"

import styles from "./SearchArea.module.css"

interface SearchAreaProps {
  name: string
  requirement?: "required" | "optional"
  type: string
}

function CustomHits(props: UseHitsProps) {
  const { hits, results, sendEvent } = useHits(props)

  return (
    <CardGroup cols={2}>
      {hits.map((hit: any) => {
        console.log(hit.moduleDescription);
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
        <Configure facetFilters={["type:module"]} hitsPerPage={200} restrictSearchableAttributes={["mainRepoTitle", "moduleFriendlyName", "rawModuleName"]} />
        <SearchBox placeholder="Search modules" classNames={{input: styles.SearchInput, submit:styles.SearchSubmit, reset: styles.SearchReset}} />
        <CustomHits />
      </InstantSearch>
    </div>
  )
}

export default SearchArea
