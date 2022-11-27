import fs from 'fs';

import { Feed } from 'feed';

import config from '../config';

import markdownToHtml from './markdownToHtml';
import { getPosts } from './blog';

export const generateRSS = async () => {
  const feed = new Feed({
    title: config.title,
    description: config.subtitle,
    id: `${config.siteUrl}/`, // add slash for fitting canonical form
    link: config.siteUrl,
    image: `${config.siteUrl}/android-chrome-192x192.png`, // FIXME
    favicon: `${config.siteUrl}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} ${
      config.title
    }. All rights reserved.`,
    feedLinks: {
      atom: `${config.siteUrl}/atom.xml`,
    },
    author: {
      name: 'Daniel Tseng',
      email: 's92f002@gmail.com',
      link: config.siteUrl,
    },
  });

  const posts = getPosts();

  await Promise.all(
    posts.map(async (post) => {
      const validURI = `${config.siteUrl}${encodeURI(post.slug)}`;

      feed.addItem({
        id: validURI,
        link: validURI,
        title: post.frontmatter.title,
        description: post.excerpt,
        date: new Date(post.date),
        image: post.ogImageUrl,
        content: await markdownToHtml(post.content || ''),
        author: [
          {
            name: 'Daniel Tseng',
            email: 's92f002@gmail.com',
            link: config.siteUrl,
          },
        ],
      });
    })
  );

  // ref: https://www.ryadel.com/en/javascript-remove-xml-invalid-chars-characters-string-utf8-unicode-regex/
  // remove everything forbidden by XML 1.0 specifications, plus the unicode replacement character U+FFFD
  const invalidCharInXMLSpecRegexp =
    // eslint-disable-next-line no-control-regex
    /((?:[\0-\x08\x0B\f\x0E-\x1F\uFFFD\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))/g;

  fs.writeFileSync(
    './public/rss.xml',
    feed.atom1().replace(invalidCharInXMLSpecRegexp, '')
  );
  fs.writeFileSync(
    './public/atom.xml',
    feed.atom1().replace(invalidCharInXMLSpecRegexp, '')
  );
};
