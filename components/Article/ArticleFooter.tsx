import Link from 'next/link';

const ArticleFooter = ({ slug, date }) => (
  <footer className="relative mb-4 text-sm text-gray-500 lg:absolute lg:top-[0.5em] lg:left-[-200px]">
    <div className="mr-2 inline text-lg font-bold lg:block [&>a]:text-gray-900">
      <Link href={slug}>
        <time dateTime={new Date(date).toISOString()} itemProp="datePublished">
          {date}
        </time>
      </Link>
    </div>
    <div className="mt-1 inline lg:block">kpman | code</div>
    <div className="mt-1 hidden lg:block">
      <div className="[&>a]:text-gray-500 [&>a]:hover:text-primary-500">
        <Link href={`${slug}#disqus_thread`}>Comments</Link>
      </div>
    </div>
  </footer>
);

export default ArticleFooter;
