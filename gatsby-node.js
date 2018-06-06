const path = require('path');

const BLOG_POST_FILENAME_REGEX = /([0-9]+)-([0-9]+)-([0-9]+)-(.+)\.md$/;

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;

  if (node.internal.type === 'MarkdownRemark') {
    const { relativePath } = getNode(node.parent);

    const match = BLOG_POST_FILENAME_REGEX.exec(relativePath);
    const year = match[1];
    const month = match[2];
    const day = match[3];
    const filename = match[4];

    const slug = `/${year}/${month}/${day}/${filename}/`;
    const date = new Date(year, month - 1, day);

    // Blog posts are sorted by date and display the date in their header.
    createNodeField({
      node,
      name: 'date',
      value: date.toJSON(),
    });

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });

    createNodeField({
      node,
      name: 'path',
      value: relativePath,
    });
  }
};

exports.createPages = async ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  const allMarkdown = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              tags
            }
          }
        }
      }
    }
  `);

  if (allMarkdown.errors) {
    console.error(allMarkdown.errors);
    throw Error(allMarkdown.errors);
  }

  allMarkdown.data.allMarkdownRemark.edges.map(({ node }) => {
    const { slug } = node.fields;
    const { tags } = node.frontmatter;

    createPage({
      path: slug,
      component: path.resolve('./src/templates/post.js'),
      layout: 'index', // default value is 'index'
      context: {
        // Data passed to context is available in page queries as GraphQL variables.
        slug,
      },
    });

    tags.map(tag => {
      createPage({
        path: `/tags/${tag}`,
        component: path.resolve('./src/templates/tags.js'),
        layout: 'index', // default value is 'index'
        context: {
          // Data passed to context is available in page queries as GraphQL variables.
          tag,
        },
      });
    });
  });
};
