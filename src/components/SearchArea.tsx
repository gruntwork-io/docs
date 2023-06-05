import algoliasearch from "algoliasearch/lite"
import React, { PropsWithChildren, useEffect, useState } from "react"

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

function CustomHits(hits: any[]) {
  let newHits = hits["hits"]["searchHits"];

  if (newHits.length === 0) {
    return NoResults()
  }

  /*
  Don't display search results where the module has been deprecated. We prefix the friendly name for these
  modules with [DEPRECATED], so we filter for all hits where there is not a match for the prefix.
  */
  const activeHits = newHits.filter((hit: any) => !hit.moduleFriendlyName.startsWith('[DEPRECATED]'))

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
  const index = searchClient.initIndex("dev_docs_sourcer-modules");

  const [repoTitleDropdownVisible, setTitleDropdownVisible] = useState(false);
  const [typeDropdownVisible, setTypeDropdownVisible] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [facetFilters, setFacetFilters] = useState(["type:module"])

  const [searchHits, setSearchHits] = useState([]);
  const [searchRepoFacets, setSearchRepoFacets] = useState([]);
  const [searchTypeFacets, setSearchTypeFacets] = useState([])

  const handleSearchFacets = (facets: {}): Object[] => {
    const facetArray = []

    for (const k in facets) {
      let v = facets[k];
      facetArray.push({key: k, value: v});
    }

    return facetArray
  }

  const loadSearchHits = async () => {
    await index.search(searchTerm, {facets: ["mainRepoTitle", "type"], facetFilters: facetFilters}).then(resp => {
      setSearchHits(resp["hits"]);

      // Only load the facets once - when the page loads
      if (searchRepoFacets.length === 0 && searchTypeFacets.length == 0) {
        setSearchRepoFacets(handleSearchFacets(resp["facets"]["mainRepoTitle"]));
        setSearchTypeFacets(handleSearchFacets(resp["facets"]["type"]));
      }
    });
  }

  useEffect(() => {
    loadSearchHits()
  }, [])

  useEffect(() => {
    loadSearchHits();
  }, [searchTerm]);

  useEffect(() => {
    loadSearchHits();
  }, [facetFilters]);

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  }

  const selectRepoTitleFacet = (facetName: string) => {
    if (`mainRepoTitle:${facetName}` === facetFilters[0]) {
      // Unset
      setFacetFilters(["type:module"])
    } else {
      setFacetFilters([`mainRepoTitle:${facetName}`]);
    }
    setTitleDropdownVisible(false);
  }

  const handleTypeFacetDropdownEvent = () => {
    setTypeDropdownVisible(!typeDropdownVisible);
  }

  const handleRepoFacetDropdownEvent = () => {
    setTitleDropdownVisible(!repoTitleDropdownVisible);
  }

  return (
    <div className={styles.container}>
        <Grid cols={3}>
          <div className={styles.SearchContainerItem}>
            <p className={styles.SearchContainerItemHeader}>SEARCH</p>
            <input type="text" onChange={onSearch} className={styles.SearchInput} placeholder="Try searching for VPC or EKS..." />
          </div>
          <div className={styles.SearchContainerItem} id="sme-area">
            <p className={styles.SearchContainerItemHeader}>TOPIC</p>
            <div id="title-dropdown">
              <button className={styles.FacetDropdownButton} onClick={handleRepoFacetDropdownEvent}>
                <p className={styles.FacetButtonText}>{facetFilters[0].split(":")[1]}</p>
              </button>
              {repoTitleDropdownVisible &&
              <div className={styles.FacetListContainer}>
                <ul className={styles.FacetList}>
                  {searchRepoFacets.map(f => {
                    return <li className={styles.FacetListItem} onClick={() => selectRepoTitleFacet(f["key"])} key={f["key"]}>{f["key"]}</li>
                  })}
                </ul>
              </div>}
            </div>
          </div>
          <div className={styles.SearchContainerItem} id="type">
            <p className={styles.SearchContainerItemHeader}>TYPE</p>
            <div id="type-dropdown">
              <button className={styles.FacetDropdownButton} onClick={handleTypeFacetDropdownEvent}>
                <p className={styles.FacetButtonText}>Module</p>
              </button>
              {typeDropdownVisible &&
              <div className={styles.FacetListContainer}>
                <ul className={styles.FacetList}>
                  {searchTypeFacets.map(f => {
                    return <li className={styles.FacetListItem} key={f["key"]}>{f["key"]}</li>
                  })}
                </ul>
              </div>}
            </div>
          </div>
        </Grid>
        <CustomHits hits={{ searchHits }} />
      {/* </InstantSearch> */}
    </div>
  )
}

export default SearchArea
