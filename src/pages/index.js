import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
//import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({data}) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>source firebase ok</h1>
    <p>NEXT: try to add pages from posts with createPages</p>   
    {data.allPost.edges.map(
      ({node}) => 
        <div key={node.id}>
          <Link to={`/${node.slug}-${node.id}`}>  {`${node.title}`}</Link> {`: ψωλο`}
        </div>
        )
      }
      <div>
        <Link to="/app/">Go to app</Link>
      </div>
  </Layout>
)

export const query = graphql`
query HomeQuery  {
  allPost (
    sort: {fields: [id]
    order: DESC
    }
  ) {
    edges {
      node {
        id,
        title,
        day,
        slug        
        }
    }
  }
}`

export default IndexPage
