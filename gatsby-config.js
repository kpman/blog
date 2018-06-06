const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'kpman | code',
    subtitle: '記錄開發過程大小事',
    description:
      '致力於研究網頁前端技術及使用者經驗，認為這世上有許多事情值得被發掘及分享，內心渴望與志同道合的夥伴讓生活更加美好。',
    siteUrl: 'https://code.kpman.cc',
    disqusShortname: 'kpmancode',
    author: 'kpman',
  },
  plugins: [
    'gatsby-plugin-react-next',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts', // Name this source
        path: path.resolve('./content/_posts'),
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
            },
          },
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 720,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
    },
    {
      resolve: 'gatsby-plugin-feed',
    },
  ],
};
