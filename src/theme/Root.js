import React, { useState, useEffect } from "react"
import {
  SusbscriptionNoticeModal,
  idOfNoticeLink,
} from "/src/components/Modal.tsx"

const gruntworkRepos = "https://github.com/gruntwork-io"

function Root({ children }) {
  const [displaySubscriberNotice, setDisplaySubscriberNotice] = useState(false)
  const [externalLink, setExternalLink] = useState("")

  useEffect(() => {
    const listener = (event) => {
      console.log("Route------->", event.target.id)
      if (event.target.id === idOfNoticeLink) {
        setDisplaySubscriberNotice(false)
        return
      }

      if (event.target.href && event.target.href.includes(gruntworkRepos)) {
        event.preventDefault()
        console.log
        setExternalLink(event.target.href)
        setDisplaySubscriberNotice(true)
      }
    }

    window.addEventListener("click", listener)

    // use-effect cleanup
    return () => window.removeEventListener("click", listener)
  }, [])

  return (
    <>
      <SusbscriptionNoticeModal
        showModal={displaySubscriberNotice}
        externalLink={externalLink}
      />
      {children}
    </>
  )
}

export default Root
