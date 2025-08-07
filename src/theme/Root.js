/**
 * This file is the mechanism for adding stateful logic to a docusaurus
 * application since the <Root> component is rendered at the very top of the
 * React tree and never unmounts.
 * We swizzle(customize) the Root component by creating this file: Root.js
 * https://docusaurus.io/docs/swizzling#wrapper-your-site-with-root
 */

import React, { useState, useEffect } from "react"
import { useLocation } from "@docusaurus/router"
import { interactivePersistentCheckboxes } from "/utils/checkbox"
import { scrollToAnchorInClosedSection } from "/utils/anchor"
import { getRepos } from "/utils"
import {
  SubscribersOnlyModal,
  repoNamePattern,
  gruntworkGithubOrg,
} from "/src/components/SubscribersOnlyModal.tsx"

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
  "boilerplate",
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

const { awsCISRepos, enterpriseRepos } = getRepos()

/**
 * Checks if a given list of repo names includes a repo name extracted from a given url that matches the repoNamePattern
 *
 * @param {string[]} repoNames
 * @param {string} url
 * @return {boolean}
 */
const listIncludesRepo = (repoNames, url) => {
  if (!url) {
    return false
  }

  const repoMatchArray = url.match(repoNamePattern)
  if (!repoMatchArray) {
    return false
  }

  const repoName = repoMatchArray[1] // e.g for a given link https://github.com/gruntwork-io/docs/intro -> `docs`

  // returns boolean
  return repoNames.includes(repoName)
}

/**
 * Checks if a link references a known public Gruntwork repo
 *
 * @param {string} url
 * @return {boolean}
 */
const isPublicGruntworkRepo = (url) => {
  // returns boolean
  return listIncludesRepo(publicGruntworkRepoNames, url)
}

/**
 * Checks if a link references a private Gruntwork repo
 *
 * @param {string} url
 * @return {boolean}
 */
const isPrivateGruntworkRepo = (url) => {
  return (
    url && url.startsWith(gruntworkGithubOrg) && !isPublicGruntworkRepo(url)
  )
}

/**
 * Checks if a link references a Gruntwork CIS repo
 *
 * @param {string} url
 * @return {boolean}
 */
const isGruntworkCisRepo = (url) => {
  // awsCISRepos is an array of strings, e.g. `gruntwork-io/cis-docs`
  const cisRepoNames = awsCISRepos.map((repo) => repo.split("/")[1])
  return listIncludesRepo(cisRepoNames, url)
}

/**
 * Checks if a link references a Gruntwork Enterprise repo
 *
 * @param {string} url
 * @return {boolean}
 */
const isGruntworkEnterpriseRepo = (url) => {
  // enterpriseRepos is an array of strings, e.g. `gruntwork-io/enterprise-docs`
  const enterpriseRepoNames = enterpriseRepos.map((repo) => repo.split("/")[1])
  return listIncludesRepo(enterpriseRepoNames, url)
}

export const DONT_SHOW_PRIVATE_GITHUB_WARNING_KEY = "dontWarnGitHubLinks"
export const DONT_SHOW_CIS_GITHUB_WARNING_KEY = "dontWarnCISLinks"
export const DONT_SHOW_ENTERPRISE_GITHUB_WARNING_KEY = "dontWarnEnterpriseLinks"

function Root({ children }) {
  const [subscriberNoticeLink, setSubscriberNoticeLink] = useState("")
  const [cisNoticeLink, setCisNoticeLink] = useState("")
  const [enterpriseNoticeLink, setEnterpriseNoticeLink] = useState("")
  const location = useLocation()

  useEffect(() => {
    interactivePersistentCheckboxes()
  }, [location.pathname])

  useEffect(() => {
    scrollToAnchorInClosedSection(location)
  }, [location.hash])

  useEffect(function showModalForPrivateGithubLinks() {
    const listener = (event) => {
      // Sometimes our links wrap components, such as Cards. In these cases, the event
      // target is often a child element of the <a> we're attempting to extract the
      // href data from, and so we search for the closest parent <a>. In the event that
      // an <a> is clicked directly, that <a> itself will be returned.
      const targetLink = event?.target?.closest("a")

      if (!targetLink || !targetLink.href) {
        return
      }

      // Allow clicks on the external GitHub link FROM the modal notices to work normally
      if (targetLink.dataset.modalExempt) {
        return
      }

      if (isGruntworkCisRepo(targetLink.href)) {
        const dontWarn = window.localStorage.getItem(
          DONT_SHOW_CIS_GITHUB_WARNING_KEY
        )

        if (dontWarn) {
          return
        }

        event.preventDefault() // This prevents the link from opening & ensures the modal is displayed
        setCisNoticeLink(targetLink.href)
        return
      }

      if (isGruntworkEnterpriseRepo(targetLink.href)) {
        const dontWarn = window.localStorage.getItem(
          DONT_SHOW_ENTERPRISE_GITHUB_WARNING_KEY
        )

        if (dontWarn) {
          return
        }

        event.preventDefault() // This prevents the link from opening & ensures the modal is displayed
        setEnterpriseNoticeLink(targetLink.href)
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

        event.preventDefault() // This prevents the link from opening & ensures the modal is displayed
        setSubscriberNoticeLink(targetLink.href)
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
        showModal={!!subscriberNoticeLink}
        externalLink={subscriberNoticeLink}
        localStorageKey={DONT_SHOW_PRIVATE_GITHUB_WARNING_KEY}
        clearLink={() => setSubscriberNoticeLink("")}
      />
      <SubscribersOnlyModal
        showModal={!!cisNoticeLink}
        externalLink={cisNoticeLink}
        localStorageKey={DONT_SHOW_CIS_GITHUB_WARNING_KEY}
        subscriberType="CIS"
        clearLink={() => setCisNoticeLink("")}
      />
      <SubscribersOnlyModal
        showModal={!!enterpriseNoticeLink}
        externalLink={enterpriseNoticeLink}
        localStorageKey={DONT_SHOW_ENTERPRISE_GITHUB_WARNING_KEY}
        subscriberType="Enterprise"
        clearLink={() => setEnterpriseNoticeLink("")}
      />
      {children}
    </>
  )
}

export default Root
