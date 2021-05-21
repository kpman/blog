import React from 'react';

import Article from '../../components/Article';
import Layout from '../../components/layout';
import SEO from '../../components/seo';
import markdownToHtml from '../../utils/markdown';
import { getAllTags, getPostsByTag } from '../../utils/blog';

export async function getStaticProps({ params }) {
  const { tag } = params;

  const posts = getPostsByTag(tag);

  const postPromises = posts.map(async (post) => ({
    ...post,
    html: await markdownToHtml(post.content || ''),
  }));

  return {
    props: {
      posts: await Promise.all(postPromises),
    },
  };
}

export async function getStaticPaths() {
  const allTags = getAllTags();

  return {
    paths: allTags.map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  };
}

const Index = ({ posts }) => (
  <Layout>
    <SEO />
    {posts.map((post) => (
      <Article
        key={post.slug}
        html={post.html}
        slug={post.slug}
        title={post.frontmatter.title}
        date={post.frontmatter.date}
        tags={post.frontmatter.tags}
        readmore
      />
    ))}
  </Layout>
);

export default Index;
