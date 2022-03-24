import React from "react"
import { Modal } from "./Modal"
import { DONT_SHOW_CIS_GITHUB_WARNING_KEY } from "../theme/Root"
import styles from "./Modal.module.css"

interface CISOnlyModalProps {
  externalLink: string
  showModal: boolean
  handleCancelRequest: () => void
  handleAcceptRequest?: () => void
}

export const CISOnlyModal: React.FC<CISOnlyModalProps> = ({
  externalLink,
  showModal,
  handleCancelRequest,
  handleAcceptRequest,
}) => {
  const onRequestClose = (e) => {
    // If the user checked to never see this notice but subsequently cancels we will disregard their selection. We will
    // only stop showing this notice if they check the box and then proceed to GitHub
    if (window.localStorage.getItem(DONT_SHOW_CIS_GITHUB_WARNING_KEY)) {
      window.localStorage.removeItem(DONT_SHOW_CIS_GITHUB_WARNING_KEY)
    }

    handleCancelRequest()

    // prevent the browser from handling a Cancel button click and scrolling to top
    e.preventDefault()
  }

  const gitHubRepoName = externalLink.match(
    /https:\/\/github.com\/gruntwork-io\/(.*?)\/.*/
  )

  const setDontWarnMe = (event) => {
    console.log(`CIS DONT WARN KEY: ${DONT_SHOW_CIS_GITHUB_WARNING_KEY}`)
    event.stopPropagation()
    if (!window.localStorage.getItem(DONT_SHOW_CIS_GITHUB_WARNING_KEY)) {
      window.localStorage.setItem(DONT_SHOW_CIS_GITHUB_WARNING_KEY, "true")
    } else {
      window.localStorage.removeItem(DONT_SHOW_CIS_GITHUB_WARNING_KEY)
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
      <h2>For CIS Subscribers Only</h2>
      <p>
        This link leads to the private{" "}
        {gitHubRepoName && gitHubRepoName.length >= 1 && (
          <code>{gitHubRepoName[1]}</code>
        )}{" "}
        repository visible only to CIS subscribers; everyone else will see a
        404.
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
          data-local-storage-key={DONT_SHOW_CIS_GITHUB_WARNING_KEY}
          className="data-modal-exempt"
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
