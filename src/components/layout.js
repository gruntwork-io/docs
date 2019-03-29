/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Header from "./Header"
import Breadcrumbs from "./Breadcrumbs"
import Sidebar from "./Sidebar"
//import "./layout.css"

import 'modern-normalize/modern-normalize.css'
//import 'prismjs/themes/prism.css'
import 'prismjs/themes/prism-solarizedlight.css'
import 'scss/gatstrap.scss'
//import 'animate.css/animate.css'
import 'font-awesome/css/font-awesome.css'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <Breadcrumbs />
        <div class="row">
          <div class="col-md-3"><Sidebar /></div>
          <div class="col-md-9">
            <main>{children}</main>
            <footer>
              © {new Date().getFullYear()}, Built with
              {` `}
              <a href="https://www.gatsbyjs.org">Gatsby</a>
            </footer>
          </div>
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
