import React from 'react';

import Article from '../../../../components/Article';
import Comments from '../../../../components/Comments';
import Layout from '../../../../components/layout';
import SEO from '../../../../components/seo';
import config from '../../../../config';
import markdownToHtml from '../../../../utils/markdown';
import {
  getAllPosts,
  getDetailFromSlug,
  getPostBySlug,
} from '../../../../utils/blog';

export async function getStaticProps({ params }) {
  const { year, month, day, postTitle } = params;
  const slug = `/${year}/${month}/${day}/${postTitle}/`;
  const post = getPostBySlug(slug);

  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      ...post,
      content,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts();

  return {
    paths: posts.map((post) => ({
      params: {
        ...getDetailFromSlug(post.slug),
      },
    })),
    fallback: false,
  };
}

const Blog = (post) => (
  <Layout>
    <SEO
      title={post.frontmatter.title}
      description={post.excerpt}
      ogImageUrl={post.ogImageUrl}
      slug={post.slug}
    />
    <Article
      html={post.content}
      slug={post.slug}
      title={post.frontmatter.title}
      date={post.frontmatter.date}
      tags={post.frontmatter.tags}
      readmore={false}
    />
    <Comments
      shortname={config.disqusShortname}
      siteUrl={config.siteUrl}
      slug={post.slug}
      title={post.frontmatter.title}
    />
  </Layout>
);

export default Blog;
