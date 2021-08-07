import Link from 'next/link';

const ArticleHeader = ({ slug, title }) => (
  <header className="entry-header">
    <h1 itemProp="name" className="entry-title">
      <Link href={slug} className="article-title" itemProp="url">
        <a>{title}</a>
      </Link>
    </h1>
  </header>
);

export default ArticleHeader;
