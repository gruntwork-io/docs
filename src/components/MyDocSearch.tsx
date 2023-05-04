import React, { PropsWithChildren } from "react"
import styles from "./MyDocSearch.module.css"

import { Modal, ModalHeight, ModalWidth } from "./Modal"

import algoliasearch from "algoliasearch"

import { SearchResponse } from "@algolia/client-search"

import TabItem from "@theme/TabItem"
import Tabs from "@theme/Tabs"
import Card from "./Card"

interface MyDocSearchProps {
  name: string
  requirement?: "required" | "optional"
  type: string
}

interface SearchResponseProps {
  className: string
  results: SearchResponse<MarkdownSection> | undefined
}


// TODO: This is duplicated from docs-sourcer
interface MarkdownSection {
  title: string;
  type: string;
  content: string;
  h1: string | null;
  h2: string | null;
  h3: string | null;
  h4: string | null;
  url: string;
  primaryCategory: string | null;
  secondaryCategory: string | null;
  tertiaryCategory: string | null;
}


const groupBy = <T, K extends keyof T>(array: T[], key: K): Record<string, T[]> => {
  return array.reduce((acc, obj) => {
    const propertyValue = obj[key] as string;
    if (!acc[propertyValue]) {
      acc[propertyValue] = [];
    }
    acc[propertyValue].push(obj);
    return acc;
  }, {} as Record<string, T[]>);
}

const SearchResults: React.FunctionComponent<
  SearchResponseProps | undefined
> = ({ className, results, children }) => {

  // Group results by h1

  if(!results) {
    console.log(`No results`)
    return <></>
  }

  const grouped = groupBy(results.hits, "primaryCategory");
  console.log(`grouped: %o`, grouped);

  return (
    <div className="px-2">
      {Object.entries(grouped).map(([group, cards], index) => {
        // for each group, render a list of cards for that group
        return (<>
          <h2>{group}</h2>
          {cards.map((hit, index) => {
            return (
              <div className="w-full py-2 " key={`${hit.objectID}-${index}`}>
                <Card
                  title={hit.title}
                  href={hit.url}
                  tags={[hit.secondaryCategory, hit.tertiaryCategory, hit.h1]
                  }
                  titleClassName="text-xl font-bold"
                  padding={"4px"}
                  
                >
                  <div dangerouslySetInnerHTML={{__html: hit._highlightResult?.content?.value.slice(0,300)}} />
                </Card>
              </div>
            )
          })}
        </>)
      }
      )}

    </div>
  ) 
}

const SearchResultsModules: React.FunctionComponent<
  SearchResponseProps | undefined
> = ({ className, results }) => {
  return results ? (
    <div className="px-2">
      {results.hits.map((hit: any, index) => {
        const mainKey = `${hit.objectID}-${index}`
        return (
          <div className="w-full py-2" key={mainKey}>
            {hit.type === "module" ? (
              <Card
                title={hit.moduleFriendlyName}
                key={`${mainKey}-${hit.docsRelativeUrl}`}
                href={hit.docsRelativeUrl}
                tags={[hit.mainRepoTitle]}
                titleClassName="text-xl font-bold"
                padding={"4px"}
              ></Card>
            ) : (
              <Card
                title={hit.variableName}
                key={`${mainKey}-${hit.docsRelativeUrl}`}
                href={hit.docsRelativeUrl}
                tags={[hit.mainRepoTitle]}
                titleClassName="text-xl font-bold"
                padding={"4px"}
              >
                {hit.variableDescription}
              </Card>
            )}
            <Card
              title={hit.moduleFriendlyName}
              key={`${mainKey}-${hit.docsRelativeUrl}`}
              href={hit.docsRelativeUrl}
              tags={[hit.mainRepoTitle]}
              titleClassName="text-xl font-bold"
              padding={"4px"}
            ></Card>
          </div>
        )
      })}
    </div>
  ) : (
    <></>
  )
}

const SearchArea: React.FunctionComponent<PropsWithChildren<any>> = ({
  children,
}) => {
  const algoliaAppId: string = "7AWZHGNJE2"
  // This key is for search only. It is safe to check in.
  const algoliaSearchKey: string = "a976ea48057ceaa662656ec8f4f591af"

  const searchClient = algoliasearch(algoliaAppId, algoliaSearchKey, {})

  const [docsResults, setDocsResults] =
    React.useState<SearchResponse<MarkdownSection>>()

  // Results from the modules query
  const [modulesResults, setModulesResults] =
    React.useState<SearchResponse<unknown>>()

  // useEffect(() => {
  //   onSearch({ target: { value: "EKS" } } as React.ChangeEvent<HTMLInputElement>)
  // }, [])

  const onSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setDocsResults(undefined)
      setModulesResults(undefined)
      return
    }

    searchClient
      .multipleQueries([
        {
          indexName: "dev_docs_sourcer-docs",
          query: event.target.value,
          params: { hitsPerPage: 10 },
        },
        {
          indexName: "dev_docs_sourcer-modules",
          query: event.target.value,
          params: { hitsPerPage: 10 },
        },
      ])
      .then((res) => {
        console.log(res)

        setDocsResults(res.results[0] as SearchResponse<MarkdownSection>)
        setModulesResults(res.results[1])
      })
  }

  return (
    <div className="p-2 h-96 overflow-hidden">
      <input
        type="text"
        placeholder="Search..."
        // value={"EKS"}
        onChange={onSearch}
        className={styles.SearchInput}
      />

      <Tabs className="">
        <TabItem
          value="docs"
          label={`Docs ${docsResults ? `(${docsResults.nbHits})` : ""}`}
          default
          className="h-60 overflow-scroll"
        >
          <SearchResults
            className={styles.scrollableContent}
            results={docsResults}
          />
        </TabItem>
        <TabItem
          value="modules"
          label={`Modules ${
            modulesResults ? `(${modulesResults.nbHits})` : ""
          }`}
          className="h-60 overflow-scroll"
        >
          <SearchResultsModules
            className={styles.scrollableContent}
            results={modulesResults}
          />
        </TabItem>
        <TabItem value="services" label="Services">
          This is an orange 🍊
        </TabItem>
        <TabItem value="knowledge_base" label="KB">
          This is a banana 🍌
        </TabItem>
      </Tabs>
    </div>
  )
}

export const MyDocSearch: React.FunctionComponent<
  PropsWithChildren<MyDocSearchProps>
> = (props) => {
  console.log(`MyDocSearch: %o`, props)
  const [showModal, setShowModal] = React.useState(false)

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="rounded-3xl bg-slate-300 p-2 pr-3 flex flex-row items-center"
      >
        <svg width="20" height="20" className="mr-1" viewBox="0 0 20 20">
          <path
            d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
            stroke="currentColor"
            fill="none"
            fillRule="evenodd"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
          ></path>
        </svg>
        Search
      </button>
      <Modal
        showModal={showModal}
        shouldCloseOnEsc={true}
        shouldAcceptOnEnter={false}
        shouldCloseOnOverlayClick={true}
        handleCancelRequest={() => setShowModal(false)}
        handleAcceptRequest={() => setShowModal(false)}
        width={ModalWidth.LARGE}
        height={ModalHeight.LARGE}
      >
        <SearchArea />
      </Modal>
    </>
  )
}

export default MyDocSearch
