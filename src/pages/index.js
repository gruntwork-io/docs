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
      <Link to="/introduction/what-is-gruntwork/">What is Gruntwork?</Link> to
      learn more about what we do.
    </p>

    <div className="row py-3">
      <div className="col-12 col-md-4 mb-3 mb-md-0">
        <div className="card shadow-sm">
          <div className="card-body">
            <h2>Deploying a Dockerized app on GKE</h2>
            <p className="mb-3">
              Learn how to launch a production-grade GKE cluster on GCP, then
              take a simple Dockerized Node.js app and deploy it using a Cloud
              Load Balancer.
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
      <div className="col-12 col-md-4 mb-3 mb-md-0">
        <div className="card shadow-sm">
          <div className="card-body">
            <h2>Deploying a Production Grade EKS Cluster</h2>
            <p className="mb-3">
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
