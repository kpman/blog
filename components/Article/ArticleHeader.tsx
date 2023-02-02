import Link from 'next/link';

const ArticleHeader = ({ slug, title }) => (
  <header className="mb-8">
    <h1 itemProp="name" className="m-0 text-3xl font-bold">
      <Link href={slug} itemProp="url">
        {title}
      </Link>
    </h1>
  </header>
);

export default ArticleHeader;
