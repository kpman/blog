import Link from 'next/link';

const ArticleFooter = ({ slug, date }) => (
  <footer className="entry-meta-header">
    <span className="meta-elements date">
      <Link href={slug}>
        <a className="article-date">
          <time
            // dateTime={new Date(date).toISOString()}
            itemProp="datePublished"
          >
            {date}
          </time>
        </a>
      </Link>
    </span>
    <span className="meta-elements author">kpman | code</span>
    <div className="commentscount">
      <Link href={`${slug}#disqus_thread`}>
        <a className="article-comment-link">Comments</a>
      </Link>
    </div>
  </footer>
);

export default ArticleFooter;
