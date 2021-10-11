import Layout from '../components/layout';
import SEO from '../components/seo';
import {
  ArticleFooter,
  ArticleHeader,
  ArticleMeta,
} from '../components/Article';
import { getAllPosts } from '../utils/blog';

export async function getStaticProps() {
  const posts = getAllPosts();

  return {
    props: {
      posts,
    },
  };
}

const Archives = ({ posts }) => (
  <Layout>
    <SEO />
    {posts.map((post) => (
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
