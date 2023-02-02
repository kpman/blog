import Link from 'next/link';

const ArticleFooter = ({ slug, date }) => (
  <footer className="top-[0.5em] left-[-200px] mb-4 text-[90%] text-gray lg:absolute">
    <div className="mr-2 inline text-[120%] font-bold lg:block [&>a]:text-dark-gray">
      <Link href={slug}>
        <time dateTime={new Date(date).toISOString()} itemProp="datePublished">
          {date}
        </time>
      </Link>
    </div>
    <div className="mt-2 inline lg:block">kpman | code</div>
    <div className="mt-2 hidden lg:block">
      <div className="[&>a]:text-gray [&>a]:hover:text-blue">
        <Link href={`${slug}#disqus_thread`}>Comments</Link>
      </div>
    </div>
  </footer>
);

export default ArticleFooter;
