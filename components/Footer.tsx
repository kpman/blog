import Link from 'next/link';

import config from '../config';

const Footer = () => (
  <footer className="mx-0 my-6 flex flex-col items-start gap-4 text-xs text-gray-900 lg:flex-row lg:items-center">
    <h1 className="-mt-1 inline-block border-b-[3px] border-solid border-gray-900 px-0 py-1 tracking-[0.2em] ">
      <Link href="/">{config.title}</Link>
    </h1>
    <div className="flex flex-col gap-1">
      <span>
        © {new Date().getFullYear()} {config.title}. All rights reserved.
      </span>
      <span>
        Modify from{' '}
        <Link
          href="http://sanographix.github.io/tumblr/apollo/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Apollo
        </Link>{' '}
        theme.
      </span>
      <span>
        Powered by{' '}
        <Link
          href="https://nextjs.org/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Next.js
        </Link>
      </span>
    </div>
  </footer>
);

export default Footer;
