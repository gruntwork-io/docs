import React, { useState, useEffect } from "react"
import {
  SubscriptionNoticeModal,
  idOfNoticeLink,
} from "/src/components/Modal.tsx"

const gruntworkGithubOrg = "https://github.com/gruntwork-io/"

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
 * Checks if a link is referencing a known public repo
 *
 * @param string repoLink
 * @return {boolean}
 */
const isPublicGruntworkRepo = (repoLink) => {
  // Match a link prefixed by the gruntworkGithubOrg and capture the next path reference
  const pattern = new RegExp(`^${gruntworkGithubOrg}(.*?)(\/|$)`)
  // e.g for a given link https://github.com/gruntwork-io/docs/intro -> `docs`
  const repoName = repoLink.match(pattern)[1]

  // returns boolean
  return publicGruntworkRepoNames.includes(repoName)
}

export const DONT_SHOW_PRIVATE_GITHUB_WARNING_KEY = "dontWarnGitHubLinks"

function Root({ children }) {
  const [displaySubscriberNotice, setDisplaySubscriberNotice] = useState(false)
  const [externalLink, setExternalLink] = useState("")

  useEffect(() => {
    const listener = (event) => {
      if (event.target.id === idOfNoticeLink) {
        setDisplaySubscriberNotice(false)
        return
      }
      const dontWarn = window.localStorage.getItem(
        DONT_SHOW_PRIVATE_GITHUB_WARNING_KEY
      )

      if (dontWarn) {
        setDisplaySubscriberNotice(false)
        return
      }

      if (
        event.target.href &&
        event.target.href.startsWith(gruntworkGithubOrg) &&
        !isPublicGruntworkRepo(event.target.href)
      ) {
        event.preventDefault()
        setExternalLink(event.target.href)
        setDisplaySubscriberNotice(true)
      }
    }

    window.addEventListener("click", listener)

    // use-effect cleanup
    return () => window.removeEventListener("click", listener)
  }, [])

  return (
    <>
      <SubscriptionNoticeModal
        showModal={displaySubscriberNotice}
        externalLink={externalLink}
        handleCancelRequest={() => {
          setDisplaySubscriberNotice(false)
          setExternalLink("")
        }}
      />
      {children}
    </>
  )
}

export default Root
