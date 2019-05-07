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
              to="/for-startups/deploy-node-app-on-ecs/"
              className="nav-link text-dark"
            >
              Deploying a Node App on ECS
            </Link>
          </div>
        </div>
        <div class="nav-item">
          <a class="nav-link text-dark" href="">
            Startups
          </a>
        </div>
        <div class="navbar-nav pl-2 small weight-500">
          <div class="nav-item">
            <a class="nav-link text-dark" href="">
              Introduction
            </a>
          </div>
          <div class="nav-item">
            <a class="nav-link text-dark" href="">
              Overview
            </a>
          </div>
          <div class="nav-item">
            <a class="nav-link text-dark" href="">
              Contents
            </a>
          </div>
        </div>
        <div class="nav-item">
          <a class="nav-link text-dark" href="">
            Modules
          </a>
        </div>
        <div class="navbar-nav pl-2 small weight-500">
          <div class="nav-item">
            <a class="nav-link text-dark" href="">
              GKE
            </a>
          </div>
          <div class="nav-item">
            <a class="nav-link text-dark" href="">
              VPC
            </a>
          </div>
        </div>
      </div>

      <div class="border-bottom mt-3 mb-4 d-md-none" />
    </div>
  </>
)

export default Sidebar
