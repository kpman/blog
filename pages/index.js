import React from 'react';

import Article from '../components/Article';
import Layout from '../components/layout';
import SEO from '../components/seo';
import markdownToHtml from '../utils/markdown';
import { generateRSS } from '../utils/rss';
import { getAllPosts } from '../utils/blog';

export async function getStaticProps() {
  const posts = getAllPosts();

  const postPromises = posts.map(async (post) => ({
    ...post,
    html: await markdownToHtml(post.content || ''),
  }));

  // Generate RSS file here for static build
  generateRSS();

  return {
    props: {
      posts: await Promise.all(postPromises),
    },
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
