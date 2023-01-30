import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

import ArticleFooter from './ArticleFooter';
import ArticleHeader from './ArticleHeader';
import ArticleMeta from './ArticleMeta';

const readmoreComment = '<!-- more -->';

const Article = ({
  slug,
  date,
  title,
  tags,
  excerpt,
  content,
  ogImageUrl,
}: {
  slug: string;
  date: string;
  title: string;
  tags: string;
  excerpt?: string;
  content?: string;
  ogImageUrl?: string;
}) => (
  <>
    <article id={title} className="post">
      <ArticleFooter slug={slug} date={date} />
      <ArticleHeader slug={slug} title={title} />
      <div className="entry-content">
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
          {excerpt ? excerpt : content.replace(readmoreComment, '')}
        </ReactMarkdown>
        {excerpt ? (
          <>
            {ogImageUrl ? (
              <p>
                <img src={ogImageUrl} alt={`${title} image`} />
              </p>
            ) : null}
            <p className="article-more-link">
              <Link href={`${slug}#more`}>Read More →</Link>
            </p>
          </>
        ) : null}
      </div>
      <ArticleMeta tags={tags} />
      <hr className="article-divider" />
    </article>
  </>
);

export default Article;
