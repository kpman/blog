import React from 'react';

import ArticleFooter from '../components/ArticleFooter';
import ArticleHeader from '../components/ArticleHeader';
import ArticleMeta from '../components/ArticleMeta';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { getAllPosts } from '../utils/blog';
import markdownToHtml from '../utils/markdown';

export async function getStaticProps() {
  const posts = getAllPosts();

  const postPromises = posts.map(async post => ({
    ...post,
    html: await markdownToHtml(post.content || ''),
  }));

  return {
    props: {
      posts: await Promise.all(postPromises),
    },
  };
}

const Archives = ({ posts }) => (
  <Layout>
    <SEO />
    {posts.map(post => (
      <article
        id={post.frontmatter.title}
        className="post"
        key={post.frontmatter.title}
      >
        <ArticleFooter slug={post.slug} date={post.frontmatter.date} />
        <ArticleHeader slug={post.slug} title={post.frontmatter.title} />
        <ArticleMeta tags={post.frontmatter.tags} />
      </article>
    ))}
  </Layout>
);

export default Archives;
