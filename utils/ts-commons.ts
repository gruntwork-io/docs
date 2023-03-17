/**
 * Get repos from ts-commons package if available. Otherwise return empty arrays.
 *
 * ts-commons package is a private package so some users may not have access to
 * it. Use this function to safely pull in an optional package to avoid both
 * build-time and runtime errors.
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
  try {
    const { awsCISRepos, enterpriseRepos } = require("ts-commons/lib/repo-sets")
    return {
      awsCISRepos,
      enterpriseRepos,
    }
  } catch (e) {
    console.log("ts-commons package is NOT available...stubbing out repos.")

    return {
      awsCISRepos: [],
      enterpriseRepos: [],
    }
  }
}
