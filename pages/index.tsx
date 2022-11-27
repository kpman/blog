import Article from '../components/Article';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { generateRSS } from '../utils/rss';
import { getPosts } from '../utils/blog';

export async function getStaticProps() {
  const posts = getPosts({
    fields: ['slug', 'frontmatter', 'excerpt', 'ogImageUrl'],
  });

  if (process.env.NODE_ENV === 'production') {
    // Generate RSS file here for static build
    await generateRSS();
  }

  return {
    props: {
      posts,
    },
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
