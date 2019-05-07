import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SupportPage = () => (
  <Layout>
    <SEO
      title="Support"
      keywords={[`gruntwork`, `aws`, `gcp`, `terraform`, `docker`]}
    />
    <h1>Gruntwork Support</h1>
    <p>Here you can get help on Gruntwork products.</p>

    <h2>Pro Support</h2>
    <p>TODO - explain the Gruntwork support offerings.</p>
  </Layout>
)

export default SupportPage
