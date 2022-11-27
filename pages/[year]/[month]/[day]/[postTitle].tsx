import Article from '../../../../components/Article';
import Comments from '../../../../components/Comments';
import Layout from '../../../../components/layout';
import SEO from '../../../../components/seo';
import config from '../../../../config';
import {
  getPosts,
  getDetailFromSlug,
  getPostBySlug,
} from '../../../../utils/blog';

export async function getStaticProps({ params }) {
  const { year, month, day, postTitle } = params;
  const slug = `/${year}/${month}/${day}/${postTitle}/`;
  const post = getPostBySlug(slug);

  return {
    props: post,
  };
}

export async function getStaticPaths() {
  const posts = getPosts({
    fields: ['slug', 'frontmatter', 'excerpt', 'ogImageUrl', 'content'],
  });

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
      slug={post.slug}
      content={post.content}
      title={post.frontmatter.title}
      date={post.frontmatter.date}
      tags={post.frontmatter.tags}
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
