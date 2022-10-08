import React from "react"
import { Modal } from "./Modal"
import styles from "./Modal.module.css"

interface SubscribersOnlyModalProps {
  externalLink: string
  localStorageKey: string
  subscriberType?: string
  showModal: boolean
  handleCancelRequest: () => void
  handleAcceptRequest?: () => void
}

export const SubscribersOnlyModal: React.FC<SubscribersOnlyModalProps> = ({
  externalLink,
  localStorageKey,
  subscriberType,
  showModal,
  handleCancelRequest,
  handleAcceptRequest,
}) => {
  const onRequestClose = (e) => {
    // If the user checked to never see this notice but subsequently cancels we will disregard their selection. We will
    // only stop showing this notice if they check the box and then proceed to GitHub
    if (window.localStorage.getItem(localStorageKey)) {
      window.localStorage.removeItem(localStorageKey)
    }

    handleCancelRequest()

    // prevent the browser from handling a Cancel button click and scrolling to top
    e.preventDefault()
  }

  const gitHubRepoName = externalLink.match(
    /https:\/\/github.com\/gruntwork-io\/([^/]*)/
  )

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
      handleCancelRequest={handleCancelRequest}
      handleAcceptRequest={handleAcceptRequest}
    >
      <h2>
        {subscriberType
          ? `For ${subscriberType} Subscribers Only`
          : "For Subscribers Only"}
      </h2>
      <p>
        This link leads to the private{" "}
        {gitHubRepoName && gitHubRepoName.length >= 1 && (
          <code>{gitHubRepoName[1]}</code>
        )}{" "}
        repository visible only to subscribers; everyone else will see a 404.
      </p>
      <div>
        <input type="checkbox" onClick={setDontWarnMe} />
        <label>Don't warn me again</label>
      </div>
      <div className={styles.buttonsContainer}>
        <a onClick={(e) => onRequestClose(e)} href="#">
          Cancel
        </a>
        <a
          href={externalLink}
          target="_blank"
          data-modal-exempt={true}
          onClick={() => {
            handleAcceptRequest()
          }}
        >
          Continue to GitHub
        </a>
      </div>
    </Modal>
  )
}
