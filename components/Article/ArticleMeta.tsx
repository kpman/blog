import Link from 'next/link';

const ArticleMeta = ({ tags }) => (
  <footer className="mb-6 text-sm leading-relaxed text-gray-500">
    <div>
      <ul className="flex flex-wrap">
        {tags.map((tag) => (
          <li key={tag} className="mr-3 mb-3 last:mr-0">
            <Link
              href={`/tags/${tag}/`}
              className="hover:text-primary-600 before:content-['#']"
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </footer>
);

export default ArticleMeta;
