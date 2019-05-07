import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Sidebar = () => (
  <>
    <div class="col-md-2 d-none d-md-block sidebar bg-light">
      <div class="navbar-nav weight-500">
        <div class="nav-item">
          <a class="nav-link text-dark" href="">
            Introduction
          </a>
        </div>
        <div class="navbar-nav pl-2 small weight-500">
          <div class="nav-item">
            <Link to="/intro/what-is-gruntwork/" className="nav-link text-dark">
              What is Gruntwork?
            </Link>
          </div>
          <div class="nav-item">
            <Link
              to="/intro/what-is-an-iac-library/"
              className="nav-link text-dark"
            >
              What is an IaC Library?
            </Link>
          </div>
          <div class="nav-item">
            <a
              href="https://github.com/gruntwork-io/toc#a-table-of-contents-for-all-gruntwork-code"
              className="nav-link text-dark"
            >
              Library Catalog
            </a>
          </div>
        </div>
        <div class="nav-item">
          <a class="nav-link text-dark" href="">
            Guides
          </a>
        </div>
        <div class="navbar-nav pl-2 small weight-500">
          <div class="nav-item">
            <Link
              to="/guides/deploying-a-dockerized-app-on-gke/"
              className="nav-link text-dark"
            >
              Deploying a Dockerized App on GCP/GKE
            </Link>
          </div>
          <div class="nav-item">
            <Link
              to="/guides/deploying-a-dockerized-app-on-eks/"
              className="nav-link text-dark"
            >
              Deploying a Dockerized App on EKS
            </Link>
          </div>
          <div class="nav-item">
            <Link
              to="/guides/deploying-a-dockerized-app-on-ecs-with-ref-arch/"
              className="nav-link text-dark"
            >
              Deploying a Dockerized App on ECS with Gruntwork Reference
              Architecture
            </Link>
          </div>
        </div>
        <div class="nav-item">
          <Link to="/support/" class="nav-link text-dark">
            Support
          </Link>
        </div>
      </div>

      <div class="border-bottom mt-3 mb-4 d-md-none" />
    </div>
  </>
)

export default Sidebar
