import React, { Component } from 'react';

import Article from '../components/Article';

class BlogIndex extends Component {
  render() {
    if (this.props.errors && this.props.errors.length) {
      this.props.errors.forEach(({ message }) => {
        console.error(`BlogIndex render errr: ${message}`);
      });
      return <h1>Errors found: Check the console for details</h1>;
    }

    return (
      <div>
        {this.props.data.allMarkdownRemark.edges.map(({ node }) => (
          <Article
            slug={node.fields.slug}
            html={node.html}
            title={node.frontmatter.title}
            date={node.frontmatter.date}
            tags={node.frontmatter.tags}
            key={node.fields.slug}
            readmore
          />
        ))}
      </div>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query BlogIndexQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          html
          frontmatter {
            title
            date(formatString: "MMM DD, YYYY")
            tags
          }
        }
      }
    }
  }
`;
