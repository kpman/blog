import Link from 'next/link';

const ArticleMeta = ({ tags }) => (
  <footer className="entry-footer">
    <div className="entry-meta-footer">
      <span className="tags">
        <span className="tags">
          <ul className="article-tag-list">
            {tags.map((tag) => (
              <li className="article-tag-list-item" key={tag}>
                <Link href={`/tags/${tag}/`} className="article-tag-list-link">
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
