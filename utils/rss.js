import fs from 'fs';

import { Feed } from 'feed';

import config from '../config';

import { getAllPosts } from './blog';

export const generateRSS = () => {
  const feed = new Feed({
    title: config.title,
    description: config.subtitle,
    id: config.siteUrl,
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

  const posts = getAllPosts();

  posts.forEach((post) => {
    feed.addItem({
      title: post.frontmatter.title,
      id: post.slug,
      link: `${config.siteUrl}${post.slug}`,
      description: post.excerpt,
      content: post.content,
      author: [
        {
          name: 'Daniel Tseng',
          email: 's92f002@gmail.com',
          link: config.siteUrl,
        },
      ],
      date: new Date(post.date),
      image: post.ogImageUrl,
    });
  });

  fs.writeFileSync('./public/rss.xml', feed.atom1());
  fs.writeFileSync('./public/atom.xml', feed.atom1());
};
