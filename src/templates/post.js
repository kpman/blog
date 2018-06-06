import React, { Fragment } from 'react';

import Article from '../components/Article';
import Comments from '../components/Comments';

const PostTemplate = ({
  data: {
    markdownRemark,
    site: {
      siteMetadata: { disqusShortname },
    },
  },
}) => (
  <Fragment>
    <Article
      html={markdownRemark.html}
      slug={markdownRemark.fields.slug}
      title={markdownRemark.frontmatter.title}
      date={markdownRemark.frontmatter.date}
      tags={markdownRemark.frontmatter.tags}
      readmore={false}
    />
    <Comments shortname={disqusShortname} />
  </Fragment>
);

export default PostTemplate;

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    site {
      siteMetadata {
        disqusShortname
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
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
`;
