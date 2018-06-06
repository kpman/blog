import React from 'react';
import Link from 'gatsby-link';

const ArticleMeta = ({ tags }) => (
  <footer className="entry-footer">
    <div className="entry-meta-footer">
      <span className="tags">
        <span className="tags">
          <ul className="article-tag-list">
            {tags.map(tag => (
              <li className="article-tag-list-item">
                <Link className="article-tag-list-link" to={`/tags/${tag}/`}>
                  {tag}
                </Link>
              </li>
            ))}
          </ul>
        </span>
      </span>
    </div>
  </footer>
);

export default ArticleMeta;
