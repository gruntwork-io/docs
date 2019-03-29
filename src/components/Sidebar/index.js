import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Sidebar = () => (
  <div class="sidebar-left">
    <h3>Startups</h3>
    <ul>
      <li>Introduction</li>
      <li>Getting Started Guides</li>
      <li>Nulla volutpat aliquam velit
        <ul>
          <li>Phasellus iaculis neque</li>
          <li>Purus sodales ultricies</li>
          <li>Vestibulum laoreet porttitor sem</li>
          <li>Ac tristique libero volutpat at</li>
        </ul>
      </li>
      <li>Faucibus porta lacus fringilla vel</li>
    </ul>

    <h3>Modules</h3>
    <ul>
      <li>AWS
        <ul>
          <li>EKS</li>
          <li>RDS</li>
          <li>VPC</li>
        </ul>
      </li>
      <li>GCP
        <ul>
          <li>CloudSQL</li>
          <li>GKE</li>
          <li>Network</li>
        </ul>
      </li>
    </ul>
  </div>
)

export default Sidebar
