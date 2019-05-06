import React from "react"
import { graphql } from "gatsby"

import Layout from "components/layout"
import SupportButton from "components/SupportButton"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <div className="blog-post-container">
        <div className="blog-post">
          <div class="d-flex justify-content-between align-items-end mb-3">
            <div>
              <h1 class="mb-0"> {frontmatter.title} </h1>
            </div>
            <div>
              <SupportButton />
            </div>
          </div>
          <h2> {frontmatter.date} </h2>{" "}
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{
              __html: html,
            }}
          />
        </div>
      </div>
      <div class="mt-4 pt-2 pb-2 border-top border-bottom">
        <div class="d-block d-lg-flex justify-content-between py-3 py-lg-2">
          <div class="mb-2 mb-lg-0">
            <a
              class="d-block d-lg-inline text-muted ml-lg-2 mb-2 mb-lg-0"
              href=""
            >
              <span>
                <FontAwesomeIcon icon={faGithub} /> Edit this page on GitHub
              </span>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`
