/* eslint-disable react/forbid-prop-types */
import React from "react"
import { any, string } from "prop-types"
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faMediumM,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons"
import { faBars } from "@fortawesome/free-solid-svg-icons"

// By setting things up like this react-fontawesome knows of the icons
// I am also only using these icons from the libraries so less overhead.
library.add(
  faGithub,
  faInstagram,
  faLinkedin,
  faMediumM,
  faTwitter,
  faYoutube,
  faBars
)

const SiteIcon = ({ nav, icon, size }) => (
  <FontAwesomeIcon icon={icon} size={size} />
)

SiteIcon.propTypes = {
  nav: string,
  icon: any,
  size: string,
}

export default SiteIcon
