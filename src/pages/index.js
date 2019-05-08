import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO
      title="Home"
      keywords={[`gruntwork`, `aws`, `gcp`, `terraform`, `docker`]}
    />

    <h1>Gruntwork Docs</h1>
    <p>
      Welcome to the Gruntwork documentation site. Here you will find guides and
      documentation that will get you started with our products. If it is your
      first time hearing about Gruntwork, check out{" "}
      <a href="/introduction/what-is-gruntwork/">What is Gruntwork?</a> to learn
      more about what we do.
    </p>

    <div class="row py-3">
      <div class="col-12 col-md-4 mb-3 mb-md-0">
        <div class="card shadow-sm">
          <div class="card-body">
            <h2>Deploying a Dockerized app on GKE</h2>
            <p class="mb-3">
              Learn how to deploy a production-grade GKE cluster on GCP and take
              a Node.js app, Dockerize it, and run it in production on the
              cluster.
            </p>
            <a
              class="weight-500 action-link"
              href="/guides/deploying-a-dockerized-app-on-gke/"
            >
              <span>Read more</span>
            </a>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4 mb-3 mb-md-0">
        <div class="card shadow-sm">
          <div class="card-body">
            <h2>Deploying a Production Grade EKS Cluster</h2>
            <p class="mb-3">
              Learn how to use Gruntwork modules to deploy and manage a
              production-grade EKS cluster. Includes: network topology, worker
              ASG pools, IAM roles and RBAC.
            </p>
            <Link
              to="/guides/deploying-a-production-grade-eks-cluster/"
              className="weight-500 action-link"
            >
              <span>Read more</span>
            </Link>
          </div>
        </div>
      </div>
    </div>

    <p>
      <em>
        Don't see what you are looking for? Check out{" "}
        <Link to="/support/">How do I get help?</Link>
      </em>
    </p>
  </Layout>
)

export default IndexPage
