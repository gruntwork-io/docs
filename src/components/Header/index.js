import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Logo from "./logo.png"

const Header = ({ siteTitle }) => (
  <>
    <header>
      <nav className="navbar fixed-top bg-white navbar-expand-lg border-bottom">
        <Link to="/" className="ml-3 navbar-brand">
          <img
            src={Logo}
            alt="Gruntwork Docs"
            className="d-inline-block align-top"
            width="278"
            height="36"
          />
        </Link>
      </nav>
    </header>
  </>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
