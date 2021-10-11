import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

const markdownToHtml = async (markdown) => {
  return md.render(markdown);
};

export default markdownToHtml;
