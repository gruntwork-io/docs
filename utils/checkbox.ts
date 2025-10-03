export function interactivePersistentCheckboxes() {
  const LOCAL_STORAGE_KEY = "docusaurus.checkboxes"

  const getStorage = () => {
    try {
      return JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY) || "{}")
    } catch (e) {
      return {}
    }
  }

  const updateStorage = (key: string, value: boolean) => {
    const data = getStorage()
    data[key] = value
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
  }

  const initCheckboxes = () => {
    const checkboxes = document.querySelectorAll<HTMLInputElement>(
      ".contains-task-list > li input[type='checkbox']"
    )

    if (checkboxes.length === 0) {
      return
    }

    const data = getStorage()

    checkboxes.forEach((checkbox, index) => {
      const label =
        `${index}:${checkbox?.closest("li")?.textContent?.substring(0, 10)}` ||
        `checkbox-${index}`
      const key = `${window.location.pathname}:${label}`

      checkbox.disabled = false
      const checked = data[key] || false
      checkbox.checked = checked

      checkbox.addEventListener("click", (e) => {
        const target = e.target as HTMLInputElement
        updateStorage(key, target.checked)
      })
    })
  }

  const timeoutId = setTimeout(initCheckboxes, 100)

  // Cleanup
  return () => {
    clearTimeout(timeoutId)
  }
}
