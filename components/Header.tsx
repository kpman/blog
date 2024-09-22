import Link from 'next/link';

import config from '../config';

const Header = () => (
  <header className="mb-12 mt-16 flex flex-row items-center justify-between">
    <h1 className="group inline-block border-b-4 border-solid border-gray-900 pb-2 text-xl font-bold tracking-[0.2em] outline-2 outline-red-200 hover:border-primary-500">
      <Link href="/" className="group-hover:text-primary-500">
        {config.title}
      </Link>
    </h1>
    <nav className="hidden lg:flex">
      <ul className="flex flex-row gap-6 text-sm font-bold uppercase">
        <li>
          <Link href="/">home</Link>
        </li>
        <li>
          <Link href="/archives">archives</Link>
        </li>
        <li>
          <Link href="/atom.xml">rss</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
