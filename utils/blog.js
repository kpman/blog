import fs from 'fs';
import { join } from 'path';

import matter from 'gray-matter';
import { format } from 'date-fns';

const postsDirectory = join(process.cwd(), 'content', '_posts');

const getSlugFromPostFileName = filenamePath => {
  const POST_FILENAME_REGEX = /([0-9]+)-([0-9]+)-([0-9]+)-(.+)\.md$/;

  const [, year, month, day, postTitle] = POST_FILENAME_REGEX.exec(
    filenamePath
  );

  return `${year}/${month}/${day}/${postTitle}`;
};

// slug example: `2018/06/08/從-Hexo-到-Gatsby`
const SLUG_REGEX = /([0-9]+)\/([0-9]+)\/([0-9]+)\/(.+)$/;

const getFileNameFromSlug = slug => {
  const [, year, month, day, postTitle] = SLUG_REGEX.exec(slug);

  return `${year}-${month}-${day}-${postTitle}.md`;
};

export const getDetailFromSlug = slug => {
  const [, year, month, day, postTitle] = SLUG_REGEX.exec(slug);

  return {
    year,
    month,
    day,
    postTitle,
  };
};

export const getPostBySlug = slug => {
  const fullPath = join(postsDirectory, getFileNameFromSlug(slug));

  const fileContents = fs.readFileSync(fullPath, 'utf-8');

  const { data, content } = matter(fileContents);
  const date = format(data.date, 'yyyy/MM/dd');

  return { slug, frontmatter: { ...data, date }, content };
};

export const getAllPosts = () => {
  const slugs = fs.readdirSync(postsDirectory).map(getSlugFromPostFileName);

  const posts = slugs
    .map(slug => getPostBySlug(slug))
    .sort(
      (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
    );

  return posts;
};
