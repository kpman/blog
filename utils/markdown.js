import remark from 'remark';
import html from 'remark-html';
import prism from 'remark-prism';

const markdownToHtml = async markdown => {
  const result = await remark()
    .use(prism)
    .use(html)
    .process(markdown);

  return result.toString();
};

export default markdownToHtml;
