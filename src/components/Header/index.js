import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Logo from "./logo.png"

import Icon from "../Icon"
import SearchIcon from "../../assets/glyphs/search.svg"

const Header = ({ siteTitle }) => (
  <>
    <header>
      <div class="navbar fixed-top bg-white flex-md-nowrap navbar-expand-lg justify-content-between p-2 border-bottom">
        <div class="d-lg-none">
          <a
            class="navbar-toggler mr-1"
            href=""
            data-id="headers-4-sidebar-toggle"
          >
            <img src="./assets/glyphs/burger.svg" />
          </a>
        </div>
        <div>
          <Link to="/" className="navbar-brand">
            <img src={Logo} alt="Gruntwork Docs" width="278" height="36" />
          </Link>
        </div>
        <div class="collapse navbar-collapse flex-grow-0 weight-500">
          <div class="navbar-nav">
            <div class="nav-item d-none d-lg-block">
              <a class="nav-link text-dark pr-0" href="">
                <Icon icon={SearchIcon} width={24} height={24} fill={"#333"} />
              </a>
            </div>
          </div>
        </div>
        <div class="d-lg-none ml-auto">
          <div class="nav-item">
            <a class="nav-link text-dark pr-0" href="">
              <Icon icon={SearchIcon} width={24} height={24} fill={"#000"} />
            </a>
          </div>
        </div>
      </div>
      <div
        class="navbar-side"
        id="headers-4-sidebar"
        data-id="headers-4-sidebar-close"
      >
        <div class="navbar-side-content d-flex flex-column justify-content-between">
          <div class="weight-700">
            <a
              class="navbar-side-close mb-4"
              href=""
              data-id="headers-4-sidebar-close"
            >
              <img src="./assets/glyphs/close.svg" width="32" />
            </a>
            <div class="navbar-nav">
              <div class="nav-item d-none d-lg-block">
                <a class="nav-link text-dark pr-0" href="">
                  <Icon
                    icon={SearchIcon}
                    width={24}
                    height={24}
                    fill={"#000"}
                  />
                </a>
              </div>
            </div>
          </div>
          <div>
            <p class="mb-3">
              <a class="transparent-invert-link" href="">
                <img src="./assets/glyphs/instagram-small.svg" width="16" />
              </a>
              <a class="transparent-invert-link ml-2" href="">
                <img src="./assets/glyphs/facebook-small.svg" width="16" />
              </a>
              <a class="transparent-invert-link ml-2" href="">
                <img src="./assets/glyphs/twitter-small.svg" width="16" />
              </a>
              <a class="transparent-invert-link ml-2" href="">
                <img src="./assets/glyphs/pinterest-small.svg" width="16" />
              </a>
              <a class="transparent-invert-link ml-2" href="">
                <img src="./assets/glyphs/thumbler-small.svg" width="16" />
              </a>
            </p>
            <p class="small mb-0">
              <span class="d-block d-xl-inline text-muted mb-1 mb-xl-0 mr-2">
                &copy; 2019 Acme. All right reserved.
              </span>
              <a class="text-muted mr-2" href="">
                <span>Privacy Policy</span>
              </a>
              <a class="text-muted" href="">
                <span>Terms of Service</span>
              </a>
            </p>
          </div>
        </div>
        <div class="navbar-side-content weight-700">
          <a
            class="navbar-side-close mb-4"
            href=""
            data-id="headers-4-sidebar-close"
          >
            <img src="./assets/glyphs/close.svg" width="32" />
          </a>
        </div>
      </div>
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
