import React from "react"

const Page = ({ data }) => (
  <div dangerouslySetInnerHTML={{ __html: data.html }} />
)
export default Page
