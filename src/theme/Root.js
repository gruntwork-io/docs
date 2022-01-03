import React, { useState, useEffect } from "react"
import {
  SubscriptionNoticeModal,
  idOfNoticeLink,
} from "/src/components/Modal.tsx"

const gruntworkRepos = "https://github.com/gruntwork-io"

function Root({ children }) {
  const [displaySubscriberNotice, setDisplaySubscriberNotice] = useState(false)
  const [externalLink, setExternalLink] = useState("")

  useEffect(() => {
    const listener = (event) => {
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
      <SubscriptionNoticeModal
        showModal={displaySubscriberNotice}
        externalLink={externalLink}
        handleCancelRequest={() => {
          setDisplaySubscriberNotice(false)
          setExternalLink("")
        }}
      />
      {children}
    </>
  )
}

export default Root
