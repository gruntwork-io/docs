import React, { useEffect } from "react"
import ModalCmp from "react-modal"
import { DONT_SHOW_PRIVATE_GITHUB_WARNING_KEY } from "../theme/Root"
import styles from "./Modal.module.css"

interface ModalProps {
  externalLink: string
  showModal: boolean
  children?: React.ReactNode
  shouldCloseOnEsc?: boolean
  shouldAcceptOnEnter?: boolean
  shouldCloseOnOverlayClick?: boolean
  handleCancelRequest: () => void
  handleAcceptRequest?: () => void
}

export const idOfNoticeLink = "notice"

if (typeof window !== "undefined") {
  ModalCmp.setAppElement("body")
}

export const SubscriptionNoticeModal: React.FC<ModalProps> = ({
  externalLink,
  showModal,
  shouldCloseOnEsc = true,
  shouldAcceptOnEnter = false,
  shouldCloseOnOverlayClick = true,
  handleCancelRequest,
  handleAcceptRequest,
}) => {
  const onRequestClose = (e) => {
    // If the user checked to never see this notice but subsequently cancels we will disregard their selection. We will
    // only stop showing this notice if they check the box and then proceed to GitHub
    if (window.localStorage.getItem(DONT_SHOW_PRIVATE_GITHUB_WARNING_KEY)) {
      window.localStorage.removeItem(DONT_SHOW_PRIVATE_GITHUB_WARNING_KEY)
    }

    handleCancelRequest()

    // prevent the browser from handling a Cancel button click and scrolling to top
    e.preventDefault()
  }

  const gitHubRepoName = externalLink.match(
    /https:\/\/github.com\/gruntwork-io\/(.*?)\/.*/
  )

  // function to check if there's any active button (focus on the button) to avoid conflicts with shouldAcceptOnEnter property
  const checkIfAnyActiveButton = () => {
    const activeElement = document.activeElement
    if (activeElement && activeElement.tagName.toLowerCase() === "button") {
      return true
    }
    return false
  }

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden"
    }
    const timer = setTimeout(() => {
      if (!showModal) {
        document.body.style.overflow = "unset"
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [showModal])

  useEffect(() => {
    const listener = (e: any) => {
      const code = e.key
      if (
        code === "Enter" &&
        handleAcceptRequest &&
        shouldAcceptOnEnter &&
        showModal &&
        !checkIfAnyActiveButton()
      ) {
        e.preventDefault()
        handleAcceptRequest()
      }
    }
    document.addEventListener("keydown", listener, false)
    return () => {
      document.removeEventListener("keydown", listener, false)
    }
  })

  const setDontWarnMe = (event) => {
    event.stopPropagation()
    if (!window.localStorage.getItem(DONT_SHOW_PRIVATE_GITHUB_WARNING_KEY)) {
      window.localStorage.setItem(DONT_SHOW_PRIVATE_GITHUB_WARNING_KEY, "true")
    } else {
      window.localStorage.removeItem(DONT_SHOW_PRIVATE_GITHUB_WARNING_KEY)
    }
  }

  return (
    <ModalCmp
      isOpen={showModal}
      preventScroll={true}
      onRequestClose={onRequestClose}
      shouldCloseOnEsc={shouldCloseOnEsc}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      closeTimeoutMS={0}
      className={styles.mainContainer}
      overlayClassName={styles.overlay}
    >
      <h2>For Subscribers Only</h2>
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
        <a id={idOfNoticeLink} href={externalLink} target="_blank">
          Continue to GitHub
        </a>
      </div>
    </ModalCmp>
  )
}
