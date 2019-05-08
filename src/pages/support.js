import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SupportPage = () => (
  <Layout>
    <SEO
      title="Home"
      keywords={[`gruntwork`, `aws`, `gcp`, `terraform`, `docker`]}
    />
    <h1>How do I get help?</h1>
    <p>
      Need help getting started with using Gruntwork? Check out the guides on
      the sidebar for topics that fit your need.
    </p>
    <p>
      If you don't find topics on anything you are looking for, try searching
      for your specific question on our community forum or contact us to inquire
      about getting support.
    </p>
    <p class="mb-3">
      If you are a subscriber, you can ask your question on any of the following
      channels available to you:
    </p>
    <ol class="custom-list">
      <li class="mb-2">
        <h3>
          Email <a href="mailto:support@gruntwork.io">support@gruntwork.io</a>
        </h3>
      </li>
      <li class="mb-2">
        <h3>
          <a href="https://community.gruntwork.io/">
            The Gruntwork Community Forum
          </a>
        </h3>
      </li>
      <li class="mb-2">
        <h3>The Gruntwork Community Slack Workspace </h3>
      </li>
      <li class="mb-2">
        <h3>
          Shared Slack Channel (Only available to subscribers of our Dedicated
          Support service)
        </h3>
      </li>
    </ol>
  </Layout>
)

export default SupportPage
