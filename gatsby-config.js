module.exports = {
  siteMetadata: {
    title: `Prokopis Gatsby Default Starter`,
    description: `My next, prokopis great Gatsby project`,
    author: `kontopro`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      }
    },
    {
        resolve: 'gatsby-source-firebase',
        options: {
          credential: require('./firebase.json'),
          databaseURL: 'https://playgatsby.firebaseio.com',
          types: [
            {
              type: 'Post',
              collection: 'posts',
              path: '/posts',
              map: node => {
                // convert part of firebase structure from {} to [] according to ukey, 
                // which specifies the enumeration of elements, eg 1st pragraph, 2nd subtitle etc 
                // and then calculate all elements to pass as argument to query Post.js via context of creatPage at gatsby-node.js
                const nd = Object.keys(node).map(x=>node[x].ukey?node[x].ukey:null)
                node.totalElements = Math.max(...nd);
                node.elements = [];
                const maxElements = Math.max(...nd);
                let step;
                for (step=0; step<maxElements; step++) {
                  node.elements[step] = node[`${step}`]
                }
                return node               
              },
            }
          ]
        }
      }
    ,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
}
