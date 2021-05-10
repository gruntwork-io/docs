/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-analytics"

import Header from "./Header"
import Sidebar from "./Sidebar"

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
        <div class="container-fluid">
          <div class="row">
            <Sidebar />
            <div class="col-md-9 ml-sm-auto col-lg-10 px-2 content">
              <main>{children}</main>
              <footer>
                <div class="row mt-4 pb-3">
                  <div class="col-12 text-center small">
                    <span class="text-muted mr-1">
                      &copy; {new Date().getFullYear()},{` `}
                      <OutboundLink href="https://www.gruntwork.io">
                        Gruntwork Inc.
                      </OutboundLink>
                    </span>
                  </div>
                </div>
              </footer>
            </div>
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
