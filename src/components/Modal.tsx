import React, { ReactElement, useEffect } from "react"
import ModalCmp from "react-modal"

import styles from "./Modal.module.css"

interface ModalProps {
  externalLink: string
  showModal: boolean
  children?: React.ReactNode
  disclaimer?: string | ReactElement
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

// const modalDefaultstyle =
//   "outline-none absolute top-1/2 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 md:-mr-50%  md:right-auto bg-white rounded-md shadow-xl px-8 py-15 mt-4 md:ml-0 md:mr-0 sm:px-24 w-auto md:w-564px w-full-mx-5 overflow-y-auto max-h-full"

export const SusbscriptionNoticeModal: React.FC<ModalProps> = ({
  externalLink,
  showModal,
  disclaimer,
  shouldCloseOnEsc = false,
  shouldAcceptOnEnter = false,
  shouldCloseOnOverlayClick = false,
  handleCancelRequest,
  handleAcceptRequest,
}) => {
  const onRequestClose = () => {
    handleCancelRequest()
  }

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

  return (
    <ModalCmp
      isOpen={showModal}
      preventScroll={true}
      onRequestClose={onRequestClose}
      shouldCloseOnEsc={shouldCloseOnEsc}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      closeTimeoutMS={200}
      className={styles.subscription_notice}
    >
      <p
        className="mb-3 font-bold text-2xl text-gw-gray-800"
        data-cy="modal-title"
      >
        You need to be a subscriber to access this Gruntwork repository.
      </p>
      <p>
        <a id={idOfNoticeLink} href={externalLink} target="_blank">
          Continue to Link
        </a>
      </p>
      <p>
        <a onClick={() => onRequestClose()} href="#">
          Dismiss
        </a>
      </p>
      {disclaimer && (
        <div className="mt-1.5">
          <p className="text-center text-gw-gray-600 text-sm">{disclaimer}</p>
        </div>
      )}
    </ModalCmp>
  )
}
