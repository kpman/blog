import Article from '../../components/Article';
import Layout from '../../components/layout';
import SEO from '../../components/seo';
import { getTags, getPostsByTag } from '../../utils/blog';

export async function getStaticProps({ params }) {
  const { tag } = params;

  const posts = getPostsByTag(tag, {
    fields: ['slug', 'excerpt', 'frontmatter', 'ogImageUrl'],
  });

  return {
    props: {
      posts,
    },
  };
}

export async function getStaticPaths() {
  const allTags = getTags();

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
        slug={post.slug}
        title={post.frontmatter.title}
        date={post.frontmatter.date}
        tags={post.frontmatter.tags}
        excerpt={post.excerpt}
        ogImageUrl={post.ogImageUrl}
      />
    ))}
  </Layout>
);

export default Index;
