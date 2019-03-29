import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Logo from './logo.png';

const Header = ({ siteTitle }) => (

  <header>
      <nav class="navbar navbar-expand-md pl-5">
        <Link to="/" className="navbar-brand"><img src={Logo} alt="Gruntwork Docs" width="278" height="36" /></Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </nav>
    </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
