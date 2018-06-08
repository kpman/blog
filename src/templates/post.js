import React, { Fragment } from 'react';
import Helmet from 'react-helmet';

import Article from '../components/Article';
import Comments from '../components/Comments';

const PostTemplate = ({
  data: {
    markdownRemark,
    site: {
      siteMetadata: { disqusShortname, siteUrl, title },
    },
  },
}) => (
  <Fragment>
    <Helmet>
      <meta name="description" content={markdownRemark.excerpt} />

      <meta
        property="og:url"
        content={`${siteUrl}${markdownRemark.fields.slug}`}
      />
      <meta
        property="og:title"
        content={`${markdownRemark.frontmatter.title} | ${title}`}
      />
      <meta property="og:description" content={markdownRemark.excerpt} />

      <meta
        name="twitter:title"
        content={`${markdownRemark.frontmatter.title} | ${title}`}
      />
      <meta name="twitter:description" content={markdownRemark.excerpt} />

      <title>{`${markdownRemark.frontmatter.title} | ${title}`}</title>
    </Helmet>
    <Article
      html={markdownRemark.html}
      slug={markdownRemark.fields.slug}
      title={markdownRemark.frontmatter.title}
      date={markdownRemark.frontmatter.date}
      tags={markdownRemark.frontmatter.tags}
      readmore={false}
    />
    <Comments
      shortname={disqusShortname}
      siteUrl={siteUrl}
      slug={markdownRemark.fields.slug}
      title={markdownRemark.frontmatter.title}
    />
  </Fragment>
);

export default PostTemplate;

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
        disqusShortname
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      excerpt(pruneLength: 140)
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
