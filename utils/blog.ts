import fs from 'fs';
import { join } from 'path';

import matter from 'gray-matter';
import { format } from 'date-fns';

import type { PostType } from '../types';

const postsDirectory = join(process.cwd(), 'content', '_posts');

const getSlugFromPostFileName = (filenamePath) => {
  const POST_FILENAME_REGEX = /([0-9]+)-([0-9]+)-([0-9]+)-(.+)\.md$/;

  const [, year, month, day, postTitle] =
    POST_FILENAME_REGEX.exec(filenamePath);

  return `/${year}/${month}/${day}/${postTitle}/`;
};

// slug example: `/2018/06/08/從-Hexo-到-Gatsby/`
const SLUG_REGEX = /([0-9]+)\/([0-9]+)\/([0-9]+)\/(.+)\/$/;

const getFileNameFromSlug = (slug) => {
  const [, year, month, day, postTitle] = SLUG_REGEX.exec(slug);
  return `${year}-${month}-${day}-${postTitle}.md`;
};

export const getDetailFromSlug = (slug) => {
  const [, year, month, day, postTitle] = SLUG_REGEX.exec(slug);

  return {
    year,
    month,
    day,
    postTitle,
  };
};

export const getPostBySlug = <K extends keyof PostType>(
  slug: string,
  fields: (keyof PostType)[] = [
    'slug',
    'frontmatter',
    'excerpt',
    'ogImageUrl',
    'content',
    'date',
  ]
): Pick<PostType, K> => {
  const fullPath = join(postsDirectory, getFileNameFromSlug(slug));

  const fileContents = fs.readFileSync(fullPath, 'utf-8');

  const { data, content } = matter(fileContents);
  const date = format(data.date, 'MMM dd, yyyy');

  const imageMarkdownRegExp = /(?:!\[(.*?)\]\((.*?)\))/g;

  const post: Record<string, string | Record<string, any>> = {};

  for (const field of fields) {
    if (field === 'frontmatter') {
      post[field] = { ...data, date };
    } else if (field === 'excerpt') {
      post[field] = content
        .split('<!-- more -->')[0]
        .replace(imageMarkdownRegExp, '')
        .trim(); // get only text part for `excerpt`
    } else if (field === 'ogImageUrl') {
      post[field] =
        imageMarkdownRegExp.exec(content.split('<!-- more -->')[0])?.[2] ||
        null;
    } else if (field === 'content') {
      post[field] = content;
    } else if (field === 'slug') {
      post[field] = slug;
    }

    post['date'] = data.date.toISOString() as string; // for getPosts sorting
  }

  return post as Pick<PostType, K>;
};

export const getPosts = ({ fields }: { fields?: (keyof PostType)[] } = {}) => {
  const slugs = fs.readdirSync(postsDirectory).map(getSlugFromPostFileName);

  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());

  return posts;
};

export const getPostsByTag = (
  tag: string,
  { fields }: { fields?: (keyof PostType)[] } = {}
) => {
  const posts = getPosts({ fields });

  return posts.filter((post) => post.frontmatter.tags.includes(tag));
};

export const getTags = () => {
  const posts = getPosts({ fields: ['frontmatter'] });

  let tags = [];

  posts.forEach((post) => {
    tags = [...tags, ...post.frontmatter.tags];
  });

  return Array.from(new Set(tags));
};
