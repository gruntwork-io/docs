/**
 * Check if ts-commons package is available. This is a private package so some
 * users may not have access to it. Use this function to check if it is
 * available before usage to avoid errors.
 *
 * @return {*}  {Boolean}
 */
const isTSCommonsAvailable = (): Boolean => {
  try {
    require("ts-commons")
    return true
  } catch (e) {
    return false
  }
}

/**
 * Get repos from ts-commons package if available. Otherwise return empty arrays.
 *
 * @return {*}  {{
 *   awsCISRepos: string[]
 *   enterpriseRepos: string[]
 * }}
 */
export const getRepos = (): {
  awsCISRepos: string[]
  enterpriseRepos: string[]
} => {
  if (isTSCommonsAvailable()) {
    const { awsCISRepos, enterpriseRepos } = require("ts-commons/lib/repo-sets")
    return {
      awsCISRepos,
      enterpriseRepos,
    }
  }

  return {
    awsCISRepos: [],
    enterpriseRepos: [],
  }
}
