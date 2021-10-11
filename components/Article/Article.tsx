import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

import ArticleFooter from './ArticleFooter';
import ArticleHeader from './ArticleHeader';
import ArticleMeta from './ArticleMeta';

const Article = ({ slug, content, date, title, tags, readmore }) => (
  <>
    {console.log({ content })}
    <article id={title} className="post">
      <ArticleFooter slug={slug} date={date} />
      <ArticleHeader slug={slug} title={title} />
      <div className="entry-content">
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
          {readmore ? content.split('<!-- more -->')[0] : content}
        </ReactMarkdown>
        {readmore ? (
          <p className="article-more-link">
            <Link href={`${slug}#more`}>
              <a>Read More</a>
            </Link>
          </p>
        ) : null}
      </div>
      <ArticleMeta tags={tags} />
      <hr className="article-divider" />
    </article>
  </>
);

export default Article;
