import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Breadcrumbs = () => (
  <nav aria-label="breadcrumb" class="nav-breadcrumbs">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="#">IaC Library</a></li>
      <li class="breadcrumb-item"><a href="#">Guides</a></li>
      <li class="breadcrumb-item active" aria-current="page">Deploying a Node.JS App on ECS</li>
    </ol>
  </nav>
)

export default Breadcrumbs
