import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faServer } from "@fortawesome/free-solid-svg-icons"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Gruntwork Docs</h1>
    <p>
      Welcome to the Gruntwork documentation site. Here you'll find guides and
      documentation that will get you started with our products.
    </p>

    <h2>What is Gruntwork?</h2>
    <p>TODO - explain Gruntwork. Assuming the user has first landed here.</p>

    <h2>Get Started</h2>
    <p>Let's dive right in!</p>

    <p>TODO - explain what the user will find on this website.</p>

    <div class="row py-3">
      <div class="col-12 col-md-4 mb-3 mb-md-0">
        <div class="card shadow-sm">
          <div class="card-body">
            <h2>EKS vs GKE: An in-depth comparison</h2>
            <p class="mb-3">
              Harmonious colour themes have built up as the collection has
              evolved.
            </p>
            <a class="weight-500 action-link" href="">
              <span>Read more</span>
            </a>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4 mb-3 mb-md-0">
        <div class="card shadow-sm">
          <div class="card-body">
            <h2>Deploying a Dockerized App on GCP/GKE</h2>
            <p class="mb-3">
              Harmonious colour themes have built up as the collection has
              evolved.
            </p>
            <Link
              to="/guides/deploying-a-dockerized-app-on-gke/"
              className="weight-500 action-link"
            >
              <span>Read more</span>
            </Link>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h2>Running Software on GKE</h2>
            <p class="mb-3">
              Harmonious colour themes have built up as the collection has
              evolved.
            </p>
            <a class="weight-500 action-link" href="">
              <span>Read more</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </Layout>
)

export default IndexPage
