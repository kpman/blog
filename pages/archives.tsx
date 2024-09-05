import Layout from '../components/layout';
import SEO from '../components/seo';
import ArticleHeader from '../components/Article/ArticleHeader';
import ArticleMeta from '../components/Article/ArticleMeta';
import ArticleFooter from '../components/Article/ArticleFooter';
import { getPosts } from '../utils/blog';

export async function getStaticProps() {
  const posts = getPosts({ fields: ['frontmatter', 'slug'] });

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
