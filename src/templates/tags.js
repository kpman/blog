import React from 'react';

import Article from '../components/Article';

const TagsTemplate = ({ data }) =>
  data.allMarkdownRemark.edges.map(({ node }) => (
    <Article
      html={node.html}
      slug={node.fields.slug}
      title={node.frontmatter.title}
      date={node.frontmatter.date}
      tags={node.frontmatter.tags}
      readmore
    />
  ));

export default TagsTemplate;

export const pageQuery = graphql`
  query PostByTag($tag: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { tags: { in: [$tag] } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          html
          fields {
            slug
          }
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
