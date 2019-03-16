
const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions
  
    return new Promise((resolve, reject) => {
      const postTemplate = path.resolve(`src/templates/Post.js`)
      // Query for firebase nodes to use in creating pages.
      resolve(
        graphql(
          `{
              allPost {
                edges {
                  node {
                    id,
                    totalElements,
                    slug,
                    title,
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
        ).then(result => {
          if (result.errors) {
            reject(result.errors)
          }
  
          let arrId=[]
          let arrSlug=[]
          result.data.allPost.edges.forEach(({ node }) => {
            arrId = [...arrId, `${node.id}`];
            arrSlug = [...arrSlug, `${node.slug}`];
          })
          // Create pages for each post.
          result.data.allPost.edges.forEach(({ node }) => {
            const id = node.id;
            const totalElements = node.totalElements;
            const elements = node.elements;
            const title = node.title;
            const slug = node.slug;
            const path = `${node.slug}-${node.id}`;
            const allIds = [...arrId]
            const allSlugs = [...arrSlug]
            const nextInd = allIds.indexOf(id)+1
            const prevInd = allIds.indexOf(id)-1
            const nextId = allIds[nextInd]||null
            const prevId = allIds[prevInd]||null
            const nextSlug = allSlugs[nextInd]||null
            const prevSlug = allSlugs[prevInd]||null
            const nextPath = nextId?`${nextSlug}-${nextId}`:null
            const prevPath = prevId?`${prevSlug}-${prevId}`:null
            createPage({
              path,
              component: postTemplate,
              context: {
                  id,
                  totalElements,
                  slug,
                  title,
                  allIds,
                  nextPath,
                  prevPath,
                  elements
              },
            })
          })
        })
      )
    })
  }