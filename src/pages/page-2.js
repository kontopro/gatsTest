import React from "react"
import { Link,graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = ({data}) => (
  <Layout>
    <SEO title="Page two" />
    <p>{data.allPost.edges[0].node.day}</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export const query = graphql`
query Page2Query  {
  allPost {
    edges {
      node {
        title,
        day
        
        }
    }
  }
}
`
export default SecondPage
