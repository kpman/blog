import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

import ArticleFooter from './ArticleFooter';
import ArticleHeader from './ArticleHeader';
import ArticleMeta from './ArticleMeta';

const readmoreComment = '<!-- more -->';

const Article = ({ slug, content, date, title, tags, readmore }) => (
  <>
    <article id={title} className="post">
      <ArticleFooter slug={slug} date={date} />
      <ArticleHeader slug={slug} title={title} />
      <div className="entry-content">
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
          {readmore
            ? content.split(readmoreComment)[0]
            : content.replace(readmoreComment, '')}
        </ReactMarkdown>
        {readmore ? (
          <p className="article-more-link">
            <Link href={`${slug}#more`}>
              Read More
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
