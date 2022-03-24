import React, { useEffect } from "react"
import ModalCmp from "react-modal"
import styles from "./Modal.module.css"

interface ModalProps {
  showModal: boolean
  children: React.ReactNode
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

export const Modal: React.FC<ModalProps> = ({
  showModal,
  shouldCloseOnEsc = true,
  shouldAcceptOnEnter = false,
  shouldCloseOnOverlayClick = true,
  handleCancelRequest,
  handleAcceptRequest,
  children,
}) => {
  const onRequestClose = (e) => {
    handleCancelRequest()
    // prevent the browser from handling a Cancel button click and scrolling to top
    e.preventDefault()
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
      closeTimeoutMS={0}
      className={styles.mainContainer}
      overlayClassName={styles.overlay}
    >
      {children}
    </ModalCmp>
  )
}
