import React, { useEffect } from "react"
import ModalCmp from "react-modal"

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
      defaultStyles={{
        overlay: {
          ...ModalCmp.defaultStyles.overlay,
          zIndex: 999,
        },
      }}
    >
      <p>You need to be a subscriber to access this Gruntwork repository.</p>
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
    </ModalCmp>
  )
}
