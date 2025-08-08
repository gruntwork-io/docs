export const scrollToAnchorInClosedSection = (location: Location) => {
  const hash = location.hash

  if (hash) {
    const id = decodeURIComponent(hash.slice(1))
    const element = document.getElementById(id)

    if (element) {
      const details = element.closest("details")
      if (details && !details.open) {
        const summary = details.querySelector("summary")
        if (summary) {
          summary.click()

          const timeoutId = setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth", block: "start" })
          }, 500) // 500ms to allow for browser to render the element

          return () => clearTimeout(timeoutId)
        }
      }
    }
  }
}
