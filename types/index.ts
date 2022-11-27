export type PostType = {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    tags: string[];
  };
  excerpt: string;
  content: string;
  ogImageUrl: string;
  date: string;
};
