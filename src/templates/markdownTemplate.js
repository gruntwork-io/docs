import React from "react"
import { graphql } from "gatsby"

import Layout from "components/layout"
import SEO from "components/seo"
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
      <SEO title={frontmatter.title} keywords={frontmatter.keywords} />
      <div className="post-container">
        <div className="post">
          <div class="row">
            <div class="col-12 col-md-10">
              <h1 class="mb-0"> {frontmatter.title} </h1>
            </div>
            <div class="col-6 col-md-2 py-2 py-sm-0 text-md-right">
              <SupportButton />
            </div>
          </div>
          <h5 className="mt-0 mb-3">
            {markdownRemark.timeToRead} min read &middot; Last Updated{" "}
            {moment(frontmatter.date, "MMMM DD, YYYY").fromNow()}
          </h5>
          <div
            className="post-content"
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
        origin
        title
      }
      ...MarkdownPageFooter
    }
  }
`
