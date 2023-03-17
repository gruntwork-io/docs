import React from "react"
import { Modal } from "./Modal"
import styles from "./Modal.module.css"

export const gruntworkGithubOrg = "https://github.com/gruntwork-io/"

/** @type {RegExp} Match a link prefixed by the gruntworkGithubOrg and capture the next path reference */
export const repoNamePattern = new RegExp(`^${gruntworkGithubOrg}(.*?)(\/|$)`)

interface SubscribersOnlyModalProps {
  externalLink: string
  localStorageKey: string
  subscriberType?: string
  showModal: boolean
  clearLink: () => void
}

export const SubscribersOnlyModal: React.FC<SubscribersOnlyModalProps> = ({
  externalLink,
  localStorageKey,
  subscriberType,
  showModal,
  clearLink,
}) => {
  const onRequestClose = (e) => {
    // If the user checked to never see this notice but subsequently cancels we will disregard their selection. We will
    // only stop showing this notice if they check the box and then proceed to GitHub
    if (window.localStorage.getItem(localStorageKey)) {
      window.localStorage.removeItem(localStorageKey)
    }

    clearLink()
    e.preventDefault() // prevent the browser from handling a Cancel button click and scrolling to top
  }

  const repoNameMatchArray: RegExpMatchArray | null =
    externalLink.match(repoNamePattern)

  if (!repoNameMatchArray) {
    return <></> // The link is not a Gruntwork Github repo link
  }

  const repoName = repoNameMatchArray[1]

  const setDontWarnMe = (event) => {
    event.stopPropagation()
    if (!window.localStorage.getItem(localStorageKey)) {
      window.localStorage.setItem(localStorageKey, "true")
    } else {
      window.localStorage.removeItem(localStorageKey)
    }
  }

  return (
    <Modal
      showModal={showModal}
      shouldCloseOnEsc={true}
      shouldAcceptOnEnter={false}
      shouldCloseOnOverlayClick={true}
      handleCancelRequest={clearLink}
      handleAcceptRequest={clearLink}
    >
      <h2>
        {subscriberType
          ? `For ${subscriberType} Subscribers Only`
          : "For Subscribers Only"}
      </h2>
      <p>
        This link leads to the private <code>{repoName}</code> repository
        visible only to {subscriberType && `${subscriberType} `}
        subscribers; everyone else will see a 404.
      </p>
      <div>
        <input type="checkbox" onClick={setDontWarnMe} />
        <label>Don't warn me again</label>
      </div>
      <div className={styles.buttonsContainer}>
        <a onClick={onRequestClose} href="#">
          Cancel
        </a>
        <a
          href={externalLink}
          target="_blank"
          data-modal-exempt={true}
          onClick={() => {
            setTimeout(clearLink, 500) // Wait .5seconds to allow propagation to external link before clearing the link from state
          }}
        >
          Continue to GitHub
        </a>
      </div>
    </Modal>
  )
}
