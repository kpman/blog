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
