import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Logo from "./logo.png"
import BurgerIcon from "../../assets/glyphs/burger.svg"

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
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarToggler"
          aria-controls="navbarToggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <BurgerIcon className="hidden-lg" />
        </button>

        <div className="collapse navbar-collapse" id="navbarToggler">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/introduction/" className="nav-link">
                Introduction
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/guides/" className="nav-link">
                Guides
              </Link>
            </li>
          </ul>
        </div>
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
