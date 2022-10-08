import React, { useState, useEffect } from "react"
import { SubscribersOnlyModal } from "/src/components/SubscribersOnlyModal.tsx"

const gruntworkGithubOrg = "https://github.com/gruntwork-io/"

const gruntworkCisRepoName = "terraform-aws-cis-service-catalog"

const publicGruntworkRepoNames = [
  "bash-commons",
  "cloud-nuke",
  "docs",
  "fetch",
  "fetch-test-public",
  "git-xargs",
  "go-commons",
  "gruntwork-installer",
  "gruntwork-io.github.io",
  "health-checker",
  "helm-kubernetes-services",
  "helm-charts",
  "infrastructure-as-code-testing-talk",
  "infrastructure-as-code-training",
  "intro-to-terraform",
  "kafka-health-check",
  "knowledge-base",
  "kubergrunt",
  "microframework",
  "module-ci-update-terraform-variable-test",
  "pre-commit",
  "private-tls-cert",
  "sample-app-docker",
  "sfdc-related-files-lightning",
  "terraform",
  "terraform-aws-couchbase",
  "terraform-aws-utilities",
  "terraform-google-ci",
  "terraform-google-gke",
  "terraform-google-load-balancer",
  "terraform-google-network",
  "terraform-google-sql",
  "terraform-google-static-assets",
  "terraform-hiera-like-example",
  "terraform-kubernetes-helm",
  "terraform-kubernetes-namespace",
  "terraform-module-in-root-for-terragrunt-test",
  "terraform-training-solutions",
  "terragrunt",
  "terragrunt-infrastructure-live-example",
  "terragrunt-infrastructure-modules-example",
  "terratest",
  "terratest-helm-testing-example",
  "toc",
  "website-comments",
]

/**
 * Checks if a link references a known public Gruntwork repo
 *
 * @param string url
 * @return {boolean}
 */
const isPublicGruntworkRepo = (url) => {
  if (!url) {
    return false
  }
  // Match a link prefixed by the gruntworkGithubOrg and capture the next path reference
  const pattern = new RegExp(`^${gruntworkGithubOrg}(.*?)(\/|$)`)
  // e.g for a given link https://github.com/gruntwork-io/docs/intro -> `docs`
  const repoName = url.match(pattern)[1]

  // returns boolean
  return publicGruntworkRepoNames.includes(repoName)
}

/**
 * Checks if a link references a private Gruntwork repo
 *
 * @param string url
 * @return {boolean}
 */
const isPrivateGruntworkRepo = (url) => {
  return (
    url && url.startsWith(gruntworkGithubOrg) && !isPublicGruntworkRepo(url)
  )
}

/**
 * Checks if a link references the Gruntwork CIS service catalog repo
 *
 * @param string url
 * @return {boolean}
 */

const isGruntworkCisRepo = (url) => {
  return url && url.startsWith(`${gruntworkGithubOrg}${gruntworkCisRepoName}`)
}

export const DONT_SHOW_PRIVATE_GITHUB_WARNING_KEY = "dontWarnGitHubLinks"
export const DONT_SHOW_CIS_GITHUB_WARNING_KEY = "dontWarnCISLinks"

function Root({ children }) {
  const [displaySubscriberNotice, setDisplaySubscriberNotice] = useState(false)
  const [subscriberNoticeLink, setSubscriberNoticeLink] = useState("")

  const [displayCisNotice, setDisplayCisNotice] = useState(false)
  const [cisNoticeLink, setCisNoticeLink] = useState("")

  useEffect(() => {
    const listener = (event) => {
      // Sometimes our links wrap components, such as Cards. In these cases, the event
      // target is often a child element of the <a> we're attempting to extract the
      // href data from, and so we search for the closest parent <a>. In the event that
      // an <a> is clicked directly, that <a> itself will be returned.
      const targetLink = event.target.closest("a")

      // Allow clicks on the external GitHub link FROM the modal notices to work normally
      if (targetLink.dataset.modalExempt) {
        return
      }

      if (isGruntworkCisRepo(targetLink.href)) {
        const dontWarn = window.localStorage.getItem(
          DONT_SHOW_CIS_GITHUB_WARNING_KEY
        )

        if (dontWarn) {
          setDisplayCisNotice(false)
          return
        }

        event.preventDefault()
        setCisNoticeLink(targetLink.href)
        setDisplayCisNotice(true)
        return
      }

      if (isPrivateGruntworkRepo(targetLink.href)) {
        const dontWarn = window.localStorage.getItem(
          DONT_SHOW_PRIVATE_GITHUB_WARNING_KEY
        )

        if (dontWarn) {
          setDisplaySubscriberNotice(false)
          return
        }

        event.preventDefault()
        setSubscriberNoticeLink(targetLink.href)
        setDisplaySubscriberNotice(true)
        return
      }
    }

    window.addEventListener("click", listener)

    // use-effect cleanup
    return () => window.removeEventListener("click", listener)
  }, [])

  return (
    <>
      <SubscribersOnlyModal
        showModal={displaySubscriberNotice}
        externalLink={subscriberNoticeLink}
        localStorageKey={DONT_SHOW_PRIVATE_GITHUB_WARNING_KEY}
        handleCancelRequest={() => {
          setDisplaySubscriberNotice(false)
          setSubscriberNoticeLink("")
        }}
        handleAcceptRequest={() => {
          setDisplaySubscriberNotice(false)
        }}
      />
      <SubscribersOnlyModal
        showModal={displayCisNotice}
        externalLink={cisNoticeLink}
        localStorageKey={DONT_SHOW_CIS_GITHUB_WARNING_KEY}
        subscriberType="CIS"
        handleCancelRequest={() => {
          setDisplayCisNotice(false)
          setCisNoticeLink("")
        }}
        handleAcceptRequest={() => {
          setDisplayCisNotice(false)
        }}
      />
      {children}
    </>
  )
}

export default Root
