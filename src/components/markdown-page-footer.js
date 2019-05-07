import React from "react"
import { graphql } from "gatsby"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

export default class MarkdownPageFooter extends React.Component {
  constructor() {
    super()
    this.state = { feedbackSubmitted: false }
  }
  render() {
    return (
      <>
        <div class="mt-4 pt-2 pb-2 border-top border-bottom">
          <div class="d-block d-lg-flex justify-content-between py-3 py-lg-2">
            <div class="mb-2 mb-lg-0">
              <a
                class="d-block d-lg-inline text-muted ml-lg-2 mb-2 mb-lg-0"
                href={`https://github.com/gruntwork-io/docs/blob/nextgen/content/${
                  this.props.page ? this.props.page.parent.relativePath : ``
                }`}
              >
                <span>
                  <FontAwesomeIcon icon={faGithub} /> Edit this page on GitHub
                </span>
              </a>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export const fragment = graphql`
  fragment MarkdownPageFooter on MarkdownRemark {
    parent {
      ... on File {
        relativePath
      }
    }
  }
`
