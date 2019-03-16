import React from "react"
import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql, Link} from 'gatsby'

const Post = ({data, pageContext}) => {  
  const post = {...data.allPost.edges[0].node}
  return (
    <Layout>
      <SEO title={`${post.title}`} keywords={['post', 'blog']} />
      <article className="post-page">
        <div className="post-title">
          <h1>{post.title}</h1>          
        </div>
        <div className="post-intro">
          <i>{post.introduction}</i>
        </div>
        <div className="post-date">
          <i> {`${post.day}-${post.month}-${post.year}`}</i>
        </div>
        <div className="post-featured-image">
          <img src={`${post.fimage}`} alt='featured' />
        </div>
        <div className='post-article'>
          {
            Object.keys(post.elements).map(x =>          
              post.elements[x].type==='image'?<img alt='' src={`${post.elements[x].text}`} />:
              post.elements[x].type==='subtitle'?<h3>{post.elements[x].text}</h3>:
              <p>{post.elements[x].text}</p>
            )
          }
        </div>
      </article>
      <div className='next-prev-posts'>         
            <div className='next-post'>
              {pageContext.nextPath?
                <Link to={`/${pageContext.nextPath}`}>&#10141;</Link>:null
                }
            </div>
            <div className='prev-post'>
              {pageContext.prevPath?
                <Link to={`/${pageContext.prevPath}`}>&#11013;</Link>:null
                }
            </div>          
      </div>
    </Layout>
  )
}

export const query = graphql`
query PostQuery($id: String!)  {
  allPost(filter: {id: {eq: $id}}) {
    edges {
      node {
        id,
        day,
        month,
        year,
        title,
        fimage,
        totalElements,
        elements { 
          text
          type
          ukey
          visible 
        }        
      }
    }
  }
}`

export default Post