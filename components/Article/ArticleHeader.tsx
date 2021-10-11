import Link from 'next/link';

const ArticleHeader = ({ slug, title }) => (
  <header className="entry-header">
    <h1 itemProp="name" className="entry-title">
      <Link href={slug}>
        <a className="article-title" itemProp="url">
          {title}
        </a>
      </Link>
    </h1>
  </header>
);

export default ArticleHeader;
