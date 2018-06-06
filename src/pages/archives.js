import React, { Component, Fragment } from 'react';

import ArticleFooter from '../components/ArticleFooter';
import ArticleHeader from '../components/ArticleHeader';
import ArticleMeta from '../components/ArticleMeta';

class ArchivePage extends Component {
  render() {
    if (this.props.errors && this.props.errors.length) {
      this.props.errors.forEach(({ message }) => {
        console.error(`ArchivePage render errr: ${message}`);
      });
      return <h1>Errors found: Check the console for details</h1>;
    }

    return (
      <div>
        {this.props.data.allMarkdownRemark.edges.map(({ node }) => (
          <article
            id={node.frontmatter.title}
            className="post"
            key={node.frontmatter.title}
          >
            <ArticleFooter
              slug={node.fields.slug}
              date={node.frontmatter.date}
            />
            <ArticleHeader
              slug={node.fields.slug}
              title={node.frontmatter.title}
            />
            <ArticleMeta tags={node.frontmatter.tags} />
          </article>
        ))}
      </div>
    );
  }
}

export default ArchivePage;

export const pageQuery = graphql`
  query ArchivePageQuery {
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
