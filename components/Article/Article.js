import Link from 'next/link';
import React from 'react';

import ArticleFooter from './ArticleFooter';
import ArticleHeader from './ArticleHeader';
import ArticleMeta from './ArticleMeta';

const Article = ({ slug, html, date, title, tags, readmore }) => (
  <>
    <article id={title} className="post">
      <ArticleFooter slug={slug} date={date} />
      <ArticleHeader slug={slug} title={title} />
      <div className="entry-content">
        <div
          className="post-content"
          dangerouslySetInnerHTML={{
            __html: readmore ? html.split('<!-- more -->')[0] : html,
          }}
        />
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
