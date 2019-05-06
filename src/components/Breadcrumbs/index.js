import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Breadcrumbs = () => (
  <nav aria-label="breadcrumb" class="nav-breadcrumbs">
    <div class="border-top border-bottom">
      <div class="container-fluid">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a class="text-dark" href="#">
              IaC Library
            </a>
          </li>
          <li class="breadcrumb-item">
            <a class="text-dark" href="#">
              Guides
            </a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Deploying a Node.JS App on ECS
          </li>
        </ol>
      </div>
    </div>
  </nav>
)

export default Breadcrumbs
