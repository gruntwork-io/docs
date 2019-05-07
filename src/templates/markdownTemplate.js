import React from "react"
import { graphql } from "gatsby"

import Layout from "components/layout"
import SupportButton from "components/SupportButton"
import MarkdownPageFooter from "components/markdown-page-footer"

import moment from "moment"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <div className="blog-post-container">
        <div className="blog-post">
          <div class="d-flex justify-content-between align-items-end mb-1">
            <div>
              <h1 class="mb-0"> {frontmatter.title} </h1>
            </div>
            <div>
              <SupportButton />
            </div>
          </div>
          <h5 className="mt-0 mb-3">
            {markdownRemark.timeToRead} min read &middot; Last Updated{" "}
            {moment(frontmatter.date).fromNow()}
          </h5>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{
              __html: html,
            }}
          />
        </div>
      </div>
      <MarkdownPageFooter page={markdownRemark} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      html
      timeToRead
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
      ...MarkdownPageFooter
    }
  }
`
