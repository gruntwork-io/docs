import { Link } from "gatsby"
import React from "react"

const Sidebar = () => (
  <>
    <div className="col-md-2 d-none d-md-block sidebar bg-light">
      <div className="navbar-nav weight-500">
        <div className="nav-item">
          <div className="nav-item">Introduction</div>
        </div>
        <div className="navbar-nav pl-2 small weight-500">
          <div className="nav-item">
            <Link
              to="/introduction/what-is-gruntwork/"
              className="nav-link text-dark"
            >
              What is Gruntwork?
            </Link>
          </div>
          <div className="nav-item">
            <Link
              to="/introduction/library-catalog/"
              className="nav-link text-dark"
            >
              Library Catalog
            </Link>
          </div>
        </div>
        <div className="nav-item">Guides</div>
        <div className="navbar-nav pl-2 small weight-500">
          <div className="nav-item">
            <Link
              to="/guides/deploying-a-dockerized-app-on-gke/"
              className="nav-link text-dark"
            >
              Deploying a Dockerized App on GCP/GKE
            </Link>
          </div>
          <div className="nav-item">
            <Link
              to="/guides/deploying-a-production-grade-eks-cluster/"
              className="nav-link text-dark"
            >
              Deploying a Production Grade EKS Cluster
            </Link>
          </div>
          <div className="nav-item">
            <Link
              to="/guides/deploying-a-dockerized-app-on-ecs-with-ref-arch/"
              className="nav-link text-dark"
            >
              Deploying a Dockerized App on ECS with Gruntwork Reference
              Architecture
            </Link>
          </div>
        </div>
        <div className="nav-item">
          <Link
            to="/support/"
            className="nav-link text-dark"
            activeClassName="nav-link active"
          >
            How do I get help?
          </Link>
        </div>
      </div>

      <div className="border-bottom mt-3 mb-4 d-md-none" />
    </div>
  </>
)

export default Sidebar
